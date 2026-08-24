import React, { useEffect } from "react";

export type SEOProps = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  noindex?: boolean;
  schemaRaw?: object;
};

const DEFAULT_TITLE = "AapnoGhar | Luxury Resort, 21-Slide Water Park & Wedding Lawns Gurgaon";
const DEFAULT_DESC = "AapnoGhar Resort & Water Park is Delhi-NCR's premier 9-acre destination featuring 67 luxury rooms, 21 thrill water slides, wedding lawns & 100% pure veg dining on NH-8 Gurugram.";
const BASE_URL = "https://www.aapnoghar.com";
const DEFAULT_OG_IMAGE = "https://www.aapnoghar.com/images/hero_water_park.jpg";

export function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonicalPath = "",
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  schemaRaw,
}: SEOProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper function to set or create meta tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Meta Description
    setMetaTag('meta[name="description"]', "name", "description", description);

    // 3. Robots meta tag (index/noindex)
    setMetaTag(
      'meta[name="robots"]',
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // 4. OpenGraph Tags
    const fullCanonical = `${BASE_URL}${canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`}`;
    setMetaTag('meta[property="og:title"]', "property", "og:title", title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", description);
    setMetaTag('meta[property="og:url"]', "property", "og:url", fullCanonical);
    setMetaTag('meta[property="og:image"]', "property", "og:image", ogImage);
    setMetaTag('meta[property="og:type"]', "property", "og:type", "website");
    setMetaTag('meta[property="og:site_name"]', "property", "og:site_name", "AapnoGhar Resort & Water Park");

    // 5. Canonical Link Tag
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute("href", fullCanonical);

    // 6. JSON-LD Schema Markup
    let schemaScript = document.getElementById("seo-schema-jsonld") as HTMLScriptElement | null;
    if (schemaRaw) {
      if (!schemaScript) {
        schemaScript = document.createElement("script");
        schemaScript.id = "seo-schema-jsonld";
        schemaScript.setAttribute("type", "application/ld+json");
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaRaw);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [title, description, canonicalPath, ogImage, noindex, schemaRaw]);

  return null;
}

// Preset Schemas for Google Rich Snippets
export const RESORT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Resort",
  "name": "AapnoGhar Resort & Water Park",
  "image": "https://www.aapnoghar.com/images/hero_water_park.jpg",
  "@id": "https://www.aapnoghar.com/#resort",
  "url": "https://www.aapnoghar.com",
  "telephone": "+91-7666779997",
  "priceRange": "₹₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "43rd Milestone, NH-8, Sector-77",
    "addressLocality": "Gurugram",
    "addressRegion": "Haryana",
    "postalCode": "122004",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 28.3768,
    "longitude": 76.9535
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "09:30",
    "closes": "20:00"
  },
  "amenityFeature": [
    { "@type": "LocationFeatureSpecification", "name": "21 Water Park Slides", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Amusement Rides", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Pure Vegetarian Dining", "value": true },
    { "@type": "LocationFeatureSpecification", "name": "Wedding Lawns", "value": true }
  ]
};

export const WATERPARK_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WaterPark",
  "name": "AapnoGhar Water Park Arena",
  "url": "https://www.aapnoghar.com/water-park",
  "telephone": "+91-7666779997",
  "priceRange": "₹799 - ₹1699",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "43rd Milestone, NH-8, Sector-77",
    "addressLocality": "Gurugram",
    "addressRegion": "Haryana",
    "postalCode": "122004",
    "addressCountry": "IN"
  }
};
