'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface TeamLogoProps {
  initials: string;
  color: string;
}

function TeamLogo({ initials, color }: TeamLogoProps) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 border border-white/10"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

interface FixtureCardProps {
  homeTeam: string;
  homeInitials: string;
  homeColor: string;
  awayTeam: string;
  awayInitials: string;
  awayColor: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  delay?: number;
}

function FixtureCard({
  homeTeam,
  homeInitials,
  homeColor,
  awayTeam,
  awayInitials,
  awayColor,
  date,
  time,
  venue,
  competition,
  delay = 0,
}: FixtureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card border border-border rounded-xl p-5 flex flex-col gap-4 hover:border-red-600/40 transition-colors duration-300 cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <Badge variant="gray" size="sm">{competition}</Badge>
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <Calendar className="w-3 h-3" />
          <span>{date}</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <TeamLogo initials={homeInitials} color={homeColor} />
          <span className="text-foreground font-semibold text-sm truncate">{homeTeam}</span>
        </div>

        <div className="flex flex-col items-center shrink-0 px-2">
          <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest">vs</span>
        </div>

        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
          <span className="text-foreground font-semibold text-sm truncate text-right">{awayTeam}</span>
          <TeamLogo initials={awayInitials} color={awayColor} />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-1 border-t border-border">
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <Clock className="w-3 h-3 text-amber-500" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <MapPin className="w-3 h-3 text-amber-500" />
          <span className="truncate">{venue}</span>
        </div>
      </div>
    </motion.div>
  );
}

function LiveMatchCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-card border border-red-600/50 rounded-xl p-5 flex flex-col gap-4 relative overflow-hidden cursor-pointer"
    >
      {/* Red glow top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-600 to-transparent" />

      <div className="flex items-center justify-between">
        <Badge variant="red" dot size="sm">LIVE</Badge>
        <span className="text-muted-foreground text-xs">Rugby Ontario · Senior Men R9</span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <TeamLogo initials="WC" color="#DC2626" />
          <span className="text-foreground font-semibold text-sm truncate">County Senior Men</span>
        </div>

        <div className="flex flex-col items-center shrink-0 px-3">
          <div className="bg-background border border-border rounded-lg px-3 py-1.5 flex items-center gap-2">
            <span className="text-foreground font-bold text-lg tabular-nums">21</span>
            <span className="text-muted-foreground text-sm">-</span>
            <span className="text-foreground font-bold text-lg tabular-nums">14</span>
          </div>
          <span className="text-red-400 text-[10px] font-semibold mt-1 animate-pulse">64&apos;</span>
        </div>

        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
          <span className="text-foreground font-semibold text-sm truncate text-right">Hamilton RFC</span>
          <TeamLogo initials="HC" color="#1E40AF" />
        </div>
      </div>

      <div className="flex items-center gap-4 pt-1 border-t border-red-900/30">
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          <MapPin className="w-3 h-3 text-amber-500" />
          <span>Bluevale Park, Waterloo</span>
        </div>
      </div>
    </motion.div>
  );
}

export function LandingFixtures() {
  return (
    <section className="py-20 px-4 bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="red" dot size="sm" className="mb-4">Live Match Tracking</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upcoming Fixtures
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real-time scores, fixture schedules, and competition standings — all in one place for your club.
          </p>
        </motion.div>

        {/* Live match highlight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-3"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
            Happening Now
          </p>
        </motion.div>
        <div className="mb-8">
          <LiveMatchCard />
        </div>

        {/* Upcoming fixtures grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-3"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Upcoming
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <FixtureCard
            homeTeam="County U18 Men"
            homeInitials="U18"
            homeColor="#DC2626"
            awayTeam="Guelph RFC"
            awayInitials="GR"
            awayColor="#7C3AED"
            date="Jun 7"
            time="13:00"
            venue="Bluevale Park, Waterloo"
            competition="Rugby Ontario · U18 Men R10"
            delay={0}
          />
          <FixtureCard
            homeTeam="County Senior Women"
            homeInitials="SW"
            homeColor="#DB2777"
            awayTeam="Ottawa Wolves Women"
            awayInitials="OW"
            awayColor="#059669"
            date="Jun 14"
            time="14:00"
            venue="Bluevale Park, Waterloo"
            competition="Rugby Ontario · Senior Women R7"
            delay={0.1}
          />
          <FixtureCard
            homeTeam="County U16 Boys"
            homeInitials="U16"
            homeColor="#F59E0B"
            awayTeam="Burlington RFC"
            awayInitials="BR"
            awayColor="#0369A1"
            date="Jun 21"
            time="11:00"
            venue="RIM Park, Waterloo"
            competition="Rugby Ontario · U16 Boys R8"
            delay={0.2}
          />
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/fixtures">
            <Button variant="ghost" size="lg" className="group text-muted-foreground hover:text-foreground">
              View All Fixtures
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
