import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { SiteFooter } from "@/components/SiteFooter";
import {
  Compass,
  BedDouble,
  Users,
  Maximize2,
  CheckCircle2,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
  Coffee,
  Tv,
  Wifi,
  Wind,
  Bath,
  Utensils,
  ChevronRight,
  Home,
  Check,
  Calendar,
  Lock,
  MessageSquareQuote,
  Star,
  Info,
  Clock,
  Shirt,
  Armchair
} from "lucide-react";
import { BookingModal } from "@/components/BookingModal";
import { SiteHeader } from "@/components/SiteHeader";

const GALLERY_IMAGES = [
  {
    src: "/images/presidential_suite.jpg",
    title: "Master Bedroom & Living Lounge",
    caption: "Spacious master suite with king-size bed and expansive seating"
  },
  {
    src: "/images/presidential-suite-room-1-Room.jpg",
    title: "King-Size Bed & Interior",
    caption: "Plush premium bedding with warm wood aesthetics"
  },
  {
    src: "/images/presidential-suite-room-1-room-home-left.jpg",
    title: "Luxury Bathroom with Bathtub",
    caption: "Attached master bath with bathtub & premium toiletries"
  },
  {
    src: "/images/presidential-suite-room-1-room-home-right.jpg",
    title: "Private Sit-Out Balcony",
    caption: "Overlooking 9 acres of manicured lush resort lawns"
  }
];

const AMENITIES_LIST = [
  { icon: BedDouble, label: "King Size Master Bed", category: "Comfort" },
  { icon: Armchair, label: "Private Living Room Lounge", category: "Comfort" },
  { icon: Armchair, label: "Single Sofa-cum-Bed", category: "Comfort" },
  { icon: Bath, label: "Bathtub & Attached Bath", category: "Wellness" },
  { icon: Bath, label: "24-Hr Hot & Cold Water", category: "Wellness" },
  { icon: Coffee, label: "Complimentary Breakfast Buffet", category: "Dining" },
  { icon: Coffee, label: "Morning Tea, Coffee & Cookies", category: "Dining" },
  { icon: Utensils, label: "Dining Area & Table", category: "Dining" },
  { icon: Utensils, label: "24-Hour In-Room Service", category: "Hospitality" },
  { icon: Wifi, label: "High-Speed Wi-Fi (4 Devices)", category: "Connectivity" },
  { icon: Tv, label: "LED TV with Satellite Channels", category: "Entertainment" },
  { icon: Wind, label: "Hot & Cold Air Conditioning", category: "Climate" },
  { icon: Lock, label: "In-Room Digital Safe", category: "Security" },
  { icon: Utensils, label: "Mini Refrigerator", category: "Convenience" },
  { icon: Phone, label: "Workstation Executive Desk", category: "Work" },
  { icon: Shirt, label: "Wardrobe & Slippers", category: "Hospitality" },
  { icon: Phone, label: "Room-to-Room Intercom Dial", category: "Hospitality" },
  { icon: Check, label: "Wheelchair Accessible Layout", category: "Accessibility" }
];

const OTHER_ROOMS = [
  {
    id: "suite",
    name: "Suite Room",
    rate: "₹7,200 / night",
    size: "400 Sq. Ft.",
    image: "/images/suite-room-Room.jpg",
    desc: "Spacious suite with garden balconies, rich wood furnishings, dining space, and premium hospitality."
  },
  {
    id: "luxury",
    name: "Luxury Room with Shower Glass Partition",
    rate: "₹6,000 / night",
    size: "300 Sq. Ft.",
    image: "/images/luxury-room-Room.jpg",
    desc: "Modern aesthetics featuring glass partition shower bathrooms, plush bedding, and garden serenity."
  },
  {
    id: "deluxe",
    name: "Deluxe Room",
    rate: "₹4,600 / night",
    size: "200 Sq. Ft.",
    image: "/images/deluxe-room-Room.jpg",
    desc: "Elegantly furnished rooms overlooking the lawns, ideal for weekend stopovers and day retreats."
  }
];

