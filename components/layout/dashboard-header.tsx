'use client';

import { Bell, Search, Menu } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Link from 'next/link';
import { useSidebar } from '@/components/layout/sidebar-context';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function DashboardHeader({ title, subtitle, actions }: DashboardHeaderProps) {
  const [search, setSearch] = useState('');
  const { setMobileOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 transition-colors duration-300">
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile hamburger — lives inside the header so it doesn't float over it */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border/70 transition-colors shrink-0"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="min-w-0">
          <h1 className="text-base font-bold text-foreground truncate">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground truncate hidden sm:block">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Search - desktop only */}
        <div className="hidden md:flex items-center gap-2 bg-card border border-border rounded-lg px-3 h-8 min-w-50 max-w-xs transition-colors duration-300">
          <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1 min-w-0"
          />
        </div>

        {/* Notifications */}
        <Link href="/dashboard/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
          </Button>
        </Link>

        {actions}

        {/* Avatar */}
        <Avatar
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
          name="Brian Kelly"
          size="sm"
          status="online"
          className="cursor-pointer"
        />
      </div>
    </header>
  );
}
