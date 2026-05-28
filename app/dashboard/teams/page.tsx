'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Trophy, ChevronRight, MapPin, Plus, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { getTeamsByClub } from '@/data/mock-teams';
import { useToast } from '@/components/ui/toast';
import type { Team } from '@/types';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: 'easeOut' as const },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

function getPositionBadge(position: number) {
  if (position === 1)
    return <Badge variant="gold" size="sm" className="font-bold">1st</Badge>;
  if (position === 2)
    return <Badge variant="gray" size="sm" className="font-bold">2nd</Badge>;
  return <Badge variant="gray" size="sm">{position}th</Badge>;
}

function TeamCard({
  team,
  onEdit,
  onDelete,
}: {
  team: Team;
  onEdit: (team: Team) => void;
  onDelete: (id: string) => void;
}) {
  const winRate = team.stats.played > 0
    ? Math.round((team.stats.won / team.stats.played) * 100)
    : 0;

  return (
    <motion.div variants={fadeUp} className="relative group/card">
      <Link href={`/dashboard/teams/${team.id}`} className="block group">
        <Card className="hover:border-red-600/40 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-red-900/20 h-full">
          <CardContent className="p-5 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Kit swatches */}
                <div className="relative h-10 w-10 shrink-0">
                  <span
                    className="absolute top-0 left-0 h-7 w-7 rounded-full border-2 border-background shadow"
                    style={{ backgroundColor: team.kitColors.home }}
                  />
                  <span
                    className="absolute bottom-0 right-0 h-7 w-7 rounded-full border-2 border-background shadow"
                    style={{ backgroundColor: team.kitColors.away }}
                  />
                </div>
                <div>
                  <p className="font-bold text-foreground group-hover:text-red-400 transition-colors">
                    {team.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{team.division}</p>
                </div>
              </div>
              {getPositionBadge(team.standing.position)}
            </div>

            {/* Age group & season */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="gray" size="sm">{team.ageGroup}</Badge>
              <Badge variant="blue" size="sm">Season {team.season}</Badge>
            </div>

            {/* Stats mini-row */}
            <div className="grid grid-cols-4 gap-2 bg-background rounded-xl p-3 border border-border/40">
              {[
                { label: 'P', value: team.stats.played },
                { label: 'W', value: team.stats.won, color: 'text-green-400' },
                { label: 'L', value: team.stats.lost, color: 'text-red-400' },
                { label: 'D', value: team.stats.drawn, color: 'text-amber-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase">{label}</p>
                  <p className={`text-sm font-bold ${color ?? 'text-foreground'}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Win rate bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Win Rate</span>
                <span className="font-semibold text-foreground">{winRate}%</span>
              </div>
              <div className="h-1.5 bg-border/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-red-600 to-amber-500 rounded-full transition-all duration-700"
                  style={{ width: `${winRate}%` }}
                />
              </div>
            </div>

            {/* Coach */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <Avatar src={team.coach.avatar} name={team.coach.name} size="sm" />
                <div>
                  <p className="text-xs font-medium text-foreground">{team.coach.name}</p>
                  <p className="text-[10px] text-muted-foreground">{team.coach.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="hidden sm:block truncate max-w-25">{team.homeVenue.split(',')[0]}</span>
              </div>
            </div>

            {/* View button */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full bg-background hover:bg-red-600/10 hover:text-red-400 border border-border hover:border-red-600/30 transition-all"
            >
              View Team
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </Link>

      {/* Action menu */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity">
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
            <DropdownMenuItem onClick={() => onEdit(team)}>
              <Pencil className="h-3.5 w-3.5" />
              Edit Team
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="danger" onClick={() => onDelete(team.id)}>
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}

export default function TeamsPage() {
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>(getTeamsByClub('toronto-arrows'));
  const [filter, setFilter] = useState<'all' | 'senior' | 'youth'>('all');

  const filtered = teams.filter((t) => {
    if (filter === 'senior') return t.ageGroup === 'Senior';
    if (filter === 'youth') return t.ageGroup !== 'Senior';
    return true;
  });

  const totalWins = teams.reduce((s, t) => s + t.stats.won, 0);
  const totalLosses = teams.reduce((s, t) => s + t.stats.lost, 0);
  const totalDraws = teams.reduce((s, t) => s + t.stats.drawn, 0);
  const topPosition = teams.length > 0 ? Math.min(...teams.map((t) => t.standing.position)) : 1;

  function handleDelete(id: string) {
    const team = teams.find((t) => t.id === id);
    setTeams((prev) => prev.filter((t) => t.id !== id));
    toast(`${team?.name ?? 'Team'} deleted`, 'success');
  }

  function handleEdit(team: Team) {
    toast(`Edit form for ${team.name} coming soon`, 'info');
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <DashboardHeader
        title="Teams"
        subtitle={`${teams.length} Active Teams`}
        actions={
          <Button size="sm" className="gap-1.5" onClick={() => toast('Add Team form coming soon', 'info')}>
            <Plus className="h-3.5 w-3.5" />
            Add Team
          </Button>
        }
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Summary bar */}
        <motion.div
          {...fadeUp}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          {[
            { label: 'Total Squads', value: teams.length.toString(), icon: <Users className="h-4 w-4 text-red-400" /> },
            { label: 'Top Position', value: `#${topPosition}`, icon: <Trophy className="h-4 w-4 text-amber-400" /> },
            { label: 'Combined Record', value: `${totalWins}W-${totalLosses}L-${totalDraws}D`, icon: <Trophy className="h-4 w-4 text-green-400" /> },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                <div className="h-9 w-9 rounded-lg bg-background border border-border flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  <p className="text-xs sm:text-sm font-bold text-foreground leading-tight">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div {...fadeUp} transition={{ duration: 0.35, delay: 0.05 }} className="flex items-center gap-2">
          {(['all', 'senior', 'youth'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                filter === f
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-red-600/30'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
          <span className="text-xs text-muted-foreground ml-2">{filtered.length} teams</span>
        </motion.div>

        {/* Teams grid */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5"
        >
          {filtered.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
