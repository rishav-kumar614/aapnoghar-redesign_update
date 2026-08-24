import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import {
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  Phone,
  Heart,
  ChevronRight,
  ArrowRight,
  MapPin
} from "lucide-react";

const VENUES = [
  {
    name: "Chander Party Lawn",
    capacity: "500 to 2,500 Guests",
    type: "Lush Open-Air Lawns",
    desc: "Sprawling grand party lawn surrounded by mature trees and romantic fairy lights for grand weddings & receptions.",
    image: "/images/hero-bg.jpg"
  },
  {
    name: "Bhanwar Party Lawn",
    capacity: "50 to 300 Guests",
    type: "Intimate Outdoor Venue",
    desc: "Cozy open-air lawn perfect for Sangeet, Mehendi ceremonies, anniversary parties, and private dinners.",
    image: "/images/deluxe-room-Room.jpg"
  },
  {
    name: "Abhinandan Banquet Hall",
    capacity: "30 to 250 Guests",
    type: "Air-Conditioned Indoor Hall",
    desc: "Elegantly decorated AC indoor banquet hall with modular stage setup, crystal chandeliers, and sound system.",
    image: "/images/suite-room-Room.jpg"
  },
  {
    name: "Swagatam Banquet Hall",
    capacity: "Up to 150 Guests",
    type: "AC Banquet Hall",
    desc: "Versatile indoor hall for engagement functions, pre-wedding rituals, and corporate banquets.",
    image: "/images/luxury-room-room-home-left.jpg"
  }
];

export default function WeddingsBanquetsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Wedding / Banquet Inquiry");

  const handleOpenBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#1E293B] font-sans antialiased">
      <SiteHeader onOpenBooking={handleOpenBooking} />

      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#061A33] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 right-1/4 w-[550px] h-[550px] rounded-full bg-[#9F1239]/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-[#FCD34D]/8 blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061A33]/50 via-[#061A33]/80 to-[#061A33]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FCD34D]/70 mb-6">
            <Link href="/" className="hover:text-[#FCD34D] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/50">Weddings &amp; Banquets</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#9F1239]/40 bg-[#9F1239]/10 text-[#FDA4AF] text-xs font-bold uppercase tracking-widest">
            <Sparkles size={12} className="text-[#FCD34D]" />
            4 Venues · 2,500 Guest Capacity · Custom Decor
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            Destination Weddings{" "}
            <span className="italic bg-gradient-to-r from-[#FDA4AF] via-[#FCD34D] to-[#FFA96B] bg-clip-text text-transparent">
              &amp; Celebrations
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Create unforgettable memories across 9 acres of manicured lawns, luxurious banquet halls, custom decor, and authentic catering services in Gurugram.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => handleOpenBooking("Wedding Venue Reservation")}
              className="px-6 py-3.5 rounded-xl bg-[#9F1239] hover:bg-[#881337] text-white font-bold text-sm shadow-lg shadow-[#9F1239]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <Heart size={16} />
              <span>Inquire Wedding Dates</span>
            </button>
            <button
              onClick={() => handleOpenBooking("Banquet Hall Tour")}
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <MapPin size={16} />
              <span>View Venue Details</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <Users size={16} className="text-[#FDA4AF]" />, value: "2,500", label: "Guest Capacity" },
              { icon: <MapPin size={16} className="text-[#FCD34D]" />, value: "4", label: "Unique Venues" },
              { icon: <Sparkles size={16} className="text-[#A3E635]" />, value: "9 Acres", label: "Lush Lawns" },
              { icon: <Calendar size={16} className="text-[#F472B6]" />, value: "365", label: "Days Available" },
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

      {/* Venues Showcase */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#881337] bg-[#881337]/10 px-3 py-1.5 rounded-full">
            Our Venues
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1E293B] mt-4 mb-4">
            Lush Lawns &amp; Royal Banquet Halls
          </h2>
          <p className="text-slate-600">
            Whether planning an intimate 50-person gathering or a 2,500-guest grand wedding reception.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VENUES.map((venue, idx) => (
            <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-xl border border-amber-950/5 flex flex-col justify-between">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#320D18]/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {venue.type}
                </div>
              </div>

              <div className="p-8 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#1E293B] mb-2">{venue.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{venue.desc}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#881337]">
                    <Users size={16} />
                    <span>Capacity: {venue.capacity}</span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(`Inquire Venue: ${venue.name}`)}
                    className="w-full py-3 rounded-xl bg-[#4A1525] hover:bg-[#320D18] text-white text-xs font-bold transition flex items-center justify-center gap-2"
                  >
                    <span>Check Availability</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
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
