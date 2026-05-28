'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  mockMatches,
  getUpcomingMatches,
  getCompletedMatches,
  getLiveMatches,
} from '@/data/mock-matches';
import { cn, formatDate, formatTime, getMatchResult } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { MapPin, Clock, Users, Zap, Plus, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import type { Match, MatchType } from '@/types';

// ── Helpers ──────────────────────────────────────────────────────────────────

function TeamCircle({ shortName, color }: { shortName: string; color: string }) {
  return (
    <div
      className={cn(
        'h-10 w-10 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 border border-white/10',
        color,
      )}
    >
      {shortName}
    </div>
  );
}

const teamColors: Record<string, string> = {
  TOR: 'bg-red-700',
  OTT: 'bg-blue-700',
  KGN: 'bg-emerald-700',
  HAM: 'bg-yellow-700',
  BAR: 'bg-purple-700',
  OSH: 'bg-cyan-700',
  VAN: 'bg-teal-700',
  CGY: 'bg-orange-700',
};

function getTeamColor(shortName: string): string {
  return teamColors[shortName] ?? 'bg-slate-600';
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'live') return <Badge variant="red" dot>LIVE</Badge>;
  if (status === 'completed') return <Badge variant="gray">FT</Badge>;
  if (status === 'upcoming') return <Badge variant="blue">Upcoming</Badge>;
  if (status === 'postponed') return <Badge variant="yellow">Postponed</Badge>;
  return <Badge variant="gray">{status}</Badge>;
}

function TypeBadge({ type }: { type: MatchType }) {
  if (type === 'cup') return <Badge variant="gold" size="sm">Cup</Badge>;
  if (type === 'league') return <Badge variant="blue" size="sm">League</Badge>;
  if (type === 'friendly') return <Badge variant="gray" size="sm">Friendly</Badge>;
  return <Badge variant="gray" size="sm">{type}</Badge>;
}

function ResultIndicator({ result }: { result: 'W' | 'L' | 'D' | null }) {
  if (!result) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-5 w-5 rounded text-[10px] font-bold',
        result === 'W' && 'bg-green-500/20 text-green-400',
        result === 'L' && 'bg-red-500/20 text-red-400',
        result === 'D' && 'bg-yellow-500/20 text-yellow-400',
      )}
    >
      {result}
    </span>
  );
}

