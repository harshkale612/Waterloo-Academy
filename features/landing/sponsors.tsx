'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Handshake } from 'lucide-react';

interface Sponsor {
  name: string;
  role: string;
  tier: 'primary' | 'secondary' | 'community';
  initials: string;
  color: string;
}

const sponsors: Sponsor[] = [
  { name: 'Barbarian', role: 'Kit Sponsor', tier: 'primary', initials: 'BB', color: '#DC2626' },
  { name: "Domino's", role: 'Shirt Sponsor', tier: 'primary', initials: "D's", color: '#1E40AF' },
  { name: 'Personal Edge Training', role: 'Ball Sponsor', tier: 'primary', initials: 'PET', color: '#059669' },
  { name: 'Josslin Insurance', role: "Senior Men's Sponsor", tier: 'secondary', initials: 'JI', color: '#D97706' },
  { name: "Fall's Road Pub", role: 'Socials Sponsor', tier: 'secondary', initials: 'FRP', color: '#7C3AED' },
  { name: 'Impact Canopy', role: 'Tent Sponsor', tier: 'secondary', initials: 'IC', color: '#0369A1' },
  { name: 'Wood-Hall Logistics', role: 'Logistics Sponsor', tier: 'secondary', initials: 'WHL', color: '#B45309' },
  { name: 'City of Waterloo', role: 'Municipal Partner', tier: 'community', initials: 'CW', color: '#4F46E5' },
  { name: 'City of Kitchener', role: 'Municipal Partner', tier: 'community', initials: 'CK', color: '#0891B2' },
  { name: 'Kidspired', role: 'Community Partner', tier: 'community', initials: 'KS', color: '#DB2777' },
];

export function LandingSponsors() {
  const primary = sponsors.filter((s) => s.tier === 'primary');
  const secondary = sponsors.filter((s) => s.tier === 'secondary');
  const community = sponsors.filter((s) => s.tier === 'community');

  return (
    <section className="py-20 px-4 border-t border-b border-border bg-card/40 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge variant="gold" size="sm" className="mb-4 inline-flex items-center gap-1">
            <Handshake className="w-3 h-3" />
            Our Partners
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Club Sponsors &amp; Partners
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Waterloo County Rugby is proud to be supported by businesses and organisations committed to growing rugby in the community.
          </p>
        </motion.div>

        {/* Primary sponsors */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-5 text-center">
            Primary Sponsors
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {primary.map((sponsor, i) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 hover:border-amber-500/30 transition-colors duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: sponsor.color }}
                >
                  {sponsor.initials}
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm">{sponsor.name}</p>
                  <p className="text-muted-foreground text-xs">{sponsor.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Club sponsors */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-5 text-center">
            Club Sponsors
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {secondary.map((sponsor, i) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-3 text-center hover:border-red-600/30 transition-colors duration-300"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: sponsor.color }}
                >
                  {sponsor.initials}
                </div>
                <div>
                  <p className="text-foreground font-medium text-xs leading-tight">{sponsor.name}</p>
                  <p className="text-muted-foreground text-[10px] mt-0.5">{sponsor.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community partners */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-5 text-center">
            Community Partners
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {community.map((sponsor, i) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-2.5 bg-card border border-border rounded-full px-4 py-2.5 hover:border-border/80 transition-colors duration-300"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0"
                  style={{ background: sponsor.color }}
                >
                  {sponsor.initials.slice(0, 2)}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-foreground text-xs font-medium">{sponsor.name}</span>
                  <span className="text-muted-foreground text-[10px]">&middot; {sponsor.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
