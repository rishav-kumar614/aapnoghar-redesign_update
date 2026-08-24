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
            <span className="text-white/50">Packages &amp; Offers</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#01A5E1]/40 bg-[#01A5E1]/10 text-[#89D9F8] text-xs font-bold uppercase tracking-widest">
            <Gift size={13} className="text-[#FFA96B]" />
            Seasonal Deals · Coupon Codes · Direct Booking Discounts
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            Exclusive Packages &amp;{" "}
            <span className="italic bg-gradient-to-r from-[#FFA96B] via-[#F68734] to-[#01A5E1] bg-clip-text text-transparent">
              Seasonal Offers
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Unlock special festival discounts, group coupon codes, and limited-time seasonal getaway deals at AapnoGhar Resort &amp; Water Park.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => handleOpenBooking("Claim Seasonal Offer")}
              className="px-6 py-3.5 rounded-xl bg-[#F68734] hover:bg-[#d9701e] text-white font-bold text-sm shadow-lg shadow-[#F68734]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Tag size={16} />
              <span>Claim Active Coupon</span>
            </button>
            <button
              onClick={() => handleOpenBooking("Inquire Corporate Discount")}
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
            >
              <Sparkles size={16} />
              <span>Explore All Bundles</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <Tag size={16} className="text-[#FFA96B]" />, value: "Up to 30%", label: "Direct Savings" },
              { icon: <Gift size={16} className="text-[#01A5E1]" />, value: "4+", label: "Active Deals" },
              { icon: <Clock size={16} className="text-[#A3E635]" />, value: "Instant", label: "Coupon Activation" },
              { icon: <Sparkles size={16} className="text-[#F472B6]" />, value: "Best Rate", label: "Direct Guarantee" },
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
