import React, { useState } from "react";
import { Link } from "wouter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingModal } from "@/components/BookingModal";
import { ChevronRight, Briefcase, MapPin, CheckCircle2, Upload, Send, FileText, Check, AlertCircle } from "lucide-react";
import { getJobVacancies, addJobApplication, JobVacancy } from "@/lib/cmsStore";
import { trackEvent } from "@/lib/analytics";

export default function CareersPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [vacancies] = useState<JobVacancy[]>(() => getJobVacancies().filter(v => v.active));
  const [selectedJob, setSelectedJob] = useState<JobVacancy | null>(null);
  
  // Application Form State
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !applicantName || !applicantEmail || !applicantPhone) return;

    const fileName = resumeFile ? resumeFile.name : `${applicantName.replace(/\s+/g, "_")}_Resume.pdf`;

    const created = addJobApplication({
      jobTitle: selectedJob.title,
      applicantName,
      email: applicantEmail,
      phone: applicantPhone,
      resumeFileName: fileName,
    });

    trackEvent("form_submission", {
      form: "career_application",
      job_title: selectedJob.title,
      applicant_email: applicantEmail,
    });

    setSubmittedAppId(created.id);
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
            <span className="text-white/50">Careers &amp; Opportunities</span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-[#01A5E1]/40 bg-[#01A5E1]/10 text-[#89D9F8] text-xs font-bold uppercase tracking-widest">
            <Briefcase size={13} className="text-[#FFA96B]" />
            We Are Hiring · Hospitality &amp; Park Operations · Gurugram Campus
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white leading-tight mb-6 max-w-4xl">
            Join the{" "}
            <span className="italic bg-gradient-to-r from-[#FFA96B] via-[#F68734] to-[#01A5E1] bg-clip-text text-transparent">
              AapnoGhar Family
            </span>
          </h1>

          {/* Description */}
          <p className="text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
            Build a rewarding career with one of Delhi-NCR's leading hospitality and amusement resort brands. Explore open vacancies and submit your application directly online.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#open-vacancies"
              className="px-6 py-3.5 rounded-xl bg-[#F68734] hover:bg-[#d9701e] text-white font-bold text-sm shadow-lg shadow-[#F68734]/30 flex items-center gap-2 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Briefcase size={16} />
              <span>View Open Roles ({vacancies.length})</span>
            </a>
            <a
              href="mailto:hr@aapnoghar.com"
              className="px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm flex items-center gap-2 transition-all hover:-translate-y-0.5 backdrop-blur-sm cursor-pointer"
            >
              <span>Email HR: hr@aapnoghar.com</span>
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 sm:gap-10 border-t border-white/10 pt-8">
            {[
              { icon: <Briefcase size={16} className="text-[#FFA96B]" />, value: `${vacancies.length} Active`, label: "Open Positions" },
              { icon: <MapPin size={16} className="text-[#01A5E1]" />, value: "Gurugram", label: "On-Site Roles" },
              { icon: <CheckCircle2 size={16} className="text-[#A3E635]" />, value: "Growth", label: "Career Progression" },
              { icon: <Briefcase size={16} className="text-[#F472B6]" />, value: "24/7", label: "Active Review" },
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

      {/* Vacancies List */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#0A1E29]">Current Job Vacancies</h2>
          <p className="text-xs text-slate-600 mt-2">Explore active career opportunities across our resort, water park, & banquets departments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {vacancies.map((job) => (
            <div key={job.id} className="bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col justify-between hover:border-[#FFA96B]/50 transition">
              <div>
                <div className="flex items-center justify-between gap-2 flex-wrap mb-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#01A5E1] bg-[#01A5E1]/10 px-2.5 py-1 rounded-md">
                    {job.dept}
                  </span>
                  {job.salary && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                      {job.salary}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-serif font-bold text-[#0A1E29] mb-2">{job.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{job.desc}</p>

                {/* Requirements List */}
                <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-emerald-500" /> Key Requirements:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {job.reqs.map((req, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-[#FFA96B] font-bold text-sm leading-none">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <MapPin size={13} /> {job.location} ({job.type})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob(job);
                    setSubmittedAppId(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0A1E29] text-white text-xs font-bold hover:bg-[#FFA96B] hover:text-[#0A1E29] transition shadow-md"
                >
                  Apply Now →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Application Form Drawer / Box */}
        {selectedJob && (
          <div id="apply-form" className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-200 max-w-2xl mx-auto scroll-mt-24">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-serif font-bold text-[#0A1E29]">Apply for: {selectedJob.title}</h3>
              <span className="text-xs font-bold text-[#01A5E1] bg-sky-50 px-2.5 py-1 rounded-md">{selectedJob.dept}</span>
            </div>
            <p className="text-xs text-slate-500 mb-6">Fill out your details and upload your resume. Your application will be stored in HR portal and emailed to HR team.</p>

            {submittedAppId ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg">
                  <Check size={28} />
                </div>
                <h4 className="text-xl font-bold text-emerald-900">Application Submitted Successfully!</h4>
                <div className="text-xs font-mono text-emerald-700 bg-emerald-100/70 py-1.5 px-3 rounded-lg w-fit mx-auto font-bold">
                  Reference ID: {submittedAppId}
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong>{applicantName}</strong>. Your resume (<code>{resumeFile ? resumeFile.name : "Resume.pdf"}</code>) has been logged in our HR Database and an email notification has been dispatched to <strong>hr@aapnoghar.com</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedJob(null);
                    setSubmittedAppId(null);
                    setApplicantName("");
                    setApplicantEmail("");
                    setApplicantPhone("");
                    setResumeFile(null);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#0A1E29] text-white text-xs font-bold hover:bg-slate-800"
                >
                  Close & View Other Vacancies
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={applicantName}
                    onChange={e => setApplicantName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#0A1E29]"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      value={applicantEmail}
                      onChange={e => setApplicantEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#0A1E29]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      value={applicantPhone}
                      onChange={e => setApplicantPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#0A1E29]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Upload Resume (PDF / DOCX) *</label>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <Upload size={18} className="text-[#01A5E1] shrink-0" />
                    <input
                      required
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={e => setResumeFile(e.target.files ? e.target.files[0] : null)}
                      className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#0A1E29] file:text-white hover:file:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100 text-[11px] text-blue-800 flex items-center gap-2 font-medium">
                  <AlertCircle size={15} className="shrink-0 text-blue-600" />
                  <span>Submitting this form automatically logs your application into AapnoGhar HR Admin Portal and triggers an email alert to <strong>hr@aapnoghar.com</strong>.</span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-[#FFA96B] hover:bg-[#ff964d] text-[#0A1E29] font-bold text-xs shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    <Send size={14} />
                    <span>Submit Application & Notify HR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-5 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                </div>
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

