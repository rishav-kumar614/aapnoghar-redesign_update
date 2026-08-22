import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  X, MessageCircle, CalendarDays, Users, ChevronRight,
  ChevronLeft, BedDouble, Waves,
  Heart, Briefcase, School, Check, Loader2, BadgePercent,
  Star, Clock, MapPin
} from "lucide-react";

export type BookingModalProps = {
  isOpen: boolean;
  intent?: string;
  defaultIntent?: string;
  onClose: () => void;
};

type TabId = "room" | "package" | "park" | "wedding" | "corporate" | "school";

type Tab = {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  color: string;
};

const TABS: Tab[] = [
  { id: "room",      label: "Room",        icon: <BedDouble size={15} />,   color: "#0E295B" },
  { id: "package",   label: "Package",     icon: <Star size={15} />,        color: "#8B5CF6" },
  { id: "park",      label: "Park Ticket", icon: <Waves size={15} />,       color: "#01A5E1" },
  { id: "wedding",   label: "Wedding",     icon: <Heart size={15} />,       color: "#EF4444" },
  { id: "corporate", label: "Corporate",   icon: <Briefcase size={15} />,   color: "#F68734" },
  { id: "school",    label: "Group",       icon: <School size={15} />,      color: "#10B981" },
];

const ROOMS = [
  { name: "Deluxe Room",                     price: 5999,  capacity: 2 },
  { name: "Luxury Room",                     price: 7499,  capacity: 3 },
  { name: "Luxury Room 2",                   price: 7999,  capacity: 3 },
  { name: "Luxury Room (Shower Glass)",      price: 8499,  capacity: 3 },
  { name: "Executive Suite",                 price: 11999, capacity: 4 },
  { name: "Presidential Suite — Gurgaon",   price: 17999, capacity: 6 },
  { name: "Presidential Suite — Delhi NCR", price: 19999, capacity: 6 },
];

const PACKAGES = [
  { name: "Day Outing (Without Stay)",  price: 2499,  includes: ["Water Park", "Amusement Park", "Lunch Buffet"] },
  { name: "Staycation Basic",           price: 6999,  includes: ["Deluxe Room", "Breakfast", "Water Park"] },
  { name: "Staycation Premium",         price: 11999, includes: ["Luxury Room", "All Meals", "All Parks"] },
  { name: "Family Mega Pack",           price: 15999, includes: ["Suite Room", "All Meals", "All Parks", "Adventure Zone"] },
  { name: "Honeymoon Special",          price: 13999, includes: ["Presidential Suite", "Candlelight Dinner", "Spa"] },
];

const PARK_TICKETS = [
  { name: "Water Park — Weekday",    price: 799,  desc: "Mon–Fri, 21 slides + Wave Pool" },
  { name: "Water Park — Weekend",    price: 999,  desc: "Sat–Sun & Holidays" },
  { name: "Amusement Park",          price: 599,  desc: "20+ Rides & Joyrides" },
  { name: "Adventure Zone",          price: 499,  desc: "24 Rope Obstacle Courses" },
  { name: "Combo (Water+Amusement)", price: 1299, desc: "Best value — both parks" },
  { name: "All Parks Combo",         price: 1699, desc: "Water + Amusement + Adventure" },
];

const COUPONS: Record<string, number> = {
  AAPNO10: 10, AAPNO20: 20, SUMMER15: 15, WELCOME5: 5,
};

const GROUP_SIZES = ["1–2","3–4","5–8","9–15","16–25","26–50","51–100","100+"];

function getTabFromIntent(intent: string): TabId {
  if (/wedding|marriage|mehndi|sangeet|reception|lawn|banquet/i.test(intent)) return "wedding";
  if (/corporate|conference|offsite|meeting|seminar/i.test(intent)) return "corporate";
  if (/school|picnic|group|trip/i.test(intent)) return "school";
  if (/package|bundle|staycation|daycation/i.test(intent)) return "package";
  if (/water|park|amusement|adventure|ticket|ride|slide/i.test(intent)) return "park";
  return "room";
}

function formatPrice(n: number) { return `₹${n.toLocaleString("en-IN")}`; }

