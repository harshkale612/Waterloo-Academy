'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: number;
  trendLabel?: string;
  className?: string;
  accentColor?: 'red' | 'gold' | 'green' | 'blue';
  delay?: number;
}

const accentMap = {
  red: 'from-red-600/20 to-transparent border-red-600/20 text-red-400',
  gold: 'from-amber-500/20 to-transparent border-amber-500/20 text-amber-400',
  green: 'from-green-600/20 to-transparent border-green-600/20 text-green-400',
  blue: 'from-blue-600/20 to-transparent border-blue-600/20 text-blue-400',
};

const iconBg = {
  red: 'bg-red-600/15 text-red-400',
  gold: 'bg-amber-500/15 text-amber-400',
  green: 'bg-green-600/15 text-green-400',
  blue: 'bg-blue-600/15 text-blue-400',
};

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendLabel,
  className,
  accentColor = 'red',
  delay = 0,
}: StatCardProps) {
  const trendPositive = trend !== undefined && trend > 0;
  const trendNegative = trend !== undefined && trend < 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'card-dark card-hover overflow-hidden',
        className
      )}
    >
      <div className={cn(
        'h-full bg-linear-to-br p-4 sm:p-5',
        accentMap[accentColor]
      )}>
        <div className="flex items-start justify-between mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
          {icon && (
            <div className={cn('p-2 rounded-lg', iconBg[accentColor])}>
              {icon}
            </div>
          )}
        </div>

        <div className="mt-1">
          <span className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums tracking-tight">
            {value}
          </span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          {trend !== undefined && (
            <span className={cn(
              'inline-flex items-center gap-0.5 text-xs font-semibold',
              trendPositive && 'text-green-400',
              trendNegative && 'text-red-400',
              !trendPositive && !trendNegative && 'text-muted-foreground',
            )}>
              {trendPositive && <TrendingUp className="h-3 w-3" />}
              {trendNegative && <TrendingDown className="h-3 w-3" />}
              {!trendPositive && !trendNegative && <Minus className="h-3 w-3" />}
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {trendLabel && <p className="text-xs text-muted-foreground">{trendLabel}</p>}
        </div>
      </div>
    </motion.div>
  );
}
