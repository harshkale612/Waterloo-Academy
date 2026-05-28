'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Trophy, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { mockLeagues } from '@/data/mock-leagues';
import { cn } from '@/lib/utils';

function FormDot({ result }: { result: 'W' | 'L' | 'D' }) {
  return (
    <span className={cn(
      'inline-block h-2.5 w-2.5 rounded-sm',
      result === 'W' && 'bg-green-500',
      result === 'L' && 'bg-red-500',
      result === 'D' && 'bg-yellow-500',
    )} title={result === 'W' ? 'Win' : result === 'L' ? 'Loss' : 'Draw'} />
  );
}

export default function LeaguesPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="pt-24 pb-16">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-amber-400" />
              <Badge variant="gold">2024 Season</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              League <span className="gradient-text">Standings</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Live standings, rankings, and results from Canadian rugby competitions.
            </p>
          </motion.div>
        </div>

        {/* Leagues */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {mockLeagues.map((league, li) => (
            <motion.div
              key={league.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: li * 0.15 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{league.name}</h2>
                  <p className="text-sm text-muted-foreground">{league.province} · {league.season} Season</p>
                </div>
                <Link href="/dashboard/leagues">
                  <Button variant="ghost" size="sm">
                    Full Standings <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="card-dark overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th className="w-10">Pos</th>
                        <th>Team</th>
                        <th className="text-center">P</th>
                        <th className="text-center">W</th>
                        <th className="text-center">D</th>
                        <th className="text-center">L</th>
                        <th className="text-center">Pts</th>
                        <th className="text-center hidden md:table-cell">Form</th>
                      </tr>
                    </thead>
                    <tbody>
                      {league.standings.slice(0, 6).map((s) => (
                        <tr
                          key={s.teamId}
                          className={cn(s.isUserTeam && 'bg-red-600/5 border-l-2 border-l-red-500')}
                        >
                          <td>
                            <span className={cn(
                              'inline-flex items-center justify-center h-6 w-6 rounded font-bold text-xs',
                              s.position === 1 && 'bg-amber-500/20 text-amber-400',
                              s.position === 2 && 'bg-slate-500/20 text-slate-300',
                              s.position === 3 && 'bg-orange-500/20 text-orange-400',
                              s.position > 3 && 'text-muted-foreground',
                            )}>
                              {s.position}
                            </span>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-md bg-linear-to-br from-red-600/30 to-slate-700 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                                {s.teamShortName}
                              </div>
                              <span className={cn('font-medium', s.isUserTeam ? 'text-red-400' : 'text-foreground')}>
                                {s.teamName}
                              </span>
                              {s.isUserTeam && <Badge variant="red" size="sm">You</Badge>}
                            </div>
                          </td>
                          <td className="text-center text-muted-foreground">{s.played}</td>
                          <td className="text-center text-green-400 font-semibold">{s.won}</td>
                          <td className="text-center text-yellow-400">{s.drawn}</td>
                          <td className="text-center text-red-400">{s.lost}</td>
                          <td className="text-center font-bold text-foreground">{s.points}</td>
                          <td className="hidden md:table-cell">
                            <div className="flex items-center gap-1 justify-center">
                              {s.form.map((r, i) => <FormDot key={i} result={r} />)}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
