import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  ShieldCheck, Lock, Mail, Key, LogOut, CheckCircle2,
  SlidersHorizontal, BedDouble, Star, Waves, Tag,
  CalendarDays, Image, FileText, HelpCircle, BookOpen,
  UsersRound, Briefcase, Globe, Home, ArrowRightLeft,
  Plus, Trash2, Edit3, Save, RefreshCw, Search, Check,
  AlertCircle, ChevronRight, TrendingUp, DollarSign,
  UserCheck, ExternalLink, Sparkles, Phone, Eye
} from "lucide-react";

// =========================================================================
// TYPES & INITIAL CMS STATE
// =========================================================================
type NavSection =
  | "overview"
  | "rooms"
  | "packages"
  | "tickets"
  | "coupons"
  | "availability"
  | "gallery"
  | "pages"
  | "faqs"
  | "blogs"
  | "leads"
  | "careers"
  | "seo"
  | "analytics"
  | "seasonal"
  | "security"
  | "landing-pages"
  | "homepage"
  | "redirects";

type LeadItem = {
  id: string;
  guestName: string;
  phone: string;
  service: string;
  date: string;
  pax: string;
  status: "New" | "Contacted" | "Confirmed" | "Cancelled";
  amount: number;
  time: string;
};

import {
  getRooms,
  saveRooms,
  getCoupons,
  saveCoupons,
  getTicketPricing,
  saveTicketPricing,
  getJobVacancies,
  saveJobVacancies,
  getJobApplications,
  saveJobApplications,
  resetAllCMSData,
  RoomItem,
  CouponItem,
  TicketPricing,
  JobVacancy,
  JobApplication,
  getSeasonalConfig,
  saveSeasonalConfig,
  SeasonalConfig,
  SeasonalOffer,
  getLandingPages,
  saveLandingPages,
  LandingPageItem
} from "@/lib/cmsStore";
import { getAnalyticsConfig, saveAnalyticsConfig, getTrackedEvents, getStoredUTM } from "@/lib/analytics";

// Initial Mock Leads
const INITIAL_LEADS: LeadItem[] = [
  { id: "L-8492", guestName: "Vikram Malhotra", phone: "+91 98112 34567", service: "Executive Suite (2 Nights)", date: "2026-09-02", pax: "4 Guests", status: "Confirmed", amount: 23998, time: "10 mins ago" },
  { id: "L-8491", guestName: "Pooja Singhania", phone: "+91 97123 45678", service: "Chander Lawn Wedding", date: "2026-11-18", pax: "800 Guests", status: "New", amount: 450000, time: "25 mins ago" },
  { id: "L-8490", guestName: "Karan Johar", phone: "+91 99887 76655", service: "Staycation Premium", date: "2026-08-28", pax: "2 Guests", status: "Contacted", amount: 11999, time: "1 hr ago" },
  { id: "L-8489", guestName: "DPS Vasant Kunj", phone: "+91 98765 43210", service: "School Picnic All-Parks", date: "2026-09-14", pax: "120 Students", status: "Confirmed", amount: 192000, time: "2 hrs ago" },
  { id: "L-8488", guestName: "Aman Gupta (boAt)", phone: "+91 98200 11223", service: "Corporate Offsite Retreat", date: "2026-10-05", pax: "45 Team", status: "New", amount: 135000, time: "3 hrs ago" },
];

