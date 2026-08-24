import React from "react";
import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schemaObj = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.aapnoghar.com/"
      },
      ...items.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 2,
        "name": item.label,
        "item": item.href ? `https://www.aapnoghar.com${item.href}` : undefined
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaObj) }}
      />
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 font-medium py-3">
        <Link href="/" className="hover:text-[#FFA96B] flex items-center gap-1 transition">
          <Home size={13} />
          <span>Home</span>
        </Link>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <ChevronRight size={12} className="text-slate-300 shrink-0" />
            {item.href && idx < items.length - 1 ? (
              <Link href={item.href} className="hover:text-[#FFA96B] transition">
                {item.label}
              </Link>
            ) : (
              <span className="text-slate-200 font-bold font-serif">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </nav>
    </>
  );
}
