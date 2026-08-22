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
      <section className="relative pt-32 pb-20 bg-[#0A1E29] text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>Photo &amp; Video Gallery</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            AapnoGhar Media Gallery
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Explore photos of our 9-acre green estate, water park slides, luxury suites, and wedding banquet lawns.
          </p>

          <div className="flex flex-wrap gap-2">
            {["All", "Rooms", "Water Park", "Dining"].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  filter === cat
                    ? "bg-[#FFA96B] text-[#0A1E29]"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {cat}
              </button>
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
