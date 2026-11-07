import { EventItem } from '../types/event';

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'k-tech-2026',
    title: 'KIIT Global Tech & Sustainability Summit 2026',
    subtitle: 'Next-Generation AI Architectures, Clean Compute & Digital Infrastructure',
    category: 'Tech & AI',
    format: 'Hybrid',
    date: '2026-11-24T09:30:00',
    displayDate: 'Nov 24, 2026',
    time: '09:30 AM – 05:30 PM IST',
    venue: 'Campus 6 Auditorium, KIIT Deemed to be University',
    address: 'Campus 6, Patia',
    city: 'Bhubaneswar, Odisha',
    price: 999,
    currency: '₹',
    totalSeats: 850,
    seatsLeft: 74,
    image: `${import.meta.env.BASE_URL}assets/images/event_tech_summit_1794062162729.jpg`,
    shortDescription:
      'Join 800+ technologists, research scholars, and cloud architects at KIIT discussing AI inference, sustainable data centers, and digital public infrastructure.',
    fullDescription:
      'The KIIT Global Tech & Sustainability Summit 2026 brings together leading minds from premier technology labs, academia, and enterprise cloud consortiums. Over an intensive full-day program at the Campus 6 Auditorium, attendees will delve into model optimization pipelines, zero-carbon computing, and hands-on developer workshops.',
    featured: true,
    speakers: [
      {
        name: 'Dr. Evelyn Vance',
        role: 'Chief Infrastructure Scientist',
        company: 'Apex Neural Labs',
      },
      {
        name: 'Marcus Sterling',
        role: 'VP of Sustainable Computing',
        company: 'CloudGreen Global',
      },
      {
        name: 'Prof. Ananya Mahapatra',
        role: 'Head of Computer Engineering',
        company: 'KIIT Deemed to be University',
      },
    ],
    agenda: [
      {
        time: '09:30 AM',
        title: 'Registration & Welcome Coffee',
        description: 'Badge pickup at Campus 6 foyer, networking tea, and project exhibition showcase.',
      },
      {
        time: '10:30 AM',
        title: 'Keynote: Energy-Efficient AI Systems in Indian Compute',
        description: 'Real-world benchmarks on low-power inference models and regional data centers.',
        speakerName: 'Dr. Evelyn Vance',
      },
      {
        time: '12:00 PM',
        title: 'Panel: Designing Resilient Microservices for High-Traffic Loads',
        description: 'Case studies on high-scale systems and fault-tolerant cloud design.',
        speakerName: 'Marcus Sterling & Panel',
      },
      {
        time: '01:15 PM',
        title: 'Networking Lunch at Campus 6 Banquet Hall',
        description: 'Catered executive buffet and hardware demonstration sessions.',
      },
      {
        time: '02:30 PM',
        title: 'Hands-on Labs: Distributed Training Optimization',
        description: 'Deep dive into memory caching strategies and parallel cluster tuning.',
      },
      {
        time: '04:45 PM',
        title: 'Closing Address & Networking Reception',
        description: 'Open discussion forum, speaker Q&A, and research awards ceremony.',
      },
    ],
    perks: [
      'Full access to all keynote sessions and breakout technical tracks',
      'Complimentary executive lunch, espresso & refreshments at Campus 6',
      'Exclusive digital repository with session recordings and code templates',
      'Official Certificate of Participation and attendee networking directory',
    ],
    organizer: {
      name: 'KIIT Explore Tech Society',
      contactEmail: 'tech@kiit.ac.in',
      website: 'https://kiit.ac.in',
    },
  },
  {
    id: 'k-music-acoustic',
    title: 'Twilight Acoustic & Indie Sessions: K-Rhythm',
    subtitle: 'An intimate evening of live indie folk, ambient strings, and acoustic sets',
    category: 'Music & Arts',
    format: 'In-Person',
    date: '2026-11-28T17:30:00',
    displayDate: 'Nov 28, 2026',
    time: '05:30 PM – 10:30 PM IST',
    venue: 'Rose Garden & Open-Air Amphitheatre, Campus 7, KIIT',
    address: 'Campus 7, KIIT University, Patia',
    city: 'Bhubaneswar, Odisha',
    price: 299,
    currency: '₹',
    totalSeats: 600,
    seatsLeft: 128,
    image: `${import.meta.env.BASE_URL}assets/images/event_music_festival_1794062164097.jpg`,
    shortDescription:
      'Immerse yourself in sunset melodies, warm fairy lights, artisan food stalls, and soulful acoustic performances under the open sky at KIIT Campus 7.',
    fullDescription:
      'Twilight Acoustic & Indie Sessions is an open-air celebration of stripped-down musical craftsmanship. Set against the evening ambiance of the lush Rose Garden Amphitheatre at Campus 7, this festival showcases regional indie songwriters, acoustic trios, and contemporary folk performers.',
    featured: true,
    speakers: [
      {
        name: 'Clara Beaumont',
        role: 'Singer-Songwriter & Acoustic Guitarist',
        company: 'Independent Artist',
      },
      {
        name: 'Eastern Strings Ensemble',
        role: 'Contemporary Chamber Quartet',
        company: 'Bhubaneswar Music Collective',
      },
      {
        name: 'Rohan Tripathy',
        role: 'Folk Multi-Instrumentalist',
        company: 'Utkal Acoustic Collective',
      },
    ],
    agenda: [
      {
        time: '05:30 PM',
        title: 'Gates Open & Rose Garden Courtyard Prelude',
        description: 'Local refreshments, artisan craft kiosks, and opening guitar sets.',
      },
      {
        time: '06:30 PM',
        title: 'Sunset Session: Clara Beaumont',
        description: 'Original acoustic ballads performed during twilight hour.',
        speakerName: 'Clara Beaumont',
      },
      {
        time: '08:00 PM',
        title: 'Intermission & Campus Food Stalls',
        description: 'Curated hot beverages, snacks, and acoustic jam circles.',
      },
      {
        time: '08:45 PM',
        title: 'Eastern Strings Ensemble Live',
        description: 'Modern orchestral interpretations of indie anthems under string lanterns.',
        speakerName: 'Eastern Strings Ensemble',
      },
      {
        time: '10:00 PM',
        title: 'All-Star Finale Jam & Acoustic Encore',
        description: 'Unamplified fireside ensemble with audience participation.',
      },
    ],
    perks: [
      'Reserved amphitheatre seating in the Rose Garden zone',
      'Welcome beverage voucher (hot coffee, artisan chai, or iced cooler)',
      'Commemorative event wristband and printed setlist keepsake',
      'Campus parking pass with dedicated volunteer assistance',
    ],
    organizer: {
      name: 'KIIT Cultural Society (K-Rhythm)',
      contactEmail: 'cultural@kiit.ac.in',
    },
  },
  {
    id: 'k-design-symposium',
    title: 'Kalinga Spatial & Sustainable Product Design Symposium',
    subtitle: 'Exploring Human-Scale Architecture, Bamboo Innovation & Kinetic Interfaces',
    category: 'Design & Creative',
    format: 'In-Person',
    date: '2026-12-05T10:00:00',
    displayDate: 'Dec 05, 2026',
    time: '10:00 AM – 05:30 PM IST',
    venue: 'Sculpture Garden & Architecture Atrium, Campus 3, KIIT',
    address: 'School of Architecture & Planning, Campus 3, Patia',
    city: 'Bhubaneswar, Odisha',
    price: 499,
    currency: '₹',
    totalSeats: 350,
    seatsLeft: 38,
    image: `${import.meta.env.BASE_URL}assets/images/event_design_symposium_1794062164517.jpg`,
    shortDescription:
      'A hands-on symposium for architects, UI/UX designers, and industrial creators shaping spatial environments with sustainable bamboo and local craftsmanship.',
    fullDescription:
      'How will architects and product designers balance sustainable indigenous materials with computational modeling over the next decade? The Kalinga Spatial & Design Symposium unites architects, computational creators, and traditional terracotta craftsmen for collaborative critiques at Campus 3.',
    featured: false,
    speakers: [
      {
        name: 'Ar. Henrik Lindqvist',
        role: 'Principal Architectural Director',
        company: 'Nordic Habitat Collective',
      },
      {
        name: 'Prof. Suchitra Das',
        role: 'Dean, Architecture & Planning',
        company: 'KIIT Deemed to be University',
      },
      {
        name: 'Elena Rostova',
        role: 'Sustainable Materials Researcher',
        company: 'Bio-Polymer Alliance',
      },
    ],
    agenda: [
      {
        time: '10:00 AM',
        title: 'Gallery Walk: 3D Architectural Prototypes',
        description: 'Explore scale models of climate-responsive dwellings and bamboo structures.',
      },
      {
        time: '11:15 AM',
        title: 'Talk: Daylight Circulation & Tropical Architecture',
        description: 'Examining natural airflow, shading verandas, and daylight acoustics.',
        speakerName: 'Ar. Henrik Lindqvist',
      },
      {
        time: '01:00 PM',
        title: 'Designers Communal Lunch',
        description: 'Networking roundtables on sustainable urbanism and public spaces.',
      },
      {
        time: '02:30 PM',
        title: 'Hands-On Critique Workshop',
        description: 'Interactive portfolio blueprints critique with senior design mentors.',
      },
      {
        time: '04:45 PM',
        title: 'Design Monograph Release & Wrap-Up',
        description: 'Hardcover publication presentation and student showcase honors.',
      },
    ],
    perks: [
      'Full day design gallery access and workshop materials',
      'Hardcover copy of the Spatial Design Annual Monograph',
      'Indigenous materials sample kit curated by Odisha Craft Council',
      'Invitation to the evening design mixer at Campus 3',
    ],
    organizer: {
      name: 'KIIT School of Architecture & Planning',
      contactEmail: 'design@kiit.ac.in',
    },
  },
  {
    id: 'k-startup-arena',
    title: 'KIIT-TBI Founders Arena & Eastern Venture Forum',
    subtitle: 'Connecting Pre-Seed to Series A Startups with Active Angels & Impact Funds',
    category: 'Business & Startups',
    format: 'Hybrid',
    date: '2026-12-10T09:00:00',
    displayDate: 'Dec 10, 2026',
    time: '09:00 AM – 06:00 PM IST',
    venue: 'KIIT Technology Business Incubator (KIIT-TBI), Campus 11',
    address: 'Campus 11, KIIT Deemed to be University, Patia',
    city: 'Bhubaneswar, Odisha',
    price: 799,
    currency: '₹',
    totalSeats: 500,
    seatsLeft: 52,
    image: `${import.meta.env.BASE_URL}assets/images/event_startup_pitch_1794062164798.jpg`,
    shortDescription:
      'Watch 24 vetted Eastern India startups pitch live to top angel groups and VC partners at KIIT-TBI, featuring 1-on-1 investor matchmaking pods.',
    fullDescription:
      'The KIIT-TBI Founders Arena is Eastern India’s flagship investor-startup forum. Hosted at the state-of-the-art incubation hub in Campus 11, the day features rapid 5-minute pitches, focused partner Q&As, and curated speed-dating pods for founders seeking growth capital.',
    featured: true,
    speakers: [
      {
        name: 'Rachel Sterling',
        role: 'General Partner',
        company: 'Vanguard Seed Syndicate',
      },
      {
        name: 'Dr. Mrutyunjay Suar',
        role: 'CEO, KIIT-TBI & Innovation Mentor',
        company: 'KIIT Technology Business Incubator',
      },
      {
        name: 'Darius Thorne',
        role: 'Angel Investor & Venture Partner',
        company: 'HyperScale Capital',
      },
    ],
    agenda: [
      {
        time: '09:00 AM',
        title: 'Founder Breakfast & Investor Check-In',
        description: 'Distribution of pitch summaries and curated founder bios at KIIT-TBI.',
      },
      {
        time: '10:00 AM',
        title: 'Block 1: DeepTech & Enterprise SaaS Pitches',
        description: '12 high-conviction startups pitch to partner investment judges.',
      },
      {
        time: '01:00 PM',
        title: 'Structured 1-on-1 Investor Pods (Round 1)',
        description: 'Pre-scheduled 15-minute speed meetings in the incubation suites.',
      },
      {
        time: '02:30 PM',
        title: 'Block 2: BioTech, Health & AgriTech Pitches',
        description: 'Physical prototypes and laboratory demos on stage.',
      },
      {
        time: '04:30 PM',
        title: 'Fireside: Navigating Seed Rounds in Tier-2 Ecosystems',
        description: 'Strategies for leveraging regional incubation grants and venture capital.',
        speakerName: 'Dr. Mrutyunjay Suar & Panel',
      },
      {
        time: '05:30 PM',
        title: 'Grant Prize Ceremony & Founder Mixer',
        description: 'Non-dilutive grant prize distribution and high-tea networking.',
      },
    ],
    perks: [
      'Pitch book inclusion distributed to 100+ institutional angels',
      'Access to the 1-on-1 investor matchmaking portal at KIIT-TBI',
      'Free legal and IPR clinic with startup compliance advisors',
      'Post-event deal room follow-up tracking access',
    ],
    organizer: {
      name: 'KIIT Technology Business Incubator (KIIT-TBI)',
      contactEmail: 'tbi@kiit.ac.in',
    },
  },
  {
    id: 'k-crowd-flagship',
    title: 'KIIT Fest Annual Culture & Star Night Gala',
    subtitle: 'Celebrating Student Talent, Academic Milestones & Mega Musical Concert',
    category: 'Music & Arts',
    format: 'In-Person',
    date: '2026-12-18T18:00:00',
    displayDate: 'Dec 18, 2026',
    time: '06:00 PM – 11:00 PM IST',
    venue: 'KISS Convention Centre & Grand Auditorium',
    address: 'Near KIIT Square, Patia',
    city: 'Bhubaneswar, Odisha',
    price: 399,
    currency: '₹',
    totalSeats: 1200,
    seatsLeft: 210,
    image: `${import.meta.env.BASE_URL}assets/images/hero_event_crowd_1794062160931.jpg`,
    shortDescription:
      'Eastern India’s largest collegiate cultural festival featuring star musicians, student creator awards, dramatic showcases, and celebratory banquet.',
    fullDescription:
      'Join thousands of students, alumni, and faculty for the landmark KIIT Fest Culture Gala. The massive KISS Convention Centre lights up for an unforgettable evening of classical Odissi recitals, contemporary band performances, annual leadership honors, and vibrant community spirit.',
    featured: false,
    speakers: [
      {
        name: 'Dr. Achyuta Samanta',
        role: 'Founder & Educational Visionary',
        company: 'KIIT & KISS Group of Institutions',
      },
      {
        name: 'Shreya Sengupta',
        role: 'Bollywood & Playback Vocalist',
        company: 'Guest Performer',
      },
    ],
    agenda: [
      {
        time: '06:00 PM',
        title: 'Red Carpet Entrance & Welcome Drum Troupes',
        description: 'Traditional Sambalpuri & Dhemsa dance reception at the main foyer.',
      },
      {
        time: '07:00 PM',
        title: 'Impact Awards & Founders Address',
        description: 'Honoring top student innovators, social volunteers, and sports stars.',
      },
      {
        time: '08:15 PM',
        title: 'Odyssey Fusion & Contemporary Drama',
        description: 'Award-winning university theatre group performance.',
      },
      {
        time: '09:30 PM',
        title: 'Celebrity Concert & Grand Finale',
        description: 'Live 90-minute headline musical performance with light show.',
      },
    ],
    perks: [
      'Grand auditorium premium tiered seating',
      'Exclusive festival kit bag, wristband, and glow gear',
      'Complimentary banquet dinner voucher at the food court',
      'Access to official photograph zone and meet-and-greet area',
    ],
    organizer: {
      name: 'KIIT Student Activity Centre (KSAC)',
      contactEmail: 'ksac@kiit.ac.in',
    },
  },
  {
    id: 'k-health-wellness',
    title: 'KIMS Mindful Horizons: Clinical Wellness & Yoga Science Expo',
    subtitle: 'Evidence-Based Nutrition, Circadian Sleep Hygiene & Integrative Health',
    category: 'Health & Wellness',
    format: 'In-Person',
    date: '2027-01-16T08:30:00',
    displayDate: 'Jan 16, 2027',
    time: '08:30 AM – 04:30 PM IST',
    venue: 'KIMS Auditorium Complex, Campus 5',
    address: 'Kalinga Institute of Medical Sciences, Kushabhadra Campus, Patia',
    city: 'Bhubaneswar, Odisha',
    price: 199,
    currency: '₹',
    totalSeats: 450,
    seatsLeft: 94,
    image: `${import.meta.env.BASE_URL}assets/images/hero_event_crowd_1794062160931.jpg`,    shortDescription:
      'Learn clinical sleep hygiene, pranayama respiration techniques, and preventative health protocols with leading medical doctors and yoga scientists at KIMS.',
    fullDescription:
      'Step into an evidence-driven sanctuary of human health at the Kalinga Institute of Medical Sciences. Through structured lectures by senior clinicians, hands-on posture analysis, and certified breathwork instructors, this one-day expo provides scientific tools for lifelong vitality.',
    featured: false,
    speakers: [
      {
        name: 'Dr. Aris Thorne, MD',
        role: 'Consultant Neurologist & Sleep Specialist',
        company: 'Circadian Health Network',
      },
      {
        name: 'Dr. Sasmita Pattnaik',
        role: 'Professor of Community Medicine',
        company: 'Kalinga Institute of Medical Sciences (KIMS)',
      },
    ],
    agenda: [
      {
        time: '08:30 AM',
        title: 'Morning Guided Pranayama & Joint Mobility',
        description: 'Gentle nervous system relaxation on the KIMS lawn.',
      },
      {
        time: '10:00 AM',
        title: 'Keynote: Medical Sleep Cycles & Cognitive Longevity',
        description: 'Understanding deep sleep restoration, blue light hygiene, and memory consolidation.',
      },
      {
        time: '01:00 PM',
        title: 'Nutritious Ayurvedic-Clinical Buffet',
        description: 'Gut-microbiome friendly meal prepared with organic local grains.',
      },
      {
        time: '02:30 PM',
        title: 'Interactive Biometrics, Ergonomics & Vitals Screening',
        description: 'Free health metrics analysis and personalized ergonomic workstation tips.',
      },
    ],
    perks: [
      'Access to all medical lectures, yoga sessions, and health exhibitions',
      'Healthy nutritionist-curated lunch and herbal infusion teas',
      'Free blood pressure, posture, and vital capacity screening',
      'Wellness wellness kit with acupressure guide and recovery band',
    ],
    organizer: {
      name: 'Kalinga Institute of Medical Sciences (KIMS)',
      contactEmail: 'kims@kiit.ac.in',
    },
  },
  {
    id: 'k-sports-endurance',
    title: 'Chandaka Trail & KIIT Endurance Marathon Masterclass',
    subtitle: 'Cross-Country Navigation, Sports Biomechanics & Hydration Physiology',
    category: 'Sports & Outdoor',
    format: 'In-Person',
    date: '2027-02-06T06:30:00',
    displayDate: 'Feb 06, 2027',
    time: '06:30 AM – 02:00 PM IST',
    venue: 'KIIT Multi-Sport Stadium Complex, Campus 13',
    address: 'Campus 13, KIIT Sports Village, Patia',
    city: 'Bhubaneswar, Odisha',
    price: 249,
    currency: '₹',
    totalSeats: 300,
    seatsLeft: 42,
    image: `${import.meta.env.BASE_URL}assets/images/hero_event_crowd_1794062160931.jpg`,
    shortDescription:
      'Train with national ultramarathoners, sports physiotherapists, and trail coaches near Chandaka Sanctuary trails and KIIT Stadium.',
    fullDescription:
      'Designed for distance runners, sprinters, and outdoor enthusiasts! Starting at the Olympic-standard KIIT Stadium in Campus 13 and extending along the scenic trails of Chandaka wildlife corridor, this masterclass covers foot biomechanics, electrolyte management, and wilderness trail safety.',
    featured: false,
    speakers: [
      {
        name: 'Camila Morales',
        role: 'Ultra Distance Trail Champion',
        company: 'Mountain Athletics Global',
      },
      {
        name: 'Coach Ranjan Barik',
        role: 'Director of Athletics',
        company: 'KIIT Sports Village & Stadium',
      },
    ],
    agenda: [
      {
        time: '06:30 AM',
        title: 'Morning 5K Guided Trail Shakeout',
        description: 'Paced warmup run focusing on cadence and uphill foot strike.',
      },
      {
        time: '08:30 AM',
        title: 'Electrolyte & Caloric Fueling Masterclass',
        description: 'Preventing dehydration and lactic acid buildup during long endurance runs.',
      },
      {
        time: '11:00 AM',
        title: 'Sports Recovery & Cold Water Therapy Demo',
        description: 'Hands-on recovery protocols at the KIIT Aquatic & Sports Center.',
      },
      {
        time: '12:30 PM',
        title: 'High-Protein Athletes Lunch & Q&A',
        description: 'Nutritional meal box and personal consultation with sports physiotherapists.',
      },
    ],
    perks: [
      'Custom technical moisture-wicking running tee & visor',
      'Electrolyte hydration pack and energy gel sampler',
      'Free day pass to KIIT Olympic swimming pool and fitness gym',
      'Official Certificate of Masterclass Completion',
    ],
    organizer: {
      name: 'KIIT Sports Authority',
      contactEmail: 'sports@kiit.ac.in',
    },
  },
  {
    id: 'k-free-community-dev',
    title: 'KIIT FOSS Community CodeSprint & Hackathon',
    subtitle: 'Collaborate on Open Source Tools, Indic Language Models & Web Frameworks',
    category: 'Tech & AI',
    format: 'Virtual',
    date: '2027-01-23T10:00:00',
    displayDate: 'Jan 23, 2027',
    time: '10:00 AM – 07:00 PM IST',
    venue: 'School of Computer Engineering (Campus 15), Lab Complex 4',
    address: 'Campus 15, KIIT Deemed to be University, Patia',
    city: 'Bhubaneswar, Odisha',
    price: 0, // Free Pass!
    currency: '₹',
    totalSeats: 1500,
    seatsLeft: 640,
    image: `${import.meta.env.BASE_URL}assets/images/event_design_symposium_1794062164517.jpg`,
    shortDescription:
      'A 100% free open-source hackathon at KIIT Campus 15 & online Discord, building public good web accessibility, developer tools, and Indian language datasets.',
    fullDescription:
      'Open to student coders, designers, and open-source contributors across Bhubaneswar and globally! Join in person at the Campus 15 Computer Labs or online via Discord to resolve open GitHub issues, craft accessible UI components, and learn from seasoned maintainers.',
    featured: false,
    speakers: [
      {
        name: 'Tariq Al-Mansoor',
        role: 'Open Source Fellow',
        company: 'Web Standards Guild',
      },
      {
        name: 'Sarah Jenkins',
        role: 'Accessibility Advocate',
        company: 'A11y World Project',
      },
    ],
    agenda: [
      {
        time: '10:00 AM',
        title: 'Kickoff Keynote & Repo Walkthrough',
        description: 'Introduction of open repos, beginner issues, and mentor assignments at Campus 15.',
      },
      {
        time: '11:00 AM',
        title: 'Sprint Hacking Phase: Team Collaboration',
        description: 'Pair programming and pull request development with maintainer guidance.',
      },
      {
        time: '03:30 PM',
        title: 'Mid-Sprint Code Review & Linting Clinic',
        description: 'Live PR reviews and automated test pipeline troubleshooting.',
      },
      {
        time: '06:00 PM',
        title: 'Project Showcase, Merged PR Leaderboard & Digital Badges',
        description: 'Honoring top student contributors with community merchandise and certificates.',
      },
    ],
    perks: [
      '100% Free digital participation pass with verified GitHub badge',
      'Exclusive live mentorship from open-source maintainers',
      'Access to the KIIT Developer alumni Discord network',
      'Raffle entry for cloud developer credits and open-source swag kits',
    ],
    organizer: {
      name: 'KIIT Open Source Community',
      contactEmail: 'foss@kiit.ac.in',
    },
  },
];
