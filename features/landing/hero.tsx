'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ChevronRight,
  ArrowRight,
  Users,
  Calendar,
  Trophy,
  BarChart3,
  LayoutDashboard,
  Settings,
  Bell,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const BRAND = '#DC2626';
const BRAND_LIGHT = '#EF4444';
const ACCENT = '#F59E0B';

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURE_PILLS = [
  { label: 'Player Management', icon: Users, color: '#3B82F6' },
  { label: 'Fixture Scheduling', icon: Calendar, color: ACCENT },
  { label: 'Live Standings', icon: Trophy, color: '#10B981' },
  { label: 'Analytics', icon: BarChart3, color: BRAND },
] as const;

const TRUST_STATS = [
  { value: '300+', label: 'Registered Players' },
  { value: '12', label: 'Active Teams' },
  { value: '10+', label: 'Sponsors & Partners' },
];

const DASH_STATS = [
  { label: 'Players', value: '312', color: '#3B82F6' },
  { label: 'Matches', value: '11/16', color: ACCENT },
  { label: 'Position', value: '1st', color: '#10B981' },
  { label: 'Win Rate', value: '72%', color: BRAND },
];

const TABLE_ROWS = [
  { pos: 1, club: 'Waterloo County', pts: 48, wins: 11, isYou: true },
  { pos: 2, club: 'Hamilton RFC', pts: 41, wins: 9, isYou: false },
  { pos: 3, club: 'Ottawa Wolves', pts: 37, wins: 8, isYou: false },
  { pos: 4, club: 'Barrie RFC', pts: 31, wins: 7, isYou: false },
];

const PLAYER_CARDS = [
  { name: 'Matt Kowalski', pos: 'Fly-half', metric: '16 tries', color: '#3B82F6' },
  { name: 'Ryan O\'Brien', pos: 'Tighthead Prop', metric: '92% scrums', color: '#10B981' },
];

const NAV_ICONS = [LayoutDashboard, Users, Calendar, Trophy] as const;

const HEADLINE_LINES = [
  { text: 'RUN YOUR', variant: 'outline' as const, delay: 0.1 },
  { text: 'RUGBY CLUB', variant: 'solid' as const, delay: 0.19 },
  { text: 'BETTER.', variant: 'gradient' as const, delay: 0.28 },
];

// ─── App window (mock product UI) ────────────────────────────────────────────

