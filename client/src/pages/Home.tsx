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
import { ResortMap } from "@/components/ResortMap";
import { TicketEstimator } from "@/components/TicketEstimator";
import { AIChatBox, Message } from "@/components/AIChatBox";
import { MagneticCursor } from "@/components/MagneticCursor";
import { AmbientParticles } from "@/components/AmbientParticles";
import { GodlyResortHero } from "@/components/GodlyResortHero";
import { FourPillarsHero } from "@/components/FourPillarsHero";
import { RapidImageStack, ExperienceItem } from "@/components/RapidImageStack";
import { JhulJhulKarKhao } from "@/components/JhulJhulKarKhao";
import { PerspectiveRoomShowcase } from "@/components/PerspectiveRoomShowcase";
import { HeritageMascotBand } from "@/components/HeritageMascotBand";
import { VideoTourSection } from "@/components/VideoTourSection";
import { VideoModal } from "@/components/VideoModal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEOHead, RESORT_SCHEMA } from "@/components/SEOHead";
import { getSeasonalConfig, SeasonalConfig } from "@/lib/cmsStore";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const images = {
  hero: "/images/hero_water_park.jpg",
  amusement: "/images/amusement_park.jpg",
  activity: "/images/amusement_park.jpg",
  presidential: "/images/room_presidential.jpg",
  suite: "/images/room_suite.jpg",
  luxury: "/images/room_luxury.jpg",
  deluxe: "/images/room_deluxe.jpg",
  bhanwar: "/images/venue_bhanwar.jpg",
  chander: "/images/venue_chander.jpg",
  abhinandan: "/images/venue_abhinandan.jpg",
  swagatam: "/images/venue_swagatam.jpg",
};

const heroCards = [
  {
    tag: "Water Park",
    title: "Water Park & Joyrides",
    subtitle: "21 thrill slides, rain dance & wave pools",
    image: images.hero,
    intent: "Water Park day visit",
    icon: Waves,
  },
  {
    tag: "Resort Stays",
    title: "Resort Rooms & Suites",
    subtitle: "67 rooms with lawn balconies & dining",
    image: images.presidential,
    intent: "Stay enquiry",
    icon: BedDouble,
  },
  {
    tag: "Weddings & Events",
    title: "Weddings & Celebrations",
    subtitle: "Expansive party lawns up to 2,500 guests",
    image: images.chander,
    intent: "Wedding & event enquiry",
    icon: Building2,
  },
  {
    tag: "Activity Park",
    title: "Activity & Corporate Outings",
    subtitle: "24 obstacle activities & rope course",
    image: images.activity,
    intent: "Corporate / group enquiry",
    icon: HeartHandshake,
  },
];

