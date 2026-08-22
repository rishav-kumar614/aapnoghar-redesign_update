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
      <section className="relative pt-32 pb-20 bg-[#0A1E29] text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>Frequently Asked Questions</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Find answers to common questions about ticket inclusions, resort stay policies, costume rules, and park timings.
          </p>
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
