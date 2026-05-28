import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'gray' | 'gold';
  size?: 'sm' | 'md';
  dot?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'gray', size = 'md', dot, children, ...props }, ref) => {
    const variants = {
      green: 'badge-green',
      red: 'badge-red',
      yellow: 'badge-yellow',
      blue: 'badge-blue',
      purple: 'badge-purple',
      gray: 'badge-gray',
      gold: 'bg-amber-500/15 text-amber-400 border border-amber-500/20',
    };

    const sizes = {
      sm: 'text-[10px] px-1.5 py-0.5',
      md: '',
    };

    return (
      <span
        ref={ref}
        className={cn('badge', variants[variant], sizes[size], className)}
        {...props}
      >
        {dot && (
          <span className={cn(
            'w-1.5 h-1.5 rounded-full',
            variant === 'green' && 'bg-green-400',
            variant === 'red' && 'bg-red-400 stat-live',
            variant === 'yellow' && 'bg-yellow-400',
            variant === 'blue' && 'bg-blue-400',
            variant === 'gray' && 'bg-slate-400',
            variant === 'gold' && 'bg-amber-400',
          )} />
        )}
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
