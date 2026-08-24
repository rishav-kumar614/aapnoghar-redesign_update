import { useCallback, useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";

type ScrollTarget = HTMLElement | string;

type LocomotiveController = {
  scrollTo: (target: ScrollTarget, options?: { offset?: number; duration?: number }) => void;
  destroy: () => void;
  stop: () => void;
  start: () => void;
};

// Global reference so SiteHeader can stop/start Lenis when mobile drawer opens/closes
declare global {
  interface Window {
    __ls: LocomotiveController | null;
  }
}
window.__ls = null;

export function useLocomotiveScroll() {
  const controllerRef = useRef<LocomotiveController | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    reducedMotionRef.current = prefersReducedMotion;
    if (prefersReducedMotion || !("ResizeObserver" in window)) return;

    // Initialize ultra-smooth inertial scrolling
    const controller = new LocomotiveScroll({
      lenisOptions: {
        lerp: 0.09,
        wheelMultiplier: 1.05,
        touchMultiplier: 1.6,
        smoothWheel: true,
        syncTouch: false,
        autoResize: true,
      },
    }) as unknown as LocomotiveController;

    controllerRef.current = controller;
    window.__ls = controller;
    document.documentElement.classList.add("locomotive-ready");
    return () => {
      controller.destroy();
      controllerRef.current = null;
      window.__ls = null;
      document.documentElement.classList.remove("locomotive-ready");
    };
  }, []);

  return useCallback((target: ScrollTarget, offset = -70) => {
    if (reducedMotionRef.current || !controllerRef.current) return false;
    controllerRef.current.scrollTo(target, { offset, duration: 0.75 });
    return true;
  }, []);
}
