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
      <section className="relative pt-36 pb-24 bg-[#061A33] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-[#0284C7]/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#38BDF8]/10 blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061A33]/50 via-[#061A33]/80 to-[#061A33]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#38BDF8]/70 mb-6">
            <Link href="/" className="hover:text-[#38BDF8] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/50">Corporate Events</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#0284C7]/40 bg-[#0284C7]/10 text-[#7DD3FC] text-xs font-bold uppercase tracking-widest">
            <Briefcase size={12} className="text-[#FFA96B]" />
            Conferences · Team Offsites · Leadership Retreats
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            Corporate Conferences{" "}
            <span className="italic bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#FFA96B] bg-clip-text text-transparent">
              &amp; Team Offsites
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Host high-impact business conferences, leadership summits, and outdoor team-building retreats just 30 minutes from Cyber City, Gurugram.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => handleOpenBooking("Corporate Event Booking")}
              className="px-6 py-3.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-sm shadow-lg shadow-[#0284C7]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5"
            >
              <Briefcase size={16} />
              <span>Request Corporate Proposal</span>
            </button>
            <button
              onClick={() => handleOpenBooking("Corporate Site Visit")}
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm"
            >
              <Monitor size={16} />
              <span>View Facilities</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <Users size={16} className="text-[#7DD3FC]" />, value: "2,500+", label: "Event Capacity" },
              { icon: <Monitor size={16} className="text-[#FFA96B]" />, value: "4", label: "Conference Halls" },
              { icon: <Coffee size={16} className="text-[#A3E635]" />, value: "30 Mins", label: "From Cyber City" },
              { icon: <Trophy size={16} className="text-[#F472B6]" />, value: "24+", label: "Activities" },
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
