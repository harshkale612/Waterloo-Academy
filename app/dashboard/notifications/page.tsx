'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Calendar, AlertTriangle, DollarSign, Users, Info, CheckCircle, Check } from 'lucide-react';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { notifications as initialNotifications } from '@/data/mock-dashboard';
import { getRelativeTime, cn } from '@/lib/utils';
import type { Notification } from '@/types';

const typeIcons: Record<Notification['type'], React.ReactNode> = {
  match: <Calendar className="h-4 w-4" />,
  injury: <AlertTriangle className="h-4 w-4" />,
  payment: <DollarSign className="h-4 w-4" />,
  selection: <Users className="h-4 w-4" />,
  announcement: <Bell className="h-4 w-4" />,
  system: <Info className="h-4 w-4" />,
};

const typeBg: Record<Notification['type'], string> = {
  match: 'bg-red-600/15 text-red-400',
  injury: 'bg-yellow-500/15 text-yellow-400',
  payment: 'bg-green-600/15 text-green-400',
  selection: 'bg-blue-600/15 text-blue-400',
  announcement: 'bg-purple-600/15 text-purple-400',
  system: 'bg-slate-600/15 text-muted-foreground',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <DashboardHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
        actions={
          unreadCount > 0 ? (
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Mark all as read
            </Button>
          ) : undefined
        }
      />

      <div className="flex-1 px-4 py-4 sm:px-6 sm:py-6 max-w-3xl mx-auto w-full">
        <div className="space-y-2">
          {notifications.map((notification, i) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => markRead(notification.id)}
              className={cn(
                'card-dark p-4 cursor-pointer transition-all duration-200',
                !notification.isRead && 'border-l-2 border-l-red-500',
                notification.isRead && 'opacity-70 hover:opacity-100',
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center shrink-0', typeBg[notification.type])}>
                  {typeIcons[notification.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className={cn('text-sm font-semibold', notification.isRead ? 'text-foreground/75' : 'text-foreground')}>
                      {notification.title}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-muted-foreground">{getRelativeTime(notification.timestamp)}</span>
                      {!notification.isRead && (
                        <span className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {unreadCount === 0 && (
          <div className="text-center py-12">
            <CheckCircle className="h-10 w-10 text-green-400 mx-auto mb-3 opacity-60" />
            <p className="text-muted-foreground">All notifications have been read.</p>
          </div>
        )}
      </div>
    </div>
  );
}
