import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import { ChevronRight, HelpCircle, Search, ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What are the opening and closing timings for the Water Park & Amusement Park?",
    a: "The Water Park and Amusement Joyrides open daily at 10:30 AM and close at 6:30 PM. Buffet lunch is served from 1:00 PM to 3:00 PM."
  },
  {
    q: "Are nylon/lycra costumes mandatory for the Water Park?",
    a: "Yes, synthetic/nylon/lycra swimsuits are strictly required for safety and hygiene on all water slides. Costumes are available for rent/purchase inside."
  },
  {
    q: "What is the check-in and check-out time for resort rooms?",
    a: "Standard check-in time is 12:00 PM (Noon) and check-out time is 10:00 AM. Early check-in or late check-out is subject to availability."
  },
  {
    q: "Is outside food or beverages allowed inside the park?",
    a: "Outside food and drinks are strictly not allowed. All ticket packages include unlimited buffet meals or high-tea snacks."
  },
  {
    q: "Is parking available at the resort?",
    a: "Yes, we have free secure parking space for up to 500+ cars and buses inside the resort premises."
  }
];

export default function FaqsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

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
            <span className="text-white/50">Frequently Asked Questions</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#01A5E1]/40 bg-[#01A5E1]/10 text-[#89D9F8] text-xs font-bold uppercase tracking-widest">
            <HelpCircle size={13} className="text-[#FFA96B]" />
            Help Desk · Entry Rules · Costumes · Meal Inclusions
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            Frequently Asked{" "}
            <span className="italic bg-gradient-to-r from-[#FFA96B] via-[#F68734] to-[#01A5E1] bg-clip-text text-transparent">
              Questions &amp; Guide
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Find instant answers to common questions about ticket inclusions, resort stay policies, swimsuit costume rules, and park timings.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="tel:+917666779997"
              className="px-6 py-3.5 rounded-xl bg-[#F68734] hover:bg-[#d9701e] text-white font-bold text-sm shadow-lg shadow-[#F68734]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <HelpCircle size={16} />
              <span>Ask Support Desk</span>
            </a>
            <Link
              href="/contact-us"
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
            >
              <span>View Contact Details →</span>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <HelpCircle size={16} className="text-[#FFA96B]" />, value: "20+ FAQs", label: "Answered Below" },
              { icon: <HelpCircle size={16} className="text-[#01A5E1]" />, value: "10:30 AM", label: "Park Opening" },
              { icon: <HelpCircle size={16} className="text-[#A3E635]" />, value: "Synthetic", label: "Swimwear Rule" },
              { icon: <HelpCircle size={16} className="text-[#F472B6]" />, value: "Free", label: "500+ Car Parking" },
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

      {/* FAQs List */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-6 text-left font-serif font-bold text-lg text-[#0A1E29] flex justify-between items-center gap-4 hover:bg-slate-50 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={18} className={`transition-transform shrink-0 ${isOpen ? "rotate-180 text-[#FFA96B]" : "text-slate-400"}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <SiteFooter />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultIntent="General Inquiry" />
    </div>
  );
}
