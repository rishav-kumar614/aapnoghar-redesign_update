/**
 * AapnoGhar Analytics & Marketing Tracking Engine
 * Supports GA4, GTM, Meta Pixel, UTM Capture, & Custom Conversion Events
 */

export type UTMData = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  capturedAt?: string;
};

export type TrackedEvent = {
  id: string;
  eventName: string;
  params?: Record<string, any>;
  timestamp: string;
  utmSource?: string;
};

const ANALYTICS_KEYS = {
  ga4Id: "ag_ga4_id",
  gtmId: "ag_gtm_id",
  pixelId: "ag_pixel_id",
  events: "ag_analytics_events",
  utm: "ag_utm_data",
} as const;

// ── 1. UTM Parameter Capture ─────────────────────────────────────
export function captureUTMParams(): UTMData | null {
  try {
    if (typeof window === "undefined") return null;
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source");

    if (source) {
      const utmData: UTMData = {
        utm_source: source,
        utm_medium: urlParams.get("utm_medium") || undefined,
        utm_campaign: urlParams.get("utm_campaign") || undefined,
        utm_term: urlParams.get("utm_term") || undefined,
        utm_content: urlParams.get("utm_content") || undefined,
        capturedAt: new Date().toISOString(),
      };
      sessionStorage.setItem(ANALYTICS_KEYS.utm, JSON.stringify(utmData));
      return utmData;
    }

    const stored = sessionStorage.getItem(ANALYTICS_KEYS.utm);
    if (stored) return JSON.parse(stored) as UTMData;
  } catch {}
  return null;
}

export function getStoredUTM(): UTMData | null {
  try {
    const stored = sessionStorage.getItem(ANALYTICS_KEYS.utm);
    if (stored) return JSON.parse(stored) as UTMData;
  } catch {}
  return null;
}

// ── 2. Script Injectors (GA4, GTM, Meta Pixel) ───────────────────
export function getAnalyticsConfig() {
  return {
    ga4Id: localStorage.getItem(ANALYTICS_KEYS.ga4Id) || "G-[#MOCK_GA4_ID]",
    gtmId: localStorage.getItem(ANALYTICS_KEYS.gtmId) || "GTM-[#MOCK_GTM_ID]",
    pixelId: localStorage.getItem(ANALYTICS_KEYS.pixelId) || "#MOCK_PIXEL_123456",
  };
}

export function saveAnalyticsConfig(config: { ga4Id: string; gtmId: string; pixelId: string }) {
  localStorage.setItem(ANALYTICS_KEYS.ga4Id, config.ga4Id);
  localStorage.setItem(ANALYTICS_KEYS.gtmId, config.gtmId);
  localStorage.setItem(ANALYTICS_KEYS.pixelId, config.pixelId);
  initAnalyticsScripts();
}

export function initAnalyticsScripts() {
  if (typeof window === "undefined") return;
  captureUTMParams();
  const config = getAnalyticsConfig();

  // Setup window.dataLayer for GTM/GA4
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  // Initialize GA4 if ID valid
  if (config.ga4Id && !document.getElementById("ga4-script")) {
    const script = document.createElement("script");
    script.id = "ga4-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`;
    document.head.appendChild(script);

    gtag("js", new Date());
    gtag("config", config.ga4Id, { send_page_view: true });
  }

  // Initialize Meta Pixel if ID valid
  if (config.pixelId && !(window as any).fbq) {
    const n = ((window as any).fbq = function (...args: any[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    }) as any;
    if (!(window as any)._fbq) (window as any)._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
  }
}

// ── 3. Custom Event Tracking ─────────────────────────────────────
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  const utm = getStoredUTM();
  const fullParams = { ...params, utm_source: utm?.utm_source, utm_campaign: utm?.utm_campaign };

  // 1. Google Analytics 4
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, fullParams);
  }

  // 2. Google Tag Manager
  if (Array.isArray((window as any).dataLayer)) {
    (window as any).dataLayer.push({ event: eventName, ...fullParams });
  }

  // 3. Meta Pixel
  if (typeof (window as any).fbq === "function") {
    (window as any).fbq("trackCustom", eventName, fullParams);
  }

  // 4. Log locally for Admin Panel Dashboard
  try {
    const rawEvents = localStorage.getItem(ANALYTICS_KEYS.events);
    const events: TrackedEvent[] = rawEvents ? JSON.parse(rawEvents) : [];
    const newEvt: TrackedEvent = {
      id: `EVT-${Date.now().toString().slice(-6)}`,
      eventName,
      params: fullParams,
      timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      utmSource: utm?.utm_source || "Organic / Direct",
    };
    const updated = [newEvt, ...events].slice(0, 50); // Keep last 50 events
    localStorage.setItem(ANALYTICS_KEYS.events, JSON.stringify(updated));
  } catch {}
}

export function getTrackedEvents(): TrackedEvent[] {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEYS.events);
    if (raw) return JSON.parse(raw) as TrackedEvent[];
  } catch {}
  return [
    { id: "EVT-849102", eventName: "book_now_click", params: { source: "Header CTA" }, timestamp: "11:05:12 AM", utmSource: "google_ads" },
    { id: "EVT-849101", eventName: "whatsapp_click", params: { intent: "Water Park Ticket" }, timestamp: "10:52:40 AM", utmSource: "facebook_campaign" },
    { id: "EVT-849100", eventName: "phone_click", params: { number: "+917666779997" }, timestamp: "10:30:15 AM", utmSource: "Organic / Direct" },
    { id: "EVT-849099", eventName: "form_submission", params: { form: "Career Application" }, timestamp: "09:45:00 AM", utmSource: "Organic / Direct" },
  ];
}
