import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import {
  Sparkles,
  Ticket,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Smile,
  Zap,
  Flame,
  ArrowRight
} from "lucide-react";

const AMUSEMENT_RIDES = [
  { name: "Caterpillar Coaster", category: "Family Ride", desc: "Whimsical winding coaster suitable for kids & adults." },
  { name: "Monorail Express", category: "Scenic Ride", desc: "Elevated monorail offering aerial views of the entire resort estate." },
  { name: "Flying Dish (Disco-360)", category: "Thrill Ride", desc: "Spinning giant dish pendulum swinging high up into the air." },
  { name: "Baby Train & Merry-Go-Round", category: "Kids Ride", desc: "Classic colorful carousel and mini train ride for toddlers." },
  { name: "Break Dance Thriller", category: "Thrill Ride", desc: "Fast-spinning mechanical arms spinning car platforms." },
  { name: "Giant Ferris Wheel", category: "Family Ride", desc: "Iconic ferris wheel giving panoramic views of Delhi-NCR." },
  { name: "Bumper Cars (Dash 'N Cars)", category: "Popular Ride", desc: "Electric dodgem cars arena for fun collisions with friends & family." },
  { name: "Mini Helicopter Ride", category: "Kids Ride", desc: "Interactive helicopter ride with up & down elevation controls for kids." }
];

export default function AmusementParkPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Amusement Park Pass");

  const handleOpenBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-[#1E293B] font-sans antialiased">
      <SiteHeader onOpenBooking={handleOpenBooking} />

      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#061A33] text-white overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />

        {/* Radial glow layers */}
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-[#D97706]/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#F59E0B]/10 blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061A33]/50 via-[#061A33]/80 to-[#061A33]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FDE68A]/70 mb-6">
            <Link href="/" className="hover:text-[#FDE68A] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/50">Amusement Park</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#D97706]/40 bg-[#D97706]/10 text-[#FDE68A] text-xs font-bold uppercase tracking-widest">
            <Zap size={12} className="text-[#FFA96B]" />
            20+ Mechanical Rides · All Ages · Unlimited Access
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            Joyrides &amp;{" "}
            <span className="italic bg-gradient-to-r from-[#FDE68A] via-[#F59E0B] to-[#FFA96B] bg-clip-text text-transparent">
              Amusement Park
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Experience non-stop fun with 20+ exciting mechanical rides, family coasters, bumper cars, and kids play zone — all included in your ticket!
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => handleOpenBooking("Amusement Park Pass")}
              className="px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-white font-bold text-sm shadow-lg shadow-[#D97706]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <Ticket size={16} />
              <span>Book Park Pass</span>
            </button>
            <button
              onClick={() => handleOpenBooking("Amusement Park Combo")}
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <Sparkles size={16} />
              <span>View All Rides</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <Zap size={16} className="text-[#FDE68A]" />, value: "20+", label: "Joyrides & Attractions" },
              { icon: <Smile size={16} className="text-[#FFA96B]" />, value: "All Ages", label: "Kids, Teens & Adults" },
              { icon: <ShieldCheck size={16} className="text-[#A3E635]" />, value: "100%", label: "Safety Certified" },
              { icon: <Flame size={16} className="text-[#F472B6]" />, value: "Unlimited", label: "Rides in Ticket" },
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

      {/* Rides List */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-3 py-1.5 rounded-full">
            Featured Attractions
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1E293B] mt-4 mb-4">
            Endless Thrills &amp; Family Joyrides
          </h2>
          <p className="text-slate-600">
            All tickets grant unlimited access to all 20+ joyrides throughout your visit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {AMUSEMENT_RIDES.map((ride, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 flex flex-col justify-between hover:shadow-lg transition">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                  {ride.category}
                </span>
                <h3 className="text-lg font-bold text-[#1E293B] mt-3 mb-2">{ride.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{ride.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={14} /> Unlimited Access
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ticket CTA */}
      <section className="bg-white py-16 border-t border-amber-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold text-[#1E293B] mb-4">
            Ready for a Day Full of Joyrides &amp; Fun?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Book your combo ticket online for maximum savings including full access to Water Park, Amusement Joyrides, and All-Day Buffet Meals.
          </p>
          <button
            onClick={() => handleOpenBooking("Amusement Park Combo Pass")}
            className="px-8 py-4 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] font-bold text-base shadow-xl inline-flex items-center gap-2 transition"
          >
            <Ticket size={20} />
            <span>Book Amusement Park Combo Ticket</span>
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
