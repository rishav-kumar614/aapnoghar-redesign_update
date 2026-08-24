import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import { ChevronRight, Image as ImageIcon, Sparkles } from "lucide-react";

const GALLERY_ITEMS = [
  { category: "Rooms", title: "Deluxe King Suite Bedroom", src: "/images/deluxe-room-Room.jpg" },
  { category: "Rooms", title: "Luxury Room Window & Garden View", src: "/images/deluxe-room-room-home-right.jpg" },
  { category: "Rooms", title: "Executive Suite Living Area", src: "/images/suite-room-Room.jpg" },
  { category: "Rooms", title: "Presidential Suite Bedroom", src: "/images/presidential-suite-room-1-Room.jpg" },
  { category: "Water Park", title: "Thrill Water Slides & Wave Pool", src: "/images/hero-bg.jpg" },
  { category: "Dining", title: "Abhipriti Multi-Cuisine Buffet", src: "/images/deluxe-room-room-home-left.jpg" }
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const filteredItems = filter === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === filter);

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
            <span className="text-white/50">Photo &amp; Video Gallery</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#01A5E1]/40 bg-[#01A5E1]/10 text-[#89D9F8] text-xs font-bold uppercase tracking-widest">
            <ImageIcon size={13} className="text-[#FFA96B]" />
            High-Res Photography · 9-Acre Tour · Real Guest Moments
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            AapnoGhar{" "}
            <span className="italic bg-gradient-to-r from-[#FFA96B] via-[#F68734] to-[#01A5E1] bg-clip-text text-transparent">
              Media Gallery
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Explore authentic photos and visuals of our 9-acre green estate, water park slides, luxury suites, and royal wedding banquet lawns.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap gap-2.5 mb-12">
            {["All", "Rooms", "Water Park", "Dining"].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  filter === cat
                    ? "bg-[#F68734] text-white shadow-lg shadow-[#F68734]/30 scale-105"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white backdrop-blur-sm border border-white/10"
                }`}
              >
                {cat === "All" ? "✨ All Visuals" : cat === "Rooms" ? "🏨 Rooms & Suites" : cat === "Water Park" ? "🌊 Water Park" : "🍽️ Dining & Buffets"}
              </button>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <ImageIcon size={16} className="text-[#FFA96B]" />, value: "50+ HD", label: "Estate Photos" },
              { icon: <Sparkles size={16} className="text-[#01A5E1]" />, value: "4K Video", label: "Drone Walkthroughs" },
              { icon: <ImageIcon size={16} className="text-[#A3E635]" />, value: "4 Categories", label: "Complete Coverage" },
              { icon: <ImageIcon size={16} className="text-[#F472B6]" />, value: "100%", label: "Real Unfiltered Views" },
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

      {/* Gallery Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, i) => (
            <div key={i} className="group relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-slate-900">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase font-bold text-[#FFA96B]">{item.category}</span>
                <h3 className="text-base font-serif font-bold mt-0.5">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SiteFooter />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultIntent="General Inquiry" />
    </div>
  );
}
