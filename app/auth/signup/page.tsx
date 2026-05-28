'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  ArrowRight,
  ArrowLeft,
  Shield,
  Users,
  Star,
  Heart,
  Check,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Label, FormGroup } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type UserRole = 'Club Admin' | 'Head Coach' | 'Player' | 'Parent/Fan';

const CANADIAN_PROVINCES = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon',
];

const DIVISIONS = [
  'Premier Division',
  'Division 1',
  'Division 2',
  'Division 3',
  'Division 4',
  'Junior A',
  'Junior B',
  'Youth U18',
  'Youth U16',
  'Youth U14',
  'Masters',
  'Social / Recreational',
];

const roleCards: {
  role: UserRole;
  icon: React.ReactNode;
  description: string;
  features: string[];
  color: string;
  accent: string;
}[] = [
  {
    role: 'Club Admin',
    icon: <Shield className="w-6 h-6" />,
    description: 'Manage your entire club from one dashboard',
    features: ['Full club management', 'Financial tools', 'Member registry', 'Compliance tracking'],
    color: 'border-red-500/50 bg-red-500/5',
    accent: 'text-red-400 bg-red-500/10',
  },
  {
    role: 'Head Coach',
    icon: <Trophy className="w-6 h-6" />,
    description: 'Run your team with pro-level analytics',
    features: ['Team tactics board', 'Player analytics', 'Training planner', 'Match reports'],
    color: 'border-amber-500/50 bg-amber-500/5',
    accent: 'text-amber-400 bg-amber-500/10',
  },
  {
    role: 'Player',
    icon: <Star className="w-6 h-6" />,
    description: 'Track your performance and grow your game',
    features: ['Personal stats', 'Training logs', 'Availability', 'Video analysis'],
    color: 'border-blue-500/50 bg-blue-500/5',
    accent: 'text-blue-400 bg-blue-500/10',
  },
  {
    role: 'Parent/Fan',
    icon: <Heart className="w-6 h-6" />,
    description: 'Follow your club and support the team',
    features: ['Match schedules', 'Live scores', 'Club news', 'Player profiles'],
    color: 'border-emerald-500/50 bg-emerald-500/5',
    accent: 'text-emerald-400 bg-emerald-500/10',
  },
];

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: 'easeOut' as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.25, ease: 'easeIn' as const },
  }),
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  // Step 2
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Step 3
  const [joinExisting, setJoinExisting] = useState(false);
  const [clubName, setClubName] = useState('');
  const [province, setProvince] = useState('');
  const [division, setDivision] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/dashboard';
    }, 1500);
  };

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const step2Valid =
    fullName.trim() && email.trim() && password.length >= 8 && passwordsMatch;
  const step3Valid = joinExisting
    ? joinCode.trim().length > 0
    : clubName.trim() && province && division;

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[420px] xl:w-[480px] flex-col relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-linear-to-b from-[#0D1420] via-[#0A0C12] to-[#0D1420]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-red-600/8 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full bg-amber-500/6 blur-[80px]" />

        <div className="relative z-10 flex flex-col h-full p-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Rugby<span className="text-red-500">OS</span>
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                Free to get started
              </div>
              <h2 className="text-3xl font-bold text-white leading-tight">
                Join Canadian Rugby&apos;s
                <span className="block text-transparent bg-clip-text bg-linear-to-r from-red-400 to-amber-400">
                  #1 Platform
                </span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Used by over 200 clubs and thousands of players across Canada.
              </p>
            </div>

            {/* Steps preview */}
            <div className="space-y-3">
              {[
                { n: 1, label: 'Choose your role', sub: 'How do you use RugbyOS?' },
                { n: 2, label: 'Create your account', sub: 'Personal details & password' },
                { n: 3, label: 'Set up your club', sub: 'Club details or join existing' },
              ].map(({ n, label, sub }) => (
                <div
                  key={n}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-xl transition-all duration-300',
                    step === n
                      ? 'bg-[#161B27] border border-[#1E2A3A]'
                      : step > n
                        ? 'opacity-50'
                        : 'opacity-30'
                  )}
                >
                  <div
                    className={cn(
                      'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all',
                      step > n
                        ? 'bg-emerald-500 text-white'
                        : step === n
                          ? 'bg-red-600 text-white'
                          : 'bg-[#1E2A3A] text-slate-500'
                    )}
                  >
                    {step > n ? <Check className="w-3.5 h-3.5" /> : n}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{label}</p>
                    <p className="text-slate-500 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-slate-600 text-xs">
            By signing up, you agree to our{' '}
            <span className="text-slate-500 underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-slate-500 underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 overflow-y-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-red-600/4 blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[540px]">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Rugby<span className="text-red-500">OS</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Step {step} of 3</span>
              <span className="text-xs text-muted-foreground">
                {step === 1 ? 'Choose role' : step === 2 ? 'Account details' : 'Club setup'}
              </span>
            </div>
            <div className="h-1.5 bg-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-red-600 to-red-500 rounded-full"
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Step content with AnimatePresence */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-2xl font-bold text-foreground mb-1">
                        Tell us about your role
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        We&apos;ll personalise your experience based on how you use RugbyOS.
                      </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {roleCards.map((card) => (
                        <button
                          key={card.role}
                          type="button"
                          onClick={() => setSelectedRole(card.role)}
                          className={cn(
                            'text-left p-4 rounded-2xl border transition-all duration-200 group',
                            selectedRole === card.role
                              ? card.color
                              : 'bg-card border-border hover:border-muted-foreground/40'
                          )}
                        >
                          <div
                            className={cn(
                              'w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all',
                              selectedRole === card.role ? card.accent : 'bg-muted text-muted-foreground'
                            )}
                          >
                            {card.icon}
                          </div>
                          <p className="font-semibold text-foreground text-sm mb-1">{card.role}</p>
                          <p className="text-muted-foreground text-xs mb-3">{card.description}</p>
                          <ul className="space-y-1">
                            {card.features.map((f) => (
                              <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <div className="w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </button>
                      ))}
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Button
                        size="lg"
                        className="w-full"
                        disabled={!selectedRole}
                        onClick={goNext}
                      >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground">
                      Already have an account?{' '}
                      <Link
                        href="/auth/login"
                        className="text-red-400 hover:text-red-300 font-medium transition-colors"
                      >
                        Sign in
                      </Link>
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-5"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-2xl font-bold text-foreground mb-1">Create your account</h2>
                      <p className="text-muted-foreground text-sm">
                        Signing up as{' '}
                        <span className="text-red-400 font-medium">{selectedRole}</span>
                      </p>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="bg-card border border-border rounded-2xl p-6 space-y-4"
                    >
                      <FormGroup>
                        <Label htmlFor="fullName">Full name</Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Jamie Thompson"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="jamie@club.ca"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pr-10"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            tabIndex={-1}
                          >
                            {showPassword ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                        {password.length > 0 && (
                          <div className="mt-2 flex gap-1">
                            {[...Array(4)].map((_, i) => (
                              <div
                                key={i}
                                className={cn(
                                  'h-1 flex-1 rounded-full transition-all duration-300',
                                  password.length >= (i + 1) * 2
                                    ? password.length < 6
                                      ? 'bg-red-500'
                                      : password.length < 10
                                        ? 'bg-amber-400'
                                        : 'bg-emerald-400'
                                    : 'bg-border'
                                )}
                              />
                            ))}
                          </div>
                        )}
                      </FormGroup>

                      <FormGroup>
                        <Label htmlFor="confirmPassword">Confirm password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pr-10"
                            error={
                              confirmPassword.length > 0 && !passwordsMatch
                                ? 'Passwords do not match'
                                : undefined
                            }
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            tabIndex={-1}
                          >
                            {showConfirm ? (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </FormGroup>
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex gap-3">
                      <Button variant="secondary" size="lg" className="flex-1" onClick={goBack}>
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1"
                        disabled={!step2Valid}
                        onClick={goNext}
                      >
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-5"
                  >
                    <motion.div variants={itemVariants}>
                      <h2 className="text-2xl font-bold text-foreground mb-1">Set up your club</h2>
                      <p className="text-muted-foreground text-sm">
                        Create a new club or join one that already exists.
                      </p>
                    </motion.div>

                    {/* Toggle */}
                    <motion.div
                      variants={itemVariants}
                      className="flex p-1 bg-card border border-border rounded-xl"
                    >
                      {[
                        { label: 'Create new club', value: false },
                        { label: 'Join existing club', value: true },
                      ].map(({ label, value }) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => setJoinExisting(value)}
                          className={cn(
                            'flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-all duration-200',
                            joinExisting === value
                              ? 'bg-red-600 text-white shadow-lg'
                              : 'text-muted-foreground hover:text-foreground'
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="bg-card border border-border rounded-2xl p-6 space-y-4"
                    >
                      {joinExisting ? (
                        <FormGroup>
                          <Label htmlFor="joinCode">Club invitation code</Label>
                          <Input
                            id="joinCode"
                            type="text"
                            placeholder="Enter your 8-character code"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                            className="font-mono tracking-widest uppercase"
                          />
                          <p className="mt-2 text-xs text-muted-foreground">
                            Ask your Club Admin for the invitation code.
                          </p>
                        </FormGroup>
                      ) : (
                        <>
                          <FormGroup>
                            <Label htmlFor="clubName">Club name</Label>
                            <Input
                              id="clubName"
                              type="text"
                              placeholder="e.g. Toronto Arrows RFC"
                              value={clubName}
                              onChange={(e) => setClubName(e.target.value)}
                              required
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label htmlFor="province">Province / Territory</Label>
                            <div className="relative">
                              <select
                                id="province"
                                value={province}
                                onChange={(e) => setProvince(e.target.value)}
                                className="flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground transition-colors border-border focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20 appearance-none cursor-pointer pr-9"
                              >
                                <option value="" disabled>
                                  Select province...
                                </option>
                                {CANADIAN_PROVINCES.map((p) => (
                                  <option key={p} value={p}>
                                    {p}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                          </FormGroup>

                          <FormGroup>
                            <Label htmlFor="division">Division</Label>
                            <div className="relative">
                              <select
                                id="division"
                                value={division}
                                onChange={(e) => setDivision(e.target.value)}
                                className="flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground transition-colors border-border focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20 appearance-none cursor-pointer pr-9"
                              >
                                <option value="" disabled>
                                  Select division...
                                </option>
                                {DIVISIONS.map((d) => (
                                  <option key={d} value={d}>
                                    {d}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                            </div>
                          </FormGroup>
                        </>
                      )}
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex gap-3">
                      <Button variant="secondary" size="lg" className="flex-1" onClick={goBack}>
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1"
                        disabled={!step3Valid || isLoading}
                        loading={isLoading}
                        onClick={handleSubmit}
                      >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                        {!isLoading && <ArrowRight className="w-4 h-4" />}
                      </Button>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-center text-xs text-muted-foreground/60">
                      By creating an account, you agree to our{' '}
                      <span className="text-muted-foreground underline cursor-pointer">Terms</span> and{' '}
                      <span className="text-muted-foreground underline cursor-pointer">Privacy Policy</span>
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
