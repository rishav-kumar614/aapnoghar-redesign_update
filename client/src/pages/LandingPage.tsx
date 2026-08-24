import React, { useState } from "react";
import { useRoute, Link, useLocation } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BookingModal } from "@/components/BookingModal";
import { getLandingPageBySlug, DEFAULT_LANDING_PAGES } from "@/lib/cmsStore";
import { trackEvent } from "@/lib/analytics";
import { Sparkles, CheckCircle2, CalendarDays, Phone, MessageCircle, ArrowRight, Tag, ShieldCheck, Star } from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/lp/:slug");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Extract current URL pathname (e.g. /independence-day-package)
  const pathname = typeof window !== "undefined" ? window.location.pathname.replace(/^\//, "") : "";
  const slug = params?.slug || pathname || "independence-day-package";

  const page = getLandingPageBySlug(slug) || DEFAULT_LANDING_PAGES[0];

  const handleClaimOffer = () => {
    trackEvent("book_now_click", { location: "landing_page_hero", slug: page.slug });
    setIsBookingOpen(true);
  };

  const handleWhatsApp = () => {
    trackEvent("whatsapp_click", { location: "landing_page", slug: page.slug });
    window.open(
      `https://wa.me/917666779997?text=${encodeURIComponent(`Hi AapnoGhar, I would like to book the ${page.title} (Code: ${page.offerCode})`)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B] font-sans antialiased flex flex-col justify-between">
      <SEOHead
        title={page.metaTitle || `${page.title} | AapnoGhar Resort`}
        description={page.metaDescription || page.subtitle}
        canonicalPath={`/${page.slug}`}
      />

      <SiteHeader onOpenBooking={() => setIsBookingOpen(true)} />

      <main className="flex-1 pt-24 pb-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Special Offers", href: "/packages-offers" },
            { label: page.title },
          ]}
        />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#0A1E29] text-white py-16 px-4">
          <div className="absolute inset-0 opacity-30">
            <img src={page.heroImage} alt={page.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1E29] via-[#0A1E29]/90 to-transparent" />

          <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#FFA96B]/20 border border-[#FFA96B]/40 px-3 py-1 rounded-full text-[#FFA96B] text-xs font-extrabold uppercase tracking-wider">
                <Sparkles size={14} /> {page.serviceCategory} • Exclusive Campaign
              </div>

              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
                {page.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {page.subtitle}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleClaimOffer}
                  className="px-6 py-3.5 rounded-2xl bg-[#FFA96B] text-[#0A1E29] font-extrabold text-sm hover:bg-[#ff964d] transition shadow-xl flex items-center gap-2"
                >
                  <CalendarDays size={18} /> Claim Offer & Book Now
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition shadow-lg flex items-center gap-2"
                >
                  <MessageCircle size={18} /> WhatsApp Inquiry
                </button>
              </div>
            </div>

            {/* Campaign Offer Highlight Box */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div>
                  <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">Promo Code</div>
                  <div className="text-2xl font-extrabold font-mono text-white">{page.offerCode}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Discount Rate</div>
                  <div className="text-2xl font-extrabold text-amber-400">{page.discountText}</div>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-300 uppercase font-bold tracking-wider mb-1">Package Price</div>
                <div className="text-3xl font-extrabold text-white font-display">{page.priceText}</div>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-200">
                <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-400" /> Instant Confirmation & 100% Refund Guarantee</div>
                <div className="flex items-center gap-2"><Star size={16} className="text-amber-400" /> 4.8/5 Star Rated Resort Experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* Package Inclusions & Details */}
        <section className="max-w-5xl mx-auto px-4 py-12 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-amber-100 shadow-md space-y-6">
            <h2 className="text-2xl font-bold font-serif text-[#0E295B]">Exclusive Package Inclusions</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {page.inclusions.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100/80">
                  <CheckCircle2 size={20} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
              <div className="text-xs text-slate-500">
                ⚡ <em>Limited time offer for upcoming holidays & weekend bookings.</em>
              </div>
              <button
                type="button"
                onClick={handleClaimOffer}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0E295B] text-white text-xs font-bold hover:bg-[#1a448d] transition shadow flex items-center justify-center gap-1.5"
              >
                Reserve Your Spot Now <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultIntent={`${page.title} (Code: ${page.offerCode})`}
      />
    </div>
  );
}
