'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '@/components/layout/sidebar-context';
import {
  LayoutDashboard, Users, Shield, Calendar, BarChart3,
  Megaphone, Trophy, Settings, LogOut, Bell,
  ChevronLeft, ChevronRight, X, Zap
} from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const navSections = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Club',
    items: [
      { label: 'Club Profile', href: '/dashboard/club', icon: Trophy },
      { label: 'Teams', href: '/dashboard/teams', icon: Shield },
      { label: 'Players', href: '/dashboard/players', icon: Users },
    ],
  },
  {
    label: 'Competition',
    items: [
      { label: 'Fixtures', href: '/dashboard/fixtures', icon: Calendar },
      { label: 'Leagues', href: '/dashboard/leagues', icon: BarChart3 },
    ],
  },
  {
    label: 'Comms',
    items: [
      { label: 'Announcements', href: '/dashboard/announcements', icon: Megaphone },
    ],
  },
];

interface SidebarProps {
  notificationCount?: number;
}

export function Sidebar({ notificationCount = 3 }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { mobileOpen, setMobileOpen } = useSidebar();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname?.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 px-4 h-16 border-b border-(--sidebar-border) shrink-0 hover:opacity-80 transition-opacity">
        <div className="h-8 w-8 rounded-lg bg-linear-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg shrink-0">
          <Trophy className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-base text-foreground tracking-tight">
            Rugby<span className="text-red-500">OS</span>
          </span>
        )}
      </Link>

      {/* Club Info */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-(--sidebar-border)">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-md bg-linear-to-br from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-xs shrink-0">
              TOR
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Toronto Arrows RFC</p>
              <p className="text-[10px] text-muted-foreground truncate">ORU Premier Division</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-(--sidebar-section-text)">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'sidebar-link',
                      active && 'active',
                      collapsed && 'justify-center px-2'
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Notifications */}
      <div className="px-2 py-2 border-t border-(--sidebar-border)">
        <Link
          href="/dashboard/notifications"
          onClick={() => setMobileOpen(false)}
          className={cn('sidebar-link relative', collapsed && 'justify-center px-2')}
        >
          <Bell className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Notifications</span>}
          {notificationCount > 0 && (
            <span className={cn(
              'flex items-center justify-center rounded-full bg-red-600 text-white text-[10px] font-bold',
              collapsed ? 'absolute -top-1 -right-1 h-4 w-4' : 'ml-auto h-5 min-w-[20px] px-1'
            )}>
              {notificationCount}
            </span>
          )}
        </Link>
      </div>

      {/* Settings */}
      <div className="px-2 pb-2">
        <Link href="/dashboard/settings" onClick={() => setMobileOpen(false)} className={cn('sidebar-link', collapsed && 'justify-center px-2')}>
          <Settings className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Settings</span>}
        </Link>
      </div>

      {/* User */}
      <div className="px-3 py-3 border-t border-(--sidebar-border)">
        <div className={cn('flex items-center gap-2.5', collapsed && 'justify-center')}>
          <Avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
            name="Brian Kelly"
            size="sm"
            status="online"
          />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">Brian Kelly</p>
              <p className="text-[10px] text-muted-foreground truncate">Club Admin</p>
            </div>
          )}
          {!collapsed && (
            <button className="text-muted-foreground hover:text-red-400 transition-colors p-1 rounded" title="Log out">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Collapse button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full bg-(--collapse-btn-bg) border border-(--sidebar-border) flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-red-500/50 transition-all shadow-lg"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col bg-(--sidebar-bg) border-r border-(--sidebar-border) h-screen sticky top-0 shrink-0 overflow-hidden transition-colors duration-300"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-[240px] bg-(--sidebar-bg) border-r border-(--sidebar-border) z-50 flex flex-col transition-colors duration-300"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
