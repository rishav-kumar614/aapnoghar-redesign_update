import React from "react";
import { Link, useLocation } from "wouter";
import { AlertCircle, Home, Waves, BedDouble, Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-[#0A1E29] text-white font-sans antialiased flex flex-col justify-between">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center p-6 pt-32 pb-16">
        <div className="max-w-xl w-full bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 text-center backdrop-blur-md shadow-2xl space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[#FFA96B]/10 border border-[#FFA96B]/20 text-[#FFA96B] flex items-center justify-center mx-auto shadow-lg">
            <AlertCircle size={40} />
          </div>

          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#FFA96B] uppercase bg-[#FFA96B]/10 px-3 py-1 rounded-md">
              404 Page Not Found
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-3">
              Lost in the Resort?
            </h1>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">
              The page or resource you requested cannot be found. It may have been moved, renamed, or is temporarily unavailable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setLocation("/")}
              className="py-3 px-4 rounded-xl bg-[#FFA96B] text-[#0A1E29] font-bold text-xs hover:bg-[#ff964d] flex items-center justify-center gap-1.5 shadow"
            >
              <Home size={14} /> Back to Home
            </button>
            <button
              type="button"
              onClick={() => setLocation("/water-park")}
              className="py-3 px-4 rounded-xl bg-sky-500/20 text-sky-200 border border-sky-400/30 font-bold text-xs hover:bg-sky-500/30 flex items-center justify-center gap-1.5"
            >
              <Waves size={14} /> Water Park
            </button>
            <button
              type="button"
              onClick={() => setLocation("/rooms")}
              className="py-3 px-4 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-400/30 font-bold text-xs hover:bg-amber-500/30 flex items-center justify-center gap-1.5"
            >
              <BedDouble size={14} /> Resort Rooms
            </button>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

