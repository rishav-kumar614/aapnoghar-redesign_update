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
      <section className="relative pt-32 pb-20 bg-[#4A1525] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center filter blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#320D18]/90 via-[#4A1525]/90 to-[#4A1525]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FCD34D] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>Weddings &amp; Banquets</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Destination Weddings &amp; Celebrations
          </h1>
          <p className="text-lg md:text-xl text-amber-100 max-w-3xl leading-relaxed mb-8">
            Create unforgettable memories across 9 acres of manicured lawns, luxurious banquet halls, custom decor, and authentic catering services in Gurugram.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleOpenBooking("Wedding Venue Reservation")}
              className="px-6 py-3.5 rounded-xl bg-[#FCD34D] hover:bg-[#fbbf24] text-[#320D18] font-bold text-sm shadow-xl flex items-center gap-2 transition"
            >
              <Heart size={16} className="text-[#320D18]" />
              <span>Inquire Wedding Dates</span>
            </button>
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
