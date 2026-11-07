import { Registration } from '../types/event';

const REGISTRATIONS_KEY = 'k_explore_registrations_v1';
const BOOKMARKS_KEY = 'k_explore_bookmarked_events_v1';
const THEME_KEY = 'k_explore_theme_v1';

export function getStoredRegistrations(): Registration[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REGISTRATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to read registrations from localStorage:', err);
    return [];
  }
}

export function saveRegistration(registration: Registration): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getStoredRegistrations();
    // Prepend newest first
    const updated = [registration, ...current.filter((r) => r.id !== registration.id)];
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Failed to save registration to localStorage:', err);
    return false;
  }
}

export function cancelRegistration(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getStoredRegistrations();
    const updated = current.map((r) => {
      if (r.id === id) {
        return { ...r, status: 'Cancelled' as const };
      }
      return r;
    });
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Failed to update registration in localStorage:', err);
    return false;
  }
}

export function deleteRegistration(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const current = getStoredRegistrations();
    const updated = current.filter((r) => r.id !== id);
    localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.error('Failed to delete registration from localStorage:', err);
    return false;
  }
}

export function getBookmarkedEventIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleBookmarkStorage(eventId: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getBookmarkedEventIds();
    const exists = current.includes(eventId);
    const updated = exists ? current.filter((id) => id !== eventId) : [...current, eventId];
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getStoredTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    // Default to system preference or light
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  } catch {
    return 'light';
  }
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch {
    // ignore
  }
}

export function generateRegistrationCode(): string {
  const num = Math.floor(100000 + Math.random() * 900000);
  return `KX-${num}`;
}

export function generateTransactionId(): string {
  const chars = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let str = '';
  for (let i = 0; i < 9; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TXN-${str}`;
}

export function exportRegistrationsJSON(registrations: Registration[]): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(registrations, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `k_explore_passes_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
