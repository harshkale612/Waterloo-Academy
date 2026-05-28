'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import {
  Flag,
  Shield,
  Users,
  Trophy,
  Heart,
  Handshake,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface OfferingCard {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  tags?: string[];
}

const offerings: OfferingCard[] = [
  {
    id: 'flag-rugby',
    icon: <Flag className="w-5 h-5" />,
    iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
    title: 'Flag Rugby (U8 & U10)',
    description:
      'A safe, fun introduction to rugby for the youngest players. No contact — just speed, skill, and a love for the game from day one.',
    tags: ['Ages 7–10', 'Non-contact', 'Beginner Friendly'],
  },
  {
    id: 'junior-contact',
    icon: <Shield className="w-5 h-5" />,
    iconBg: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
    title: 'Junior Contact (U12–U18)',
    description:
      'Structured contact rugby for developing players across U12, U14, U16, and U18 age groups — both boys and girls divisions.',
    tags: ['Ages 11–18', 'Boys & Girls', 'Full Contact'],
  },
  {
    id: 'senior-men',
    icon: <Trophy className="w-5 h-5" />,
    iconBg: 'bg-red-500/15 text-red-400 border border-red-500/20',
    title: 'Senior Men',
    description:
      'Competitive senior men\'s rugby in the Rugby Ontario Premier Division. County Senior Men are a cornerstone of the Waterloo rugby community.',
    tags: ['Rugby Ontario', 'Premier Division', '2026 Season'],
  },
  {
    id: 'senior-women',
    icon: <Trophy className="w-5 h-5" />,
    iconBg: 'bg-pink-500/15 text-pink-400 border border-pink-500/20',
    title: 'Senior Women',
    description:
      'County Senior Women compete in the Rugby Ontario women\'s competition, providing a high-quality pathway for female athletes in the region.',
    tags: ['Rugby Ontario', 'Women\'s Division', '2026 Season'],
  },
  {
    id: 'mixed-ability',
    icon: <Heart className="w-5 h-5" />,
    iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
    title: 'Mixed Ability & Social',
    description:
      'Rugby for everyone, regardless of age or experience. Our Mixed Ability / Social side is the perfect entry point for adults new to the game.',
    tags: ['All Abilities', 'Adults', 'Social & Fun'],
  },
  {
    id: 'community',
    icon: <Handshake className="w-5 h-5" />,
    iconBg: 'bg-violet-500/15 text-violet-400 border border-violet-500/20',
    title: 'Community & Club Life',
    description:
      'Beyond the pitch — club socials, supporter events, fundraisers, and a welcoming community backed by the City of Waterloo and City of Kitchener.',
    tags: ['Club Events', 'Socials', 'Community First'],
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  }),
};

function OfferingItem({
  offering,
  delay,
  inView,
}: {
  offering: OfferingCard;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      variants={cardVariant}
      custom={delay}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="h-full"
    >
      <Card hover className="h-full group transition-all duration-300">
        <CardContent className="p-6 flex flex-col gap-4 h-full">
          <div
            className={`inline-flex w-11 h-11 rounded-xl items-center justify-center shrink-0 ${offering.iconBg} transition-transform duration-300 group-hover:scale-110`}
          >
            {offering.icon}
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-red-500 transition-colors duration-200">
              {offering.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {offering.description}
            </p>
          </div>
          {offering.tags && offering.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {offering.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-foreground/5 border border-foreground/8 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function LandingAbout() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });
  const delays = [0, 0.07, 0.14, 0.21, 0.28, 0.35];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 xl:py-28 overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(220,38,38,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-3">
            What We Offer
          </p>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-foreground leading-tight">
            Rugby for Every Age &amp; Ability
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            From first-time players to seasoned competitors — Waterloo County Rugby has a place for everyone in the community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-5">
          {offerings.map((offering, i) => (
            <OfferingItem
              key={offering.id}
              offering={offering}
              delay={delays[i]}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
