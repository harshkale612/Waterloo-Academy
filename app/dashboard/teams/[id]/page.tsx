'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Users, TrendingUp, Pencil, Plus, Trash2, MoreHorizontal } from 'lucide-react';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Progress, DualProgress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { mockTeams } from '@/data/mock-teams';
import { mockPlayers } from '@/data/mock-players';
import { useToast } from '@/components/ui/toast';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.32, ease: 'easeOut' as const },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const statusVariant: Record<string, 'green' | 'red' | 'yellow' | 'gray'> = {
  active: 'green',
  injured: 'red',
  suspended: 'yellow',
  inactive: 'gray',
};

const upcomingMatches = [
  { id: 1, date: '2024-11-02', opponent: 'Ottawa Wolves', venue: 'Lamport Stadium', isHome: true, competition: 'ORU Premier Division' },
  { id: 2, date: '2024-11-09', opponent: 'Barrie RFC', venue: 'Barrie Athletic Field', isHome: false, competition: 'ORU Premier Division' },
  { id: 3, date: '2024-11-23', opponent: 'Hamilton RFC', venue: 'Lamport Stadium', isHome: true, competition: 'ORU Premier Division' },
];

export default function TeamDetailPage() {
  const { toast } = useToast();
  const params = useParams();
  const id = params?.id as string;
  const team = mockTeams.find((t) => t.id === id) ?? mockTeams[0];
  const [rosterPlayers, setRosterPlayers] = React.useState(
    mockPlayers.filter((p) => p.teamId === team.id).sort((a, b) => a.jerseyNumber - b.jerseyNumber)
  );
  const players = rosterPlayers;

  function handleDeletePlayer(playerId: string) {
    const player = rosterPlayers.find((p) => p.id === playerId);
    setRosterPlayers((prev) => prev.filter((p) => p.id !== playerId));
    toast(`${player?.name ?? 'Player'} removed from roster`, 'success');
  }

  function handleEditPlayer(playerId: string) {
    const player = rosterPlayers.find((p) => p.id === playerId);
    toast(`Edit form for ${player?.name ?? 'player'} coming soon`, 'info');
  }

  const winRate =
    team.stats.played > 0
      ? Math.round((team.stats.won / team.stats.played) * 100)
      : 0;

  const statsGrid = [
    { label: 'Played', value: team.stats.played, color: 'text-foreground' },
    { label: 'Won', value: team.stats.won, color: 'text-green-400' },
    { label: 'Lost', value: team.stats.lost, color: 'text-red-400' },
    { label: 'Drawn', value: team.stats.drawn, color: 'text-amber-400' },
    { label: 'Points For', value: team.stats.pointsFor, color: 'text-foreground' },
    { label: 'Points Against', value: team.stats.pointsAgainst, color: 'text-foreground' },
    { label: 'Tries', value: team.stats.tries, color: 'text-red-400' },
    { label: 'Win Rate', value: `${winRate}%`, color: 'text-green-400' },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <DashboardHeader
        title={team.name}
        subtitle={team.division}
        actions={
          <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => toast(`Edit form for ${team.name} coming soon`, 'info')}>
            <Pencil className="h-3.5 w-3.5" />
            Edit Team
          </Button>
        }
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Back button */}
        <motion.div {...fadeUp}>
          <Link href="/dashboard/teams">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5 -ml-2">
              <ArrowLeft className="h-4 w-4" />
              All Teams
            </Button>
          </Link>
        </motion.div>

        {/* Hero */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="relative rounded-2xl overflow-hidden bg-card border border-border p-6"
        >
          <div className="absolute inset-0 bg-linear-to-r from-red-600/8 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Kit swatches */}
            <div className="relative h-14 w-14 shrink-0">
              <span
                className="absolute top-0 left-0 h-10 w-10 rounded-full border-2 border-background shadow-lg"
                style={{ backgroundColor: team.kitColors.home }}
              />
              <span
                className="absolute bottom-0 right-0 h-10 w-10 rounded-full border-2 border-background shadow-lg"
                style={{ backgroundColor: team.kitColors.away }}
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h2 className="text-2xl font-black text-foreground">{team.name}</h2>
                <Badge variant="gold" size="sm">#{team.standing.position} in {team.standing.leagueName}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  Season {team.season}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {team.homeVenue}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {players.length} Players
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Avatar src={team.coach.avatar} name={team.coach.name} size="lg" />
              <div>
                <p className="text-sm font-semibold text-foreground">{team.coach.name}</p>
                <p className="text-xs text-red-400">{team.coach.role}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div {...fadeUp} transition={{ duration: 0.35, delay: 0.1 }}>
          <Tabs defaultValue="roster">
            <TabsList className="mb-6">
              <TabsTrigger value="roster">Roster</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="matches">Upcoming Matches</TabsTrigger>
            </TabsList>

            {/* Roster Tab */}
            <TabsContent value="roster">
              <motion.div key="roster" {...fadeUp} className="space-y-3">
                {/* Roster header with Add Player */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {players.length} player{players.length !== 1 ? 's' : ''} in squad
                  </p>
                  <Button size="sm" className="gap-1.5" onClick={() => toast('Add Player to roster coming soon', 'info')}>
                    <Plus className="h-3.5 w-3.5" />
                    Add Player
                  </Button>
                </div>

                <Card className="">
                  <CardContent className="p-0">
                    {players.length === 0 ? (
                      <div className="py-16 text-center text-muted-foreground">No players assigned to this team yet.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              {['#', 'Player', 'Position', 'Status', 'Tries', 'Points', ''].map((h) => (
                                <th
                                  key={h}
                                  className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider first:pl-5 last:pr-5"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {players.map((player, idx) => (
                              <motion.tr
                                key={player.id}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.04 }}
                                className="border-b border-border last:border-0 hover:bg-foreground/2 transition-colors group/row"
                              >
                                <td className="pl-5 pr-4 py-3">
                                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-background border border-border text-xs font-bold text-foreground">
                                    {player.jerseyNumber}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex items-center gap-2.5">
                                    <Avatar src={player.avatar} name={player.name} size="sm" />
                                    <div>
                                      <Link
                                        href={`/dashboard/players/${player.id}`}
                                        className="font-medium text-foreground hover:text-red-400 transition-colors"
                                      >
                                        {player.name}
                                      </Link>
                                      {player.isCaptain && (
                                        <span className="ml-2 inline-flex items-center justify-center h-4 w-4 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black border border-amber-500/30">
                                          C
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground text-xs">{player.position}</td>
                                <td className="px-4 py-3">
                                  <Badge
                                    variant={statusVariant[player.status] ?? 'gray'}
                                    size="sm"
                                    dot
                                  >
                                    {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
                                  </Badge>
                                </td>
                                <td className="px-4 py-3 font-semibold text-red-400">
                                  {player.seasonStats.tries}
                                </td>
                                <td className="px-4 py-3 font-semibold text-amber-400">
                                  {player.seasonStats.points}
                                </td>
                                <td className="pr-5 pl-2 py-3">
                                  <div className="flex items-center justify-end opacity-0 group-hover/row:opacity-100 transition-opacity gap-1">
                                    <button
                                      onClick={() => handleEditPlayer(player.id)}
                                      className="h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                                      title="Edit player"
                                    >
                                      <Pencil className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeletePlayer(player.id)}
                                      className="h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                      title="Remove from roster"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats">
              <motion.div
                key="stats"
                variants={stagger}
                initial="initial"
                animate="animate"
                className="space-y-6"
              >
                <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {statsGrid.map((s) => (
                    <Card key={s.label} className="">
                      <CardContent className="p-4 text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>

                <motion.div variants={fadeUp}>
                  <Card className="">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground text-sm">
                        <TrendingUp className="h-4 w-4 text-red-500" />
                        Win / Loss Ratio
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <DualProgress
                        leftValue={team.stats.won}
                        rightValue={team.stats.lost}
                        leftLabel="Wins"
                        rightLabel="Losses"
                        leftColor="bg-green-500"
                        rightColor="bg-red-500"
                      />
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        <div className="text-center">
                          <p className="text-2xl font-black text-green-400">{team.stats.won}</p>
                          <p className="text-xs text-muted-foreground">Wins</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-black text-amber-400">{team.stats.drawn}</p>
                          <p className="text-xs text-muted-foreground">Draws</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-black text-red-400">{team.stats.lost}</p>
                          <p className="text-xs text-muted-foreground">Losses</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={fadeUp} className="grid md:grid-cols-2 gap-4">
                  <Card className="">
                    <CardHeader>
                      <CardTitle className="text-sm text-foreground">Points</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Progress
                        value={team.stats.pointsFor}
                        max={Math.max(team.stats.pointsFor, team.stats.pointsAgainst) + 50}
                        color="green"
                        label="Points For"
                        showLabel={false}
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Points For</span>
                        <span className="font-bold text-green-400">{team.stats.pointsFor}</span>
                      </div>
                      <Progress
                        value={team.stats.pointsAgainst}
                        max={Math.max(team.stats.pointsFor, team.stats.pointsAgainst) + 50}
                        color="red"
                      />
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Points Against</span>
                        <span className="font-bold text-red-400">{team.stats.pointsAgainst}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="">
                    <CardHeader>
                      <CardTitle className="text-sm text-foreground">Discipline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Yellow Cards</span>
                        <span className="font-bold text-amber-400">{team.stats.yellowCards}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Red Cards</span>
                        <span className="font-bold text-red-500">{team.stats.redCards}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Tries Scored</span>
                        <span className="font-bold text-foreground">{team.stats.tries}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Tries Conceded</span>
                        <span className="font-bold text-muted-foreground">{team.stats.triesAgainst}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Upcoming Matches Tab */}
            <TabsContent value="matches">
              <motion.div
                key="matches"
                variants={stagger}
                initial="initial"
                animate="animate"
                className="space-y-4"
              >
                {upcomingMatches.map((match) => (
                  <motion.div key={match.id} variants={fadeUp}>
                    <Card className="">
                      <CardContent className="p-5 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-background border border-border flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-foreground">vs {match.opponent}</p>
                              <Badge variant={match.isHome ? 'green' : 'gray'} size="sm">
                                {match.isHome ? 'Home' : 'Away'}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              {match.venue}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-foreground">
                            {new Date(match.date).toLocaleDateString('en-CA', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                          <p className="text-xs text-muted-foreground">{match.competition}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
