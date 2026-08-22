import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import { ChevronRight, Briefcase, MapPin, CheckCircle2, Upload, Send } from "lucide-react";

const JOBS = [
  {
    title: "Front Desk Operations Executive",
    dept: "Front Office & Hospitality",
    location: "Gurugram, HR",
    type: "Full-Time",
    desc: "Manage guest check-ins, room allocations, and concierge services for resort stays."
  },
  {
    title: "Senior Banquet Event Manager",
    dept: "Events & Weddings",
    location: "Gurugram, HR",
    type: "Full-Time",
    desc: "Oversee banquet hall bookings, client meetings, catering coordination, and event execution."
  },
  {
    title: "Certified Water Park Lifeguard",
    dept: "Park Safety Operations",
    location: "Gurugram, HR",
    type: "Full-Time",
    desc: "Supervise water slides, wave pool safety, and enforce guest safety protocols."
  }
];

export default function CareersPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleApply = (e: React.FormEvent) => {
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
            <span>Careers / Job Opportunities</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white mb-6">
            Join the AapnoGhar Family
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed mb-8">
            Build your career with one of Delhi-NCR's leading hospitality and amusement resort brands.
          </p>
        </div>
      </section>

      {/* Vacancies */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#0A1E29]">Current Job Vacancies</h2>
          <p className="text-xs text-slate-600 mt-2">Explore active career opportunities across our resort departments.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {JOBS.map((job, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#01A5E1] bg-[#01A5E1]/10 px-2.5 py-1 rounded-md">
                  {job.dept}
                </span>
                <h3 className="text-xl font-serif font-bold text-[#0A1E29] mt-3 mb-2">{job.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{job.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                <button
                  onClick={() => { setSelectedJob(job.title); setSubmitted(false); }}
                  className="px-4 py-2 rounded-xl bg-[#0A1E29] text-white text-xs font-bold hover:bg-[#FFA96B] hover:text-[#0A1E29] transition"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Application Form */}
        {selectedJob && (
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-[#0A1E29] mb-1">Apply for: {selectedJob}</h3>
            <p className="text-xs text-slate-500 mb-6">Fill out the form below to submit your job application to our HR team.</p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl text-center">
                <h4 className="text-lg font-bold text-emerald-800 mb-1">Application Submitted!</h4>
                <p className="text-xs text-emerald-600">Thank you. Our HR department will review your application and resume.</p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <input required type="text" placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0A1E29]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input required type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0A1E29]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input required type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0A1E29]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Resume File (PDF / DOCX)</label>
                  <input required type="file" accept=".pdf,.doc,.docx" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#0A1E29]" />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] font-bold text-xs shadow-md flex items-center justify-center gap-2 transition">
                  <Send size={14} />
                  <span>Submit Application</span>
                </button>
              </form>
            )}
          </div>
        )}
      </section>

      <SiteFooter />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} defaultIntent="General Inquiry" />
    </div>
  );
}