type CommonFields = {
  checkIn: string; checkOut: string; guests: string;
  name: string; phone: string; email: string; message: string;
};

const emptyCommon: CommonFields = {
  checkIn: "", checkOut: "", guests: "2",
  name: "", phone: "", email: "", message: "",
};

export function BookingModal({ isOpen, intent = "", defaultIntent = "Room Booking", onClose }: BookingModalProps) {
  const activeIntent = intent || defaultIntent;
  const [activeTab, setActiveTab] = useState<TabId>(() => getTabFromIntent(activeIntent));
  const [step, setStep] = useState<1 | 2>(1);
  const [common, setCommon] = useState<CommonFields>(emptyCommon);
  const [selectedRoom, setSelectedRoom]       = useState(ROOMS[0].name);
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[0].name);
  const [selectedTicket, setSelectedTicket]   = useState(PARK_TICKETS[0].name);
  const [ticketQty, setTicketQty]             = useState(2);
  const [couponInput, setCouponInput]         = useState("");
  const [couponStatus, setCouponStatus]       = useState<null | "valid" | "invalid">(null);
  const [discountPct, setDiscountPct]         = useState(0);
  const [isSubmitting, setIsSubmitting]       = useState(false);
  const [isConfirmed, setIsConfirmed]         = useState(false);
  const [errors, setErrors]                   = useState<Partial<Record<string, string>>>({});
  const closeRef = useRef<HTMLButtonElement>(null);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const nights = useMemo(() => {
    if (!common.checkIn || !common.checkOut) return 1;
    const diff = new Date(common.checkOut).getTime() - new Date(common.checkIn).getTime();
    return Math.max(1, Math.round(diff / 86400000));
  }, [common.checkIn, common.checkOut]);

  useEffect(() => { 
    if (intent) setActiveTab(getTabFromIntent(intent)); 
  }, [intent]);

  useEffect(() => {
    if (isOpen) {
      setStep(1); 
      setIsConfirmed(false); 
      setErrors({});
      setCouponStatus(null); 
      setDiscountPct(0); 
      setCouponInput("");
      setTimeout(() => closeRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);

  // ALL HOOKS ARE ABOVE THIS LINE - No hooks below!
  if (!isOpen) return null;

  const basePrice = (() => {
    if (activeTab === "room")    return ROOMS.find(r => r.name === selectedRoom)?.price ?? 0;
    if (activeTab === "package") return PACKAGES.find(p => p.name === selectedPackage)?.price ?? 0;
    if (activeTab === "park")    return (PARK_TICKETS.find(t => t.name === selectedTicket)?.price ?? 0) * ticketQty;
    return 0;
  })();
  const discount   = Math.round(basePrice * discountPct / 100);
  const perUnit    = basePrice - discount;
  const totalPrice = (activeTab === "room" || activeTab === "package") ? perUnit * nights : perUnit;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) { setDiscountPct(COUPONS[code]); setCouponStatus("valid"); }
    else { setDiscountPct(0); setCouponStatus("invalid"); }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (step === 1) {
      if ((activeTab === "room" || activeTab === "package") && !common.checkIn) e.checkIn = "Check-in date required";
      if ((activeTab === "room" || activeTab === "package") && !common.checkOut) e.checkOut = "Check-out date required";
      if (activeTab === "park" && !common.checkIn) e.checkIn = "Visit date required";
    }
    if (step === 2) {
      if (!common.name.trim()) e.name = "Name is required";
      if (!/^\d{10}$/.test(common.phone.replace(/\s/g, ""))) e.phone = "Valid 10-digit number required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate()) setStep(2); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    const tab = TABS.find(t => t.id === activeTab)!;
    let msg = `Hi AapnoGhar! 🏖️\n\n*Booking Type:* ${tab.label}\n`;
    if (activeTab === "room")    msg += `*Room:* ${selectedRoom}\n`;
    if (activeTab === "package") msg += `*Package:* ${selectedPackage}\n`;
    if (activeTab === "park")    msg += `*Ticket:* ${selectedTicket} × ${ticketQty}\n`;
    if (common.checkIn) msg += `*Date:* ${common.checkIn}${common.checkOut ? ` → ${common.checkOut}` : ""}\n`;
    msg += `*Guests:* ${common.guests}\n`;
    if (totalPrice > 0) msg += `*Estimated Total:* ${formatPrice(totalPrice)}\n`;
    if (discountPct > 0) msg += `*Coupon:* ${couponInput.toUpperCase()} (${discountPct}% off)\n`;
    msg += `\n*Name:* ${common.name}\n*Phone:* ${common.phone}`;
    if (common.email) msg += `\n*Email:* ${common.email}`;
    if (common.message) msg += `\n*Message:* ${common.message}`;
    setTimeout(() => {
      window.open(`https://wa.me/917666779997?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
      setIsSubmitting(false); setIsConfirmed(true);
    }, 800);
  };

  const upd = (field: keyof CommonFields, val: string) => {
    setCommon(prev => ({ ...prev, [field]: val }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const currentTab = TABS.find(t => t.id === activeTab) || TABS[0];

  /* ── Confirmed screen ── */
  if (isConfirmed) {
    return (
      <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
        <section className="booking-modal booking-modal--confirmed" onMouseDown={e => e.stopPropagation()}>
          <button ref={closeRef} className="icon-button modal-close" type="button" onClick={onClose} aria-label="Close"><X size={20} /></button>
          <div className="confirmed-screen">
            <div className="confirmed-icon"><Check size={36} strokeWidth={2.5} /></div>
            <h2>Enquiry Sent!</h2>
            <p>Your WhatsApp message has been prepared. Our team will confirm your booking shortly.</p>
            <div className="confirmed-detail">
              <span><Clock size={14} /> Response within 30 minutes</span>
              <span><MapPin size={14} /> AapnoGhar, Gurugram</span>
            </div>
            <button className="button button--coral button--wide" type="button" onClick={onClose}>Done</button>
          </div>
        </section>
      </div>
    );
  }

  /* ── Main modal ── */
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="booking-modal booking-modal--v2"
        role="dialog" aria-modal="true" aria-labelledby="bm-title"
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bm-header" style={{"--tab-color": currentTab.color} as React.CSSProperties}>
          <div className="bm-header__left">
            <span className="bm-badge">{currentTab.icon} {currentTab.label}</span>
            <h2 id="bm-title">Book Your Experience</h2>
            <p>AapnoGhar Resort · Gurugram</p>
          </div>
          <button ref={closeRef} className="icon-button modal-close modal-close--light" type="button" onClick={onClose} aria-label="Close"><X size={20} /></button>
        </div>

        {/* Tabs */}
        <div className="bm-tabs" role="tablist">
          {TABS.map(tab => (
            <button
              key={tab.id} role="tab" type="button"
              aria-selected={activeTab === tab.id}
              className={`bm-tab ${activeTab === tab.id ? "bm-tab--active" : ""}`}
              style={activeTab === tab.id ? {"--tab-color": tab.color} as React.CSSProperties : {}}
              onClick={() => { setActiveTab(tab.id); setStep(1); setErrors({}); }}
            >
              {tab.icon}<span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Steps */}
        <div className="bm-steps">
          <div className={`bm-step ${step >= 1 ? "bm-step--done" : ""}`}><span>1</span> Select</div>
          <div className="bm-step-line" />
          <div className={`bm-step ${step >= 2 ? "bm-step--done" : ""}`}><span>2</span> Your Details</div>
        </div>

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="bm-body">
            {/* Room */}
            {activeTab === "room" && (
              <>
                <div className="bm-section-title">Select Room Type</div>
                <div className="bm-room-grid">
                  {ROOMS.map(r => (
                    <button key={r.name} type="button"
                      className={`bm-room-card ${selectedRoom === r.name ? "bm-room-card--selected" : ""}`}
                      onClick={() => setSelectedRoom(r.name)}>
                      <BedDouble size={18} />
                      <span className="bm-room-name">{r.name}</span>
                      <span className="bm-room-price">{formatPrice(r.price)}<small>/night</small></span>
                      <span className="bm-room-cap"><Users size={11} /> up to {r.capacity}</span>
                    </button>
                  ))}
                </div>
                <div className="bm-date-row">
                  <label className="field"><span><CalendarDays size={14} /> Check-in</span>
                    <input type="date" min={today} value={common.checkIn} onChange={e => upd("checkIn", e.target.value)} />
                    {errors.checkIn && <small className="field-error">{errors.checkIn}</small>}
                  </label>
                  <label className="field"><span><CalendarDays size={14} /> Check-out</span>
                    <input type="date" min={common.checkIn || today} value={common.checkOut} onChange={e => upd("checkOut", e.target.value)} />
                    {errors.checkOut && <small className="field-error">{errors.checkOut}</small>}
                  </label>
                  <label className="field"><span><Users size={14} /> Guests</span>
                    <select value={common.guests} onChange={e => upd("guests", e.target.value)}>
                      {["1","2","3","4","5","6"].map(n => <option key={n}>{n}</option>)}
                    </select>
                  </label>
                </div>
              </>
            )}

            {/* Package */}
            {activeTab === "package" && (
              <>
                <div className="bm-section-title">Choose a Package</div>
                <div className="bm-pkg-list">
                  {PACKAGES.map(p => (
                    <button key={p.name} type="button"
                      className={`bm-pkg-card ${selectedPackage === p.name ? "bm-pkg-card--selected" : ""}`}
                      onClick={() => setSelectedPackage(p.name)}>
                      <div className="bm-pkg-card__top">
                        <span className="bm-pkg-name">{p.name}</span>
                        <span className="bm-pkg-price">{formatPrice(p.price)}<small>/night</small></span>
                      </div>
                      <div className="bm-pkg-includes">
                        {p.includes.map(inc => <span key={inc}><Check size={11} /> {inc}</span>)}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="bm-date-row">
                  <label className="field"><span><CalendarDays size={14} /> Check-in</span>
                    <input type="date" min={today} value={common.checkIn} onChange={e => upd("checkIn", e.target.value)} />
                    {errors.checkIn && <small className="field-error">{errors.checkIn}</small>}
                  </label>
                  <label className="field"><span><CalendarDays size={14} /> Check-out</span>
                    <input type="date" min={common.checkIn || today} value={common.checkOut} onChange={e => upd("checkOut", e.target.value)} />
                    {errors.checkOut && <small className="field-error">{errors.checkOut}</small>}
                  </label>
                  <label className="field"><span><Users size={14} /> Guests</span>
                    <select value={common.guests} onChange={e => upd("guests", e.target.value)}>
                      {GROUP_SIZES.slice(0,5).map(n => <option key={n}>{n}</option>)}
                    </select>
                  </label>
                </div>
              </>
            )}

            {/* Park */}
            {activeTab === "park" && (
              <>
                <div className="bm-section-title">Select Ticket Type</div>
                <div className="bm-ticket-grid">
                  {PARK_TICKETS.map(t => (
                    <button key={t.name} type="button"
                      className={`bm-ticket-card ${selectedTicket === t.name ? "bm-ticket-card--selected" : ""}`}
                      onClick={() => setSelectedTicket(t.name)}>
                      <Waves size={16} />
                      <span className="bm-ticket-name">{t.name}</span>
                      <span className="bm-ticket-desc">{t.desc}</span>
                      <span className="bm-ticket-price">{formatPrice(t.price)}<small>/person</small></span>
                    </button>
                  ))}
                </div>
                <div className="bm-date-row">
                  <label className="field"><span><CalendarDays size={14} /> Visit Date</span>
                    <input type="date" min={today} value={common.checkIn} onChange={e => upd("checkIn", e.target.value)} />
                    {errors.checkIn && <small className="field-error">{errors.checkIn}</small>}
                  </label>
                  <label className="field"><span><Users size={14} /> Persons</span>
                    <div className="bm-qty-control">
                      <button type="button" onClick={() => setTicketQty(q => Math.max(1, q - 1))}>−</button>
                      <span>{ticketQty}</span>
                      <button type="button" onClick={() => setTicketQty(q => q + 1)}>+</button>
                    </div>
                  </label>
                </div>
              </>
            )}

            {/* Wedding */}
            {activeTab === "wedding" && (
              <>
                <div className="bm-section-title">Wedding Enquiry</div>
                <div className="bm-enquiry-grid">
                  <label className="field"><span>Event Type</span>
                    <select><option>Wedding Reception</option><option>Engagement</option><option>Mehndi & Sangeet</option><option>Haldi</option><option>All Functions</option></select>
                  </label>
                  <label className="field"><span><CalendarDays size={14} /> Event Date</span>
                    <input type="date" min={today} value={common.checkIn} onChange={e => upd("checkIn", e.target.value)} />
                  </label>
                  <label className="field"><span>Venue Preference</span>
                    <select><option>Chander Party Lawn (200–2,500)</option><option>Bhanwar Party Lawn (50–300)</option><option>Abhinandan Hall (30–250)</option><option>Swagatam Hall (up to 150)</option><option>Not Sure — Need Advice</option></select>
                  </label>
                  <label className="field"><span><Users size={14} /> Expected Guests</span>
                    <select value={common.guests} onChange={e => upd("guests", e.target.value)}>
                      {GROUP_SIZES.map(n => <option key={n}>{n}</option>)}
                    </select>
                  </label>
                </div>
                <label className="field" style={{marginTop:"12px"}}><span>Special Requirements</span>
                  <textarea rows={3} placeholder="Decoration theme, catering preferences…" value={common.message} onChange={e => upd("message", e.target.value)} />
                </label>
              </>
            )}

            {/* Corporate */}
            {activeTab === "corporate" && (
              <>
                <div className="bm-section-title">Corporate Event Enquiry</div>
                <div className="bm-enquiry-grid">
                  <label className="field"><span>Event Type</span>
                    <select><option>Team Outing</option><option>Conference / Workshop</option><option>Corporate Retreat</option><option>Product Launch</option><option>Awards Night</option><option>Annual Day</option></select>
                  </label>
                  <label className="field"><span><CalendarDays size={14} /> Event Date</span>
                    <input type="date" min={today} value={common.checkIn} onChange={e => upd("checkIn", e.target.value)} />
                  </label>
                  <label className="field"><span>Duration</span>
                    <select><option>Half Day (4 hrs)</option><option>Full Day</option><option>2 Days / 1 Night</option><option>3 Days / 2 Nights</option></select>
                  </label>
                  <label className="field"><span><Users size={14} /> Team Size</span>
                    <select value={common.guests} onChange={e => upd("guests", e.target.value)}>
                      {GROUP_SIZES.map(n => <option key={n}>{n}</option>)}
                    </select>
                  </label>
                </div>
                <label className="field" style={{marginTop:"12px"}}><span>Additional Requirements</span>
                  <textarea rows={3} placeholder="AV setup, projector, breakout rooms…" value={common.message} onChange={e => upd("message", e.target.value)} />
                </label>
              </>
            )}

            {/* School / Group */}
            {activeTab === "school" && (
              <>
                <div className="bm-section-title">School Picnic / Group Enquiry</div>
                <div className="bm-enquiry-grid">
                  <label className="field"><span>Group Type</span>
                    <select><option>School Picnic</option><option>College Trip</option><option>Family Group</option><option>Friends Group</option><option>NGO / Social Group</option></select>
                  </label>
                  <label className="field"><span><CalendarDays size={14} /> Visit Date</span>
                    <input type="date" min={today} value={common.checkIn} onChange={e => upd("checkIn", e.target.value)} />
                  </label>
                  <label className="field"><span>Activities</span>
                    <select><option>Water Park Only</option><option>All Parks</option><option>Parks + Lunch Buffet</option><option>Full Day Package with Meals</option></select>
                  </label>
                  <label className="field"><span><Users size={14} /> Group Size</span>
                    <select value={common.guests} onChange={e => upd("guests", e.target.value)}>
                      {GROUP_SIZES.map(n => <option key={n}>{n}</option>)}
                    </select>
                  </label>
                </div>
                <label className="field" style={{marginTop:"12px"}}><span>School / Organisation Name</span>
                  <input type="text" placeholder="E.g. DPS Gurgaon…" value={common.message} onChange={e => upd("message", e.target.value)} />
                </label>
              </>
            )}

            {/* Coupon */}
            {(activeTab === "room" || activeTab === "package" || activeTab === "park") && (
              <div className="bm-coupon">
                <BadgePercent size={15} />
                <input type="text" placeholder="Coupon code (e.g. AAPNO10)"
                  value={couponInput} onChange={e => { setCouponInput(e.target.value); setCouponStatus(null); }} />
                <button type="button" onClick={applyCoupon}>Apply</button>
                {couponStatus === "valid"   && <span className="bm-coupon__msg bm-coupon__msg--ok"><Check size={12} /> {discountPct}% off!</span>}
                {couponStatus === "invalid" && <span className="bm-coupon__msg bm-coupon__msg--err">Invalid coupon</span>}
              </div>
            )}

            {/* Price summary */}
            {basePrice > 0 && (
              <div className="bm-price-summary">
                <div className="bm-price-row"><span>Base price</span><span>{formatPrice(basePrice)}{(activeTab==="room"||activeTab==="package") ? ` × ${nights} night${nights>1?"s":""}` : ""}</span></div>
                {discountPct > 0 && (
                  <div className="bm-price-row bm-price-row--discount"><span>Discount ({discountPct}%)</span><span>− {formatPrice(discount * ((activeTab==="room"||activeTab==="package") ? nights : 1))}</span></div>
                )}
                <div className="bm-price-row bm-price-row--total"><span>Estimated Total</span><span>{formatPrice(totalPrice)}</span></div>
                <p className="bm-price-note">* Final price confirmed by AapnoGhar team</p>
              </div>
            )}

            <button className="button button--coral button--wide" style={{marginTop:"16px"}} type="button" onClick={handleNext}>
              Next — Your Details <ChevronRight size={17} />
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <form className="bm-body" onSubmit={handleSubmit} noValidate>
            <div className="bm-section-title">Your Contact Details</div>
            <div className="bm-enquiry-grid">
              <label className="field"><span>Full Name *</span>
                <input type="text" autoComplete="name" placeholder="Your name" value={common.name} onChange={e => upd("name", e.target.value)} />
                {errors.name && <small className="field-error">{errors.name}</small>}
              </label>
              <label className="field"><span>Mobile Number *</span>
                <input type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile" value={common.phone} onChange={e => upd("phone", e.target.value)} />
                {errors.phone && <small className="field-error">{errors.phone}</small>}
              </label>
              <label className="field"><span>Email (optional)</span>
                <input type="email" autoComplete="email" placeholder="your@email.com" value={common.email} onChange={e => upd("email", e.target.value)} />
              </label>
            </div>

            <div className="bm-summary-box">
              <div className="bm-summary-row"><span>Type</span><strong>{currentTab.label}</strong></div>
              {activeTab === "room"    && <div className="bm-summary-row"><span>Room</span><strong>{selectedRoom}</strong></div>}
              {activeTab === "package" && <div className="bm-summary-row"><span>Package</span><strong>{selectedPackage}</strong></div>}
              {activeTab === "park"    && <div className="bm-summary-row"><span>Ticket</span><strong>{selectedTicket} × {ticketQty}</strong></div>}
              {common.checkIn && <div className="bm-summary-row"><span>Date</span><strong>{common.checkIn}{common.checkOut ? ` → ${common.checkOut}` : ""}</strong></div>}
              {common.guests  && <div className="bm-summary-row"><span>Guests</span><strong>{common.guests}</strong></div>}
              {totalPrice > 0 && <div className="bm-summary-row bm-summary-row--total"><span>Estimated Total</span><strong>{formatPrice(totalPrice)}</strong></div>}
            </div>

            <div className="bm-promise"><Check size={14} /> Confirmation via WhatsApp within 30 minutes</div>

            <div className="bm-step2-actions">
              <button type="button" className="button button--ghost" onClick={() => setStep(1)}>
                <ChevronLeft size={16} /> Back
              </button>
              <button type="submit" className="button button--coral" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 size={16} className="button-spinner" /> Sending…</> : <><MessageCircle size={16} /> Send on WhatsApp</>}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}