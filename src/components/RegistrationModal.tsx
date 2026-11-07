import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Ticket,
  Calendar,
  MapPin,
  Clock,
  Download,
  CalendarPlus,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  QrCode,
  User,
  Mail,
  Phone,
  Smartphone,
  Landmark,
  GraduationCap,
  Lock,
  Printer,
  Sparkles,
} from 'lucide-react';
import { EventItem, Registration, TicketType } from '../types/event';
import {
  validateFullName,
  validateEmail,
  validatePhone,
  validateTermsAccepted,
} from '../utils/validation';
import {
  saveRegistration,
  generateRegistrationCode,
  generateTransactionId,
} from '../utils/storage';
import { KiitUser } from '../types/auth';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  allEvents: EventItem[];
  onRegistrationSuccess: (registration: Registration) => void;
  currentUser?: KiitUser | null;
}

type Step = 'details' | 'payment' | 'confirmation';
type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'kiit_portal';

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  event: initialEvent,
  allEvents,
  onRegistrationSuccess,
  currentUser,
}) => {
  // Current active step
  const [currentStep, setCurrentStep] = useState<Step>('details');

  // Selected event
  const [selectedEventId, setSelectedEventId] = useState<string>(
    initialEvent ? initialEvent.id : allEvents[0]?.id || ''
  );

  const currentEvent =
    allEvents.find((e) => e.id === selectedEventId) || initialEvent || allEvents[0];

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [ticketType, setTicketType] = useState<TicketType>('Standard Pass');
  const [ticketsCount, setTicketsCount] = useState<number>(1);
  const [specialNotes, setSpecialNotes] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Validation States
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [upiId, setUpiId] = useState('');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim'>('gpay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [selectedBank, setSelectedBank] = useState('sbi');
  const [kiitRollNumber, setKiitRollNumber] = useState('');
  const [kiitSchool, setKiitSchool] = useState('Computer Engineering');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Completed Pass
  const [completedPass, setCompletedPass] = useState<Registration | null>(null);

  // Calculate pricing
  const basePrice = currentEvent?.price || 0;
  const multiplier =
    ticketType === 'VIP All-Access' ? 1.75 : ticketType === 'Student / Early Bird' ? 0.7 : 1;
  const pricePerTicket = Math.round(basePrice * multiplier);
  const totalAmount = pricePerTicket * ticketsCount;

  // Reset or update on open / event change
  useEffect(() => {
    if (initialEvent) {
      setSelectedEventId(initialEvent.id);
    }
  }, [initialEvent]);

  useEffect(() => {
    if (isOpen && currentUser) {
      if (!fullName) setFullName(currentUser.fullName);
      if (!email) setEmail(currentUser.email);
      if (!phone) setPhone(currentUser.phone);
      if (!kiitRollNumber && currentUser.rollNumber) setKiitRollNumber(currentUser.rollNumber);
    }

    if (!isOpen) {
      setCurrentStep('details');
      setCompletedPass(null);
      setIsProcessingPayment(false);
      setTouched({});
      setErrors({});
      setPaymentError(null);
    }
  }, [isOpen, currentUser]);

  // Validation on input change if field has been touched
  const validateField = (field: string, val?: any) => {
    const newErrors = { ...errors };

    if (field === 'fullName') {
      const err = validateFullName(val !== undefined ? val : fullName);
      if (err) newErrors.fullName = err;
      else delete newErrors.fullName;
    }

    if (field === 'email') {
      const err = validateEmail(val !== undefined ? val : email);
      if (err) newErrors.email = err;
      else delete newErrors.email;
    }

    if (field === 'phone') {
      const err = validatePhone(val !== undefined ? val : phone);
      if (err) newErrors.phone = err;
      else delete newErrors.phone;
    }

    if (field === 'termsAccepted') {
      const err = validateTermsAccepted(val !== undefined ? val : termsAccepted);
      if (err) newErrors.termsAccepted = err;
      else delete newErrors.termsAccepted;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  // Move from Details to Payment section
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched = {
      fullName: true,
      email: true,
      phone: true,
      termsAccepted: true,
    };
    setTouched(allTouched);

    const nameErr = validateFullName(fullName);
    const emailErr = validateEmail(email);
    const phoneErr = validatePhone(phone);
    const termsErr = validateTermsAccepted(termsAccepted);

    const submitErrors: Record<string, string> = {};
    if (nameErr) submitErrors.fullName = nameErr;
    if (emailErr) submitErrors.email = emailErr;
    if (phoneErr) submitErrors.phone = phoneErr;
    if (termsErr) submitErrors.termsAccepted = termsErr;

    setErrors(submitErrors);

    if (Object.keys(submitErrors).length > 0) {
      return;
    }

    if (!currentEvent) return;

    // Proceed straight to Payment Step
    setCurrentStep('payment');
    setPaymentError(null);
  };

  // Execute payment submission
  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentEvent) return;

    // Optional lightweight validation for payment method if not free
    if (totalAmount > 0) {
      if (paymentMethod === 'upi') {
        if (!upiId.trim() && !upiApp) {
          setPaymentError('Please enter a valid UPI ID or select a UPI payment app.');
          return;
        }
      } else if (paymentMethod === 'card') {
        if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 12) {
          setPaymentError('Please enter a valid 16-digit debit/credit card number.');
          return;
        }
        if (!cardExpiry.trim()) {
          setPaymentError('Please provide card expiry date (MM/YY).');
          return;
        }
        if (!cardCvv.trim() || cardCvv.length < 3) {
          setPaymentError('Please enter valid 3-digit CVV.');
          return;
        }
      } else if (paymentMethod === 'kiit_portal') {
        if (!kiitRollNumber.trim()) {
          setPaymentError('Please enter your valid KIIT Student Roll Number or Faculty ID.');
          return;
        }
      }
    }

    setPaymentError(null);
    setIsProcessingPayment(true);

    setTimeout(() => {
      let methodLabel = 'Complimentary Free Pass';
      if (totalAmount > 0) {
        if (paymentMethod === 'upi') {
          methodLabel = `UPI (${upiApp.toUpperCase()}${upiId ? ` - ${upiId}` : ''})`;
        } else if (paymentMethod === 'card') {
          const last4 = cardNumber.replace(/\s/g, '').slice(-4) || '4242';
          methodLabel = `Card Ending In •••• ${last4}`;
        } else if (paymentMethod === 'netbanking') {
          methodLabel = `Net Banking (${selectedBank.toUpperCase()})`;
        } else if (paymentMethod === 'kiit_portal') {
          methodLabel = `KIIT Student Portal (${kiitRollNumber})`;
        }
      }

      const newRegistration: Registration = {
        id: generateRegistrationCode(),
        eventId: currentEvent.id,
        eventTitle: currentEvent.title,
        eventDate: currentEvent.displayDate,
        eventTime: currentEvent.time,
        eventVenue: currentEvent.venue,
        eventCity: currentEvent.city,
        eventImage: currentEvent.image,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        ticketType,
        ticketsCount,
        pricePerTicket,
        totalAmount,
        specialNotes: specialNotes.trim() || undefined,
        registeredAt: new Date().toISOString(),
        status: 'Confirmed',
        paymentStatus: totalAmount === 0 ? 'Free' : 'Paid',
        paymentMethod: methodLabel,
        transactionId: generateTransactionId(),
      };

      // Save to localStorage
      saveRegistration(newRegistration);
      onRegistrationSuccess(newRegistration);
      setIsProcessingPayment(false);
      setCompletedPass(newRegistration);
      setCurrentStep('confirmation');
    }, 850);
  };

  const handleDownloadCalendar = () => {
    if (!completedPass || !currentEvent) return;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//K Events//Event Registration//EN',
      'BEGIN:VEVENT',
      `UID:${completedPass.id}@kiit.ac.in`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `SUMMARY:${completedPass.eventTitle}`,
      `DESCRIPTION:Registration confirmed for ${completedPass.fullName}. Ticket ID: ${completedPass.id}. Pass Type: ${completedPass.ticketType}. Payment: ${completedPass.paymentStatus || 'Confirmed'} (${completedPass.transactionId || ''})`,
      `LOCATION:${completedPass.eventVenue}, ${completedPass.eventCity}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${completedPass.id}_event_calendar.ics`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const formatCardNumber = (val: string) => {
    const raw = val.replace(/\D/g, '').substring(0, 16);
    return raw.replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const raw = val.replace(/\D/g, '').substring(0, 4);
    if (raw.length > 2) {
      return `${raw.substring(0, 2)}/${raw.substring(2, 4)}`;
    }
    return raw;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              {currentStep === 'payment' ? (
                <CreditCard className="w-4 h-4" />
              ) : currentStep === 'confirmation' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              ) : (
                <Ticket className="w-4 h-4" />
              )}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {currentStep === 'details' && 'Step 1: Event Pass Registration'}
                {currentStep === 'payment' && 'Step 2: Payment & Checkout'}
                {currentStep === 'confirmation' && 'Step 3: Registration Confirmed'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {currentStep === 'details' && 'Enter participant details to book your ticket'}
                {currentStep === 'payment' && `Select your preferred payment method for ₹${totalAmount}`}
                {currentStep === 'confirmation' && 'Your verified digital ticket pass is issued'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Breadcrumb Indicator */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-100/70 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                currentStep === 'details'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-emerald-600 text-white'
              }`}
            >
              1
            </span>
            <span className={currentStep === 'details' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}>
              Details
            </span>
          </div>

          <span className="text-slate-300 dark:text-slate-700">———</span>

          <div className="flex items-center gap-1.5">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                currentStep === 'payment'
                  ? 'bg-indigo-600 text-white'
                  : currentStep === 'confirmation'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              2
            </span>
            <span className={currentStep === 'payment' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400'}>
              Payment
            </span>
          </div>

          <span className="text-slate-300 dark:text-slate-700">———</span>

          <div className="flex items-center gap-1.5">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                currentStep === 'confirmation'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}
            >
              3
            </span>
            <span className={currentStep === 'confirmation' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}>
              Verified Pass
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {/* ================= STEP 1: REGISTRATION DETAILS FORM ================= */}
          {currentStep === 'details' && (
            <form onSubmit={handleProceedToPayment} noValidate className="space-y-4">
              {/* Event Selector / Target Summary */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Selected Event
                </label>
                <select
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full py-2.5 px-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {allEvents.map((evt) => (
                    <option key={evt.id} value={evt.id}>
                      {evt.title} ({evt.displayDate} · {evt.price === 0 ? 'Free' : `₹${evt.price}`})
                    </option>
                  ))}
                </select>
              </div>

              {/* Event Summary Pill Strip */}
              {currentEvent && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <div className="font-semibold text-slate-900 dark:text-slate-100">
                      {currentEvent.venue}
                    </div>
                    <div className="text-slate-500 dark:text-slate-400">
                      {currentEvent.displayDate} · {currentEvent.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {currentEvent.price === 0 ? 'Free Pass' : `${currentEvent.currency}${currentEvent.price}`}
                    </span>
                  </div>
                </div>
              )}

              {/* Attendee Name Input */}
              <div>
                <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Participant Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (touched.fullName) validateField('fullName', e.target.value);
                    }}
                    onBlur={() => handleBlur('fullName')}
                    placeholder="e.g. Sambit Mohapatra"
                    aria-invalid={!!errors.fullName}
                    className={`w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                      touched.fullName && errors.fullName
                        ? 'border-rose-400 focus:ring-rose-500'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500'
                    }`}
                  />
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Email Address & Phone Number (2 columns on tablet+) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Email Address */}
                <div>
                  <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (touched.email) validateField('email', e.target.value);
                      }}
                      onBlur={() => handleBlur('email')}
                      placeholder="e.g. sambit@kiit.ac.in"
                      aria-invalid={!!errors.email}
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        touched.email && errors.email
                          ? 'border-rose-400 focus:ring-rose-500'
                          : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500'
                      }`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="reg-phone" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="reg-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (touched.phone) validateField('phone', e.target.value);
                      }}
                      onBlur={() => handleBlur('phone')}
                      placeholder="e.g. +91 98765 43210"
                      aria-invalid={!!errors.phone}
                      className={`w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-900 border rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                        touched.phone && errors.phone
                          ? 'border-rose-400 focus:ring-rose-500'
                          : 'border-slate-300 dark:border-slate-700 focus:ring-indigo-500'
                      }`}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Pass Tier & Quantity Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Pass Tier
                  </label>
                  <select
                    value={ticketType}
                    onChange={(e) => setTicketType(e.target.value as TicketType)}
                    className="w-full py-2 px-3 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value="Standard Pass">Standard General Admission Pass</option>
                    <option value="VIP All-Access">VIP All-Access + Speaker Lounge</option>
                    <option value="Student / Early Bird">Student / Early Bird Pass (30% Off)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Attendees
                  </label>
                  <select
                    value={ticketsCount}
                    onChange={(e) => setTicketsCount(Number(e.target.value))}
                    className="w-full py-2 px-3 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <option value={1}>1 ticket</option>
                    <option value={2}>2 tickets</option>
                    <option value={3}>3 tickets</option>
                    <option value={4}>4 tickets</option>
                    <option value={5}>5 tickets</option>
                  </select>
                </div>
              </div>

              {/* Price Calculation Summary Banner */}
              <div className="p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Total Calculation: </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {totalAmount === 0 ? 'Complimentary' : `₹${pricePerTicket} × ${ticketsCount} attendee(s)`}
                  </span>
                </div>
                <div className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                  {totalAmount === 0 ? 'FREE' : `₹${totalAmount}`}
                </div>
              </div>

              {/* Optional Special Requests */}
              <div>
                <label htmlFor="reg-notes" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Accessibility or Dietary Notes (Optional)
                </label>
                <input
                  id="reg-notes"
                  type="text"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Wheelchair access needed, vegan meal request"
                  className="w-full px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Terms Acceptance */}
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (touched.termsAccepted) validateField('termsAccepted', e.target.checked);
                    }}
                    onBlur={() => handleBlur('termsAccepted')}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    I confirm my registration details and agree to the KIIT University event code of conduct and safety regulations.
                  </span>
                </label>
                {touched.termsAccepted && errors.termsAccepted && (
                  <p className="mt-1 text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.termsAccepted}</span>
                  </p>
                )}
              </div>

              {/* Proceed to Payment CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {totalAmount === 0 ? 'Proceed to Confirmation' : `Proceed to Payment (₹${totalAmount})`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 2: PAYMENT SECTION ================= */}
          {currentStep === 'payment' && (
            <form onSubmit={handleExecutePayment} className="space-y-5">
              {/* Order Bill Summary */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                  <div className="min-w-0 pr-2">
                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {currentEvent?.title}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {currentEvent?.venue}, {currentEvent?.city}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] uppercase text-slate-400">Total Due</div>
                    <div className="font-mono text-base sm:text-lg font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {totalAmount === 0 ? 'FREE' : `₹${totalAmount}`}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <div>
                    <span className="text-slate-400">Attendee:</span> {fullName}
                  </div>
                  <div>
                    <span className="text-slate-400">Pass:</span> {ticketType}
                  </div>
                  <div>
                    <span className="text-slate-400">Quantity:</span> {ticketsCount} pass(es)
                  </div>
                </div>
              </div>

              {totalAmount === 0 ? (
                /* Free Event Fast Checkout */
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                  <Sparkles className="w-6 h-6 text-emerald-600 mx-auto" />
                  <div className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    Complimentary Community Event
                  </div>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 max-w-sm mx-auto">
                    No payment is required for this open KIIT hackathon. Click below to claim your verified digital pass immediately.
                  </p>
                </div>
              ) : (
                /* Paid Payment Methods Section */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Choose Indian Payment Method
                    </label>

                    {/* Method Selector Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('upi');
                          setPaymentError(null);
                        }}
                        className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          paymentMethod === 'upi'
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-400 dark:text-indigo-300 shadow-2xs'
                            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>UPI / QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('card');
                          setPaymentError(null);
                        }}
                        className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          paymentMethod === 'card'
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-400 dark:text-indigo-300 shadow-2xs'
                            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>Card / RuPay</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('netbanking');
                          setPaymentError(null);
                        }}
                        className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          paymentMethod === 'netbanking'
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-400 dark:text-indigo-300 shadow-2xs'
                            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <Landmark className="w-4 h-4" />
                        <span>Net Banking</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPaymentMethod('kiit_portal');
                          setPaymentError(null);
                        }}
                        className={`p-2.5 rounded-lg border text-xs font-semibold flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          paymentMethod === 'kiit_portal'
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-400 dark:text-indigo-300 shadow-2xs'
                            : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                        }`}
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>KIIT Portal</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Details Container */}
                  <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/60">
                    {/* OPTION A: UPI */}
                    {paymentMethod === 'upi' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                            Select Fast UPI App
                          </label>
                          <div className="grid grid-cols-4 gap-2">
                            {(['gpay', 'phonepe', 'paytm', 'bhim'] as const).map((app) => (
                              <button
                                key={app}
                                type="button"
                                onClick={() => setUpiApp(app)}
                                className={`py-2 px-1 text-xs rounded-lg border font-medium uppercase transition-colors cursor-pointer ${
                                  upiApp === app
                                    ? 'bg-indigo-600 text-white border-indigo-600'
                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                                }`}
                              >
                                {app}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="relative flex py-1 items-center">
                          <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
                          <span className="shrink-0 mx-2 text-[10px] text-slate-400 uppercase">Or Scan & Pay</span>
                          <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
                        </div>

                        {/* UPI QR Display */}
                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-white rounded border border-slate-300 shrink-0">
                              <div className="w-12 h-12 grid grid-cols-4 gap-0.5 bg-slate-900 p-0.5 rounded-xs">
                                {Array.from({ length: 16 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`rounded-2xs ${i % 3 === 0 ? 'bg-white' : 'bg-slate-900'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-xs">
                              <div className="font-bold text-slate-900 dark:text-slate-100">
                                Scan with BHIM / GPay / PhonePe
                              </div>
                              <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                                Instant verification at checkout
                              </div>
                            </div>
                          </div>

                          <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                            ₹{totalAmount}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Or Enter UPI Virtual Payment Address (VPA)
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* OPTION B: CREDIT / DEBIT CARD */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Card Number (RuPay, Visa, Mastercard)
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            placeholder="4532 8920 1823 4910"
                            maxLength={19}
                            className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            value={cardHolder}
                            onChange={(e) => setCardHolder(e.target.value)}
                            placeholder="e.g. Sambit Mohapatra"
                            className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              Expiry (MM/YY)
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                              placeholder="12/28"
                              maxLength={5}
                              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                              CVV
                            </label>
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                              placeholder="•••"
                              maxLength={4}
                              className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OPTION C: NET BANKING */}
                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-3">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Select Bank
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full py-2 px-3 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                        >
                          <option value="sbi">State Bank of India (SBI)</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="bob">Bank of Baroda</option>
                          <option value="pnb">Punjab National Bank</option>
                          <option value="canara">Canara Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                        </select>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          You will be simulated to complete authorization with your bank&rsquo;s secure gateway.
                        </p>
                      </div>
                    )}

                    {/* OPTION D: KIIT STUDENT PORTAL */}
                    {paymentMethod === 'kiit_portal' && (
                      <div className="space-y-3">
                        <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200">
                          <strong>KIIT Deemed to be University</strong> student and faculty activity fee billing.
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            KIIT Student Roll Number / Faculty ID <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={kiitRollNumber}
                            onChange={(e) => setKiitRollNumber(e.target.value)}
                            placeholder="e.g. 21051284 / F-892"
                            className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            KIIT School / Department
                          </label>
                          <select
                            value={kiitSchool}
                            onChange={(e) => setKiitSchool(e.target.value)}
                            className="w-full py-2 px-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                          >
                            <option value="Computer Engineering">School of Computer Engineering (Campus 15)</option>
                            <option value="Electronics & Electrical">School of Electronics / Electrical (Campus 3)</option>
                            <option value="Mechanical & Civil">School of Mechanical / Civil Engineering</option>
                            <option value="Architecture & Planning">School of Architecture & Planning</option>
                            <option value="Biotechnology">School of Biotechnology</option>
                            <option value="Management">School of Management (KSOM)</option>
                            <option value="Medical Sciences">Kalinga Institute of Medical Sciences (KIMS)</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {paymentError && (
                <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{paymentError}</span>
                </div>
              )}

              {/* Security Reassurance */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit SSL Encrypted Indian Payment Gateway</span>
              </div>

              {/* Payment Actions */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setCurrentStep('details')}
                  className="py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isProcessingPayment}
                  className="flex-1 py-3 px-4 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-75 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authorizing & Verifying Payment...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>
                        {totalAmount === 0 ? 'Confirm & Issue Free Pass' : `Pay ₹${totalAmount}`}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 3: CONFIRMED PASS VIEW ================= */}
          {currentStep === 'confirmation' && completedPass && (
            <div className="space-y-6">
              {/* Success Banner with Payment Tag */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
                    Payment Successful & Pass Confirmed!
                  </div>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300">
                    Thank you, <strong>{completedPass.fullName}</strong>. Your payment has been authorized and your verified digital pass has been stored on your device.
                  </p>
                </div>
              </div>

              {/* Digital Boarding Pass Ticket */}
              <div className="rounded-2xl border-2 border-dashed border-indigo-200 dark:border-indigo-900/80 bg-linear-to-br from-indigo-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 p-5 sm:p-6 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      Official KIIT Admission Ticket
                    </span>
                    <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
                      K Events Pass
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                      Pass Ref
                    </div>
                    <div className="font-mono text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {completedPass.id}
                    </div>
                  </div>
                </div>

                {/* Event Title & Location */}
                <div className="space-y-1">
                  <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {completedPass.eventTitle}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{completedPass.eventDate}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{completedPass.eventTime}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{completedPass.eventVenue}, {completedPass.eventCity}</span>
                    </span>
                  </div>
                </div>

                {/* Attendee Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/60 text-xs">
                  <div>
                    <div className="text-slate-400 uppercase tracking-wider text-[10px]">Attendee</div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100 truncate mt-0.5">
                      {completedPass.fullName}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase tracking-wider text-[10px]">Pass Tier</div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100 truncate mt-0.5">
                      {completedPass.ticketType}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase tracking-wider text-[10px]">Quantity</div>
                    <div className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5 tabular-nums">
                      {completedPass.ticketsCount} pass(es)
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 uppercase tracking-wider text-[10px]">Payment</div>
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                      <span>✓ {completedPass.paymentStatus || 'Paid'}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Reference & Transaction ID */}
                <div className="p-2.5 rounded-lg bg-slate-100/70 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Payment Method: </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {completedPass.paymentMethod || 'Online'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Txn ID: </span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {completedPass.transactionId || 'TXN-SUCCESS'}
                    </span>
                  </div>
                </div>

                {/* Simulated QR Code / Barcode & Security Strip */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    {/* Stylized QR representation */}
                    <div className="p-2 bg-white rounded-lg border border-slate-300 dark:border-slate-700 shadow-2xs">
                      <div className="grid grid-cols-6 gap-0.5 w-12 h-12">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div
                            key={i}
                            className={`rounded-2xs ${
                              (i % 2 === 0 || i % 5 === 0 || i < 8) && i !== 14
                                ? 'bg-slate-900'
                                : 'bg-transparent'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        Scan at Venue Gate
                      </div>
                      <div>Present student / photo ID with this pass</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-slate-400">Total Paid</div>
                    <div className="font-mono text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                      {completedPass.totalAmount === 0 ? 'FREE' : `₹${completedPass.totalAmount}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Confirmation Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="flex-1 min-w-[150px] py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <CalendarPlus className="w-4 h-4 text-indigo-500" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 min-w-[150px] py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-indigo-500" />
                  <span>Print Ticket</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 px-6 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors text-center cursor-pointer"
                >
                  Done & Back to Events
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
