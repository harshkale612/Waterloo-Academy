'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, X, Plus, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
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
import { mockPlayers } from '@/data/mock-players';
import { getPositionGroup } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import type { Player } from '@/types';

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' as const },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.05 } },
};

type FilterType = 'all' | 'forwards' | 'backs' | 'active' | 'injured';

const statusVariant: Record<string, 'green' | 'red' | 'yellow' | 'gray'> = {
  active: 'green',
  injured: 'red',
  suspended: 'yellow',
  inactive: 'gray',
};

function PlayerCard({
  player,
  onEdit,
  onDelete,
}: {
  player: Player;
  onEdit: (player: Player) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div variants={fadeUp} className="relative group/card">
      <Link href={`/dashboard/players/${player.id}`} className="block group">
        <Card className="hover:border-red-600/40 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-red-900/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {/* Avatar + jersey */}
              <div className="relative shrink-0">
                <Avatar src={player.avatar} name={player.name} size="lg" />
                <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-600 border border-background text-[10px] font-black text-white">
                  {player.jerseyNumber}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <p className="font-semibold text-foreground text-sm group-hover:text-red-400 transition-colors truncate">
                    {player.name}
                  </p>
                  {player.isCaptain && (
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black border border-amber-500/30 shrink-0">
                      C
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground truncate">{player.position}</p>
                <div className="mt-1.5">
                  <Badge variant={statusVariant[player.status] ?? 'gray'} size="sm" dot>
                    {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Season stats */}
              <div className="shrink-0 text-right space-y-1">
                <div>
                  <p className="text-[10px] text-muted-foreground">Tries</p>
                  <p className="text-sm font-bold text-red-400">{player.seasonStats.tries}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Pts</p>
                  <p className="text-sm font-bold text-amber-400">{player.seasonStats.points}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>

      {/* Action menu — visible on card hover */}
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
            <DropdownMenuItem onClick={() => onEdit(player)}>
              <Pencil className="h-3.5 w-3.5" />
              Edit Player
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="danger" onClick={() => onDelete(player.id)}>
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}

export default function PlayersPage() {
  const { toast } = useToast();
  const [players, setPlayers] = useState<Player[]>([...mockPlayers]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'forwards', label: 'Forwards' },
    { key: 'backs', label: 'Backs' },
    { key: 'active', label: 'Active' },
    { key: 'injured', label: 'Injured' },
  ];

  const filtered = useMemo(() => {
    return players.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.position.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === 'all' ||
        (filter === 'forwards' && getPositionGroup(p.position) === 'Forward') ||
        (filter === 'backs' && getPositionGroup(p.position) === 'Back') ||
        (filter === 'active' && p.status === 'active') ||
        (filter === 'injured' && p.status === 'injured');

      return matchesSearch && matchesFilter;
    });
  }, [players, search, filter]);

  function handleDelete(id: string) {
    const player = players.find((p) => p.id === id);
    setPlayers((prev) => prev.filter((p) => p.id !== id));
    toast(`${player?.name ?? 'Player'} removed`, 'success');
  }

  function handleEdit(player: Player) {
    toast(`Edit form for ${player.name} coming soon`, 'info');
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <DashboardHeader
        title="Players"
        subtitle={`${players.length} Registered Players`}
        actions={
          <Button size="sm" className="gap-1.5" onClick={() => toast('Add Player form coming soon', 'info')}>
            <Plus className="h-3.5 w-3.5" />
            Add Player
          </Button>
        }
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
        {/* Search + Filters */}
        <motion.div {...fadeUp} className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search players..."
              className="w-full bg-card border border-border rounded-xl pl-9 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-red-600/50 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  filter === f.key
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-red-600/30'
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="text-xs text-muted-foreground">{filtered.length} players</span>
          </div>
        </motion.div>

        {/* Players grid */}
        {filtered.length === 0 ? (
          <motion.div {...fadeUp} className="py-24 text-center text-muted-foreground">
            <p className="text-lg font-semibold mb-1">No players found</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filtered.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