const rapidExperiences: ExperienceItem[] = [
  {
    id: "water-park",
    name: "Water Park",
    category: "Aquatic Thrills",
    tagline: "High-Speed Water Slides & Giant Wave Pool",
    description:
      "Dive into non-stop refreshment with exhilarating multi-lane body slides, kid's splash zone, rain dance, and Delhi-NCR's favorite family wave pool.",
    image: images.hero,
    badge: "21+ Thrill Slides & Pools",
    highlights: ["Interactive Wave Pool", "Rain Dance Floor with DJ", "Kids Splash Water Play", "Multi-Lane Tube Slides"],
    stats: [
      { label: "Water Slides", value: "21+" },
      { label: "Timings", value: "9:30 AM - 7:00 PM" },
    ],
    intent: "Water Park day visit",
  },
  {
    id: "amusement-park",
    name: "Amusement Park",
    category: "Family Carnival",
    tagline: "Classic Joyrides & Nostalgic Carnival Thrills",
    description:
      "Experience timeless fun with Caterpillar coaster, Ferris wheel, Flying dish, Breakdance, and musical gardens designed for all age groups.",
    image: images.amusement,
    badge: "All-Age Joyrides",
    highlights: ["Caterpillar Coaster", "Classic Carousel & Swings", "Flying Dish & Columbus", "Musical Water Fountain"],
    stats: [
      { label: "Joyrides", value: "15+" },
      { label: "Safety Rating", value: "100% Certified" },
    ],
    intent: "Amusement Park day visit",
  },
  {
    id: "activity-park",
    name: "Activity Park",
    category: "Adventure & Team Building",
    tagline: "24+ Obstacle Courses & Rope Adventures",
    description:
      "Challenge your agility with zip lines, commando net climbing, Burma bridge, beam balance, and curated group activities under expert guidance.",
    image: images.activity,
    badge: "24 Adventure Obstacles",
    highlights: ["Zipline & Rope Course", "Commando Climbing Net", "Target Archery & Dart", "Tug of War & Group Games"],
    stats: [
      { label: "Obstacles", value: "24+" },
      { label: "Instructor Led", value: "Yes" },
    ],
    intent: "Activity Park day visit",
  },
  {
    id: "dine-in",
    name: "Dine-in Feast",
    category: "Royal Vegetarian Dining",
    tagline: "Unlimited Buffet Meals & Refreshing Snacks",
    description:
      "Indulge in hearty, hygienic, and unlimited pure-vegetarian North Indian buffets including breakfast, grand lunch, and evening tea with snacks.",
    image: images.luxury,
    badge: "Unlimited Buffet Included",
    highlights: ["Welcome Breakfast & Tea", "Multi-Course Lunch Buffet", "Evening Hi-Tea & Snacks", "100% Pure Vegetarian"],
    stats: [
      { label: "Meal Inclusions", value: "Breakfast + Lunch + Tea" },
      { label: "Cuisine", value: "North Indian & Desi" },
    ],
    intent: "Dine-in enquiry",
  },
];

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
    rate: "₹7,200 / night + GST",
    image: images.suite,
    detail: "Extra living space, polished furnishings, and dedicated seating area to slow down and unwind together.",
    amenities: ["Lawn View", "Separate Lounge", "Work Desk", "24/7 Room Service"],
  },
  {
    name: "Luxury",
    rate: "₹6,000 / night + GST",
    image: images.luxury,
    detail: "Warm-toned contemporary interiors made for easy family stays, restful weekends, and direct pool access.",
    amenities: ["King Bed", "High-speed Wi-Fi", "Accommodates 2-3", "Modern En-suite Bath"],
  },
  {
    name: "Deluxe",
    rate: "₹4,600 / night + GST",
    image: images.deluxe,
    detail: "A comfortable, well-appointed base close to all the destination's energy and lush landscaped lawns.",
    amenities: ["Lawn Proximity", "Wi-Fi & Smart TV", "2 Adults", "Air Conditioned"],
  },
];

const venues = [
  {
    name: "Bhanwar Lawn",
    image: images.bhanwar,
    type: "Open-Air Celebration Lawn",
    capacity: "50–300 guests*",
    desc: "Intimate manicured green lawn ideal for mehendi, haldi, birthday parties, and corporate cocktail evenings.",
  },
  {
    name: "Chander Lawn",
    image: images.chander,
    type: "Grand Wedding Lawn",
    capacity: "200–2,500 guests*",
    desc: "Expansive royal event space capable of hosting lavish destination weddings, large exhibitions, and grand receptions.",
  },
  {
    name: "Abhinandan Hall",
    image: images.abhinandan,
    type: "Air-Conditioned Banquet Hall",
    capacity: "30–250 guests*",
    desc: "Elegant climate-controlled indoor hall equipped with modern audio-visual systems for conferences, sangeet, and ceremonies.",
  },
  {
    name: "Swagatam Hall",
    image: images.swagatam,
    type: "Private Function Hall",
    capacity: "Up to 150 guests*",
    desc: "Cozy indoor banquet suitable for pre-wedding functions, ring ceremonies, corporate meetings, and family milestones.",
  },
];

