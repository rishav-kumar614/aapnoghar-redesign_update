/**
 * AapnoGhar CMS Store
 * localStorage-backed state management for Admin CMS <-> Website sync
 */

export type RoomItem = {
  id: string;
  name: string;
  price: number;
  unitsTotal: number;
  unitsAvailable: number;
  stopSell: boolean;
  axisSynced?: boolean;
};

export type CouponItem = {
  code: string;
  discountPct: number;
  expiry: string;
  usageCount: number;
  active: boolean;
};

export type TicketPricing = {
  waterWeekday: number;
  waterWeekend: number;
  amusement: number;
  adventure: number;
  comboTwin: number;
  comboAll: number;
};

// ── Default Data ────────────────────────────────────────────────
export const DEFAULT_ROOMS: RoomItem[] = [
  { id: "deluxe", name: "Deluxe Room", price: 5999, unitsTotal: 24, unitsAvailable: 3, stopSell: false },
  { id: "luxury", name: "Luxury Room", price: 7499, unitsTotal: 18, unitsAvailable: 2, stopSell: false },
  { id: "luxury2", name: "Luxury Room 2 (Pool Facing)", price: 7999, unitsTotal: 10, unitsAvailable: 4, stopSell: false },
  { id: "luxury_shower", name: "Luxury Room (Shower Glass)", price: 8499, unitsTotal: 8, unitsAvailable: 2, stopSell: false },
  { id: "suite", name: "Executive Suite (2-Room)", price: 11999, unitsTotal: 5, unitsAvailable: 1, stopSell: false },
  { id: "pres_ggn", name: "Presidential Suite — Gurgaon", price: 17999, unitsTotal: 1, unitsAvailable: 1, stopSell: false },
  { id: "pres_ncr", name: "Presidential Suite — Delhi NCR", price: 19999, unitsTotal: 1, unitsAvailable: 1, stopSell: false },
];

export const DEFAULT_COUPONS: CouponItem[] = [
  { code: "AAPNO10", discountPct: 10, expiry: "2026-12-31", usageCount: 248, active: true },
  { code: "SUMMER15", discountPct: 15, expiry: "2026-09-30", usageCount: 184, active: true },
  { code: "AAPNO20", discountPct: 20, expiry: "2026-08-31", usageCount: 92, active: true },
  { code: "WELCOME5", discountPct: 5, expiry: "2026-12-31", usageCount: 412, active: true },
];

export const DEFAULT_TICKETS: TicketPricing = {
  waterWeekday: 799,
  waterWeekend: 999,
  amusement: 599,
  adventure: 499,
  comboTwin: 1299,
  comboAll: 1699,
};

// ── Keys ─────────────────────────────────────────────────────────
const KEYS = {
  rooms: "ag_cms_rooms",
  coupons: "ag_cms_coupons",
  tickets: "ag_cms_tickets",
} as const;

// ── Rooms ────────────────────────────────────────────────────────
export function getRooms(): RoomItem[] {
  try {
    const raw = localStorage.getItem(KEYS.rooms);
    if (raw) return JSON.parse(raw) as RoomItem[];
  } catch {}
  return DEFAULT_ROOMS;
}

export function saveRooms(rooms: RoomItem[]): void {
  localStorage.setItem(KEYS.rooms, JSON.stringify(rooms));
}

// ── Coupons ──────────────────────────────────────────────────────
export function getCoupons(): CouponItem[] {
  try {
    const raw = localStorage.getItem(KEYS.coupons);
    if (raw) return JSON.parse(raw) as CouponItem[];
  } catch {}
  return DEFAULT_COUPONS;
}

export function saveCoupons(coupons: CouponItem[]): void {
  localStorage.setItem(KEYS.coupons, JSON.stringify(coupons));
}

export function validateCoupon(code: string): CouponItem | null {
  const coupons = getCoupons();
  const c = coupons.find(
    (x) => x.code.toUpperCase() === code.toUpperCase() && x.active
  );
  if (!c) return null;
  // Check expiry
  if (new Date(c.expiry) < new Date()) return null;
  return c;
}

// ── Ticket Pricing ───────────────────────────────────────────────
export function getTicketPricing(): TicketPricing {
  try {
    const raw = localStorage.getItem(KEYS.tickets);
    if (raw) return JSON.parse(raw) as TicketPricing;
  } catch {}
  return DEFAULT_TICKETS;
}

export function saveTicketPricing(pricing: TicketPricing): void {
  localStorage.setItem(KEYS.tickets, JSON.stringify(pricing));
}

// ── Job Vacancies & Applications ──────────────────────────────
export type JobVacancy = {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: string;
  salary?: string;
  desc: string;
  reqs: string[];
  active: boolean;
};

