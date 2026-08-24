import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import {
  Utensils,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Coffee,
  CheckCircle2
} from "lucide-react";

const MENU_HIGHLIGHTS = [
  { category: "Haryanvi & Rajasthani Delicacies", items: "Bajre Ki Roti, Desi Ghee, Sarson Ka Saag, Churma, Kadi Pakoda" },
  { category: "North Indian Fine Dining", items: "Paneer Butter Masala, Dal Makhani, Shahi Paneer, Butter Naan" },
  { category: "High-Tea & Snacks Corner", items: "Jhul Jhul Kar Khao Live Stalls, Golgappe, Tikki, Pakode, Chai" },
  { category: "Dessert & Sweet Counter", items: "Gulab Jamun, Halwa, Ice Creams, Kheer" }
];

export default function AbhipritiRestaurantPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Table Reservation - Abhipriti Restaurant");

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
        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] rounded-full bg-[#B45309]/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-[#F68734]/10 blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061A33]/50 via-[#061A33]/80 to-[#061A33]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B]/70 mb-6">
            <Link href="/" className="hover:text-[#FFA96B] transition-colors">Home</Link>
            <ChevronRight size={12} />
            <span className="text-white/50">Abhipriti Restaurant</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#F68734]/40 bg-[#F68734]/10 text-[#FFA96B] text-xs font-bold uppercase tracking-widest">
            <Utensils size={13} className="text-[#FDE68A]" />
            100% Pure Vegetarian · Desi Ghee · Royal Thalis &amp; Buffets
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            Abhipriti{" "}
            <span className="italic bg-gradient-to-r from-[#FDE68A] via-[#FFA96B] to-[#01A5E1] bg-clip-text text-transparent">
              Multi-Cuisine Dining
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Experience authentic North Indian flavors, royal Haryanvi Thalis, and opulent buffet dining prepared with pure desi ghee and fresh farm ingredients on NH-8 Gurugram.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <button
              onClick={() => handleOpenBooking("Abhipriti Dining Reservation")}
              className="px-6 py-3.5 rounded-xl bg-[#F68734] hover:bg-[#d9701e] text-white font-bold text-sm shadow-lg shadow-[#F68734]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Utensils size={18} />
              <span>Reserve Table / Inquire Buffet</span>
            </button>
            <button
              onClick={() => handleOpenBooking("Buffet Menu & Rates")}
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
            >
              <Coffee size={16} />
              <span>View Buffet Menu</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <Utensils size={16} className="text-[#FFA96B]" />, value: "100%", label: "Pure Vegetarian" },
              { icon: <Clock size={16} className="text-[#FDE68A]" />, value: "7:30 AM – 10:30 PM", label: "Open Daily" },
              { icon: <Sparkles size={16} className="text-[#A3E635]" />, value: "Desi Ghee", label: "Traditional Recipe" },
              { icon: <Coffee size={16} className="text-[#01A5E1]" />, value: "300+ Seats", label: "Grand Dining Hall" },
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

      {/* Menu Categories */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#78350F] bg-[#78350F]/10 px-3 py-1.5 rounded-full">
            Culinary Delights
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1E293B] mt-4 mb-4">
            Flavors That Feel Like Home
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MENU_HIGHLIGHTS.map((menu, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-md border border-amber-900/10">
              <span className="text-xs font-bold text-[#78350F] uppercase tracking-wider">
                {menu.category}
              </span>
              <p className="text-sm font-semibold text-slate-700 mt-2">{menu.items}</p>
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
