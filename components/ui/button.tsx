'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  loading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer border-0';

    const variants = {
      primary:
        'bg-red-600 hover:bg-red-500 text-white focus-visible:ring-red-500 shadow-lg hover:shadow-red-600/25 active:scale-[0.98]',
      secondary:
        'bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border hover:border-border/70 focus-visible:ring-ring',
      ghost:
        'bg-transparent hover:bg-foreground/5 text-muted-foreground hover:text-foreground focus-visible:ring-ring',
      outline:
        'bg-transparent border border-border hover:border-primary/50 text-muted-foreground hover:text-foreground hover:bg-primary/5 focus-visible:ring-primary',
      danger:
        'bg-red-500/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-500/30 hover:border-red-500 focus-visible:ring-red-500',
      gold:
        'bg-amber-500 hover:bg-amber-400 text-black font-bold focus-visible:ring-amber-400 shadow-lg hover:shadow-amber-500/25 active:scale-[0.98]',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-md',
      md: 'h-9 px-4 text-sm rounded-lg',
      lg: 'h-11 px-6 text-base rounded-lg',
      xl: 'h-12 px-8 text-base rounded-xl',
      icon: 'h-9 w-9 rounded-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