function MatchCard({
  match,
  onEdit,
  onDelete,
}: {
  match: Match;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}) {
  const isCompleted = match.status === 'completed';
  const isLive = match.status === 'live';
  const isUpcoming = match.status === 'upcoming';
  const userTeamId = 'toronto-arrows';
  const isUserHome = match.homeTeam.id === userTeamId;
  const isUserAway = match.awayTeam.id === userTeamId;
  const userSide = isUserHome ? 'home' : isUserAway ? 'away' : null;

  const result =
    isCompleted && userSide
      ? getMatchResult(match.homeTeam.score, match.awayTeam.score, userSide)
      : null;

  return (
    <div className="relative group/match">
      <Link href={`/dashboard/fixtures/${match.id}`}>
        <Card
          hover
          className={cn(
            'transition-all duration-200',
            isLive && 'border-red-600/40 bg-red-600/4',
            result === 'W' && 'border-green-600/30',
            result === 'L' && 'border-red-600/30',
          )}
        >
          <CardContent className="p-4">
            {/* Top row: competition + status */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <TypeBadge type={match.type} />
                <span className="text-[11px] text-muted-foreground truncate">{match.leagueName}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {match.round && (
                  <span className="text-[10px] text-muted-foreground/60">{match.round}</span>
                )}
                <StatusBadge status={match.status} />
              </div>
            </div>

            {/* Teams + Score row */}
            <div className="flex items-center gap-3">
              {/* Home team */}
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <TeamCircle
                  shortName={match.homeTeam.shortName}
                  color={getTeamColor(match.homeTeam.shortName)}
                />
                <span
                  className={cn(
                    'text-sm font-semibold truncate',
                    match.homeTeam.id === userTeamId ? 'text-foreground' : 'text-foreground/75',
                  )}
                >
                  {match.homeTeam.name}
                </span>
              </div>

              {/* Score / vs */}
              <div className="flex flex-col items-center shrink-0 mx-1">
                {isCompleted || isLive ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-foreground tabular-nums">
                      {match.homeTeam.score ?? 0}
                    </span>
                    <span className="text-muted-foreground text-sm">–</span>
                    <span className="text-2xl font-black text-foreground tabular-nums">
                      {match.awayTeam.score ?? 0}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-xs font-medium">VS</span>
                  </div>
                )}
                {result && (
                  <div className="mt-1">
                    <ResultIndicator result={result} />
                  </div>
                )}
                {isLive && (
                  <span className="text-[10px] text-red-400 font-semibold animate-pulse mt-0.5">LIVE</span>
                )}
              </div>

              {/* Away team */}
              <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                <span
                  className={cn(
                    'text-sm font-semibold truncate text-right',
                    match.awayTeam.id === userTeamId ? 'text-foreground' : 'text-foreground/75',
                  )}
                >
                  {match.awayTeam.name}
                </span>
                <TeamCircle
                  shortName={match.awayTeam.shortName}
                  color={getTeamColor(match.awayTeam.shortName)}
                />
              </div>
            </div>

            {/* Bottom row: date/time/venue */}
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border min-w-0">
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground shrink-0">
                <Clock className="h-3 w-3 shrink-0" />
                {formatDate(match.date, { day: 'numeric', month: 'short', year: 'numeric' })}
                {' · '}
                {formatTime(match.time)}
              </span>
              <span className="hidden sm:flex items-center gap-1 text-[11px] text-muted-foreground min-w-0">
                <MapPin className="h-3 w-3 shrink-0" />
                <span className="truncate">{match.venue}</span>
              </span>
              {match.attendance && isCompleted && (
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground/60 ml-auto shrink-0">
                  <Users className="h-3 w-3" />
                  {match.attendance.toLocaleString()}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Action menu — only for upcoming/editable matches */}
      {(isUpcoming || isLive) && onEdit && onDelete && (
        <div className="absolute top-2 right-2 z-10 opacity-0 group-hover/match:opacity-100 transition-opacity">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="h-7 w-7 rounded-md bg-background/90 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(match.id)}>
                <Pencil className="h-3.5 w-3.5" />
                Edit Fixture
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="danger" onClick={() => onDelete(match.id)}>
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}

// ── Filter Bar ────────────────────────────────────────────────────────────────

type FilterType = 'all' | 'league' | 'cup' | 'friendly';
const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'League', value: 'league' },
  { label: 'Cup', value: 'cup' },
  { label: 'Friendly', value: 'friendly' },
];

function filterMatches(matches: Match[], filter: FilterType): Match[] {
  if (filter === 'all') return matches;
  return matches.filter((m) => m.type === filter);
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function FixturesPage() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<FilterType>('all');
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  const liveMatches = getLiveMatches().filter((m) => !deletedIds.has(m.id));
  const upcomingMatches = filterMatches(
    getUpcomingMatches().filter((m) => !deletedIds.has(m.id)),
    filter
  );
  const completedMatches = filterMatches(
    getCompletedMatches().filter((m) => !deletedIds.has(m.id)),
    filter
  );
  const allMatches = filterMatches(
    mockMatches.filter((m) => !deletedIds.has(m.id)),
    filter
  );

  function handleDelete(id: string) {
    setDeletedIds((prev) => new Set([...prev, id]));
    toast('Fixture deleted', 'success');
  }

  function handleEdit(id: string) {
    toast('Edit fixture form coming soon', 'info');
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader
        title="Fixtures & Results"
        subtitle="Season 2024 · ORU Premier Division"
        actions={
          <Button size="sm" className="gap-1.5" onClick={() => toast('Add Fixture form coming soon', 'info')}>
            <Plus className="h-3.5 w-3.5" />
            Add Fixture
          </Button>
        }
      />

      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-6 max-w-none">

        {/* ── Live Match Banner ── */}
        {liveMatches.length > 0 && liveMatches.map((lm) => (
          <Link key={lm.id} href={`/dashboard/fixtures/${lm.id}`} className="block mb-2">
            <div className="flex flex-wrap items-center gap-4 bg-red-600/10 border border-red-600/40 rounded-xl px-6 sm:px-8 py-5 cursor-pointer hover:bg-red-600/15 transition-colors">
              <div className="flex items-center gap-2 shrink-0">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                <Badge variant="red">LIVE</Badge>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <span className="text-sm font-semibold text-foreground truncate">{lm.homeTeam.shortName}</span>
                <span className="hidden sm:inline text-sm font-semibold text-foreground truncate">{lm.homeTeam.name}</span>
                <span className="text-xl font-black text-foreground tabular-nums shrink-0">
                  {lm.homeTeam.score ?? 0} – {lm.awayTeam.score ?? 0}
                </span>
                <span className="text-sm font-semibold text-foreground truncate">{lm.awayTeam.shortName}</span>
                <span className="hidden sm:inline text-sm font-semibold text-foreground truncate">{lm.awayTeam.name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Zap className="h-3.5 w-3.5 text-red-400" />
                <span className="text-xs text-red-300 font-medium">In Progress</span>
                <span className="hidden sm:inline text-xs text-muted-foreground">· {lm.venue}</span>
              </div>
            </div>
          </Link>
        ))}

        {/* ── Filter Row ── */}
        <div className="flex items-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                filter === f.value
                  ? 'bg-red-600 text-white'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground/40',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ── Tabs ── */}
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">
              Upcoming
              {upcomingMatches.length > 0 && (
                <span className="ml-1.5 text-[10px] bg-white/10 rounded px-1">
                  {upcomingMatches.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="results">
              Results
              {completedMatches.length > 0 && (
                <span className="ml-1.5 text-[10px] bg-white/10 rounded px-1">
                  {completedMatches.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="all">All Fixtures</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingMatches.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-sm">No upcoming matches found.</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {upcomingMatches.map((m) => (
                  <MatchCard key={m.id} match={m} onEdit={handleEdit} onDelete={handleDelete} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="results">
            {completedMatches.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-sm">No results found.</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {completedMatches.map((m) => <MatchCard key={m.id} match={m} />)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="all">
            {allMatches.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-sm">No fixtures found.</div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {allMatches.map((m) => (
                  <MatchCard
                    key={m.id}
                    match={m}
                    onEdit={m.status === 'upcoming' ? handleEdit : undefined}
                    onDelete={m.status === 'upcoming' ? handleDelete : undefined}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

      </main>
    </div>
  );
}
