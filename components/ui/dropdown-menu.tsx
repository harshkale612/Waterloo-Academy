'use client';

import * as React from 'react';
import * as Primitive from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';

const DropdownMenu = Primitive.Root;
const DropdownMenuTrigger = Primitive.Trigger;
const DropdownMenuPortal = Primitive.Portal;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof Primitive.Content>,
  React.ComponentPropsWithoutRef<typeof Primitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Primitive.Portal>
    <Primitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-37 overflow-hidden rounded-lg border border-border bg-card p-1 shadow-xl shadow-black/20',
        className,
      )}
      {...props}
    />
  </Primitive.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof Primitive.Item>,
  React.ComponentPropsWithoutRef<typeof Primitive.Item> & { variant?: 'default' | 'danger' }
>(({ className, variant = 'default', ...props }, ref) => (
  <Primitive.Item
    ref={ref}
    className={cn(
      'flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-xs font-medium outline-none transition-colors select-none',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      variant === 'default' && 'text-foreground/80 focus:bg-foreground/6 focus:text-foreground',
      variant === 'danger' && 'text-red-400 focus:bg-red-500/10 focus:text-red-500',
      className,
    )}
    {...props}
  />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof Primitive.Separator>,
  React.ComponentPropsWithoutRef<typeof Primitive.Separator>
>(({ className, ...props }, ref) => (
  <Primitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-border', className)}
    {...props}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
};
