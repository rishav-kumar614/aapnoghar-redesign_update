import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import {
  Compass,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  ChevronRight,
  Target,
  Trophy,
  Users
} from "lucide-react";

const ADVENTURE_ACTIVITIES = [
  { title: "Zipline Flying Fox", desc: "150m aerial zipline glide over green tree canopy with harness safety." },
  { title: "Burma Bridge & Rope Walk", desc: "Suspended 3-rope walking bridge testing balance & focus." },
  { title: "Artificial Wall Climbing", desc: "25ft climbing wall with auto-belay system & beginner to pro routes." },
  { title: "Commando Net Climb", desc: "High-strength cargo rope net climb for endurance and strength." },
  { title: "Tire Swing Obstacle", desc: "Wobbly hanging tire crossing obstacle challenge." },
  { title: "Trampoline & Archery Arena", desc: "Target archery shooting range and high-bounce trampolines." }
];

export default function AdventureParkPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Adventure Activity Pass");

  const handleOpenBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F0FDF4] text-[#064E3B] font-sans antialiased">
      <SiteHeader onOpenBooking={handleOpenBooking} />

      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#061A33] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-[#047857]/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#10B981]/10 blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061A33]/50 via-[#061A33]/80 to-[#061A33]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A7F3D0]/70 mb-6">
            <Link href="/" className="hover:text-[#A7F3D0] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/50">Adventure &amp; Activity Park</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#047857]/40 bg-[#047857]/10 text-[#A7F3D0] text-xs font-bold uppercase tracking-widest">
            <Compass size={12} className="text-[#FFA96B]" />
            15+ Courses · Zipline · Wall Climb · Team Building
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            Adventure &amp;{" "}
            <span className="italic bg-gradient-to-r from-[#A7F3D0] via-[#10B981] to-[#FFA96B] bg-clip-text text-transparent">
              Rope Obstacle Zone
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Challenge your adrenaline with outdoor rope courses, ziplining, commando nets, wall climbing, and team obstacle races supervised by certified instructors.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => handleOpenBooking("Adventure Activity Pass")}
              className="px-6 py-3.5 rounded-xl bg-[#047857] hover:bg-[#065F46] text-white font-bold text-sm shadow-lg shadow-[#047857]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <Zap size={16} />
              <span>Book Adventure Pass</span>
            </button>
            <button
              onClick={() => handleOpenBooking("Team Building Inquiry")}
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <Users size={16} />
              <span>Team Outing Inquiry</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <Compass size={16} className="text-[#A7F3D0]" />, value: "15+", label: "Adventure Courses" },
              { icon: <ShieldCheck size={16} className="text-[#FFA96B]" />, value: "100%", label: "Safety Harness" },
              { icon: <Trophy size={16} className="text-[#A3E635]" />, value: "Certified", label: "Instructors" },
              { icon: <Users size={16} className="text-[#F472B6]" />, value: "Group", label: "Team Building" },
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

      {/* Activities Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#047857] bg-[#047857]/10 px-3 py-1.5 rounded-full">
            Outdoor Obstacles
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#064E3B] mt-4 mb-4">
            Adrenaline &amp; Team Building Challenges
          </h2>
          <p className="text-slate-600">
            Perfect for corporate teams, school outings, and adventurous families seeking outdoor excitement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVENTURE_ACTIVITIES.map((act, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-emerald-100 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#047857] flex items-center justify-center mb-4">
                <Compass size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#064E3B] mb-2">{act.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{act.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate & Group CTA */}
      <section className="bg-white py-16 border-t border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-[#064E3B] mb-4">
            Planning a Group Adventure Outing?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Get customized group discounts for corporate team building, school trips, or large family reunions.
          </p>
          <button
            onClick={() => handleOpenBooking("Adventure Group Booking")}
            className="px-8 py-4 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] font-bold text-base shadow-xl inline-flex items-center gap-2 transition"
          >
            <Users size={20} />
            <span>Inquire Group Package Rates</span>
          </button>
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
