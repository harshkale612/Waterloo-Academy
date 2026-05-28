'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-9 w-9 rounded-lg shrink-0" aria-hidden />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      className={cn(
        'relative h-9 w-9 rounded-lg flex items-center justify-center shrink-0',
        'border border-border',
        'bg-background/60 hover:bg-muted',
        'text-muted-foreground hover:text-foreground',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: isDark ? -30 : 30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: isDark ? 30 : -30, scale: 0.7 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {isDark ? (
            <Moon className="h-[15px] w-[15px]" />
          ) : (
            <Sun className="h-[15px] w-[15px]" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
