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
      <section className="relative pt-32 pb-20 bg-[#D97706] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center filter blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#B45309]/90 via-[#D97706]/90 to-[#D97706]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FDE68A] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>School Picnic &amp; Group Packages</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            School Picnics &amp; Group Excursions
          </h1>
          <p className="text-lg md:text-xl text-amber-100 max-w-3xl leading-relaxed mb-8">
            Special discounted packages for educational institutions, colleges, and large group outings with 100% safety, dedicated guides, and wholesome food.
          </p>

          <button
            onClick={() => handleOpenBooking("School Picnic Inquiry")}
            className="px-6 py-3.5 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] font-bold text-sm shadow-xl flex items-center gap-2 transition"
          >
            <GraduationCap size={18} />
            <span>Inquire School / Group Rates</span>
          </button>
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
