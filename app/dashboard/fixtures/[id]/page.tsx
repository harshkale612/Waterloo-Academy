'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DualProgress } from '@/components/ui/progress';
import { mockMatches } from '@/data/mock-matches';
import { cn, formatDate, formatTime, getMatchResult } from '@/lib/utils';
import { ArrowLeft, MapPin, Clock, User, Users, Calendar } from 'lucide-react';
import type { MatchEvent } from '@/types';

// ── Event Icon & Label ────────────────────────────────────────────────────────

function eventEmoji(type: MatchEvent['type']): string {
  switch (type) {
    case 'try':          return '🏉';
    case 'conversion':   return '🎯';
    case 'penalty':      return '⚽';
    case 'drop_goal':    return '🏹';
    case 'yellow_card':  return '🟡';
    case 'red_card':     return '🔴';
    case 'substitution': return '🔄';
    default:             return '•';
  }
}

function eventLabel(type: MatchEvent['type']): string {
  switch (type) {
    case 'try':          return 'Try';
    case 'conversion':   return 'Conversion';
    case 'penalty':      return 'Penalty';
    case 'drop_goal':    return 'Drop Goal';
    case 'yellow_card':  return 'Yellow Card';
    case 'red_card':     return 'Red Card';
    case 'substitution': return 'Substitution';
    default:             return type;
  }
}

function eventColor(type: MatchEvent['type']): string {
  switch (type) {
    case 'try':          return 'border-green-500/30 bg-green-500/5';
    case 'conversion':   return 'border-blue-500/30 bg-blue-500/5';
    case 'penalty':      return 'border-amber-500/30 bg-amber-500/5';
    case 'drop_goal':    return 'border-purple-500/30 bg-purple-500/5';
    case 'yellow_card':  return 'border-yellow-500/30 bg-yellow-500/5';
    case 'red_card':     return 'border-red-500/30 bg-red-500/5';
    case 'substitution': return 'border-slate-500/30 bg-slate-500/5';
    default:             return 'border-border';
  }
}

// ── Stat Row ──────────────────────────────────────────────────────────────────

function StatRow({
  label,
  homeValue,
  awayValue,
  isPercentage = false,
}: {
  label: string;
  homeValue: number;
  awayValue: number;
  isPercentage?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground tabular-nums">
          {homeValue}{isPercentage ? '%' : ''}
        </span>
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold text-foreground tabular-nums">
          {awayValue}{isPercentage ? '%' : ''}
        </span>
      </div>
      <DualProgress
        leftValue={homeValue}
        rightValue={awayValue}
        leftColor="bg-red-600"
        rightColor="bg-blue-600"
      />
    </div>
  );
}

// ── Team Circle ───────────────────────────────────────────────────────────────

const teamColors: Record<string, string> = {
  TOR: 'from-red-700 to-red-900',
  OTT: 'from-blue-700 to-blue-900',
  KGN: 'from-emerald-700 to-emerald-900',
  HAM: 'from-yellow-700 to-yellow-900',
  BAR: 'from-purple-700 to-purple-900',
  OSH: 'from-cyan-700 to-cyan-900',
  VAN: 'from-teal-700 to-teal-900',
  CGY: 'from-orange-700 to-orange-900',
};

