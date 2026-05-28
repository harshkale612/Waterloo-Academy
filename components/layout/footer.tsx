import Link from 'next/link';
import { Shield, Share2, MessageCircle, MapPin, Globe, Phone } from 'lucide-react';

const footerLinks = {
  'The Club': [
    { label: 'About the Club', href: '#about' },
    { label: 'Our Teams', href: '#teams' },
    { label: 'Club News', href: '#news' },
    { label: 'Sponsors & Partners', href: '#sponsors' },
    { label: 'Contact Us', href: '#contact' },
  ],
  'Competitions': [
    { label: 'Senior Men', href: '#teams' },
    { label: 'Senior Women', href: '#teams' },
    { label: 'Junior Teams', href: '#teams' },
    { label: 'Minor Teams', href: '#teams' },
    { label: 'Mixed Ability', href: '#teams' },
  ],
  'Register': [
    { label: 'Register for 2026', href: 'https://playhq.com/ca/rugby-canada/register/21b765' },
    { label: '2026 Fees Guide', href: '#news' },
    { label: 'Junior Pathway', href: '#news' },
    { label: 'Rugby Canada', href: 'https://rugbycanada.ca' },
    { label: 'Rugby Ontario', href: 'https://rugbyontario.com' },
  ],
};

const socialLinks = [
  {
    href: 'https://www.instagram.com/waterloocountyrugby',
    icon: Share2,
    label: 'Instagram @waterloocountyrugby',
  },
  {
    href: 'https://www.facebook.com/WaterlooCountyRugby',
    icon: MessageCircle,
    label: 'Facebook WaterlooCountyRugby',
  },
  {
    href: 'https://www.waterloocountyrugby.com',
    icon: Globe,
    label: 'Club Website',
  },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="h-10 w-10 rounded-xl bg-linear-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-black text-sm text-foreground tracking-tight uppercase">
                  Waterloo County
                </span>
                <span className="font-bold text-[10px] text-red-500 tracking-[0.15em] uppercase">
                  Rugby Club
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-foreground mb-5 leading-relaxed max-w-xs">
              Community rugby for all ages in Waterloo, Ontario. Affiliated with Rugby Canada and Rugby Ontario.
            </p>

            {/* Address */}
            <div className="flex items-start gap-2 mb-3">
              <MapPin className="h-3.5 w-3.5 text-red-500 mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                80 Bluevale Street North<br />
                Waterloo, ON N2J 3R5
              </p>
            </div>

            {/* Contact note */}
            <div className="flex items-start gap-2 mb-5">
              <Phone className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                Contact via social media or the club website
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-8 w-8 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-red-500/50 transition-all"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Affiliation logos strip */}
        <div className="py-6 border-t border-b border-border mb-6 flex flex-wrap items-center justify-center gap-6">
          {['Rugby Canada', 'Rugby Ontario', 'City of Waterloo', 'City of Kitchener'].map((org) => (
            <div
              key={org}
              className="flex items-center gap-1.5 text-xs text-muted-foreground/70"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
              {org}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/60">
            © 2026 Waterloo County Rugby Club. All rights reserved. Powered by{' '}
            <span className="text-muted-foreground">youinsports</span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">Terms</Link>
            <Link href="#" className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