export type JobApplication = {
  id: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  resumeFileName: string;
  appliedDate: string;
  status: "New" | "Under Review" | "Shortlisted" | "Rejected";
};

export const DEFAULT_VACANCIES: JobVacancy[] = [
  {
    id: "job-1",
    title: "Front Desk Operations Executive",
    dept: "Hospitality & Front Desk",
    location: "Gurugram, HR",
    type: "Full-Time",
    salary: "₹3.5–4.8 LPA",
    desc: "Manage guest check-ins, room allocations, and concierge services for resort stays.",
    reqs: [
      "2+ years experience in hotel front desk operations",
      "Proficient in PMS software (Axis / IDS / Opera)",
      "Excellent communication skills in English & Hindi",
      "Degree or Diploma in Hotel Management preferred"
    ],
    active: true,
  },
  {
    id: "job-2",
    title: "Senior Banquet Event Manager",
    dept: "Events & Weddings",
    location: "Gurugram, HR",
    type: "Full-Time",
    salary: "₹5.0–7.5 LPA",
    desc: "Oversee banquet hall bookings, client meetings, catering coordination, and event execution.",
    reqs: [
      "3–5 years experience managing large-scale destination weddings & banquets",
      "Strong vendor management & stage/lighting vendor coordination",
      "Proven sales track record in luxury banquet sales",
      "Ability to handle events with 1000+ guest capacity"
    ],
    active: true,
  },
  {
    id: "job-3",
    title: "Certified Water Park Lifeguard",
    dept: "Park Safety Operations",
    location: "Gurugram, HR",
    type: "Full-Time",
    salary: "₹2.8–3.6 LPA",
    desc: "Supervise water slides, wave pool safety, and enforce guest safety protocols.",
    reqs: [
      "Certified Lifeguard (National Life Saving Society / Red Cross)",
      "First Aid & CPR certification mandatory",
      "1+ years experience at a water park or resort swimming pool",
      "Strong physical fitness and quick emergency response skills"
    ],
    active: true,
  },
  {
    id: "job-4",
    title: "Sous Chef (North Indian Pure Veg)",
    dept: "Food & Beverage",
    location: "Gurugram, HR",
    type: "Full-Time",
    salary: "₹4.5–6.0 LPA",
    desc: "Manage pure vegetarian kitchen operations, buffet menus, and Jain food preparation.",
    reqs: [
      "4+ years experience in authentic North Indian & Jain pure veg cooking",
      "Experience in bulk banquet catering (500+ covers)",
      "FSSAI hygiene standards certification",
      "Inventory & food cost control management"
    ],
    active: true,
  },
];

export const DEFAULT_APPLICATIONS: JobApplication[] = [
  {
    id: "APP-101",
    jobTitle: "Front Desk Operations Executive",
    applicantName: "Rohit Verma",
    email: "rohit.verma@gmail.com",
    phone: "+91 98110 22334",
    resumeFileName: "Rohit_Verma_Resume.pdf",
    appliedDate: "22 Aug 2026",
    status: "Shortlisted",
  },
  {
    id: "APP-102",
    jobTitle: "Senior Banquet Event Manager",
    applicantName: "Neha Sharma",
    email: "neha.events@yahoo.com",
    phone: "+91 98712 33445",
    resumeFileName: "Neha_Sharma_CV.pdf",
    appliedDate: "21 Aug 2026",
    status: "Under Review",
  },
  {
    id: "APP-103",
    jobTitle: "Certified Water Park Lifeguard",
    applicantName: "Amit Yadav",
    email: "amit.yadav92@gmail.com",
    phone: "+91 99100 44556",
    resumeFileName: "Amit_Yadav_Lifeguard_Cert.pdf",
    appliedDate: "20 Aug 2026",
    status: "New",
  },
];

const VACANCIES_KEY = "ag_cms_vacancies";
const APPLICATIONS_KEY = "ag_cms_applications";

export function getJobVacancies(): JobVacancy[] {
  try {
    const raw = localStorage.getItem(VACANCIES_KEY);
    if (raw) return JSON.parse(raw) as JobVacancy[];
  } catch {}
  return DEFAULT_VACANCIES;
}

export function saveJobVacancies(vacancies: JobVacancy[]): void {
  localStorage.setItem(VACANCIES_KEY, JSON.stringify(vacancies));
}

export function getJobApplications(): JobApplication[] {
  try {
    const raw = localStorage.getItem(APPLICATIONS_KEY);
    if (raw) return JSON.parse(raw) as JobApplication[];
  } catch {}
  return DEFAULT_APPLICATIONS;
}

export function saveJobApplications(applications: JobApplication[]): void {
  localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
}

