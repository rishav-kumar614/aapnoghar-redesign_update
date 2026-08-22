import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import {
  BedDouble,
  Users,
  Maximize2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Wifi,
  Coffee,
  Tv,
  Bath,
  Wind,
  Compass,
  Star,
  ChevronRight
} from "lucide-react";

const ROOM_CATEGORIES = [
  {
    id: "deluxe-room",
    title: "Deluxe Room",
    tagline: "Cozy Elegance for Short Stays & Weekend Getaways",
    size: "200 sq. ft.",
    capacity: "2 Adults + 1 Child",
    bed: "King Bed",
    image: "/images/deluxe-room-Room.jpg",
    price: "₹3,999",
    unit: "/ night",
    link: "/deluxe-room",
    features: [
      "Lush Garden Views",
      "Complimentary High-Speed Wi-Fi",
      "Split Air Conditioning",
      "Flat Screen LED TV",
      "Tea/Coffee Maker",
      "24/7 Room Service & Housekeeping"
    ]
  },
  {
    id: "luxury-room",
    title: "Luxury Room",
    tagline: "Spacious Comfort with Glass Partition & Premium Amenities",
    size: "260 sq. ft.",
    capacity: "2 Adults + 2 Children",
    bed: "King Size Plush Bed",
    image: "/images/luxury-room-room-home-left.jpg",
    price: "₹4,999",
    unit: "/ night",
    link: "/luxury-room",
    features: [
      "Modern Glass Partition Bathroom",
      "Work Desk & Reading Nook",
      "Mini Refrigerator & Snack Basket",
      "Pool / Lawn View Balcony Options",
      "Complimentary Breakfast Inclusion",
      "Premium Toiletries & Plush Robes"
    ]
  },
  {
    id: "suite-room",
    title: "Executive Suite Room",
    tagline: "Separate Living Space, Dining Alcove & Resort Views",
    size: "380 sq. ft.",
    capacity: "3 Adults or 2 Adults + 2 Children",
    bed: "King Bed + Sofa Bed",
    image: "/images/suite-room-Room.jpg",
    price: "₹6,999",
    unit: "/ night",
    link: "/suite-room",
    features: [
      "Separate Living Room & Lounge",
      "Dual Smart LED TVs",
      "Private Balcony with Sunbeds",
      "Express Check-In & Welcome Drink",
      "Water Park & Amusement Pass Discount",
      "Bathtub & Rain Shower"
    ]
  },
  {
    id: "presidential-suite",
    title: "Presidential Suite",
    tagline: "The Pinnacle of Opulence, Grand Lounge & Butler Service",
    size: "550 sq. ft.",
    capacity: "4 Guests (Family Friendly)",
    bed: "Super King Bed + Plush Lounger",
    image: "/images/presidential-suite-room-1-Room.jpg",
    price: "₹9,999",
    unit: "/ night",
    link: "/presidential-suite-room-1",
    features: [
      "Master Bedroom + Grand Living Suite",
      "Panoramic 270° Resort View Balcony",
      "Personal Butler Service on Request",
      "Jacuzzi Bath & Designer Toiletries",
      "Complimentary All-Access Water Park Passes",
      "In-suite Dining Setup"
    ]
  }
];

export default function ResortRoomsPage() {
  const [, setLocation] = useLocation();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingIntent, setBookingIntent] = useState("Resort Stay Reservation");

  const handleOpenBooking = (intent: string) => {
    setBookingIntent(intent);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans antialiased">
      <SiteHeader onOpenBooking={handleOpenBooking} />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-[#0A1E29] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-[url('/images/deluxe-room-Room.jpg')] bg-cover bg-center filter blur-xs" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1E29]/80 via-[#0A1E29]/90 to-[#0A1E29]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B] mb-4">
            <Link href="/" className="hover:underline flex items-center gap-1">Home</Link>
            <ChevronRight size={12} />
            <span>Resort Accommodation</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Luxury Stay &amp; Accommodations
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Experience serene hospitality across 42+ lush greenery-surrounded rooms and presidential suites on the Delhi-Jaipur Expressway, Gurugram.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">42+</div>
              <div className="text-xs text-slate-300">Deluxe &amp; Luxury Rooms</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">9 Acres</div>
              <div className="text-xs text-slate-300">Lush Green Estate</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">24/7</div>
              <div className="text-xs text-slate-300">In-Room Dining</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-[#FFA96B]">4.8 ★</div>
              <div className="text-xs text-slate-300">Guest Ratings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Room Showcase */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#01A5E1] bg-[#01A5E1]/10 px-3 py-1.5 rounded-full">
            Choose Your Sanctuary
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0A1E29] mt-4 mb-4">
            Curated Rooms &amp; Suites for Every Stay
          </h2>
          <p className="text-slate-600">
            From intimate couples' getaways to expansive family staycations, discover our meticulously designed room categories.
          </p>
        </div>

        <div className="space-y-12">
          {ROOM_CATEGORIES.map((room, idx) => (
            <div
              key={room.id}
              className={`flex flex-col lg:flex-row gap-8 items-center bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-amber-950/5 hover:border-[#FFA96B]/30 transition-all ${
                idx % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden group aspect-[4/3]">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#0A1E29]/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Sparkles size={12} className="text-[#FFA96B]" />
                  <span>{room.size}</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <span className="text-xs font-semibold text-[#01A5E1] uppercase tracking-wider">
                    {room.tagline}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#0A1E29] mt-1">
                    {room.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-4 py-3 border-y border-slate-100 text-xs font-medium text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-[#FFA96B]" />
                    <span>{room.capacity}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <BedDouble size={14} className="text-[#FFA96B]" />
                    <span>{room.bed}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize2 size={14} className="text-[#FFA96B]" />
                    <span>{room.size}</span>
                  </div>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
                  {room.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-500">Starting from</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#0A1E29]">{room.price}</span>
                      <span className="text-xs text-slate-500">{room.unit}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      href={room.link}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:border-[#0A1E29] hover:bg-slate-50 transition"
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleOpenBooking(`Book ${room.title}`)}
                      className="px-5 py-2.5 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] text-xs font-bold shadow-md hover:shadow-lg transition flex items-center gap-1.5"
                    >
                      <span>Book Stay</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Included Amenities Grid */}
      <section className="bg-[#F4EFE6] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#0A1E29]">
              Standard In-Room Amenities
            </h2>
            <p className="text-xs text-slate-600 mt-2">
              Every stay at AapnoGhar includes our trademark hospitality and modern comforts.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { icon: Wifi, title: "High-Speed Wi-Fi" },
              { icon: Wind, title: "Climate Control AC" },
              { icon: Tv, title: "HD Smart TV" },
              { icon: Coffee, title: "Tea/Coffee Maker" },
              { icon: Bath, title: "Premium Bath Kits" },
              { icon: ShieldCheck, title: "24/7 Security" }
            ].map((item, i) => {
              const IconComp = item.icon;
              return (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#FFA96B]/15 flex items-center justify-center text-[#0A1E29] mb-3">
                    <IconComp size={20} />
                  </div>
                  <span className="text-xs font-semibold text-[#0A1E29]">{item.title}</span>
                </div>
              );
            })}
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