export default function PresidentialSuitePage() {
  const [, setLocation] = useLocation();
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState(0);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Presidential Suite Staycation Booking");

  const openBooking = (intent = "Presidential Suite Staycation") => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#0E295B] font-sans">
      {/* =========================================================================
          SITE HEADER / NAVBAR (Unified identical component across all pages)
          ========================================================================= */}
      <SiteHeader onOpenBooking={(pkg) => openBooking(pkg)} />

      {/* Breadcrumb Navigation */}
      <div className="pt-28 pb-4 bg-[#061A33] text-white/70 border-b border-white/10">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12 flex items-center gap-2 text-xs font-semibold">
          <Link href="/" className="hover:text-white flex items-center gap-1">
            <Home size={13} />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="opacity-40" />
          <Link href="/#stay-accommodation" className="hover:text-white">Resort Accommodation</Link>
          <ChevronRight size={13} className="opacity-40" />
          <span className="text-[#FFA96B] font-bold">Presidential Suite</span>
        </div>
      </div>

      {/* =========================================================================
          HERO SHOWCASE SECTION
          ========================================================================= */}
      <section className="relative bg-[#061A33] text-white pb-20 pt-8 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#01A5E1]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-[#F68734]/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1560px] mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Titles & Highlights (6.5 Cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Luxury Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#F68734]/20 via-[#01A5E1]/20 to-transparent border border-[#FFA96B]/35 text-[#FFA96B] text-xs font-black uppercase tracking-widest self-start backdrop-blur-md shadow-[0_0_20px_rgba(246,135,52,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#FFA96B] animate-pulse" />
                <span>👑 Signature Presidential Wing &bull; 800 Sq. Ft.</span>
              </div>

              {/* Editorial Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-black text-white font-display tracking-tight leading-[1.12]">
                Luxury <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFA96B] via-[#FFE2B3] to-[#89D9F8]">Presidential Suite</span> for Staycation in Gurgaon
              </h1>

              {/* Description with Subtle Accent Line */}
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl font-normal border-l-2 border-[#01A5E1]/50 pl-4 py-0.5">
                A palatial private retreat featuring an expansive master bedroom, separate royal living room lounge, dining area, workstation desk, and luxury bathtub washroom overlooking 9 acres of serene landscaped lawns.
              </p>

              {/* 4 Refined Glassmorphic Spec Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.12] backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.09] hover:border-[#01A5E1]/40 transition-all group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-[#89D9F8] tracking-wider">Suite Size</span>
                    <Maximize2 size={13} className="text-[#89D9F8]/70 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm sm:text-base font-black text-white">800 Sq. Ft.</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.12] backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.09] hover:border-[#01A5E1]/40 transition-all group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-[#FFA96B] tracking-wider">Bedding</span>
                    <BedDouble size={13} className="text-[#FFA96B]/70 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm sm:text-base font-black text-white">King + Sofa</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.12] backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.09] hover:border-[#01A5E1]/40 transition-all group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-[#89D9F8] tracking-wider">Occupancy</span>
                    <Users size={13} className="text-[#89D9F8]/70 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm sm:text-base font-black text-white">2–4 Guests</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.12] backdrop-blur-md flex flex-col justify-between hover:bg-white/[0.09] hover:border-[#01A5E1]/40 transition-all group">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase text-[#69B32D] tracking-wider">View</span>
                    <Sparkles size={13} className="text-[#69B32D]/70 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm sm:text-base font-black text-white">Lawn Balcony</span>
                </div>
              </div>

              {/* CTA Action Bar */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={() => openBooking("Presidential Suite Staycation")}
                  className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#F68734] to-[#EC3337] hover:from-[#EC3337] hover:to-[#D84A22] text-white font-black text-sm shadow-[0_10px_25px_rgba(246,135,52,0.4)] hover:shadow-[0_12px_35px_rgba(246,135,52,0.65)] transition-all flex items-center gap-2 transform active:scale-97 cursor-pointer"
                >
                  <BedDouble size={17} />
                  <span>Reserve Suite Now</span>
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </button>

                <a
                  href="https://www.aapnoghar.com/aapno360/presidential-suite.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 hover:border-white/35 text-white font-bold text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-md backdrop-blur-md"
                >
                  <Compass size={17} className="text-[#D4AF37]" />
                  <span>Launch 360° Virtual Tour</span>
                </a>
              </div>

              {/* Trust Badge Snippets */}
              <div className="flex flex-wrap items-center gap-5 text-xs font-semibold text-white/60 pt-1">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-[#69B32D]" /> 100% Pure Veg Resort</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-[#69B32D]" /> Free Buffet Breakfast</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-[#69B32D]" /> 4-Device Wi-Fi</span>
              </div>
            </div>

            {/* Right Col: Interactive Visual Frame (5.5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-[4/3] bg-black/40 group">
                <img
                  src={GALLERY_IMAGES[selectedGalleryIdx].src}
                  alt={GALLERY_IMAGES[selectedGalleryIdx].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs font-bold text-[#FFA96B] uppercase tracking-wider">
                    {GALLERY_IMAGES[selectedGalleryIdx].title}
                  </span>
                  <p className="text-xs text-white/80 mt-0.5">
                    {GALLERY_IMAGES[selectedGalleryIdx].caption}
                  </p>
                </div>
              </div>

              {/* Gallery Thumbnails Strip */}
              <div className="grid grid-cols-4 gap-2.5 mt-3">
                {GALLERY_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedGalleryIdx(idx)}
                    className={`rounded-xl overflow-hidden aspect-video border-2 transition-all cursor-pointer ${
                      selectedGalleryIdx === idx
                        ? "border-[#F68734] scale-102 shadow-lg"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SUITE OVERVIEW & PRIVILEGES
          ========================================================================= */}
      <section className="py-20 bg-white border-b border-[#0E295B]/10">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Content (8 Cols) */}
            <div className="lg:col-span-8 space-y-10">
              {/* Section Header */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F68734]/10 border border-[#F68734]/25 text-[#F68734] text-xs font-black uppercase tracking-wider mb-3">
                  <Sparkles size={14} className="text-[#F68734]" />
                  <span>The Royal Experience &bull; 800 Sq. Ft.</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#0E295B] font-display tracking-tight leading-tight">
                  An exclusive sanctuary designed for effortless family relaxation &amp; celebration.
                </h2>
              </div>

              {/* 2 Editorial Feature Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-6 rounded-3xl bg-[#FDFCF9] border border-[#0E295B]/10 hover:border-[#F68734]/30 hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="w-12 h-12 rounded-2xl bg-[#F68734]/10 text-[#F68734] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Armchair size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#0E295B] font-display mb-2">
                      Private Royal Living Lounge
                    </h3>
                    <p className="text-xs sm:text-sm text-[#50657D] leading-relaxed">
                      Extends beyond the master bedroom into an exclusive living room with plush group lounge seating, dining table, and safe — ideal for family ceremonies, evening games, and relaxing reunions.
                    </p>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-[#FDFCF9] border border-[#0E295B]/10 hover:border-[#01A5E1]/30 hover:shadow-md transition-all flex flex-col justify-between group">
                  <div className="w-12 h-12 rounded-2xl bg-[#01A5E1]/10 text-[#01A5E1] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Compass size={24} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-[#0E295B] font-display mb-2">
                      Lawn-Facing Panoramic Views
                    </h3>
                    <p className="text-xs sm:text-sm text-[#50657D] leading-relaxed">
                      Expansive glass windows and outdoor sit-outs overlook 9 acres of manicured green lawns, welcoming natural morning sunshine and safe open play areas for children.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4 Categorized Amenity Pillars */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[#0E295B]/10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0E295B] font-display flex items-center gap-2.5">
                      <Star size={22} className="text-[#F68734] fill-[#F68734]" />
                      <span>Comprehensive Suite Amenities</span>
                    </h3>
                    <p className="text-xs text-[#50657D] mt-0.5">Meticulously curated comforts for royalty, families & luxury travelers.</p>
                  </div>
                  <span className="self-start sm:self-center px-3 py-1 rounded-full bg-[#0E295B]/5 text-[#0E295B] text-xs font-extrabold uppercase tracking-wider border border-[#0E295B]/10">
                    24 Luxury Features
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Pillar 1: Living & Bedding */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:border-[#F68734]/40 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F68734] to-[#FFA96B]" />
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-[#F68734]/15 text-[#F68734] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <BedDouble size={20} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-base text-[#0E295B]">Living &amp; Master Suite</h4>
                        <span className="text-[11px] text-slate-400">Rest &amp; Entertainment</span>
                      </div>
                    </div>
                    <ul className="space-y-2.5 text-xs font-semibold text-[#50657D]">
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#F68734] shrink-0" /> King Size Master Bed &amp; Premium Bedding</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#F68734] shrink-0" /> Private Royal Living Room Lounge</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#F68734] shrink-0" /> Single Sofa-cum-Bed for Extra Guest</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#F68734] shrink-0" /> Executive Workstation &amp; Dining Table</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#F68734] shrink-0" /> Spacious Wardrobe &amp; In-Room Slippers</li>
                    </ul>
                  </div>

                  {/* Pillar 2: Bath & Wellness */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:border-[#01A5E1]/40 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#01A5E1] to-[#89D9F8]" />
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                      <div className="w-10 h-10 rounded-2xl bg-[#01A5E1]/15 text-[#01A5E1] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Bath size={20} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-base text-[#0E295B]">Bath &amp; Wellness</h4>
                        <span className="text-[11px] text-slate-400">Personal Hygiene &amp; Rejuvenation</span>
                      </div>
                    </div>
                    <ul className="space-y-2.5 text-xs font-semibold text-[#50657D]">
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#01A5E1] shrink-0" /> Attached Master Bath with Bathtub</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#01A5E1] shrink-0" /> 24-Hr Hot &amp; Cold Running Water</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#01A5E1] shrink-0" /> Premium Organic Toiletries Kit</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#01A5E1] shrink-0" /> Hair Dryer &amp; Iron (On Request)</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#01A5E1] shrink-0" /> Plush Cotton Bath Towels &amp; Slippers</li>
                    </ul>
                  </div>

                  {/* Pillar 3: Dining & Hospitality */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:border-[#EC3337]/40 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#EC3337] to-[#FFA96B]" />
                    <div className="flex items-center gap-3 mb-4 pb-3 border-slate-100 border-b">
                      <div className="w-10 h-10 rounded-2xl bg-[#EC3337]/15 text-[#EC3337] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Utensils size={20} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-base text-[#0E295B]">Dining &amp; Hospitality</h4>
                        <span className="text-[11px] text-slate-400">In-Room Dining &amp; Refreshments</span>
                      </div>
                    </div>
                    <ul className="space-y-2.5 text-xs font-semibold text-[#50657D]">
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#EC3337] shrink-0" /> Complimentary Buffet Breakfast</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#EC3337] shrink-0" /> Morning Lawn Tea, Coffee &amp; Cookies</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#EC3337] shrink-0" /> In-Room Mini Refrigerator</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#EC3337] shrink-0" /> Dedicated 24-Hour Room Service</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#EC3337] shrink-0" /> Daily Newspaper (On Request)</li>
                    </ul>
                  </div>

                  {/* Pillar 4: Connectivity & Utilities */}
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:border-[#69B32D]/40 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#69B32D] to-[#89D9F8]" />
                    <div className="flex items-center gap-3 mb-4 pb-3 border-slate-100 border-b">
                      <div className="w-10 h-10 rounded-2xl bg-[#69B32D]/15 text-[#69B32D] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <Wifi size={20} />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-base text-[#0E295B]">Tech, Security &amp; Comfort</h4>
                        <span className="text-[11px] text-slate-400">High-Speed Digital &amp; Climate</span>
                      </div>
                    </div>
                    <ul className="space-y-2.5 text-xs font-semibold text-[#50657D]">
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#69B32D] shrink-0" /> High-Speed Wi-Fi (Up to 4 Devices)</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#69B32D] shrink-0" /> LED TV with Satellite HD Channels</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#69B32D] shrink-0" /> Hot &amp; Cold Climate Air Conditioner</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#69B32D] shrink-0" /> In-Room Digital Safe Locker</li>
                      <li className="flex items-center gap-2.5 transition-transform hover:translate-x-1"><CheckCircle2 size={15} className="text-[#69B32D] shrink-0" /> Intercom &amp; Wheelchair Accessible</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Resort Privileges Box */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0E295B] via-[#0A1E29] to-[#061A33] text-white shadow-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-[#F68734]/20 rounded-full blur-2xl pointer-events-none" />
                
                <h4 className="text-lg font-black text-white mb-1.5 flex items-center gap-2.5">
                  <Sparkles size={20} className="text-[#FFA96B] animate-pulse" />
                  <span>Complimentary Resort Privileges Included with Suite Stay</span>
                </h4>
                <p className="text-xs text-slate-300 mb-4">Every suite reservation unlocks complimentary access to resort grounds &amp; special pass rates.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-white">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition">
                    <CheckCircle2 size={18} className="text-[#69B32D] shrink-0" />
                    <span>Free Open Gym &amp; Badminton Court Access</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition">
                    <CheckCircle2 size={18} className="text-[#69B32D] shrink-0" />
                    <span>Morning Tea &amp; Cookie Stall on Resort Lawns</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition">
                    <CheckCircle2 size={18} className="text-[#69B32D] shrink-0" />
                    <span>100% Pure Vegetarian Buffet Breakfast</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition">
                    <CheckCircle2 size={18} className="text-[#69B32D] shrink-0" />
                    <span>Exclusive Discount on Water &amp; Amusement Passes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sticky Column (4 Cols) - Packed with High-Converting Trust Cards */}
            <div className="lg:col-span-4 space-y-6 sticky top-28">
              {/* Card 1: Main Booking & Rate Card */}
              <div className="bg-[#061A33] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/20">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#89D9F8]">Room Tariff</span>
                    <div className="text-2xl font-black text-[#FFA96B] font-display">Premium Luxury</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-white border border-white/15">
                    Best Rate Guaranteed
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-[#FFA96B]" />
                      <span>Check-in:</span>
                    </span>
                    <span className="font-bold text-white">12:00 PM (Noon)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-[#89D9F8]" />
                      <span>Check-out:</span>
                    </span>
                    <span className="font-bold text-white">10:30 AM</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Utensils size={13} className="text-[#69B32D]" />
                      <span>Meals:</span>
                    </span>
                    <span className="font-bold text-white">100% Pure Veg</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openBooking("Presidential Suite Staycation")}
                  className="w-full py-4 rounded-2xl bg-[#F68734] hover:bg-[#D84A22] text-white font-black text-sm shadow-xl hover:shadow-[0_0_30px_rgba(246,135,52,0.7)] transition-all flex items-center justify-center gap-2 mb-3"
                >
                  <span>Check Dates &amp; Book</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href="https://wa.me/917666779997?text=Hi%20AapnoGhar,%20I%20am%20interested%20in%20booking%20the%20Presidential%20Suite."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition-all shadow-md mb-4"
                >
                  <span>Chat with Reservation Team</span>
                </a>

                <p className="text-[11px] text-white/50 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#69B32D]" />
                  <span>Zero convenience fee &bull; Direct resort confirmation</span>
                </p>
              </div>

              {/* Card 2: Why Book Direct Benefits */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md">
                <h4 className="text-sm font-extrabold text-[#0E295B] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-[#F68734]" />
                  <span>Why Book Direct With Us?</span>
                </h4>
                <ul className="space-y-2.5 text-xs font-semibold text-[#50657D]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Best Price Guarantee (No Third-Party Markup)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Complimentary Hot Buffet Breakfast</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Free Pass Upgrades for Water Park</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                    <span>Flexible Check-in Assistance (On Request)</span>
                  </li>
                </ul>
              </div>

              {/* Card 3: Guest Rating & Verified Review */}
              <div className="bg-gradient-to-br from-[#FFF8F2] to-[#FFFBF7] rounded-3xl p-6 border border-[#F68734]/25 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#F68734]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-[#F68734]" />
                    ))}
                  </div>
                  <span className="text-xs font-extrabold text-[#0E295B]">4.9 / 5.0 Rating</span>
                </div>
                <p className="text-xs italic text-[#50657D] leading-relaxed mb-3">
                  "The Presidential Suite surpassed our expectations. Vast private lounge, lush balcony views, and pure veg food was unbelievable."
                </p>
                <div className="text-[11px] font-bold text-[#0E295B]">
                  — Major Rahul Sharma <span className="text-emerald-600 font-medium">(Verified Guest)</span>
                </div>
              </div>

              {/* Card 4: Special Concierge Arrangements */}
              <div className="bg-[#0E295B] text-white rounded-3xl p-6 border border-white/10 shadow-lg">
                <h4 className="text-sm font-extrabold text-[#89D9F8] mb-1.5">Custom Suite Celebrations?</h4>
                <p className="text-xs text-white/80 leading-relaxed mb-4">
                  Planning a birthday, anniversary, or surprise decor in your suite? Our team handles flowers, cake &amp; private dining.
                </p>
                <button
                  type="button"
                  onClick={() => openBooking("Special Suite Celebration Decor")}
                  className="w-full py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition border border-white/20"
                >
                  Request Special Decor →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          EXPLORE OTHER SUITES & ROOMS
          ========================================================================= */}
      <section className="py-20 bg-[#FDFCF9] border-b border-[#0E295B]/10">
        <div className="max-w-[1560px] mx-auto px-6 sm:px-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow eyebrow--teal text-xs font-black uppercase tracking-wider">Other Accommodations</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0E295B] font-display mt-1">
              Explore More Resort Rooms
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {OTHER_ROOMS.map((rm) => (
              <div key={rm.id} className="bg-white rounded-3xl overflow-hidden border border-[#0E295B]/10 shadow-lg flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden bg-black/10">
                  <img src={rm.image} alt={rm.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#0E295B]/85 backdrop-blur-md text-white text-xs font-extrabold">
                    {rm.rate}
                  </span>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#01A5E1] tracking-wider">{rm.size}</span>
                    <h3 className="text-lg font-black text-[#0E295B] font-display mt-0.5 mb-2">{rm.name}</h3>
                    <p className="text-xs text-[#50657D] leading-relaxed mb-4">{rm.desc}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openBooking(`${rm.name} Enquiry`)}
                    className="w-full py-2.5 rounded-xl bg-[#0E295B] hover:bg-[#01A5E1] text-white text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve {rm.name.split(" ")[0]}</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SITE FOOTER
          ========================================================================= */}
      <SiteFooter />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        intent={bookingIntent}
      />
    </div>
  );
}
