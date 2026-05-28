'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Users, Shield, Trophy, TrendingUp, ArrowRight, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/layout/footer';
import { mockClubs } from '@/data/mock-clubs';
import { cn } from '@/lib/utils';

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((w) => w.length > 1 && w[0] === w[0].toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}

export default function ClubsPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex flex-col">
      {/* Hero */}
      <section className="pt-24 pb-12 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 hero-radial pointer-events-none" />
        <div className="absolute inset-0 rugby-grid opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <Badge variant="red" dot>Rugby Clubs</Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-4 leading-tight"
          >
            Canadian Rugby <span className="gradient-text">Clubs</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-muted-foreground text-lg max-w-2xl"
          >
            Discover Canada&apos;s premier rugby clubs — their history, achievements, players, and
            community impact across the nation.
          </motion.p>
        </div>
      </section>

      {/* Club Grid */}
      <section className="pb-12 px-4 sm:px-6 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockClubs.map((club, idx) => (
              <motion.div
                key={club.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              >
                <Link href={`/clubs/${club.id}`} className="block group">
                  <Card hover className="overflow-hidden flex flex-col h-full">
                    {/* Colored header band */}
                    <div
                      className="h-28 relative flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${club.colors.primary} 0%, ${club.colors.secondary} 100%)`,
                      }}
                    >
                      {/* Grid overlay */}
                      <div className="absolute inset-0 rugby-grid opacity-20" />
                      {/* Initials */}
                      <span className="relative text-4xl font-black text-white/90 tracking-tight drop-shadow-lg select-none">
                        {getInitials(club.name)}
                      </span>
                      {/* Division badge top-right */}
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-semibold bg-black/40 text-white/80 px-2 py-0.5 rounded-full backdrop-blur-sm">
                          Premier
                        </span>
                      </div>
                    </div>

                    <CardContent className="flex-1 flex flex-col gap-4">
                      {/* Club name & location */}
                      <div>
                        <h2 className="text-lg font-bold text-foreground group-hover:text-red-400 transition-colors">
                          {club.name}
                        </h2>
                        <div className="flex items-center gap-1.5 mt-1 text-muted-foreground text-sm">
                          <MapPin className="h-3.5 w-3.5 shrink-0" />
                          <span>{club.city}, {club.province}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{club.division}</p>
                      </div>

                      {/* Meta row */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="gray" size="sm">
                          <Calendar className="h-3 w-3 mr-0.5" />
                          Est. {club.founded}
                        </Badge>
                        <Badge variant="blue" size="sm">{club.division.split(' - ')[0]}</Badge>
                      </div>

                      {/* Stats grid */}
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { icon: Users, label: 'Players', value: club.stats.totalPlayers },
                          { icon: Shield, label: 'Teams', value: club.stats.totalTeams },
                          { icon: Trophy, label: 'Titles', value: club.stats.leagueTitles },
                          { icon: TrendingUp, label: 'Win Rate', value: `${club.stats.winRate}%` },
                        ].map(({ icon: Icon, label, value }) => (
                          <div
                            key={label}
                            className="bg-background border border-border rounded-lg p-2.5 flex items-center gap-2"
                          >
                            <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-foreground tabular-nums">{value}</p>
                              <p className="text-[10px] text-muted-foreground">{label}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="mt-auto pt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-1.5 group-hover:border-red-500/50 group-hover:text-white"
                        >
                          View Club <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
