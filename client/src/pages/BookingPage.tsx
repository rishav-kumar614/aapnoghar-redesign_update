import React, { useState, useMemo } from "react";
import { Link } from "wouter";
import {
  BedDouble, Star, Waves, Heart, Briefcase, School,
  CalendarDays, Users, Check, ChevronRight, ChevronLeft,
  BadgePercent, ShieldCheck, Phone, MessageCircle,
  Sparkles, CheckCircle2, ArrowRight, Clock, MapPin,
  Utensils, Wifi, Coffee, Award, Sparkle, Tag, HelpCircle,
  SlidersHorizontal, ChevronDown
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

type TabId = "room" | "package" | "park" | "wedding" | "corporate" | "school";

type Tab = {
  id: TabId;
  label: string;
  sublabel: string;
  badge?: string;
  icon: React.ReactNode;
  accentColor: string;
};

const TABS: Tab[] = [
  { id: "room",      label: "Resort Stay",     sublabel: "67 Luxury Rooms & Suites",       badge: "Rooms",   icon: <BedDouble size={20} />,  accentColor: "#0E295B" },
  { id: "package",   label: "Stay Packages",   sublabel: "Staycation & Outing Combos",     badge: "Offers",  icon: <Star size={20} />,       accentColor: "#8B5CF6" },
  { id: "park",      label: "Park Passes",     sublabel: "Water & Amusement Joyrides",     badge: "Passes",  icon: <Waves size={20} />,      accentColor: "#01A5E1" },
  { id: "wedding",   label: "Weddings & Lawns",sublabel: "50 to 2,500 Capacity Venues",    badge: "Events",  icon: <Heart size={20} />,      accentColor: "#EF4444" },
  { id: "corporate", label: "Corporate Offsite",sublabel: "Conferences & Team Outings",    badge: "MICE",    icon: <Briefcase size={20} />,  accentColor: "#F68734" },
  { id: "school",    label: "Group Picnics",   sublabel: "Schools, Colleges & Family Trips",badge: "Groups",  icon: <School size={20} />,     accentColor: "#10B981" },
];

const ROOMS = [
  {
    name: "Deluxe Room",
    price: 5999,
    capacity: 2,
    unitsLeft: 3,
    tag: "Popular",
    image: "/images/room_deluxe.jpg",
    desc: "Refined elegance with premium king bed, garden-facing windows, rain shower & sitting space.",
    features: ["Complimentary Breakfast", "Water Park Access", "High-speed Wi-Fi", "Pure Veg Dining"],
  },
  {
    name: "Luxury Room",
    price: 7499,
    capacity: 3,
    unitsLeft: 2,
    tag: "Best for Couples",
    image: "/images/room_luxury.jpg",
    desc: "Warm luxury ambience with hand-crafted wooden accents, private sit-out and plush furnishings.",
    features: ["Buffet Breakfast", "All Parks Access", "Smart TV & Minibar", "Garden Patio"],
  },
  {
    name: "Luxury Room 2",
    price: 7999,
    capacity: 3,
    unitsLeft: 4,
    tag: "Pool Facing",
    image: "/images/luxury-room-2-Room.jpg",
    desc: "Premium pool-view room with modern layout, high ceilings, luxury linens and morning tea setup.",
    features: ["Pool View Balcony", "Breakfast Included", "Water Slides Access", "Express Check-in"],
  },
  {
    name: "Luxury Room (Shower Glass)",
    price: 8499,
    capacity: 3,
    unitsLeft: 2,
    tag: "Designer Interior",
    image: "/images/Luxury-Room-with-Partition-Glass-Room.jpg",
    desc: "Contemporary architectural design with transparent shower glass partition & ambient mood lights.",
    features: ["Designer Glass Bath", "All Meals Option", "Complimentary High-Tea", "VIP Welcome"],
  },
  {
    name: "Executive Suite",
    price: 11999,
    capacity: 4,
    unitsLeft: 1,
    tag: "Spacious 2-Room",
    image: "/images/room_suite.jpg",
    desc: "Master bedroom with separate royal living lounge, two private balconies and dedicated butler assist.",
    features: ["Separate Living Lounge", "All 3 Parks Included", "Buffet Breakfast & Lunch", "VIP Priority Entry"],
  },
  {
    name: "Presidential Suite — Gurgaon",
    price: 17999,
    capacity: 6,
    unitsLeft: 1,
    tag: "Royal Heritage",
    image: "/images/presidential-suite-room-1-Room.jpg",
    desc: "1,200 sq.ft ultra-luxury villa residence with lavish dining room, royal bedroom & lawn terrace.",
    features: ["1,200 Sq.Ft Villa", "Jacuzzi Bathtub", "All Buffet Meals Included", "Dedicated Concierge"],
  },
  {
    name: "Presidential Suite — Delhi NCR",
    price: 19999,
    capacity: 6,
    unitsLeft: 1,
    tag: "Signature Residence",
    image: "/images/room_presidential.jpg",
    desc: "Our finest presidential suite featuring majestic interiors, private lawn access and opulent comforts.",
    features: ["Private Lawn Access", "Spa & Jacuzzi", "Royal 3-Course Meals", "Late Check-out"],
  },
];

const PACKAGES = [
  {
    name: "Day Outing Picnic (Without Stay)",
    price: 2499,
    tag: "Best Day Visit",
    image: "/images/full-day-picnic-package-1-aapno-ghar.jpg",
    desc: "Full day carnival & water adventure with breakfast, grand vegetarian buffet lunch & hi-tea snacks.",
    includes: ["21 Water Slides & Wave Pool", "20+ Amusement Joyrides", "Pure Veg Lunch Buffet", "Evening Hi-Tea & Snacks"],
  },
  {
    name: "Staycation Basic (1N / 2D)",
    price: 6999,
    tag: "Weekend Starter",
    image: "/images/room_deluxe.jpg",
    desc: "Deluxe room accommodation with morning breakfast feast and complimentary water park entry.",
    includes: ["Deluxe Room Stay (1 Night)", "Grand Breakfast Buffet", "Unlimited Water Park Access", "Free Parking & Wi-Fi"],
  },
  {
    name: "Staycation Premium (All Meals)",
    price: 11999,
    tag: "All-Inclusive",
    image: "/images/room_luxury.jpg",
    desc: "Luxury room stay with unlimited access to Water, Amusement & Adventure parks with all 3 buffet meals.",
    includes: ["Luxury Room Stay", "Breakfast + Lunch + Dinner", "All 3 Parks Unlimited", "Evening Tea & Snacks"],
  },
  {
    name: "Family Mega Pack (Up to 4 Guests)",
    price: 15999,
    tag: "Family Special",
    image: "/images/room_suite.jpg",
    desc: "Executive Suite stay for family with 24 adventure rope courses, all meals and VIP park entries.",
    includes: ["Executive Suite 2-Room Stay", "All Buffet Feasts", "24 Adventure Obstacle Courses", "Welcome Drinks on Arrival"],
  },
  {
    name: "Honeymoon & Anniversary Special",
    price: 13999,
    tag: "Romantic Escape",
    image: "/images/presidential-suite-room-1-Room.jpg",
    desc: "Presidential suite experience with romantic candlelight dinner setup, cake, flowers & park access.",
    includes: ["Presidential Suite Residence", "Candlelight Dinner Setup", "Anniversary Cake & Decor", "Late Check-out (2 PM)"],
  },
];

const PARK_TICKETS = [
  {
    name: "Water Park — Weekday Pass",
    price: 799,
    tag: "Mon–Fri Special",
    image: "/images/water-park-aapno-ghar.jpg",
    desc: "Entry to 21 thrill slides, giant wave pool, mist pool, rain dance floor and kids aqua play zones.",
  },
  {
    name: "Water Park — Weekend Pass",
    price: 999,
    tag: "Sat, Sun & Holidays",
    image: "/images/hero_water_park.jpg",
    desc: "Weekend splash festival with live DJ music on rain dance floor, giant wave pool and all 21 slides.",
  },
  {
    name: "Amusement Joyrides Pass",
    price: 599,
    tag: "All Ages",
    image: "/images/amusement_park.jpg",
    desc: "20+ classic carnival joyrides including Caterpillar Coaster, Flying Bobs, Break Dance & Ferris Wheel.",
  },
  {
    name: "Adventure Zone Pass",
    price: 499,
    tag: "Thrill Obstacles",
    image: "/images/full-day-picnic-package-3-aapno-ghar.jpg",
    desc: "24 military-style rope obstacle courses, Burma bridge, swinging planks, zip line & commando nets.",
  },
  {
    name: "Twin Park Combo Pass",
    price: 1299,
    tag: "Value Saver",
    image: "/images/amusement-park-aapno-ghar.jpg",
    desc: "Full day combo pass covering both Water Park slides and Amusement Park carnival joyrides.",
  },
  {
    name: "All-in-One Mega Park Pass",
    price: 1699,
    tag: "All Parks Access",
    image: "/images/hero_water_park.jpg",
    desc: "The complete AapnoGhar park experience: Water Park + Amusement Rides + 24 Adventure Rope Courses.",
  },
];

const COUPONS: Record<string, { pct: number; label: string }> = {
  AAPNO10: { pct: 10, label: "10% Off Direct Booking" },
  SUMMER15: { pct: 15, label: "15% Off Summer Special" },
  AAPNO20: { pct: 20, label: "20% Off Weekend Combo" },
  WELCOME5: { pct: 5, label: "5% Welcome Discount" },
};

const GROUP_SIZES = [
  "1–2 Guests", "3–4 Guests", "5–8 Guests", "9–15 Guests",
  "16–25 Guests", "26–50 Guests", "51–100 Guests", "100+ Large Group"
];

function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

import { getRooms, validateCoupon, getTicketPricing } from "@/lib/cmsStore";

// Form State
export default function BookingPage() {
  const [activeTab, setActiveTab] = useState<TabId>("room");
  const [step, setStep] = useState<1 | 2>(1);

  // Live CMS Data
  const [cmsRooms] = useState(() => getRooms());
  const [cmsTickets] = useState(() => getTicketPricing());

  // Dynamic Rooms merged with CMS Prices & Stock
  const liveRooms = useMemo(() => {
    return ROOMS.map((r, i) => {
      const liveData = cmsRooms[i] || cmsRooms.find((cr) => cr.name.toLowerCase().includes(r.name.toLowerCase()));
      return {
        ...r,
        price: liveData ? liveData.price : r.price,
        unitsLeft: liveData ? liveData.unitsAvailable : r.unitsLeft,
        stopSell: liveData ? liveData.stopSell : false,
      };
    });
  }, [cmsRooms]);

  // Dynamic Tickets merged with CMS Ticket Rates
  const liveTickets = useMemo(() => {
    return PARK_TICKETS.map((t) => {
      if (t.name.includes("Weekday")) return { ...t, price: cmsTickets.waterWeekday };
      if (t.name.includes("Weekend")) return { ...t, price: cmsTickets.waterWeekend };
      if (t.name.includes("Twin")) return { ...t, price: cmsTickets.comboTwin };
      if (t.name.includes("All-in-One")) return { ...t, price: cmsTickets.comboAll };
      return t;
    });
  }, [cmsTickets]);

  // Selections
  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0].name);
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[0].name);
  const [selectedTicket, setSelectedTicket] = useState(PARK_TICKETS[0].name);
  const [ticketQty, setTicketQty] = useState(2);

  // Dates & Guests
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests");

  // Contact
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [eventType, setEventType] = useState("Grand Wedding & Reception");
  const [venuePref, setVenuePref] = useState("Chander Party Lawn (200–2,500 Guests)");
  const [orgName, setOrgName] = useState("");

  // Coupon
  const [couponCode, setCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState<null | "valid" | "invalid">(null);
  const [discountPct, setDiscountPct] = useState(0);

  // Form State
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const currentTab = TABS.find((t) => t.id === activeTab)!;

  // Nights calculation
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const diff = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(1, Math.round(diff / 86400000));
  }, [checkIn, checkOut]);

  // Pricing calculation
  const basePrice = useMemo(() => {
    if (activeTab === "room") return liveRooms.find((r) => r.name === selectedRoom)?.price ?? 0;
    if (activeTab === "package") return PACKAGES.find((p) => p.name === selectedPackage)?.price ?? 0;
    if (activeTab === "park") return (liveTickets.find((t) => t.name === selectedTicket)?.price ?? 0) * ticketQty;
    return 0;
  }, [activeTab, selectedRoom, selectedPackage, selectedTicket, ticketQty, liveRooms, liveTickets]);

  const discountAmount = Math.round((basePrice * discountPct) / 100);
  const priceAfterDiscount = basePrice - discountAmount;
  const grandTotal = (activeTab === "room" || activeTab === "package") ? priceAfterDiscount * nights : priceAfterDiscount;

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    const valid = validateCoupon(code);
    if (valid) {
      setCouponCode(code);
      setDiscountPct(valid.discountPct);
      setCouponStatus("valid");
    } else {
      setDiscountPct(0);
      setCouponStatus("invalid");
    }
  };

  const validate = (): boolean => {
    const err: Record<string, string> = {};
    if (step === 1) {
      if ((activeTab === "room" || activeTab === "package") && !checkIn) err.checkIn = "Check-in date is required";
      if ((activeTab === "room" || activeTab === "package") && !checkOut) err.checkOut = "Check-out date is required";
      if ((activeTab === "park" || activeTab === "wedding" || activeTab === "corporate" || activeTab === "school") && !checkIn) {
        err.checkIn = "Please select your event / visit date";
      }
    }
    if (step === 2) {
      if (!name.trim()) err.name = "Full name is required";
      if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) err.phone = "Enter a valid 10-digit mobile number";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleProceedToStep2 = () => {
    if (validate()) {
      setStep(2);
      window.scrollTo({ top: 380, behavior: "smooth" });
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    let msg = `*ONLINE DIRECT BOOKING — AAPNOGHAR RESORT*\n`;
    msg += `═══════════════════════════════════════\n`;
    msg += `✨ *Category:* ${currentTab.label}\n`;
    if (activeTab === "room") msg += `🏨 *Room Selected:* ${selectedRoom}\n`;
    if (activeTab === "package") msg += `🎁 *Package Selected:* ${selectedPackage}\n`;
    if (activeTab === "park") msg += `🌊 *Pass Selected:* ${selectedTicket} × ${ticketQty} Person(s)\n`;
    if (activeTab === "wedding") {
      msg += `💍 *Occasion:* ${eventType}\n`;
      msg += `🏛️ *Venue Choice:* ${venuePref}\n`;
    }
    if (activeTab === "corporate") {
      msg += `💼 *Corporate Event:* ${eventType}\n`;
      if (orgName) msg += `🏢 *Company:* ${orgName}\n`;
    }
    if (activeTab === "school") {
      msg += `🚌 *Group Outing:* ${eventType}\n`;
      if (orgName) msg += `🏫 *Institution:* ${orgName}\n`;
    }

    if (checkIn) msg += `📅 *Date:* ${checkIn}${checkOut ? ` to ${checkOut} (${nights} Night(s))` : ""}\n`;
    msg += `👥 *Guests / Quantity:* ${activeTab === "park" ? `${ticketQty} Persons` : guests}\n`;

    if (grandTotal > 0) {
      msg += `💰 *Estimated Total:* ${formatPrice(grandTotal)}\n`;
      if (discountPct > 0) msg += `🏷️ *Coupon Applied:* ${couponCode} (${discountPct}% Off)\n`;
    }

    msg += `═══════════════════════════════════════\n`;
    msg += `👤 *Primary Guest:* ${name}\n`;
    msg += `📱 *WhatsApp Mobile:* ${phone}\n`;
    if (email) msg += `📧 *Email Address:* ${email}\n`;
    if (specialNote) msg += `📝 *Special Request:* ${specialNote}\n`;
    msg += `\n_Please confirm availability and booking voucher._`;

    setTimeout(() => {
      window.open(`https://wa.me/917666779997?text=${encodeURIComponent(msg)}`, "_blank");
      setIsSubmitting(false);
      setIsConfirmed(true);
      window.scrollTo({ top: 150, behavior: "smooth" });
    }, 850);
  };

  return (
    <div className="site-shell bg-[#F8F9FB] min-h-screen text-[#0E295B] font-sans antialiased">
      <SiteHeader />

      <main className="pt-24 sm:pt-28 pb-24">
        {/* =========================================================================
            LUXURY HERO HEADER WITH OVERLAY & TRUST STATS
            ========================================================================= */}
        <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-[#0E295B] text-white">
            {/* Background Image with Cinematic Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src="/images/hero_water_park.jpg"
                alt="AapnoGhar Resort"
                className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0E295B] via-[#0E295B]/90 to-[#01A5E1]/60" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 p-8 sm:p-12 lg:p-14">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-[#F68734] text-white text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  <Sparkles size={13} /> Official Booking Engine
                </span>
                <span className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-md text-white/90 text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                  <ShieldCheck size={14} className="text-emerald-400" /> Best Rate Guarantee
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white max-w-3xl leading-[1.15] mb-4">
                Reserve Your Stay, Park Adventure or Grand Celebration
              </h1>

              <p className="text-white/80 text-sm sm:text-base max-w-2xl leading-relaxed mb-8">
                Customize your dates, explore live room rates, apply seasonal promo discounts, and receive instant booking confirmation via WhatsApp or phone within minutes.
              </p>

              {/* Quick Trust Highlights Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15 max-w-4xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#F68734] shrink-0 font-bold text-sm">
                    ★
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-tight">4.8 / 5 Rating</div>
                    <div className="text-[11px] text-white/60">12,000+ Happy Guests</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-emerald-400 shrink-0">
                    <Utensils size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-tight">100% Pure Veg</div>
                    <div className="text-[11px] text-white/60">Royal Buffet Feasts</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-[#01A5E1] shrink-0">
                    <Clock size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-tight">30-Min Fast Desk</div>
                    <div className="text-[11px] text-white/60">Instant Confirmation</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-rose-400 shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-bold leading-tight">9-Acre Sanctuary</div>
                    <div className="text-[11px] text-white/60">NH-8 Gurugram</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONFIRMED STATE SCREEN
            ========================================================================= */}
        {isConfirmed ? (
          <section className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 text-center">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-emerald-200">
                <CheckCircle2 size={46} strokeWidth={2.2} />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 inline-block mb-3">
                Booking Enquiry Dispatched
              </span>
              <h2 className="text-3xl font-extrabold text-[#0E295B] mb-3 font-display">
                Thank You, {name || "Guest"}!
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
                Your reservation parameters have been sent directly to the AapnoGhar reservation desk on WhatsApp. Our concierge will confirm availability and send your voucher receipt shortly.
              </p>

              {/* Receipt Summary Card */}
              <div className="bg-[#F8F9FB] rounded-2xl p-6 mb-8 text-left space-y-3.5 border border-gray-200/80">
                <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-3">
                  <span className="text-gray-500 font-medium">Service Category</span>
                  <strong className="text-[#0E295B] font-bold">{currentTab.label}</strong>
                </div>
                {activeTab === "room" && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Selected Room</span>
                    <strong className="text-[#0E295B]">{selectedRoom}</strong>
                  </div>
                )}
                {activeTab === "package" && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Selected Package</span>
                    <strong className="text-[#0E295B]">{selectedPackage}</strong>
                  </div>
                )}
                {activeTab === "park" && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Ticket Passes</span>
                    <strong className="text-[#0E295B]">{selectedTicket} × {ticketQty}</strong>
                  </div>
                )}
                {checkIn && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Date of Visit / Stay</span>
                    <strong className="text-[#0E295B]">{checkIn}{checkOut ? ` to ${checkOut}` : ""}</strong>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Primary Contact</span>
                  <strong className="text-[#0E295B]">{phone}</strong>
                </div>
                {grandTotal > 0 && (
                  <div className="flex justify-between items-center text-sm pt-3 border-t border-gray-200">
                    <span className="text-gray-600 font-bold">Estimated Amount</span>
                    <strong className="text-2xl font-extrabold text-[#F68734]">{formatPrice(grandTotal)}</strong>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => { setIsConfirmed(false); setStep(1); }}
                  className="px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-sm transition"
                >
                  Create Another Booking
                </button>
                <Link
                  href="/"
                  className="px-8 py-3.5 rounded-xl bg-[#0E295B] hover:bg-[#1a448d] text-white font-bold text-sm shadow-lg shadow-[#0E295B]/20 transition flex items-center justify-center gap-2"
                >
                  Explore Resort Homepage <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        ) : (
          /* =========================================================================
              MAIN INTERACTIVE BOOKING ENGINE
              ========================================================================= */
          <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* 6 Category Tabs - Luxury Segmented Cards */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0E295B]" />
                  <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#0E295B] font-display">
                    Step 1: Select Your Experience Category
                  </h2>
                </div>
                <span className="text-xs font-semibold text-gray-500 hidden sm:inline">Click to switch service</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => { setActiveTab(tab.id); setStep(1); setErrors({}); }}
                      className={`booking-cat-btn ${isActive ? "booking-cat-btn--active" : ""}`}
                    >
                      <div className="flex items-center justify-between w-full mb-2.5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isActive ? "bg-[#0E295B] text-white shadow-md" : "bg-gray-100 text-gray-600"}`}>
                          {tab.icon}
                        </div>
                        {tab.badge && (
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${isActive ? "bg-[#F68734] text-white" : "bg-gray-100 text-gray-500"}`}>
                            {tab.badge}
                          </span>
                        )}
                      </div>

                      <div className="w-full">
                        <div className={`font-extrabold text-sm leading-snug mb-0.5 ${isActive ? "text-[#0E295B]" : "text-gray-800"}`}>
                          {tab.label}
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium line-clamp-1">
                          {tab.sublabel}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Layout: Main Form Area (8 cols) + Sticky Cart / Summary (4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form Steps */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-200/80">
                {/* Step Breadcrumb Progress */}
                <div className="flex items-center justify-between pb-6 mb-8 border-b border-gray-100">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm transition-colors ${step >= 1 ? "bg-[#0E295B] text-white shadow-md" : "bg-gray-100 text-gray-400"}`}>
                      1
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-[#0E295B]">Select Option & Custom Dates</div>
                      <div className="text-xs text-gray-500">Pick room, package or ticket count</div>
                    </div>
                  </div>
                  <div className="hidden sm:block flex-1 max-w-[80px] h-0.5 bg-gray-200 mx-4" />
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm transition-colors ${step >= 2 ? "bg-[#0E295B] text-white shadow-md" : "bg-gray-100 text-gray-400"}`}>
                      2
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-[#0E295B]">Guest Details & Voucher</div>
                      <div className="text-xs text-gray-500">Instant WhatsApp verification</div>
                    </div>
                  </div>
                </div>

                {/* ── STEP 1: OPTIONS & DATES ── */}
                {step === 1 && (
                  <div className="space-y-8">
                    {/* 1. ROOM BOOKING */}
                    {activeTab === "room" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-[#0E295B] flex items-center gap-2">
                            <BedDouble size={20} className="text-[#01A5E1]" /> Available Rooms & Luxury Suites
                          </h3>
                          <span className="text-xs font-semibold text-gray-500">7 Room Types</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          {liveRooms.map((room) => {
                            const isSel = selectedRoom === room.name;
                            return (
                              <div
                                key={room.name}
                                onClick={() => setSelectedRoom(room.name)}
                                className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-200 flex flex-col justify-between ${
                                  isSel
                                    ? "border-[#0E295B] bg-[#F4F7FF] shadow-lg ring-1 ring-[#0E295B]"
                                    : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-md"
                                }`}
                              >
                                {/* Room Image Thumbnail with Tag */}
                                <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                                  <img
                                    src={room.image}
                                    alt={room.name}
                                    className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                  {room.tag && (
                                    <span className="absolute top-3 right-3 text-[10px] uppercase font-extrabold tracking-wider bg-[#F68734] text-white px-2.5 py-1 rounded-full shadow-md">
                                      {room.tag}
                                    </span>
                                  )}
                                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white flex items-center gap-1.5 drop-shadow">
                                    <Users size={14} /> Up to {room.capacity} Guests
                                  </span>
                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-center justify-between gap-2 mb-2 bg-amber-50/90 border border-amber-200/80 px-2.5 py-1 rounded-lg">
                                      <span className="text-[11px] font-extrabold text-amber-900 flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        Only {room.unitsLeft} Room{room.unitsLeft > 1 ? "s" : ""} Left
                                      </span>
                                      <span className="text-[10px] font-extrabold text-[#0E295B] uppercase bg-white/80 px-1.5 py-0.5 rounded border border-amber-200">
                                        Axis Live
                                      </span>
                                    </div>

                                    <h4 className="font-extrabold text-[#0E295B] text-base mb-1">{room.name}</h4>
                                    <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">{room.desc}</p>
                                    
                                    {/* Features Badges */}
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                      {room.features.slice(0, 3).map((f) => (
                                        <span key={f} className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                                          <Check size={10} className="text-emerald-600" /> {f}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="pt-3 border-t border-gray-200/80 flex items-center justify-between">
                                    <div>
                                      <span className="text-xl font-extrabold text-[#F68734]">{formatPrice(room.price)}</span>
                                      <span className="text-xs text-gray-500 font-medium ml-1">/ night</span>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${isSel ? "border-[#0E295B] bg-[#0E295B] text-white" : "border-gray-300"}`}>
                                      {isSel && <Check size={14} />}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 2. STAY PACKAGES */}
                    {activeTab === "package" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-[#0E295B] flex items-center gap-2">
                            <Star size={20} className="text-purple-600" /> All-Inclusive Staycation & Outing Packages
                          </h3>
                          <span className="text-xs font-semibold text-gray-500">5 Packages</span>
                        </div>

                        <div className="space-y-4 mb-6">
                          {PACKAGES.map((pkg) => {
                            const isSel = selectedPackage === pkg.name;
                            return (
                              <div
                                key={pkg.name}
                                onClick={() => setSelectedPackage(pkg.name)}
                                className={`cursor-pointer rounded-2xl p-5 border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                                  isSel
                                    ? "border-purple-600 bg-purple-50/50 shadow-md ring-1 ring-purple-600"
                                    : "border-gray-200 hover:border-gray-300 bg-white hover:shadow-sm"
                                }`}
                              >
                                <div className="flex items-start gap-4">
                                  <img
                                    src={pkg.image}
                                    alt={pkg.name}
                                    className="w-24 h-24 rounded-xl object-cover shrink-0 hidden sm:block border border-gray-100"
                                  />
                                  <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <h4 className="font-extrabold text-[#0E295B] text-base">{pkg.name}</h4>
                                      <span className="text-[10px] font-extrabold uppercase bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full">
                                        {pkg.tag}
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-600 leading-relaxed max-w-xl">{pkg.desc}</p>
                                    <div className="flex flex-wrap gap-1.5 pt-1">
                                      {pkg.includes.map((inc) => (
                                        <span key={inc} className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md">
                                          <Check size={11} className="text-emerald-600" /> {inc}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <div className="text-left md:text-right shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 flex md:flex-col justify-between items-center md:items-end">
                                  <div>
                                    <div className="text-2xl font-extrabold text-purple-700">{formatPrice(pkg.price)}</div>
                                    <div className="text-[11px] text-gray-500 font-medium">per package bundle</div>
                                  </div>
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 mt-2 ${isSel ? "border-purple-600 bg-purple-600 text-white" : "border-gray-300"}`}>
                                    {isSel && <Check size={14} />}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 3. PARK PASSES */}
                    {activeTab === "park" && (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-[#0E295B] flex items-center gap-2">
                            <Waves size={20} className="text-[#01A5E1]" /> Park Passes & Day Tickets
                          </h3>
                          <span className="text-xs font-semibold text-gray-500">6 Pass Types</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                          {liveTickets.map((tkt) => {
                            const isSel = selectedTicket === tkt.name;
                            return (
                              <div
                                key={tkt.name}
                                onClick={() => setSelectedTicket(tkt.name)}
                                className={`cursor-pointer rounded-2xl overflow-hidden border-2 transition-all flex flex-col justify-between ${
                                  isSel
                                    ? "border-[#01A5E1] bg-sky-50/50 shadow-md ring-1 ring-[#01A5E1]"
                                    : "border-gray-200 hover:border-gray-300 bg-white"
                                }`}
                              >
                                <div className="relative h-32 w-full overflow-hidden">
                                  <img
                                    src={tkt.image}
                                    alt={tkt.name}
                                    className="w-full h-full object-cover object-center"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                  <span className="absolute top-3 right-3 text-[10px] font-extrabold uppercase tracking-wider bg-white/90 text-[#0E295B] px-2.5 py-0.5 rounded-full shadow">
                                    {tkt.tag}
                                  </span>
                                </div>

                                <div className="p-4 flex-1 flex flex-col justify-between">
                                  <div>
                                    <h4 className="font-extrabold text-[#0E295B] text-base mb-1">{tkt.name}</h4>
                                    <p className="text-xs text-gray-600 leading-relaxed mb-4">{tkt.desc}</p>
                                  </div>
                                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                      <span className="text-xl font-extrabold text-[#01A5E1]">{formatPrice(tkt.price)}</span>
                                      <span className="text-xs text-gray-500 ml-1">/ person</span>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${isSel ? "border-[#01A5E1] bg-[#01A5E1] text-white" : "border-gray-300"}`}>
                                      {isSel && <Check size={14} />}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 4. WEDDING CELEBRATIONS */}
                    {activeTab === "wedding" && (
                      <div className="space-y-5">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-[#0E295B] flex items-center gap-2">
                            <Heart size={20} className="text-rose-600" /> Wedding Venues & Grand Celebrations
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Occasion Type</label>
                            <select
                              value={eventType}
                              onChange={(e) => setEventType(e.target.value)}
                              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none text-sm font-medium"
                            >
                              <option>Grand Wedding & Reception</option>
                              <option>Engagement Ceremony</option>
                              <option>Mehndi & Sangeet Night</option>
                              <option>Haldi Poolside Celebration</option>
                              <option>Anniversary / Family Milestone</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Preferred Venue Space</label>
                            <select
                              value={venuePref}
                              onChange={(e) => setVenuePref(e.target.value)}
                              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none text-sm font-medium"
                            >
                              <option>Chander Party Lawn (200 to 2,500 Guests)</option>
                              <option>Bhanwar Party Lawn (50 to 300 Guests)</option>
                              <option>Abhinandan Banquet Hall (30 to 250 Guests)</option>
                              <option>Swagatam Private Hall (up to 150 Guests)</option>
                              <option>Not Sure — Recommend Best Option</option>
                            </select>
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200/80 text-xs text-rose-900 flex items-center gap-3">
                          <Heart size={18} className="text-rose-500 shrink-0" />
                          <span>Includes royal decor setups, stage mandap design, bridal suites, and pure-vegetarian live catering counters.</span>
                        </div>
                      </div>
                    )}

                    {/* 5. CORPORATE EVENTS */}
                    {activeTab === "corporate" && (
                      <div className="space-y-5">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-[#0E295B] flex items-center gap-2">
                            <Briefcase size={20} className="text-orange-600" /> Corporate Offsites, MICE & Conferences
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Event Format</label>
                            <select
                              value={eventType}
                              onChange={(e) => setEventType(e.target.value)}
                              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none text-sm font-medium"
                            >
                              <option>Team Outing & Adventure Activities</option>
                              <option>Residential Conference (Stay + Meeting)</option>
                              <option>Day Workshop & Strategic Seminar</option>
                              <option>Annual Corporate Gala & Product Launch</option>
                              <option>Executive Leadership Retreat</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Company / Enterprise Name</label>
                            <input
                              type="text"
                              value={orgName}
                              onChange={(e) => setOrgName(e.target.value)}
                              placeholder="e.g. Google India, Deloitte..."
                              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none text-sm font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 6. GROUP & SCHOOL PICNICS */}
                    {activeTab === "school" && (
                      <div className="space-y-5">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-[#0E295B] flex items-center gap-2">
                            <School size={20} className="text-emerald-600" /> Group & School Picnic Outings
                          </h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Group Classification</label>
                            <select
                              value={eventType}
                              onChange={(e) => setEventType(e.target.value)}
                              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none text-sm font-medium"
                            >
                              <option>School Educational Picnic</option>
                              <option>College / University Batch Trip</option>
                              <option>Family Reunion Mega Group</option>
                              <option>Social Welfare / NGO Outing</option>
                              <option>Sports & Fitness Club Outing</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">School / Institution Name</label>
                            <input
                              type="text"
                              value={orgName}
                              onChange={(e) => setOrgName(e.target.value)}
                              placeholder="e.g. DPS Gurgaon, XYZ Academy..."
                              className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none text-sm font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* DATES & GUEST SELECTION BOX */}
                    <div className="p-6 rounded-2xl bg-[#F8F9FB] border border-gray-200/90 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-extrabold text-[#0E295B] text-sm uppercase tracking-wider flex items-center gap-2">
                          <CalendarDays size={16} className="text-[#0E295B]" /> Date & Guest Configuration
                        </h4>
                        {(activeTab === "room" || activeTab === "package") && checkIn && checkOut && (
                          <span className="text-xs font-bold text-[#F68734] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                            {nights} Night{nights > 1 ? "s" : ""} Stay
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            {activeTab === "room" || activeTab === "package" ? "Check-in Date *" : "Visit / Event Date *"}
                          </label>
                          <input
                            type="date"
                            min={today}
                            value={checkIn}
                            onChange={(e) => { setCheckIn(e.target.value); setErrors((prev) => ({ ...prev, checkIn: undefined })); }}
                            className="w-full h-12 px-3.5 rounded-xl border border-gray-300 bg-white text-sm font-semibold outline-none focus:ring-2 focus:ring-[#0E295B] text-[#0E295B]"
                          />
                          {errors.checkIn && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.checkIn}</p>}
                        </div>

                        {(activeTab === "room" || activeTab === "package") && (
                          <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Check-out Date *</label>
                            <input
                              type="date"
                              min={checkIn || today}
                              value={checkOut}
                              onChange={(e) => { setCheckOut(e.target.value); setErrors((prev) => ({ ...prev, checkOut: undefined })); }}
                              className="w-full h-12 px-3.5 rounded-xl border border-gray-300 bg-white text-sm font-semibold outline-none focus:ring-2 focus:ring-[#0E295B] text-[#0E295B]"
                            />
                            {errors.checkOut && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.checkOut}</p>}
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1.5">
                            {activeTab === "park" ? "No. of Persons / Tickets" : "Total Guests"}
                          </label>
                          {activeTab === "park" ? (
                            <div className="flex items-center h-12 border border-gray-300 rounded-xl bg-white px-2">
                              <button
                                type="button"
                                onClick={() => setTicketQty((q) => Math.max(1, q - 1))}
                                className="w-10 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-lg font-bold text-gray-700 flex items-center justify-center transition"
                              >
                                −
                              </button>
                              <span className="flex-1 text-center font-extrabold text-base text-[#0E295B]">{ticketQty}</span>
                              <button
                                type="button"
                                onClick={() => setTicketQty((q) => q + 1)}
                                className="w-10 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-lg font-bold text-gray-700 flex items-center justify-center transition"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <select
                              value={guests}
                              onChange={(e) => setGuests(e.target.value)}
                              className="w-full h-12 px-3.5 rounded-xl border border-gray-300 bg-white text-sm font-semibold outline-none focus:ring-2 focus:ring-[#0E295B] text-[#0E295B]"
                            >
                              {GROUP_SIZES.map((g) => (
                                <option key={g}>{g}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* COUPON DISCOUNTS SECTION */}
                    {(activeTab === "room" || activeTab === "package" || activeTab === "park") && (
                      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-amber-950 font-extrabold text-sm">
                            <BadgePercent size={18} className="text-[#F68734]" /> Seasonal Discount Coupons
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] text-amber-800 font-semibold">Try clicking:</span>
                            <button
                              type="button"
                              onClick={() => handleApplyCoupon("AAPNO10")}
                              className="text-[10px] font-extrabold bg-white border border-amber-300 text-amber-900 px-2 py-0.5 rounded-md hover:bg-amber-100 transition font-mono"
                            >
                              AAPNO10 (10%)
                            </button>
                            <button
                              type="button"
                              onClick={() => handleApplyCoupon("SUMMER15")}
                              className="text-[10px] font-extrabold bg-white border border-amber-300 text-amber-900 px-2 py-0.5 rounded-md hover:bg-amber-100 transition font-mono"
                            >
                              SUMMER15 (15%)
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => { setCouponCode(e.target.value); setCouponStatus(null); }}
                            placeholder="Enter promotional coupon code..."
                            className="flex-1 h-11 px-4 rounded-xl border border-amber-300 bg-white text-xs font-mono uppercase font-bold text-gray-800 outline-none focus:ring-2 focus:ring-amber-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleApplyCoupon()}
                            className="px-6 h-11 rounded-xl bg-[#0E295B] text-white font-bold text-xs hover:bg-[#1a448d] transition shrink-0 shadow-sm"
                          >
                            Apply Code
                          </button>
                        </div>

                        {couponStatus === "valid" && (
                          <p className="text-emerald-700 text-xs font-bold flex items-center gap-1.5">
                            <CheckCircle2 size={15} /> Coupon '{couponCode}' applied successfully! ({discountPct}% discount saved)
                          </p>
                        )}
                        {couponStatus === "invalid" && (
                          <p className="text-rose-600 text-xs font-bold">
                            Invalid coupon code. Try AAPNO10 or SUMMER15.
                          </p>
                        )}
                      </div>
                    )}

                    {/* Step 1 Submit Button */}
                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={handleProceedToStep2}
                        className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-[#F68734] hover:bg-[#e07322] text-white font-extrabold text-base shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2 transform active:scale-98"
                      >
                        Proceed to Guest Details <ChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* ── STEP 2: GUEST CONTACT DETAILS ── */}
                {step === 2 && (
                  <form onSubmit={handleFinalSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#0E295B] flex items-center gap-2 mb-1">
                        <Users size={20} className="text-[#0E295B]" /> Primary Contact & Guest Details
                      </h3>
                      <p className="text-xs text-gray-500">
                        Please provide your WhatsApp number for immediate booking voucher transmission.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
                          placeholder="e.g. Aditya Sharma"
                          className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none text-sm font-medium"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">WhatsApp / Mobile Number *</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => { setPhone(e.target.value); setErrors((prev) => ({ ...prev, phone: undefined })); }}
                          placeholder="10-digit mobile number"
                          className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none text-sm font-medium"
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1 font-semibold">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address (Optional)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="aditya@example.com"
                        className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Special Requests & Dietary Requirements</label>
                      <textarea
                        rows={3}
                        value={specialNote}
                        onChange={(e) => setSpecialNote(e.target.value)}
                        placeholder="e.g. Jain food preferences, early check-in request, birthday decor, senior citizen assistance..."
                        className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none text-sm font-medium resize-y"
                      />
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                      <span>Zero upfront cancellation fees on standard inquiries. You will confirm the itinerary directly with our manager.</span>
                    </div>

                    {/* Step 2 Actions */}
                    <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-4 rounded-xl border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold text-sm transition flex items-center justify-center gap-2"
                      >
                        <ChevronLeft size={16} /> Back to Selection
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-2.5 active:scale-98"
                      >
                        <MessageCircle size={20} />
                        {isSubmitting ? "Generating WhatsApp Receipt..." : "Confirm & Send on WhatsApp"}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: Sticky Cart Summary & Assurance */}
              <div className="lg:col-span-4 space-y-6 sticky top-28">
                {/* Live Receipt Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-gray-200/90 relative overflow-hidden">
                  <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#0E295B] via-[#F68734] to-[#01A5E1]" />
                  
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                    <h3 className="text-base font-extrabold text-[#0E295B]">Booking Summary</h3>
                    <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-blue-50 text-[#0E295B] border border-blue-100">
                      {currentTab.label}
                    </span>
                  </div>

                  {/* AxisRooms Channel Partner Live Sync Indicator */}
                  <div className="p-3.5 mb-4 rounded-2xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/90 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-extrabold text-[#0E295B]">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>AxisRooms Channel Partner</span>
                      </div>
                      <span className="text-[9px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                        Live 2-Way Sync
                      </span>
                    </div>
                    <p className="text-[11px] text-sky-900/80 leading-snug">
                      Live inventory lock prevents double bookings across OTAs & direct inquiries.
                    </p>
                  </div>

                  <div className="space-y-3 text-sm">
                    {activeTab === "room" && (
                      <div className="flex justify-between items-start">
                        <span className="text-gray-500 text-xs">Room Type</span>
                        <strong className="text-[#0E295B] text-right font-bold text-xs max-w-[65%]">{selectedRoom}</strong>
                      </div>
                    )}
                    {activeTab === "package" && (
                      <div className="flex justify-between items-start">
                        <span className="text-gray-500 text-xs">Package</span>
                        <strong className="text-[#0E295B] text-right font-bold text-xs max-w-[65%]">{selectedPackage}</strong>
                      </div>
                    )}
                    {activeTab === "park" && (
                      <div className="flex justify-between items-start">
                        <span className="text-gray-500 text-xs">Pass Choice</span>
                        <strong className="text-[#0E295B] text-right font-bold text-xs max-w-[65%]">{selectedTicket} × {ticketQty}</strong>
                      </div>
                    )}

                    {checkIn && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Date</span>
                        <strong className="text-[#0E295B] font-bold">{checkIn}</strong>
                      </div>
                    )}

                    {checkOut && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Check-out</span>
                        <strong className="text-[#0E295B] font-bold">{checkOut} ({nights}N)</strong>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500">Capacity / Headcount</span>
                      <strong className="text-[#0E295B] font-bold">{activeTab === "park" ? `${ticketQty} Persons` : guests}</strong>
                    </div>

                    {/* Price Math Breakdown */}
                    {basePrice > 0 && (
                      <div className="pt-4 mt-4 border-t border-dashed border-gray-200 space-y-2.5">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Base Fare</span>
                          <span>{formatPrice(basePrice)}{(activeTab === "room" || activeTab === "package") ? ` × ${nights}N` : ""}</span>
                        </div>
                        {discountPct > 0 && (
                          <div className="flex justify-between text-xs text-emerald-600 font-bold">
                            <span>Promo Discount ({discountPct}%)</span>
                            <span>− {formatPrice(discountAmount * ((activeTab === "room" || activeTab === "package") ? nights : 1))}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-baseline pt-3 border-t border-gray-200">
                          <span className="font-extrabold text-sm text-[#0E295B]">Estimated Total</span>
                          <span className="text-2xl font-extrabold text-[#F68734]">{formatPrice(grandTotal)}</span>
                        </div>
                        <p className="text-[11px] text-gray-400 leading-tight">
                          * Taxes and instant voucher confirmed directly by AapnoGhar desk.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Direct Assurance Box */}
                <div className="bg-[#0E295B] text-white rounded-3xl p-6 shadow-lg space-y-4">
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-white/90 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#01A5E1]" /> AapnoGhar Direct Guarantees
                  </h4>
                  <ul className="space-y-3 text-xs text-white/85">
                    <li className="flex items-center gap-2.5">
                      <Check size={14} className="text-emerald-400 shrink-0" />
                      <span><strong>100% Pure Vegetarian Feasts:</strong> Zero non-veg guarantee</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={14} className="text-emerald-400 shrink-0" />
                      <span><strong>Instant WhatsApp Confirmation:</strong> Direct team connect</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={14} className="text-emerald-400 shrink-0" />
                      <span><strong>Free Parking & Lockers:</strong> Ample secure space</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={14} className="text-emerald-400 shrink-0" />
                      <span><strong>Direct Resort Rates:</strong> No agent commissions</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                    <span className="text-white/70">Reservation Helpline</span>
                    <a href="tel:+917666779997" className="font-extrabold text-[#01A5E1] flex items-center gap-1 hover:underline">
                      <Phone size={12} /> +91 7666 779 997
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