function AppWindow() {
  return (
    <div className="flex overflow-hidden" style={{ height: 440, background: '#080C18' }}>
      {/* Sidebar */}
      <div
        className="flex flex-col items-center pt-4 gap-3 border-r border-white/5 flex-shrink-0"
        style={{ width: 60, background: '#060A14' }}
      >
        <div
          className="w-8 h-8 rounded-xl flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${BRAND}, ${ACCENT})` }}
        />
        <div className="flex flex-col items-center gap-3 mt-2">
          {NAV_ICONS.map((Icon, i) => (
            <div
              key={i}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={
                i === 0
                  ? { background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)' }
                  : undefined
              }
            >
              <Icon
                suppressHydrationWarning
                size={16}
                style={{ color: i === 0 ? BRAND_LIGHT : '#334155' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main panel */}
      <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
        {/* Header row */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 rounded bg-white/10" style={{ width: 52 }} />
            <div className="h-2.5 rounded" style={{ width: 36, background: 'rgba(255,255,255,0.06)' }} />
          </div>
          <div className="flex items-center gap-1.5">
            <Bell suppressHydrationWarning size={12} style={{ color: '#334155' }} />
            <Settings suppressHydrationWarning size={12} style={{ color: '#334155' }} />
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-1.5 flex-shrink-0">
          {DASH_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-lg p-2 border border-white/5 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg"
                style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }}
              />
              <div className="text-[13px] font-black leading-none" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-[9px] mt-1 leading-none" style={{ color: '#475569' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Data table card */}
        <div
          className="rounded-xl border border-white/5 overflow-hidden flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="flex items-center gap-1.5 px-2 py-1.5 border-b border-white/[0.025]">
            <Trophy suppressHydrationWarning size={10} style={{ color: ACCENT }} />
            <div className="h-2 rounded bg-white/10" style={{ width: 52 }} />
            <div
              className="ml-auto h-2 rounded"
              style={{ width: 32, background: 'rgba(220,38,38,0.2)' }}
            />
          </div>
          {TABLE_ROWS.map((row, i) => (
            <div
              key={row.club}
              className="flex items-center gap-2 px-3 relative"
              style={{
                height: 34,
                background: row.isYou ? 'rgba(220,38,38,0.07)' : undefined,
                borderBottom:
                  i < TABLE_ROWS.length - 1 ? '1px solid rgba(255,255,255,0.025)' : undefined,
              }}
            >
              {row.isYou && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                  style={{ background: BRAND }}
                />
              )}
              <span
                className="text-[10px] font-bold w-3 text-center flex-shrink-0"
                style={{ color: row.isYou ? BRAND_LIGHT : '#475569' }}
              >
                {row.pos}
              </span>
              <span
                className="text-[10px] flex-1 truncate"
                style={{ color: row.isYou ? '#f9fafb' : '#64748B' }}
              >
                {row.club}
              </span>
              <span
                className="text-[10px] font-bold flex-shrink-0"
                style={{ color: row.isYou ? BRAND_LIGHT : '#475569' }}
              >
                {row.pts}
              </span>
              <span className="text-[10px] flex-shrink-0" style={{ color: '#334155' }}>
                {row.wins}W
              </span>
            </div>
          ))}
        </div>

        {/* Player cards */}
        <div className="grid grid-cols-2 gap-1.5 flex-1 min-h-0">
          {PLAYER_CARDS.map((p) => (
            <div
              key={p.name}
              className="rounded-lg p-2 border border-white/5 flex items-center gap-2 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-[9px] font-bold text-white"
                style={{ background: p.color }}
              >
                {p.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-white truncate leading-none">
                  {p.name}
                </div>
                <div className="text-[10px] mt-1 truncate leading-none" style={{ color: '#475569' }}>
                  {p.pos}
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center gap-1">
                <TrendingUp suppressHydrationWarning size={10} style={{ color: '#10B981' }} />
                <span className="text-[10px] font-bold" style={{ color: '#10B981' }}>
                  {p.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BrowserWindow() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/60">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 px-3 py-2.5" style={{ background: '#0D1424' }}>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,95,87,0.6)' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,189,46,0.6)' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(40,200,64,0.6)' }} />
        </div>
        <div className="flex-1 flex justify-center">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/[0.06]"
            style={{ background: 'rgba(255,255,255,0.04)', maxWidth: 220, width: '100%' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span
              className="text-[10px] truncate"
              style={{ color: '#475569', fontFamily: 'var(--font-geist-mono)' }}
            >
              youinsports.ca/dashboard
            </span>
          </div>
        </div>
      </div>
      <AppWindow />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function LandingHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%']);
  const rightY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'var(--hero-section-bg)' }}
    >
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        aria-hidden
      >
        {/* Primary brand orb — top-left */}
        <div
          className="absolute"
          style={{
            top: 0,
            left: 0,
            width: '65%',
            height: '70%',
            background: 'radial-gradient(ellipse at top left, rgba(220,38,38,0.22), transparent 70%)',
            filter: 'blur(72px)',
          }}
        />
        {/* Secondary accent orb — top-right */}
        <div
          className="absolute"
          style={{
            top: 0,
            right: 0,
            width: '45%',
            height: '55%',
            background: 'radial-gradient(ellipse at top right, rgba(245,158,11,0.07), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Dot grid */}
        <div className="absolute inset-0 grid-pattern" style={{ opacity: 0.35 }} />
        {/* FractalNoise texture */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.04, mixBlendMode: 'overlay' }}
          aria-hidden
        >
          <defs>
            <filter id="hero-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <pattern
              id="hero-noise-tile"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <rect width="200" height="200" filter="url(#hero-noise)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-noise-tile)" />
        </svg>
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: 160, background: 'linear-gradient(to bottom, transparent, var(--hero-section-bg))' }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 pt-28 pb-24">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-start">

          {/* ── Left column ── */}
          <motion.div className="flex flex-col gap-6" style={{ y: contentY }}>

            {/* 1. Status badge */}
            <motion.div
              className="inline-flex items-center gap-2 self-start px-3.5 py-2 rounded-full border border-border backdrop-blur-sm bg-background/50"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase text-[11px] tracking-[0.2em] text-muted-foreground font-medium">
                Platform Now Live
              </span>
              <ChevronRight suppressHydrationWarning size={13} className="text-muted-foreground" />
            </motion.div>

            {/* 2. Headline — staggered line reveal */}
            <h1 className="flex flex-col leading-none">
              {HEADLINE_LINES.map((line) => (
                <div key={line.text} className="overflow-hidden">
                  <motion.span
                    className={
                      line.variant === 'gradient'
                        ? 'block font-black uppercase tracking-tighter gradient-text'
                        : 'block font-black uppercase tracking-tighter text-foreground'
                    }
                    style={{
                      fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
                      lineHeight: 1,
                      ...(line.variant === 'outline' && {
                        color: 'transparent',
                        WebkitTextStroke: '2px hsl(var(--foreground) / 0.2)',
                      }),
                      ...(line.variant === 'solid' && {
                        textShadow: '0 0 100px rgba(220,38,38,0.2)',
                      }),
                    }}
                    initial={{ y: '108%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, ease: EASE, delay: line.delay }}
                  >
                    {line.text}
                  </motion.span>
                </div>
              ))}
            </h1>

            {/* 3. Subtitle */}
            <motion.p
              className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.42 }}
            >
              One platform for player rosters, fixtures, live standings, and
              performance analytics. Everything your club needs — nothing it doesn't.
            </motion.p>

            {/* 4. Feature pills */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.52 }}
            >
              {FEATURE_PILLS.map(({ label, icon: Icon, color }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-border hover:text-foreground cursor-default bg-background/50"
                >
                  <Icon suppressHydrationWarning size={13} style={{ color }} />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* 5. CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="group"
              >
                <Link
                  href="/auth/signup"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-opacity duration-200 hover:opacity-90"
                  style={{ background: BRAND, boxShadow: '0 20px 40px rgba(220,38,38,0.5)' }}
                >
                  Start Free Trial
                  <ArrowRight
                    suppressHydrationWarning
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="group"
              >
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-muted-foreground border border-border transition-all duration-200 hover:text-foreground hover:border-border/80 hover:bg-secondary/50"
                >
                  View Demo
                  <ChevronRight
                    suppressHydrationWarning
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* 6. Trust strip */}
            <motion.div
              className="flex items-center gap-5 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.72 }}
            >
              {TRUST_STATS.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-5">
                  <div className="flex flex-col">
                    <span className="text-foreground font-black text-xl leading-none">{stat.value}</span>
                    <span className="text-muted-foreground text-sm mt-0.5">{stat.label}</span>
                  </div>
                  {i < TRUST_STATS.length - 1 && (
                    <div className="w-px h-5 bg-border flex-shrink-0" />
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column — desktop only ── */}
          <motion.div className="hidden lg:block relative lg:mt-14" style={{ y: rightY }}>
            {/* Ambient glow behind window */}
            <div
              className="absolute -inset-12 pointer-events-none rounded-3xl"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(220,38,38,0.15), rgba(245,158,11,0.07), transparent 70%)',
                filter: 'blur(24px)',
              }}
              aria-hidden
            />

            {/* Floating chip 1 — top-right: social proof */}
            <motion.div
              className="absolute -top-4 -right-6 z-20 flex items-center gap-2 px-3 py-2 rounded-full border border-border shadow-2xl backdrop-blur-md bg-card/95"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.05 }}
            >
              <div className="flex items-center -space-x-1.5">
                {(['#3B82F6', '#10B981', '#F59E0B'] as const).map((c, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full flex-shrink-0"
                    style={{
                      background: c,
                      border: '2px solid rgb(9,14,28)',
                    }}
                  />
                ))}
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                12 clubs joined today
              </span>
            </motion.div>

            {/* Floating chip 2 — bottom-left: key metric */}
            <motion.div
              className="absolute -bottom-5 -left-6 z-20 flex items-center gap-2.5 p-3 rounded-2xl border border-border shadow-2xl backdrop-blur-md bg-card/95"
              initial={{ opacity: 0, x: -12, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.2 }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.3)',
                }}
              >
                <TrendingUp suppressHydrationWarning size={14} style={{ color: '#10B981' }} />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground font-medium leading-none">
                  Win Rate this season
                </div>
                <div className="text-sm font-black text-foreground leading-tight mt-0.5">
                  68%{' '}
                  <span style={{ color: '#10B981' }}>↑ +5%</span>
                </div>
              </div>
            </motion.div>

            {/* Browser window */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.48 }}
            >
              <BrowserWindow />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
