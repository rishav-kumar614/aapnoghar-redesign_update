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
      <section className="relative pt-32 pb-20 bg-[#0A1E29] text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>Blog &amp; Travel Guides</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            AapnoGhar Stories &amp; Guides
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Insights, travel inspiration, event planning guides, and updates from Delhi-NCR's favorite resort.
          </p>
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
