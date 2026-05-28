'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type FormResult = 'W' | 'L' | 'D';

interface StandingRow {
  position: number;
  team: string;
  played: number;
  won: number;
  points: number;
  form: FormResult[];
  isUserTeam?: boolean;
}

const standings: StandingRow[] = [
  {
    position: 1,
    team: 'Waterloo County RFC',
    played: 9,
    won: 7,
    points: 36,
    form: ['W', 'W', 'D', 'W', 'W'],
    isUserTeam: true,
  },
  {
    position: 2,
    team: 'Hamilton RFC',
    played: 9,
    won: 6,
    points: 30,
    form: ['L', 'W', 'W', 'W', 'L'],
  },
  {
    position: 3,
    team: 'Ottawa Wolves RFC',
    played: 9,
    won: 5,
    points: 27,
    form: ['W', 'L', 'W', 'D', 'W'],
  },
  {
    position: 4,
    team: 'Barrie RFC',
    played: 9,
    won: 4,
    points: 22,
    form: ['D', 'W', 'L', 'L', 'W'],
  },
  {
    position: 5,
    team: 'Guelph RFC',
    played: 9,
    won: 3,
    points: 17,
    form: ['L', 'L', 'W', 'L', 'D'],
  },
];

const positionBadgeStyle: Record<number, string> = {
  1: 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30',
  2: 'bg-slate-400/20 text-slate-600 dark:text-slate-300 border border-slate-400/30',
  3: 'bg-orange-700/20 text-orange-600 dark:text-orange-400 border border-orange-700/30',
};

const formDotStyle: Record<FormResult, string> = {
  W: 'bg-green-500',
  L: 'bg-red-500',
  D: 'bg-yellow-500',
};

const formLabel: Record<FormResult, string> = {
  W: 'Win',
  L: 'Loss',
  D: 'Draw',
};

function PositionBadge({ position }: { position: number }) {
  const style = positionBadgeStyle[position];
  if (style) {
    return (
      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${style}`}>
        {position}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold text-muted-foreground bg-background border border-border">
      {position}
    </span>
  );
}

function FormDots({ form }: { form: FormResult[] }) {
  return (
    <div className="flex items-center gap-1.5">
      {form.map((result, i) => (
        <span
          key={i}
          title={formLabel[result]}
          className={`w-2 h-2 rounded-full ${formDotStyle[result]}`}
        />
      ))}
    </div>
  );
}

function StandingRowItem({ row, delay }: { row: StandingRow; delay: number }) {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={`
        group relative border-b last:border-b-0 transition-colors duration-200
        ${row.isUserTeam
          ? 'border-red-900/30 bg-red-600/5 hover:bg-red-600/10'
          : 'border-border hover:bg-foreground/2'
        }
      `}
    >
      <td className="py-3.5 pl-5 pr-3 relative">
        {row.isUserTeam && (
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-600 rounded-r-full" />
        )}
        <PositionBadge position={row.position} />
      </td>

      <td className="py-3.5 px-3">
        <div className="flex items-center gap-2.5">
          <span className={`font-semibold text-sm ${row.isUserTeam ? 'text-foreground' : 'text-foreground/80'}`}>
            {row.team}
          </span>
          {row.isUserTeam && (
            <Badge variant="red" size="sm">Your Club</Badge>
          )}
        </div>
      </td>

      <td className="py-3.5 px-3 text-center text-muted-foreground text-sm tabular-nums">
        {row.played}
      </td>

      <td className="py-3.5 px-3 text-center text-muted-foreground text-sm tabular-nums">
        {row.won}
      </td>

      <td className="py-3.5 px-3 text-center">
        <span className={`font-bold text-sm tabular-nums ${row.isUserTeam ? 'text-amber-400' : 'text-foreground'}`}>
          {row.points}
        </span>
      </td>

      <td className="py-3.5 pl-3 pr-5">
        <FormDots form={row.form} />
      </td>
    </motion.tr>
  );
}

export function LandingStandings() {
  return (
    <section className="py-20 px-4 bg-background transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="gold" dot size="sm" className="mb-4">League Standings</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Live League Standings
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Track your club&apos;s league position in real time. Form guides, points tables, and head-to-head records at a glance.
          </p>
        </motion.div>

        {/* Table card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card border border-border rounded-xl overflow-hidden"
        >
          {/* Table header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-500" />
              <span className="text-foreground font-semibold text-sm">Rugby Ontario — Senior Men&apos;s Premier Division</span>
            </div>
            <Badge variant="green" dot size="sm">Updated Live</Badge>
          </div>

          {/* Responsive wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-130">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 pl-5 pr-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-12">#</th>
                  <th className="py-3 px-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Club</th>
                  <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-14">P</th>
                  <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-14">W</th>
                  <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-16">Pts</th>
                  <th className="py-3 pl-3 pr-5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-32">Form</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((row, i) => (
                  <StandingRowItem key={row.position} row={row} delay={0.1 + i * 0.07} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Form legend */}
          <div className="px-5 py-3 border-t border-border flex items-center gap-4 flex-wrap">
            <span className="text-muted-foreground text-xs font-medium">Form guide:</span>
            {(['W', 'L', 'D'] as FormResult[]).map((r) => (
              <div key={r} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${formDotStyle[r]}`} />
                <span className="text-muted-foreground text-xs">{formLabel[r]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* See full standings link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-8"
        >
          <Link href="/standings">
            <Button variant="ghost" size="lg" className="group">
              See Full Standings
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
