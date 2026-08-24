import React, { useState } from "react";
import { Bot, X } from "lucide-react";
import { AIChatBox, Message } from "@/components/AIChatBox";
import { trackEvent } from "@/lib/analytics";

export function AIConciergeWidget() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! 👋 Welcome to **AapnoGhar Resort & Water Park**. I am your personal AI Day-Trip Concierge. How can I assist you with tickets, stays, or wedding lawns today?"
    }
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  const handleSendMessage = (userContent: string) => {
    trackEvent("ai_concierge_query", { query: userContent });
    const updatedMessages: Message[] = [...aiMessages, { role: "user", content: userContent }];
    setAiMessages(updatedMessages);
    setAiLoading(true);

    setTimeout(() => {
      let reply = "Thank you for reaching out! For instant reservations, group discounts, or booking inquiries, call our desk directly at **+91 7666 779 997** or chat with us on WhatsApp.";
      const lower = userContent.toLowerCase();

      if (lower.includes("price") || lower.includes("cost") || lower.includes("ticket") || lower.includes("rate")) {
        reply = "🎟️ **AapnoGhar Ticket Rates:**\n\n• **Water Park + Buffet:** ₹1,299/person\n• **Resort Deluxe Room:** ₹3,999/night\n• **Luxury Room:** ₹4,999/night\n• **Executive Suite:** ₹6,999/night\n\nWould you like me to open the booking desk for you?";
      } else if (lower.includes("timing") || lower.includes("time") || lower.includes("open")) {
        reply = "⏰ **AapnoGhar Timings:**\n\n• **Water & Amusement Park:** 09:30 AM – 07:00 PM (Daily)\n• **Resort Check-In:** 12:00 PM (Noon)\n• **Check-Out:** 10:30 AM\n• **Abhipriti Restaurant:** 07:30 AM – 10:30 PM";
      } else if (lower.includes("food") || lower.includes("veg") || lower.includes("buffet") || lower.includes("lunch")) {
        reply = "🥗 **100% Pure Vegetarian Hospitality:**\n\nAll day packages & resort stays include our famous **Unlimited Vegetarian Buffet** (Breakfast, Lunch & Evening Snacks). Pure Sattvik, clean & delicious preparation!";
      } else if (lower.includes("wedding") || lower.includes("lawn") || lower.includes("banquet") || lower.includes("party")) {
        reply = "💒 **Weddings & Celebrations:**\n\nWe feature 4 lush event lawns (Chander Lawn - 2,500 capacity, Bhanwar Lawn - 300 capacity) & climate-controlled Abhinandan Banquet. Click 'Weddings & Banquets' in the header to request a custom quote!";
      }

      setAiMessages([...updatedMessages, { role: "assistant", content: reply }]);
      setAiLoading(false);
    }, 1000);
  };

  return (
    <>
      {/* Floating AI Concierge Launcher — Visible on all pages */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => setIsAiOpen((prev) => !prev)}
          className="ai-launcher-btn shadow-2xl flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#F68734] to-[#D84A22] text-white font-bold text-sm hover:scale-105 transition-transform"
          data-cursor-text="AI Concierge"
        >
          <Bot size={19} className="animate-pulse" />
          <span>Ask AI Concierge</span>
        </button>
      </div>

      {/* AI Chat Box Drawer Modal */}
      {isAiOpen && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#0E295B]/10 flex flex-col max-h-[85vh]">
            <div className="p-4 bg-[#0E295B] text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Bot size={20} className="text-[#89D9F8]" />
                <span className="font-bold text-sm">AapnoGhar AI Day-Trip Assistant</span>
              </div>
              <button
                type="button"
                onClick={() => setIsAiOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto min-h-[320px]">
              <AIChatBox
                messages={aiMessages}
                isLoading={aiLoading}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
