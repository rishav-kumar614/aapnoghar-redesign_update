import React, { useEffect, useState } from "react";

type PreloaderPhase = "loading" | "leaving" | "hidden";

export function Preloader() {
  const [phase, setPhase] = useState<PreloaderPhase>("loading");

  useEffect(() => {
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const linger = reducedMotion ? 0 : 500;
    const exitDuration = reducedMotion ? 0 : 300;
    const exitTimer = window.setTimeout(() => setPhase("leaving"), linger);
    const hideTimer = window.setTimeout(() => setPhase("hidden"), linger + exitDuration);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#061A33] flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none select-none ${
        phase === "leaving" ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading AapnoGhar"
    >
      <div className="flex flex-col items-center text-center gap-4">
        {/* Brand Logo strictly sized like navbar */}
        <div className="relative">
          <img
            src="/images/logo.png"
            alt="AapnoGhar Resort"
            style={{ height: "48px", maxHeight: "48px", width: "auto", maxWidth: "220px", objectFit: "contain" }}
            className="h-[48px] max-h-[48px] w-auto max-w-[220px] object-contain drop-shadow-lg"
          />
        </div>

        {/* Smooth Loader Ring */}
        <div className="relative w-8 h-8 mt-2">
          <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#FFA96B] animate-spin" />
        </div>

        <p className="text-white/60 text-xs font-semibold tracking-wider uppercase mt-1 font-sans">
          Arriving at your good story...
        </p>
      </div>
    </div>
  );
}