const faqs = [
  [
    "What are the park timings and meal schedule?",
    "The Water Park operates from 09:30 AM to 07:00 PM, and the Amusement Park runs from 09:30 AM to 05:30 PM. Full-day packages include welcome tea & snacks (09:30 AM – 11:30 AM), grand lunch buffet (01:00 PM – 02:30 PM), and evening hi-tea (04:30 PM – 06:00 PM).",
  ],
  [
    "How does height-based pricing work?",
    "Children below 33 inches enter complimentary (Free). Child tickets apply between 33 and 54 inches (₹1,299 Weekday / ₹1,499 Weekend), while adult pricing applies for heights above 54 inches (₹1,599 Weekday / ₹1,799 Weekend).",
  ],
  [
    "Is stag entry permitted at the park?",
    "No. Stag entry is strictly not permitted at the Water Park or Amusement Park. AapnoGhar is a dedicated family and corporate retreat created for secure, comfortable outings.",
  ],
  [
    "Do resort room bookings include water park tickets?",
    "Standard room bookings cover luxurious accommodation. To include unlimited water park, amusement rides, and meals, select our comprehensive 'Stay & Play / Family Stay' package during reservation.",
  ],
  [
    "Is ample parking and EV charging available?",
    "Yes, extensive secure on-site parking is available for cars, buses, and private vehicles along with round-the-clock security and easy highway ingress from NH-8.",
  ],
  [
    "What is the booking and cancellation policy?",
    "Online bookings can be made directly via our WhatsApp reservation desk or website. Rescheduling terms and cancellation policies depend on the date and group size.",
  ],
] as const;

