import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import {
  Briefcase,
  Users,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Monitor,
  Mic,
  Coffee,
  Trophy
} from "lucide-react";

export default function CorporateEventsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Corporate Offsite Inquiry");

  const handleOpenBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans antialiased">
      <SiteHeader onOpenBooking={handleOpenBooking} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#0F172A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center filter blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/90 via-[#0F172A]/95 to-[#0F172A]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#38BDF8] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>Corporate Events</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Corporate Conferences &amp; Team Offsites
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Host high-impact business conferences, leadership summits, and outdoor team-building retreats just 30 minutes from Cyber City, Gurugram.
          </p>

          <button
            onClick={() => handleOpenBooking("Corporate Event Booking")}
            className="px-6 py-3.5 rounded-xl bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F172A] font-bold text-sm shadow-xl flex items-center gap-2 transition"
          >
            <Briefcase size={16} />
            <span>Request Corporate Proposal</span>
          </button>
        </div>
      </section>

      {/* Offerings Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7] bg-[#0284C7]/10 px-3 py-1.5 rounded-full">
            B2B Event Solutions
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F172A] mt-4 mb-4">
            Tailored Facilities for Business Success
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Monitor,
              title: "Modern Conference Halls",
              desc: "AC halls equipped with high-def projectors, audio systems, podiums, and high-speed Wi-Fi."
            },
            {
              icon: Trophy,
              title: "Outdoor Team Building",
              desc: "Adventure rope courses, tug-of-war, archery, and customized team bonding games."
            },
            {
              icon: Coffee,
              title: "Executive Catering",
              desc: "Customizable corporate menu packages: welcome high tea, buffet lunch, and evening cocktails."
            }
          ].map((item, i) => {
            const IconComp = item.icon;
            return (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-md border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center mb-6">
                  <IconComp size={24} />
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
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
