import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { trackEvent, initAnalyticsScripts } from "@/lib/analytics";
import {
  ChevronDown,
  ChevronRight,
  Phone,
  MessageCircle,
  Menu,
  X,
  Calculator,
  Film,
  CalendarDays,
  User,
  LogOut,
  Waves,
  BedDouble,
  Sparkles,
  Utensils,
  Tag,
  Image as ImageIcon,
  Info,
  MapPin,
  BookOpen,
  HelpCircle,
  Briefcase,
  Compass,
  PartyPopper,
  Users
} from "lucide-react";

export type SiteHeaderProps = {
  onOpenBooking?: (intent: string) => void;
  onScrollTo?: (target: string) => void;
};

export function SiteHeader({ onOpenBooking, onScrollTo }: SiteHeaderProps) {
  const [location, setLocation] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDrawerAcc, setOpenDrawerAcc] = useState<string | null>(null);
  const [agUser, setAgUser] = useState<{ name: string; email: string } | null>(null);

  // Initialize Analytics & UTM Capture on mount
  useEffect(() => {
    initAnalyticsScripts();
  }, []);

  // Read user session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("ag_user");
    if (stored) {
      try { setAgUser(JSON.parse(stored)); } catch { setAgUser(null); }
    }
  }, [location]); // re-check on route change

  const handleLogout = () => {
    localStorage.removeItem("ag_user");
    setAgUser(null);
    setIsMenuOpen(false);
    setLocation("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Block page scroll when mobile drawer is open — directly stop/start Lenis
  useEffect(() => {
    if (isMenuOpen) {
      // Stop Lenis smooth scroll engine so page cannot scroll
      window.__ls?.stop?.();
    } else {
      // Resume Lenis when drawer closes
      window.__ls?.start?.();
    }
    return () => {
      // Always restore on unmount
      window.__ls?.start?.();
    };
  }, [isMenuOpen]);

  const handleNavClick = (sectionId: string) => {
    setIsMenuOpen(false);
    if (location === "/") {
      if (onScrollTo) {
        onScrollTo(sectionId);
      } else {
        const el = document.getElementById(sectionId) || document.querySelector(`[data-section="${sectionId}"]`);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleOpenBooking = (intent: string) => {
    setIsMenuOpen(false);
    trackEvent("whatsapp_click", { intent, location: "header_drawer" });
    if (onOpenBooking) {
      onOpenBooking(intent);
    } else {
      window.open(
        `https://wa.me/917666779997?text=${encodeURIComponent(`Hi AapnoGhar, I would like to inquire about: ${intent}`)}`,
        "_blank"
      );
    }
  };

  const shouldBeSolid = isScrolled;

  return (
    <>
      <header className={`site-header ${shouldBeSolid ? "site-header--scrolled" : ""}`}>
        {/* Brand Logo */}
        <Link href="/" className="brand py-1" aria-label="AapnoGhar Resort Home">
          <img
            src="/images/logo.png"
            alt="AapnoGhar Resort"
            className="h-[52px] sm:h-[58px] md:h-[62px] lg:h-[68px] max-w-[260px] w-auto object-contain drop-shadow-sm transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Primary navigation">
          {/* Home */}
          <button
            type="button"
            onClick={() => setLocation("/")}
            className={`flex items-center gap-1.5 ${location === "/" ? "nav-active" : ""}`}
          >
            Home
          </button>

          {/* Experiences Dropdown */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              onClick={() => setLocation("/water-park")}
              className="flex items-center gap-1.5"
            >
              <span>Experiences</span>
              <ChevronDown size={13} className="opacity-75 shrink-0" />
            </button>
            <div className="nav-dropdown-menu">
              <div className="nav-dropdown-header">Park Zones</div>
              <button type="button" onClick={() => setLocation("/water-park")}>
                🌊 Water Park (21 Slides &amp; Wave Pool)
              </button>
              <button type="button" onClick={() => setLocation("/amusement-park")}>
                🎢 Amusement Joyrides (20+ Rides)
              </button>
              <button type="button" onClick={() => setLocation("/adventure-park")}>
                🧗 Adventure &amp; Activity Park
              </button>
            </div>
          </div>

          {/* Stay Dropdown */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              onClick={() => setLocation("/rooms")}
              className="flex items-center gap-1.5"
            >
              <span>Stay</span>
              <ChevronDown size={13} className="opacity-75 shrink-0" />
            </button>
            <div className="nav-dropdown-menu">
              <div className="nav-dropdown-header">Resort Accommodations</div>
              <button type="button" onClick={() => setLocation("/rooms")}>
                ✨ All Rooms &amp; Suites Overview
              </button>
              <button type="button" onClick={() => setLocation("/stay-packages")}>
                🎁 Staycation &amp; Daycation Bundles
              </button>
              <div className="nav-dropdown-header" style={{marginTop:"8px"}}>Individual Rooms</div>
              <button type="button" onClick={() => setLocation("/deluxe-room")}>
                Deluxe Room
              </button>
              <button type="button" onClick={() => setLocation("/luxury-room")}>
                Luxury Room
              </button>
              <button type="button" onClick={() => setLocation("/luxury-room-2")}>
                Luxury Room 2
              </button>
              <button type="button" onClick={() => setLocation("/Luxury-Room-with-Shower-Glass-Partition")}>
                Luxury Room (Shower Glass)
              </button>
              <button type="button" onClick={() => setLocation("/suite-room")}>
                Executive Suite Room
              </button>
              <button type="button" onClick={() => setLocation("/presidential-suite-room-1")}>
                Presidential Suite — Gurgaon
              </button>
              <button type="button" onClick={() => setLocation("/presidential-suite-room-2")}>
                Presidential Suite — Delhi NCR
              </button>
            </div>
          </div>

          {/* Weddings & Events Dropdown */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              onClick={() => setLocation("/weddings-banquets")}
              className="flex items-center gap-1.5"
            >
              <span>Weddings &amp; Events</span>
              <ChevronDown size={13} className="opacity-75 shrink-0" />
            </button>
            <div className="nav-dropdown-menu">
              <div className="nav-dropdown-header">Event Venues</div>
              <button type="button" onClick={() => setLocation("/weddings-banquets")}>
                💒 Destination Weddings &amp; Lawns
              </button>
              <button type="button" onClick={() => setLocation("/corporate-events")}>
                💼 Corporate Offsites &amp; Conferences
              </button>
              <button type="button" onClick={() => setLocation("/school-picnic-group-packages")}>
                🚌 School Picnics &amp; Group Outings
              </button>
            </div>
          </div>

          {/* Dining — Direct Link */}
          <button
            type="button"
            onClick={() => setLocation("/abhipriti-restaurant")}
            className="flex items-center gap-1.5"
          >
            Dining
          </button>

          {/* Packages — Direct Link */}
          <button
            type="button"
            onClick={() => setLocation("/packages-offers")}
            className="flex items-center gap-1.5"
          >
            Packages
          </button>

          {/* Gallery — Direct Link */}
          <button
            type="button"
            onClick={() => setLocation("/gallery")}
            className="flex items-center gap-1.5"
          >
            Gallery
          </button>

          {/* About — Direct Link */}
          <button
            type="button"
            onClick={() => setLocation("/about-us")}
            className="flex items-center gap-1.5"
          >
            About
          </button>

          {/* Contact — Direct Link */}
          <button
            type="button"
            onClick={() => setLocation("/contact-us")}
            className="flex items-center gap-1.5"
          >
            Contact
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          {agUser ? (
            <button
              type="button"
              onClick={() => setLocation(agUser.email === "admin@aapnoghar.com" || agUser.name.toLowerCase().includes("admin") ? "/admin" : "/booking")}
              className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold transition cursor-pointer"
              title="Click to open Dashboard"
            >
              <div className="w-6 h-6 rounded-full bg-[#F68734] text-white flex items-center justify-center font-extrabold text-xs shadow">
                {agUser.name.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline capitalize">{agUser.name}</span>
              {(agUser.email === "admin@aapnoghar.com" || agUser.name.toLowerCase().includes("admin")) && (
                <span className="text-[10px] bg-amber-400 text-[#0E295B] font-extrabold px-1.5 py-0.2 rounded">CMS</span>
              )}
            </button>
          ) : (
            <button
              className="button button--outline-nav"
              type="button"
              onClick={() => setLocation("/login")}
            >
              <User size={15} /> Login
            </button>
          )}
          <button
            className="button button--coral button--header"
            type="button"
            onClick={() => {
              trackEvent("book_now_click", { location: "header_cta" });
              setLocation("/booking");
            }}
          >
            <CalendarDays size={16} /> Book Now
          </button>

          {/* Mobile Drawer Trigger */}
          <button
            className="icon-button menu-toggle"
            type="button"
            aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Drawer Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[55] transition-opacity"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Luxury Mobile Navigation Drawer */}
      <div
        data-mobile-drawer
        className={`fixed top-0 right-0 bottom-0 w-[90vw] max-w-[380px] bg-[#061A33] text-white z-[60] shadow-2xl flex flex-col transition-transform duration-300 ease-out border-l border-white/10 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="px-4 py-3 h-16 border-b border-white/10 flex items-center justify-between bg-[#0A1E29]/90 backdrop-blur-md shrink-0">
          <button
            type="button"
            onClick={() => { setIsMenuOpen(false); setLocation("/"); }}
            className="flex items-center gap-2 cursor-pointer text-left shrink-0"
          >
            <img
              src="/images/logo.png"
              alt="AapnoGhar Resort"
              style={{ height: "38px", maxHeight: "38px", width: "auto", objectFit: "contain" }}
              className="h-[38px] w-auto max-h-[38px] object-contain block drop-shadow-sm"
            />
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          
          {/* Quick Home Link */}
          <button
            type="button"
            onClick={() => { setIsMenuOpen(false); setLocation("/"); }}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition text-sm font-bold ${
              location === "/" ? "bg-[#FFA96B]/20 text-[#FFA96B] border border-[#FFA96B]/30" : "bg-white/5 hover:bg-white/10 text-white/90"
            }`}
          >
            <span>🏰 Resort Home</span>
            <ChevronRight size={16} className="text-white/40" />
          </button>

          {/* Experiences Accordion */}
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center justify-between p-3.5 text-left text-sm font-bold text-white hover:bg-white/5 transition"
              onClick={() => setOpenDrawerAcc(openDrawerAcc === "experiences" ? null : "experiences")}
            >
              <div className="flex items-center gap-2.5">
                <Waves size={16} className="text-[#01A5E1]" />
                <span>Experiences &amp; Parks</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-white/50 transition-transform duration-200 ${
                  openDrawerAcc === "experiences" ? "rotate-180 text-[#FFA96B]" : ""
                }`}
              />
            </button>
            {openDrawerAcc === "experiences" && (
              <div className="p-2 space-y-1 bg-black/20 border-t border-white/10 text-xs">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition text-left"
                  onClick={() => { setIsMenuOpen(false); setLocation("/water-park"); }}
                >
                  <Waves size={14} className="text-[#01A5E1]" />
                  <span>Water Park (21+ Thrill Slides)</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition text-left"
                  onClick={() => { setIsMenuOpen(false); setLocation("/amusement-park"); }}
                >
                  <Sparkles size={14} className="text-[#FFA96B]" />
                  <span>Amusement Joyrides (20+ Rides)</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition text-left"
                  onClick={() => { setIsMenuOpen(false); setLocation("/adventure-park"); }}
                >
                  <Compass size={14} className="text-emerald-400" />
                  <span>Adventure &amp; Rope Obstacle Zone</span>
                </button>
              </div>
            )}
          </div>

          {/* Stay & Rooms Accordion */}
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center justify-between p-3.5 text-left text-sm font-bold text-white hover:bg-white/5 transition"
              onClick={() => setOpenDrawerAcc(openDrawerAcc === "stay" ? null : "stay")}
            >
              <div className="flex items-center gap-2.5">
                <BedDouble size={16} className="text-[#FFA96B]" />
                <span>Stay &amp; Accommodations</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-white/50 transition-transform duration-200 ${
                  openDrawerAcc === "stay" ? "rotate-180 text-[#FFA96B]" : ""
                }`}
              />
            </button>
            {openDrawerAcc === "stay" && (
              <div className="p-2 space-y-1 bg-black/20 border-t border-white/10 text-xs">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition text-left font-bold"
                  onClick={() => { setIsMenuOpen(false); setLocation("/rooms"); }}
                >
                  <Sparkles size={14} className="text-[#FFA96B]" />
                  <span>All Rooms &amp; Suites Overview</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition text-left font-bold"
                  onClick={() => { setIsMenuOpen(false); setLocation("/stay-packages"); }}
                >
                  <Tag size={14} className="text-[#01A5E1]" />
                  <span>Staycation &amp; Daycation Bundles</span>
                </button>
                <div className="pt-1.5 pb-1 px-2.5 text-[10px] font-extrabold uppercase tracking-widest text-white/40">
                  Individual Suites
                </div>
                <button
                  type="button"
                  className="w-full p-2 pl-4 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition text-left"
                  onClick={() => { setIsMenuOpen(false); setLocation("/presidential-suite-room-1"); }}
                >
                  👑 Presidential Suite — Gurgaon
                </button>
                <button
                  type="button"
                  className="w-full p-2 pl-4 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition text-left"
                  onClick={() => { setIsMenuOpen(false); setLocation("/presidential-suite-room-2"); }}
                >
                  👑 Presidential Suite — Delhi NCR
                </button>
                <button
                  type="button"
                  className="w-full p-2 pl-4 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition text-left"
                  onClick={() => { setIsMenuOpen(false); setLocation("/suite-room"); }}
                >
                  ✨ Executive Suite Room
                </button>
                <button
                  type="button"
                  className="w-full p-2 pl-4 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition text-left"
                  onClick={() => { setIsMenuOpen(false); setLocation("/luxury-room"); }}
                >
                  🌿 Luxury Room
                </button>
                <button
                  type="button"
                  className="w-full p-2 pl-4 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition text-left"
                  onClick={() => { setIsMenuOpen(false); setLocation("/deluxe-room"); }}
                >
                  🛏️ Deluxe Room
                </button>
              </div>
            )}
          </div>

          {/* Weddings & Events Accordion */}
          <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center justify-between p-3.5 text-left text-sm font-bold text-white hover:bg-white/5 transition"
              onClick={() => setOpenDrawerAcc(openDrawerAcc === "venues" ? null : "venues")}
            >
              <div className="flex items-center gap-2.5">
                <PartyPopper size={16} className="text-pink-400" />
                <span>Weddings &amp; Celebrations</span>
              </div>
              <ChevronDown
                size={16}
                className={`text-white/50 transition-transform duration-200 ${
                  openDrawerAcc === "venues" ? "rotate-180 text-[#FFA96B]" : ""
                }`}
              />
            </button>
            {openDrawerAcc === "venues" && (
              <div className="p-2 space-y-1 bg-black/20 border-t border-white/10 text-xs">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition text-left"
                  onClick={() => { setIsMenuOpen(false); setLocation("/weddings-banquets"); }}
                >
                  <PartyPopper size={14} className="text-pink-400" />
                  <span>Weddings &amp; Banquets (4 Venues)</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition text-left"
                  onClick={() => { setIsMenuOpen(false); setLocation("/corporate-events"); }}
                >
                  <Briefcase size={14} className="text-sky-400" />
                  <span>Corporate Offsites &amp; Summits</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 p-2.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition text-left"
                  onClick={() => { setIsMenuOpen(false); setLocation("/school-picnic-group-packages"); }}
                >
                  <Users size={14} className="text-amber-400" />
                  <span>School &amp; College Excursions</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {[
              { label: "Dining & Buffet", href: "/abhipriti-restaurant", icon: <Utensils size={14} className="text-[#FFA96B]" /> },
              { label: "Offers & Deals", href: "/packages-offers", icon: <Tag size={14} className="text-[#01A5E1]" /> },
              { label: "Media Gallery", href: "/gallery", icon: <ImageIcon size={14} className="text-emerald-400" /> },
              { label: "About Resort", href: "/about-us", icon: <Info size={14} className="text-amber-300" /> },
              { label: "Contact Us", href: "/contact-us", icon: <MapPin size={14} className="text-rose-400" /> },
              { label: "Travel Blog", href: "/blog", icon: <BookOpen size={14} className="text-purple-400" /> },
              { label: "FAQs & Rules", href: "/faqs", icon: <HelpCircle size={14} className="text-sky-400" /> },
              { label: "Careers", href: "/careers", icon: <Briefcase size={14} className="text-teal-400" /> },
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => { setIsMenuOpen(false); setLocation(item.href); }}
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition text-left text-xs font-semibold text-white/80 hover:text-white"
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Drawer Action Deck Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0A1E29]/90 backdrop-blur-md space-y-3">
          <a
            href="tel:+917666779997"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs transition"
          >
            <Phone size={14} className="text-[#FFA96B]" />
            <span>+91 7666 779 997 (24/7 Desk)</span>
          </a>

          {agUser ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#F68734] text-white flex items-center justify-center font-extrabold text-xs">
                    {agUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{agUser.name}</div>
                    <div className="text-[10px] text-white/50">{agUser.email}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition"
                  title="Logout"
                >
                  <LogOut size={15} />
                </button>
              </div>

              {(agUser.email === "admin@aapnoghar.com" || agUser.name.toLowerCase().includes("admin")) && (
                <button
                  type="button"
                  onClick={() => { setIsMenuOpen(false); setLocation("/admin"); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-400 text-[#061A33] font-extrabold text-xs hover:bg-amber-300 transition shadow"
                >
                  ⚡ Open Admin CMS
                </button>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => { setIsMenuOpen(false); setLocation("/login"); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition cursor-pointer"
            >
              <User size={14} />
              <span>Login to Account</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false);
              trackEvent("book_now_click", { location: "mobile_drawer_cta" });
              setLocation("/booking");
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#FFA96B] to-[#F68734] hover:from-[#F68734] hover:to-[#D84A22] text-[#061A33] hover:text-white font-extrabold text-sm shadow-lg shadow-[#F68734]/30 transition-all cursor-pointer"
          >
            <CalendarDays size={16} />
            <span>Book Now / Check Availability →</span>
          </button>
        </div>
      </div>
    </>
  );
}
