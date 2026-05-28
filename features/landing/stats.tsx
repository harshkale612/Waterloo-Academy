'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Building2, CalendarCheck, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatBlock {
  value: string;
  numericValue: number;
  suffix: string;
  prefix: string;
  label: string;
  descriptor: string;
  icon: React.ReactNode;
  iconBg: string;
  delay: number;
}

// ─── Stat Data ────────────────────────────────────────────────────────────────

const stats: StatBlock[] = [
  {
    value: '300',
    numericValue: 300,
    suffix: '+',
    prefix: '',
    label: 'Registered Players',
    descriptor: 'Athletes registered across Senior, Junior, and Minor divisions for the 2026 season.',
    icon: <Users className="w-6 h-6" />,
    iconBg: 'bg-blue-500/15 text-blue-400 border border-blue-500/20',
    delay: 0,
  },
  {
    value: '12',
    numericValue: 12,
    suffix: '',
    prefix: '',
    label: 'Active Teams',
    descriptor: 'Teams spanning U8 Flag Rugby through to Senior Men and Women competitive sides.',
    icon: <Building2 className="w-6 h-6" />,
    iconBg: 'bg-red-500/15 text-red-400 border border-red-500/20',
    delay: 0.1,
  },
  {
    value: '4',
    numericValue: 4,
    suffix: '',
    prefix: '',
    label: 'Competitions',
    descriptor: 'Competing across Rugby Ontario leagues, provincial cups, and community competitions.',
    icon: <CalendarCheck className="w-6 h-6" />,
    iconBg: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
    delay: 0.2,
  },
  {
    value: '10',
    numericValue: 10,
    suffix: '+',
    prefix: '',
    label: 'Sponsors & Partners',
    descriptor: 'Local businesses and municipal partners supporting the club and the community.',
    icon: <Star className="w-6 h-6" />,
    iconBg: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
    delay: 0.3,
  },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedNumber({
  value,
  suffix,
  prefix,
  inView,
  delay,
}: {
  value: string;
  suffix: string;
  prefix: string;
  inView: boolean;
  delay: number;
}) {
  // Render the final display value (no JS counter needed — CSS handles the reveal)
  // Using framer-motion to clip/count the value with a scale + opacity entrance
  return (
    <motion.span
      className="gradient-text-gold text-5xl xl:text-6xl font-extrabold leading-none tracking-tight"
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {prefix}{value}{suffix}
    </motion.span>
  );
}

// ─── Single Stat Card ─────────────────────────────────────────────────────────

function StatCard({ stat, inView }: { stat: StatBlock; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.65, delay: stat.delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card hover className="relative overflow-hidden group transition-all duration-300 h-full">
        {/* Subtle hover gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(220,38,38,0.05), transparent 70%)' }}
        />

        <CardContent className="p-6 xl:p-8 flex flex-col gap-4 h-full">
          {/* Icon */}
          <div className={`inline-flex w-12 h-12 rounded-xl items-center justify-center shrink-0 ${stat.iconBg}`}>
            {stat.icon}
          </div>

          {/* Number */}
          <AnimatedNumber
            value={stat.value}
            suffix={stat.suffix}
            prefix={stat.prefix}
            inView={inView}
            delay={stat.delay + 0.15}
          />

          {/* Label + Descriptor */}
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-foreground leading-snug">{stat.label}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{stat.descriptor}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Landing Stats ────────────────────────────────────────────────────────────

export function LandingStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section
      ref={ref}
      className="relative py-20 xl:py-28 border-t border-b border-border overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      {/* Subtle radial accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(245,158,11,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-500 mb-3">
            By the numbers
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
            Waterloo County Rugby at a Glance
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
            From Flag Rugby for the youngest players to Senior competitive sides — a club built for the entire community.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 xl:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
