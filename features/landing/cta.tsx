'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Trophy } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const features = [
  'Free 30-day trial',
  'No credit card required',
  'Setup in under 10 minutes',
];

export function LandingCTA() {
  return (
    <section className="py-24 px-4 bg-background relative overflow-hidden transition-colors duration-300">
      {/* Hero radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(220,38,38,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_80%,rgba(245,158,11,0.07),transparent_70%)] pointer-events-none" />

      {/* Decorative rugby ball top-right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
        whileInView={{ opacity: 0.06, scale: 1, rotate: -12 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute -top-8 -right-8 text-[180px] select-none pointer-events-none"
        aria-hidden
      >
        🏉
      </motion.div>

      {/* Decorative rugby ball bottom-left */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: 20 }}
        whileInView={{ opacity: 0.05, scale: 1, rotate: 18 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute -bottom-8 -left-8 text-[160px] select-none pointer-events-none"
        aria-hidden
      >
        🏉
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        {/* Gradient border card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-px"
          style={{
            background: 'linear-gradient(135deg, rgba(220,38,38,0.5) 0%, rgba(245,158,11,0.4) 50%, rgba(220,38,38,0.3) 100%)',
          }}
        >
          {/* Inner card */}
          <div className="bg-card rounded-3xl px-8 py-14 md:px-16 md:py-16 text-center relative overflow-hidden">
            {/* Inner subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(220,38,38,0.08),transparent)] pointer-events-none" />

            {/* Trophy icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/25 mb-6"
            >
              <Trophy className="w-8 h-8 text-amber-400" />
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
            >
              Ready to Modernise Your{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-amber-400">
                Rugby Club?
              </span>
            </motion.h2>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
            >
              Get started for free today. No contracts, no complexity — just a smarter way to run your club from day one.
            </motion.p>

            {/* Feature bullets */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-10"
            >
              {features.map((feat) => (
                <div key={feat} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-foreground/80 text-sm">{feat}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.44 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/auth/signup">
                <Button variant="gold" size="xl" className="group min-w-[200px]">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button
                  variant="outline"
                  size="xl"
                  className="min-w-[200px] border-border hover:border-amber-500/40 text-muted-foreground hover:text-foreground hover:bg-amber-500/5"
                >
                  Book a Demo
                </Button>
              </Link>
            </motion.div>

            {/* Fine print */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.55 }}
              className="text-muted-foreground/60 text-xs mt-8"
            >
              Join 200+ Canadian rugby clubs already using RugbyOS &middot; Cancel anytime
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
