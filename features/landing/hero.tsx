'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ArrowRight, Shield, MapPin, Calendar, Users } from 'lucide-react';
import Link from 'next/link';

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const BRAND = '#DC2626';
const ACCENT = '#F59E0B';

const HEADLINE_LINES = [
  { text: 'WATERLOO', variant: 'outline' as const, delay: 0.1 },
  { text: 'COUNTY', variant: 'solid' as const, delay: 0.19 },
  { text: 'RUGBY.', variant: 'gradient' as const, delay: 0.28 },
];

const CLUB_PILLS = [
  { label: 'Rugby Ontario', icon: Shield, color: BRAND },
  { label: 'Rugby Canada', icon: Shield, color: '#3B82F6' },
  { label: 'Waterloo, ON', icon: MapPin, color: '#10B981' },
  { label: '2026 Season Open', icon: Calendar, color: ACCENT },
] as const;

const TRUST_STATS = [
  { value: '300+', label: 'Registered Players' },
  { value: '12', label: 'Active Teams' },
  { value: 'U8–Senior', label: 'All Age Groups' },
];

const DIVISION_CARDS = [
  {
    label: 'Senior Men',
    sub: 'County Senior Men 2026',
    color: '#DC2626',
    wins: '7W 1D 1L',
    pos: '1st Place',
  },
  {
    label: 'Senior Women',
    sub: 'County Senior Women 2026',
    color: '#DB2777',
    wins: '5W 0D 2L',
    pos: '2nd Place',
  },
  {
    label: 'U18 Men',
    sub: 'County U18 Men 2026',
    color: '#3B82F6',
    wins: '6W 1D 2L',
    pos: '1st Place',
  },
  {
    label: 'U16 Boys',
    sub: 'County U16 Boys 2026',
    color: '#F59E0B',
    wins: '4W 2D 2L',
    pos: '3rd Place',
  },
];

// ─── Club Dashboard Mock ──────────────────────────────────────────────────────

