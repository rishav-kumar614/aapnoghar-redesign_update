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
      <section className="relative pt-32 pb-20 bg-[#0A1E29] text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>About Us</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Welcome to AapnoGhar Resort
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Established over 20+ years ago, AapnoGhar is Delhi-NCR's premier 9-acre green resort, water park, and amusement destination located conveniently on NH-48, Sector 77, Gurugram.
          </p>
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
