import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import {
  Gift,
  Tag,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Clock,
  CheckCircle2
} from "lucide-react";

const OFFERS = [
  {
    title: "Independence Day Special Package",
    code: "FREEDOM25",
    discount: "Flat 25% Off",
    desc: "All-inclusive Daycation & Stay packages with Water Park access & Independence Day Gala buffet.",
    validity: "Valid for August Bookings"
  },
  {
    title: "New Year Celebration Blast",
    code: "NYE2026",
    discount: "Earlybird 30% Off",
    desc: "Overnight room stay + Live Musical Night + Unlimited drinks & dinner buffet + Morning breakfast.",
    validity: "Limited Slots Available"
  },
  {
    title: "Holi Color Splash Carnival",
    code: "HOLISPLASH",
    discount: "Special Group Rate",
    desc: "Organic Gulal color party + Rain dance stage + Live dhol + Unlimited thandai & snacks.",
    validity: "Seasonal Event Offer"
  },
  {
    title: "Weekend Family Getaway",
    code: "WEEKEND15",
    discount: "15% Off Stay",
    desc: "Book any Deluxe or Luxury Room on weekends and get complimentary Water Park passes for kids.",
    validity: "Valid Friday through Sunday"
  }
];

export default function PackagesOffersPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Claim Offer / Discount Code");

  const handleOpenBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans antialiased">
      <SiteHeader onOpenBooking={handleOpenBooking} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#0A1E29] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center filter blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E29]/90 via-[#0A1E29]/95 to-[#0A1E29]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>Packages &amp; Offers</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Exclusive Packages &amp; Seasonal Offers
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Unlock special festival discounts, corporate coupon codes, and seasonal getaway deals at AapnoGhar Resort &amp; Water Park.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS.map((off, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-xl border border-amber-950/10 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-[#FFA96B]/15 text-[#0A1E29] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Tag size={12} /> {off.discount}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} /> {off.validity}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#0A1E29] mb-2">{off.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{off.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="bg-slate-100 px-3 py-1.5 rounded-lg border border-dashed border-slate-300 text-xs font-mono font-bold text-[#0A1E29]">
                  CODE: {off.code}
                </div>
                <button
                  onClick={() => handleOpenBooking(`Avail Offer: ${off.code}`)}
                  className="px-5 py-2.5 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] text-xs font-bold shadow-md flex items-center gap-1.5 transition"
                >
                  <span>Apply Offer</span>
                  <ArrowRight size={14} />
                </button>
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
