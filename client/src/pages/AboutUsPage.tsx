import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import { ChevronRight, Award, ShieldCheck, MapPin, Heart, Users } from "lucide-react";

export default function AboutUsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans antialiased">
      <SiteHeader onOpenBooking={() => setIsBookingOpen(true)} />

      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#061A33] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#01A5E1]/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-[#FFA96B]/10 blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061A33]/50 via-[#061A33]/80 to-[#061A33]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B]/70 mb-6">
            <Link href="/" className="hover:text-[#FFA96B] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/50">About Us</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#FFA96B]/40 bg-[#FFA96B]/10 text-[#FFA96B] text-xs font-bold uppercase tracking-widest">
            <Award size={13} className="text-[#FDE68A]" />
            Since 1994 · 30+ Years Heritage · 9 Acres Sanctuary · Delhi-NCR
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            Welcome to{" "}
            <span className="italic bg-gradient-to-r from-[#FFA96B] via-[#F68734] to-[#01A5E1] bg-clip-text text-transparent">
              AapnoGhar Resort
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Delhi-NCR's premier 9-acre green resort, 21-slide water park, and authentic celebration sanctuary located conveniently on NH-48, Sector 77, Gurugram.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-[#F68734] hover:bg-[#d9701e] text-white font-bold text-sm shadow-lg shadow-[#F68734]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Heart size={16} />
              <span>Book Your Visit</span>
            </button>
            <Link
              href="/rooms"
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
            >
              <Users size={16} />
              <span>Explore Accommodations</span>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <Award size={16} className="text-[#FFA96B]" />, value: "30+ Years", label: "Heritage Hospitality" },
              { icon: <MapPin size={16} className="text-[#01A5E1]" />, value: "9 Acres", label: "Lush Greenery" },
              { icon: <Users size={16} className="text-[#A3E635]" />, value: "5M+ Guests", label: "Happy Memories" },
              { icon: <ShieldCheck size={16} className="text-[#F472B6]" />, value: "100%", label: "Pure Vegetarian" },
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

      {/* Story & Vision */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#01A5E1] bg-[#01A5E1]/10 px-3 py-1.5 rounded-full">
              Our Legacy
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#0A1E29]">
              20+ Years of Traditional Indian Hospitality
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Meaning "Our Home" in Hindi, AapnoGhar was founded with the vision of offering families, couples, and corporate guests a tranquil haven away from the hustle of metropolitan city life.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Spanning across 9 manicured acres, the property features 42 luxury rooms and presidential suites, 21 water slides, 20 amusement rides, fine dining restaurants, and lush wedding lawns.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img src="/images/hero-bg.jpg" alt="AapnoGhar Estate" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <SiteFooter />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultIntent="General Inquiry" />
    </div>
  );
}