export default function AdminPage() {
  const [, setLocation] = useLocation();

  // Authentication State (Mock Session)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Navigation tab in CMS
  const [currentSection, setCurrentSection] = useState<NavSection>("overview");

  // Dynamic CMS Data States backed by localStorage
  const [rooms, setRooms] = useState<RoomItem[]>(() => getRooms());
  const [leads, setLeads] = useState<LeadItem[]>(INITIAL_LEADS);
  const [coupons, setCoupons] = useState<CouponItem[]>(() => getCoupons());
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // New Coupon Form
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponPct, setNewCouponPct] = useState(10);
  const [newCouponExpiry, setNewCouponExpiry] = useState("2026-12-31");

  // Ticket Pricing States backed by localStorage
  const [ticketPricing, setTicketPricing] = useState<TicketPricing>(() => getTicketPricing());

  // SEO & Redirects
  const [metaTitle, setMetaTitle] = useState("AapnoGhar | Luxury Resort, 21-Slide Water Park & Wedding Lawns");
  const [metaDesc, setMetaDesc] = useState("Delhi-NCR's premier 9-acre resort destination with 67 rooms, 21 thrill water slides, wedding lawns and 100% pure vegetarian dining.");
  const [redirects, setRedirects] = useState([
    { from: "/waterpark.html", to: "/water-park", code: "301 Permanent" },
    { from: "/resort-booking", to: "/booking", code: "301 Permanent" },
    { from: "/wedding-lawns-gurgaon", to: "/weddings-banquets", code: "301 Permanent" },
  ]);
  const [newFromUrl, setNewFromUrl] = useState("");
  const [newToUrl, setNewToUrl] = useState("");

  // Availability & Blackout State
  const [blackoutList, setBlackoutList] = useState([
    { id: "bk1", startDate: "2026-11-18", endDate: "2026-11-20", reason: "Singhania Royal Wedding — Full Property Buyout", scope: "All 67 Rooms", type: "Stop-Sell", daysCount: 3 },
    { id: "bk2", startDate: "2026-10-02", endDate: "2026-10-02", reason: "Gandhi Jayanti Gazetted Holiday — Closed for Maintenance", scope: "Full Property", type: "Maintenance", daysCount: 1 },
    { id: "bk3", startDate: "2026-12-31", endDate: "2027-01-01", reason: "New Year Eve Private Corporate Event (Amazon)", scope: "Banquet Lawns Only", type: "Stop-Sell", daysCount: 2 },
  ]);
  const [newBkStart, setNewBkStart] = useState("2026-10-15");
  const [newBkEnd, setNewBkEnd] = useState("2026-10-16");
  const [newBkReason, setNewBkReason] = useState("");
  const [newBkScope, setNewBkScope] = useState("All 67 Rooms");
  const [newBkType, setNewBkType] = useState("Stop-Sell");

  // Gallery State
  const [galleryList, setGalleryList] = useState([
    { id: "1", title: "Mega Wave Pool Carnival", category: "Water Park", image: "/images/hero_water_park.jpg" },
    { id: "2", title: "21 Turbo Slides Arena", category: "Water Park", image: "/images/water-park-slide-1.jpg" },
    { id: "3", title: "Presidential Suite Master Villa", category: "Resort & Suites", image: "/images/presidential-suite-room-1-Room.jpg" },
    { id: "4", title: "Chander Royal Wedding Lawn", category: "Weddings & Banquets", image: "/images/chander-party-lawn.jpg" },
    { id: "5", title: "Carnival Joyrides for Kids", category: "Carnival Joyrides", image: "/images/amusement-park-aapno-ghar.jpg" },
    { id: "6", title: "100% Pure Veg Grand Buffet", category: "Buffet Dining", image: "/images/full-day-picnic-package-1-aapno-ghar.jpg" },
  ]);
  const [newPhotoTitle, setNewPhotoTitle] = useState("");
  const [newPhotoCategory, setNewPhotoCategory] = useState("Water Park");
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const [galleryFilter, setGalleryFilter] = useState("All Albums");

  // Packages State
  const [packageList, setPackageList] = useState([
    { id: "p1", name: "Day Outing Picnic (Without Stay)", price: 2499, tag: "Best Day Visit", desc: "Carnival joyrides, 21 water slides, pure veg buffet lunch & evening hi-tea.", includes: ["21 Water Slides", "20+ Joyrides", "Pure Veg Lunch Buffet", "Hi-Tea & Snacks"], validity: "Valid Daily", bookings: 48, image: "/images/full-day-picnic-package-1-aapno-ghar.jpg", active: true },
    { id: "p2", name: "Staycation Basic (1N / 2D)", price: 6999, tag: "Weekend Starter", desc: "Deluxe room stay with grand buffet breakfast and all water slides entry.", includes: ["Deluxe Room Stay", "Breakfast Buffet", "Water Park Access", "Wi-Fi & Parking"], validity: "Valid Mon–Sun", bookings: 22, image: "/images/room_deluxe.jpg", active: true },
    { id: "p3", name: "Staycation Premium (All Meals)", price: 11999, tag: "All-Inclusive", desc: "Luxury room stay with buffet breakfast, lunch, high-tea snacks and dinner feast.", includes: ["Luxury Room Stay", "All 3-Course Meals", "All 3 Parks Access", "Late Check-out"], validity: "Valid Daily", bookings: 16, image: "/images/room_luxury.jpg", active: true },
    { id: "p4", name: "Romantic Couple Getaway", price: 8999, tag: "Couples Special", desc: "Pool-facing luxury room, candle-light dinner, flower bouquet welcome & high tea.", includes: ["Pool View Room", "Candle-Light Dinner", "Couple Spa Coupon", "Welcome Drinks"], validity: "Valid Fri–Sun", bookings: 11, image: "/images/luxury-room-2-Room.jpg", active: true },
  ]);
  const [newPkgName, setNewPkgName] = useState("");
  const [newPkgPrice, setNewPkgPrice] = useState(4999);
  const [newPkgTag, setNewPkgTag] = useState("Special Deal");
  const [newPkgDesc, setNewPkgDesc] = useState("");
  const [newPkgIncludes, setNewPkgIncludes] = useState("Breakfast Buffet, Water Park Access, Free Wi-Fi");
  const [newPkgValidity, setNewPkgValidity] = useState("Valid Till 31 Oct 2026");

  // FAQs State
  const [faqList, setFaqList] = useState([
    { id: "f1", question: "What are the Water Park opening and closing timings?", answer: "The Water Park & Amusement Park operate daily from 09:30 AM to 07:00 PM.", category: "Water Park" },
    { id: "f2", question: "Is costume mandatory for water slides?", answer: "Yes, synthetic/lycra swimwear is mandatory for safety and hygiene. Costumes are available for rent at the park.", category: "Water Park" },
    { id: "f3", question: "Is food served at AapnoGhar 100% Pure Vegetarian?", answer: "Yes! AapnoGhar strictly serves 100% Pure Vegetarian food with Jain options prepared in separate dedicated kitchens.", category: "Dining & Food" },
    { id: "f4", question: "What is the check-in and check-out time for resort rooms?", answer: "Standard Check-in is at 12:00 PM (Noon) and Check-out is at 10:00 AM.", category: "Room Stay" },
  ]);
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");
  const [newFaqCat, setNewFaqCat] = useState("General");

  // Blogs State
  const [blogList, setBlogList] = useState([
    { id: "b1", title: "Top 7 Reasons Why AapnoGhar is Delhi-NCR's Favorite Family Getaway", category: "Travel Guide", date: "Aug 18, 2026", readTime: "5 min read" },
    { id: "b2", title: "How to Plan a Grand Destination Wedding in Gurgaon on a Budget", category: "Wedding Planning", date: "Aug 12, 2026", readTime: "6 min read" },
    { id: "b3", title: "The Ultimate Guide to 21 Water Slides: Beat the Summer Heat", category: "Water Adventure", date: "Jul 29, 2026", readTime: "4 min read" },
  ]);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogCategory, setNewBlogCategory] = useState("Travel Guide");

  // Careers & Applications State (cmsStore sync)
  const [vacanciesList, setVacanciesList] = useState<JobVacancy[]>(() => getJobVacancies());
  const [applicationsList, setApplicationsList] = useState<JobApplication[]>(() => getJobApplications());

  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobDept, setNewJobDept] = useState("Hospitality & Front Desk");
  const [newJobLoc, setNewJobLoc] = useState("Gurugram, HR");
  const [newJobType, setNewJobType] = useState("Full-Time");
  const [newJobSalary, setNewJobSalary] = useState("₹4.0–6.0 LPA");
  const [newJobDesc, setNewJobDesc] = useState("");
  const [newJobReqs, setNewJobReqs] = useState("2+ years experience in hotel/resort operations\nStrong communication skills in Hindi & English");

  // Analytics & Marketing State
  const [ga4Input, setGa4Input] = useState(() => getAnalyticsConfig().ga4Id);
  const [gtmInput, setGtmInput] = useState(() => getAnalyticsConfig().gtmId);
  const [pixelInput, setPixelInput] = useState(() => getAnalyticsConfig().pixelId);
  const [analyticsEvents] = useState(() => getTrackedEvents());

  // Seasonal & Festival State
  const [seasonal, setSeasonal] = useState<SeasonalConfig>(() => getSeasonalConfig());

  // Security & RBAC State
  const [adminRole, setAdminRole] = useState<"Super Admin" | "Resort Manager" | "Receptionist">("Super Admin");

  // Landing Page Builder State
  const [landingPages, setLandingPages] = useState<LandingPageItem[]>(() => getLandingPages());
  const [showAddLp, setShowAddLp] = useState(false);
  const [newLpSlug, setNewLpSlug] = useState("");
  const [newLpTitle, setNewLpTitle] = useState("");
  const [newLpSubtitle, setNewLpSubtitle] = useState("");
  const [newLpCode, setNewLpCode] = useState("");
  const [newLpDiscount, setNewLpDiscount] = useState("");
  const [newLpPrice, setNewLpPrice] = useState("");
  const [newLpCategory, setNewLpCategory] = useState("Resort & Water Park");
  const [newLpInclusions, setNewLpInclusions] = useState("Unlimited Water Park Access\nPure-Veg Buffet (Breakfast & Lunch)\nLive DJ Dance Party");

  // Leads CRM Filter + Add Lead state
  const [leadFilter, setLeadFilter] = useState("All");
  const [leadSearch, setLeadSearch] = useState("");
  const [showAddLead, setShowAddLead] = useState(false);
  const [newLeadName, setNewLeadName] = useState("");
  const [newLeadPhone, setNewLeadPhone] = useState("");
  const [newLeadService, setNewLeadService] = useState("Room Booking");
  const [newLeadDate, setNewLeadDate] = useState("2026-10-01");
  const [newLeadPax, setNewLeadPax] = useState("2 Guests");
  const [newLeadAmount, setNewLeadAmount] = useState(12000);
  const [newLeadSource, setNewLeadSource] = useState("Walk-In");

  // Homepage Sections State
  const [homepageBlocks, setHomepageBlocks] = useState([
    { id: "hero", name: "Godly Hero Banner (Video & CTA)", enabled: true },
    { id: "heritage", name: "30-Year Heritage Showcase & Stats", enabled: true },
    { id: "jhul-jhul", name: "Jhul Jhul Kar Khao (Unique Dining Feature)", enabled: true },
    { id: "water-park", name: "21 Water Slides & Wave Pool Showcase", enabled: true },
    { id: "rooms-slider", name: "3D Perspective Room Showcase Slider", enabled: true },
    { id: "pricing-matrix", name: "Pricing & Ticket Passes Matrix", enabled: true },
    { id: "estimator", name: "Interactive Budget & Rate Estimator", enabled: true },
    { id: "video-tour", name: "Virtual 4K Video Tour Experience", enabled: true },
  ]);

  const triggerSaveNotification = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.toLowerCase() === "admin@aapnoghar.com" && passwordInput === "aapnoghar@2026") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid credentials. Try using the Quick Demo Login button below.");
    }
  };

  const handleQuickDemoLogin = () => {
    setEmailInput("admin@aapnoghar.com");
    setPasswordInput("aapnoghar@2026");
    setIsAuthenticated(true);
    setAuthError("");
  };

  // =========================================================================
  // 1. ADMIN LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E295B] text-white flex flex-col justify-between relative overflow-hidden font-sans">
        {/* Background ambient lighting */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#01A5E1]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F68734]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top bar */}
        <header className="p-6 sm:p-8 flex items-center justify-between relative z-10 max-w-7xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="AapnoGhar" className="h-10 sm:h-12 w-auto brightness-200" />
            <span className="text-white/80 font-bold text-xs uppercase tracking-widest hidden sm:inline">
              Management Portal
            </span>
          </Link>
          <Link href="/" className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1">
            Back to Public Website <ExternalLink size={12} />
          </Link>
        </header>

        {/* Login Box */}
        <main className="flex-1 flex items-center justify-center p-4 relative z-10">
          <div className="w-full max-w-md bg-white text-[#0E295B] rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#0E295B] text-[#F68734] flex items-center justify-center mx-auto mb-4 shadow-lg">
                <ShieldCheck size={32} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
                AapnoGhar CMS
              </h1>
              <p className="text-xs text-gray-500 mt-1.5">
                Executive Admin & Channel Inventory Console
              </p>
            </div>

            {authError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Admin Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="admin@aapnoghar.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 bg-gray-50 text-xs focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Security Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-300 bg-gray-50 text-xs focus:bg-white focus:ring-2 focus:ring-[#0E295B] outline-none font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#0E295B] hover:bg-[#1a448d] text-white font-extrabold text-sm transition-all shadow-lg shadow-[#0E295B]/20 flex items-center justify-center gap-2 mt-2"
              >
                <Key size={16} /> Enter CMS Dashboard
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
              <span className="relative bg-white px-3 text-[11px] font-bold text-gray-400 uppercase">Or Demo Access</span>
            </div>

            {/* Quick 1-Click Demo Login */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-extrabold text-xs transition flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-[#F68734]" /> 1-Click Quick Demo Login (Evaluator Access)
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-xs text-white/50 relative z-10">
          Protected AapnoGhar Resort & Water Park CMS Engine · TLS 1.3 Encrypted
        </footer>
      </div>
    );
  }

  // =========================================================================
  // 2. MAIN CMS / ADMIN PANEL DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#0E295B] flex flex-col font-sans antialiased">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0E295B] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/20 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-400" /> {saveToast}
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-16 bg-[#0E295B] text-white px-6 sm:px-8 flex items-center justify-between shrink-0 shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <img src="/images/logo.png" alt="AapnoGhar" className="h-9 w-auto brightness-200" />
          <div className="hidden sm:block">
            <span className="text-sm font-extrabold tracking-tight">CMS Admin Panel</span>
            <span className="ml-2 text-[10px] uppercase font-bold bg-[#F68734] text-white px-2 py-0.5 rounded">v2.4 Live</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-xs text-white/90">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Axis Channel 2-Way Sync: <strong>Operational</strong></span>
          </div>

          <Link
            href="/"
            className="text-xs font-bold text-white/80 hover:text-white flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg"
          >
            <Eye size={14} /> View Live Website
          </Link>

          <button
            type="button"
            onClick={() => setIsAuthenticated(false)}
            className="text-xs font-bold text-rose-300 hover:text-rose-100 flex items-center gap-1 bg-rose-500/20 px-3 py-1.5 rounded-lg"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </header>

      {/* Main App Layout: Sidebar + Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white border-r border-gray-200/80 p-4 shrink-0 flex flex-row md:flex-col overflow-x-auto md:overflow-y-auto gap-1">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 px-3 py-2 hidden md:block">
            Modules & Controllers
          </div>

          {[
            { id: "overview", label: "Dashboard Overview", icon: <TrendingUp size={16} /> },
            { id: "rooms", label: "Rooms & Inventory", icon: <BedDouble size={16} /> },
            { id: "packages", label: "Stay Packages", icon: <Star size={16} /> },
            { id: "tickets", label: "Park Tickets & Rates", icon: <Waves size={16} /> },
            { id: "coupons", label: "Offers & Promo Codes", icon: <Tag size={16} /> },
            { id: "availability", label: "Calendar & Blackout", icon: <CalendarDays size={16} /> },
            { id: "leads", label: "Leads & Bookings CRM", icon: <UsersRound size={16} /> },
            { id: "gallery", label: "Gallery & Media", icon: <Image size={16} /> },
            { id: "pages", label: "Page Content CMS", icon: <FileText size={16} /> },
            { id: "faqs", label: "FAQ Manager", icon: <HelpCircle size={16} /> },
            { id: "blogs", label: "Blogs & Articles", icon: <BookOpen size={16} /> },
            { id: "careers", label: "Careers & Jobs", icon: <Briefcase size={16} /> },
            { id: "seo", label: "SEO & Meta Tags", icon: <Globe size={16} /> },
            { id: "analytics", label: "Analytics & Marketing", icon: <SlidersHorizontal size={16} /> },
            { id: "seasonal", label: "Seasonal & Festivals", icon: <Sparkles size={16} /> },
            { id: "security", label: "Security & Backups", icon: <ShieldCheck size={16} /> },
            { id: "landing-pages", label: "Landing Page System", icon: <FileText size={16} /> },
            { id: "homepage", label: "Homepage Sections", icon: <Home size={16} /> },
            { id: "redirects", label: "301 URL Redirects", icon: <ArrowRightLeft size={16} /> },
          ].map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentSection(item.id as NavSection)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left whitespace-nowrap md:whitespace-normal ${
                  isActive
                    ? "bg-[#0E295B] text-white shadow-md shadow-[#0E295B]/15"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className={isActive ? "text-[#F68734]" : "text-gray-500"}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Main Content Panel */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-w-7xl">
          {/* =========================================================================
              SECTION: OVERVIEW
              ========================================================================= */}
          {currentSection === "overview" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Executive Overview</h2>
                  <p className="text-xs text-gray-500">Live operational snapshot of AapnoGhar digital operations.</p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerSaveNotification("System refreshed with Axis Channel PMS")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm"
                >
                  <RefreshCw size={13} /> Sync Live Axis Inventory
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span className="font-bold uppercase tracking-wider">Today's Inquiries</span>
                    <UsersRound size={16} className="text-[#01A5E1]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#0E295B]">34 Leads</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">↑ +18% from last weekend</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span className="font-bold uppercase tracking-wider">Room Occupancy</span>
                    <BedDouble size={16} className="text-purple-600" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#0E295B]">88.5%</div>
                  <div className="text-[11px] text-gray-500 font-medium mt-1">59 / 67 Rooms Booked</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span className="font-bold uppercase tracking-wider">Estimated Revenue</span>
                    <DollarSign size={16} className="text-[#F68734]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#F68734]">₹8.42 Lakh</div>
                  <div className="text-[11px] text-emerald-600 font-bold mt-1">Gross direct web pipelines</div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span className="font-bold uppercase tracking-wider">AxisRooms 2-Way Sync</span>
                    <ShieldCheck size={16} className="text-emerald-500" />
                  </div>
                  <div className="text-3xl font-extrabold text-emerald-600">Active</div>
                  <div className="text-[11px] text-gray-500 font-medium mt-1">Latency: 38ms · No double-books</div>
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="bg-gradient-to-r from-[#0E295B] to-[#1a448d] rounded-2xl p-4 text-white flex flex-wrap items-center justify-between gap-3 shadow-md">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-white/90">Executive Quick Controls:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentSection("rooms")}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition flex items-center gap-1.5 border border-white/10"
                  >
                    <BedDouble size={13} /> Update Room Rates
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentSection("coupons")}
                    className="px-3.5 py-1.5 rounded-xl bg-[#F68734] hover:bg-[#e07525] text-xs font-extrabold text-white transition flex items-center gap-1.5 shadow"
                  >
                    <Tag size={13} /> + Add Promo Coupon
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentSection("tickets")}
                    className="px-3.5 py-1.5 rounded-xl bg-[#01A5E1] hover:bg-[#008ec4] text-xs font-extrabold text-white transition flex items-center gap-1.5 shadow"
                  >
                    <Waves size={13} /> Park Ticket Rates
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerSaveNotification("Emergency Stop-Sell checked: All channels synchronized.")}
                    className="px-3.5 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-rose-200 border border-rose-400/30 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Lock size={13} /> Stop-Sell Status
                  </button>
                </div>
              </div>

              {/* 2-Column Grid: Revenue Breakdown + Live 67-Room Gauge */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Revenue Streams Breakdown */}
                <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-[#0E295B]">Revenue Breakdown by Stream</h3>
                      <p className="text-xs text-gray-500">Gross pipeline distribution across resort verticals.</p>
                    </div>
                    <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      ₹8.42L Total
                    </span>
                  </div>

                  <div className="space-y-3.5 pt-2">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-[#0E295B] flex items-center gap-1.5">
                          <BedDouble size={14} className="text-purple-600" /> Resort Accommodations & Suites (42%)
                        </span>
                        <span className="text-gray-700">₹3,54,000</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600 rounded-full" style={{ width: "42%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-[#0E295B] flex items-center gap-1.5">
                          <Waves size={14} className="text-[#01A5E1]" /> Water Park & Joyride Passes (28%)
                        </span>
                        <span className="text-gray-700">₹2,35,760</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#01A5E1] rounded-full" style={{ width: "28%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-[#0E295B] flex items-center gap-1.5">
                          <Star size={14} className="text-[#F68734]" /> Royal Weddings & MICE Banquets (22%)
                        </span>
                        <span className="text-gray-700">₹1,85,240</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F68734] rounded-full" style={{ width: "22%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-[#0E295B] flex items-center gap-1.5">
                          <Sparkles size={14} className="text-emerald-600" /> Pure Veg Dining & Outings (8%)
                        </span>
                        <span className="text-gray-700">₹67,360</span>
                      </div>
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: "8%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. 67-Room Live Occupancy Gauge & Health */}
                <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-base text-[#0E295B]">67 Resort Rooms Live Occupancy</h3>
                        <p className="text-xs text-gray-500">Real-time room status across physical inventory.</p>
                      </div>
                      <span className="text-xs font-extrabold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
                        88.5% Full
                      </span>
                    </div>

                    {/* Progress Visual */}
                    <div className="mt-4 mb-4">
                      <div className="flex justify-between text-xs font-extrabold text-gray-600 mb-1.5">
                        <span>59 Booked</span>
                        <span className="text-emerald-600">8 Rooms Available</span>
                      </div>
                      <div className="w-full h-3 bg-emerald-100 rounded-full overflow-hidden flex">
                        <div className="h-full bg-[#0E295B]" style={{ width: "88.5%" }} />
                        <div className="h-full bg-emerald-500" style={{ width: "11.5%" }} />
                      </div>
                    </div>

                    {/* Room Category Status Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                        <div className="text-[10px] font-bold text-gray-400 uppercase">Deluxe</div>
                        <div className="text-sm font-extrabold text-[#0E295B]">21 / 24</div>
                        <div className="text-[9px] text-amber-600 font-bold">3 Left</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                        <div className="text-[10px] font-bold text-gray-400 uppercase">Luxury</div>
                        <div className="text-sm font-extrabold text-[#0E295B]">16 / 18</div>
                        <div className="text-[9px] text-amber-600 font-bold">2 Left</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                        <div className="text-[10px] font-bold text-gray-400 uppercase">Exec Suites</div>
                        <div className="text-sm font-extrabold text-[#0E295B]">4 / 5</div>
                        <div className="text-[9px] text-amber-600 font-bold">1 Left</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-center">
                        <div className="text-[10px] font-bold text-gray-400 uppercase">Presidential</div>
                        <div className="text-sm font-extrabold text-[#0E295B]">2 / 2</div>
                        <div className="text-[9px] text-emerald-600 font-bold">100% Full</div>
                      </div>
                    </div>
                  </div>

                  {/* Channel Partner Sync Monitor */}
                  <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sky-900 font-bold">
                      <ShieldCheck size={16} className="text-emerald-500 shrink-0" />
                      <span>OTAs Parity: MMT, Agoda, Booking.com</span>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Zero Discrepancy
                    </span>
                  </div>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-extrabold text-base text-[#0E295B]">Recent Incoming Bookings & Leads</h3>
                    <p className="text-xs text-gray-500">Live inquiries received across Web, WhatsApp and Call channels.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentSection("leads")}
                    className="text-xs font-bold text-[#01A5E1] hover:underline flex items-center gap-1"
                  >
                    View All Leads CRM →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 font-bold uppercase tracking-wider">
                        <th className="pb-3">Ref ID</th>
                        <th className="pb-3">Guest Name</th>
                        <th className="pb-3">Service / Room</th>
                        <th className="pb-3">Event Date</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {leads.slice(0, 4).map((l) => (
                        <tr key={l.id} className="hover:bg-gray-50">
                          <td className="py-3 font-mono font-bold text-gray-500">{l.id}</td>
                          <td className="py-3 font-bold text-[#0E295B]">{l.guestName}</td>
                          <td className="py-3 text-gray-700">{l.service}</td>
                          <td className="py-3 text-gray-500">{l.date}</td>
                          <td className="py-3 font-bold text-[#F68734]">{formatPrice(l.amount)}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${l.status === "Confirmed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                              {l.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: ROOMS & INVENTORY
              ========================================================================= */}
          {currentSection === "rooms" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Rooms & Inventory Controller</h2>
                  <p className="text-xs text-gray-500">Live tariff modification, inventory allocation & Stop-Sell switches.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    saveRooms(rooms);
                    triggerSaveNotification("All room tariffs & inventory saved and synced to website!");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Save All Room Changes
                </button>
              </div>

              {/* Bulk Action Controls */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0E295B]">Inventory Bulk Actions:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = rooms.map((r) => ({ ...r, price: Math.round(r.price * 1.15) }));
                      setRooms(updated);
                      saveRooms(updated);
                      triggerSaveNotification("Applied +15% Weekend Surge across all 7 room types!");
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 text-xs font-bold hover:bg-purple-100 transition flex items-center gap-1.5"
                  >
                    <TrendingUp size={13} /> +15% Weekend Surge
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = rooms.map((r) => ({ ...r, stopSell: true }));
                      setRooms(updated);
                      saveRooms(updated);
                      triggerSaveNotification("Emergency Stop-Sell applied to all rooms!");
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs font-bold hover:bg-red-100 transition flex items-center gap-1.5"
                  >
                    <Lock size={13} /> Stop-Sell All
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = rooms.map((r) => ({ ...r, stopSell: false }));
                      setRooms(updated);
                      saveRooms(updated);
                      triggerSaveNotification("All room inventories activated for direct booking!");
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={13} /> Activate All
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetAllCMSData();
                      setRooms(getRooms());
                      triggerSaveNotification("Inventory reset to Axis PMS Baseline.");
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition flex items-center gap-1.5"
                  >
                    <RefreshCw size={13} /> Reset Baseline
                  </button>
                </div>
              </div>

              {/* Meal Plan & Extra Guest Policies Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">CP Plan (Bed & Breakfast)</div>
                  <div className="text-base font-extrabold text-emerald-600">Included in Base</div>
                  <div className="text-[11px] text-gray-500">Pure Veg morning buffet</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">MAP Plan (Dinner Addon)</div>
                  <div className="text-base font-extrabold text-[#F68734]">+₹1,200 / Guest</div>
                  <div className="text-[11px] text-gray-500">Breakfast + Royal Dinner Buffet</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">AP Plan (All Meals + Parks)</div>
                  <div className="text-base font-extrabold text-purple-600">+₹2,200 / Guest</div>
                  <div className="text-[11px] text-gray-500">Breakfast, Lunch, Dinner + Water Park</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-1">
                  <div className="text-[10px] font-bold text-gray-400 uppercase">Extra Adult Rollaway Bed</div>
                  <div className="text-base font-extrabold text-[#0E295B]">₹1,500 / Night</div>
                  <div className="text-[11px] text-gray-500">Includes breakfast & mattress</div>
                </div>
              </div>

              {/* Main Rooms Inventory Table */}
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[11px]">
                    <tr>
                      <th className="p-4">Room Type</th>
                      <th className="p-4">Weekday Rate (₹)</th>
                      <th className="p-4">Weekend Surge (₹)</th>
                      <th className="p-4">Total Inventory</th>
                      <th className="p-4">Available Units</th>
                      <th className="p-4">Stop Sell Toggle</th>
                      <th className="p-4">Axis Channel Sync</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {rooms.map((room, idx) => {
                      const weekendRate = Math.round(room.price * 1.18);
                      return (
                        <tr key={room.id} className="hover:bg-gray-50/60">
                          <td className="p-4">
                            <div className="font-extrabold text-[#0E295B] text-sm">{room.name}</div>
                            <div className="text-[10px] text-gray-400">PMS Code: {room.id.toUpperCase()}</div>
                          </td>
                          <td className="p-4">
                            <input
                              type="number"
                              value={room.price}
                              onChange={(e) => {
                                const newRooms = [...rooms];
                                newRooms[idx].price = Number(e.target.value);
                                setRooms(newRooms);
                              }}
                              className="w-28 h-9 px-3 rounded-lg border border-gray-300 font-bold text-xs text-[#F68734]"
                            />
                          </td>
                          <td className="p-4">
                            <span className="font-extrabold text-[#0E295B] text-xs bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
                              {formatPrice(weekendRate)}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">{room.unitsTotal} Rooms</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const newRooms = [...rooms];
                                  newRooms[idx].unitsAvailable = Math.max(0, newRooms[idx].unitsAvailable - 1);
                                  setRooms(newRooms);
                                }}
                                className="w-7 h-7 rounded bg-gray-100 text-gray-700 font-bold"
                              >
                                −
                              </button>
                              <span className="font-extrabold w-6 text-center text-sm">{room.unitsAvailable}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const newRooms = [...rooms];
                                  newRooms[idx].unitsAvailable = newRooms[idx].unitsAvailable + 1;
                                  setRooms(newRooms);
                                }}
                                className="w-7 h-7 rounded bg-gray-100 text-gray-700 font-bold"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="p-4">
                            <button
                              type="button"
                              onClick={() => {
                                const newRooms = [...rooms];
                                newRooms[idx].stopSell = !newRooms[idx].stopSell;
                                setRooms(newRooms);
                              }}
                              className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase transition ${room.stopSell ? "bg-red-100 text-red-700 border border-red-200" : "bg-emerald-100 text-emerald-800"}`}
                            >
                              {room.stopSell ? "🛑 Stop Sell" : "🟢 Active"}
                            </button>
                          </td>
                          <td className="p-4">
                            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 size={13} /> 2-Way Synced
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: PARK TICKETS & PRICING
              ========================================================================= */}
          {currentSection === "tickets" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Park Tickets & Pricing Manager</h2>
                  <p className="text-xs text-gray-500">Configure single-park tickets, weekend surge rates, joyride combos, rental amenities & capacity limits.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    saveTicketPricing(ticketPricing);
                    triggerSaveNotification("Park ticket prices & rental tariffs updated and synced to website!");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Update Ticket Rates
                </button>
              </div>

              {/* Park Capacity & Live Footfall Meter */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Today's Footfall</div>
                  <div className="text-2xl font-extrabold text-[#01A5E1] mt-1">1,840 Visitors</div>
                  <div className="text-[11px] text-gray-500 font-medium">73.6% Max Capacity</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Daily Capacity Limit</div>
                  <div className="text-2xl font-extrabold text-[#0E295B] mt-1">2,500 / Day</div>
                  <div className="text-[11px] text-emerald-600 font-bold">Safety compliant</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Operating Timings</div>
                  <div className="text-sm font-extrabold text-purple-700 mt-1">09:30 AM – 07:00 PM</div>
                  <div className="text-[11px] text-gray-500 font-medium">Slides close at 06:00 PM</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Peak Wave Hours</div>
                  <div className="text-sm font-extrabold text-[#F68734] mt-1">01:00 PM &amp; 03:30 PM</div>
                  <div className="text-[11px] text-gray-500 font-medium">Rain Dance DJ Active</div>
                </div>
              </div>

              {/* All 6 Park Passes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="font-extrabold text-sm text-[#0E295B] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Waves size={18} className="text-[#01A5E1]" /> Water Park (Weekday)
                    </span>
                    <span className="text-[10px] uppercase font-extrabold bg-sky-100 text-sky-800 px-2 py-0.5 rounded">Mon–Fri</span>
                  </div>
                  <p className="text-xs text-gray-500">21 turbo water slides, wave pool & mist rain dance arena.</p>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase">Rate per Adult (₹)</label>
                    <input
                      type="number"
                      value={ticketPricing.waterWeekday}
                      onChange={(e) => setTicketPricing({ ...ticketPricing, waterWeekday: Number(e.target.value) })}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-gray-300 font-extrabold text-[#F68734]"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="font-extrabold text-sm text-[#0E295B] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Waves size={18} className="text-[#01A5E1]" /> Water Park (Weekend)
                    </span>
                    <span className="text-[10px] uppercase font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">Sat–Sun</span>
                  </div>
                  <p className="text-xs text-gray-500">Weekend access + Live DJ rain dance party & wave bursts.</p>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase">Rate per Adult (₹)</label>
                    <input
                      type="number"
                      value={ticketPricing.waterWeekend}
                      onChange={(e) => setTicketPricing({ ...ticketPricing, waterWeekend: Number(e.target.value) })}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-gray-300 font-extrabold text-[#F68734]"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="font-extrabold text-sm text-[#0E295B] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Star size={18} className="text-purple-600" /> Twin Park Combo Pass
                    </span>
                    <span className="text-[10px] uppercase font-extrabold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">Best Value</span>
                  </div>
                  <p className="text-xs text-gray-500">Water Park 21 slides + Amusement Park 20+ carnival joyrides.</p>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase">Combo Rate (₹)</label>
                    <input
                      type="number"
                      value={ticketPricing.comboTwin}
                      onChange={(e) => setTicketPricing({ ...ticketPricing, comboTwin: Number(e.target.value) })}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-gray-300 font-extrabold text-[#F68734]"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="font-extrabold text-sm text-[#0E295B] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Sparkles size={18} className="text-emerald-600" /> Amusement Rides Only
                    </span>
                    <span className="text-[10px] uppercase font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Carnival</span>
                  </div>
                  <p className="text-xs text-gray-500">20+ dry joyrides (Roller Coaster, Columbus, Flying Bobs, etc.).</p>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase">Pass Rate (₹)</label>
                    <input
                      type="number"
                      value={ticketPricing.amusement}
                      onChange={(e) => setTicketPricing({ ...ticketPricing, amusement: Number(e.target.value) })}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-gray-300 font-extrabold text-[#F68734]"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="font-extrabold text-sm text-[#0E295B] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-[#F68734]" /> 24 Adventure Rope Courses
                    </span>
                    <span className="text-[10px] uppercase font-extrabold bg-orange-100 text-orange-800 px-2 py-0.5 rounded">Thrill</span>
                  </div>
                  <p className="text-xs text-gray-500">Zipline, Burma Bridge, Commando Net, Climbing Wall & Obstacles.</p>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase">Pass Rate (₹)</label>
                    <input
                      type="number"
                      value={ticketPricing.adventure}
                      onChange={(e) => setTicketPricing({ ...ticketPricing, adventure: Number(e.target.value) })}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-gray-300 font-extrabold text-[#F68734]"
                    />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="font-extrabold text-sm text-[#0E295B] flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 size={18} className="text-rose-600" /> All-in-One Mega Pass
                    </span>
                    <span className="text-[10px] uppercase font-extrabold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">All 3 Parks</span>
                  </div>
                  <p className="text-xs text-gray-500">Unlimited entry to Water Park + Amusement Park + Adventure Zone.</p>
                  <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase">Mega Pass Rate (₹)</label>
                    <input
                      type="number"
                      value={ticketPricing.comboAll}
                      onChange={(e) => setTicketPricing({ ...ticketPricing, comboAll: Number(e.target.value) })}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-gray-300 font-extrabold text-[#F68734]"
                    />
                  </div>
                </div>
              </div>

              {/* Rental Amenities & Addons Pricing Matrix */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-[#0E295B]">Park Rental Amenities & Addon Tariffs</h3>
                    <p className="text-xs text-gray-500">Configure on-ground rental fees, lockers and FastTrack queue jumps.</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    On-Site Counters Synced
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Swimwear / Costume Rent</div>
                    <div className="text-base font-extrabold text-[#0E295B]">₹150 / Piece</div>
                    <div className="text-[11px] text-gray-500">+ ₹200 Refundable Security</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Digital RFID Locker</div>
                    <div className="text-base font-extrabold text-[#0E295B]">₹100 / Locker</div>
                    <div className="text-[11px] text-gray-500">+ ₹100 Key Security</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Single / Double Water Tube</div>
                    <div className="text-base font-extrabold text-[#0E295B]">₹50 / Day</div>
                    <div className="text-[11px] text-gray-500">Wave Pool float rental</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">VIP FastTrack Slide Pass</div>
                    <div className="text-base font-extrabold text-purple-700">₹300 / Person</div>
                    <div className="text-[11px] text-gray-500">Zero queue priority entry</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: OFFERS & COUPONS
              ========================================================================= */}
          {currentSection === "coupons" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Offers & Promotional Coupons</h2>
                  <p className="text-xs text-gray-500">Create percentage discounts, flat cash vouchers, flash sale campaigns & track redemptions.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    saveCoupons(coupons);
                    triggerSaveNotification("All promotional coupons & campaign rules synced live to website!");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Save All Coupons
                </button>
              </div>

              {/* Coupon Marketing Performance KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Campaigns</div>
                  <div className="text-2xl font-extrabold text-[#0E295B] mt-1">{coupons.filter(c => c.active).length} Codes Active</div>
                  <div className="text-[11px] text-gray-500 font-medium">Auto-validated in cart</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Redemptions</div>
                  <div className="text-2xl font-extrabold text-[#F68734] mt-1">936 Bookings</div>
                  <div className="text-[11px] text-emerald-600 font-bold">↑ +31% conversion lift</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Gross Promo Pipeline</div>
                  <div className="text-2xl font-extrabold text-emerald-600 mt-1">₹14.82 Lakh</div>
                  <div className="text-[11px] text-emerald-600 font-medium">Direct web revenue</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Top Converting Promo</div>
                  <div className="text-base font-extrabold text-purple-700 mt-1 truncate">WELCOME5 (412 Uses)</div>
                  <div className="text-[11px] text-gray-500 font-medium">New visitor favorite</div>
                </div>
              </div>

              {/* 1-Click Flash Campaign Presets */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#F68734]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#0E295B]">1-Click Campaign Launchers:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const code = "WEEKEND15";
                      if (!coupons.some(c => c.code === code)) {
                        const updated = [...coupons, { code, discountPct: 15, expiry: "2026-10-31", usageCount: 0, active: true }];
                        setCoupons(updated);
                        saveCoupons(updated);
                        triggerSaveNotification(`Flash Campaign ${code} launched live!`);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-orange-50 text-[#F68734] border border-orange-200 text-xs font-bold hover:bg-orange-100 transition"
                  >
                    🎉 Weekend Flash (15% Off)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const code = "MONSOON20";
                      if (!coupons.some(c => c.code === code)) {
                        const updated = [...coupons, { code, discountPct: 20, expiry: "2026-09-30", usageCount: 0, active: true }];
                        setCoupons(updated);
                        saveCoupons(updated);
                        triggerSaveNotification(`Monsoon Campaign ${code} launched live!`);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-sky-50 text-[#01A5E1] border border-sky-200 text-xs font-bold hover:bg-sky-100 transition"
                  >
                    🌊 Monsoon Splash (20% Off)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const code = "ROYALSTAY10";
                      if (!coupons.some(c => c.code === code)) {
                        const updated = [...coupons, { code, discountPct: 10, expiry: "2026-12-31", usageCount: 0, active: true }];
                        setCoupons(updated);
                        saveCoupons(updated);
                        triggerSaveNotification(`Resort Luxury Campaign ${code} launched!`);
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold hover:bg-purple-100 transition"
                  >
                    🏨 Luxury Stay (10% Off)
                  </button>
                </div>
              </div>

              {/* Add New Coupon Form */}
              <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-amber-950 flex items-center gap-2">
                  <Plus size={15} /> Create Custom Promo Voucher Code
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Coupon Code</label>
                    <input
                      type="text"
                      placeholder="e.g. FESTIVE25"
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-amber-300 font-mono font-bold text-xs uppercase bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Discount Percentage (%)</label>
                    <input
                      type="number"
                      placeholder="10"
                      value={newCouponPct}
                      onChange={(e) => setNewCouponPct(Number(e.target.value))}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-amber-300 font-bold text-xs bg-white text-[#F68734]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Expiry Date</label>
                    <input
                      type="date"
                      value={newCouponExpiry}
                      onChange={(e) => setNewCouponExpiry(e.target.value)}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-amber-300 font-bold text-xs bg-white"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!newCouponCode) return;
                        const updated = [
                          ...coupons,
                          { code: newCouponCode, discountPct: newCouponPct, expiry: newCouponExpiry, usageCount: 0, active: true },
                        ];
                        setCoupons(updated);
                        saveCoupons(updated);
                        setNewCouponCode("");
                        triggerSaveNotification(`Coupon ${newCouponCode} created and active on site!`);
                      }}
                      className="w-full h-10 rounded-xl bg-[#0E295B] text-white font-bold text-xs hover:bg-[#1a448d] transition flex items-center justify-center gap-1.5"
                    >
                      <Plus size={14} /> Publish Coupon
                    </button>
                  </div>
                </div>
              </div>

              {/* Coupon Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[11px]">
                    <tr>
                      <th className="p-4">Coupon Code</th>
                      <th className="p-4">Discount Value</th>
                      <th className="p-4">Expiry Date</th>
                      <th className="p-4">Times Redeemed</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {coupons.map((c) => (
                      <tr key={c.code} className="hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-extrabold text-[#0E295B] text-sm bg-gray-100 px-2.5 py-1 rounded-lg border border-gray-200">
                              {c.code}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(c.code);
                                triggerSaveNotification(`Copied "${c.code}" to clipboard!`);
                              }}
                              className="text-gray-400 hover:text-[#01A5E1] p-1"
                              title="Copy Promo Code"
                            >
                              📋
                            </button>
                          </div>
                        </td>
                        <td className="p-4 font-bold text-emerald-600">{c.discountPct}% Flat Off</td>
                        <td className="p-4 text-gray-600">{c.expiry}</td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="font-bold text-[#F68734]">{c.usageCount} Bookings</div>
                            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#F68734] rounded-full" style={{ width: `${Math.min(100, (c.usageCount / 500) * 100)}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = coupons.map(x => x.code === c.code ? { ...x, active: !x.active } : x);
                              setCoupons(updated);
                              saveCoupons(updated);
                              triggerSaveNotification(`Coupon ${c.code} ${updated.find(x => x.code === c.code)?.active ? "Activated" : "Paused"}`);
                            }}
                            className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase transition ${
                              c.active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {c.active ? "🟢 Active" : "⏸ Paused"}
                          </button>
                        </td>
                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => {
                              const updated = coupons.filter((x) => x.code !== c.code);
                              setCoupons(updated);
                              saveCoupons(updated);
                              triggerSaveNotification(`Coupon "${c.code}" deleted.`);
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
                            title="Delete Coupon"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: AVAILABILITY & BLACKOUT DATES
              ========================================================================= */}
          {currentSection === "availability" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Availability & Blackout Dates</h2>
                  <p className="text-xs text-gray-500">Block private buyouts, festival surges, wedding season locks & maintenance windows across all 67 rooms.</p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerSaveNotification("Calendar synced live to Axis Channel PMS & all OTAs!")}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <RefreshCw size={14} /> Update Calendar
                </button>
              </div>

              {/* Calendar Status Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Blackout Dates</div>
                  <div className="text-2xl font-extrabold text-[#0E295B] mt-1">{blackoutList.length} Events</div>
                  <div className="text-[11px] text-red-500 font-bold">Rooms blocked in advance</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Weekend Surge Active</div>
                  <div className="text-2xl font-extrabold text-[#F68734] mt-1">Every Sat & Sun</div>
                  <div className="text-[11px] text-amber-600 font-bold">+20% dynamic yield applied</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Next Blocked Event</div>
                  <div className="text-sm font-extrabold text-purple-700 mt-1">18 Nov 2026</div>
                  <div className="text-[11px] text-gray-500 font-medium">Singhania Royal Wedding</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Axis Real-Time Push</div>
                  <div className="text-sm font-extrabold text-emerald-600 mt-1">Online 24 / 7</div>
                  <div className="text-[11px] text-emerald-600 font-medium">Instant OTA lock on booking</div>
                </div>
              </div>

              {/* Yield Automation Toolbar */}
              <div className="bg-gradient-to-r from-[#0E295B] to-[#1a448d] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-white/90">Yield Automation Controls:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => triggerSaveNotification("Weekend Surge +20% applied to all Sat & Sun availability!")}
                    className="px-3.5 py-1.5 rounded-xl bg-[#F68734] text-white text-xs font-bold hover:bg-[#e07525] transition flex items-center gap-1.5"
                  >
                    <TrendingUp size={13} /> Auto-Surge Weekends (+20%)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const holidays = [
                        { id: "gh-diwali", startDate: "2026-10-20", endDate: "2026-10-20", reason: "Diwali — Peak Festive Holiday", scope: "All 67 Rooms", type: "Stop-Sell", daysCount: 1 },
                        { id: "gh-holi", startDate: "2027-03-14", endDate: "2027-03-14", reason: "Holi — Peak Festive Holiday", scope: "All 67 Rooms", type: "Stop-Sell", daysCount: 1 },
                      ];
                      setBlackoutList(prev => [
                        ...prev,
                        ...holidays.filter(h => !prev.some(p => p.id === h.id)),
                      ]);
                      triggerSaveNotification("Gazetted Holiday blackout dates locked on all OTAs!");
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <Lock size={13} /> Lock Holiday Dates
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerSaveNotification("Force 2-way sync completed: Axis PMS ↔ MMT, Agoda, Booking.com — 0 conflicts!")}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <RefreshCw size={13} /> Force Axis Channel Sync
                  </button>
                </div>
              </div>

              {/* Add Blackout Date Form */}
              <div className="bg-red-50/70 border border-red-200 p-5 rounded-2xl space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-red-900 flex items-center gap-2">
                  <Plus size={15} /> Add New Blackout Date / Event Lock
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Start Date</label>
                    <input type="date" value={newBkStart} onChange={e => setNewBkStart(e.target.value)}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-red-300 text-xs font-bold bg-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">End Date</label>
                    <input type="date" value={newBkEnd} onChange={e => setNewBkEnd(e.target.value)}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-red-300 text-xs font-bold bg-white" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Scope</label>
                    <select value={newBkScope} onChange={e => setNewBkScope(e.target.value)}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-red-300 text-xs font-bold bg-white">
                      <option>All 67 Rooms</option>
                      <option>Only Water Park</option>
                      <option>Banquet Lawns Only</option>
                      <option>Full Property</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Rule Type</label>
                    <select value={newBkType} onChange={e => setNewBkType(e.target.value)}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-red-300 text-xs font-bold bg-white">
                      <option>Stop-Sell</option>
                      <option>Maintenance</option>
                      <option>Tariff Surge</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 md:col-span-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Reason / Event Name</label>
                    <input type="text" placeholder="e.g. Sharma Wedding Buyout" value={newBkReason}
                      onChange={e => setNewBkReason(e.target.value)}
                      className="w-full h-10 px-3 mt-1 rounded-xl border border-red-300 text-xs font-medium bg-white" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!newBkReason) return;
                    const start = new Date(newBkStart);
                    const end = new Date(newBkEnd);
                    const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 86400000) + 1);
                    setBlackoutList([
                      ...blackoutList,
                      { id: String(Date.now()), startDate: newBkStart, endDate: newBkEnd, reason: newBkReason, scope: newBkScope, type: newBkType, daysCount: days },
                    ]);
                    setNewBkReason("");
                    triggerSaveNotification(`Blackout "${newBkReason}" locked on all channels!`);
                  }}
                  className="h-10 px-6 rounded-xl bg-red-700 text-white font-bold text-xs hover:bg-red-800 transition flex items-center gap-1.5"
                >
                  <Lock size={14} /> Lock Dates
                </button>
              </div>

              {/* Blackout Dates Schedule Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-[#0E295B]">Active Blackout & Event Lock Schedule</h3>
                  <span className="text-xs text-gray-400">{blackoutList.length} entries</span>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-gray-100 text-gray-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-4">Date Range</th>
                      <th className="p-4">Days</th>
                      <th className="p-4">Reason / Event</th>
                      <th className="p-4">Scope</th>
                      <th className="p-4">Rule Type</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {blackoutList.map((bk) => (
                      <tr key={bk.id} className="hover:bg-gray-50">
                        <td className="p-4 font-bold text-[#0E295B]">
                          {bk.startDate} {bk.startDate !== bk.endDate && `→ ${bk.endDate}`}
                        </td>
                        <td className="p-4">
                          <span className="font-extrabold text-[#F68734]">{bk.daysCount}D</span>
                        </td>
                        <td className="p-4 text-gray-700 max-w-xs truncate">{bk.reason}</td>
                        <td className="p-4">
                          <span className="text-[10px] font-extrabold uppercase bg-sky-100 text-sky-800 px-2 py-0.5 rounded">
                            {bk.scope}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            bk.type === "Stop-Sell" ? "bg-red-100 text-red-800" :
                            bk.type === "Maintenance" ? "bg-amber-100 text-amber-800" :
                            "bg-purple-100 text-purple-800"
                          }`}>
                            {bk.type === "Stop-Sell" ? "🛑 Stop-Sell" : bk.type === "Maintenance" ? "🔧 Maintenance" : "📈 Surge"}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => {
                              setBlackoutList(blackoutList.filter(x => x.id !== bk.id));
                              triggerSaveNotification(`Blackout "${bk.reason}" removed. Dates now open for booking!`);
                            }}
                            className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50 flex items-center gap-1"
                            title="Unlock Dates"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: LEADS CRM
              ========================================================================= */}
          {currentSection === "leads" && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Inquiries & Leads CRM</h2>
                  <p className="text-xs text-gray-500">Real-time incoming requests from website, WhatsApp bookings & walk-ins.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddLead(!showAddLead)}
                    className="px-4 py-2 rounded-xl bg-[#0E295B] text-white text-xs font-bold hover:bg-[#1a448d] flex items-center gap-1.5"
                  >
                    <Plus size={14} /> Add Lead
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerSaveNotification("Leads exported to CSV successfully!")}
                    className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
                  >
                    ⬇ Export CSV
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Leads</div>
                  <div className="text-2xl font-extrabold text-[#0E295B] mt-1">{leads.length}</div>
                  <div className="text-[11px] text-blue-500 font-bold">Active inquiries</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Confirmed Revenue</div>
                  <div className="text-xl font-extrabold text-emerald-600 mt-1">
                    {formatPrice(leads.filter(l => l.status === "Confirmed").reduce((a, b) => a + b.amount, 0))}
                  </div>
                  <div className="text-[11px] text-emerald-500 font-bold">{leads.filter(l => l.status === "Confirmed").length} bookings locked</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Pending Pipeline</div>
                  <div className="text-xl font-extrabold text-[#F68734] mt-1">
                    {formatPrice(leads.filter(l => l.status === "New" || l.status === "Contacted").reduce((a, b) => a + b.amount, 0))}
                  </div>
                  <div className="text-[11px] text-amber-500 font-bold">{leads.filter(l => l.status === "New" || l.status === "Contacted").length} leads to convert</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Avg. Lead Value</div>
                  <div className="text-xl font-extrabold text-purple-700 mt-1">
                    {formatPrice(Math.round(leads.reduce((a, b) => a + b.amount, 0) / (leads.length || 1)))}
                  </div>
                  <div className="text-[11px] text-purple-500 font-bold">Per inquiry</div>
                </div>
              </div>

              {/* Lead Source Breakdown */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#0E295B] mb-3">📊 Lead Source Breakdown</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[
                    { source: "Website Form", count: 2, pct: 40, color: "bg-blue-500" },
                    { source: "WhatsApp", count: 1, pct: 20, color: "bg-emerald-500" },
                    { source: "Direct Call", count: 1, pct: 20, color: "bg-amber-500" },
                    { source: "OTA (MMT)", count: 1, pct: 20, color: "bg-purple-500" },
                    { source: "Walk-In", count: 0, pct: 0, color: "bg-gray-300" },
                  ].map(s => (
                    <div key={s.source} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-gray-600">
                        <span>{s.source}</span>
                        <span className="font-extrabold text-[#0E295B]">{s.count}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                      </div>
                      <div className="text-[10px] text-gray-400">{s.pct}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Lead Form */}
              {showAddLead && (
                <div className="bg-blue-50/70 border border-blue-200 p-5 rounded-2xl space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-[#0E295B] flex items-center gap-2">
                    <Plus size={14} /> Add Manual Lead / Walk-In Inquiry
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Guest Name</label>
                      <input type="text" placeholder="Full Name" value={newLeadName} onChange={e => setNewLeadName(e.target.value)}
                        className="w-full h-10 px-3 mt-1 rounded-xl border border-blue-300 text-xs font-medium bg-white" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Contact Phone</label>
                      <input type="text" placeholder="+91 XXXXX XXXXX" value={newLeadPhone} onChange={e => setNewLeadPhone(e.target.value)}
                        className="w-full h-10 px-3 mt-1 rounded-xl border border-blue-300 text-xs font-medium bg-white" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Service Requested</label>
                      <select value={newLeadService} onChange={e => setNewLeadService(e.target.value)}
                        className="w-full h-10 px-3 mt-1 rounded-xl border border-blue-300 text-xs font-bold bg-white">
                        <option>Room Booking</option>
                        <option>Water Park Day Pass</option>
                        <option>Wedding / Banquet</option>
                        <option>Corporate Offsite</option>
                        <option>School Picnic</option>
                        <option>Stay Package</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Event / Stay Date</label>
                      <input type="date" value={newLeadDate} onChange={e => setNewLeadDate(e.target.value)}
                        className="w-full h-10 px-3 mt-1 rounded-xl border border-blue-300 text-xs font-bold bg-white" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Lead Source</label>
                      <select value={newLeadSource} onChange={e => setNewLeadSource(e.target.value)}
                        className="w-full h-10 px-3 mt-1 rounded-xl border border-blue-300 text-xs font-bold bg-white">
                        <option>Walk-In</option>
                        <option>WhatsApp</option>
                        <option>Direct Call</option>
                        <option>Website Form</option>
                        <option>OTA (MMT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-gray-500 uppercase">Est. Value (₹)</label>
                      <input type="number" value={newLeadAmount} onChange={e => setNewLeadAmount(Number(e.target.value))}
                        className="w-full h-10 px-3 mt-1 rounded-xl border border-blue-300 text-xs font-bold bg-white" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (!newLeadName || !newLeadPhone) return;
                        const newId = `L-${8492 + leads.length + 1}`;
                        setLeads([
                          { id: newId, guestName: newLeadName, phone: newLeadPhone, service: newLeadService, date: newLeadDate, pax: newLeadPax, status: "New", amount: newLeadAmount, time: "Just now" },
                          ...leads,
                        ]);
                        setNewLeadName("");
                        setNewLeadPhone("");
                        setShowAddLead(false);
                        triggerSaveNotification(`Lead ${newId} (${newLeadName}) added successfully!`);
                      }}
                      className="h-10 px-6 rounded-xl bg-[#0E295B] text-white font-bold text-xs hover:bg-[#1a448d] transition flex items-center gap-1.5"
                    >
                      <Plus size={14} /> Add Lead
                    </button>
                    <button type="button" onClick={() => setShowAddLead(false)}
                      className="h-10 px-4 rounded-xl bg-white border border-gray-300 text-gray-600 font-bold text-xs hover:bg-gray-50 transition">
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Filter + Search Bar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-1.5 flex-wrap">
                  {["All", "New", "Contacted", "Confirmed", "Cancelled"].map(f => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setLeadFilter(f)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                        leadFilter === f
                          ? "bg-[#0E295B] text-white shadow"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {f} {f === "All" ? `(${leads.length})` : `(${leads.filter(l => l.status === f).length})`}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Search by name or phone..."
                  value={leadSearch}
                  onChange={e => setLeadSearch(e.target.value)}
                  className="sm:ml-auto h-9 px-4 rounded-xl border border-gray-300 text-xs font-medium w-full sm:w-60"
                />
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[11px]">
                    <tr>
                      <th className="p-4">Lead ID</th>
                      <th className="p-4">Guest Name</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Requested Service</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Est. Value</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {leads
                      .filter(l =>
                        (leadFilter === "All" || l.status === leadFilter) &&
                        (leadSearch === "" || l.guestName.toLowerCase().includes(leadSearch.toLowerCase()) || l.phone.includes(leadSearch))
                      )
                      .map((lead, idx) => (
                        <tr key={lead.id} className="hover:bg-gray-50">
                          <td className="p-4">
                            <div className="font-mono font-bold text-gray-400">{lead.id}</div>
                            <div className="text-[10px] text-gray-400 mt-0.5">{lead.time}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-extrabold text-[#0E295B]">{lead.guestName}</div>
                            <div className="text-[10px] text-gray-400">{lead.pax}</div>
                          </td>
                          <td className="p-4 text-gray-600 font-mono">{lead.phone}</td>
                          <td className="p-4 text-gray-800">{lead.service}</td>
                          <td className="p-4 text-gray-500">{lead.date}</td>
                          <td className="p-4 font-extrabold text-[#F68734]">{formatPrice(lead.amount)}</td>
                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) => {
                                const newLeads = leads.map((l, i) => i === leads.indexOf(lead) ? { ...l, status: e.target.value as any } : l);
                                setLeads(newLeads);
                                triggerSaveNotification(`Lead ${lead.id} updated to ${e.target.value}`);
                              }}
                              className={`h-8 px-2 rounded-lg border text-xs font-bold bg-white ${
                                lead.status === "Confirmed" ? "border-emerald-400 text-emerald-700" :
                                lead.status === "New" ? "border-blue-400 text-blue-700" :
                                lead.status === "Contacted" ? "border-amber-400 text-amber-700" :
                                "border-red-300 text-red-500"
                              }`}
                            >
                              <option>New</option>
                              <option>Contacted</option>
                              <option>Confirmed</option>
                              <option>Cancelled</option>
                            </select>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => triggerSaveNotification(`WhatsApp message sent to ${lead.guestName} (${lead.phone})!`)}
                                className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm transition"
                                title="WhatsApp Follow-Up"
                              >
                                📱
                              </button>
                              <button
                                type="button"
                                onClick={() => triggerSaveNotification(`Email sent to ${lead.guestName}!`)}
                                className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm transition"
                                title="Send Email"
                              >
                                📧
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = leads.filter(l => l.id !== lead.id);
                                  setLeads(updated);
                                  triggerSaveNotification(`Lead ${lead.id} removed from CRM.`);
                                }}
                                className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center transition"
                                title="Remove Lead"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {leads.filter(l =>
                  (leadFilter === "All" || l.status === leadFilter) &&
                  (leadSearch === "" || l.guestName.toLowerCase().includes(leadSearch.toLowerCase()) || l.phone.includes(leadSearch))
                ).length === 0 && (
                  <div className="p-10 text-center text-gray-400 text-xs font-bold">No leads match the current filter.</div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: SEO & 301 REDIRECTS
              ========================================================================= */}
          {currentSection === "seo" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">SEO & Search Engine Optimization</h2>
                  <p className="text-xs text-gray-500">Manage global meta tags, OpenGraph previews, Schema JSON-LD & Google Search Console verification.</p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerSaveNotification("Global SEO & Search Console settings saved!")}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Save SEO Tags
                </button>
              </div>

              {/* SEO Health Dashboard Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">XML Sitemap</div>
                  <div className="text-sm font-extrabold text-emerald-600 mt-1">🟢 Active (/sitemap.xml)</div>
                  <div className="text-[11px] text-gray-500 font-medium">17 pages indexed</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Robots.txt File</div>
                  <div className="text-sm font-extrabold text-emerald-600 mt-1">🟢 Configured (/robots.txt)</div>
                  <div className="text-[11px] text-gray-500 font-medium">Admin protected from crawling</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Schema JSON-LD</div>
                  <div className="text-sm font-extrabold text-purple-600 mt-1">✨ Resort & WaterPark</div>
                  <div className="text-[11px] text-gray-500 font-medium">Google Rich Cards enabled</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Canonical Tags</div>
                  <div className="text-sm font-extrabold text-[#01A5E1] mt-1">Auto-Generated</div>
                  <div className="text-[11px] text-gray-500 font-medium">Zero duplicate content risk</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Global Meta Title (50–60 chars)</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-[#0E295B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Meta Description (150–160 chars)</label>
                  <textarea
                    rows={3}
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    className="w-full p-3.5 rounded-xl border border-gray-300 text-xs text-gray-700 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Google Search Console Verification Tag</label>
                  <input
                    type="text"
                    placeholder="google-site-verification=abc123xyz..."
                    defaultValue="google-site-verification=aapnoghar_resort_verified_2026"
                    className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-mono bg-gray-50"
                  />
                </div>

                <div className="pt-2 flex items-center gap-4 text-xs font-bold text-gray-500 flex-wrap">
                  <a href="/sitemap.xml" target="_blank" className="text-[#01A5E1] hover:underline flex items-center gap-1">
                    🔗 View Live Sitemap.xml
                  </a>
                  <a href="/robots.txt" target="_blank" className="text-[#01A5E1] hover:underline flex items-center gap-1">
                    🔗 View Live Robots.txt
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: ANALYTICS & MARKETING CONTROLLER
              ========================================================================= */}
          {currentSection === "analytics" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Analytics & Marketing Controller</h2>
                  <p className="text-xs text-gray-500">Configure GA4, GTM & Meta Pixel tracking IDs, monitor UTM parameters & view live conversion event logs.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    saveAnalyticsConfig({ ga4Id: ga4Input, gtmId: gtmInput, pixelId: pixelInput });
                    triggerSaveNotification("Analytics & Marketing Tracking IDs updated & deployed live!");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Deploy Tracking IDs
                </button>
              </div>

              {/* Tracking Integration Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">GA4 Property ID</div>
                  <div className="text-sm font-extrabold text-[#0E295B] font-mono mt-1">{ga4Input || "Not Configured"}</div>
                  <div className="text-[11px] text-emerald-600 font-medium">Auto-pageview & events active</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">GTM Container</div>
                  <div className="text-sm font-extrabold text-purple-700 font-mono mt-1">{gtmInput || "Not Configured"}</div>
                  <div className="text-[11px] text-gray-500 font-medium">dataLayer.push() ready</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Meta (FB) Pixel</div>
                  <div className="text-sm font-extrabold text-blue-600 font-mono mt-1">{pixelInput || "Not Configured"}</div>
                  <div className="text-[11px] text-gray-500 font-medium">fbq custom tracking active</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">UTM Parameter Engine</div>
                  <div className="text-sm font-extrabold text-emerald-600 mt-1">🟢 Active</div>
                  <div className="text-[11px] text-gray-500 font-medium">Session-based attribution</div>
                </div>
              </div>

              {/* Configure Tracking IDs Form */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
                <h3 className="text-sm font-extrabold text-[#0E295B] uppercase tracking-wider">Third-Party Tracking Tags & Containers</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Google Analytics 4 ID</label>
                    <input
                      type="text"
                      placeholder="G-XXXXXXXXXX"
                      value={ga4Input}
                      onChange={(e) => setGa4Input(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-mono font-bold text-[#0E295B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Google Tag Manager Container</label>
                    <input
                      type="text"
                      placeholder="GTM-XXXXXXX"
                      value={gtmInput}
                      onChange={(e) => setGtmInput(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-mono font-bold text-[#0E295B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Meta (Facebook) Pixel ID</label>
                    <input
                      type="text"
                      placeholder="123456789012345"
                      value={pixelInput}
                      onChange={(e) => setPixelInput(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-mono font-bold text-[#0E295B]"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-sky-50/80 rounded-xl border border-sky-200 text-xs text-sky-900 font-medium">
                  💡 <strong>How it works:</strong> Marketing team can enter their live IDs here without modifying any code. The website will automatically initialize scripts and start sending conversion events for <em>phone clicks, WhatsApp inquiries, room bookings, and form submissions</em>.
                </div>
              </div>

              {/* Live Conversion Events Log Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-3 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0E295B]">Live Visitor Conversion Event Stream</h3>
                    <p className="text-xs text-gray-500">Real-time user actions captured across mobile and desktop visitors.</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    🟢 Live Event Stream Active
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[11px]">
                      <tr>
                        <th className="p-3.5">Event ID</th>
                        <th className="p-3.5">Event Action Name</th>
                        <th className="p-3.5">Event Details & Parameters</th>
                        <th className="p-3.5">Traffic Attribution (UTM Source)</th>
                        <th className="p-3.5">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {analyticsEvents.map((evt) => (
                        <tr key={evt.id} className="hover:bg-gray-50">
                          <td className="p-3.5 font-mono font-bold text-gray-400">{evt.id}</td>
                          <td className="p-3.5 font-extrabold text-[#0E295B]">
                            <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-mono text-[11px]">
                              {evt.eventName}
                            </span>
                          </td>
                          <td className="p-3.5 text-gray-600 font-mono text-[11px]">
                            {JSON.stringify(evt.params || {})}
                          </td>
                          <td className="p-3.5">
                            <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {evt.utmSource}
                            </span>
                          </td>
                          <td className="p-3.5 text-gray-400">{evt.timestamp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: SEASONAL & FESTIVAL CAMPAIGN CONTROLLER
              ========================================================================= */}
          {currentSection === "seasonal" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Seasonal & Festival Campaign Manager</h2>
                  <p className="text-xs text-gray-500">Manage Water Park summer/winter operational status, holiday rates & festival promotional banners.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    saveSeasonalConfig(seasonal);
                    triggerSaveNotification("Seasonal & Festival configuration updated & published live!");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Publish Seasonal Changes
                </button>
              </div>

              {/* Water Park Status & Holiday Surcharge Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Control 1: Water Park Season Status */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-[#0E295B] text-base">Water Park Seasonal Status</h3>
                      <p className="text-xs text-gray-500">Toggle summer operational opening vs winter maintenance closure.</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                      seasonal.waterParkOpen ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                    }`}>
                      {seasonal.waterParkOpen ? "🟢 Open (Summer Season)" : "🔴 Closed (Winter Season)"}
                    </span>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...seasonal, waterParkOpen: true };
                        setSeasonal(updated);
                        saveSeasonalConfig(updated);
                        triggerSaveNotification("Water Park marked as OPEN for Summer Season!");
                      }}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition ${
                        seasonal.waterParkOpen
                          ? "bg-emerald-600 text-white border-emerald-600"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      ☀️ Summer Season (Open)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...seasonal, waterParkOpen: false };
                        setSeasonal(updated);
                        saveSeasonalConfig(updated);
                        triggerSaveNotification("Water Park marked as CLOSED for Winter Season.");
                      }}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition ${
                        !seasonal.waterParkOpen
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }`}
                    >
                      ❄️ Winter Season (Closed)
                    </button>
                  </div>
                </div>

                {/* Control 2: Holiday Surcharge Pricing */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-[#0E295B] text-base">Holiday & Long-Weekend Rates</h3>
                      <p className="text-xs text-gray-500">Apply automatic surcharge on gazetted national holidays & long weekends.</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                      seasonal.holidayPricingActive ? "bg-amber-100 text-amber-900" : "bg-gray-100 text-gray-600"
                    }`}>
                      {seasonal.holidayPricingActive ? "⚡ Holiday Surcharge ACTIVE" : "Standard Rates"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const updated = { ...seasonal, holidayPricingActive: !seasonal.holidayPricingActive };
                        setSeasonal(updated);
                        saveSeasonalConfig(updated);
                        triggerSaveNotification(`Holiday pricing is now ${updated.holidayPricingActive ? "Active" : "Disabled"}`);
                      }}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition ${
                        seasonal.holidayPricingActive
                          ? "bg-amber-500 text-white border-amber-500"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      {seasonal.holidayPricingActive ? "Disable Surcharge" : "Activate Holiday Rates"}
                    </button>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                      <span>Surcharge Rate:</span>
                      <select
                        value={seasonal.holidaySurchargePct}
                        onChange={(e) => {
                          const updated = { ...seasonal, holidaySurchargePct: Number(e.target.value) };
                          setSeasonal(updated);
                          saveSeasonalConfig(updated);
                        }}
                        className="h-9 px-2 rounded-lg border border-gray-300 font-bold bg-white text-[#0E295B]"
                      >
                        <option value={10}>+10%</option>
                        <option value={15}>+15%</option>
                        <option value={20}>+20%</option>
                        <option value={25}>+25%</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Festival Campaign Offer Cards */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0E295B]">Preset Festival & Seasonal Offers ({seasonal.offers.length})</h3>
                    <p className="text-xs text-gray-500">Toggle active promotional campaign banners on website hero & packages section.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {seasonal.offers.map((offer) => (
                    <div
                      key={offer.id}
                      className={`p-5 rounded-2xl border transition space-y-3 ${
                        offer.active
                          ? "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 shadow-md"
                          : "bg-gray-50 border-gray-200 opacity-80"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                          offer.active ? "bg-[#F68734] text-white" : "bg-gray-200 text-gray-700"
                        }`}>
                          {offer.festivalName}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#0E295B] bg-white px-2 py-0.5 rounded border border-gray-300">
                            {offer.code} ({offer.discount})
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const updatedOffers = seasonal.offers.map(o => o.id === offer.id ? { ...o, active: !o.active } : o);
                              const updated = {
                                ...seasonal,
                                activeOfferId: !offer.active ? offer.id : null,
                                offers: updatedOffers,
                              };
                              setSeasonal(updated);
                              saveSeasonalConfig(updated);
                              triggerSaveNotification(`Festival campaign "${offer.festivalName}" is now ${!offer.active ? "Active on Website" : "Inactive"}`);
                            }}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                              offer.active
                                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {offer.active ? "🟢 Campaign Live" : "Activate Banner"}
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-[#0E295B] text-base">{offer.title}</h4>
                        <p className="text-xs text-gray-600 mt-0.5">{offer.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: SECURITY & ROLE-BASED ACCESS CONTROL (RBAC)
              ========================================================================= */}
          {currentSection === "security" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Security, RBAC & Backup Manager</h2>
                  <p className="text-xs text-gray-500">Configure role-based access, download JSON database backups, check spam protection & SSL certificates.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute("href", dataStr);
                      downloadAnchor.setAttribute("download", `AapnoGhar_CMS_Backup_${new Date().toISOString().slice(0, 10)}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                      triggerSaveNotification("1-Click Full CMS Database Backup downloaded!");
                    }}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-700 flex items-center gap-1.5"
                  >
                    📥 Export CMS Backup JSON
                  </button>
                </div>
              </div>

              {/* Security Health Status Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">SSL / HTTPS Protocol</div>
                  <div className="text-sm font-extrabold text-emerald-600 font-mono mt-1">🔒 256-Bit SSL Active</div>
                  <div className="text-[11px] text-gray-500 font-medium">Encrypted TLS transport</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Form Spam Protection</div>
                  <div className="text-sm font-extrabold text-blue-600 mt-1">🛡️ Honeypot Engine</div>
                  <div className="text-[11px] text-gray-500 font-medium">Bot submissions blocked</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Admin Role</div>
                  <div className="text-sm font-extrabold text-purple-700 mt-1">{adminRole}</div>
                  <div className="text-[11px] text-gray-500 font-medium">Full System Authority</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Payment PG Gateway</div>
                  <div className="text-sm font-extrabold text-sky-600 mt-1">💳 SSL Encrypted PG</div>
                  <div className="text-[11px] text-gray-500 font-medium">Axis / Razorpay Ready</div>
                </div>
              </div>

              {/* Role-Based Access Control (RBAC) */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
                <div>
                  <h3 className="text-base font-extrabold text-[#0E295B]">Role-Based Access Control (RBAC)</h3>
                  <p className="text-xs text-gray-500">Switch admin permissions profile to test access boundaries for front desk or managers.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { role: "Super Admin", desc: "Full access to inventory, pricing, coupons, SEO, analytics & settings.", color: "border-purple-300 bg-purple-50" },
                    { role: "Resort Manager", desc: "Access to manage room inventory, ticket pricing, and lead CRM status.", color: "border-blue-300 bg-blue-50" },
                    { role: "Receptionist", desc: "View-only access to guest booking leads and daily check-in calendar.", color: "border-emerald-300 bg-emerald-50" },
                  ].map((r) => (
                    <button
                      key={r.role}
                      type="button"
                      onClick={() => {
                        setAdminRole(r.role as any);
                        triggerSaveNotification(`Switched active role to: ${r.role}`);
                      }}
                      className={`p-4 rounded-2xl border text-left transition space-y-2 ${
                        adminRole === r.role ? `${r.color} border-2 shadow-md` : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-[#0E295B] text-sm">{r.role}</span>
                        {adminRole === r.role && <CheckCircle2 size={16} className="text-emerald-600" />}
                      </div>
                      <p className="text-xs text-gray-600 leading-snug">{r.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Backup & Disaster Recovery */}
              <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
                <div>
                  <h3 className="text-base font-extrabold text-[#0E295B]">Regular System Database Backups</h3>
                  <p className="text-xs text-gray-500">Backup all room rates, coupons, lead applications, and SEO configs to prevent data loss.</p>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-emerald-950">
                    <span className="font-bold">Automated Daily Storage Backup:</span> Active local state persistence with zero data loss protection.
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = ".json";
                      input.onchange = (e: any) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            try {
                              const parsed = JSON.parse(evt.target?.result as string);
                              Object.keys(parsed).forEach(k => localStorage.setItem(k, parsed[k]));
                              triggerSaveNotification("Database successfully restored from JSON backup! Reloading...");
                              setTimeout(() => window.location.reload(), 1200);
                            } catch {
                              alert("Invalid JSON backup file format.");
                            }
                          };
                          reader.readAsText(file);
                        }
                      };
                      input.click();
                    }}
                    className="px-4 py-2 bg-white text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold hover:bg-emerald-100 transition whitespace-nowrap"
                  >
                    📤 Restore Database from JSON
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: LANDING PAGE SYSTEM BUILDER
              ========================================================================= */}
          {currentSection === "landing-pages" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Landing Page System</h2>
                  <p className="text-xs text-gray-500">Create & publish campaign landing pages without developer intervention. Each page gets a unique URL ready for Google Ads & Meta campaigns.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddLp(!showAddLp)}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Plus size={14} /> {showAddLp ? "Cancel" : "Create New Landing Page"}
                </button>
              </div>

              {/* Create New Landing Page Form */}
              {showAddLp && (
                <div className="bg-white p-6 rounded-2xl border border-blue-200 shadow-md space-y-4">
                  <h3 className="text-sm font-extrabold text-[#0E295B] uppercase tracking-wider">New Campaign Landing Page</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">URL Slug <span className="text-gray-400 normal-case">(e.g. diwali-offer)</span></label>
                      <input type="text" placeholder="diwali-offer" value={newLpSlug} onChange={e => setNewLpSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-mono font-bold text-[#0E295B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Service Category</label>
                      <select value={newLpCategory} onChange={e => setNewLpCategory(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-[#0E295B] bg-white">
                        <option>Resort & Water Park</option>
                        <option>Water Park</option>
                        <option>Resort Stay</option>
                        <option>Weddings & Banquets</option>
                        <option>Corporate Events</option>
                        <option>Restaurant & Dining</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Campaign Headline (H1)</label>
                      <input type="text" placeholder="Diwali Royal Heritage Staycation Package" value={newLpTitle} onChange={e => setNewLpTitle(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-[#0E295B]" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Subtitle / Sub-Headline</label>
                      <input type="text" placeholder="Celebrate Diwali with Gala Dinner & Fireworks Night" value={newLpSubtitle} onChange={e => setNewLpSubtitle(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Promo Code</label>
                      <input type="text" placeholder="DIWALI20" value={newLpCode} onChange={e => setNewLpCode(e.target.value.toUpperCase())}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-mono font-bold text-[#0E295B]" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Discount Text</label>
                      <input type="text" placeholder="20% OFF" value={newLpDiscount} onChange={e => setNewLpDiscount(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-bold" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Package Inclusions <span className="text-gray-400 normal-case">(one per line)</span></label>
                      <textarea rows={4} value={newLpInclusions} onChange={e => setNewLpInclusions(e.target.value)}
                        className="w-full p-3.5 rounded-xl border border-gray-300 text-xs text-gray-700" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!newLpSlug || !newLpTitle) return;
                      const newPage: LandingPageItem = {
                        id: `lp-${Date.now()}`,
                        slug: newLpSlug,
                        title: newLpTitle,
                        subtitle: newLpSubtitle,
                        heroImage: "/images/hero_water_park.jpg",
                        offerCode: newLpCode,
                        discountText: newLpDiscount,
                        priceText: "Custom Package",
                        inclusions: newLpInclusions.split("\n").filter(l => l.trim()),
                        serviceCategory: newLpCategory,
                        metaTitle: `${newLpTitle} | AapnoGhar Resort Gurgaon`,
                        metaDescription: `${newLpSubtitle || newLpTitle} at AapnoGhar Resort Gurgaon.`,
                        published: true,
                      };
                      const updated = [...landingPages, newPage];
                      setLandingPages(updated);
                      saveLandingPages(updated);
                      setShowAddLp(false);
                      setNewLpSlug(""); setNewLpTitle(""); setNewLpSubtitle(""); setNewLpCode(""); setNewLpDiscount("");
                      triggerSaveNotification(`Landing page "/${newPage.slug}" published live!`);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold hover:bg-[#1a448d] flex items-center gap-1.5 shadow"
                  >
                    <Save size={14} /> Publish Landing Page Live
                  </button>
                </div>
              )}

              {/* Existing Landing Pages List */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-extrabold text-[#0E295B] text-sm">Published Landing Pages ({landingPages.filter(p => p.published).length} Live)</h3>
                  <span className="text-xs text-gray-400">{landingPages.length} total</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {landingPages.map(page => (
                    <div key={page.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50">
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase ${page.published ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500"}`}>
                            {page.published ? "Live" : "Draft"}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-gray-400">/{page.slug}</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-[#0E295B] truncate">{page.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="font-mono font-bold text-amber-700">{page.offerCode}</span>
                          <span>{page.discountText}</span>
                          <span className="text-gray-300">|</span>
                          <span>{page.serviceCategory}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`/${page.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold hover:bg-blue-100 flex items-center gap-1"
                        >
                          <ExternalLink size={12} /> View Live
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = landingPages.map(p => p.id === page.id ? { ...p, published: !p.published } : p);
                            setLandingPages(updated);
                            saveLandingPages(updated);
                            triggerSaveNotification(`Page "/${page.slug}" is now ${!page.published ? "Live" : "Draft"}`);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                            page.published ? "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-700" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          }`}
                        >
                          {page.published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = landingPages.filter(p => p.id !== page.id);
                            setLandingPages(updated);
                            saveLandingPages(updated);
                            triggerSaveNotification(`Landing page "/${page.slug}" deleted.`);
                          }}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: 301 REDIRECTS
              ========================================================================= */}
          {currentSection === "redirects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">301 URL Redirects Manager</h2>
                  <p className="text-xs text-gray-500">Permanent redirects from old WordPress/legacy URLs to new clean routes.</p>
                </div>
              </div>

              {/* Add Redirect */}
              <div className="bg-blue-50/60 border border-blue-200 p-5 rounded-2xl space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#0E295B]">
                  + Add New 301 Redirect Rule
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Old Path (e.g. /old-rooms.php)"
                    value={newFromUrl}
                    onChange={(e) => setNewFromUrl(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-blue-300 text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="New Route (e.g. /rooms)"
                    value={newToUrl}
                    onChange={(e) => setNewToUrl(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-blue-300 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newFromUrl || !newToUrl) return;
                      setRedirects([...redirects, { from: newFromUrl, to: newToUrl, code: "301 Permanent" }]);
                      setNewFromUrl("");
                      setNewToUrl("");
                      triggerSaveNotification("301 redirect rule activated!");
                    }}
                    className="h-10 rounded-xl bg-[#0E295B] text-white font-bold text-xs hover:bg-[#1a448d]"
                  >
                    Activate Redirect
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[11px]">
                    <tr>
                      <th className="p-4">Source URL (Old)</th>
                      <th className="p-4">Destination URL (New)</th>
                      <th className="p-4">HTTP Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-mono font-medium">
                    {redirects.map((r, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-4 text-red-600">{r.from}</td>
                        <td className="p-4 text-emerald-600 font-bold">{r.to}</td>
                        <td className="p-4 text-gray-500">{r.code}</td>
                        <td className="p-4">
                          <button
                            type="button"
                            onClick={() => {
                              setRedirects(redirects.filter((_, i) => i !== idx));
                              triggerSaveNotification("Redirect deleted.");
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: GALLERY & MEDIA CMS
              ========================================================================= */}
          {currentSection === "gallery" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Gallery & Media CMS</h2>
                  <p className="text-xs text-gray-500">Upload, categorize and curate high-resolution photos and videos across albums.</p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerSaveNotification("Gallery updates published live!")}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Publish Gallery
                </button>
              </div>

              {/* Add Photo Form */}
              <div className="bg-sky-50/70 border border-sky-200 p-5 rounded-2xl space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#0E295B] flex items-center gap-2">
                  <Plus size={15} /> Add New Photo to Media Gallery
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Photo Title / Caption"
                    value={newPhotoTitle}
                    onChange={(e) => setNewPhotoTitle(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-sky-300 text-xs font-medium bg-white"
                  />
                  <select
                    value={newPhotoCategory}
                    onChange={(e) => setNewPhotoCategory(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-sky-300 text-xs font-bold bg-white text-[#0E295B]"
                  >
                    <option>Water Park</option>
                    <option>Resort & Suites</option>
                    <option>Weddings & Banquets</option>
                    <option>Carnival Joyrides</option>
                    <option>Buffet Dining</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Image URL (e.g. /images/hero_water_park.jpg)"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-sky-300 text-xs font-mono bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newPhotoTitle) return;
                      setGalleryList([
                        {
                          id: String(Date.now()),
                          title: newPhotoTitle,
                          category: newPhotoCategory,
                          image: newPhotoUrl || "/images/hero_water_park.jpg",
                        },
                        ...galleryList,
                      ]);
                      setNewPhotoTitle("");
                      triggerSaveNotification(`Photo "${newPhotoTitle}" added to ${newPhotoCategory}!`);
                    }}
                    className="h-10 rounded-xl bg-[#01A5E1] text-white font-bold text-xs hover:bg-[#008ec4] transition flex items-center justify-center gap-1.5"
                  >
                    <Plus size={15} /> Add to Album
                  </button>
                </div>
              </div>

              {/* Gallery Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {["All Albums", "Water Park", "Resort & Suites", "Weddings & Banquets", "Carnival Joyrides", "Buffet Dining"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setGalleryFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap ${
                      galleryFilter === cat
                        ? "bg-[#0E295B] text-white shadow-sm"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Photo Grid Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryList
                  .filter((g) => galleryFilter === "All Albums" || g.category === galleryFilter)
                  .map((photo) => (
                    <div
                      key={photo.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                        <img
                          src={photo.image}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#0E295B]/85 text-white backdrop-blur">
                          {photo.category}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setGalleryList(galleryList.filter((x) => x.id !== photo.id));
                            triggerSaveNotification(`Photo "${photo.title}" deleted.`);
                          }}
                          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-600/90 text-white flex items-center justify-center hover:bg-red-700 shadow"
                          title="Delete Photo"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <div className="p-3">
                        <div className="font-extrabold text-xs text-[#0E295B] truncate">{photo.title}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-0.5 truncate">{photo.image}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: STAY PACKAGES
              ========================================================================= */}
          {currentSection === "packages" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Stay Packages & Combos Controller</h2>
                  <p className="text-xs text-gray-500">Configure all-inclusive staycation deals, meal plans, water park inclusions & seasonal promotions.</p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerSaveNotification("All package tariffs & inclusions updated live!")}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Save Packages
                </button>
              </div>

              {/* Package Summary KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Deals</div>
                  <div className="text-2xl font-extrabold text-[#0E295B] mt-1">{packageList.filter(p => p.active).length} Packages</div>
                  <div className="text-[11px] text-gray-500 font-medium">Published on booking portal</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Month Bookings</div>
                  <div className="text-2xl font-extrabold text-[#F68734] mt-1">97 Reservations</div>
                  <div className="text-[11px] text-emerald-600 font-bold">↑ +24% vs last month</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Top-Selling Package</div>
                  <div className="text-base font-extrabold text-purple-700 mt-1 truncate">Day Outing Picnic</div>
                  <div className="text-[11px] text-gray-500 font-medium">48 Bookings (49%)</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Avg. Package Value</div>
                  <div className="text-2xl font-extrabold text-emerald-600 mt-1">₹7,450</div>
                  <div className="text-[11px] text-emerald-600 font-medium">High margin combo</div>
                </div>
              </div>

              {/* Add New Package Form */}
              <div className="bg-purple-50/70 border border-purple-200 p-5 rounded-2xl space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-purple-950 flex items-center gap-2">
                  <Plus size={15} /> Create New Staycation Package / Combo Deal
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Package Name (e.g. Monsoon Escape)"
                    value={newPkgName}
                    onChange={(e) => setNewPkgName(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-purple-300 text-xs font-medium bg-white"
                  />
                  <input
                    type="number"
                    placeholder="Rate per Night (₹)"
                    value={newPkgPrice}
                    onChange={(e) => setNewPkgPrice(Number(e.target.value))}
                    className="h-10 px-3 rounded-xl border border-purple-300 text-xs font-bold text-[#F68734] bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Badge Tag (e.g. Monsoon Special)"
                    value={newPkgTag}
                    onChange={(e) => setNewPkgTag(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-purple-300 text-xs font-medium bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Validity (e.g. Valid Till 31 Oct)"
                    value={newPkgValidity}
                    onChange={(e) => setNewPkgValidity(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-purple-300 text-xs font-medium bg-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Inclusions comma separated (e.g. 21 Slides, Breakfast, Hi-Tea)"
                    value={newPkgIncludes}
                    onChange={(e) => setNewPkgIncludes(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-purple-300 text-xs font-medium bg-white sm:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="Short Description..."
                    value={newPkgDesc}
                    onChange={(e) => setNewPkgDesc(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-purple-300 text-xs font-medium bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!newPkgName) return;
                    setPackageList([
                      {
                        id: String(Date.now()),
                        name: newPkgName,
                        price: newPkgPrice,
                        tag: newPkgTag,
                        desc: newPkgDesc || "Complete staycation package with all park access, pure veg dining and luxury comforts.",
                        includes: newPkgIncludes.split(",").map(s => s.trim()).filter(Boolean),
                        validity: newPkgValidity,
                        bookings: 0,
                        image: "/images/room_deluxe.jpg",
                        active: true,
                      },
                      ...packageList,
                    ]);
                    setNewPkgName("");
                    setNewPkgDesc("");
                    triggerSaveNotification(`Package "${newPkgName}" created and live on website!`);
                  }}
                  className="h-10 px-6 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 transition flex items-center gap-1.5"
                >
                  <Plus size={15} /> Publish Package Deal
                </button>
              </div>

              {/* Detailed Packages List */}
              <div className="space-y-4">
                {packageList.map((pkg, idx) => (
                  <div key={pkg.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div className="flex items-start gap-4">
                      <img
                        src={pkg.image}
                        alt={pkg.name}
                        className="w-24 h-24 rounded-xl object-cover shrink-0 hidden sm:block border border-gray-100"
                      />
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-extrabold text-[#0E295B] text-base">{pkg.name}</h4>
                          <span className="text-[10px] font-extrabold uppercase bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full">{pkg.tag}</span>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {pkg.validity}
                          </span>
                          <span className="text-[10px] font-bold text-[#F68734] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                            🔥 {pkg.bookings} Bookings
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{pkg.desc}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {pkg.includes.map((inc) => (
                            <span key={inc} className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100 flex items-center gap-1">
                              ✓ {inc}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100 justify-between md:justify-end">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase">Package Rate (₹)</label>
                        <input
                          type="number"
                          value={pkg.price}
                          onChange={(e) => {
                            const updated = [...packageList];
                            updated[idx].price = Number(e.target.value);
                            setPackageList(updated);
                          }}
                          className="w-28 h-10 px-3 rounded-xl border border-gray-300 font-extrabold text-xs text-purple-700 block"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...packageList];
                          updated[idx].active = !updated[idx].active;
                          setPackageList(updated);
                          triggerSaveNotification(`Package status changed to ${updated[idx].active ? "Active" : "Paused"}`);
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold uppercase transition ${
                          pkg.active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {pkg.active ? "🟢 Active" : "⏸ Paused"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPackageList(packageList.filter((x) => x.id !== pkg.id));
                          triggerSaveNotification(`Package "${pkg.name}" deleted.`);
                        }}
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50"
                        title="Delete Package"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: FAQ MANAGER
              ========================================================================= */}
          {currentSection === "faqs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">FAQ & Help Center Manager</h2>
                  <p className="text-xs text-gray-500">Add, edit and organize visitor questions, park rules and dress code guidelines.</p>
                </div>
              </div>

              {/* Add FAQ Form */}
              <div className="bg-purple-50/70 border border-purple-200 p-5 rounded-2xl space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-purple-950 flex items-center gap-2">
                  <Plus size={15} /> Add New FAQ Item
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Question (e.g. Is outside food allowed?)"
                    value={newFaqQ}
                    onChange={(e) => setNewFaqQ(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-purple-300 text-xs font-medium bg-white sm:col-span-2"
                  />
                  <select
                    value={newFaqCat}
                    onChange={(e) => setNewFaqCat(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-purple-300 text-xs font-bold bg-white"
                  >
                    <option>General</option>
                    <option>Water Park</option>
                    <option>Room Stay</option>
                    <option>Dining & Food</option>
                  </select>
                </div>
                <textarea
                  rows={2}
                  placeholder="Answer text..."
                  value={newFaqA}
                  onChange={(e) => setNewFaqA(e.target.value)}
                  className="w-full p-3 rounded-xl border border-purple-300 text-xs font-medium bg-white"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!newFaqQ || !newFaqA) return;
                    setFaqList([{ id: String(Date.now()), question: newFaqQ, answer: newFaqA, category: newFaqCat }, ...faqList]);
                    setNewFaqQ("");
                    setNewFaqA("");
                    triggerSaveNotification("FAQ item added and published!");
                  }}
                  className="h-10 px-6 rounded-xl bg-purple-700 text-white font-bold text-xs hover:bg-purple-800 transition"
                >
                  + Add FAQ Question
                </button>
              </div>

              {/* FAQ List */}
              <div className="space-y-3">
                {faqList.map((faq) => (
                  <div key={faq.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2 relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold uppercase bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                          {faq.category}
                        </span>
                        <h4 className="font-extrabold text-[#0E295B] text-sm">{faq.question}</h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFaqList(faqList.filter((x) => x.id !== faq.id));
                          triggerSaveNotification("FAQ deleted.");
                        }}
                        className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: BLOGS & ARTICLES
              ========================================================================= */}
          {currentSection === "blogs" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Blogs & Travel Guides CMS</h2>
                  <p className="text-xs text-gray-500">Publish articles, travel guides, weekend trip tips & wedding venue insights.</p>
                </div>
              </div>

              {/* Add Blog Form */}
              <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-2">
                  <Plus size={15} /> Publish New Blog Post
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Article Headline / Title"
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-emerald-300 text-xs font-medium bg-white sm:col-span-2"
                  />
                  <select
                    value={newBlogCategory}
                    onChange={(e) => setNewBlogCategory(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-emerald-300 text-xs font-bold bg-white"
                  >
                    <option>Travel Guide</option>
                    <option>Resort Stay</option>
                    <option>Water Adventure</option>
                    <option>Wedding Planning</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!newBlogTitle) return;
                    setBlogList([
                      {
                        id: String(Date.now()),
                        title: newBlogTitle,
                        category: newBlogCategory,
                        date: new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
                        readTime: "4 min read",
                      },
                      ...blogList,
                    ]);
                    setNewBlogTitle("");
                    triggerSaveNotification(`Blog "${newBlogTitle}" published live!`);
                  }}
                  className="h-10 px-6 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition"
                >
                  Publish Article
                </button>
              </div>

              {/* Blog Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogList.map((b) => (
                  <div key={b.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold mb-1.5">
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-extrabold uppercase">{b.category}</span>
                        <span>{b.date} · {b.readTime}</span>
                      </div>
                      <h4 className="font-extrabold text-[#0E295B] text-sm leading-snug">{b.title}</h4>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xs font-bold text-emerald-600">Published Live</span>
                      <button
                        type="button"
                        onClick={() => {
                          setBlogList(blogList.filter((x) => x.id !== b.id));
                          triggerSaveNotification("Article deleted.");
                        }}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: CAREERS & VACANCIES
              ========================================================================= */}
          {currentSection === "careers" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Careers & Talent Acquisition Controller</h2>
                  <p className="text-xs text-gray-500">Post open positions, manage job requirements & review candidate applicant pipelines in real-time.</p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerSaveNotification("Career openings synced with public careers portal!")}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Publish Openings
                </button>
              </div>

              {/* HR Pipeline Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active Openings</div>
                  <div className="text-2xl font-extrabold text-[#0E295B] mt-1">{vacanciesList.filter(v => v.active).length} Roles</div>
                  <div className="text-[11px] text-gray-500 font-medium">Out of {vacanciesList.length} total vacancies</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Resumes Received</div>
                  <div className="text-2xl font-extrabold text-[#F68734] mt-1">{applicationsList.length} Applicants</div>
                  <div className="text-[11px] text-emerald-600 font-bold">Stored in HR Portal</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Shortlisted</div>
                  <div className="text-2xl font-extrabold text-purple-600 mt-1">
                    {applicationsList.filter(a => a.status === "Shortlisted").length} Candidates
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">Ready for HR interview</div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">HR Email Notification</div>
                  <div className="text-sm font-extrabold text-emerald-600 mt-1">Active (hr@aapnoghar.com)</div>
                  <div className="text-[11px] text-emerald-600 font-medium">Instant alert on submission</div>
                </div>
              </div>

              {/* Add New Job Form */}
              <div className="bg-blue-50/70 border border-blue-200 p-5 rounded-2xl space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-[#0E295B] flex items-center gap-2">
                  <Plus size={15} /> Post New Job Vacancy
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Job Title (e.g. F&B Captain)"
                    value={newJobTitle}
                    onChange={(e) => setNewJobTitle(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-blue-300 text-xs font-medium bg-white"
                  />
                  <select
                    value={newJobDept}
                    onChange={(e) => setNewJobDept(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-blue-300 text-xs font-bold bg-white text-[#0E295B]"
                  >
                    <option>Hospitality & Front Desk</option>
                    <option>Food & Beverage</option>
                    <option>Park Safety Operations</option>
                    <option>Events & Weddings</option>
                    <option>Engineering & Maintenance</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Location (e.g. Gurugram, HR)"
                    value={newJobLoc}
                    onChange={(e) => setNewJobLoc(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-blue-300 text-xs font-medium bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Salary (e.g. ₹3.5–5.0 LPA)"
                    value={newJobSalary}
                    onChange={(e) => setNewJobSalary(e.target.value)}
                    className="h-10 px-3 rounded-xl border border-blue-300 text-xs font-medium bg-white"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <textarea
                    rows={2}
                    placeholder="Short Description of role..."
                    value={newJobDesc}
                    onChange={(e) => setNewJobDesc(e.target.value)}
                    className="p-3 rounded-xl border border-blue-300 text-xs font-medium bg-white"
                  />
                  <textarea
                    rows={2}
                    placeholder="Requirements (one per line)..."
                    value={newJobReqs}
                    onChange={(e) => setNewJobReqs(e.target.value)}
                    className="p-3 rounded-xl border border-blue-300 text-xs font-medium bg-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!newJobTitle || !newJobDesc) return;
                    const reqArray = newJobReqs.split("\n").map(r => r.trim()).filter(Boolean);
                    const newVac: JobVacancy = {
                      id: `job-${Date.now()}`,
                      title: newJobTitle,
                      dept: newJobDept,
                      location: newJobLoc,
                      type: newJobType,
                      salary: newJobSalary,
                      desc: newJobDesc,
                      reqs: reqArray.length > 0 ? reqArray : ["Relevant experience in hospitality domain"],
                      active: true,
                    };
                    const updated = [newVac, ...vacanciesList];
                    setVacanciesList(updated);
                    saveJobVacancies(updated);
                    setNewJobTitle("");
                    setNewJobDesc("");
                    triggerSaveNotification(`Job Vacancy "${newJobTitle}" published live to Careers page!`);
                  }}
                  className="h-10 px-6 rounded-xl bg-[#0E295B] text-white font-bold text-xs hover:bg-[#1a448d] transition flex items-center gap-1.5"
                >
                  <Plus size={15} /> Publish Vacancy Live
                </button>
              </div>

              {/* Active & Closed Openings List */}
              <div className="space-y-3">
                <h3 className="text-sm font-extrabold text-[#0E295B] uppercase tracking-wider">
                  Managed Job Openings ({vacanciesList.length})
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {vacanciesList.map((job) => (
                    <div key={job.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            {job.dept}
                          </span>
                          {job.salary && (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {job.salary}
                            </span>
                          )}
                          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            job.active ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700"
                          }`}>
                            {job.active ? "🟢 Active Opening" : "🔴 Closed / Expired"}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-[#0E295B] text-base">{job.title}</h4>
                        <p className="text-xs text-gray-500 font-medium">{job.desc}</p>
                        <div className="text-[11px] text-gray-400">
                          <strong>Requirements:</strong> {job.reqs.join(" • ")}
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = vacanciesList.map(v => v.id === job.id ? { ...v, active: !v.active } : v);
                            setVacanciesList(updated);
                            saveJobVacancies(updated);
                            triggerSaveNotification(`Vacancy "${job.title}" is now ${!job.active ? "Active" : "Closed"}`);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                            job.active
                              ? "bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100"
                              : "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                          }`}
                        >
                          {job.active ? "Close Vacancy" : "Reopen Vacancy"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = vacanciesList.filter(v => v.id !== job.id);
                            setVacanciesList(updated);
                            saveJobVacancies(updated);
                            triggerSaveNotification(`Vacancy "${job.title}" removed.`);
                          }}
                          className="text-red-500 hover:text-red-700 p-2 rounded-xl hover:bg-red-50"
                          title="Delete Job Opening"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidate Applications Review CRM Table */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden space-y-3 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-extrabold text-[#0E295B]">Candidate Applications Store (HR Portal)</h3>
                    <p className="text-xs text-gray-500">Live resume submissions from website careers page. HR receives instant notification.</p>
                  </div>
                  <span className="text-xs font-bold text-[#01A5E1] bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                    {applicationsList.length} Total Applicants Logged
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-bold text-[11px]">
                      <tr>
                        <th className="p-3.5">App ID</th>
                        <th className="p-3.5">Candidate Name</th>
                        <th className="p-3.5">Applied Position</th>
                        <th className="p-3.5">Contact Details</th>
                        <th className="p-3.5">Resume File</th>
                        <th className="p-3.5">Applied Date</th>
                        <th className="p-3.5">Application Status</th>
                        <th className="p-3.5">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {applicationsList.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50">
                          <td className="p-3.5 font-mono font-bold text-gray-400">{app.id}</td>
                          <td className="p-3.5 font-extrabold text-[#0E295B]">{app.applicantName}</td>
                          <td className="p-3.5 text-gray-700 font-semibold">{app.jobTitle}</td>
                          <td className="p-3.5 text-gray-600">
                            <div className="font-mono">{app.phone}</div>
                            <div className="text-[11px] text-gray-400">{app.email}</div>
                          </td>
                          <td className="p-3.5">
                            <span
                              onClick={() => triggerSaveNotification(`Downloading ${app.resumeFileName} for ${app.applicantName}...`)}
                              className="text-xs font-bold text-[#01A5E1] hover:underline cursor-pointer flex items-center gap-1"
                            >
                              📄 {app.resumeFileName}
                            </span>
                          </td>
                          <td className="p-3.5 text-gray-500">{app.appliedDate}</td>
                          <td className="p-3.5">
                            <select
                              value={app.status}
                              onChange={(e) => {
                                const updated = applicationsList.map(a => a.id === app.id ? { ...a, status: e.target.value as any } : a);
                                setApplicationsList(updated);
                                saveJobApplications(updated);
                                triggerSaveNotification(`Candidate ${app.applicantName} status set to "${e.target.value}"`);
                              }}
                              className={`h-8 px-2 rounded-lg border text-xs font-bold bg-white ${
                                app.status === "Shortlisted" ? "border-emerald-400 text-emerald-700" :
                                app.status === "New" ? "border-blue-400 text-blue-700" :
                                app.status === "Under Review" ? "border-amber-400 text-amber-700" :
                                "border-red-300 text-red-500"
                              }`}
                            >
                              <option>New</option>
                              <option>Under Review</option>
                              <option>Shortlisted</option>
                              <option>Rejected</option>
                            </select>
                          </td>
                          <td className="p-3.5">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = applicationsList.filter(a => a.id !== app.id);
                                setApplicationsList(updated);
                                saveJobApplications(updated);
                                triggerSaveNotification(`Application ${app.id} removed.`);
                              }}
                              className="text-red-500 hover:text-red-700 p-1.5 rounded-lg hover:bg-red-50"
                              title="Delete Application"
                            >
                              <Trash2 size={15} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {applicationsList.length === 0 && (
                    <div className="p-10 text-center text-gray-400 text-xs font-bold">No job applications logged yet.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: HOMEPAGE SECTIONS BUILDER
              ========================================================================= */}
          {currentSection === "homepage" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Homepage Sections Builder</h2>
                  <p className="text-xs text-gray-500">Enable, disable and reorder visual storytelling sections on the homepage.</p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerSaveNotification("Homepage layout configuration saved!")}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Save Layout
                </button>
              </div>

              <div className="space-y-3">
                {homepageBlocks.map((blk, idx) => (
                  <div key={blk.id} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <h4 className="font-extrabold text-[#0E295B] text-sm">{blk.name}</h4>
                        <p className="text-xs text-gray-400 font-mono">{blk.id}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...homepageBlocks];
                        updated[idx].enabled = !updated[idx].enabled;
                        setHomepageBlocks(updated);
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-extrabold uppercase transition ${
                        blk.enabled ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {blk.enabled ? "✓ Visible on Site" : "✕ Hidden"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: AVAILABILITY & BLACKOUT
              ========================================================================= */}
          {currentSection === "availability" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Availability & Blackout Dates</h2>
                  <p className="text-xs text-gray-500">Block private buyout dates, festival surges & wedding season locks.</p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerSaveNotification("Availability calendar synced with Axis Channel Partner!")}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Update Calendar
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-red-50 border border-red-200 space-y-1">
                    <div className="text-xs font-bold text-red-800 uppercase">Locked Private Event</div>
                    <div className="text-sm font-extrabold text-[#0E295B]">18 Nov 2026</div>
                    <div className="text-xs text-gray-500">Mega Royal Wedding (All 67 Rooms)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1">
                    <div className="text-xs font-bold text-amber-800 uppercase">Weekend Surge +20%</div>
                    <div className="text-sm font-extrabold text-[#0E295B]">Every Saturday & Sunday</div>
                    <div className="text-xs text-gray-500">High-demand dynamic yield</div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <div className="text-xs font-bold text-emerald-800 uppercase">Axis Real-Time Push</div>
                    <div className="text-sm font-extrabold text-emerald-700">Online 24/7</div>
                    <div className="text-xs text-gray-500">Instant OTA lock on booking</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              SECTION: PAGES & CONTENT CMS
              ========================================================================= */}
          {currentSection === "pages" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold font-display">Page Content & Copy CMS</h2>
                  <p className="text-xs text-gray-500">Edit titles, headings and promotional badges across all 16 website routes.</p>
                </div>
                <button
                  type="button"
                  onClick={() => triggerSaveNotification("Page content updates published live!")}
                  className="px-5 py-2.5 rounded-xl bg-[#0E295B] text-white text-xs font-bold shadow-md hover:bg-[#1a448d] flex items-center gap-1.5"
                >
                  <Save size={14} /> Publish Content
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Homepage Hero Headline</label>
                    <input
                      type="text"
                      defaultValue="The city of joy, made for celebration."
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-[#0E295B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">Water Park Tagline</label>
                    <input
                      type="text"
                      defaultValue="21 Thrill Water Slides & Mega Wave Pool"
                      className="w-full h-11 px-3.5 rounded-xl border border-gray-300 text-xs font-bold text-[#0E295B]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function formatPrice(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}
