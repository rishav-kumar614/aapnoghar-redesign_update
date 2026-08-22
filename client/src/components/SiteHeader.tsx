import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  ChevronDown,
  Phone,
  MessageCircle,
  Menu,
  X,
  Calculator,
  Film,
  CalendarDays,
  User,
  LogOut
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
    if (onOpenBooking) {
      onOpenBooking(intent);
    } else {
      window.open(
        `https://wa.me/917666779997?text=${encodeURIComponent(`Hi AapnoGhar, I would like to inquire about: ${intent}`)}`,
        "_blank"
      );
    }
  };

  const isHome = location === "/";
  const shouldBeSolid = !isHome || isScrolled;

  return (
    <>
      <header className={`site-header ${shouldBeSolid ? "site-header--scrolled" : ""}`}>
        {/* Brand Logo */}
        <Link href="/" className="brand py-1" aria-label="AapnoGhar Resort Home">
          <img
            src="/images/logo.png"
            alt="AapnoGhar Resort"
            className="h-13 sm:h-15 md:h-16 lg:h-[68px] w-auto object-contain drop-shadow-sm transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Primary navigation">
          {/* Stay Dropdown */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              onClick={() => setLocation("/rooms")}
              className="flex items-center gap-1.5"
            >
              <span>Stay &amp; Rooms</span>
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

          {/* Parks & Attractions */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              onClick={() => setLocation("/water-park")}
              className="flex items-center gap-1.5"
            >
              <span>Parks &amp; Attractions</span>
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
                🧗 Adventure &amp; Rope Course Zone
              </button>
              <button type="button" onClick={() => setLocation("/abhipriti-restaurant")}>
                🍽️ Abhipriti Restaurant &amp; Buffets
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

          {/* Offers & More Dropdown */}
          <div className="nav-dropdown-wrapper">
            <button
              type="button"
              onClick={() => setLocation("/packages-offers")}
              className="flex items-center gap-1.5"
            >
              <span>Offers &amp; More</span>
              <ChevronDown size={13} className="opacity-75 shrink-0" />
            </button>
            <div className="nav-dropdown-menu">
              <div className="nav-dropdown-header">Explore AapnoGhar</div>
              <button type="button" onClick={() => setLocation("/packages-offers")}>
                🏷️ Seasonal Packages &amp; Offers
              </button>
              <button type="button" onClick={() => setLocation("/gallery")}>
                🖼️ Media Photo &amp; Video Gallery
              </button>
              <button type="button" onClick={() => setLocation("/about-us")}>
                ℹ️ About Our Heritage
              </button>
              <button type="button" onClick={() => setLocation("/contact-us")}>
                📍 Contact Us &amp; Location Map
              </button>
              <button type="button" onClick={() => setLocation("/blog")}>
                📝 Travel Blog &amp; Guides
              </button>
              <button type="button" onClick={() => setLocation("/faqs")}>
                ❓ FAQs &amp; Park Rules
              </button>
              <button type="button" onClick={() => setLocation("/careers")}>
                💼 Careers &amp; Job Openings
              </button>
            </div>
          </div>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          <a className="phone-link" href="tel:+917666779997">
            <Phone size={15} /> <span>+91 7666 779 997</span>
          </a>
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
            onClick={() => setLocation("/booking")}
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

      {/* Drawer Backdrop Overlay — outside <header> to avoid stacking context clipping */}
      {isMenuOpen && (
        <div className="drawer-overlay" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
      )}

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-nav ${isMenuOpen ? "mobile-nav--open" : ""}`}>
          <div className="drawer-header">
            <span className="text-lg font-bold text-[#0E295B]">AapnoGhar Menu</span>
            <button type="button" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>

          <div className="drawer-accordion-list">
            {/* Stay Accordion */}
            <div className="drawer-acc-item">
              <button
                type="button"
                className="drawer-acc-header"
                onClick={() => setOpenDrawerAcc(openDrawerAcc === "stay" ? null : "stay")}
              >
                <span>Stay & Accommodations</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openDrawerAcc === "stay" ? "rotate-180" : ""}`}
                />
              </button>
              {openDrawerAcc === "stay" && (
                <div className="drawer-acc-body">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (location !== "/presidential-suite-room-1") {
                        setLocation("/presidential-suite-room-1");
                      }
                    }}
                  >
                    Luxury Presidential Suite for Staycation &amp; Daycation in Gurgaon
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (location !== "/presidential-suite-room-2") {
                        setLocation("/presidential-suite-room-2");
                      }
                    }}
                  >
                    Presidential Suite for Staycation &amp; Daycation in Delhi NCR
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (location !== "/suite-room") {
                        setLocation("/suite-room");
                      }
                    }}
                  >
                    Suite Room
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (location !== "/luxury-room") setLocation("/luxury-room");
                    }}
                  >
                    Luxury Room
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (location !== "/luxury-room-2") setLocation("/luxury-room-2");
                    }}
                  >
                    Luxury Room 2
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (location !== "/Luxury-Room-with-Shower-Glass-Partition") {
                        setLocation("/Luxury-Room-with-Shower-Glass-Partition");
                      }
                    }}
                  >
                    Luxury Room with Shower Glass Partition
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (location !== "/deluxe-room") setLocation("/deluxe-room");
                    }}
                  >
                    Deluxe Room
                  </button>
                </div>
              )}
            </div>

            {/* Venues Accordion */}
            <div className="drawer-acc-item">
              <button
                type="button"
                className="drawer-acc-header"
                onClick={() => setOpenDrawerAcc(openDrawerAcc === "venues" ? null : "venues")}
              >
                <span>Weddings & Events</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openDrawerAcc === "venues" ? "rotate-180" : ""}`}
                />
              </button>
              {openDrawerAcc === "venues" && (
                <div className="drawer-acc-body">
                  <button type="button" onClick={() => handleOpenBooking("Bhanwar Lawn")}>
                    Bhanwar Party Lawn (50–300)
                  </button>
                  <button type="button" onClick={() => handleOpenBooking("Chander Lawn")}>
                    Chander Party Lawn (200–2,500)
                  </button>
                  <button type="button" onClick={() => handleOpenBooking("Abhinandan Hall")}>
                    Abhinandan Banquet Hall
                  </button>
                  <button type="button" onClick={() => handleOpenBooking("Swagatam Hall")}>
                    Swagatam Banquet Hall
                  </button>
                </div>
              )}
            </div>

            {/* Experiences Accordion */}
            <div className="drawer-acc-item">
              <button
                type="button"
                className="drawer-acc-header"
                onClick={() => setOpenDrawerAcc(openDrawerAcc === "experiences" ? null : "experiences")}
              >
                <span>Park Experiences</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${openDrawerAcc === "experiences" ? "rotate-180" : ""}`}
                />
              </button>
              {openDrawerAcc === "experiences" && (
                <div className="drawer-acc-body">
                  <button type="button" onClick={() => handleOpenBooking("Water Park Day Pass")}>
                    Water Park (21+ Slides)
                  </button>
                  <button type="button" onClick={() => handleOpenBooking("Amusement Park Pass")}>
                    Amusement Joyrides
                  </button>
                  <button type="button" onClick={() => handleOpenBooking("Activity Park Pass")}>
                    Activity & Rope Course
                  </button>
                </div>
              )}
            </div>

            {/* Single Links */}
            <button
              type="button"
              className="drawer-link-item"
              onClick={() => handleNavClick("pricing")}
            >
              <span>Passes & Pricing</span>
            </button>

            <button
              type="button"
              className="drawer-link-item"
              onClick={() => handleNavClick("estimator")}
            >
              <Calculator size={16} className="text-[#F68734]" />
              <span>Rate Estimator</span>
            </button>

            <button
              type="button"
              className="drawer-link-item"
              onClick={() => handleNavClick("video-tour")}
            >
              <Film size={16} className="text-[#01A5E1]" />
              <span>Video Tour</span>
            </button>
          </div>

          <div className="drawer-footer">
            <a href="tel:+917666779997" className="drawer-phone">
              <Phone size={18} />
              <span>+91 7666 779 997</span>
            </a>
            {agUser ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-1 py-2">
                  <div className="w-9 h-9 rounded-full bg-[#0E295B] flex items-center justify-center text-white font-extrabold text-sm">
                    {agUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-[#0E295B]">{agUser.name}</div>
                    <div className="text-xs text-gray-500">{agUser.email}</div>
                  </div>
                </div>

                {(agUser.email === "admin@aapnoghar.com" || agUser.name.toLowerCase().includes("admin")) && (
                  <button
                    type="button"
                    onClick={() => { setIsMenuOpen(false); setLocation("/admin"); }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0E295B] text-white font-extrabold text-sm hover:bg-[#1a448d] transition shadow-md shadow-[#0E295B]/15"
                  >
                    ⚡ Open CMS Admin Dashboard
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-extrabold text-sm hover:bg-red-100 transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-300 text-gray-700 font-bold text-sm hover:bg-gray-50 transition"
                  onClick={() => { setIsMenuOpen(false); setLocation("/login"); }}
                >
                  <User size={16} /> Login / Sign Up
                </button>
                <button
                  type="button"
                  className="button button--coral w-full"
                  onClick={() => { setIsMenuOpen(false); setLocation("/booking"); }}
                >
                  Book Now / Enquire
                </button>
              </div>
            )}
          </div>
      </div>
    </>
  );
}
