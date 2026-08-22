import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Clock,
  Utensils,
  Waves,
  Ticket,
  Calendar,
  Gift,
  ChevronRight
} from "lucide-react";

const PACKAGES = [
  {
    id: "overnight-family-staycation",
    title: "Overnight All-Inclusive Staycation",
    tagline: "Room + Water Park + Amusement Park + All Meals Included",
    duration: "1 Night / 2 Days",
    idealFor: "Families & Couples",
    popular: true,
    price: "₹7,999",
    originalPrice: "₹10,500",
    inclusions: [
      "Luxury Accommodations for 2 Adults & 1 Child",
      "Welcome Drinks upon Arrival",
      "Full Day Access to Water Park (21+ Water Slides & Wave Pool)",
      "Unlimited Access to Amusement Park & 20+ Joyrides",
      "Buffet Lunch, High-Tea Snacks & Gala Dinner",
      "Complimentary Buffet Breakfast on Day 2",
      "Late Check-Out Option (Subject to Availability)"
    ]
  },
  {
    id: "daycation-fun-package",
    title: "Daycation Resort Pass",
    tagline: "Day Room Access + Water & Amusement Parks + Lunch & High Tea",
    duration: "Same Day (10:00 AM – 7:00 PM)",
    idealFor: "Day Outings & Weekend Escapes",
    popular: false,
    price: "₹4,499",
    originalPrice: "₹6,000",
    inclusions: [
      "Day-use Deluxe Room (10 AM to 7 PM)",
      "Full Day Water Park Entry Passes",
      "Unlimited Amusement Park Joyrides & Activity Park",
      "Sumptuous Buffet Lunch at Abhipriti Restaurant",
      "Evening High-Tea with Live Food Stalls",
      "Free Parking & Wi-Fi Access"
    ]
  },
  {
    id: "romantic-getaway-package",
    title: "Romantic Couples Escape",
    tagline: "Suite Room + Candlelight Dinner + Park Passes + Special Decor",
    duration: "1 Night / 2 Days",
    idealFor: "Couples & Anniversaries",
    popular: false,
    price: "₹9,499",
    originalPrice: "₹12,500",
    inclusions: [
      "Stay in Executive Suite / Presidential Suite",
      "Special Romantic Room Decoration with Floral Setup",
      "Private 4-Course Candlelight Dinner under the Stars",
      "Water Park & Amusement Park VIP Express Passes",
      "Complementary Fruit Basket & Sparkling Beverage",
      "In-Room Breakfast Service"
    ]
  }
];

export default function StayPackagesPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Stay Package Reservation");

  const handleOpenBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans antialiased">
      <SiteHeader onOpenBooking={handleOpenBooking} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#0B2545] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center filter blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B2545]/80 via-[#0B2545]/90 to-[#0B2545]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>Stay Packages</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            All-Inclusive Stay Packages
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Combine resort stay accommodations with unlimited Water Park slides, Joyrides, and lavish buffets in one seamless package.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleOpenBooking("Inquire Stay Packages")}
              className="px-6 py-3.5 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] font-bold text-sm shadow-lg flex items-center gap-2 transition"
            >
              <Gift size={16} />
              <span>Explore Offers &amp; Discounts</span>
            </button>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#01A5E1] bg-[#01A5E1]/10 px-3 py-1.5 rounded-full">
            Best Value Bundles
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0A1E29] mt-4 mb-4">
            Unbeatable Package Bundles
          </h2>
          <p className="text-slate-600">
            Enjoy full access to all resort facilities without worrying about separate ticket costs or meal charges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-3xl p-8 shadow-xl border flex flex-col justify-between transition-all hover:-translate-y-1 ${
                pkg.popular
                  ? "border-[#FFA96B] ring-2 ring-[#FFA96B]/20"
                  : "border-slate-100"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFA96B] text-[#0A1E29] text-xs font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>MOST POPULAR</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-[#01A5E1]" /> {pkg.duration}
                  </span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-full text-slate-700 font-medium">
                    {pkg.idealFor}
                  </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#0A1E29] mb-2">
                  {pkg.title}
                </h3>
                <p className="text-xs text-slate-500 mb-6">{pkg.tagline}</p>

                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15 mb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-2">
                      {pkg.originalPrice}
                    </span>
                    <span className="text-3xl font-bold text-[#0A1E29]">{pkg.price}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Save 25%
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Package Inclusions:
                  </div>
                  {pkg.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleOpenBooking(`Book ${pkg.title}`)}
                className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2 ${
                  pkg.popular
                    ? "bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29]"
                    : "bg-[#0A1E29] hover:bg-[#122e3e] text-white"
                }`}
              >
                <span>Book Package Now</span>
                <ArrowRight size={16} />
              </button>
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
