import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import { ChevronRight, MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

export default function ContactUsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <span className="text-white/50">Contact Us</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#01A5E1]/40 bg-[#01A5E1]/10 text-[#89D9F8] text-xs font-bold uppercase tracking-widest">
            <Phone size={13} className="text-[#FFA96B]" />
            24/7 Front Desk · Instant WhatsApp Support · Delhi-Jaipur Expressway
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            Get in Touch{" "}
            <span className="italic bg-gradient-to-r from-[#FFA96B] via-[#F68734] to-[#01A5E1] bg-clip-text text-transparent">
              With Our Team
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Have questions regarding luxury stay packages, water park timings, or grand wedding lawn bookings? Our dedicated resort desk is available 24/7.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="tel:+917666779997"
              className="px-6 py-3.5 rounded-xl bg-[#F68734] hover:bg-[#d9701e] text-white font-bold text-sm shadow-lg shadow-[#F68734]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Phone size={16} />
              <span>Call +91 7666 779 997</span>
            </a>
            <a
              href="https://wa.me/917666779997?text=Hi%20AapnoGhar,%20I%20would%20like%20to%20inquire%20about%20bookings"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
            >
              <MessageCircle size={16} className="text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <Clock size={16} className="text-[#FFA96B]" />, value: "24/7", label: "Front Desk Support" },
              { icon: <MapPin size={16} className="text-[#01A5E1]" />, value: "NH-48", label: "Sector 77, Gurugram" },
              { icon: <Mail size={16} className="text-[#A3E635]" />, value: "< 15 Mins", label: "Email Response" },
              { icon: <Phone size={16} className="text-[#F472B6]" />, value: "Instant", label: "Booking Assistance" },
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

      {/* Contact Content */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info cards */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFA96B]/15 text-[#0A1E29] flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0A1E29] mb-1">Resort Address</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  AapnoGhar Resort, Water Park &amp; Amusement Park,<br />
                  47th Mile Stone, Delhi-Jaipur Expressway (NH-48),<br />
                  Sector 77, Gurugram, Haryana 122004, India.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#01A5E1]/15 text-[#01A5E1] flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0A1E29] mb-1">Helpline Numbers</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Front Desk / Booking: <strong>+91 7666 779 997</strong><br />
                  Water Park Enquiries: <strong>+91 9711 000 000</strong>
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0A1E29] mb-1">Email Addresses</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  General Info: <strong>info@aapnoghar.com</strong><br />
                  Weddings &amp; Events: <strong>events@aapnoghar.com</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
            <h3 className="text-2xl font-serif font-bold text-[#0A1E29] mb-6">Send Us a Direct Message</h3>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                <h4 className="text-lg font-bold text-emerald-800 mb-2">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-600">Our customer relations representative will call or email you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input required type="text" placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0A1E29]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input required type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0A1E29]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message / Inquiry</label>
                  <textarea required rows={4} placeholder="Tell us how we can help you..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0A1E29]" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] font-bold text-xs shadow-md flex items-center justify-center gap-2 transition">
                  <Send size={14} />
                  <span>Submit Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultIntent="General Inquiry" />
    </div>
  );
}
