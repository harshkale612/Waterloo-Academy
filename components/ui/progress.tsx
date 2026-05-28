'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  color?: 'red' | 'gold' | 'green' | 'blue' | 'gradient';
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

const colorMap = {
  red: 'bg-red-600',
  gold: 'bg-amber-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  gradient: 'bg-linear-to-r from-red-600 to-amber-500',
};

const sizeMap = {
  sm: 'h-1',
  md: 'h-1.5',
  lg: 'h-2.5',
};

export function Progress({
  value,
  max = 100,
  className,
  color = 'gradient',
  showLabel,
  label,
  size = 'md',
}: ProgressProps) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
          {showLabel && <span className="text-xs font-semibold text-foreground">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-border rounded-full overflow-hidden', sizeMap[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-full', colorMap[color])}
        />
      </div>
    </div>
  );
}

interface DualProgressProps {
  leftValue: number;
  rightValue: number;
  leftLabel?: string;
  rightLabel?: string;
  leftColor?: string;
  rightColor?: string;
}

export function DualProgress({
  leftValue,
  rightValue,
  leftLabel,
  rightLabel,
  leftColor = 'bg-red-500',
  rightColor = 'bg-blue-500',
}: DualProgressProps) {
  const total = leftValue + rightValue;
  const leftPct = total > 0 ? (leftValue / total) * 100 : 50;
  const rightPct = 100 - leftPct;

  return (
    <div className="w-full">
      {(leftLabel || rightLabel) && (
        <div className="flex items-center justify-between mb-2 text-xs font-semibold">
          <span className="text-foreground">{leftLabel} <span className="text-muted-foreground ml-1">{leftValue}%</span></span>
          <span className="text-foreground">{rightLabel} <span className="text-muted-foreground ml-1">{rightValue}%</span></span>
        </div>
      )}
      <div className="flex h-2 rounded-full overflow-hidden gap-px">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${leftPct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-l-full', leftColor)}
        />
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${rightPct}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className={cn('h-full rounded-r-full', rightColor)}
        />
      </div>
    </div>
  );
}
