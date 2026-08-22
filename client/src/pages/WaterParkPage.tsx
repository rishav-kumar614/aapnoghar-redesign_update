import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import {
  Waves,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Ticket,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Info,
  Droplets,
  Sun
} from "lucide-react";

const WATER_SLIDES = [
  { title: "Turbo Tunnel Slide", desc: "High-speed enclosed body slide dropping into splash zone." },
  { title: "Giant Family Wave Pool", desc: "Huge simulated ocean waves suitable for all ages." },
  { title: "Rain Dance Stage", desc: "Live DJ music stage with overhead mist showers." },
  { title: "Lazy River Float", desc: "Gentle winding stream around lush tropical trees." },
  { title: "Multi-Lane Racer Slide", desc: "4-person side-by-side mat racing slide." },
  { title: "Kids Water Play Fortress", desc: "Shallow water play zone with tipping buckets & mini slides." }
];

export default function WaterParkPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Water Park Ticket Booking");

  const handleOpenBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] text-[#0F172A] font-sans antialiased">
      <SiteHeader onOpenBooking={handleOpenBooking} />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-[#0284C7] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center filter blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0369A1]/90 via-[#0284C7]/90 to-[#0284C7]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7DD3FC] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>Water Park</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Thrilling Water Park &amp; Wave Pool
          </h1>
          <p className="text-lg md:text-xl text-sky-100 max-w-3xl leading-relaxed mb-8">
            Beat the heat with 21+ exhilarating water slides, giant wave pool, rain dance floor with live DJ music, and shallow kids splash zones.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">21+</div>
              <div className="text-xs text-sky-100">Water Slides</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">10:30 AM</div>
              <div className="text-xs text-sky-100">Park Opening</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">100%</div>
              <div className="text-xs text-sky-100">Filtered Water</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">Certified</div>
              <div className="text-xs text-sky-100">Lifeguard Supervision</div>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions Grid */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7] bg-[#0284C7]/10 px-3 py-1.5 rounded-full">
            Water Park Rides
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0F172A] mt-4 mb-4">
            Featured Water Attractions
          </h2>
          <p className="text-slate-600">
            From high-adrenaline drops to relaxing lazy rivers, we have attractions tailored for toddlers, teens, and adults alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WATER_SLIDES.map((slide, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-md border border-sky-100 hover:shadow-lg transition">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284C7] flex items-center justify-center mb-4">
                <Waves size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">{slide.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{slide.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing & Guidelines Section */}
      <section className="bg-white py-16 border-y border-sky-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                Ticket Pricing &amp; Entry
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#0F172A]">
                Water Park Entry Passes
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tickets include entry to both the Water Park and Amusement Park joyrides along with complimentary buffet lunch and snacks!
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[#0F172A]">Adult Pass (Above 4 ft)</div>
                    <div className="text-xs text-slate-500">Includes Water Park + Rides + Buffet Lunch</div>
                  </div>
                  <div className="text-xl font-bold text-[#0284C7]">₹1,199 / person</div>
                </div>

                <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-[#0F172A]">Kids Pass (3 ft to 4 ft)</div>
                    <div className="text-xs text-slate-500">Includes Water Park + Rides + Buffet Lunch</div>
                  </div>
                  <div className="text-xl font-bold text-[#0284C7]">₹799 / child</div>
                </div>
              </div>

              <button
                onClick={() => handleOpenBooking("Water Park Tickets")}
                className="w-full py-3.5 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] font-bold text-sm shadow-md flex items-center justify-center gap-2 transition"
              >
                <Ticket size={18} />
                <span>Book Water Park Tickets Online</span>
              </button>
            </div>

            <div className="bg-[#F8FAFC] p-8 rounded-3xl border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
                <Info className="text-[#0284C7]" size={20} />
                <span>Important Visitor Guidelines</span>
              </h3>

              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Synthetic / Lycra / Nylon costumes are mandatory on all water slides. Costumes available on rental/sale inside park.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Locker facilities and costume changing rooms with hot showers available.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Outside food and beverages strictly prohibited inside the park premises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span>Water Park operating hours: 10:30 AM to 6:30 PM daily.</span>
                </li>
              </ul>
            </div>
          </div>
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