function TeamCircleLarge({ shortName, name }: { shortName: string; name: string }) {
  const gradient = teamColors[shortName] ?? 'from-slate-600 to-slate-800';
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={cn(
          'h-16 w-16 rounded-full flex items-center justify-center text-sm font-black text-white bg-linear-to-br border border-white/10',
          gradient,
        )}
      >
        {shortName}
      </div>
      <span className="text-xs text-foreground/80 text-center max-w-30 leading-tight">{name}</span>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function MatchDetailPage() {
  const { id } = useParams<{ id: string }>();
  const match = mockMatches.find((m) => m.id === id) ?? mockMatches[0];

  const isCompleted = match.status === 'completed';
  const isLive = match.status === 'live';
  const hasScore = isCompleted || isLive;

  const userTeamId = 'toronto-arrows';
  const userSide =
    match.homeTeam.id === userTeamId
      ? 'home'
      : match.awayTeam.id === userTeamId
      ? 'away'
      : null;
  const result =
    isCompleted && userSide
      ? getMatchResult(match.homeTeam.score, match.awayTeam.score, userSide)
      : null;

  const homeEvents = match.events.filter((e) => e.team === 'home');
  const awayEvents = match.events.filter((e) => e.team === 'away');

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader
        title={`${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`}
        subtitle={match.leagueName}
        actions={
          <Link href="/dashboard/fixtures">
            <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Fixtures
            </Button>
          </Link>
        }
      />

      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-6 max-w-none">

        {/* ── Score Card ── */}
        <Card
          className={cn(
            isLive && 'border-red-600/40',
            result === 'W' && 'border-green-600/30',
            result === 'L' && 'border-red-600/30',
          )}
        >
          <CardContent className="p-6">
            {/* Status + Result */}
            <div className="flex items-center justify-center gap-3 mb-6">
              {isLive && <Badge variant="red" dot>LIVE</Badge>}
              {isCompleted && <Badge variant="gray">Full Time</Badge>}
              {match.status === 'upcoming' && <Badge variant="blue">Upcoming</Badge>}
              {result && (
                <Badge variant={result === 'W' ? 'green' : result === 'L' ? 'red' : 'yellow'}>
                  {result === 'W' ? 'WIN' : result === 'L' ? 'LOSS' : 'DRAW'}
                </Badge>
              )}
              {match.type === 'cup' && <Badge variant="gold">Cup</Badge>}
            </div>

            {/* Teams + Score */}
            <div className="flex items-center justify-center gap-6 sm:gap-12">
              <TeamCircleLarge shortName={match.homeTeam.shortName} name={match.homeTeam.name} />

              <div className="flex flex-col items-center gap-1">
                {hasScore ? (
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-black text-foreground tabular-nums">
                      {match.homeTeam.score ?? 0}
                    </span>
                    <span className="text-2xl text-muted-foreground">–</span>
                    <span className="text-5xl font-black text-foreground tabular-nums">
                      {match.awayTeam.score ?? 0}
                    </span>
                  </div>
                ) : (
                  <div className="text-muted-foreground text-xl font-medium">VS</div>
                )}
                <span className="text-xs text-muted-foreground mt-1">{match.round}</span>
              </div>

              <TeamCircleLarge shortName={match.awayTeam.shortName} name={match.awayTeam.name} />
            </div>

            {/* Meta Info */}
            <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                {formatDate(match.date, { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                {formatTime(match.time)}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                {match.venue}, {match.city}
              </span>
              {match.referee && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  Ref: {match.referee}
                </span>
              )}
              {match.attendance && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" />
                  {match.attendance.toLocaleString()} attendance
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* ── Match Stats ── */}
          {isCompleted && match.stats && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Match Statistics</CardTitle>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-600 inline-block" />
                      {match.homeTeam.shortName}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-blue-600 inline-block" />
                      {match.awayTeam.shortName}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <StatRow
                  label="Possession"
                  homeValue={match.stats.possession.home}
                  awayValue={match.stats.possession.away}
                  isPercentage
                />
                <StatRow
                  label="Territory"
                  homeValue={match.stats.territory.home}
                  awayValue={match.stats.territory.away}
                  isPercentage
                />
                <StatRow
                  label="Tries"
                  homeValue={match.stats.tries.home}
                  awayValue={match.stats.tries.away}
                />
                <StatRow
                  label="Metres Carried"
                  homeValue={match.stats.metresCarried.home}
                  awayValue={match.stats.metresCarried.away}
                />
                <StatRow
                  label="Tackles"
                  homeValue={match.stats.tackles.home}
                  awayValue={match.stats.tackles.away}
                />
                <StatRow
                  label="Turnovers"
                  homeValue={match.stats.turnovers.home}
                  awayValue={match.stats.turnovers.away}
                />
                <StatRow
                  label="Penalties"
                  homeValue={match.stats.penalties.home}
                  awayValue={match.stats.penalties.away}
                />
                <StatRow
                  label="Scrums"
                  homeValue={match.stats.scrums.home}
                  awayValue={match.stats.scrums.away}
                />
                <StatRow
                  label="Lineouts"
                  homeValue={match.stats.lineouts.home}
                  awayValue={match.stats.lineouts.away}
                />
              </CardContent>
            </Card>
          )}

          {/* ── Match Events Timeline ── */}
          {match.events.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Match Events</CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                {/* Column headers */}
                <div className="flex items-center text-[10px] text-muted-foreground uppercase tracking-wide mb-3 px-1">
                  <span className="flex-1 text-left">{match.homeTeam.shortName}</span>
                  <span className="w-12 text-center">Min</span>
                  <span className="flex-1 text-right">{match.awayTeam.shortName}</span>
                </div>

                <div className="space-y-2">
                  {[...match.events]
                    .sort((a, b) => a.minute - b.minute)
                    .map((event) => {
                      const isHome = event.team === 'home';
                      return (
                        <div
                          key={event.id}
                          className={cn(
                            'flex items-center gap-2 rounded-lg border px-3 py-2 transition-colors',
                            eventColor(event.type),
                          )}
                        >
                          {isHome ? (
                            <>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-foreground truncate">{event.player}</p>
                                <p className="text-[10px] text-muted-foreground">{eventLabel(event.type)}</p>
                                {event.description && (
                                  <p className="text-[10px] text-muted-foreground/70 mt-0.5 italic truncate">{event.description}</p>
                                )}
                              </div>
                              <div className="w-10 text-center shrink-0">
                                <span className="text-lg">{eventEmoji(event.type)}</span>
                                <p className="text-[10px] text-muted-foreground tabular-nums">{event.minute}&apos;</p>
                              </div>
                              <div className="flex-1" />
                            </>
                          ) : (
                            <>
                              <div className="flex-1" />
                              <div className="w-10 text-center shrink-0">
                                <span className="text-lg">{eventEmoji(event.type)}</span>
                                <p className="text-[10px] text-muted-foreground tabular-nums">{event.minute}&apos;</p>
                              </div>
                              <div className="flex-1 min-w-0 text-right">
                                <p className="text-xs font-semibold text-foreground truncate">{event.player}</p>
                                <p className="text-[10px] text-muted-foreground">{eventLabel(event.type)}</p>
                                {event.description && (
                                  <p className="text-[10px] text-muted-foreground/70 mt-0.5 italic truncate">{event.description}</p>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>
          )}

        </div>

        {/* No events fallback */}
        {match.events.length === 0 && !match.stats && (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground text-sm">
              No detailed match data available for this fixture.
            </CardContent>
          </Card>
        )}

        {/* ── Back Button ── */}
        <div>
          <Link href="/dashboard/fixtures">
            <Button variant="ghost" className="gap-1.5 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Fixtures &amp; Results
            </Button>
          </Link>
        </div>

      </main>
    </div>
  );
}
