'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Mail, ArrowLeft, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Label, FormGroup } from '@/components/ui/input';

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const, staggerChildren: 0.07 },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.25, ease: 'easeIn' as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleRetry = () => {
    setIsSuccess(false);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-red-600/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-600/30">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            Rugby<span className="text-red-500">OS</span>
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            /* Request form */
            <motion.div
              key="form"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Icon badge */}
              <motion.div variants={itemVariants} className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center shadow-xl">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-red-400" />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">Forgot your password?</h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  No worries. Enter your email address and we&apos;ll send you a secure link to
                  reset your password.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <form onSubmit={handleSubmit} className="space-y-5">
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
                      autoFocus
                    />
                  </FormGroup>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    loading={isLoading}
                    disabled={isLoading || !email.trim()}
                  >
                    {isLoading ? (
                      'Sending reset link...'
                    ) : (
                      <>
                        Send Reset Link
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center justify-center mt-6">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  Back to sign in
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            /* Success state */
            <motion.div
              key="success"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Success icon */}
              <motion.div variants={itemVariants} className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-xl">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-emerald-400/30"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2">Check your inbox</h1>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We&apos;ve sent a password reset link to
                </p>
                <p className="text-foreground font-semibold text-sm mt-1">{email}</p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-card border border-border rounded-2xl p-6 space-y-4"
              >
                {/* Steps */}
                <div className="space-y-3">
                  {[
                    { step: '1', text: 'Open the email from RugbyOS' },
                    { step: '2', text: 'Click the "Reset Password" button' },
                    { step: '3', text: 'Create a new secure password' },
                  ].map(({ step, text }) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                        {step}
                      </div>
                      <p className="text-foreground/80 text-sm">{text}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-muted-foreground text-xs mb-3">
                    Didn&apos;t receive the email? Check your spam folder or request a new link.
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full"
                    onClick={handleRetry}
                    type="button"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Resend reset link
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center justify-center mt-6">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                  Back to sign in
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center mt-8"
        >
          <p className="text-muted-foreground/60 text-xs">
            Need help?{' '}
            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors underline">
              Contact support
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
