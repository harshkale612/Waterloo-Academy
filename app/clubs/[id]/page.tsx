'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin, Phone, Mail, Globe, AtSign, Hash, Share2, PlayCircle,
  Users, Shield, Trophy, TrendingUp, ChevronLeft, Calendar, Award,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const tierColors: Record<string, string> = {
  platinum: 'bg-slate-300/10 text-slate-200 border border-slate-300/20',
  gold: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
  silver: 'bg-slate-400/15 text-slate-300 border border-slate-400/20',
  bronze: 'bg-orange-600/15 text-orange-400 border border-orange-600/20',
};

const achievementTypeColors: Record<string, string> = {
  championship: 'gold',
  cup: 'blue',
  award: 'purple',
  milestone: 'green',
} as const;

export default function ClubDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const club = mockClubs.find((c) => c.id === id) ?? mockClubs[0];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex flex-col">
      {/* Hero */}
      <section className="pt-24 pb-0 relative overflow-hidden">
        {/* Background band */}
        <div
          className="absolute inset-0 h-72"
          style={{
            background: `linear-gradient(135deg, ${club.colors.primary}33 0%, ${club.colors.secondary}22 60%, transparent 100%)`,
          }}
        />
        <div className="absolute inset-0 h-72 rugby-grid opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          {/* Back */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Link href="/clubs">
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
                <ChevronLeft className="h-4 w-4" /> All Clubs
              </Button>
            </Link>
          </motion.div>

          {/* Club identity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-8"
          >
            {/* Logo / initials */}
            <div
              className="h-24 w-24 rounded-2xl flex items-center justify-center text-4xl font-black text-foreground shadow-2xl shrink-0 border-2 border-white/10"
              style={{
                background: `linear-gradient(135deg, ${club.colors.primary}, ${club.colors.secondary})`,
              }}
            >
              {getInitials(club.name)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="gray" size="sm">
                  <Calendar className="h-3 w-3 mr-0.5" /> Est. {club.founded}
                </Badge>
                <Badge variant="blue" size="sm">{club.division}</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">{club.name}</h1>
              <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{club.city}, {club.province}, {club.country}</span>
              </div>
              <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed text-sm">{club.description}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="flex-1 px-4 sm:px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Users, label: 'Total Players', value: club.stats.totalPlayers, color: 'text-red-400' },
                { icon: Shield, label: 'Active Teams', value: club.stats.totalTeams, color: 'text-blue-400' },
                { icon: Trophy, label: 'League Titles', value: club.stats.leagueTitles, color: 'text-amber-400' },
                { icon: TrendingUp, label: 'Win Rate', value: `${club.stats.winRate}%`, color: 'text-green-400' },
              ].map(({ icon: Icon, label, value, color }, i) => (
                <Card key={label} className="bg-card border-border">
                  <CardContent className="flex items-center gap-4 py-4">
                    <div className={cn('h-10 w-10 rounded-xl bg-background border border-border flex items-center justify-center shrink-0', color)}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground tabular-nums">{value}</p>
                      <p className="text-xs text-muted-foreground">{label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column: achievements + sponsors */}
            <div className="lg:col-span-2 space-y-8">

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.26 }}
              >
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-amber-400" /> Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {club.achievements.map((a) => (
                        <div
                          key={a.id}
                          className="flex items-start gap-4 p-3 rounded-lg bg-background border border-border"
                        >
                          <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                            <Trophy className="h-4 w-4 text-amber-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-semibold text-foreground">{a.title}</p>
                              <Badge
                                variant={(achievementTypeColors[a.type] ?? 'gray') as 'gold' | 'blue' | 'purple' | 'green' | 'gray'}
                                size="sm"
                              >
                                {a.type}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{a.description}</p>
                          </div>
                          <span className="text-sm font-bold text-amber-400 tabular-nums shrink-0">{a.year}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Sponsors */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32 }}
              >
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Club Sponsors</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {club.sponsors.map((sponsor) => (
                        <div
                          key={sponsor.id}
                          className="p-3 rounded-lg bg-background border border-border flex items-center gap-2.5"
                        >
                          <div className="h-8 w-8 rounded-lg bg-card border border-border flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-muted-foreground">
                              {sponsor.name.slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-foreground truncate">{sponsor.name}</p>
                            <span className={cn('text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full', tierColors[sponsor.tier])}>
                              {sponsor.tier}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right column: contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="space-y-6"
            >
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { icon: MapPin, label: 'Address', value: `${club.contact.address}, ${club.contact.city}` },
                    { icon: Phone, label: 'Phone', value: club.contact.phone },
                    { icon: Mail, label: 'Email', value: club.contact.email },
                    { icon: Globe, label: 'Website', value: club.contact.website },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="h-7 w-7 rounded-lg bg-background border border-border flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                        <p className="text-sm text-foreground/80 mt-0.5">{value}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Social Media</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {club.socialMedia.twitter && (
                    <a href="#" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                      <AtSign className="h-4 w-4 text-blue-400 shrink-0" />
                      <span className="text-sm text-foreground/80 group-hover:text-foreground">{club.socialMedia.twitter}</span>
                    </a>
                  )}
                  {club.socialMedia.instagram && (
                    <a href="#" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                      <Hash className="h-4 w-4 text-pink-400 shrink-0" />
                      <span className="text-sm text-foreground/80 group-hover:text-foreground">{club.socialMedia.instagram}</span>
                    </a>
                  )}
                  {club.socialMedia.facebook && (
                    <a href="#" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                      <Share2 className="h-4 w-4 text-blue-500 shrink-0" />
                      <span className="text-sm text-foreground/80 group-hover:text-foreground">{club.socialMedia.facebook}</span>
                    </a>
                  )}
                  {club.socialMedia.youtube && (
                    <a href="#" className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group">
                      <PlayCircle className="h-4 w-4 text-red-500 shrink-0" />
                      <span className="text-sm text-foreground/80 group-hover:text-foreground">{club.socialMedia.youtube}</span>
                    </a>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
