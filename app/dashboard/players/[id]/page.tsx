'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Calendar, Flag, Ruler, Weight, Activity, Pencil, Trash2 } from 'lucide-react';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { mockPlayers } from '@/data/mock-players';
import { calculateAge, formatDate, getPositionGroup } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';

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

const resultColor: Record<string, string> = {
  W: 'text-green-400 font-bold',
  L: 'text-red-400 font-bold',
  D: 'text-amber-400 font-bold',
};

export default function PlayerDetailPage() {
  const { toast } = useToast();
  const params = useParams();
  const id = params?.id as string;
  const player = mockPlayers.find((p) => p.id === id) ?? mockPlayers[0];

  const age = calculateAge(player.dateOfBirth);
  const positionGroup = getPositionGroup(player.position);

  // Season stats items for display
  const seasonStatCards = [
    { label: 'Matches', value: player.seasonStats.matches, avg: 18, color: 'text-foreground' },
    { label: 'Tries', value: player.seasonStats.tries, avg: 7, color: 'text-red-400' },
    { label: 'Conversions', value: player.seasonStats.conversions, avg: 12, color: 'text-amber-400' },
    { label: 'Penalties', value: player.seasonStats.penalties, avg: 8, color: 'text-blue-400' },
    { label: 'Points', value: player.seasonStats.points, avg: 60, color: 'text-green-400' },
    { label: 'Tackles', value: player.seasonStats.tackles, avg: 80, color: 'text-purple-400' },
  ];

  const overviewStats = [
    { label: 'Total Matches', value: player.stats.totalMatches, icon: <Activity className="h-4 w-4 text-blue-400" /> },
    { label: 'Total Tries', value: player.stats.totalTries, icon: <Activity className="h-4 w-4 text-red-400" /> },
    { label: 'Total Points', value: player.stats.totalPoints, icon: <Activity className="h-4 w-4 text-amber-400" /> },
    { label: 'Tackles', value: player.stats.tackles, icon: <Activity className="h-4 w-4 text-green-400" /> },
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <DashboardHeader
        title={player.name}
        subtitle={player.position}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => toast(`Edit form for ${player.name} coming soon`, 'info')}>
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </Button>
            <Button variant="danger" size="sm" className="gap-1.5" onClick={() => toast(`Delete player coming soon`, 'info')}>
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </Button>
          </div>
        }
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Back button */}
        <motion.div {...fadeUp}>
          <Link href="/dashboard/players">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5 -ml-2">
              <ArrowLeft className="h-4 w-4" />
              All Players
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
          <div className="absolute top-0 right-0 w-72 h-72 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar + jersey */}
            <div className="relative shrink-0">
              <Avatar src={player.avatar} name={player.name} size="2xl" />
              <span className="absolute -bottom-1 -right-1 inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-600 border-2 border-background text-sm font-black text-foreground shadow-lg">
                {player.jerseyNumber}
              </span>
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h2 className="text-2xl font-black text-foreground">{player.name}</h2>
                {player.isCaptain && (
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-black border border-amber-500/30">
                    C
                  </span>
                )}
                <Badge variant={statusVariant[player.status] ?? 'gray'} dot>
                  {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
                </Badge>
              </div>
              <p className="text-red-400 font-semibold text-sm mb-3">{player.position}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Flag className="h-3.5 w-3.5" />
                  <span>{player.nationality}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{age} yrs old</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Ruler className="h-3.5 w-3.5" />
                  <span>{player.height} cm</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Weight className="h-3.5 w-3.5" />
                  <span>{player.weight} kg</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overview stats row */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {overviewStats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <Card className="">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-background border border-border flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</p>
                    <p className="text-xl font-black text-foreground">{s.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div {...fadeUp} transition={{ duration: 0.35, delay: 0.15 }}>
          <Tabs defaultValue="season">
            <TabsList className="mb-6">
              <TabsTrigger value="season">Season Stats</TabsTrigger>
              <TabsTrigger value="history">Match History</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Season Stats Tab */}
            <TabsContent value="season">
              <motion.div
                key="season"
                variants={stagger}
                initial="initial"
                animate="animate"
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {seasonStatCards.map((s) => (
                  <motion.div key={s.label} variants={fadeUp}>
                    <Card className="">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm text-muted-foreground">{s.label}</p>
                          <span className={`text-2xl font-black ${s.color}`}>{s.value}</span>
                        </div>
                        <Progress
                          value={s.value}
                          max={Math.max(s.avg * 1.5, s.value + 5)}
                          color="gradient"
                          size="sm"
                        />
                        <div className="flex items-center justify-between mt-1.5">
                          <p className="text-[10px] text-muted-foreground">Season progress</p>
                          <p className="text-[10px] text-muted-foreground">Avg {s.avg}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Match History Tab */}
            <TabsContent value="history">
              <motion.div key="history" {...fadeUp}>
                <Card className="">
                  <CardContent className="p-0">
                    {player.matchHistory.length === 0 ? (
                      <div className="py-16 text-center text-muted-foreground">No match history recorded.</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              {['Date', 'Opponent', 'Result', 'Score', 'Tries', 'Conv.', 'Pts', 'Mins'].map((h) => (
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
                            {player.matchHistory.map((entry, idx) => (
                              <motion.tr
                                key={entry.matchId}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.04 }}
                                className="border-b border-border last:border-0 hover:bg-foreground/2 transition-colors"
                              >
                                <td className="pl-5 pr-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                                  {new Date(entry.date).toLocaleDateString('en-CA', {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </td>
                                <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">{entry.opponent}</td>
                                <td className="px-4 py-3">
                                  <span className={`text-sm ${resultColor[entry.result]}`}>{entry.result}</span>
                                </td>
                                <td className="px-4 py-3 text-foreground/75 font-mono text-xs">{entry.score}</td>
                                <td className="px-4 py-3 text-center font-semibold text-red-400">{entry.tries}</td>
                                <td className="px-4 py-3 text-center font-semibold text-amber-400">{entry.conversions}</td>
                                <td className="px-4 py-3 text-center font-bold text-foreground">{entry.points}</td>
                                <td className="pr-5 px-4 py-3 text-center text-muted-foreground">{entry.minutesPlayed}'</td>
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

            {/* Profile Tab */}
            <TabsContent value="profile">
              <motion.div
                key="profile"
                variants={stagger}
                initial="initial"
                animate="animate"
                className="grid md:grid-cols-2 gap-6"
              >
                {/* Bio */}
                {player.bio && (
                  <motion.div variants={fadeUp}>
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="text-sm text-foreground">Biography</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">{player.bio}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Details */}
                <motion.div variants={fadeUp}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-sm text-foreground">Player Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Position Group</p>
                          <p className="text-sm font-semibold text-foreground">{positionGroup}</p>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Nationality</p>
                          <p className="text-sm font-semibold text-foreground">{player.nationality}</p>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Date of Birth</p>
                          <p className="text-sm font-semibold text-foreground">
                            {formatDate(player.dateOfBirth, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Joined Club</p>
                          <p className="text-sm font-semibold text-foreground">
                            {formatDate(player.joinedDate, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Height</p>
                          <p className="text-sm font-semibold text-foreground">{player.height} cm</p>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Weight</p>
                          <p className="text-sm font-semibold text-foreground">{player.weight} kg</p>
                        </div>
                      </div>

                      {/* Career stats summary */}
                      <div className="pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Career Records</p>
                        <div className="space-y-2 text-sm">
                          {[
                            { label: 'Total Matches', value: player.stats.totalMatches },
                            { label: 'Career Tries', value: player.stats.totalTries },
                            { label: 'Career Points', value: player.stats.totalPoints },
                            { label: 'Career Tackles', value: player.stats.tackles },
                            { label: 'Yellow Cards', value: player.stats.yellowCards },
                            { label: 'Red Cards', value: player.stats.redCards },
                          ].map(({ label, value }) => (
                            <div key={label} className="flex items-center justify-between">
                              <span className="text-muted-foreground">{label}</span>
                              <span className="font-semibold text-foreground">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
