'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { mockLeagues } from '@/data/mock-leagues';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { Trophy, Globe, Calendar, Users, Plus, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import type { LeagueStanding } from '@/types';

// ── Form Dot ──────────────────────────────────────────────────────────────────

function FormDot({ result }: { result: 'W' | 'L' | 'D' }) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center h-4 w-4 rounded text-[9px] font-bold',
        result === 'W' && 'bg-green-500/20 text-green-400',
        result === 'L' && 'bg-red-500/20 text-red-400',
        result === 'D' && 'bg-yellow-500/20 text-yellow-400',
      )}
      title={result === 'W' ? 'Win' : result === 'L' ? 'Loss' : 'Draw'}
    >
      {result}
    </span>
  );
}

// ── Position Badge ─────────────────────────────────────────────────────────────

function PositionBadge({ position }: { position: number }) {
  if (position === 1) {
    return (
      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-400/20 text-amber-400 text-xs font-black border border-amber-400/30">
        1
      </span>
    );
  }
  if (position === 2) {
    return (
      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-300/20 text-slate-500 dark:text-slate-300 text-xs font-black border border-slate-300/30">
        2
      </span>
    );
  }
  if (position === 3) {
    return (
      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-700/20 text-amber-600 text-xs font-black border border-amber-700/30">
        3
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center h-6 w-6 text-xs font-bold text-muted-foreground tabular-nums">
      {position}
    </span>
  );
}

// ── Standings Table ───────────────────────────────────────────────────────────

function StandingsTable({ standings }: { standings: LeagueStanding[] }) {
  const sorted = [...standings].sort((a, b) => b.points - a.points);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-2 px-2 text-muted-foreground font-medium w-8">Pos</th>
            <th className="text-left py-2 px-2 text-muted-foreground font-medium min-w-35">Team</th>
            <th className="text-center py-2 px-2 text-muted-foreground font-medium w-8">P</th>
            <th className="text-center py-2 px-2 text-muted-foreground font-medium w-8">W</th>
            <th className="text-center py-2 px-2 text-muted-foreground font-medium w-8">D</th>
            <th className="text-center py-2 px-2 text-muted-foreground font-medium w-8">L</th>
            <th className="text-center py-2 px-2 text-muted-foreground font-medium w-10">PF</th>
            <th className="text-center py-2 px-2 text-muted-foreground font-medium w-10">PA</th>
            <th className="text-center py-2 px-2 text-muted-foreground font-medium w-10">Diff</th>
            <th className="text-center py-2 px-2 text-muted-foreground font-medium w-8">BP</th>
            <th className="text-left py-2 px-2 text-muted-foreground font-medium w-16">Form</th>
            <th className="text-center py-2 px-2 text-muted-foreground font-medium w-10">
              <span className="text-foreground font-semibold">Pts</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {sorted.map((row) => (
            <tr
              key={row.teamId}
              className={cn(
                'transition-colors',
                row.isUserTeam
                  ? 'bg-red-600/6 hover:bg-red-600/10 border-l-2 border-l-red-600'
                  : 'hover:bg-foreground/2',
              )}
            >
              <td className="py-3 px-2">
                <PositionBadge position={row.position} />
              </td>
              <td className="py-3 px-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={cn(
                      'h-6 w-6 rounded flex items-center justify-center text-[9px] font-bold shrink-0',
                      row.isUserTeam
                        ? 'bg-linear-to-br from-red-600 to-red-800 text-white'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    {row.teamShortName}
                  </div>
                  <span
                    className={cn(
                      'truncate',
                      row.isUserTeam ? 'text-foreground font-semibold' : 'text-foreground/75',
                    )}
                  >
                    {row.teamName}
                  </span>
                  {row.isUserTeam && (
                    <Badge variant="red" size="sm">You</Badge>
                  )}
                </div>
              </td>
              <td className="py-3 px-2 text-center text-foreground/80 tabular-nums">{row.played}</td>
              <td className="py-3 px-2 text-center text-green-400 tabular-nums font-medium">{row.won}</td>
              <td className="py-3 px-2 text-center text-yellow-400 tabular-nums">{row.drawn}</td>
              <td className="py-3 px-2 text-center text-red-400 tabular-nums">{row.lost}</td>
              <td className="py-3 px-2 text-center text-foreground/80 tabular-nums">{row.pointsFor}</td>
              <td className="py-3 px-2 text-center text-muted-foreground tabular-nums">{row.pointsAgainst}</td>
              <td
                className={cn(
                  'py-3 px-2 text-center font-medium tabular-nums',
                  row.pointsDiff > 0 ? 'text-green-400' : row.pointsDiff < 0 ? 'text-red-400' : 'text-muted-foreground',
                )}
              >
                {row.pointsDiff > 0 ? '+' : ''}{row.pointsDiff}
              </td>
              <td className="py-3 px-2 text-center text-muted-foreground tabular-nums">{row.bonusPoints}</td>
              <td className="py-3 px-2">
                {row.form && (
                  <div className="flex items-center gap-0.5">
                    {row.form.map((f, i) => (
                      <FormDot key={i} result={f} />
                    ))}
                  </div>
                )}
              </td>
              <td className="py-3 px-2 text-center">
                <span
                  className={cn(
                    'text-sm font-black tabular-nums',
                    row.isUserTeam ? 'text-red-400' : 'text-foreground',
                  )}
                >
                  {row.points}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LeaguesPage() {
  const { toast } = useToast();
  const [leagues, setLeagues] = useState([...mockLeagues]);
  const [selectedLeagueId, setSelectedLeagueId] = useState('oru-premier');

  const selectedLeague = leagues.find((l) => l.id === selectedLeagueId) ?? leagues[0];
  const totalMatches = selectedLeague
    ? selectedLeague.standings.reduce((sum, s) => sum + s.played, 0) / 2
    : 0;

  function handleDeleteLeague(id: string) {
    setLeagues((prev) => {
      const next = prev.filter((l) => l.id !== id);
      if (selectedLeagueId === id && next.length > 0) {
        setSelectedLeagueId(next[0].id);
      }
      return next;
    });
  }

  function handleEditLeague(id: string) {
    const league = leagues.find((l) => l.id === id);
    toast(`Edit form for ${league?.shortName ?? 'league'} coming soon`, 'info');
  }

  if (leagues.length === 0) {
    return (
      <div className="flex flex-col min-h-full">
        <DashboardHeader
          title="Leagues & Standings"
          subtitle="Season 2024 · Club Competitions"
          actions={
            <Button size="sm" className="gap-1.5" onClick={() => toast('Add League form coming soon', 'info')}>
              <Plus className="h-3.5 w-3.5" />
              Add League
            </Button>
          }
        />
        <main className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
          No leagues. Add one to get started.
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader
        title="Leagues & Standings"
        subtitle="Season 2024 · Club Competitions"
        actions={
          <Button size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Add League
          </Button>
        }
      />

      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-6 max-w-none">

        {/* ── League Selector ── */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            Select Competition
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leagues.map((league) => (
              <div key={league.id} className="relative group/league">
                <button
                  onClick={() => setSelectedLeagueId(league.id)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl border transition-all duration-200',
                    selectedLeagueId === league.id
                      ? 'bg-red-600/10 border-red-600/50 ring-1 ring-red-600/30'
                      : 'bg-card border-border hover:border-muted-foreground/40',
                  )}
                >
                  <div className="flex items-start gap-3 pr-8">
                    <div
                      className={cn(
                        'h-9 w-9 rounded-lg flex items-center justify-center shrink-0',
                        selectedLeagueId === league.id
                          ? 'bg-red-600/20'
                          : 'bg-muted',
                      )}
                    >
                      <Trophy
                        className={cn(
                          'h-4 w-4',
                          selectedLeagueId === league.id ? 'text-red-400' : 'text-muted-foreground',
                        )}
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          'text-sm font-semibold truncate',
                          selectedLeagueId === league.id ? 'text-foreground' : 'text-foreground/75',
                        )}
                      >
                        {league.shortName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{league.country} · {league.province}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Badge
                          variant={selectedLeagueId === league.id ? 'red' : 'gray'}
                          size="sm"
                        >
                          {league.season}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground/60">{league.standings.length} teams</span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Per-league action menu */}
                <div className="absolute top-2 right-2 z-10 opacity-0 group-hover/league:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="h-7 w-7 rounded-md bg-background/90 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditLeague(league.id)}>
                        <Pencil className="h-3.5 w-3.5" />
                        Edit League
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="danger" onClick={() => handleDeleteLeague(league.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Season Info Card ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Competition</p>
                  <p className="text-sm font-semibold text-foreground truncate">{selectedLeague.shortName}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Season</p>
                  <p className="text-sm font-semibold text-foreground">{selectedLeague.season}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Teams</p>
                  <p className="text-sm font-semibold text-foreground">{selectedLeague.standings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Matches Played</p>
                  <p className="text-sm font-semibold text-foreground">{totalMatches}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Full Standings Table ── */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle>{selectedLeague.name}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{selectedLeague.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="gold" dot>Season {selectedLeague.season}</Badge>
                <Badge variant="gray" size="sm">{selectedLeague.division}</Badge>
                <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => handleEditLeague(selectedLeague.id)}>
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 pb-2">
            <StandingsTable standings={selectedLeague.standings} />
          </CardContent>
        </Card>

        {/* ── Legend ── */}
        <div className="flex items-center gap-6 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-amber-400/60 inline-block" />
            1st — Championship / Promotion
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-600/60 inline-block" />
            Your team
          </span>
          <span className="flex items-center gap-1.5">BP — Bonus Points</span>
        </div>

      </main>
    </div>
  );
}
