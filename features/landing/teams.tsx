'use client';

import { motion } from 'framer-motion';
import { Users, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Team {
  name: string;
  category: 'senior' | 'junior' | 'minor-contact' | 'minor-flag';
  ageGroup: string;
  initials: string;
}

const teams: Team[] = [
  { name: 'County Senior Men', category: 'senior', ageGroup: 'Senior', initials: 'SM' },
  { name: 'County Senior Women', category: 'senior', ageGroup: 'Senior', initials: 'SW' },
  { name: 'Mixed Ability / Social', category: 'senior', ageGroup: 'Senior', initials: 'MX' },
  { name: 'County U18 Men', category: 'junior', ageGroup: 'Under 18', initials: 'U18M' },
  { name: 'County U18 Women', category: 'junior', ageGroup: 'Under 18', initials: 'U18W' },
  { name: 'County U16 Boys', category: 'junior', ageGroup: 'Under 16', initials: 'U16B' },
  { name: 'County U16 Girls', category: 'junior', ageGroup: 'Under 16', initials: 'U16G' },
  { name: 'County U14 Boys', category: 'minor-contact', ageGroup: 'Under 14', initials: 'U14B' },
  { name: 'County U14 Girls', category: 'minor-contact', ageGroup: 'Under 14', initials: 'U14G' },
  { name: 'County U12 Contact', category: 'minor-contact', ageGroup: 'Under 12', initials: 'U12' },
  { name: 'County U10 Flag', category: 'minor-flag', ageGroup: 'Under 10', initials: 'U10' },
  { name: 'County U8 Flag', category: 'minor-flag', ageGroup: 'Under 8', initials: 'U8' },
];

const divisions = [
  {
    label: 'Senior Teams',
    key: 'senior' as const,
    color: '#DC2626',
    badge: 'red' as const,
    description: 'Competitive and social rugby for adult players',
  },
  {
    label: 'Junior Teams',
    key: 'junior' as const,
    color: '#3B82F6',
    badge: 'gray' as const,
    description: 'Contact rugby for youth aged 16–18',
  },
  {
    label: 'Minor Contact',
    key: 'minor-contact' as const,
    color: '#F59E0B',
    badge: 'gold' as const,
    description: 'Contact rugby for youth aged 12–14',
  },
  {
    label: 'Minor Flag Rugby',
    key: 'minor-flag' as const,
    color: '#10B981',
    badge: 'green' as const,
    description: 'Flag rugby for the youngest players aged 8–10',
  },
];

export function LandingTeams() {
  return (
    <section className="py-20 px-4 bg-background transition-colors duration-300 border-t border-border">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <Badge variant="gold" dot size="sm" className="mb-4">Our Teams</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Rugby for Everyone
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Waterloo County Rugby offers teams across all ages and ability levels — from Flag Rugby for young players to competitive Senior divisions.
          </p>
        </motion.div>

        {/* Divisions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {divisions.map((div, di) => {
            const divTeams = teams.filter((t) => t.category === div.key);
            return (
              <motion.div
                key={div.key}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: di * 0.1 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                {/* Division header */}
                <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${div.color}20`, border: `1px solid ${div.color}30` }}
                    >
                      <Shield className="w-4 h-4" style={{ color: div.color }} />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold text-sm">{div.label}</h3>
                      <p className="text-muted-foreground text-xs">{div.description}</p>
                    </div>
                  </div>
                  <Badge variant={div.badge} size="sm">{divTeams.length} teams</Badge>
                </div>

                {/* Teams list */}
                <div className="divide-y divide-border">
                  {divTeams.map((team, ti) => (
                    <motion.div
                      key={team.name}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: di * 0.1 + ti * 0.06 }}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-foreground/[0.03] transition-colors"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                        style={{ background: div.color }}
                      >
                        {team.initials}
                      </div>
                      <span className="text-foreground text-sm font-medium flex-1 truncate">
                        {team.name} 2026
                      </span>
                      <span className="text-muted-foreground text-xs flex-shrink-0">{team.ageGroup}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-red-500" />
            <span className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">12 teams</span> across all divisions
            </span>
          </div>
          <div className="w-px h-5 bg-border hidden sm:block" />
          <span className="text-muted-foreground text-sm">
            Affiliated with{' '}
            <span className="text-foreground font-semibold">Rugby Canada</span>{' '}
            &amp;{' '}
            <span className="text-foreground font-semibold">Rugby Ontario</span>
          </span>
          <div className="w-px h-5 bg-border hidden sm:block" />
          <span className="text-muted-foreground text-sm">
            Based in <span className="text-foreground font-semibold">Waterloo, Ontario</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
