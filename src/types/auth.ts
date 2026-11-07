export interface KiitUser {
  fullName: string;
  email: string;
  phone: string;
  affiliation?: string; // e.g. "KIIT University Student", "Professional", "Guest Attendee"
  rollNumber?: string;
  school?: string;
  semester?: string;
  registeredAt: string;
}

export interface StoredKiitAccount extends KiitUser {
  password: string;
}