function ClubDashboard() {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ height: 440, background: '#080C18' }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-white/5 flex-shrink-0"
        style={{ background: '#060A14' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${BRAND}, ${ACCENT})` }}
          >
            <Shield className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-black text-white tracking-tight">WATERLOO COUNTY</span>
            <span className="text-[8px] text-red-400 tracking-widest uppercase">Rugby Club</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-emerald-400 font-medium">2026 Season Live</span>
        </div>
      </div>

      {/* Club stats row */}
      <div className="grid grid-cols-3 gap-1.5 p-3 flex-shrink-0">
        {[
          { label: 'Players', value: '312', color: '#3B82F6' },
          { label: 'Teams', value: '12', color: ACCENT },
          { label: 'Division', value: '1st', color: '#10B981' },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg p-2 border border-white/5 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-lg"
              style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }}
            />
            <div className="text-[14px] font-black leading-none" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-[9px] mt-1 leading-none" style={{ color: '#475569' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Team cards */}
      <div className="flex-1 overflow-hidden px-3 pb-3 grid grid-cols-2 gap-1.5 content-start">
        {DIVISION_CARDS.map((team) => (
          <div
            key={team.label}
            className="rounded-xl border border-white/5 p-2.5 flex flex-col gap-2 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
              style={{ background: `linear-gradient(90deg, ${team.color}, transparent)` }}
            />
            <div className="flex items-center gap-1.5">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white flex-shrink-0"
                style={{ background: team.color }}
              >
                {team.label.split(' ')[0][0]}{team.label.includes('Women') || team.label.includes('Girls') ? 'W' : 'M'}
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-white truncate leading-none">{team.label}</div>
                <div className="text-[8px] mt-0.5 truncate leading-none" style={{ color: '#475569' }}>{team.sub}</div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[9px]" style={{ color: '#475569' }}>{team.wins}</span>
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: `${team.color}20`, color: team.color }}
              >
                {team.pos}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming fixture strip */}
      <div
        className="flex items-center gap-3 px-3 py-2.5 border-t border-white/5 flex-shrink-0"
        style={{ background: 'rgba(220,38,38,0.06)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-semibold text-white truncate">County Senior Men vs Hamilton RFC</div>
          <div className="text-[9px]" style={{ color: '#475569' }}>Next fixture · Bluevale Park, Waterloo</div>
        </div>
        <div className="text-[9px] font-bold flex-shrink-0" style={{ color: ACCENT }}>SAT</div>
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
            style={{ background: 'rgba(255,255,255,0.04)', maxWidth: 240, width: '100%' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span
              className="text-[10px] truncate"
              style={{ color: '#475569', fontFamily: 'var(--font-geist-mono)' }}
            >
              waterloocountyrugby.youinsports.ca
            </span>
          </div>
        </div>
      </div>
      <ClubDashboard />
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
      {/* Background */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }} aria-hidden>
        <div
          className="absolute"
          style={{
            top: 0, left: 0, width: '65%', height: '70%',
            background: 'radial-gradient(ellipse at top left, rgba(220,38,38,0.22), transparent 70%)',
            filter: 'blur(72px)',
          }}
        />
        <div
          className="absolute"
          style={{
            top: 0, right: 0, width: '45%', height: '55%',
            background: 'radial-gradient(ellipse at top right, rgba(245,158,11,0.07), transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="absolute inset-0 grid-pattern" style={{ opacity: 0.35 }} />
        <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.04, mixBlendMode: 'overlay' }} aria-hidden>
          <defs>
            <filter id="hero-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <pattern id="hero-noise-tile" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <rect width="200" height="200" filter="url(#hero-noise)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-noise-tile)" />
        </svg>
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

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 self-start px-3.5 py-2 rounded-full border border-border backdrop-blur-sm bg-background/50"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="uppercase text-[11px] tracking-[0.2em] text-muted-foreground font-medium">
                2026 Season · Registration Open
              </span>
              <ChevronRight size={13} className="text-muted-foreground" suppressHydrationWarning />
            </motion.div>

            {/* Headline */}
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

            {/* Subtitle */}
            <motion.p
              className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE, delay: 0.42 }}
            >
              A community rugby club in Waterloo, Ontario welcoming players of all ages and abilities — from U8 Flag Rugby to Senior competitive sides.
            </motion.p>

            {/* Affiliation pills */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.52 }}
            >
              {CLUB_PILLS.map(({ label, icon: Icon, color }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border/50 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:border-border hover:text-foreground cursor-default bg-background/50"
                >
                  <Icon size={13} style={{ color }} suppressHydrationWarning />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
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
                <a
                  href="https://playhq.com/ca/rugby-canada/register/21b765"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-opacity duration-200 hover:opacity-90"
                  style={{ background: BRAND, boxShadow: '0 20px 40px rgba(220,38,38,0.5)' }}
                >
                  Register for 2026
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    suppressHydrationWarning
                  />
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: EASE }}
                className="group"
              >
                <Link
                  href="#teams"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-muted-foreground border border-border transition-all duration-200 hover:text-foreground hover:border-border/80 hover:bg-secondary/50"
                >
                  Explore Teams
                  <ChevronRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    suppressHydrationWarning
                  />
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust strip */}
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
            {/* Ambient glow */}
            <div
              className="absolute -inset-12 pointer-events-none rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.15), rgba(245,158,11,0.07), transparent 70%)',
                filter: 'blur(24px)',
              }}
              aria-hidden
            />

            {/* Floating chip — top-right: next match */}
            <motion.div
              className="absolute -top-4 -right-6 z-20 flex items-center gap-2 px-3 py-2 rounded-full border border-border shadow-2xl backdrop-blur-md bg-card/95"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.05 }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                2026 Season Underway
              </span>
            </motion.div>

            {/* Floating chip — bottom-left: players */}
            <motion.div
              className="absolute -bottom-5 -left-6 z-20 flex items-center gap-2.5 p-3 rounded-2xl border border-border shadow-2xl backdrop-blur-md bg-card/95"
              initial={{ opacity: 0, x: -12, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.2 }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}
              >
                <Users size={14} style={{ color: '#10B981' }} suppressHydrationWarning />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground font-medium leading-none">Registered Players</div>
                <div className="text-sm font-black text-foreground leading-tight mt-0.5">
                  300+{' '}
                  <span style={{ color: '#10B981' }}>↑ 2026</span>
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
