"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export function SectionHeader({ eyebrow, title, subtitle, centered = false, light = false, className }: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(centered && "text-center", className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow && (
        <span className={cn(
          "inline-block text-xs font-semibold uppercase tracking-[0.15em] mb-3 px-3 py-1 rounded-full",
          light
            ? "text-[#D4AF37] bg-[#D4AF37]/10"
            : "text-[#D4AF37] bg-[#D4AF37]/10"
        )}>
          {eyebrow}
        </span>
      )}
      <h2 className={cn(
        "font-display leading-none",
        "text-4xl sm:text-5xl",
        light ? "text-white" : "text-[#1A2744] dark:text-white"
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-3 text-base leading-relaxed max-w-2xl",
          centered && "mx-auto",
          light ? "text-white/70" : "text-[#5A5A5A] dark:text-white/60"
        )}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
