import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import { ChevronRight, Calendar, User, ArrowRight, BookOpen } from "lucide-react";

const BLOG_POSTS = [
  {
    title: "Top 10 Reasons Why AapnoGhar is the Best Weekend Getaway Near Delhi NCR",
    category: "Travel Guide",
    date: "August 15, 2026",
    author: "Editorial Team",
    snippet: "Escape the city traffic and discover why families love our 9-acre green sanctuary, 21 water slides, and authentic Haryanvi dining."
  },
  {
    title: "How to Plan a Dream Destination Lawn Wedding in Gurugram",
    category: "Wedding Tips",
    date: "August 10, 2026",
    author: "Wedding Specialist",
    snippet: "From picking Bhanwar Lawn for Sangeet to managing 2,000+ guests on Chander Lawn, here is your complete wedding planning blueprint."
  },
  {
    title: "Water Park Safety Tips for Parents Visiting with Toddlers",
    category: "Resort Tips",
    date: "August 02, 2026",
    author: "Safety Officer",
    snippet: "Important guidelines regarding costume rules, shallow splash zones, lifeguard safety, and lockers."
  }
];

export default function BlogPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
            <span className="text-white/50">Blog &amp; Travel Guides</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#01A5E1]/40 bg-[#01A5E1]/10 text-[#89D9F8] text-xs font-bold uppercase tracking-widest">
            <BookOpen size={13} className="text-[#FFA96B]" />
            Travel Stories · Event Planning · Water Park Guides · Gurugram Tourism
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            AapnoGhar{" "}
            <span className="italic bg-gradient-to-r from-[#FFA96B] via-[#F68734] to-[#01A5E1] bg-clip-text text-transparent">
              Stories &amp; Guides
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Insights, itinerary inspiration, lawn wedding blueprints, and insider updates from Delhi-NCR's premier 9-acre destination.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <Link
              href="/rooms"
              className="px-6 py-3.5 rounded-xl bg-[#F68734] hover:bg-[#d9701e] text-white font-bold text-sm shadow-lg shadow-[#F68734]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar size={16} />
              <span>Explore Stay Packages</span>
            </Link>
            <Link
              href="/water-park"
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
            >
              <span>Water Park Guide →</span>
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <BookOpen size={16} className="text-[#FFA96B]" />, value: "3 Featured", label: "Editorial Guides" },
              { icon: <Calendar size={16} className="text-[#01A5E1]" />, value: "Weekly", label: "New Articles" },
              { icon: <User size={16} className="text-[#A3E635]" />, value: "Verified", label: "Hospitality Experts" },
              { icon: <ArrowRight size={16} className="text-[#F472B6]" />, value: "Free", label: "Travel Tips" },
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

      {/* Posts List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#01A5E1] bg-[#01A5E1]/10 px-2.5 py-1 rounded-md">
                  {post.category}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#0A1E29] mt-3 mb-3 leading-snug">{post.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{post.snippet}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1 text-[#0A1E29] font-bold hover:underline cursor-pointer">Read Article <ArrowRight size={12} /></span>
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
