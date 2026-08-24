import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import {
  BedDouble,
  Users,
  Maximize2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Wifi,
  Coffee,
  Tv,
  Bath,
  Wind,
  Compass,
  Star,
  ChevronRight,
  Eye,
  X,
  Info,
  Utensils
} from "lucide-react";

const ROOM_CATEGORIES = [
  {
    id: "deluxe-room",
    category: "deluxe",
    title: "Deluxe Room",
    tagline: "Cozy Elegance for Short Stays & Weekend Getaways",
    size: "200 sq. ft.",
    capacity: "2 Adults + 1 Child",
    bed: "King Bed",
    image: "/images/deluxe-room-Room.jpg",
    gallery: [
      "/images/deluxe-room-Room.jpg",
      "/images/deluxe-room-room-home-left.jpg",
      "/images/deluxe-room-room-home-right.jpg"
    ],
    price: "₹3,999",
    unit: "/ night",
    link: "/deluxe-room",
    features: [
      "Lush Garden Views",
      "Complimentary High-Speed Wi-Fi",
      "Split Air Conditioning",
      "Flat Screen LED TV",
      "Tea/Coffee Maker",
      "24/7 Room Service & Housekeeping"
    ]
  },
  {
    id: "luxury-room",
    category: "luxury",
    title: "Luxury Room",
    tagline: "Spacious Comfort with Glass Partition & Premium Amenities",
    size: "260 sq. ft.",
    capacity: "2 Adults + 2 Children",
    bed: "King Size Plush Bed",
    image: "/images/luxury-room-room-home-left.jpg",
    gallery: [
      "/images/luxury-room-room-home-left.jpg",
      "/images/Luxury-Room-with-Partition-Glass-Room.jpg",
      "/images/luxury-room-room-home-right.jpg"
    ],
    price: "₹4,999",
    unit: "/ night",
    link: "/luxury-room",
    features: [
      "Modern Glass Partition Bathroom",
      "Work Desk & Reading Nook",
      "Mini Refrigerator & Snack Basket",
      "Pool / Lawn View Balcony Options",
      "Complimentary Breakfast Inclusion",
      "Premium Toiletries & Plush Robes"
    ]
  },
  {
    id: "suite-room",
    category: "suite",
    title: "Executive Suite Room",
    tagline: "Separate Living Space, Dining Alcove & Resort Views",
    size: "380 sq. ft.",
    capacity: "3 Adults or 2 Adults + 2 Children",
    bed: "King Bed + Sofa Bed",
    image: "/images/suite-room-Room.jpg",
    gallery: [
      "/images/suite-room-Room.jpg",
      "/images/suite-room-room-home-left.jpg",
      "/images/suite-room-room-home-right.jpg"
    ],
    price: "₹6,999",
    unit: "/ night",
    link: "/suite-room",
    features: [
      "Separate Living Room & Lounge",
      "Dual Smart LED TVs",
      "Private Balcony with Sunbeds",
      "Express Check-In & Welcome Drink",
      "Water Park & Amusement Pass Discount",
      "Bathtub & Rain Shower"
    ]
  },
  {
    id: "presidential-suite",
    category: "suite",
    title: "Presidential Suite",
    tagline: "The Pinnacle of Opulence, Grand Lounge & Butler Service",
    size: "550 sq. ft.",
    capacity: "4 Guests (Family Friendly)",
    bed: "Super King Bed + Plush Lounger",
    image: "/images/presidential-suite-room-1-Room.jpg",
    gallery: [
      "/images/presidential-suite-room-1-Room.jpg",
      "/images/presidential-suite-room-1-room-home-left.jpg",
      "/images/presidential-suite-room-1-room-home-right.jpg"
    ],
    price: "₹9,999",
    unit: "/ night",
    link: "/presidential-suite-room-1",
    features: [
      "Master Bedroom + Grand Living Suite",
      "Panoramic 270° Resort View Balcony",
      "Personal Butler Service on Request",
      "Jacuzzi Bath & Designer Toiletries",
      "Complimentary All-Access Water Park Passes",
      "In-suite Dining Setup"
    ]
  }
];

