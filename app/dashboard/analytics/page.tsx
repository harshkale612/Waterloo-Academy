'use client';

import { motion } from 'framer-motion';
import { DollarSign, Users, BarChart2, TrendingUp } from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { revenueData, memberRegistrationData, matchPerformanceData, attendanceData, dashboardStats } from '@/data/mock-dashboard';
import { formatCurrency } from '@/lib/utils';

const chartAxisStyle = { fill: 'hsl(var(--muted-foreground))', fontSize: 11 };
const gridStyle = { stroke: 'hsl(var(--border))', strokeDasharray: '3 3' };

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-xl text-xs">
      <p className="text-muted-foreground mb-1.5 font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold">
          {p.name}: {typeof p.value === 'number' && p.value > 1000 ? formatCurrency(p.value) : p.value}
        </p>
      ))}
    </div>
  );
};

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <DashboardHeader title="Analytics" subtitle="2024 Season Performance · Toronto Arrows RFC" />

      <div className="flex-1 px-4 py-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Revenue This Month"
            value={formatCurrency(dashboardStats.revenueThisMonth)}
            trend={dashboardStats.revenueGrowth}
            trendLabel="vs last month"
            icon={<DollarSign className="h-4 w-4" />}
            accentColor="green"
            delay={0}
          />
          <StatCard
            title="Total Matches"
            value="14 / 18"
            subtitle="Rounds played"
            icon={<BarChart2 className="h-4 w-4" />}
            accentColor="red"
            delay={0.08}
          />
          <StatCard
            title="Avg Attendance"
            value="2,089"
            trend={6.4}
            trendLabel="vs last season"
            icon={<Users className="h-4 w-4" />}
            accentColor="blue"
            delay={0.16}
          />
          <StatCard
            title="Active Members"
            value={dashboardStats.activeMembers}
            trend={12.4}
            trendLabel="vs last year"
            icon={<TrendingUp className="h-4 w-4" />}
            accentColor="gold"
            delay={0.24}
          />
        </div>

        {/* Revenue + Match Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Revenue (2024)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid {...gridStyle} />
                    <XAxis dataKey="label" tick={chartAxisStyle} axisLine={false} tickLine={false} />
                    <YAxis tick={chartAxisStyle} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="value" name="Revenue" stroke="#22c55e" fill="url(#revGrad)" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <Card>
              <CardHeader>
                <CardTitle>Match Performance — Points</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={matchPerformanceData}>
                    <CartesianGrid {...gridStyle} />
                    <XAxis dataKey="label" tick={chartAxisStyle} axisLine={false} tickLine={false} />
                    <YAxis tick={chartAxisStyle} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, color: 'hsl(var(--muted-foreground))' }} />
                    <Bar dataKey="value" name="For" fill="#DC2626" radius={[3, 3, 0, 0]} maxBarSize={24} />
                    <Bar dataKey="secondary" name="Against" fill="#3b82f6" radius={[3, 3, 0, 0]} maxBarSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Attendance + Registrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle>Match Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={attendanceData}>
                    <CartesianGrid {...gridStyle} />
                    <XAxis dataKey="label" tick={chartAxisStyle} axisLine={false} tickLine={false} />
                    <YAxis tick={chartAxisStyle} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="value" name="Attendance" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: '#F59E0B', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <Card>
              <CardHeader>
                <CardTitle>Member Registrations (2024)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={memberRegistrationData}>
                    <CartesianGrid {...gridStyle} />
                    <XAxis dataKey="label" tick={chartAxisStyle} axisLine={false} tickLine={false} />
                    <YAxis tick={chartAxisStyle} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" name="Registrations" fill="#DC2626" radius={[4, 4, 0, 0]} maxBarSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
