'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Trophy,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Users,
  TrendingUp,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Label, FormGroup } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type Role = 'Admin' | 'Coach' | 'Player' | 'Fan';

const roles: Role[] = ['Admin', 'Coach', 'Player', 'Fan'];

const roleConfig: Record<Role, { icon: React.ReactNode; color: string; description: string }> = {
  Admin: {
    icon: <Shield className="w-4 h-4" />,
    color: 'text-red-400 border-red-500/40 bg-red-500/10',
    description: 'Full platform access',
  },
  Coach: {
    icon: <TrendingUp className="w-4 h-4" />,
    color: 'text-amber-400 border-amber-500/40 bg-amber-500/10',
    description: 'Team management',
  },
  Player: {
    icon: <Star className="w-4 h-4" />,
    color: 'text-blue-400 border-blue-500/40 bg-blue-500/10',
    description: 'Player dashboard',
  },
  Fan: {
    icon: <Users className="w-4 h-4" />,
    color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
    description: 'Follow & support',
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>('Admin');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Login successful! Redirecting to dashboard...');
      window.location.href = '/dashboard';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col">
        {/* Background layers */}
        <div className="absolute inset-0 bg-linear-to-br from-[#0D1420] via-[#0A0C12] to-[#100818]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(220,38,38,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.6) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Red accent glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-red-600/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-amber-500/8 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between h-full p-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Rugby<span className="text-red-500">OS</span>
            </span>
          </motion.div>

          {/* Center content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                Canadian Rugby&apos;s #1 Platform
              </div>
              <h1 className="text-4xl font-bold text-white leading-tight">
                Welcome Back to
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-red-400 to-amber-400">
                  RugbyOS
                </span>
              </h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-sm">
                Manage your club, track performance, and connect with the Canadian rugby community.
              </p>
            </div>

            {/* Club stats card */}
            <div className="bg-[#161B27]/80 border border-[#1E2A3A] rounded-2xl p-5 backdrop-blur-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-600 to-red-800 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                    T
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Toronto Arrows RFC</p>
                    <p className="text-slate-500 text-xs">ORU Premier Division</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-amber-400 font-bold text-sm">1st</p>
                  <p className="text-slate-500 text-xs">League Position</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2 border-t border-[#1E2A3A]">
                {[
                  { label: 'Wins', value: '12', color: 'text-emerald-400' },
                  { label: 'Players', value: '34', color: 'text-blue-400' },
                  { label: 'Points', value: '58', color: 'text-amber-400' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className={cn('text-lg font-bold', stat.color)}>{stat.value}</p>
                    <p className="text-slate-500 text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {[
                'Live Match Tracking',
                'Team Analytics',
                'Player Stats',
                'Schedule Manager',
              ].map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1 rounded-full bg-[#161B27] border border-[#1E2A3A] text-slate-400 text-xs"
                >
                  {feature}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Bottom quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-2"
          >
            <p className="text-slate-500 text-sm italic">
              &ldquo;The only platform built specifically for Canadian rugby clubs.&rdquo;
            </p>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {['A', 'B', 'C'].map((l, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded-full bg-linear-to-br from-slate-600 to-slate-800 border border-[#1E2A3A] flex items-center justify-center text-[9px] font-bold text-slate-300"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <span className="text-slate-500 text-xs">Trusted by 200+ clubs across Canada</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Form side */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-16 relative">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-600/5 blur-[100px] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Rugby<span className="text-red-500">OS</span>
            </span>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-1">Sign in to your account</h2>
            <p className="text-muted-foreground text-sm">Enter your credentials to continue</p>
          </motion.div>

          {/* Role selector */}
          <motion.div variants={itemVariants} className="mb-6">
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
              Signing in as
            </p>
            <div className="grid grid-cols-4 gap-2">
              {roles.map((role) => {
                const config = roleConfig[role];
                const isActive = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={cn(
                      'flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-medium transition-all duration-200',
                      isActive
                        ? config.color
                        : 'bg-card border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground'
                    )}
                  >
                    {config.icon}
                    <span>{role}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Form card */}
          <motion.div
            variants={itemVariants}
            className="bg-card border border-border rounded-2xl p-6 space-y-5"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <FormGroup>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@club.ca"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
              </FormGroup>

              {/* Password */}
              <FormGroup>
                <div className="flex items-center justify-between mb-1.5">
                  <Label htmlFor="password" className="mb-0">
                    Password
                  </Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock className="w-4 h-4" />}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </FormGroup>

              {/* Remember me */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className={cn(
                    'w-4.5 h-4.5 rounded border flex items-center justify-center transition-all duration-150 shrink-0',
                    rememberMe
                      ? 'bg-red-600 border-red-500'
                      : 'bg-background border-border hover:border-muted-foreground/40'
                  )}
                  style={{ width: 18, height: 18 }}
                >
                  {rememberMe && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      viewBox="0 0 12 12"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-muted-foreground select-none">Remember me for 30 days</span>
              </div>

              {/* Sign in button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? (
                  'Signing in...'
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-muted-foreground text-xs">or continue with</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social login */}
            <Button variant="secondary" size="lg" className="w-full" type="button">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </Button>
          </motion.div>

          {/* Sign up link */}
          <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-red-400 hover:text-red-300 font-medium transition-colors"
            >
              Sign up for free
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
