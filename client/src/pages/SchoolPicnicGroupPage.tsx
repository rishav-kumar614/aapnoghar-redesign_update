import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import {
  GraduationCap,
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Utensils
} from "lucide-react";

export default function SchoolPicnicGroupPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("School Picnic / Group Booking");

  const handleOpenBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FEF3C7]/30 text-[#1E293B] font-sans antialiased">
      <SiteHeader onOpenBooking={handleOpenBooking} />

      {/* Hero */}
      <section className="relative pt-36 pb-24 bg-[#061A33] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-15 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-[#D97706]/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FFA96B]/10 blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061A33]/50 via-[#061A33]/80 to-[#061A33]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B]/70 mb-6">
            <Link href="/" className="hover:text-[#FFA96B] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/50">School Picnic &amp; Group Packages</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#D97706]/40 bg-[#D97706]/10 text-[#FDE68A] text-xs font-bold uppercase tracking-widest">
            <GraduationCap size={14} className="text-[#FFA96B]" />
            Schools · Colleges · Student Day Trips · Group Outings
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            School Picnics &amp;{" "}
            <span className="italic bg-gradient-to-r from-[#FDE68A] via-[#FFA96B] to-[#01A5E1] bg-clip-text text-transparent">
              Group Excursions
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Special discounted packages for educational institutions, colleges, and large group outings with 100% safety, dedicated guides, and wholesome pure vegetarian buffet.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => handleOpenBooking("School Picnic Inquiry")}
              className="px-6 py-3.5 rounded-xl bg-[#F68734] hover:bg-[#d9701e] text-white font-bold text-sm shadow-lg shadow-[#F68734]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <GraduationCap size={18} />
              <span>Inquire School / Group Rates</span>
            </button>
            <button
              onClick={() => handleOpenBooking("Download Group Itinerary")}
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
            >
              <Users size={16} />
              <span>Request Custom Package</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <GraduationCap size={16} className="text-[#FDE68A]" />, value: "1:15", label: "Free Teacher Pass" },
              { icon: <ShieldCheck size={16} className="text-[#A3E635]" />, value: "100%", label: "Zero-Risk Safety" },
              { icon: <Utensils size={16} className="text-[#FFA96B]" />, value: "Pure Veg", label: "Hygienic Buffet" },
              { icon: <Sparkles size={16} className="text-[#01A5E1]" />, value: "9 Acres", label: "Secure Gated Campus" },
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

      {/* Features */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Complimentary Teacher Passes",
              desc: "1 teacher / supervisor pass free for every 15 student tickets purchased."
            },
            {
              title: "Zero-Risk Safety Protocols",
              desc: "Certified lifeguards, first-aid medical station, and closed-circuit security across 9 acres."
            },
            {
              title: "Hygenic Kids Meals",
              desc: "Freshly prepared kid-friendly buffet lunch, snacks, and ice creams."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-md border border-amber-100">
              <h3 className="text-xl font-bold text-[#1E293B] mb-2">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
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
