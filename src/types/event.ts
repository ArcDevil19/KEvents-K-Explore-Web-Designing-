export type EventCategory =
  | 'Tech & AI'
  | 'Music & Arts'
  | 'Business & Startups'
  | 'Health & Wellness'
  | 'Design & Creative'
  | 'Sports & Outdoor';

export type EventFormat = 'In-Person' | 'Virtual' | 'Hybrid';

export interface Speaker {
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  description: string;
  speakerName?: string;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: EventCategory;
  format: EventFormat;
  date: string; // ISO date string, e.g. "2026-11-20T09:00:00"
  displayDate: string; // e.g. "Nov 20, 2026"
  time: string; // e.g. "09:00 AM – 05:30 PM"
  venue: string;
  address: string;
  city: string;
  price: number; // 0 for Free
  currency: string;
  totalSeats: number;
  seatsLeft: number;
  image: string;
  shortDescription: string;
  fullDescription: string;
  featured?: boolean;
  speakers: Speaker[];
  agenda: AgendaItem[];
  perks: string[];
  organizer: {
    name: string;
    contactEmail: string;
    website?: string;
  };
}

export type TicketType = 'Standard Pass' | 'VIP All-Access' | 'Student / Early Bird';

export interface Registration {
  id: string; // e.g., "KX-849201"
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventCity: string;
  eventImage: string;
  fullName: string;
  email: string;
  phone: string;
  ticketType: TicketType;
  ticketsCount: number;
  pricePerTicket: number;
  totalAmount: number;
  specialNotes?: string;
  registeredAt: string; // ISO string
  status: 'Confirmed' | 'Attended' | 'Cancelled';
  paymentStatus?: 'Paid' | 'Free' | 'Pending';
  paymentMethod?: string;
  transactionId?: string;
}

export interface FilterState {
  search: string;
  category: string;
  format: string;
  sortBy: 'date-asc' | 'date-desc' | 'price-asc' | 'price-desc' | 'name-asc';
  dateFilter: 'all' | 'upcoming' | 'this-month';
}