export default function ResortRoomsPage() {
  const [, setLocation] = useLocation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Resort Stay Reservation");
  const [activeFilter, setActiveFilter] = useState<"all" | "deluxe" | "luxury" | "suite">("all");
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<string | null>(null);

  // Animated Counter Logic
  const [counterVal, setCounterVal] = useState({ rooms: 0, acres: 0, rating: 0 });
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1200;
          const stepTime = 30;
          const steps = duration / stepTime;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            setCounterVal({
              rooms: Math.floor(progress * 42),
              acres: Math.floor(progress * 9),
              rating: Number((progress * 4.8).toFixed(1))
            });

            if (currentStep >= steps) {
              clearInterval(timer);
              setCounterVal({ rooms: 42, acres: 9, rating: 4.8 });
            }
          }, stepTime);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleOpenBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  const filteredRooms = activeFilter === "all"
    ? ROOM_CATEGORIES
    : ROOM_CATEGORIES.filter((r) => r.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans antialiased selection:bg-[#FFA96B] selection:text-white">
      <SiteHeader onOpenBooking={handleOpenBooking} />

      {/* Award-Winning Editorial Hero Header */}
      <section className="relative pt-36 pb-24 bg-[#061A33] text-white overflow-hidden select-none">
        {/* Atmosphere Background Image with Soft Fade */}
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('/images/deluxe-room-Room.jpg')] bg-cover bg-center filter blur-xs animate-pulse duration-[12000ms]" />
        
        {/* Layered Gradient Scrims & Ambient Radial Glows */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061A33]/80 via-[#061A33]/90 to-[#061A33]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(1,165,225,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(246,135,52,0.2),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Live Chip */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B]">
              <Link href="/" className="hover:underline flex items-center gap-1">Home</Link>
              <ChevronRight size={12} />
              <span>Resort Accommodation</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#69B32D] animate-pulse" />
              <span className="text-[#89D9F8] font-bold">Instant Booking Open</span>
              <span className="opacity-40">•</span>
              <span className="text-white/80">67 Heritage Rooms &amp; Suites</span>
            </div>
          </div>

          {/* Headline & Editorial Subtitle */}
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-white mb-6 leading-[1.08]">
              Luxury Stay &amp;{" "}
              <span className="italic font-serif font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFA96B] via-[#F68734] to-[#01A5E1]">
                Accommodations
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-8">
              Experience serene hospitality across 42+ lush greenery-surrounded rooms and presidential suites on the Delhi-Jaipur Expressway, Gurugram.
            </p>

            {/* Quick Hero Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                type="button"
                onClick={() => handleOpenBooking("Resort Room Reservation")}
                className="px-7 py-3.5 rounded-2xl bg-[#F68734] hover:bg-[#D84A22] text-white font-extrabold text-xs sm:text-sm shadow-[0_0_30px_rgba(246,135,52,0.5)] hover:shadow-[0_0_40px_rgba(246,135,52,0.8)] transition-all duration-300 flex items-center gap-2 transform active:scale-95"
              >
                <span>Check Rates &amp; Availability</span>
                <ArrowRight size={16} />
              </button>

              <a
                href="#sanctuary"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
              >
                <span>Explore Categories ↓</span>
              </a>
            </div>
          </div>

          {/* Upgraded Glassmorphic Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/15 text-center shadow-2xl transition-all hover:border-[#FFA96B]/40">
            <div className="p-3 transition-transform hover:scale-105 group">
              <div className="w-10 h-10 mx-auto rounded-2xl bg-[#FFA96B]/20 text-[#FFA96B] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <BedDouble size={20} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-[#FFA96B] font-display">
                {counterVal.rooms}+
              </div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Deluxe &amp; Luxury Rooms</div>
            </div>

            <div className="p-3 transition-transform hover:scale-105 border-l border-white/10 group">
              <div className="w-10 h-10 mx-auto rounded-2xl bg-[#01A5E1]/20 text-[#01A5E1] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Compass size={20} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-[#01A5E1] font-display">
                {counterVal.acres} Acres
              </div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Lush Green Estate</div>
            </div>

            <div className="p-3 transition-transform hover:scale-105 border-l border-white/10 group">
              <div className="w-10 h-10 mx-auto rounded-2xl bg-[#69B32D]/20 text-[#69B32D] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Utensils size={20} />
              </div>
              <div className="text-3xl md:text-4xl font-black text-[#69B32D] font-display">24/7</div>
              <div className="text-xs text-slate-300 font-semibold mt-1">In-Room Dining</div>
            </div>

            <div className="p-3 transition-transform hover:scale-105 border-l border-white/10 group">
              <div className="w-10 h-10 mx-auto rounded-2xl bg-[#FFA96B]/20 text-[#FFA96B] flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Star size={20} className="fill-[#FFA96B]" />
              </div>
              <div className="text-3xl md:text-4xl font-black text-[#FFA96B] font-display flex items-center justify-center gap-1">
                <span>{counterVal.rating}</span>
                <Star size={22} className="fill-[#FFA96B] text-[#FFA96B] inline" />
              </div>
              <div className="text-xs text-slate-300 font-semibold mt-1">Guest Ratings (12k+)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Room Showcase */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#01A5E1] bg-[#01A5E1]/10 px-3.5 py-1.5 rounded-full inline-block mb-3 shadow-xs">
            Choose Your Sanctuary
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0A1E29] mb-4">
            Curated Rooms &amp; Suites for Every Stay
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From intimate couples' getaways to expansive family staycations, discover our meticulously designed room categories.
          </p>
        </div>

        {/* Animated Category Filter Pills */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/70 backdrop-blur-md border border-slate-300/50 shadow-inner gap-1">
            {[
              { id: "all", label: "All Stays" },
              { id: "deluxe", label: "Deluxe" },
              { id: "luxury", label: "Luxury Rooms" },
              { id: "suite", label: "Executive & Presidential Suites" }
            ].map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as any)}
                  className={`px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 relative ${
                    isActive
                      ? "bg-[#0A1E29] text-white shadow-md scale-105"
                      : "text-slate-600 hover:text-[#0A1E29] hover:bg-slate-300/50"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Room Category Cards Grid */}
        <div className="space-y-12">
          {filteredRooms.map((room, idx) => (
            <div
              key={room.id}
              className={`group flex flex-col lg:flex-row gap-8 items-center bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200/60 hover:border-[#FFA96B]/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Photo Showcase with Lightbox Trigger */}
              <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md bg-slate-900">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Size Badge */}
                <div className="absolute top-4 left-4 bg-[#0A1E29]/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 shadow-md">
                  <Sparkles size={12} className="text-[#FFA96B]" />
                  <span>{room.size}</span>
                </div>

                {/* Quick Photo Lightbox Trigger Button */}
                <button
                  type="button"
                  onClick={() => setSelectedPhotoModal(room.image)}
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#0A1E29] text-xs font-bold px-3.5 py-2 rounded-xl backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0"
                >
                  <Eye size={14} className="text-[#01A5E1]" />
                  <span>Expand Photo</span>
                </button>
              </div>

              {/* Card Details */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#01A5E1] uppercase tracking-wider bg-[#01A5E1]/10 px-2.5 py-1 rounded-md inline-block mb-1.5">
                    {room.tagline}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0A1E29] group-hover:text-[#F68734] transition-colors duration-300">
                    {room.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-4 py-3 border-y border-slate-100 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Users size={15} className="text-[#FFA96B]" />
                    <span>{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BedDouble size={15} className="text-[#FFA96B]" />
                    <span>{room.bed}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 size={15} className="text-[#FFA96B]" />
                    <span>{room.size}</span>
                  </div>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                  {room.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 transition-transform duration-200 hover:translate-x-0.5">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Price & Action CTAs */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                  <div className="relative group/price cursor-help">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span>Starting from</span>
                      <Info size={12} className="text-slate-400" />
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl md:text-3xl font-bold text-[#0A1E29] font-display">{room.price}</span>
                      <span className="text-xs text-slate-500">{room.unit}</span>
                    </div>

                    {/* Price Tooltip */}
                    <div className="absolute left-0 bottom-full mb-2 hidden group-hover/price:block w-48 p-2.5 bg-[#0A1E29] text-white text-[11px] rounded-xl shadow-xl z-20 border border-white/10">
                      ✨ Includes Welcome Drink + Free Wi-Fi + Taxes Applicable.
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={room.link}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:border-[#0A1E29] hover:bg-slate-100 transition-all duration-200"
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(`Book ${room.title}`)}
                      className="group/btn px-5 py-2.5 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] text-xs font-extrabold shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2 transform active:scale-95"
                    >
                      <span>Book Stay</span>
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Included Amenities Grid with Micro Hover Animations */}
      <section className="bg-[#F4EFE6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0A1E29]">
              Standard In-Room Amenities
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Every stay at AapnoGhar includes our trademark hospitality and modern comforts.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { icon: Wifi, title: "High-Speed Wi-Fi" },
              { icon: Wind, title: "Climate Control AC" },
              { icon: Tv, title: "HD Smart TV" },
              { icon: Coffee, title: "Tea/Coffee Maker" },
              { icon: Bath, title: "Premium Bath Kits" },
              { icon: ShieldCheck, title: "24/7 Security" }
            ].map((item, i) => {
              const IconComp = item.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md flex flex-col items-center transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FFA96B]/15 group-hover:bg-[#FFA96B] group-hover:text-white transition-colors duration-300 flex items-center justify-center text-[#0A1E29] mb-3">
                    <IconComp size={20} />
                  </div>
                  <span className="text-xs font-semibold text-[#0A1E29]">{item.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Photo Lightbox Modal */}
      {selectedPhotoModal && (
        <div
          className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoModal(null)}
        >
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <button
              type="button"
              onClick={() => setSelectedPhotoModal(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition"
            >
              <X size={20} />
            </button>
            <img
              src={selectedPhotoModal}
              alt="Room High-Res View"
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}

      <SiteFooter />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultIntent={bookingIntent}
      />
    </div>
  );
}
