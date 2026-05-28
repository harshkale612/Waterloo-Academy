'use client';

import { motion } from 'framer-motion';
import { TrendingUp, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/layout/footer';

type FormResult = 'W' | 'L' | 'D';

interface StandingRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  points: number;
  form: FormResult[];
  isUserTeam?: boolean;
}

interface League {
  name: string;
  season: string;
  rows: StandingRow[];
}

const leagues: League[] = [
  {
    name: 'Ontario Rugby Union — Premier Division',
    season: '2024 Season',
    rows: [
      { position: 1, team: 'Toronto Arrows RFC', played: 14, won: 11, drawn: 1, lost: 2, pointsFor: 312, pointsAgainst: 198, points: 54, form: ['W', 'W', 'D', 'W', 'W'], isUserTeam: true },
      { position: 2, team: 'Ottawa Wolves RFC', played: 14, won: 10, drawn: 0, lost: 4, pointsFor: 287, pointsAgainst: 210, points: 46, form: ['L', 'W', 'W', 'W', 'W'] },
      { position: 3, team: 'Kingston RFC', played: 14, won: 9, drawn: 1, lost: 4, pointsFor: 261, pointsAgainst: 224, points: 43, form: ['W', 'L', 'W', 'D', 'W'] },
      { position: 4, team: 'Barrie RFC', played: 14, won: 8, drawn: 0, lost: 6, pointsFor: 240, pointsAgainst: 238, points: 40, form: ['D', 'W', 'W', 'L', 'W'] },
      { position: 5, team: 'Hamilton RFC', played: 14, won: 7, drawn: 1, lost: 6, pointsFor: 228, pointsAgainst: 241, points: 35, form: ['L', 'W', 'L', 'W', 'D'] },
      { position: 6, team: 'Peterborough RFC', played: 14, won: 5, drawn: 0, lost: 9, pointsFor: 195, pointsAgainst: 278, points: 24, form: ['L', 'L', 'W', 'L', 'W'] },
      { position: 7, team: 'Sudbury Wolves RFC', played: 14, won: 3, drawn: 1, lost: 10, pointsFor: 168, pointsAgainst: 302, points: 15, form: ['L', 'D', 'L', 'L', 'L'] },
      { position: 8, team: 'Thunder Bay RFC', played: 14, won: 2, drawn: 0, lost: 12, pointsFor: 140, pointsAgainst: 340, points: 8, form: ['L', 'L', 'L', 'W', 'L'] },
    ],
  },
  {
    name: 'BC Premier Division',
    season: '2024 Season',
    rows: [
      { position: 1, team: 'Vancouver Ravens', played: 12, won: 10, drawn: 0, lost: 2, pointsFor: 298, pointsAgainst: 172, points: 50, form: ['W', 'W', 'W', 'W', 'L'] },
      { position: 2, team: 'Calgary Thunder', played: 12, won: 9, drawn: 1, lost: 2, pointsFor: 271, pointsAgainst: 188, points: 46, form: ['W', 'D', 'W', 'W', 'W'] },
      { position: 3, team: 'Victoria RFC', played: 12, won: 7, drawn: 0, lost: 5, pointsFor: 224, pointsAgainst: 215, points: 34, form: ['L', 'W', 'W', 'L', 'W'] },
      { position: 4, team: 'Kelowna RFC', played: 12, won: 5, drawn: 2, lost: 5, pointsFor: 198, pointsAgainst: 220, points: 28, form: ['D', 'L', 'W', 'W', 'D'] },
      { position: 5, team: 'Surrey Eagles RFC', played: 12, won: 4, drawn: 0, lost: 8, pointsFor: 170, pointsAgainst: 258, points: 20, form: ['L', 'L', 'W', 'L', 'L'] },
      { position: 6, team: 'Abbotsford RFC', played: 12, won: 1, drawn: 1, lost: 10, pointsFor: 128, pointsAgainst: 316, points: 7, form: ['L', 'L', 'D', 'L', 'L'] },
    ],
  },
];

