import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Zap, HeartHandshake, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How do I receive my admission pass after registering?',
    answer:
      'Immediately upon submitting the registration form with valid contact information, K Events automatically issues a unique digital pass (e.g. KX-849201) along with a verified QR code. The pass is securely saved to your local browser storage under "My Passes", and you can download an .ics calendar invite or print your ticket on demand.',
  },
  {
    question: 'Can I cancel or modify my registration later?',
    answer:
      'Yes. Open the "My Passes" navigation link anytime to review your registered events. You can cancel your reservation with a single click, which frees up your seat for other community members. You can also export your passes as a JSON file.',
  },
  {
    question: 'Are there any hidden booking fees on K Events?',
    answer:
      'No. K Events practices zero hidden fee transparency. For free community events, admission is 100% free with zero checkout markup. For paid summits and symposiums, the displayed price is the exact total you pay at venue check-in.',
  },
  {
    question: 'What do I need to bring for venue check-in?',
    answer:
      'Please bring a government-issued photo ID matching the participant name on your registration pass, and present your digital ticket barcode or printed voucher on your smartphone at the registration desk.',
  },
];

export const AboutSection: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section id="about-section" className="py-16 lg:py-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Platform Mission & Values */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              About K Events Platform
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white font-['Outfit'] leading-tight">
              Curating meaningful gatherings for curious minds.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Founded to connect the vibrant KIIT University community and Bhubaneswar with transformative experiences, K Events provides a responsive, accessible discovery engine for high-impact gatherings across technology, design, music, and business.
            </p>

            {/* Feature pillars */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Verified Passes & Direct Entry
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Every ticket includes cryptographic verification and QR credentials recognized by venue staff.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Instant Client-Side Storage
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Your passes remain immediately accessible even when your network connection drops.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Zero Dark Patterns
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    No forced subscriptions, surprise checkout surcharges, or opaque refund processes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <span>Frequently Asked Questions</span>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-800/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
