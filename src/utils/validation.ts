export interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  eventId?: string;
  ticketType?: string;
  termsAccepted?: string;
}

export function validateFullName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Full name is required.';
  }
  if (trimmed.length < 3) {
    return 'Name must be at least 3 characters.';
  }
  // Allow letters, spaces, hyphens, and apostrophes
  const nameRegex = /^[a-zA-Z\s\-'.]+$/;
  if (!nameRegex.test(trimmed)) {
    return 'Name may only contain letters, spaces, hyphens, and apostrophes.';
  }
  return null;
}

export function validateEmail(email: string): string | null {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email address is required.';
  }
  // Standard RFC compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address (e.g., name@domain.com).';
  }
  return null;
}

export function validatePhone(phone: string): string | null {
  const trimmed = phone.trim();
  if (!trimmed) {
    return 'Phone number is required.';
  }
  // Remove formatting characters to count raw digits
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 10) {
    return 'Please enter a valid phone number with at least 10 digits.';
  }
  if (digitsOnly.length > 15) {
    return 'Phone number is too long (max 15 digits).';
  }
  // General phone format test allowing +, spaces, hyphens, parentheses
  const phoneFormatRegex = /^(\+?\d{1,4}[\s-]?)?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;
  if (!phoneFormatRegex.test(trimmed)) {
    return 'Invalid phone format (e.g. +1 555-019-2834).';
  }
  return null;
}

export function validateTermsAccepted(accepted: boolean): string | null {
  if (!accepted) {
    return 'You must agree to the event code of conduct and registration terms.';
  }
  return null;
}
