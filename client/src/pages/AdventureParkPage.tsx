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
      <section className="relative pt-32 pb-20 bg-[#047857] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center filter blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#065F46]/90 via-[#047857]/90 to-[#047857]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A7F3D0] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>Adventure &amp; Activity Park</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Adventure &amp; Rope Obstacle Zone
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-3xl leading-relaxed mb-8">
            Challenge your adrenaline with outdoor rope courses, ziplining, commando nets, wall climbing, and team obstacle races supervised by trained instructors.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">15+</div>
              <div className="text-xs text-emerald-100">Adventure Courses</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">100%</div>
              <div className="text-xs text-emerald-100">Safety Harness Protection</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">Certified</div>
              <div className="text-xs text-emerald-100">Adventure Instructors</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">Group Friendly</div>
              <div className="text-xs text-emerald-100">Team Building Events</div>
            </div>
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