export default function Home() {
  const [, setLocation] = useLocation();
  const [seasonalConfig] = useState<SeasonalConfig>(() => getSeasonalConfig());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Day visit");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [pricingTab, setPricingTab] = useState<"weekday" | "weekend">("weekday");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Drawer Accordion State
  const [openDrawerAcc, setOpenDrawerAcc] = useState<string | null>(null);

  // Auto-rotate hero experience pills every 5 seconds (pauses on hover)
  useEffect(() => {
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % heroCards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHeroHovered]);

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

  const toggleDrawerAcc = (name: string) => {
    setOpenDrawerAcc((prev) => (prev === name ? null : name));
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
        reply = `### 🌟 Custom Family Day Out Itinerary
**09:30 AM – 10:00 AM | Arrival & Welcome Tea**  
Check in at the main gate, pick up wristbands, and enjoy morning breakfast snacks.

**10:00 AM – 01:00 PM | Water Park & Wave Pool**  
Enjoy 21 thrill slides, giant wave pool, rain dance floor, and kid's splash zone.

**01:00 PM – 02:30 PM | Grand Vegetarian Lunch Buffet**  
Gather at Banyan Dining for a 100% pure-vegetarian royal feast.

**02:30 PM – 05:00 PM | Amusement & Adventure Park**  
Ride the Caterpillar coaster, Ferris wheel, and conquer 24 obstacle rope courses!

**05:00 PM – 06:30 PM | Hi-Tea & Sunset Snacks**  
Relax with hot tea, evening snacks, and souvenir photos before heading home.`;
      } else if (lower.includes("timing") || lower.includes("hour") || lower.includes("stag")) {
        reply = `### 🕒 Operating Hours & Policies
- **Water Park:** 09:30 AM to 07:00 PM  
- **Amusement Park:** 09:30 AM to 05:30 PM  
- **Height Rules:** Below 33″ Free | 33″–54″ Child Ticket | Above 54″ Adult Ticket  
- **Stag Policy:** Strictly no stag entry. AapnoGhar is a family and corporate sanctuary.`;
      } else if (lower.includes("stay") || lower.includes("room") || lower.includes("suite")) {
        reply = `### 🏨 Luxury Accommodation Options
1. **Presidential Suite** (Rate on Request): 1,200 sq.ft royal suite with private living room.
2. **Suite Room** (₹7,200/night + GST): Separate living lounge, lawn terrace.
3. **Luxury Room** (₹6,000/night + GST): Cozy warm interior, ideal for family staycations.
4. **Deluxe Room** (₹4,600/night + GST): Modern comfort right by the green lawns.`;
      } else {
        reply = `### 🎟️ AapnoGhar Full-Day Picnic Passes
- **Weekday Adult (>54"):** ₹1,599 | **Weekday Child (33"-54"):** ₹1,299  
- **Weekend Adult (>54"):** ₹1,799 | **Weekend Child (33"-54"):** ₹1,499  
- **Infants (<33"):** Complimentary  
- **Inclusions:** Water Park, Amusement Joyrides, 24 Adventure Activities, Breakfast, Buffet Lunch & Hi-Tea Snacks!`;
      }

      setAiMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setAiLoading(false);
    }, 850);
  };

  const [isRibbonDismissed, setIsRibbonDismissed] = useState(false);

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

            {/* Dismiss Cross Button */}
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
            AWARD-WINNING EDITORIAL RESORT HERO (Godly / Land-book Inspired)
            ========================================================================= */}
        <GodlyResortHero
          onBook={openBooking}
          onExplore={() => scrollTo("experiences")}
        />

        {/* =========================================================================
            OUR 30-YEAR HERITAGE STORY & RESORT SANCTUARY
            ========================================================================= */}
        <HeritageMascotBand onExplore={() => scrollTo("experiences")} />

        {/* =========================================================================
            JHUL JHUL KAR KHAO - 4-POLAROID PICNIC MATRIX (Screenshot 3)
            ========================================================================= */}
        <JhulJhulKarKhao onBook={openBooking} />

        {/* =========================================================================
            RAPID IMAGE LAYERS: EXPERIENCES SECTION
            ========================================================================= */}
        <section className="section experiences bg-[#FDFCF9] py-24 border-b border-[#0E295B]/10" id="experiences">
          <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12" data-reveal>
              <div>
                <span className="eyebrow eyebrow--teal">Choose Your Experience</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0E295B] tracking-tight font-display mt-2">
                  Four signature pillars of joy.
                </h2>
              </div>
              <p className="text-[#50657D] text-sm sm:text-base max-w-md">
                From exhilarating wave pools and carnival joyrides to 24 adventure rope courses and unlimited vegetarian feasts.
              </p>
            </div>

            {/* Kinetic Layered Card Deck Component */}
            <div data-reveal>
              <RapidImageStack items={rapidExperiences} onSelectIntent={openBooking} />
            </div>
          </div>
        </section>



        {/* Dynamic Rate Calculator Section */}
        <section className="section estimator-section bg-[#FCF3E9]/50 py-14 border-b border-[#0E295B]/10" id="estimator">
          <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16" data-reveal>
            <TicketEstimator onBook={openBooking} />
          </div>
        </section>

        {/* =========================================================================
            CINEMATIC VIDEO TOUR & VIRTUAL WALKTHROUGH
            ========================================================================= */}
        <VideoTourSection onBook={openBooking} />

        {/* =========================================================================
            TRANSPARENT PRICING MATRIX
            ========================================================================= */}
        <section className="section pricing-section py-20" id="pricing">
          <div className="content-wrap pricing-layout">
            <div className="pricing-intro" data-reveal>
              <span className="eyebrow eyebrow--coral">Transparent Pricing</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0E295B] font-display mt-1">
                All-Inclusive Day Picnic Passes
              </h2>
              <p className="text-[#50657D] text-base mt-3 leading-relaxed">
                Enjoy unlimited access to the Water Park, Amusement Park, 24 Adventure activities, along with full-course breakfast, royal buffet lunch, and evening snacks!
              </p>
              <div className="pricing-note flex items-center gap-2 mt-4 text-[#0E295B] font-semibold text-sm">
                <Clock3 size={18} className="text-[#01A5E1]" />
                <span>Park Operating Hours: 09:30 AM to 07:00 PM</span>
              </div>
              <button
                className="button button--navy mt-6"
                type="button"
                onClick={() => openBooking("Day visit")}
                data-cursor-text="Reserve Pass"
              >
                Book Your Passes <ArrowUpRight size={17} />
              </button>
            </div>

            <div className="pricing-panel shadow-xl" data-reveal="scale" data-reveal-delay="2">
              <div className="pricing-panel__tabs">
                <button
                  type="button"
                  onClick={() => setPricingTab("weekday")}
                  className={pricingTab === "weekday" ? "is-active" : ""}
                >
                  Weekdays (Mon – Fri)
                </button>
                <button
                  type="button"
                  onClick={() => setPricingTab("weekend")}
                  className={pricingTab === "weekend" ? "is-active" : ""}
                >
                  Weekends & Holidays
                </button>
              </div>

              <div className="pricing-cards-grid">
                {/* Infants Card */}
                <div className="pricing-tier-card">
                  <div>
                    <span className="pricing-tier-tag">Infants & Toddlers</span>
                    <p className="pricing-tier-limit">Below 33 inches height</p>
                  </div>
                  <div>
                    <strong className="pricing-tier-rate pricing-tier-rate--free">Complimentary</strong>
                    <em className="pricing-tier-note">Free entry with family</em>
                  </div>
                </div>

                {/* Kids Card */}
                <div className="pricing-tier-card">
                  <div>
                    <span className="pricing-tier-tag">Children Pass</span>
                    <p className="pricing-tier-limit">33 to 54 inches height</p>
                  </div>
                  <div>
                    <strong className="pricing-tier-rate">
                      {pricingTab === "weekday" ? "₹1,299" : "₹1,499"}
                    </strong>
                    <em className="pricing-tier-note">per child + taxes</em>
                  </div>
                </div>

                {/* Adults Card (Featured) */}
                <div className="pricing-tier-card pricing-tier-card--featured">
                  <div>
                    <span className="pricing-tier-tag" style={{ color: "var(--coral)" }}>Adults Pass</span>
                    <p className="pricing-tier-limit">Above 54 inches height</p>
                  </div>
                  <div>
                    <strong className="pricing-tier-rate pricing-tier-rate--coral">
                      {pricingTab === "weekday" ? "₹1,599" : "₹1,799"}
                    </strong>
                    <em className="pricing-tier-note">per adult + taxes</em>
                  </div>
                </div>
              </div>

              <div className="inclusion-list">
                <span>Every Day Pass Includes:</span>
                <div>
                  {[
                    "Unlimited Water Park & Wave Pool",
                    "All 15+ Amusement Park Joyrides",
                    "24 Obstacle Adventure Activities",
                    "Morning Welcome Snacks & Tea",
                    "Grand Buffet Lunch (100% Pure Veg)",
                    "Evening Hi-Tea & Hot Snacks",
                  ].map((item) => (
                    <p key={item}>
                      <Check size={15} /> {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ACCOMMODATION & LUXURY STAYS (3D Perspective & 360 Showcase - Screenshot 4 & 5)
            ========================================================================= */}
        <PerspectiveRoomShowcase onBook={openBooking} />

        <section className="section stay-section bg-[#FDFCF9] py-16" id="stay-details">
          <div className="content-wrap">
            <div className="section-heading text-center max-w-2xl mx-auto mb-14" data-reveal>
              <span className="eyebrow eyebrow--teal">Complete Room Inventory</span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0E295B] font-display mt-2">
                Stay a little longer in peaceful comfort.
              </h2>
              <p className="text-[#50657D] text-base sm:text-lg mt-3">
                67 well-appointed rooms and suites designed for slow mornings, quiet evenings, and easy access to resort grounds.
              </p>
            </div>

            <div className="room-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {rooms.map((room, index) => (
                <article
                  className="room-card group bg-white rounded-3xl overflow-hidden border border-[#0E295B]/10 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
                  key={room.name}
                  data-reveal
                  data-reveal-delay={index + 1}
                >
                  <div className="room-card__image relative h-56 overflow-hidden">
                    <img
                      src={room.image}
                      alt={`${room.name} room at AapnoGhar`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#0E295B]/90 text-white text-xs font-bold backdrop-blur-md">
                      {room.rate}
                    </span>
                  </div>
                  <div className="room-card__content p-6 flex flex-col flex-1 justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#0E295B] font-display">{room.name}</h3>
                      <p className="text-xs text-[#50657D] mt-2 leading-relaxed">{room.detail}</p>
                    </div>
                    <div>
                      <div className="amenity-row flex flex-wrap gap-1.5 mb-4">
                        {room.amenities.map((amenity) => (
                          <span
                            key={amenity}
                            className="px-2 py-0.5 rounded-md bg-[#0E295B]/5 text-[10px] font-semibold text-[#0E295B]"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="text-link text-xs font-bold text-[#F68734] hover:text-[#D84A22] flex items-center gap-1"
                        onClick={() => openBooking(`${room.name} stay enquiry`)}
                        data-cursor-text="Check Room"
                      >
                        <span>Check availability</span> <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            WEDDINGS & CELEBRATIONS (4 EXPANSIVE BANQUET LAWNS & HALLS)
            ========================================================================= */}
        <section className="section celebration-section" id="celebrate">
          <div className="content-wrap">
            <div className="celebration-heading" data-reveal>
              <div>
                <span className="eyebrow">Weddings & Social Gatherings</span>
                <h2>Spaces ready for life's greatest milestones.</h2>
              </div>
              <p>
                From intimate open-air sangeet lawns to grand wedding banquets hosting up to 2,500 guests, make your celebration unforgettable.
              </p>
              <div>
                <button
                  className="button button--coral"
                  type="button"
                  onClick={() => openBooking("Wedding & event enquiry")}
                  data-cursor-text="Plan Event"
                >
                  <CalendarDays size={18} /> Start an Event Enquiry
                </button>
              </div>
            </div>

            <div className="venue-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {venues.map((venue, index) => (
                <article
                  className={`venue-card venue-card--${index + 1} bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/15 flex flex-col group hover:bg-white/15 transition-all duration-300`}
                  key={venue.name}
                  data-reveal
                  data-reveal-delay={index + 1}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={venue.image}
                      alt={`${venue.name} event venue`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#01A5E1]/90 text-white text-[11px] font-bold">
                      {venue.capacity}
                    </span>
                  </div>
                  <div className="venue-card__content p-6 flex flex-col flex-1 justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold text-[#F68734] uppercase tracking-wider">
                        {venue.type}
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1 font-display">{venue.name}</h3>
                      <p className="text-xs text-white/70 mt-2 leading-relaxed">{venue.desc}</p>
                    </div>
                    <button
                      type="button"
                      className="text-link text-link--light text-xs font-bold text-[#89D9F8] flex items-center gap-1 mt-2 hover:underline"
                      onClick={() => openBooking(`${venue.name} event enquiry`)}
                      data-cursor-text="Enquire Lawn"
                    >
                      <span>Enquire for this venue</span> <ArrowUpRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            TRUST & VERIFIED STATISTICS SECTION
            ========================================================================= */}
        <section className="trust-section py-20 bg-white">
          <div className="content-wrap">
            <div className="trust-banner-card bg-[#FCF3E9]/80 border border-[#0E295B]/10 rounded-3xl p-8 sm:p-12" data-reveal>
              <div className="trust-header-row flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-8 border-b border-[#0E295B]/10">
                <div>
                  <span className="eyebrow eyebrow--teal">Verified Hospitality Standards</span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0E295B] font-display mt-1">
                    Every Detail Crafted For Family Safety & Joy.
                  </h2>
                  <p className="text-[#50657D] text-sm sm:text-base mt-2 max-w-xl">
                    Dedicated family atmosphere, certified water filtration, ISO ride safety guidelines, and 30+ years of trust.
                  </p>
                </div>
                <a
                  className="button button--navy shrink-0"
                  href="https://www.instagram.com/aapnoghargurgaon/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-text="Instagram"
                >
                  See Moments on Instagram <ArrowUpRight size={16} />
                </a>
              </div>

              {/* Verified Metrics Cards */}
              <div className="trust-metrics-grid grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="trust-metric-card bg-white p-6 rounded-2xl border border-[#0E295B]/10 shadow-sm text-center">
                  <span className="trust-metric-num text-3xl sm:text-4xl font-extrabold text-[#0E295B] block font-display">
                    67
                  </span>
                  <span className="trust-metric-label font-bold text-xs sm:text-sm text-[#0E295B] mt-1 block">
                    Luxury Rooms & Suites
                  </span>
                  <span className="trust-metric-desc text-[11px] text-[#50657D] mt-0.5 block">
                    Lawn balconies & in-room dining
                  </span>
                </div>

                <div className="trust-metric-card bg-white p-6 rounded-2xl border border-[#0E295B]/10 shadow-sm text-center">
                  <span className="trust-metric-num text-3xl sm:text-4xl font-extrabold text-[#01A5E1] block font-display">
                    21+
                  </span>
                  <span className="trust-metric-label font-bold text-xs sm:text-sm text-[#0E295B] mt-1 block">
                    Water Slides & Joyrides
                  </span>
                  <span className="trust-metric-desc text-[11px] text-[#50657D] mt-0.5 block">
                    Certified for kids & adults
                  </span>
                </div>

                <div className="trust-metric-card bg-white p-6 rounded-2xl border border-[#0E295B]/10 shadow-sm text-center">
                  <span className="trust-metric-num text-3xl sm:text-4xl font-extrabold text-[#F68734] block font-display">
                    24+
                  </span>
                  <span className="trust-metric-label font-bold text-xs sm:text-sm text-[#0E295B] mt-1 block">
                    Adventure Obstacles
                  </span>
                  <span className="trust-metric-desc text-[11px] text-[#50657D] mt-0.5 block">
                    Rope courses & team building
                  </span>
                </div>

                <div className="trust-metric-card bg-white p-6 rounded-2xl border border-[#0E295B]/10 shadow-sm text-center">
                  <span className="trust-metric-num text-3xl sm:text-4xl font-extrabold text-[#0E295B] block font-display">
                    30+
                  </span>
                  <span className="trust-metric-label font-bold text-xs sm:text-sm text-[#0E295B] mt-1 block">
                    Years of Heritage
                  </span>
                  <span className="trust-metric-desc text-[11px] text-[#50657D] mt-0.5 block">
                    Delhi-NCR's premier destination
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FAQ ACCORDION SECTION (2-Column Split Minimal Layout)
            ========================================================================= */}
        <section className="section faq-section bg-[#FDFCF9] py-16 sm:py-20 border-t border-[#0E295B]/10" id="faq">
          <div className="max-w-[1560px] mx-auto px-6 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Heading & Support Desk Card */}
              <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
                <div>
                  <span className="eyebrow eyebrow--teal">Visitor Guidelines</span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0E295B] font-display mt-2 leading-tight">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-[#50657D] text-sm sm:text-base mt-3 leading-relaxed">
                    Everything you need to know about day picnic timings, height-based tickets, unlimited vegetarian buffet feasts, and resort policies.
                  </p>
                </div>

                {/* Instant Help Card */}
                <div className="bg-[#FCF3E9] rounded-3xl p-6 border border-[#F68734]/20 flex flex-col gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#F68734] text-white flex items-center justify-center font-bold text-lg shadow-md">
                      💬
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#0E295B]">Have a specific query?</h4>
                      <p className="text-xs text-[#50657D]">Our resort guest concierge is available 24/7</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href="https://wa.me/917666779999?text=Hi%20AapnoGhar,%20I%20have%20a%20question%20regarding%20my%20visit"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <span>Chat on WhatsApp</span>
                    </a>
                    <a
                      href="tel:+917666779999"
                      className="px-4 py-2.5 rounded-xl bg-white border border-[#0E295B]/15 hover:border-[#0E295B]/30 text-[#0E295B] text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-all"
                    >
                      <span>Call +91 7666 779 999</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: 6 Sleek Accordion Cards */}
              <div className="lg:col-span-7 flex flex-col gap-3.5">
                {faqs.map(([q, a], idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen
                          ? "bg-white border-[#01A5E1] shadow-md"
                          : "bg-white border-[#0E295B]/10 hover:border-[#0E295B]/25"
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen ? "true" : "false"}
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-[#0E295B] text-sm sm:text-base hover:bg-[#FCF3E9]/30 transition-colors"
                      >
                        <span className="leading-snug">{q}</span>
                        <ChevronDown
                          size={18}
                          className={`text-[#01A5E1] shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-[#F68734]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#50657D] leading-relaxed border-t border-[#0E295B]/5 pt-3 animate-in fade-in duration-200">
                          {a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          LUXURY FOOTER
          ========================================================================= */}
      <SiteFooter />

      {/* Floating AI Concierge Launcher — Desktop only (mobile uses StickyMobileActionBar) */}
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

      {/* Video Walkthrough Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc="/videos/meet-and-celebrations.mp4"
        poster="/images/chander-party-lawn.jpg"
        title="AapnoGhar Resort & Water Park Official Video"
      />

      {/* Booking & Enquiry Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        intent={bookingIntent}
      />
    </div>
  );
}
