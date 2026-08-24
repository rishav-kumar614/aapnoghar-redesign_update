import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BedDouble,
  Building2,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  Clock3,
  HeartHandshake,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
  Ticket,
  Utensils,
  Waves,
  X,
  Compass,
  Calculator,
  Bot,
  ShoppingCart,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Users,
  Shield,
  Award,
  Play,
  Film,
} from "lucide-react";
import { useLocation } from "wouter";
import { BookingModal } from "@/components/BookingModal";
import { Preloader } from "@/components/Preloader";
import { AIChatBox, Message } from "@/components/AIChatBox";
import { MagneticCursor } from "@/components/MagneticCursor";
import { GodlyResortHero } from "@/components/GodlyResortHero";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEOHead, RESORT_SCHEMA } from "@/components/SEOHead";
import { getSeasonalConfig, SeasonalConfig } from "@/lib/cmsStore";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const images = {
  hero: "/images/hero_water_park.jpg",
  amusement: "/images/amusement_park.jpg",
  activity: "/images/amusement-park-aapno-ghar.jpg",
  presidential: "/images/room_presidential.jpg",
  suite: "/images/room_suite.jpg",
  luxury: "/images/room_luxury.jpg",
  deluxe: "/images/room_deluxe.jpg",
  bhanwar: "/images/venue_bhanwar.jpg",
  chander: "/images/venue_chander.jpg",
  abhinandan: "/images/venue_abhinandan.jpg",
  swagatam: "/images/venue_swagatam.jpg",
};

