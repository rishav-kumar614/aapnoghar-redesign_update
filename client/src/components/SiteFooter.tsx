import React from "react";
import { useLocation } from "wouter";
import { MapPin, Instagram, Facebook, Youtube, Twitter } from "lucide-react";

export function SiteFooter() {
  const [, setLocation] = useLocation();

  return (
    <footer className="site-footer bg-[#061A33] text-white pt-16 pb-12 border-t border-white/10">
      <div className="content-wrap max-w-[1560px] mx-auto px-6 sm:px-12">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Col 1: Brand & Bio */}
          <div>
            <img src="/images/logo.png" alt="AapnoGhar" className="h-10 w-auto object-contain mb-4 brightness-200" />
            <p className="text-xs text-white/70 leading-relaxed">
              AapnoGhar Resort, Water Park &amp; Amusement Park offers 9 acres of boundless joy, luxury accommodations, and royal event lawns on NH-8 Gurugram.
            </p>
            <div className="mt-4 text-xs text-[#89D9F8] font-semibold flex items-center gap-1.5">
              <MapPin size={15} /> 43rd Milestone, NH-8, Sector-77, Gurugram, Haryana
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F68734] mb-4">Explore Resort</h4>
            <div className="flex flex-col gap-2 text-xs text-white/80">
              <button type="button" onClick={() => setLocation("/")} className="text-left hover:text-white">
                Home
              </button>
              <button type="button" onClick={() => setLocation("/rooms")} className="text-left hover:text-white">
                Resort Rooms &amp; Suites
              </button>
              <button type="button" onClick={() => setLocation("/stay-packages")} className="text-left hover:text-white">
                Staycation Packages
              </button>
              <button type="button" onClick={() => setLocation("/water-park")} className="text-left hover:text-white">
                Water Park (21 Slides)
              </button>
              <button type="button" onClick={() => setLocation("/amusement-park")} className="text-left hover:text-white">
                Amusement Joyrides
              </button>
              <button type="button" onClick={() => setLocation("/adventure-park")} className="text-left hover:text-white">
                Adventure &amp; Rope Park
              </button>
              <button type="button" onClick={() => setLocation("/abhipriti-restaurant")} className="text-left hover:text-white">
                Abhipriti Restaurant
              </button>
              <button type="button" onClick={() => setLocation("/packages-offers")} className="text-left hover:text-white">
                Packages &amp; Offers
              </button>
            </div>
          </div>

          {/* Col 3: Events & Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F68734] mb-4">Events &amp; Info</h4>
            <div className="flex flex-col gap-2 text-xs text-white/80">
              <button type="button" onClick={() => setLocation("/weddings-banquets")} className="text-left hover:text-white">
                Weddings &amp; Banquets
              </button>
              <button type="button" onClick={() => setLocation("/corporate-events")} className="text-left hover:text-white">
                Corporate Events &amp; Offsites
              </button>
              <button type="button" onClick={() => setLocation("/school-picnic-group-packages")} className="text-left hover:text-white">
                School &amp; Group Picnics
              </button>
              <button type="button" onClick={() => setLocation("/gallery")} className="text-left hover:text-white">
                Photo &amp; Video Gallery
              </button>
              <button type="button" onClick={() => setLocation("/about-us")} className="text-left hover:text-white">
                About Us
              </button>
              <button type="button" onClick={() => setLocation("/contact-us")} className="text-left hover:text-white">
                Contact Us &amp; Map
              </button>
              <button type="button" onClick={() => setLocation("/blog")} className="text-left hover:text-white">
                Travel Blog &amp; Guides
              </button>
              <button type="button" onClick={() => setLocation("/faqs")} className="text-left hover:text-white">
                FAQs &amp; Guidelines
              </button>
              <button type="button" onClick={() => setLocation("/careers")} className="text-left hover:text-white">
                Careers / Job Vacancies
              </button>
            </div>
          </div>

          {/* Col 4: Contact & Socials */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#F68734] mb-4">Reservations Desk</h4>
            <div className="text-xs text-white/80 flex flex-col gap-2">
              <a href="tel:+917666779997" className="font-bold text-[#89D9F8] text-sm hover:underline">
                +91 7666 779 997
              </a>
              <a href="mailto:info@aapnoghar.com" className="hover:text-white">
                info@aapnoghar.com
              </a>
              <p className="text-[11px] text-white/60 mt-1">Open daily 09:00 AM – 08:00 PM for enquiries</p>
              <div className="social-links flex gap-3 text-white/70 mt-3">
                <a href="https://www.instagram.com/aapnoghargurgaon/?hl=en" target="_blank" rel="noreferrer" className="hover:text-white" aria-label="Instagram">
                  <Instagram size={17} />
                </a>
                <a href="https://www.facebook.com/aapnoghargurgaon" target="_blank" rel="noreferrer" className="hover:text-white" aria-label="Facebook">
                  <Facebook size={17} />
                </a>
                <a href="https://www.youtube.com/channel/UCdzxHMQ7qLsz-a1Qxbc7kqg" target="_blank" rel="noreferrer" className="hover:text-white" aria-label="Youtube">
                  <Youtube size={17} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white" aria-label="Twitter">
                  <Twitter size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Site Credits & Capacity Disclaimers */}
        <div className="pt-8 pb-4 text-xs text-white/55 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4">
          <p className="max-w-xl leading-relaxed m-0">
            * Venue guest capacities (Bhanwar Lawn: 50–300, Chander Lawn: 200–2,500, Abhinandan Hall: 30–250, Swagatam Hall: up to 150) are indicative based on standard banquet layouts. All rates and inclusions are subject to applicable taxes.
          </p>
          <p className="m-0 text-white/50">
            Verified public information and heritage records for AapnoGhar Resort &amp; Water Park, Sector 77, Gurugram.
          </p>
        </div>

        <div className="footer-bottom pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} AapnoGhar Resort, Water Park &amp; Amusement Park. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-end gap-4">
            <div className="flex flex-wrap gap-4">
              <a href="https://www.aapnoghar.com/privacy-policy" target="_blank" rel="noreferrer" className="hover:text-white">
                Privacy Policy
              </a>
              <button type="button" onClick={() => setLocation("/#faq")} className="hover:text-white">
                Terms of Entry
              </button>
              <button type="button" onClick={() => setLocation("/#faq")} className="hover:text-white">
                Park Guidelines
              </button>
            </div>

            <div className="flex items-center gap-[8px] md:gap-[10px] p-[6px_10px] md:p-[8px_12px] border border-black/10 rounded-[10px] w-fit bg-black/5 backdrop-blur-[10px]">
              <a
                href="https://play.fabulousmedia.in"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FabulousMedia"
                className="flex items-center justify-center bg-[#fff] p-[4px] rounded-[6px] opacity-60 transition-all duration-300 ease-out hover:opacity-100 hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(253,181,20,0.5)]"
              >
                <img
                  src="https://play.fabulousmedia.in/sitecredit/images/fabulousmedia.svg"
                  alt="FabulousMedia"
                  className="h-[10px] md:h-[12px] w-auto block"
                />
              </a>

              <div className="w-[1px] h-[12px] bg-black/10"></div>

              <a
                href="https://gocommercially.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GoCommercially"
                className="flex items-center justify-center bg-[#fff] p-[4px] rounded-[6px] opacity-60 transition-all duration-300 ease-out hover:opacity-100 hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(253,181,20,0.5)]"
              >
                <img
                  src="https://play.fabulousmedia.in/sitecredit/images/gocommercially.svg"
                  alt="GoCommercially"
                  className="h-[10px] md:h-[12px] w-auto block"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
