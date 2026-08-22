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
      <section className="relative pt-32 pb-20 bg-[#78350F] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center filter blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#451A03]/90 via-[#78350F]/90 to-[#78350F]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FDE68A] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>Abhipriti Restaurant</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Abhipriti Multi-Cuisine Restaurant
          </h1>
          <p className="text-lg md:text-xl text-amber-100 max-w-3xl leading-relaxed mb-8">
            Experience authentic North Indian flavors, royal Haryanvi Thalis, and opulent buffet dining prepared with pure desi ghee and fresh ingredients.
          </p>

          <button
            onClick={() => handleOpenBooking("Abhipriti Dining Reservation")}
            className="px-6 py-3.5 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] font-bold text-sm shadow-xl flex items-center gap-2 transition"
          >
            <Utensils size={18} />
            <span>Reserve Table / Inquire Buffet</span>
          </button>
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
