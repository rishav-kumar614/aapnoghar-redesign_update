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

// ── Reset All to Defaults ────────────────────────────────────────
export function resetAllCMSData(): void {
  localStorage.removeItem(KEYS.rooms);
  localStorage.removeItem(KEYS.coupons);
  localStorage.removeItem(KEYS.tickets);
}
