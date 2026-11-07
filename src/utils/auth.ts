import { KiitUser, StoredKiitAccount } from '../types/auth';

const AUTH_USER_KEY = 'k_explore_auth_current_user_v2';
const REGISTERED_USERS_KEY = 'k_explore_registered_users_v2';

// Pre-seeded default account for instant testing by anyone
const DEFAULT_DEMO_USER: StoredKiitAccount = {
  fullName: 'Sambit Mohapatra',
  email: 'sambit@gmail.com',
  phone: '+91 98765 43210',
  affiliation: 'KIIT University Student',
  rollNumber: '21051284',
  school: 'School of Computer Engineering (Campus 15)',
  semester: '6th Semester (3rd Year)',
  registeredAt: '2026-08-01T10:00:00.000Z',
  password: 'demo@2026',
};

export function getStoredStudents(): StoredKiitAccount[] {
  if (typeof window === 'undefined') return [DEFAULT_DEMO_USER];
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (!raw) {
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify([DEFAULT_DEMO_USER]));
      return [DEFAULT_DEMO_USER];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [DEFAULT_DEMO_USER];
  } catch {
    return [DEFAULT_DEMO_USER];
  }
}

export function saveStoredStudents(students: StoredKiitAccount[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(students));
  } catch (err) {
    console.error('Failed to save users to localStorage', err);
  }
}

export function getStoredAuthUser(): KiitUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStoredAuthUser(user: KiitUser | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch {
    // ignore
  }
}

// Unrestricted standard email validation - allows anyone with any valid email
export function validateEmailUnrestricted(email: string): string | null {
  const trimmed = email.trim().toLowerCase();
  if (!trimmed) {
    return 'Email address is required.';
  }
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return 'Please enter a valid email address (e.g. yourname@gmail.com).';
  }
  return null;
}

export function registerKiitStudent(accountData: {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  affiliation?: string;
  rollNumber?: string;
  school?: string;
  semester?: string;
}): { success: boolean; error?: string; user?: KiitUser } {
  const emailErr = validateEmailUnrestricted(accountData.email);
  if (emailErr) return { success: false, error: emailErr };

  if (accountData.fullName.trim().length < 3) {
    return { success: false, error: 'Full name must be at least 3 characters long.' };
  }

  if (accountData.password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters long.' };
  }

  const existing = getStoredStudents();
  const normalizedEmail = accountData.email.trim().toLowerCase();
  const normalizedRoll = accountData.rollNumber?.trim();

  // Check if account already exists
  const duplicate = existing.find(
    (s) =>
      s.email.toLowerCase() === normalizedEmail ||
      (normalizedRoll && s.rollNumber && s.rollNumber === normalizedRoll)
  );

  if (duplicate) {
    return {
      success: false,
      error: `An account with email ${normalizedEmail} is already registered. Please log in.`,
    };
  }

  const newAccount: StoredKiitAccount = {
    fullName: accountData.fullName.trim(),
    email: normalizedEmail,
    phone: accountData.phone.trim(),
    affiliation: accountData.affiliation?.trim() || 'Attendee / Participant',
    rollNumber: normalizedRoll || undefined,
    school: accountData.school || undefined,
    semester: accountData.semester || undefined,
    registeredAt: new Date().toISOString(),
    password: accountData.password,
  };

  const updatedUsers = [...existing, newAccount];
  saveStoredStudents(updatedUsers);

  const { password, ...userOnly } = newAccount;
  setStoredAuthUser(userOnly);

  return { success: true, user: userOnly };
}

export function loginKiitStudent(
  identifier: string,
  password: string
): { success: boolean; error?: string; user?: KiitUser } {
  const trimmed = identifier.trim().toLowerCase();
  if (!trimmed) {
    return { success: false, error: 'Please enter your registered email address or Roll Number.' };
  }
  if (!password) {
    return { success: false, error: 'Please enter your password.' };
  }

  const existing = getStoredStudents();
  const matched = existing.find(
    (s) =>
      s.email.toLowerCase() === trimmed ||
      (s.rollNumber && s.rollNumber.toLowerCase() === trimmed)
  );

  if (!matched) {
    return {
      success: false,
      error: 'No account found with this email or ID. Please click "Create Account".',
    };
  }

  if (matched.password !== password) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }

  const { password: _, ...userOnly } = matched;
  setStoredAuthUser(userOnly);

  return { success: true, user: userOnly };
}

export function logoutKiitStudent(): void {
  setStoredAuthUser(null);
}

export const DEMO_CREDENTIALS = {
  identifier: DEFAULT_DEMO_USER.email,
  rollNumber: DEFAULT_DEMO_USER.rollNumber || '21051284',
  password: DEFAULT_DEMO_USER.password,
};