const positionBadgeStyle: Record<number, string> = {
  1: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  2: 'bg-slate-400/20 text-slate-300 border border-slate-400/30',
  3: 'bg-orange-700/20 text-orange-400 border border-orange-700/30',
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

function StandingsTable({ league, leagueIndex }: { league: League; leagueIndex: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: leagueIndex * 0.15 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-amber-500" />
        <h2 className="text-foreground font-semibold">{league.name}</h2>
        <span className="text-muted-foreground text-sm">· {league.season}</span>
        <Badge variant="green" dot size="sm" className="ml-auto">Updated Live</Badge>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 pl-5 pr-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-12">#</th>
                <th className="py-3 px-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Club</th>
                <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-12">P</th>
                <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-12">W</th>
                <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-12">D</th>
                <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-12">L</th>
                <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-14">PF</th>
                <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-14">PA</th>
                <th className="py-3 px-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-16">Pts</th>
                <th className="py-3 pl-3 pr-5 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-32">Form</th>
              </tr>
            </thead>
            <tbody>
              {league.rows.map((row, i) => (
                <motion.tr
                  key={row.position}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: leagueIndex * 0.15 + 0.1 + i * 0.06 }}
                  className={`relative border-b last:border-b-0 transition-colors duration-200 ${
                    row.isUserTeam
                      ? 'border-red-900/30 bg-red-600/5 hover:bg-red-600/10'
                      : 'border-border hover:bg-foreground/2'
                  }`}
                >
                  <td className="py-3.5 pl-5 pr-3 relative">
                    {row.isUserTeam && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-600 rounded-r-full" />
                    )}
                    <PositionBadge position={row.position} />
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-sm ${row.isUserTeam ? 'text-foreground' : 'text-foreground/80'}`}>
                        {row.team}
                      </span>
                      {row.isUserTeam && <Badge variant="red" size="sm">Your Club</Badge>}
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center text-muted-foreground text-sm tabular-nums">{row.played}</td>
                  <td className="py-3.5 px-3 text-center text-muted-foreground text-sm tabular-nums">{row.won}</td>
                  <td className="py-3.5 px-3 text-center text-muted-foreground text-sm tabular-nums">{row.drawn}</td>
                  <td className="py-3.5 px-3 text-center text-muted-foreground text-sm tabular-nums">{row.lost}</td>
                  <td className="py-3.5 px-3 text-center text-muted-foreground text-sm tabular-nums">{row.pointsFor}</td>
                  <td className="py-3.5 px-3 text-center text-muted-foreground text-sm tabular-nums">{row.pointsAgainst}</td>
                  <td className="py-3.5 px-3 text-center">
                    <span className={`font-bold text-sm tabular-nums ${row.isUserTeam ? 'text-amber-400' : 'text-foreground'}`}>
                      {row.points}
                    </span>
                  </td>
                  <td className="py-3.5 pl-3 pr-5"><FormDots form={row.form} /></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="px-5 py-3 border-t border-border flex items-center gap-4 flex-wrap">
          <span className="text-muted-foreground text-xs font-medium">Form guide:</span>
          {(['W', 'L', 'D'] as FormResult[]).map((r) => (
            <div key={r} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${formDotStyle[r]}`} />
              <span className="text-muted-foreground text-xs">{formLabel[r]}</span>
            </div>
          ))}
          <span className="text-muted-foreground text-xs font-medium ml-4">PF = Points For · PA = Points Against</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function StandingsPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <Badge variant="gold" dot size="sm" className="mb-4">League Standings</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Full Standings
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Complete league tables, form guides, and points breakdowns for all Canadian rugby competitions.
            </p>
          </motion.div>

          {/* League tables */}
          <div className="space-y-12">
            {leagues.map((league, i) => (
              <StandingsTable key={league.name} league={league} leagueIndex={i} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
