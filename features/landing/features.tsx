'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import {
  Users,
  Shield,
  Calendar,
  Trophy,
  BarChart3,
  Megaphone,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FeatureCard {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  tags?: string[];
}

// ─── Feature Data ─────────────────────────────────────────────────────────────

const features: FeatureCard[] = [
  {
    id: 'club-management',
    icon: <Users className="w-5 h-5" />,
    iconBg: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
    title: 'Club Management',
    description:
      'Manage your entire club hierarchy from one dashboard — members, staff, committees, and sub-teams all in one place.',
    tags: ['Roles & Permissions', 'Member Registry', 'Committee Tools'],
  },
  {
    id: 'player-profiles',
    icon: <Shield className="w-5 h-5" />,
    iconBg: 'bg-red-500/15 text-red-400 border border-red-500/20',
    title: 'Player Profiles',
    description:
      "Rich player profiles with stats, history, and performance metrics — every player's journey captured in full.",
    tags: ['Career Stats', 'Medical Notes', 'Performance History'],
  },
  {
    id: 'fixture-management',
    icon: <Calendar className="w-5 h-5" />,
    iconBg: 'bg-violet-500/15 text-violet-400 border border-violet-500/20',
    title: 'Fixture Management',
    description:
      'Schedule fixtures, track results, and publish live scores with automated standings recalculation after each match.',
    tags: ['Live Scores', 'Auto Standings', 'Season Planner'],
  },
  {
    id: 'league-standings',
    icon: <Trophy className="w-5 h-5" />,
    iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
    title: 'League Standings',
    description:
      'Real-time standings, rankings, and tournament brackets — always accurate and publicly shareable.',
    tags: ['Real-time Updates', 'Brackets', 'Public View'],
  },
  {
    id: 'team-analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
    title: 'Team Analytics',
    description:
      'Deep analytics on team and player performance — from try conversions to seasonal trends, all visualised beautifully.',
    tags: ['Performance Trends', 'Try Analytics', 'Export Reports'],
  },
  {
    id: 'communications',
    icon: <Megaphone className="w-5 h-5" />,
    iconBg: 'bg-pink-500/15 text-pink-400 border border-pink-500/20',
    title: 'Communications',
    description:
      'Announcements, notifications, and team messaging built into your club dashboard — keep everyone in the loop.',
    tags: ['Push Notifications', 'Announcements', 'Team Chat'],
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE_OUT },
  }),
};

// ─── Feature Card Component ───────────────────────────────────────────────────

function FeatureItem({ feature, delay, inView }: { feature: FeatureCard; delay: number; inView: boolean }) {
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
          {/* Icon */}
          <div className={`inline-flex w-11 h-11 rounded-xl items-center justify-center flex-shrink-0 ${feature.iconBg} transition-transform duration-300 group-hover:scale-110`}>
            {feature.icon}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2 flex-1">
            <h3 className="text-base font-bold text-foreground leading-snug group-hover:text-red-500 transition-colors duration-200">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Tags */}
          {feature.tags && feature.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {feature.tags.map((tag) => (
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

// ─── Landing Features ─────────────────────────────────────────────────────────

export function LandingFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  // Stagger delays for the 6-card grid (2 columns → rows of 2)
  const delays = [0, 0.07, 0.14, 0.21, 0.28, 0.35];

  return (
    <section
      id="features"
      ref={ref}
      className="relative py-20 xl:py-28 overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(220,38,38,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-3">
            Platform Features
          </p>
          <h2 className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-foreground leading-tight">
            Everything Your Club Needs
          </h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            One platform purpose-built for Canadian rugby — no duct tape, no spreadsheets,
            no switching between a dozen tools.
          </p>
        </motion.div>

        {/* ── Feature Grid (2-col desktop, 1-col mobile) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:gap-5 mb-5">
          {features.map((feature, i) => (
            <FeatureItem
              key={feature.id}
              feature={feature}
              delay={delays[i]}
              inView={inView}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
