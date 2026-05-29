"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FacebookIcon, InstagramIcon, TwitterXIcon, YoutubeIcon } from "@/components/shared/social-icons";

const footerLinks = {
  club: [
    { label: "About Us", href: "/about" },
    { label: "History & Timeline", href: "/about#timeline" },
    { label: "Committee", href: "/about#committee" },
    { label: "Safeguarding", href: "/about#safeguarding" },
  ],
  rugby: [
    { label: "Fixtures & Results", href: "/fixtures" },
    { label: "News & Reports", href: "/news" },
    { label: "Photo Gallery", href: "/gallery" },
    { label: "Sponsors & Partners", href: "/sponsors" },
  ],
  teams: [
    { label: "Senior Men", href: "/teams/senior-men" },
    { label: "Senior Women", href: "/teams/senior-women" },
    { label: "U16 Boys", href: "/teams/u16-boys" },
    { label: "U8 & U10 Flag", href: "/teams/u8-flag" },
  ],
  join: [
    { label: "Register 2026", href: "https://www.playhq.com/ca/rugby-canada/register/21b765" },
    { label: "Membership Info", href: "/join" },
    { label: "Contact Us", href: "/contact" },
    { label: "Become a Sponsor", href: "/sponsors#become" },
  ],
};

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-[#0D1421] text-white/80">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1A2744] font-display text-xl font-bold shrink-0">WC</div>
              <div>
                <div className="font-display text-white text-xl leading-tight">WATERLOO COUNTY</div>
                <div className="text-[#D4AF37] text-xs tracking-widest uppercase">Rugby Football Club</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5 text-white/60 max-w-xs">
              Waterloo County RFC — the heart of rugby in the Waterloo Region, Ontario. Affiliated with Rugby Ontario and Rugby Canada. All ages, all abilities welcome.
            </p>
            <div className="space-y-2 text-sm">
              <span className="flex items-start gap-2">
                <MapPin size={14} className="text-[#D4AF37] mt-0.5 shrink-0" />
                <span className="text-white/60">80 Bluevale Street North,<br />Waterloo, ON N2J 3R5</span>
              </span>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { Icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/WaterlooCountyRugby" },
                { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/waterloocountyrugby/" },
                { Icon: TwitterXIcon, label: "X / Twitter", href: "https://twitter.com" },
                { Icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-[#1A2744] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1A2744] text-white/60 transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title: "The Club", links: footerLinks.club },
            { title: "Rugby", links: footerLinks.rugby },
            { title: "Teams", links: footerLinks.teams },
            { title: "Get Involved", links: footerLinks.join },
          ].map(({ title, links }) => (
            <div key={title}>
              <h3 className="font-display text-white text-base mb-4 tracking-wide">{title}</h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-white/55 hover:text-[#D4AF37] transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-white text-lg mb-1">Stay in the Loop</h3>
              <p className="text-sm text-white/55">Match results, club news, and events direct to your inbox.</p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2 w-full sm:w-auto"
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                aria-label="Email address"
                className="flex-1 sm:w-64 px-4 py-2 rounded-lg bg-[#1A2744] border border-[#243560] text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-semibold text-sm rounded-lg transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Waterloo County Rugby Football Club. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-[#D4AF37] transition-colors">Cookie Policy</Link>
            <Link href="/sitemap.xml" className="hover:text-[#D4AF37] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