const rooms = [
  {
    name: "Presidential Suite",
    rate: "Rate on request",
    image: images.presidential,
    detail: "A generous private escape with master suite comfort, dedicated living lounge, and expansive garden panorama.",
    amenities: ["Private Balcony", "King Bed & Lounge", "Garden View", "VIP In-Room Dining"],
  },
  {
    name: "Suite",
    rate: "₹7,200 / night",
    image: images.suite,
    detail: "Extra living space, polished furnishings, and dedicated seating area to slow down and unwind together.",
    amenities: ["Lawn View", "Separate Lounge", "Work Desk", "24/7 Room Service"],
  },
  {
    name: "Luxury",
    rate: "₹6,000 / night",
    image: images.luxury,
    detail: "Warm-toned contemporary interiors made for easy family stays, restful weekends, and direct pool access.",
    amenities: ["King Bed", "High-speed Wi-Fi", "Accommodates 2–3", "Modern En-suite Bath"],
  },
  {
    name: "Deluxe",
    rate: "₹4,600 / night",
    image: images.deluxe,
    detail: "A comfortable, well-appointed base close to all the destination's energy and lush landscaped lawns.",
    amenities: ["Lawn Proximity", "Wi-Fi & Smart TV", "2 Adults", "Air Conditioned"],
  },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [seasonalConfig] = useState<SeasonalConfig>(() => getSeasonalConfig());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Day visit");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isRibbonDismissed, setIsRibbonDismissed] = useState(false);

  // AI Concierge state
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! 👋 Welcome to **AapnoGhar Resort & Water Park**. I am your personal AI Day-Trip Concierge. How can I assist you with tickets, stays, or wedding lawns today?",
    },
  ]);

  const locomotiveScrollTo = useLocomotiveScroll();
  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
    setIsMenuOpen(false);
  };

  const scrollTo = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (!locomotiveScrollTo(target)) target.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  // Smart AI Response handler
  const handleSendMessage = (userContent: string) => {
    const updatedMessages: Message[] = [...aiMessages, { role: "user", content: userContent }];
    setAiMessages(updatedMessages);
    setAiLoading(true);

    setTimeout(() => {
      let reply = "";
      const lower = userContent.toLowerCase();

      if (lower.includes("day out") || lower.includes("plan") || lower.includes("itinerary") || lower.includes("family")) {
        reply = `### 🌟 Custom Family Day Out Itinerary\n**09:30 AM – 10:00 AM | Arrival & Welcome Tea**\nCheck in at the main gate, pick up wristbands, and enjoy morning breakfast snacks.\n\n**10:00 AM – 01:00 PM | Water Park & Wave Pool**\nEnjoy 21 thrill slides, giant wave pool, rain dance floor, and kid's splash zone.\n\n**01:00 PM – 02:30 PM | Grand Vegetarian Lunch Buffet**\nGather at Banyan Dining for a 100% pure-vegetarian royal feast.\n\n**02:30 PM – 05:00 PM | Amusement & Adventure Park**\nRide the Caterpillar coaster, Ferris wheel, and conquer 24 obstacle rope courses!\n\n**05:00 PM – 06:30 PM | Hi-Tea & Sunset Snacks**\nRelax with hot tea, evening snacks, and souvenir photos before heading home.`;
      } else if (lower.includes("timing") || lower.includes("hour") || lower.includes("stag")) {
        reply = `### 🕒 Operating Hours & Policies\n- **Water Park:** 09:30 AM to 07:00 PM\n- **Amusement Park:** 09:30 AM to 05:30 PM\n- **Height Rules:** Below 33″ Free | 33″–54″ Child Ticket | Above 54″ Adult Ticket\n- **Stag Policy:** Strictly no stag entry. AapnoGhar is a family and corporate sanctuary.`;
      } else if (lower.includes("stay") || lower.includes("room") || lower.includes("suite")) {
        reply = `### 🏨 Luxury Accommodation Options\n1. **Presidential Suite** (Rate on Request): 1,200 sq.ft royal suite with private living room.\n2. **Suite Room** (₹7,200/night + GST): Separate living lounge, lawn terrace.\n3. **Luxury Room** (₹6,000/night + GST): Cozy warm interior, ideal for family staycations.\n4. **Deluxe Room** (₹4,600/night + GST): Modern comfort right by the green lawns.`;
      } else {
        reply = `### 🎟️ AapnoGhar Full-Day Picnic Passes\n- **Weekday Adult (>54"):** ₹1,599 | **Weekday Child (33"-54"):** ₹1,299\n- **Weekend Adult (>54"):** ₹1,799 | **Weekend Child (33"-54"):** ₹1,499\n- **Infants (<33"):** Complimentary\n- **Inclusions:** Water Park, Amusement Joyrides, 24 Adventure Activities, Breakfast, Buffet Lunch & Hi-Tea Snacks!`;
      }

      setAiMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setAiLoading(false);
    }, 850);
  };

  return (
    <div className="site-shell relative selection:bg-[#01A5E1] selection:text-white">
      <SEOHead
        title="AapnoGhar | Luxury Resort, 21-Slide Water Park & Wedding Lawns Gurgaon"
        description="Delhi-NCR's premier 9-acre resort destination with 67 rooms, 21 thrill water slides, wedding lawns & 100% pure vegetarian dining on NH-8 Gurugram."
        canonicalPath="/"
        schemaRaw={RESORT_SCHEMA}
      />

      {/* Physics Magnetic Cursor */}
      <MagneticCursor />

      {/* Branded Preloader */}
      <Preloader />

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {/* Floating Glassmorphic Header */}
      <SiteHeader onOpenBooking={openBooking} onScrollTo={scrollTo} />

      {/* Active Seasonal / Festival Promotional Ribbon */}
      {(() => {
        if (isRibbonDismissed) return null;
        const activeOffer = seasonalConfig.offers.find(o => o.id === seasonalConfig.activeOfferId && o.active) || seasonalConfig.offers.find(o => o.active);
        if (!activeOffer && seasonalConfig.waterParkOpen) return null;
        return (
          <div className="fixed left-0 right-0 z-30 bg-gradient-to-r from-[#0E295B] via-[#01A5E1] to-[#F68734] text-white py-2 px-4 text-center shadow-md flex items-center justify-between" style={{ top: "88px" }}>
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-bold w-full pr-6">
              <span className="bg-white/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[11px]">
                🎉 {activeOffer ? activeOffer.festivalName : "Winter Notice"}
              </span>
              <span>
                {activeOffer ? activeOffer.title : "Water Park Closed for Winter Maintenance"} — Use Code{" "}
                <strong className="underline text-amber-300 font-mono">{activeOffer ? activeOffer.code : "RESORT2026"}</strong> for {activeOffer ? activeOffer.discount : "Special Off-Season Rates"}!
              </span>
              <button
                type="button"
                onClick={() => openBooking(activeOffer ? activeOffer.festivalName : "Winter Stay Package")}
                className="ml-2 px-3 py-1 bg-white text-[#0E295B] rounded-lg text-[11px] font-extrabold hover:bg-amber-300 transition shadow cursor-pointer"
              >
                Claim Offer →
              </button>
            </div>
            <button
              type="button"
              onClick={() => setIsRibbonDismissed(true)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition cursor-pointer shrink-0"
              aria-label="Dismiss offer"
              title="Close notification"
            >
              <X size={15} />
            </button>
          </div>
        );
      })()}

      <main id="main-content">
        {/* =========================================================================
            HERO SECTION (Unchanged)
            ========================================================================= */}
        <GodlyResortHero
          onBook={openBooking}
          onExplore={() => scrollTo("resort-rooms")}
        />

        {/* =========================================================================
            RESORT & ROOMS SECTION
            ========================================================================= */}
        <section className="py-24 bg-[#061A33] relative overflow-hidden" id="resort-rooms">
          {/* Background glows */}
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#01A5E1]/6 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#F68734]/5 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-14" data-reveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#01A5E1]/15 text-[#01A5E1] text-xs font-bold uppercase tracking-widest mb-4">Resort & Accommodations</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
                67 Luxury Rooms & Suites
              </h2>
              <p className="text-white/55 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                Presidential suites to cozy deluxe rooms — each with lawn balconies, resort-view windows, and in-room dining. Your perfect retreat awaits.
              </p>
            </div>

            {/* Room Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {rooms.map((room, idx) => (
                <article
                  key={room.name}
                  className="group rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-lg"
                  data-reveal
                  data-reveal-delay={idx + 1}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={room.image}
                      alt={`${room.name} at AapnoGhar Resort`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#061A33]/90 text-[#FFA96B] text-[10px] font-extrabold tracking-wider backdrop-blur-sm">
                      {room.rate}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-white">{room.name}</h3>
                    <p className="text-white/50 text-xs mt-1.5 leading-relaxed line-clamp-2">{room.detail}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {room.amenities.slice(0, 2).map(a => (
                        <span key={a} className="px-2 py-0.5 rounded-md bg-white/8 text-[10px] text-white/60 font-medium">{a}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="/rooms"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#FFA96B] to-[#F68734] text-[#061A33] font-extrabold text-sm hover:shadow-xl hover:shadow-[#F68734]/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                Explore All Rooms & Suites <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PARK ZONES SECTION — Premium Dark Editorial
            ========================================================================= */}
        <section className="py-28 bg-[#061A33] relative overflow-hidden" id="park-zones">
          {/* Dot grid background */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)", backgroundSize: "36px 36px" }}
          />
          {/* Ambient glows */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#01A5E1]/8 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#16A34A]/6 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14" data-reveal>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/60 text-xs font-bold uppercase tracking-widest mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#01A5E1] animate-pulse" /> Park Zones
                </span>
                <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight leading-none">
                  Three Worlds.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01A5E1] via-[#FFA96B] to-[#16A34A]">One Destination.</span>
                </h2>
              </div>
              <p className="text-white/45 max-w-xs text-sm leading-relaxed sm:text-right sm:pb-2">
                Water thrills, carnival joyrides & adventure rope courses — all within one 9-acre resort.
              </p>
            </div>

            {/* 3 Park Cards — Full bleed editorial */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* ── Water Park ── */}
              <article className="group relative rounded-3xl overflow-hidden h-[480px] shadow-2xl cursor-pointer ring-1 ring-white/10 hover:ring-[#01A5E1]/40 transition-all duration-300" data-reveal>
                <img
                  src="/images/hero_water_park.jpg"
                  alt="Water Park at AapnoGhar"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#002E55] via-[#002E55]/55 to-transparent" />
                {/* Watermark number */}
                <span className="absolute top-4 right-5 text-[100px] font-black text-white/8 leading-none select-none font-display">01</span>
                {/* Badge */}
                <div className="absolute top-5 left-5">
                  <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#01A5E1] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg shadow-[#01A5E1]/40">
                    <Waves size={12} /> Water Park
                  </span>
                </div>
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-black text-white font-display leading-tight mb-2">High-Speed Slides & Giant Wave Pool</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-4">21+ thrill slides, rain dance floor & kids splash zone</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["21+ Slides", "Wave Pool", "Rain Dance"].map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/15">
                    <div>
                      <p className="text-[9px] text-white/35 uppercase tracking-widest font-bold mb-0.5">Timings</p>
                      <p className="text-[#89D9F8] text-xs font-bold">09:30 AM – 07:00 PM</p>
                    </div>
                    <a
                      href="/water-park"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#01A5E1] hover:bg-white hover:text-[#002E55] text-white text-xs font-extrabold transition-all duration-200 shadow-lg shadow-[#01A5E1]/30"
                    >
                      Explore <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </article>

              {/* ── Amusement Park ── */}
              <article className="group relative rounded-3xl overflow-hidden h-[480px] shadow-2xl cursor-pointer ring-1 ring-white/10 hover:ring-[#F68734]/40 transition-all duration-300" data-reveal data-reveal-delay="2">
                <img
                  src="/images/amusement_park.jpg"
                  alt="Amusement Park at AapnoGhar"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5C1A00] via-[#5C1A00]/55 to-transparent" />
                <span className="absolute top-4 right-5 text-[100px] font-black text-white/8 leading-none select-none font-display">02</span>
                <div className="absolute top-5 left-5">
                  <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#F68734] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg shadow-[#F68734]/40">
                    <Sparkles size={12} /> Amusement Park
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-black text-white font-display leading-tight mb-2">Classic Joyrides & Carnival Fun</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-4">15+ timeless carnival rides for all ages — coasters, Ferris wheels & more</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["15+ Rides", "All Ages", "Carnival"].map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/15">
                    <div>
                      <p className="text-[9px] text-white/35 uppercase tracking-widest font-bold mb-0.5">Timings</p>
                      <p className="text-[#FFC27A] text-xs font-bold">09:30 AM – 05:30 PM</p>
                    </div>
                    <a
                      href="/amusement-park"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F68734] hover:bg-white hover:text-[#5C1A00] text-white text-xs font-extrabold transition-all duration-200 shadow-lg shadow-[#F68734]/30"
                    >
                      Explore <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </article>

              {/* ── Adventure Park ── */}
              <article className="group relative rounded-3xl overflow-hidden h-[480px] shadow-2xl cursor-pointer ring-1 ring-white/10 hover:ring-[#16A34A]/40 transition-all duration-300" data-reveal data-reveal-delay="3">
                <img
                  src="/images/amusement-park-aapno-ghar.jpg"
                  alt="Adventure Park at AapnoGhar"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E18] via-[#0A2E18]/55 to-transparent" />
                <span className="absolute top-4 right-5 text-[100px] font-black text-white/8 leading-none select-none font-display">03</span>
                <div className="absolute top-5 left-5">
                  <span className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#16A34A] text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg shadow-[#16A34A]/40">
                    <Compass size={12} /> Adventure Park
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-black text-white font-display leading-tight mb-2">24+ Obstacle Rope Courses</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-4">Ziplines, Burma bridge, climbing nets & expert-led team building activities</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {["24+ Activities", "Team Building", "Expert Led"].map(t => (
                      <span key={t} className="px-2.5 py-1 rounded-lg bg-white/15 backdrop-blur-sm text-white text-[10px] font-bold">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/15">
                    <div>
                      <p className="text-[9px] text-white/35 uppercase tracking-widest font-bold mb-0.5">Sessions</p>
                      <p className="text-[#86EFAC] text-xs font-bold">Expert-guided daily</p>
                    </div>
                    <a
                      href="/adventure-park"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#16A34A] hover:bg-white hover:text-[#0A2E18] text-white text-xs font-extrabold transition-all duration-200 shadow-lg shadow-[#16A34A]/30"
                    >
                      Explore <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
        {/* =========================================================================
            CORPORATE EVENTS SECTION
            ========================================================================= */}
        <section className="py-24 bg-[#0A1E29] relative overflow-hidden" id="corporate-events">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#01A5E1]/5 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FFA96B]/5 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div data-reveal>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#01A5E1]/15 text-[#01A5E1] text-xs font-bold uppercase tracking-widest mb-5">Corporate Events</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
                  Elevate Your Corporate Offsite
                </h2>
                <p className="text-white/60 mt-4 text-base leading-relaxed max-w-lg">
                  From power-packed conferences to team-building outings — AapnoGhar offers premium event venues, world-class AV setups, and curated corporate packages on NH-8 Gurugram.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { label: "Climate-Controlled Halls", icon: "🏛️" },
                    { label: "Expansive Event Lawns", icon: "🌿" },
                    { label: "24+ Team-Building Activities", icon: "🤝" },
                    { label: "Premium Catering Included", icon: "🥗" },
                  ].map(f => (
                    <div key={f.label} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/5 border border-white/8">
                      <span className="text-lg leading-none">{f.icon}</span>
                      <span className="text-white/75 text-xs font-semibold leading-snug">{f.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <a
                    href="/corporate-events"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#01A5E1] to-[#0E295B] text-white font-extrabold text-sm hover:shadow-xl hover:shadow-[#01A5E1]/20 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Plan Your Corporate Event <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
              {/* Right: Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 lg:h-[420px]" data-reveal data-reveal-delay="2">
                <img
                  src="/images/corporate-events-conferences.jpg"
                  alt="Corporate Events at AapnoGhar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E29]/60 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="px-3 py-1.5 rounded-full bg-[#01A5E1] text-white text-xs font-extrabold shadow">2,500+ Guest Capacity</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SCHOOL PICNIC & GROUP PACKAGES SECTION
            ========================================================================= */}
        <section className="py-24 bg-[#FCF3E9] relative overflow-hidden" id="school-picnic">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl h-80 lg:h-[420px]" data-reveal>
                <img
                  src="/images/full-day-picnic-package-1-aapno-ghar.jpg"
                  alt="School Picnic Packages at AapnoGhar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E295B]/60 to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <span className="px-3 py-1.5 rounded-full bg-[#F68734] text-white text-xs font-extrabold shadow">Groups of All Sizes Welcome</span>
                </div>
              </div>
              {/* Right: Content */}
              <div data-reveal data-reveal-delay="2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#F68734]/15 text-[#D84A22] text-xs font-bold uppercase tracking-widest mb-5">School Picnic & Group Packages</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0E295B] font-display tracking-tight leading-tight">
                  Perfect Outing for Students & Groups
                </h2>
                <p className="text-[#50657D] mt-4 text-base leading-relaxed max-w-lg">
                  Specially curated packages for schools, colleges, and institutional groups — with water park access, group buffet meals, and supervised adventure activities.
                </p>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { label: "Group Discounts Available", icon: "🎟️" },
                    { label: "Supervised Activities", icon: "🛡️" },
                    { label: "Pure Veg Group Buffet", icon: "🥘" },
                    { label: "School Bus Parking", icon: "🚌" },
                  ].map(f => (
                    <div key={f.label} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-[#F68734]/15">
                      <span className="text-lg leading-none">{f.icon}</span>
                      <span className="text-[#0E295B] text-xs font-semibold leading-snug">{f.label}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <a
                    href="/school-picnic-group-packages"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#F68734] to-[#D84A22] text-white font-extrabold text-sm hover:shadow-xl hover:shadow-[#F68734]/30 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    View Group Packages <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ABHIPRITI RESTAURANT SECTION
            ========================================================================= */}
        <section className="py-24 bg-[#061A33] relative overflow-hidden" id="restaurant">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#F68734]/6 blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div data-reveal>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#F68734]/20 text-[#FFA96B] text-xs font-bold uppercase tracking-widest mb-5">Abhipriti Restaurant</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
                  100% Pure Vegetarian Dining
                </h2>
                <p className="text-white/60 mt-4 text-base leading-relaxed max-w-lg">
                  Relish unlimited North Indian buffet spreads crafted with the finest ingredients — from hearty breakfast to royal lunch and evening hi-tea. Pure, fresh, and sattvik.
                </p>
                <div className="mt-8 flex flex-col gap-3">
                  {[
                    { time: "07:30 AM – 10:30 AM", meal: "Welcome Breakfast & Chai", icon: "☕" },
                    { time: "01:00 PM – 02:30 PM", meal: "Grand Lunch Buffet (Unlimited)", icon: "🍛" },
                    { time: "04:30 PM – 06:30 PM", meal: "Evening Hi-Tea & Snacks", icon: "🍵" },
                  ].map(m => (
                    <div key={m.meal} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/8">
                      <span className="text-2xl leading-none">{m.icon}</span>
                      <div>
                        <p className="text-white text-sm font-bold">{m.meal}</p>
                        <p className="text-white/50 text-xs mt-0.5">{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <a
                    href="/abhipriti-restaurant"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FFA96B] to-[#F68734] text-[#061A33] font-extrabold text-sm hover:shadow-xl hover:shadow-[#F68734]/30 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Explore Our Restaurant <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
              {/* Right: Image mosaic */}
              <div className="grid grid-cols-2 gap-4" data-reveal data-reveal-delay="2">
                <div className="rounded-2xl overflow-hidden h-48 shadow-lg">
                  <img src="/images/full-day-picnic-package-1-aapno-ghar.jpg" alt="Dining at AapnoGhar" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 shadow-lg">
                  <img src="/images/full-day-picnic-package-3-aapno-ghar.jpg" alt="Buffet at AapnoGhar" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden h-48 shadow-lg col-span-2">
                  <img src="/images/full-day-picnic-package-2-aapno-ghar.jpg" alt="Pure Veg Buffet" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PACKAGES & OFFERS SECTION
            ========================================================================= */}
        <section className="py-24 bg-white relative overflow-hidden" id="packages">
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
            {/* Section Header */}
            <div className="text-center mb-14" data-reveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#0E295B]/8 text-[#0E295B] text-xs font-bold uppercase tracking-widest mb-4">Packages & Offers</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0E295B] font-display tracking-tight leading-tight">
                All-Inclusive Day Picnic Packages
              </h2>
              <p className="text-[#50657D] mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                One price covers everything — water park, rides, adventure activities, and unlimited vegetarian buffet meals!
              </p>
            </div>

            {/* Package Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {/* Weekday Package */}
              <div className="rounded-3xl border border-[#0E295B]/10 bg-[#FDFCF9] p-7 shadow-md hover:shadow-xl transition-shadow" data-reveal>
                <span className="inline-block px-3 py-1 rounded-full bg-[#01A5E1]/10 text-[#01A5E1] text-[10px] font-extrabold uppercase tracking-widest mb-4">Weekday Pass</span>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-[#0E295B] font-display">₹1,599</span>
                  <span className="text-[#50657D] text-sm">/adult + taxes</span>
                </div>
                <p className="text-[#50657D] text-xs mb-5">Monday – Friday (height above 54")</p>
                <ul className="space-y-2.5">
                  {["Unlimited Water Park", "All Amusement Rides", "24 Adventure Activities", "Full-Day Meals Included"].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-[#0E295B] text-xs font-medium">
                      <span className="w-4 h-4 rounded-full bg-[#01A5E1]/15 text-[#01A5E1] flex items-center justify-center text-[10px] shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weekend Package - Featured */}
              <div className="relative rounded-3xl bg-gradient-to-br from-[#0E295B] to-[#061A33] p-7 shadow-2xl hover:-translate-y-1 transition-transform duration-300 ring-2 ring-[#FFA96B]/30" data-reveal data-reveal-delay="2">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFA96B] to-[#F68734] text-[#061A33] text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap shadow">Most Popular</span>
                <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-[#FFA96B] text-[10px] font-extrabold uppercase tracking-widest mb-4 mt-2">Weekend Pass</span>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-white font-display">₹1,799</span>
                  <span className="text-white/60 text-sm">/adult + taxes</span>
                </div>
                <p className="text-white/50 text-xs mb-5">Saturday, Sunday & Holidays (above 54")</p>
                <ul className="space-y-2.5">
                  {["Unlimited Water Park", "All Amusement Rides", "24 Adventure Activities", "Full-Day Meals Included"].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-white/85 text-xs font-medium">
                      <span className="w-4 h-4 rounded-full bg-white/15 text-[#FFA96B] flex items-center justify-center text-[10px] shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Child Package */}
              <div className="rounded-3xl border border-[#0E295B]/10 bg-[#FDFCF9] p-7 shadow-md hover:shadow-xl transition-shadow" data-reveal data-reveal-delay="3">
                <span className="inline-block px-3 py-1 rounded-full bg-[#F68734]/10 text-[#D84A22] text-[10px] font-extrabold uppercase tracking-widest mb-4">Child Pass</span>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-extrabold text-[#0E295B] font-display">₹1,299</span>
                  <span className="text-[#50657D] text-sm">/child + taxes</span>
                </div>
                <p className="text-[#50657D] text-xs mb-5">Height 33" – 54" (below 33" is FREE!)</p>
                <ul className="space-y-2.5">
                  {["Kids Water Slides", "Amusement Joyrides", "Safe Adventure Zone", "Full-Day Meals Included"].map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-[#0E295B] text-xs font-medium">
                      <span className="w-4 h-4 rounded-full bg-[#F68734]/15 text-[#D84A22] flex items-center justify-center text-[10px] shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="/packages-offers"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#0E295B] to-[#061A33] text-white font-extrabold text-sm hover:shadow-xl hover:shadow-[#0E295B]/25 hover:-translate-y-0.5 transition-all duration-200"
              >
                View All Packages & Offers <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          LUXURY FOOTER
          ========================================================================= */}
      <SiteFooter />

      {/* Floating AI Concierge Launcher — Desktop only */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => setIsAiOpen((prev) => !prev)}
          className="ai-launcher-btn shadow-2xl flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#F68734] to-[#D84A22] text-white font-bold text-sm"
          data-cursor-text="AI Concierge"
        >
          <Bot size={19} className="animate-pulse" />
          <span>Ask AI Concierge</span>
        </button>
      </div>

      {/* AI Chat Box Drawer Modal */}
      {isAiOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#0E295B]/10 flex flex-col max-h-[85vh]">
            <div className="p-4 bg-[#0E295B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Bot size={20} className="text-[#89D9F8]" />
                <span className="font-bold text-sm">AapnoGhar AI Day-Trip Assistant</span>
              </div>
              <button type="button" onClick={() => setIsAiOpen(false)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto min-h-[320px]">
              <AIChatBox
                messages={aiMessages}
                isLoading={aiLoading}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      )}

      {/* Booking & Enquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        intent={bookingIntent}
      />
    </div>
  );
}
