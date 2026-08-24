import React, { useState } from "react";
import { Phone, MessageCircle, CalendarDays } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { BookingModal } from "@/components/BookingModal";

export function StickyMobileActionBar() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handlePhoneClick = () => {
    trackEvent("phone_click", { location: "sticky_mobile_bar", number: "+917666779997" });
    window.location.href = "tel:+917666779997";
  };

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", { location: "sticky_mobile_bar", intent: "Mobile Quick Inquiry" });
    window.open(
      "https://wa.me/917666779997?text=Hi%20AapnoGhar,%20I%20would%20like%20to%20inquire%20about%20resort%20stay,%20water%20park%20passes,%20and%20events.",
      "_blank"
    );
  };

  const handleBookClick = () => {
    trackEvent("book_now_click", { location: "sticky_mobile_bar" });
    setIsBookingOpen(true);
  };

  return (
    <>
      {/* Sticky Mobile Quick Action Bar (Visible only on mobile screens) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A1E29]/95 backdrop-blur-md border-t border-white/10 px-3 py-2 shadow-2xl">
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* 1. Direct Call */}
          <button
            type="button"
            onClick={handlePhoneClick}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 active:scale-95 transition"
          >
            <Phone size={15} className="text-[#89D9F8]" />
            <span>Call Us</span>
          </button>

          {/* 2. Direct WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600/90 text-white font-bold text-xs hover:bg-emerald-500 active:scale-95 transition"
          >
            <MessageCircle size={15} className="text-white" />
            <span>WhatsApp</span>
          </button>

          {/* 3. Book Now */}
          <button
            type="button"
            onClick={handleBookClick}
            className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#FFA96B] text-[#0A1E29] font-extrabold text-xs hover:bg-[#ff964d] active:scale-95 transition shadow-lg"
          >
            <CalendarDays size={15} />
            <span>Book Now</span>
          </button>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultIntent="Mobile Direct Reservation"
      />
    </>
  );
}