export function addJobApplication(app: Omit<JobApplication, "id" | "appliedDate" | "status">): JobApplication {
  const current = getJobApplications();
  const newApp: JobApplication = {
    ...app,
    id: `APP-${100 + current.length + 1}`,
    appliedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    status: "New",
  };
  const updated = [newApp, ...current];
  saveJobApplications(updated);
  return newApp;
}

// ── Seasonal Management ─────────────────────────────────────────
export type SeasonalOffer = {
  id: string;
  festivalName: string;
  title: string;
  subtitle: string;
  code: string;
  discount: string;
  active: boolean;
};

export type SeasonalConfig = {
  waterParkOpen: boolean;
  holidayPricingActive: boolean;
  holidaySurchargePct: number;
  activeOfferId: string | null;
  offers: SeasonalOffer[];
};

export const DEFAULT_SEASONAL_OFFERS: SeasonalOffer[] = [
  {
    id: "new-year",
    festivalName: "New Year Eve",
    title: "Grand New Year Eve Gala & Stay Party",
    subtitle: "Unlimited DJ Night, Premium Drinks & Royal Buffet",
    code: "NYE2027",
    discount: "20% OFF",
    active: true,
  },
  {
    id: "holi",
    festivalName: "Holi Festival",
    title: "Holi Color Splash & Rain Dance Carnival",
    subtitle: "Organic Colors, Live Dhol, Rain Dance & Desi Thali",
    code: "HOLI2026",
    discount: "15% OFF",
    active: false,
  },
  {
    id: "independence",
    festivalName: "Independence Day",
    title: "Freedom Long Weekend Family Package",
    subtitle: "Water Park + Staycation Combo Passes",
    code: "FREEDOM15",
    discount: "15% OFF",
    active: false,
  },
  {
    id: "diwali",
    festivalName: "Diwali Festivities",
    title: "Diwali Royal Heritage Staycation",
    subtitle: "Complimentary Gala Dinner & Festive Gift Hamper",
    code: "DIWALI20",
    discount: "20% OFF",
    active: false,
  },
  {
    id: "valentine",
    festivalName: "Valentine's Day",
    title: "Romantic Couple Escape & Candlelight Dinner",
    subtitle: "Luxury Suite Stay, Poolside Dinner & Cake",
    code: "LOVE2026",
    discount: "₹2,000 OFF",
    active: false,
  },
  {
    id: "wedding-season",
    festivalName: "Wedding Season",
    title: "Royal Wedding Lawn Booking Special",
    subtitle: "Exclusive Inclusions on Chander & Bhanwar Lawn Bookings",
    code: "MAHURAT10",
    discount: "10% OFF",
    active: false,
  },
];

export const DEFAULT_SEASONAL_CONFIG: SeasonalConfig = {
  waterParkOpen: true,
  holidayPricingActive: false,
  holidaySurchargePct: 15,
  activeOfferId: "new-year",
  offers: DEFAULT_SEASONAL_OFFERS,
};

const SEASONAL_KEY = "ag_cms_seasonal";

export function getSeasonalConfig(): SeasonalConfig {
  try {
    const raw = localStorage.getItem(SEASONAL_KEY);
    if (raw) return JSON.parse(raw) as SeasonalConfig;
  } catch {}
  return DEFAULT_SEASONAL_CONFIG;
}

export function saveSeasonalConfig(config: SeasonalConfig): void {
  localStorage.setItem(SEASONAL_KEY, JSON.stringify(config));
}

// ── Landing Page System ──────────────────────────────────────────
export type LandingPageItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  offerCode: string;
  discountText: string;
  priceText: string;
  inclusions: string[];
  serviceCategory: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
};

