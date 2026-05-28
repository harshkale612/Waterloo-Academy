'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  club: string;
  avatarSeed: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      'youinsports has completely transformed how we run Waterloo County Rugby. Player management, fixtures, and communications all in one place — it replaced three different tools overnight.',
    name: 'Josh Windsor',
    role: 'Club President',
    club: 'Waterloo County RFC',
    avatarSeed: 'JoshWindsor',
  },
  {
    id: 2,
    quote:
      "The analytics dashboard gives us insights we've never had before. Tracking our U18s and Senior Men side in the same platform makes coaching decisions so much easier every week.",
    name: 'Sarah Mitchell',
    role: 'Head Coach, Senior Women',
    club: 'Waterloo County RFC',
    avatarSeed: 'SarahMitchell',
  },
  {
    id: 3,
    quote:
      "Managing 12 teams and 300+ players used to be a nightmare of spreadsheets. Now registration, fees, and communications all flow through one place. The time savings are incredible.",
    name: 'Derek Fonseca',
    role: 'Club Administrator',
    club: 'Waterloo County RFC',
    avatarSeed: 'DerekFonseca',
  },
];

function StarRating() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  delay: number;
}

function TestimonialCard({ testimonial, delay }: TestimonialCardProps) {
  const dicebearUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(testimonial.avatarSeed)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="relative bg-card border border-border rounded-2xl p-6 flex flex-col gap-5 hover:border-amber-500/30 transition-colors duration-300 group"
    >
      {/* Subtle top glow on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/40 transition-all duration-300 rounded-t-2xl" />

      {/* Quote icon */}
      <div className="flex items-start justify-between">
        <StarRating />
        <div className="w-8 h-8 rounded-full bg-red-600/15 flex items-center justify-center border border-red-600/20">
          <Quote className="w-4 h-4 text-red-500 fill-red-500/30" />
        </div>
      </div>

      {/* Quote text */}
      <p className="text-foreground/80 text-sm leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <Avatar
          src={dicebearUrl}
          name={testimonial.name}
          size="md"
          className="shrink-0"
        />
        <div className="min-w-0">
          <p className="text-foreground font-semibold text-sm truncate">{testimonial.name}</p>
          <p className="text-muted-foreground text-xs truncate">
            {testimonial.role} &middot; {testimonial.club}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function LandingTestimonials() {
  return (
    <section className="py-20 px-4 bg-background relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(245,158,11,0.06),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="gold" dot size="sm" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by Waterloo County Rugby
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From coaches to administrators — hear from the people running one of Ontario&apos;s most active rugby clubs.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} delay={0.1 + i * 0.12} />
          ))}
        </div>

        {/* Social proof bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['JoshWindsor', 'SarahMitchell', 'DerekFonseca', 'MattKowalski'].map((seed) => (
                <Avatar
                  key={seed}
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                  name={seed}
                  size="sm"
                  className="border-2 border-background"
                />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">300+</span> players managed
            </span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-border" />
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">4.9/5</span> average rating
            </span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-border" />
          <span className="text-muted-foreground text-sm">
            <span className="text-foreground font-semibold">12 teams</span> across all divisions
          </span>
        </motion.div>
      </div>
    </section>
  );
}
