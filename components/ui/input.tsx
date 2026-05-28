import * as React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground transition-colors',
            'placeholder:text-muted-foreground',
            'border-border focus:border-red-500/60 focus:outline-none focus:ring-2 focus:ring-red-500/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500',
            icon && 'pl-9',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('block text-sm font-medium text-foreground mb-1.5', className)}
      {...props}
    />
  )
);
Label.displayName = 'Label';

const FormGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('space-y-1', className)}>{children}</div>
);

export { Input, Label, FormGroup };
