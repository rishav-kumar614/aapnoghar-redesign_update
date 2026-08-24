import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEOHead, WATERPARK_SCHEMA } from "@/components/SEOHead";
import { BookingModal } from "@/components/BookingModal";
import {
  Waves,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Ticket,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Info,
  Droplets,
  Sun,
  Users
} from "lucide-react";

const WATER_SLIDES = [
  { title: "Turbo Tunnel Slide", desc: "High-speed enclosed body slide dropping into splash zone." },
  { title: "Giant Family Wave Pool", desc: "Huge simulated ocean waves suitable for all ages." },
  { title: "Rain Dance Stage", desc: "Live DJ music stage with overhead mist showers." },
  { title: "Lazy River Float", desc: "Gentle winding stream around lush tropical trees." },
  { title: "Multi-Lane Racer Slide", desc: "4-person side-by-side mat racing slide." },
  { title: "Kids Water Play Fortress", desc: "Shallow water play zone with tipping buckets & mini slides." }
];

export default function WaterParkPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Water Park Ticket Booking");

  const handleOpenBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-[#0F172A] font-sans antialiased">
      <SEOHead
        title="21 Thrill Water Slides & Wave Pool Arena | AapnoGhar Gurgaon"
        description="Experience 21 thrilling water slides, huge family wave pool, rain dance & aqua play fortresses at AapnoGhar Water Park, Sector 77, Gurgaon."
        canonicalPath="/water-park"
        schemaRaw={WATERPARK_SCHEMA}
      />
      <SiteHeader onOpenBooking={handleOpenBooking} />

      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#061A33] text-white overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />

        {/* Radial glow layers */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#0284C7]/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#01A5E1]/10 blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061A33]/50 via-[#061A33]/80 to-[#061A33]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7DD3FC]/70 mb-6">
            <Link href="/" className="hover:text-[#7DD3FC] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/50">Water Park</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#0284C7]/40 bg-[#0284C7]/10 text-[#7DD3FC] text-xs font-bold uppercase tracking-widest">
            <Waves size={12} className="text-[#FFA96B]" />
            21 Thrilling Slides · Wave Pool · Rain Dance
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            Thrilling Water Park{" "}
            <span className="italic bg-gradient-to-r from-[#7DD3FC] via-[#0284C7] to-[#FFA96B] bg-clip-text text-transparent">
              &amp; Wave Pool
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Beat the heat with 21+ exhilarating water slides, giant wave pool, rain dance floor with live DJ music, and shallow kids splash zones.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => handleOpenBooking("Water Park Day Pass")}
              className="px-6 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm shadow-lg shadow-[#0284C7]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <Ticket size={16} />
              <span>Book Day Pass</span>
            </button>
            <button
              onClick={() => handleOpenBooking("Water Park Info")}
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <Info size={16} />
              <span>View All Slides</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <Waves size={16} className="text-[#7DD3FC]" />, value: "21+", label: "Water Slides" },
              { icon: <Clock size={16} className="text-[#FFA96B]" />, value: "10:30 AM", label: "Park Opening" },
              { icon: <Droplets size={16} className="text-[#A3E635]" />, value: "100%", label: "Filtered Water" },
              { icon: <ShieldCheck size={16} className="text-[#F472B6]" />, value: "Certified", label: "Lifeguard Supervision" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center shrink-0">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white leading-none">{stat.value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7] bg-[#0284C7]/10 px-3 py-1.5 rounded-full">
            Water Park Rides
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F172A] mt-4 mb-4">
            Featured Water Attractions
          </h2>
          <p className="text-slate-600">
            From high-adrenaline drops to relaxing lazy rivers, we have attractions tailored for toddlers, teens, and adults alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WATER_SLIDES.map((slide, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-sky-100 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center mb-4">
                <Waves size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">{slide.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{slide.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing & Guidelines Section */}
      <section className="bg-white py-16 border-y border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                Ticket Pricing &amp; Entry
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#0F172A]">
                Water Park Entry Passes
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tickets include entry to both the Water Park and Amusement Park joyrides along with complimentary buffet lunch and snacks!
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[#0F172A]">Adult Pass (Above 4 ft)</div>
                    <div className="text-xs text-slate-500">Includes Water Park + Rides + Buffet Lunch</div>
                  </div>
                  <div className="text-xl font-bold text-[#0284C7]">₹1,199 / person</div>
                </div>

                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[#0F172A]">Kids Pass (3 ft to 4 ft)</div>
                    <div className="text-xs text-slate-500">Includes Water Park + Rides + Buffet Lunch</div>
                  </div>
                  <div className="text-xl font-bold text-[#0284C7]">₹799 / child</div>
                </div>
              </div>

              <button
                onClick={() => handleOpenBooking("Water Park Tickets")}
                className="w-full py-3.5 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
              >
                <Ticket size={18} />
                <span>Book Water Park Tickets Online</span>
              </button>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <Info className="text-[#0284C7]" size={20} />
                <span>Important Visitor Guidelines</span>
              </h3>

              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Synthetic / Lycra / Nylon costumes are mandatory on all water slides. Costumes available on rental/sale inside park.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Locker facilities and costume changing rooms with hot showers available.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Outside food and beverages strictly prohibited inside the park premises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Water Park operating hours: 10:30 AM to 6:30 PM daily.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultIntent={bookingIntent}
      />
    </div>
  );
}
