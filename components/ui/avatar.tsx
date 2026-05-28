import * as React from 'react';
import { cn, getInitials } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  status?: 'online' | 'offline' | 'away' | 'busy';
}

const sizeClasses = {
  xs: 'h-6 w-6 text-[10px]',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
  '2xl': 'h-24 w-24 text-2xl',
};

const statusClasses = {
  online: 'bg-green-500',
  offline: 'bg-slate-500',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, name, size = 'md', status, ...props }, ref) => {
    const [imgError, setImgError] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex shrink-0', className)}
        {...props}
      >
        <div
          className={cn(
            'rounded-full overflow-hidden flex items-center justify-center font-semibold',
            sizeClasses[size],
            !src || imgError
              ? 'bg-linear-to-br from-red-600 to-red-800 text-white'
              : 'bg-muted'
          )}
        >
          {src && !imgError ? (
            <img
              src={src}
              alt={name ?? 'Avatar'}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <span>{name ? getInitials(name) : '?'}</span>
          )}
        </div>
        {status && (
          <span
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-2 border-background',
              statusClasses[status],
              size === 'xs' || size === 'sm' ? 'h-2 w-2' : 'h-3 w-3'
            )}
          />
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };
