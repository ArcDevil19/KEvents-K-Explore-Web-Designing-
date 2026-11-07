# K Events – Modern Responsive Event Management Platform

> A responsive, high-performance event discovery and pass management web application built with HTML5, modern CSS3 (Tailwind CSS v4), JavaScript/TypeScript, and React.

---

## 🚀 Live Demo & Project Links

- **Application URL**: Hosted on Google Cloud / AI Studio preview
- **Tech Stack**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Vite

---

## 📖 Project Overview & Problem Statement

**K Events** addresses the need for a seamless, visually engaging, and responsive event management platform for **KIIT Deemed to be University and the Bhubaneswar, Odisha** ecosystem where users can:
1. **Explore Upcoming Gatherings**: Browse high-impact technology summits, music festivals, design symposiums, and startup pitch events hosted across KIIT campuses and iconic Bhubaneswar venues.
2. **Real-Time Live Countdown on Every Event Card**: Every single event card features a synchronized, live countdown ticker (Days, Hours, Minutes, Seconds) updating continuously every second.
3. **Indian Currency (₹ INR)**: All event pass tiers, ticket multipliers, and transaction amounts are calculated and formatted in Indian Rupees (₹).
4. **Search & Filter Intelligently**: Filter events by category (Tech & AI, Music & Arts, Business & Startups, Health & Wellness, Design & Creative, Sports & Outdoor) and format (In-Person, Virtual, Hybrid), or search dynamically by title, campus, or venue.
5. **Inspect Detailed Event Schedules**: Review complete event overviews, hour-by-hour agendas, keynote speakers from KIIT and partner labs, included perks, and venue directions.
6. **Register with Rigorous Form Validation**: Enter participant name, email, Indian/international phone number, ticket tier, and pass count with real-time JavaScript validation.
7. **Receive Instant Verification Passes**: View a digital boarding pass with unique ticket ID (`KX-XXXXXX`), QR security code, print capability, and downloadable `.ics` calendar invitation.
8. **Local Storage-Based Pass Management**: Access saved passes offline, cancel registrations, or export passes as a JSON backup.

---

## ✨ Features & Implementation

### 0. Universal Authentication Gate (Open & Unrestricted for Everyone)
- **Open Access**: Any participant, student, developer, or guest can sign in or create an account with any valid email address (Gmail, Outlook, Yahoo, institutional, or custom domains).
- **Instant Login**: Sign in with your registered email and password. Includes a 1-click **Quick Demo Account** auto-fill button for fast testing.
- **Create Account Flow**:
  - Full Name, email address (no domain restrictions), mobile phone number, affiliation (Student, Professional, Creator, etc.), and optional Member/Student Roll ID.
  - Automatically logs the user in upon creation and pre-fills their details across all event registrations.
- **Session & Profile Management**: Persistent session in `localStorage`, user profile badge in the top navigation bar, and instant Sign Out.

### 1. Attractive Hero Section with Live Countdown
- High-impact split-column hero introducing K Events with KIIT trust metrics.
- Marquee spotlight card featuring the flagship **KIIT Global Tech & Sustainability Summit 2026** at Campus 6 Auditorium.
- Real-time countdown clock calculating Days, Hours, Minutes, and Seconds until registration closure.
- Trust metric counters (42+ Curated Venues, 15,800+ Attendees, 100% Verified Passes).

### 2. Live Countdown Timers on Every Event Card
- Dedicated 4-column live time ticker on every card displaying Days, Hours, Minutes, and Seconds with highlighted active seconds.
- Updates in real-time without layout shifts or memory leaks.

### 3. Event Discovery & Search Catalog
- Search input with instantaneous debounce-free query matching across titles, campuses, cities, venues, descriptions, and speakers.
- Segmented category buttons with active state highlighting.
- Format selector (In-Person, Virtual, Hybrid) and multi-option sort dropdown (Soonest Date, Furthest Date, Price Low-High, Price High-Low, Name A-Z).
- Bookmarks system: users can bookmark favorite events and toggle "Saved Events" view.

### 4. Rich Event Cards & Modals
- High-fidelity imagery with resilient CSS/SVG fallback containers (Zero-Broken-Image guarantee).
- Clean unboxed metadata with subtle typographic separators (`·`), adhering to anti-pill design standards.
- Detailed modal view displaying full narrative descriptions, interactive multi-track agendas, speaker profiles, and pass benefits.

### 5. Multi-Step Registration & Integrated Payment Checkout
- **Step 1: Attendee Information & Form Validation**:
  - Validates **Participant Name**, **Email Address** (RFC regex), **Phone Number** (10+ digits), and mandatory safety terms.
  - Dynamic pass tier multiplier and attendee count selector with instant price updates.
- **Step 2: Integrated Payment Section**:
  - Detailed order bill breakdown (Event, Campus Venue, Attendee, Tier, Total Payable in ₹).
  - Multiple Indian payment gateways supported:
    - **UPI / QR Code**: Quick apps (GPay, PhonePe, Paytm, BHIM), direct VPA input, and dynamic QR scanner.
    - **Credit / Debit Cards**: RuPay, Visa, Mastercard with card number spacing, MM/YY expiry, and CVV checks.
    - **Net Banking**: Major Indian banks (SBI, HDFC, ICICI, Axis, Bank of Baroda).
    - **KIIT Student & Faculty Portal**: Student Roll Number verification with departmental billing.
  - 256-bit encrypted gateway simulation with real-time authorization state.
- **Step 3: Instant Digital Boarding Pass**:
  - Issues verified pass with unique ID (`KX-XXXXXX`), transaction reference (`TXN-XXXXXXXX`), payment confirmation badge, printable ticket, and downloadable `.ics` calendar invitation.
  - Automatically saved to `localStorage` for offline retrieval and export.

### 5. Bonus Challenge Implementations
- 🌓 **Dark / Light Mode**: Full theme switcher with Tailwind CSS v4 `@custom-variant dark` support and persistence in `localStorage`.
- ⏱️ **Real-Time Event Countdowns**: Live ticking countdown timers in both hero spotlights and event detail views.
- 💾 **Local Storage-Based Pass Management**: Dedicated "My Passes" modal allowing attendees to view saved passes, cancel reservations, print tickets, and export pass data as JSON.
- 📅 **Add to Calendar (.ics)**: Dynamically generates RFC 5545 iCalendar (`.ics`) file downloads for registered events.
- 📱 **Fully Responsive Layout**: Fluid mobile drawer, sticky desktop top bar contract, touch targets $\ge 44\text{px}$, and adaptive grid arrangements for mobile, tablet, and desktop viewports.

---

## 🛠️ Local Development & Setup

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation Steps

1. **Extract or Clone the project**:
   ```bash
   cd k-events
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps or npm install -D vite 
   ```

3. **Start the development server**:
   In VS Code PowerShell / Command Prompt terminal (do **not** prepend `bash`):
   ```powershell
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

### ⚠️ Windows / VS Code Troubleshooting
- **`bash: Could not determine Node.js install directory`**:
  Do not type `bash npm run dev` in PowerShell. Type just `npm run dev`.
- **`npm error code ERESOLVE`**:
  Run `npm install --legacy-peer-deps` to bypass upstream Vite/esbuild optional peer constraints on Windows.

---


## 📋 Evaluation Criteria Adherence

| Criteria | Implementation Highlights |
| :--- | :--- |
| **Creativity & Design** | Domain-native typography (`Outfit` + `Plus Jakarta Sans`), cinematic imagery, clean unboxed metadata, and zero-pill discipline. |
| **UI / UX & Responsiveness** | Responsive navigation with mobile drawer, accessible focus rings, touch targets $\ge 44\text{px}$, and seamless modal dialogs. |
| **Form Validation** | Thorough client-side JavaScript validation with specific, actionable inline error messages. |
| **Bonus Features** | Dual light/dark theme, live countdown timers, `localStorage` pass management, ticket printing, and `.ics` calendar generation. |
| **Code Quality** | Modular React architecture, strictly typed TypeScript definitions, clean separation of components and storage utilities. |

---

## 📄 License
This project is open-source and available under the Apache-2.0 License.

---

## Author
Ankita Dey(24051309), KExplore Open elective- Web Designing
