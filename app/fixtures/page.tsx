'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/layout/footer';

type FixtureStatus = 'live' | 'upcoming' | 'result';

interface Fixture {
  id: number;
  homeTeam: string;
  homeInitials: string;
  homeColor: string;
  homeScore?: number;
  awayTeam: string;
  awayInitials: string;
  awayColor: string;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  competition: string;
  status: FixtureStatus;
  minute?: string;
}

const fixtures: Fixture[] = [
  {
    id: 1,
    homeTeam: 'Toronto Arrows RFC',
    homeInitials: 'TA',
    homeColor: '#DC2626',
    homeScore: 17,
    awayTeam: 'Hamilton RFC',
    awayInitials: 'HC',
    awayColor: '#1E40AF',
    awayScore: 14,
    date: 'Today',
    time: 'Live',
    venue: 'Tim Hortons Field, Hamilton',
    competition: 'ORU Premier Division · R14',
    status: 'live',
    minute: "52'",
  },
  {
    id: 2,
    homeTeam: 'Toronto Arrows RFC',
    homeInitials: 'TA',
    homeColor: '#DC2626',
    awayTeam: 'Kingston RFC',
    awayInitials: 'KR',
    awayColor: '#7C3AED',
    date: 'Oct 19',
    time: '14:00',
    venue: 'Lamport Stadium, Toronto',
    competition: 'ORU Premier Division · R15',
    status: 'upcoming',
  },
  {
    id: 3,
    homeTeam: 'Toronto Arrows RFC',
    homeInitials: 'TA',
    homeColor: '#DC2626',
    awayTeam: 'Ottawa Wolves RFC',
    awayInitials: 'OW',
    awayColor: '#059669',
    date: 'Nov 2',
    time: '14:00',
    venue: 'Lamport Stadium, Toronto',
    competition: 'ORU Cup Semi-Final',
    status: 'upcoming',
  },
  {
    id: 4,
    homeTeam: 'Vancouver Ravens',
    homeInitials: 'VR',
    homeColor: '#0369A1',
    awayTeam: 'Calgary Thunder',
    awayInitials: 'CT',
    awayColor: '#D97706',
    date: 'Oct 19',
    time: '16:00',
    venue: 'Burnaby Lake Rugby',
    competition: 'BC Premier Division',
    status: 'upcoming',
  },
  {
    id: 5,
    homeTeam: 'Barrie RFC',
    homeInitials: 'BR',
    homeColor: '#7C3AED',
    awayTeam: 'Kingston RFC',
    awayInitials: 'KR',
    awayColor: '#7C3AED',
    date: 'Oct 26',
    time: '13:00',
    venue: 'Barrie Rugby Club',
    competition: 'ORU Premier Division · R16',
    status: 'upcoming',
  },
  {
    id: 6,
    homeTeam: 'Ottawa Wolves RFC',
    homeInitials: 'OW',
    homeColor: '#059669',
    awayTeam: 'Hamilton RFC',
    awayInitials: 'HC',
    awayColor: '#1E40AF',
    date: 'Oct 26',
    time: '15:00',
    venue: 'Ottawa Stadium',
    competition: 'ORU Premier Division · R16',
    status: 'upcoming',
  },
  {
    id: 7,
    homeTeam: 'Toronto Arrows RFC',
    homeInitials: 'TA',
    homeColor: '#DC2626',
    homeScore: 28,
    awayTeam: 'Barrie RFC',
    awayInitials: 'BR',
    awayColor: '#7C3AED',
    awayScore: 10,
    date: 'Oct 12',
    time: 'FT',
    venue: 'Lamport Stadium, Toronto',
    competition: 'ORU Premier Division · R13',
    status: 'result',
  },
  {
    id: 8,
    homeTeam: 'Ottawa Wolves RFC',
    homeInitials: 'OW',
    homeColor: '#059669',
    homeScore: 21,
    awayTeam: 'Toronto Arrows RFC',
    awayInitials: 'TA',
    awayColor: '#DC2626',
    awayScore: 21,
    date: 'Oct 5',
    time: 'FT',
    venue: 'Ottawa Stadium',
    competition: 'ORU Premier Division · R12',
    status: 'result',
  },
];

function TeamLogo({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 border border-white/10"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

function FixtureRow({ fixture, delay }: { fixture: Fixture; delay: number }) {
  const isLive = fixture.status === 'live';
  const isResult = fixture.status === 'result';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`relative bg-card border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors duration-200 ${
        isLive
          ? 'border-red-600/50 hover:border-red-600/70'
          : 'border-border hover:border-muted-foreground/40'
      }`}
    >
      {isLive && (
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-600 to-transparent rounded-t-xl" />
      )}

      {/* Competition + date */}
      <div className="sm:w-48 shrink-0">
        <div className="text-[11px] text-muted-foreground font-medium truncate">{fixture.competition}</div>
        <div className="flex items-center gap-1.5 mt-1">
          {isLive ? (
            <Badge variant="red" dot size="sm">LIVE {fixture.minute}</Badge>
          ) : isResult ? (
            <span className="text-[11px] text-muted-foreground font-medium">Full Time</span>
          ) : (
            <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{fixture.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{fixture.time}</span>
            </div>
          )}
        </div>
      </div>

      {/* Match */}
      <div className="flex-1 flex items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <TeamLogo initials={fixture.homeInitials} color={fixture.homeColor} />
          <span className="text-foreground font-semibold text-sm truncate">{fixture.homeTeam}</span>
        </div>

        <div className="shrink-0 px-3 text-center">
          {isLive || isResult ? (
            <div className="bg-background border border-border rounded-lg px-3 py-1.5 flex items-center gap-2">
              <span className={`font-bold text-lg tabular-nums ${isLive ? 'text-foreground' : 'text-foreground/80'}`}>
                {fixture.homeScore}
              </span>
              <span className="text-muted-foreground text-sm">-</span>
              <span className={`font-bold text-lg tabular-nums ${isLive ? 'text-foreground' : 'text-foreground/80'}`}>
                {fixture.awayScore}
              </span>
            </div>
          ) : (
            <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest">vs</span>
          )}
        </div>

        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
          <span className="text-foreground font-semibold text-sm truncate text-right">{fixture.awayTeam}</span>
          <TeamLogo initials={fixture.awayInitials} color={fixture.awayColor} />
        </div>
      </div>

      {/* Venue */}
      <div className="sm:w-44 shrink-0 flex items-center gap-1.5 text-muted-foreground text-xs">
        <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
        <span className="truncate">{fixture.venue}</span>
      </div>
    </motion.div>
  );
}

const sections: { label: string; status: FixtureStatus }[] = [
  { label: 'Live Now', status: 'live' },
  { label: 'Upcoming', status: 'upcoming' },
  { label: 'Results', status: 'result' },
];

export default function FixturesPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
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
            <Badge variant="red" dot size="sm" className="mb-4">Live Match Tracking</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              All Fixtures
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Live scores, upcoming fixtures, and recent results from Canadian rugby competitions.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map(({ label, status }) => {
              const group = fixtures.filter((f) => f.status === status);
              if (group.length === 0) return null;
              return (
                <div key={status}>
                  <div className="flex items-center gap-2 mb-4">
                    {status === 'live' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    )}
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      {label}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {group.map((fixture, i) => (
                      <FixtureRow key={fixture.id} fixture={fixture} delay={i * 0.06} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