export const DEFAULT_LANDING_PAGES: LandingPageItem[] = [
  {
    id: "lp-independence",
    slug: "independence-day-package",
    title: "15th August Independence Day Freedom Carnival Package",
    subtitle: "Celebrate Freedom with Unlimited Water Park Thrills & Royal Pure-Veg Buffet",
    heroImage: "/images/hero_water_park.jpg",
    offerCode: "FREEDOM15",
    discountText: "15% OFF",
    priceText: "₹1,199 / Person",
    inclusions: [
      "Full Day Unlimited Access to 21 Thrill Water Slides & Pools",
      "Complimentary Pure-Veg Breakfast, Grand Lunch & Evening Snacks",
      "Live DJ Dance Party & Tricolor Rain Dance Carnival",
      "Free Parking & Lockers Included"
    ],
    serviceCategory: "Water Park & Resort",
    metaTitle: "Independence Day Special Package 2026 | AapnoGhar Water Park Gurugram",
    metaDescription: "Book AapnoGhar 15th August Independence Day Freedom Package. Get 15% OFF on water park passes & pure veg buffet.",
    published: true,
  },
  {
    id: "lp-newyear",
    slug: "new-year-package",
    title: "Grand New Year Eve Gala Night & Stay Celebration",
    subtitle: "Ring in 2027 with Celebrity DJ, Unlimited Drinks, Premium Gala Buffet & Overnight Stay",
    heroImage: "/images/room_presidential.jpg",
    offerCode: "NYE2027",
    discountText: "20% OFF",
    priceText: "₹8,999 / Couple",
    inclusions: [
      "Overnight Stay in Luxury Resort Room for 2 Guests",
      "Unlimited Live DJ Gala Night & Midnight Fireworks Countdown",
      "Lavish 50+ Item Multi-Cuisine Gala Dinner & Breakfast",
      "Complimentary Access to Amusement Park Rides Next Day"
    ],
    serviceCategory: "Resort Stay",
    metaTitle: "New Year Eve Party & Stay Package 2027 | AapnoGhar Resort Gurgaon",
    metaDescription: "Celebrate New Year Eve at AapnoGhar Resort. Book luxury room stay + gala dinner + DJ night with 20% discount.",
    published: true,
  },
  {
    id: "lp-waterpark",
    slug: "water-park-offer",
    title: "Beat The Heat — Summer Water Park Special Pass",
    subtitle: "21 High-Speed Slides, Mega Wave Pool, Rain Dance & Unlimited Buffet",
    heroImage: "/images/water-park-slide-1.jpg",
    offerCode: "SUMMERCOOL",
    discountText: "FLAT ₹200 OFF",
    priceText: "₹1,099 / Pass",
    inclusions: [
      "All 21 Water Slides & Family Fun Pool Access",
      "Unlimited Buffet (Breakfast, Lunch & Evening Hi-Tea)",
      "Rain Dance Arena with Live DJ Beats",
      "Special Group Discounts for 10+ Guests"
    ],
    serviceCategory: "Water Park",
    metaTitle: "Water Park Ticket Offer & Discount Passes | AapnoGhar Gurugram",
    metaDescription: "Get flat ₹200 OFF on AapnoGhar Water Park tickets. Includes 21 slides, wave pool, rain dance & 100% veg buffet.",
    published: true,
  },
  {
    id: "lp-wedding",
    slug: "wedding-offer",
    title: "Royal Wedding Lawn Booking Special — Mahurat Discount",
    subtitle: "Book Gurugram's Premier 9-Acre Lush Green Wedding Lawns with Luxury Rooms",
    heroImage: "/images/chander-party-lawn.jpg",
    offerCode: "MAHURAT10",
    discountText: "10% OFF",
    priceText: "Custom Package",
    inclusions: [
      "9-Acre Lush Green Chander & Bhanwar Wedding Lawns (Up to 3000 Guests)",
      "67 Air-Conditioned Luxury Guest Rooms for Marriage Parties",
      "Pure Vegetarian Customized Royal Catering Menu",
      "In-House Valet Parking for 500+ Vehicles"
    ],
    serviceCategory: "Weddings & Banquets",
    metaTitle: "Wedding Lawns Booking Offer | AapnoGhar Resort Gurugram",
    metaDescription: "Exclusive 10% OFF on wedding lawn bookings at AapnoGhar Resort Gurgaon. 9-acre lush green lawns & 67 luxury rooms.",
    published: true,
  },
];

const LANDING_PAGES_KEY = "ag_cms_landing_pages";

export function getLandingPages(): LandingPageItem[] {
  try {
    const raw = localStorage.getItem(LANDING_PAGES_KEY);
    if (raw) return JSON.parse(raw) as LandingPageItem[];
  } catch {}
  return DEFAULT_LANDING_PAGES;
}

export function saveLandingPages(pages: LandingPageItem[]): void {
  localStorage.setItem(LANDING_PAGES_KEY, JSON.stringify(pages));
}

export function getLandingPageBySlug(slug: string): LandingPageItem | undefined {
  const pages = getLandingPages();
  return pages.find(p => p.slug === slug.toLowerCase().trim() && p.published);
}

// ── Reset All to Defaults ────────────────────────────────────────
export function resetAllCMSData(): void {
  localStorage.removeItem(KEYS.rooms);
  localStorage.removeItem(KEYS.coupons);
  localStorage.removeItem(KEYS.tickets);
  localStorage.removeItem(VACANCIES_KEY);
  localStorage.removeItem(APPLICATIONS_KEY);
  localStorage.removeItem(SEASONAL_KEY);
  localStorage.removeItem(LANDING_PAGES_KEY);
}

