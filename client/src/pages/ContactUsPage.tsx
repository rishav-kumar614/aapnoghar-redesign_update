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
      <section className="relative pt-32 pb-20 bg-[#0A1E29] text-white overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#FFA96B] mb-4">
            <Link href="/" className="hover:underline">Home</Link>
            <ChevronRight size={12} />
            <span>Contact Us</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Get in Touch With Us
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Have questions regarding stay packages, water park timings, or wedding lawn bookings? Our team is available 24/7.
          </p>
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
