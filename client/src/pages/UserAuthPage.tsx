import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight,
  CheckCircle2, Star, BedDouble, Waves, Shield,
  LogIn, UserPlus, ChevronLeft, Sparkles, AlertCircle,
} from "lucide-react";

type AuthMode = "login" | "signup";

export default function UserAuthPage() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<AuthMode>("login");

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (mode === "signup" && !name.trim()) errs.name = "Full name is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email address.";
    if (mode === "signup" && (!phone.trim() || phone.replace(/\D/g, "").length !== 10))
      errs.phone = "Enter a valid 10-digit mobile number.";
    if (!password || password.length < 8) errs.password = "Password must be at least 8 characters.";
    if (mode === "signup" && password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Save session to localStorage
      const displayName = mode === "signup" ? name : email.split("@")[0];
      localStorage.setItem("ag_user", JSON.stringify({ name: displayName, email }));
      // Redirect to home
      setLocation("/");
    }, 1400);
  };

  // ─── SUCCESS SCREEN ──────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0E295B] via-[#1a448d] to-[#0E295B] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 max-w-md w-full text-center shadow-2xl">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0E295B] mb-2">
            {mode === "signup" ? "Account Created! 🎉" : "Welcome Back! 👋"}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {mode === "signup"
              ? `Your AapnoGhar guest account for ${email} is ready. Start planning your perfect getaway!`
              : `You're now logged in as ${email}. Explore luxury stays & experiences.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/booking"
              className="px-6 py-3 rounded-xl bg-[#0E295B] text-white font-bold text-sm hover:bg-[#1a448d] transition flex items-center justify-center gap-2"
            >
              <BedDouble size={16} /> Book a Room Now
            </Link>
            <Link
              href="/"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── MAIN AUTH PAGE ──────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col lg:flex-row font-sans antialiased">

      {/* ── Left Panel: Branding & Perks ─────────────────────────────── */}
      <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 bg-[#0E295B] flex-col justify-between p-10 xl:p-14 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#01A5E1]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-[#F68734]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center group">
            <img src="/images/logo.png" alt="AapnoGhar" className="h-9 sm:h-10 w-auto object-contain drop-shadow-md" />
          </Link>
        </div>

        {/* Hero Text */}
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-bold text-white/80 border border-white/10">
            <Sparkles size={13} className="text-[#F68734]" />
            Delhi-NCR's Premier Luxury Destination
          </div>

          <h1 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight">
            Your AapnoGhar<br />
            <span className="text-[#F68734]">Guest Account</span>
          </h1>

          <p className="text-sm text-white/70 leading-relaxed">
            Login or create an account to track your stay bookings, manage enquiries, and get exclusive member-only offers.
          </p>

          {/* Perks */}
          <div className="space-y-3 pt-2">
            {[
              { icon: <BedDouble size={16} />, text: "Track room bookings & check-in status" },
              { icon: <Star size={16} />, text: "Exclusive member-only promo codes" },
              { icon: <Waves size={16} />, text: "Priority Water Park & event reservations" },
              { icon: <Shield size={16} />, text: "Secure & private booking history" },
            ].map((p) => (
              <div key={p.text} className="flex items-center gap-3 text-sm text-white/80">
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#F68734] shrink-0">
                  {p.icon}
                </div>
                <span>{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="relative z-10 grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
          {[
            { val: "67", label: "Luxury Rooms" },
            { val: "21", label: "Water Slides" },
            { val: "9 Acre", label: "Resort Estate" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-extrabold text-white">{s.val}</div>
              <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Panel: Auth Form ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="lg:hidden p-5 flex items-center justify-between bg-white border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="AapnoGhar" className="h-9 w-auto" />
          </Link>
          <Link href="/" className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <ChevronLeft size={14} /> Back
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">

            {/* Tab Switcher */}
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-8">
              <button
                type="button"
                onClick={() => { setMode("login"); setErrors({}); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold transition-all ${
                  mode === "login"
                    ? "bg-white text-[#0E295B] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <LogIn size={15} /> Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode("signup"); setErrors({}); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-extrabold transition-all ${
                  mode === "signup"
                    ? "bg-white text-[#0E295B] shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <UserPlus size={15} /> Create Account
              </button>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0E295B]">
                {mode === "login" ? "Welcome back 👋" : "Create your account ✨"}
              </h2>
              <p className="text-xs text-gray-500 mt-1.5">
                {mode === "login"
                  ? "Sign in to access your AapnoGhar booking dashboard."
                  : "Join thousands of guests enjoying AapnoGhar's luxury experiences."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Full Name — only signup */}
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Name</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                      placeholder="e.g. Aditya Sharma"
                      className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[#0E295B] bg-gray-50 focus:bg-white transition ${errors.name ? "border-red-400" : "border-gray-300"}`}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.name}</p>}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                    placeholder="you@example.com"
                    className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[#0E295B] bg-gray-50 focus:bg-white transition ${errors.email ? "border-red-400" : "border-gray-300"}`}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.email}</p>}
              </div>

              {/* Phone — only signup */}
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">WhatsApp / Mobile Number</label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
                      placeholder="10-digit mobile number"
                      className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[#0E295B] bg-gray-50 focus:bg-white transition ${errors.phone ? "border-red-400" : "border-gray-300"}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.phone}</p>}
                </div>
              )}

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Password</label>
                  {mode === "login" && (
                    <button type="button" className="text-[11px] font-bold text-[#01A5E1] hover:underline">
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                    placeholder={mode === "signup" ? "Min. 8 characters" : "••••••••"}
                    className={`w-full h-11 pl-10 pr-10 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[#0E295B] bg-gray-50 focus:bg-white transition ${errors.password ? "border-red-400" : "border-gray-300"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password — signup only */}
              {mode === "signup" && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: "" })); }}
                      placeholder="Re-enter your password"
                      className={`w-full h-11 pl-10 pr-4 rounded-xl border text-sm font-medium outline-none focus:ring-2 focus:ring-[#0E295B] bg-gray-50 focus:bg-white transition ${errors.confirmPassword ? "border-red-400" : "border-gray-300"}`}
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.confirmPassword}</p>}
                </div>
              )}

              {/* Terms checkbox — signup */}
              {mode === "signup" && (
                <div className="flex items-start gap-2.5 pt-1">
                  <input type="checkbox" required id="terms" className="mt-0.5 accent-[#0E295B]" />
                  <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
                    I agree to AapnoGhar's{" "}
                    <a href="#" className="text-[#01A5E1] font-bold hover:underline">Terms of Service</a> and{" "}
                    <a href="#" className="text-[#01A5E1] font-bold hover:underline">Privacy Policy</a>.
                  </label>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[#0E295B] hover:bg-[#1a448d] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#0E295B]/20 flex items-center justify-center gap-2.5 mt-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    {mode === "login" ? "Signing in..." : "Creating Account..."}
                  </>
                ) : (
                  <>
                    {mode === "login" ? <LogIn size={16} /> : <UserPlus size={16} />}
                    {mode === "login" ? "Sign In to My Account" : "Create Guest Account"}
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <span className="relative bg-[#F4F6F9] px-3 text-[11px] font-bold text-gray-400 uppercase">Or continue as guest</span>
            </div>

            {/* Guest Booking Shortcut */}
            <Link
              href="/booking"
              className="w-full py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <BedDouble size={16} className="text-[#F68734]" /> Book Without Account
            </Link>

            {/* Switch mode text */}
            <p className="text-center text-xs text-gray-500 mt-6">
              {mode === "login" ? (
                <>Don't have an account?{" "}
                  <button type="button" onClick={() => { setMode("signup"); setErrors({}); }} className="font-bold text-[#0E295B] hover:underline">
                    Create one free →
                  </button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button type="button" onClick={() => { setMode("login"); setErrors({}); }} className="font-bold text-[#0E295B] hover:underline">
                    Sign in →
                  </button>
                </>
              )}
            </p>

            {/* Admin Link */}
            <p className="text-center text-[11px] text-gray-400 mt-3">
              AapnoGhar Staff?{" "}
              <Link href="/admin" className="font-bold text-gray-500 hover:text-[#0E295B]">
                Admin CMS Login →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
