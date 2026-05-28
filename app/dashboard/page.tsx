'use client';

import Link from 'next/link';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Progress, DualProgress } from '@/components/ui/progress';
import {
  dashboardStats,
  notifications,
  matchPerformanceData,
  activityFeed,
  memberRegistrationData,
} from '@/data/mock-dashboard';
import { getUpcomingMatches } from '@/data/mock-matches';
import { mockStandings } from '@/data/mock-leagues';
import { cn, formatShortDate, getRelativeTime } from '@/lib/utils';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Shield,
  Calendar,
  TrendingUp,
  TrendingDown,
  Trophy,
  Clock,
  MapPin,
  Activity,
  Zap,
  ArrowRight,
  AlertCircle,
  Star,
  CheckCircle,
} from 'lucide-react';

// ─── Custom Tooltip for Charts ───────────────────────────────────────────────

function ChartTooltip({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-muted-foreground mb-1 font-medium">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="font-semibold" style={{ color: entry.color }}>
          {entry.name}: <span className="text-foreground">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

// ─── Activity Icon Map ─────────────────────────────────────────────────────

function ActivityIcon({ type }: { type: string }) {
  const base = 'h-3.5 w-3.5';
  switch (type) {
    case 'match_result': return <Trophy className={cn(base, 'text-amber-400')} />;
    case 'injury':       return <AlertCircle className={cn(base, 'text-red-400')} />;
    case 'registration': return <Users className={cn(base, 'text-blue-400')} />;
    case 'announcement': return <Zap className={cn(base, 'text-purple-400')} />;
    case 'award':        return <Star className={cn(base, 'text-amber-400')} />;
    case 'training':     return <Activity className={cn(base, 'text-green-400')} />;
    default:             return <Activity className={cn(base, 'text-muted-foreground')} />;
  }
}

function ActivityIconBg({ type }: { type: string }) {
  switch (type) {
    case 'match_result': return 'bg-amber-500/10 border-amber-500/20';
    case 'injury':       return 'bg-red-500/10 border-red-500/20';
    case 'registration': return 'bg-blue-500/10 border-blue-500/20';
    case 'announcement': return 'bg-purple-500/10 border-purple-500/20';
    case 'award':        return 'bg-amber-500/10 border-amber-500/20';
    case 'training':     return 'bg-green-500/10 border-green-500/20';
    default:             return 'bg-slate-500/10 border-slate-500/20';
  }
}

// ─── Notification Icon Map ─────────────────────────────────────────────────

function NotificationIcon({ type }: { type: string }) {
  const base = 'h-4 w-4';
  switch (type) {
    case 'match':        return <Calendar className={cn(base, 'text-blue-400')} />;
    case 'injury':       return <AlertCircle className={cn(base, 'text-red-400')} />;
    case 'payment':      return <Zap className={cn(base, 'text-amber-400')} />;
    case 'selection':    return <Shield className={cn(base, 'text-green-400')} />;
    case 'announcement': return <Star className={cn(base, 'text-purple-400')} />;
    case 'system':       return <CheckCircle className={cn(base, 'text-muted-foreground')} />;
    default:             return <AlertCircle className={cn(base, 'text-muted-foreground')} />;
  }
}

function NotifIconBg({ type }: { type: string }) {
  switch (type) {
    case 'match':        return 'bg-blue-500/10 border-blue-500/20';
    case 'injury':       return 'bg-red-500/10 border-red-500/20';
    case 'payment':      return 'bg-amber-500/10 border-amber-500/20';
    case 'selection':    return 'bg-green-500/10 border-green-500/20';
    case 'announcement': return 'bg-purple-500/10 border-purple-500/20';
    case 'system':       return 'bg-slate-500/10 border-slate-500/20';
    default:             return 'bg-slate-500/10 border-slate-500/20';
  }
}

// ─── Form Dot ──────────────────────────────────────────────────────────────

function FormDot({ result }: { result: 'W' | 'L' | 'D' }) {
  return (
    <span
      className={cn(
        'inline-block h-2 w-2 rounded-full',
        result === 'W' && 'bg-green-500',
        result === 'L' && 'bg-red-500',
        result === 'D' && 'bg-yellow-500',
      )}
      title={result === 'W' ? 'Win' : result === 'L' ? 'Loss' : 'Draw'}
    />
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const upcomingMatches = getUpcomingMatches().slice(0, 3);
  const topStandings = mockStandings.slice(0, 5);

  // Reshape match performance data for recharts
  const chartData = matchPerformanceData.map((d) => ({
    name: d.label,
    For: d.value,
    Against: d.secondary ?? 0,
  }));

  // Reshape member registration data
  const registrationData = memberRegistrationData.map((d) => ({
    name: d.label,
    Registrations: d.value,
  }));

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader
        title="Dashboard"
        subtitle="Toronto Arrows RFC — ORU Premier Division"
      />

      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-6 max-w-none">

        {/* ── Stat Cards Row ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            title="Total Players"
            value={186}
            trend={8}
            trendLabel="vs last season"
            icon={<Users className="h-4 w-4" />}
            accentColor="red"
            delay={0}
          />
          <StatCard
            title="League Position"
            value="1st"
            subtitle="54 pts · 11W 1D 2L"
            icon={<Trophy className="h-4 w-4" />}
            accentColor="gold"
            delay={0.08}
          />
          <StatCard
            title="Win Rate"
            value="68%"
            trend={4}
            trendLabel="vs last season"
            icon={<TrendingUp className="h-4 w-4" />}
            accentColor="green"
            delay={0.16}
          />
          <StatCard
            title="Members"
            value="412"
            trend={12}
            subtitle="Active registrations"
            icon={<Users className="h-4 w-4" />}
            accentColor="blue"
            delay={0.24}
          />
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── Left Column (2/3) ── */}
          <div className="xl:col-span-2 space-y-6">

            {/* Match Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <CardTitle>Match Performance</CardTitle>
                      <CardDescription className="mt-1">Points for vs against — last 7 rounds</CardDescription>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500 inline-block" />
                        <span className="text-muted-foreground">For</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-500 inline-block" />
                        <span className="text-muted-foreground">Against</span>
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2 pb-4">
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="gradFor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#DC2626" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradAgainst" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="For"
                          stroke="#DC2626"
                          strokeWidth={2}
                          fill="url(#gradFor)"
                          dot={{ fill: '#DC2626', strokeWidth: 0, r: 3 }}
                          activeDot={{ r: 5, fill: '#DC2626' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="Against"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          strokeDasharray="5 3"
                          fill="url(#gradAgainst)"
                          dot={{ fill: '#3B82F6', strokeWidth: 0, r: 3 }}
                          activeDot={{ r: 5, fill: '#3B82F6' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Upcoming Fixtures */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.38 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Upcoming Fixtures</CardTitle>
                      <CardDescription className="mt-1">Next scheduled matches</CardDescription>
                    </div>
                    <Link href="/dashboard/fixtures">
                      <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1">
                        View all <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="pt-1 pb-2">
                  <div className="divide-y divide-border">
                    {upcomingMatches.map((match, idx) => {
                      const isHome = match.homeTeam.id === 'toronto-arrows';
                      const opponent = isHome ? match.awayTeam : match.homeTeam;
                      const venue = match.venue;
                      const competitionLabel = match.type === 'cup' ? 'Cup' : 'League';
                      const competitionVariant = match.type === 'cup' ? 'gold' : 'blue';

                      return (
                        <motion.div
                          key={match.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + idx * 0.08 }}
                          className="flex items-center gap-3 py-3 hover:bg-foreground/2 rounded-lg px-1 transition-colors cursor-pointer"
                        >
                          {/* Opponent badge */}
                          <div className="h-9 w-9 rounded-lg bg-linear-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-[10px] font-bold shrink-0 border border-border">
                            {opponent.shortName}
                          </div>

                          {/* Match info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {isHome ? 'vs' : '@'} {opponent.name}
                            </p>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                <Clock className="h-3 w-3" />
                                {formatShortDate(match.date)} · {match.time}
                              </span>
                              <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground min-w-0">
                                <MapPin className="h-3 w-3 shrink-0" />
                                <span className="truncate">{venue}</span>
                              </span>
                            </div>
                          </div>

                          {/* Round + Competition */}
                          <div className="flex flex-col items-end gap-1 shrink-0">
                            <Badge variant={competitionVariant as 'blue' | 'gold'} size="sm">
                              {competitionLabel}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">{match.round}</span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>

          {/* ── Right Column (1/3) ── */}
          <div className="space-y-6">

            {/* League Standings */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.34 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>League Standing</CardTitle>
                    <Badge variant="gold" size="sm" dot>ORU Premier</Badge>
                  </div>
                  <CardDescription className="mt-1">Top 5 — Round 14</CardDescription>
                </CardHeader>
                <CardContent className="pt-1 pb-2">
                  <div className="divide-y divide-border">
                    {topStandings.map((team, idx) => (
                      <motion.div
                        key={team.teamId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.42 + idx * 0.06 }}
                        className={cn(
                          'flex items-center gap-2 py-2.5 px-1 rounded-md transition-colors',
                          team.isUserTeam
                            ? 'bg-red-600/5 hover:bg-red-600/10'
                            : 'hover:bg-foreground/2',
                        )}
                      >
                        {/* Position */}
                        <span className={cn(
                          'text-xs font-bold w-5 text-center shrink-0 tabular-nums',
                          team.position === 1 && 'pos-1',
                          team.position === 2 && 'pos-2',
                          team.position === 3 && 'pos-3',
                          team.position > 3 && 'text-muted-foreground',
                        )}>
                          {team.position}
                        </span>

                        {/* Team initial badge */}
                        <div className={cn(
                          'h-6 w-6 rounded flex items-center justify-center text-[9px] font-bold shrink-0',
                          team.isUserTeam
                            ? 'bg-linear-to-br from-red-600 to-red-800 text-white'
                            : 'bg-secondary text-muted-foreground',
                        )}>
                          {team.teamShortName}
                        </div>

                        {/* Name */}
                        <span className={cn(
                          'flex-1 text-xs truncate min-w-0',
                          team.isUserTeam ? 'font-semibold text-foreground' : 'text-foreground/80',
                        )}>
                          {team.teamShortName === 'TOR' ? 'Toronto Arrows' : team.teamName.replace(' RFC', '')}
                        </span>

                        {/* Form dots */}
                        <div className="flex items-center gap-0.5 shrink-0">
                          {team.form.map((f, fi) => (
                            <FormDot key={fi} result={f as 'W' | 'L' | 'D'} />
                          ))}
                        </div>

                        {/* Points */}
                        <span className={cn(
                          'text-xs font-bold w-6 text-right shrink-0 tabular-nums',
                          team.isUserTeam ? 'text-red-500' : 'text-foreground',
                        )}>
                          {team.points}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-2">
                  <Link href="/dashboard/leagues" className="w-full">
                    <Button variant="ghost" size="sm" className="w-full text-xs gap-1">
                      Full Table <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.42 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Activity Feed</CardTitle>
                    <Badge variant="gray" size="sm">Recent</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-1 pb-2">
                  <div className="space-y-1">
                    {activityFeed.slice(0, 6).map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.45 + idx * 0.06 }}
                        className="flex items-start gap-2.5 py-2 px-1 rounded-lg hover:bg-foreground/2 transition-colors cursor-pointer group"
                      >
                        <div className={cn(
                          'h-7 w-7 rounded-lg border flex items-center justify-center shrink-0 mt-0.5',
                          ActivityIconBg({ type: item.type }),
                        )}>
                          <ActivityIcon type={item.type} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            'text-xs leading-snug',
                            item.highlight ? 'text-foreground font-medium' : 'text-foreground/75',
                          )}>
                            {item.message}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{item.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>

        {/* ── Bottom Row ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Member Registrations Chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5 }}
          >
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <CardTitle>Member Registrations</CardTitle>
                    <CardDescription className="mt-1">New registrations per month — 2024</CardDescription>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xl font-bold text-foreground tabular-nums">412</p>
                    <p className="text-xs text-green-400 flex items-center justify-end gap-1 mt-0.5">
                      <TrendingUp className="h-3 w-3" />
                      +12% YTD
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <div className="h-44">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={registrationData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                      <CartesianGrid stroke="#1E2A3A" strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: '#64748b', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: '#64748b', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (!active || !payload?.length) return null;
                          return (
                            <div className="bg-card border border-border rounded-lg px-3 py-2 text-xs shadow-xl">
                              <p className="text-muted-foreground mb-1 font-medium">{label}</p>
                              <p className="font-semibold text-red-500">
                                Registrations: <span className="text-foreground">{payload[0]?.value}</span>
                              </p>
                            </div>
                          );
                        }}
                      />
                      <Bar
                        dataKey="Registrations"
                        fill="#DC2626"
                        radius={[3, 3, 0, 0]}
                        maxBarSize={32}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.56 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription className="mt-1">
                      {notifications.filter(n => !n.isRead).length} unread alerts
                    </CardDescription>
                  </div>
                  <Link href="/dashboard/notifications">
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground gap-1">
                      View all <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="pt-1 pb-2">
                <div className="space-y-1">
                  {notifications.slice(0, 4).map((notif, idx) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.58 + idx * 0.07 }}
                      className={cn(
                        'flex items-start gap-3 p-2.5 rounded-lg transition-colors cursor-pointer',
                        notif.isRead
                          ? 'hover:bg-foreground/2'
                          : 'bg-foreground/2.5 hover:bg-foreground/4 border border-border',
                      )}
                    >
                      {/* Icon */}
                      <div className={cn(
                        'h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5',
                        NotifIconBg({ type: notif.type }),
                      )}>
                        <NotificationIcon type={notif.type} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className={cn(
                            'text-xs font-semibold truncate',
                            notif.isRead ? 'text-foreground/75' : 'text-foreground',
                          )}>
                            {notif.title}
                          </p>
                          {!notif.isRead && (
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-snug">
                          {notif.message}
                        </p>
                        <p className="text-[10px] text-muted-foreground/70 mt-1">
                          {getRelativeTime(notif.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
