"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Crumb { label: string; href?: string }

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Crumb[];
  image?: string;
  overlay?: string;
}

export function PageHero({ title, subtitle, breadcrumbs, image, overlay }: PageHeroProps) {
  return (
    <section
      className="relative h-[340px] flex items-end overflow-hidden"
      style={{ backgroundImage: image ? `url(${image})` : undefined }}
      aria-label={`${title} hero`}
    >
      {image && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />}
      <div
        className="absolute inset-0"
        style={{ background: overlay ?? "linear-gradient(180deg, rgba(13,20,33,0.5) 0%, rgba(13,20,33,0.85) 100%)" }}
      />
      {/* Decorative gold line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-3">
            <ol className="flex items-center gap-1 text-sm text-white/60 flex-wrap">
              <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1">
                  <ChevronRight size={12} className="text-white/40" aria-hidden="true" />
                  {crumb.href && i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.href} className="hover:text-[#D4AF37] transition-colors">{crumb.label}</Link>
                  ) : (
                    <span className="text-white/80" aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <motion.h1
          className="font-display text-5xl sm:text-6xl text-white leading-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="mt-2 text-white/70 text-lg max-w-2xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
