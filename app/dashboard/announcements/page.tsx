'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { notifications } from '@/data/mock-dashboard';
import { cn, getRelativeTime } from '@/lib/utils';
import {
  Plus,
  X,
  Send,
  Bell,
  Calendar,
  AlertCircle,
  Zap,
  Shield,
  Star,
  CheckCircle,
  Megaphone,
  Users,
  Pencil,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import type { Notification } from '@/types';

// ── Mock Announcements ────────────────────────────────────────────────────────

interface Announcement {
  id: string;
  author: { name: string; avatar: string; role: string };
  message: string;
  recipient: string;
  priority: 'normal' | 'urgent' | 'info';
  timestamp: string;
}

const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann1',
    author: {
      name: 'Brian Kelly',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      role: 'Head Coach',
    },
    message:
      'Reminder: Round 15 home fixture vs Kingston RFC is this Saturday at 14:00 at Lamport Stadium. Please arrive by 12:30 for warm-up. Team sheet will be posted Friday evening.',
    recipient: '1st XV',
    priority: 'urgent',
    timestamp: '2024-10-18T09:00:00Z',
  },
  {
    id: 'ann2',
    author: {
      name: 'Angela Foster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=angela',
      role: 'Club President',
    },
    message:
      'Annual registration fees are due by October 25. Please ensure your fees are settled through the member portal to remain eligible for selection. Contact admin@torontoarrows.ca with any questions.',
    recipient: 'All Teams',
    priority: 'urgent',
    timestamp: '2024-10-17T11:00:00Z',
  },
  {
    id: 'ann3',
    author: {
      name: 'Mike Patterson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
      role: 'Assistant Coach',
    },
    message:
      'Tuesday training session (Oct 22) will move to Eglinton Park (Pitch 2) due to Lamport maintenance. Session starts at 19:00 as scheduled. Bring full training kit.',
    recipient: 'All Teams',
    priority: 'info',
    timestamp: '2024-10-16T15:30:00Z',
  },
  {
    id: 'ann4',
    author: {
      name: 'Sarah Cole',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah2',
      role: 'Youth Coordinator',
    },
    message:
      'U21s — great performance last weekend! Final regular season match is Oct 26 at Oshawa. Coaches will announce the final playoff squad by Monday. Well done to all involved this season.',
    recipient: 'U21s',
    priority: 'normal',
    timestamp: '2024-10-15T14:00:00Z',
  },
  {
    id: 'ann5',
    author: {
      name: 'Brian Kelly',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
      role: 'Head Coach',
    },
    message:
      'Video analysis sessions for Round 15 preparation will be held Thursday 19:30–21:00 in the club room. Attendance mandatory for selected players. Laptops/tablets welcome.',
    recipient: '1st XV',
    priority: 'normal',
    timestamp: '2024-10-14T10:00:00Z',
  },
  {
    id: 'ann6',
    author: {
      name: 'Angela Foster',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=angela',
      role: 'Club President',
    },
    message:
      'Exciting news — our new training facility planning application has been submitted to the city. We expect approval by November. Thank you to everyone who contributed to the fundraising campaign. 🏉',
    recipient: 'All Teams',
    priority: 'info',
    timestamp: '2024-10-13T09:00:00Z',
  },
];

// ── Priority Config ───────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: Announcement['priority'] }) {
  if (priority === 'urgent') return <Badge variant="red" dot>Urgent</Badge>;
  if (priority === 'info')   return <Badge variant="blue">Info</Badge>;
  return <Badge variant="gray">Normal</Badge>;
}

// ── Recipient Badge ───────────────────────────────────────────────────────────

function RecipientBadge({ recipient }: { recipient: string }) {
  const variant =
    recipient === 'All Teams' ? 'green' :
    recipient === '1st XV'    ? 'red' :
    recipient === '2nd XV'    ? 'blue' :
    recipient === 'U21s'      ? 'gold' :
    recipient === 'U18s'      ? 'purple' : 'gray';
  return <Badge variant={variant as 'green' | 'red' | 'blue' | 'gold' | 'purple' | 'gray'} size="sm">{recipient}</Badge>;
}

// ── Notification Icon ─────────────────────────────────────────────────────────

function NotifIcon({ type }: { type: Notification['type'] }) {
  const base = 'h-4 w-4';
  switch (type) {
    case 'match':        return <Calendar className={cn(base, 'text-blue-400')} />;
    case 'injury':       return <AlertCircle className={cn(base, 'text-red-400')} />;
    case 'payment':      return <Zap className={cn(base, 'text-amber-400')} />;
    case 'selection':    return <Shield className={cn(base, 'text-green-400')} />;
    case 'announcement': return <Star className={cn(base, 'text-purple-400')} />;
    case 'system':       return <CheckCircle className={cn(base, 'text-muted-foreground')} />;
    default:             return <Bell className={cn(base, 'text-muted-foreground')} />;
  }
}

function notifIconBg(type: Notification['type']): string {
  switch (type) {
    case 'match':        return 'bg-blue-500/10 border-blue-500/20';
    case 'injury':       return 'bg-red-500/10 border-red-500/20';
    case 'payment':      return 'bg-amber-500/10 border-amber-500/20';
    case 'selection':    return 'bg-green-500/10 border-green-500/20';
    case 'announcement': return 'bg-purple-500/10 border-purple-500/20';
    case 'system':       return 'bg-slate-500/10 border-slate-500/20';
    default:             return 'bg-slate-500/10 border-slate-500/20';
  }
}

// ── Recipients & Priorities ───────────────────────────────────────────────────

const RECIPIENTS = ['All Teams', '1st XV', '2nd XV', 'U21s', 'U18s'];
const PRIORITIES: { label: string; value: Announcement['priority'] }[] = [
  { label: 'Normal', value: 'normal' },
  { label: 'Urgent', value: 'urgent' },
  { label: 'Info', value: 'info' },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AnnouncementsPage() {
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('All Teams');
  const [priority, setPriority] = useState<Announcement['priority']>('normal');
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [readNotifs, setReadNotifs] = useState<Set<string>>(
    new Set(notifications.filter((n) => n.isRead).map((n) => n.id))
  );

  function handleSend() {
    if (!message.trim()) return;
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      author: {
        name: 'Brian Kelly',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
        role: 'Head Coach',
      },
      message: message.trim(),
      recipient,
      priority,
      timestamp: new Date().toISOString(),
    };
    setAnnouncements([newAnn, ...announcements]);
    setMessage('');
    setRecipient('All Teams');
    setPriority('normal');
    setShowForm(false);
  }

  function markAsRead(id: string) {
    setReadNotifs((prev) => new Set([...prev, id]));
  }

  const unreadCount = notifications.filter((n) => !readNotifs.has(n.id)).length;

  return (
    <div className="flex flex-col min-h-full">
      <DashboardHeader
        title="Announcements"
        subtitle="Club communications and notifications"
        actions={
          <Button
            onClick={() => setShowForm((v) => !v)}
            size="sm"
            className="gap-1.5"
          >
            {showForm ? (
              <>
                <X className="h-3.5 w-3.5" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                New Announcement
              </>
            )}
          </Button>
        }
      />

      <main className="flex-1 px-4 py-4 sm:px-6 sm:py-6 space-y-4 sm:space-y-6 max-w-none">

        {/* ── New Announcement Form ── */}
        {showForm && (
          <Card className="border-red-600/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-red-400" />
                <CardTitle>New Announcement</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Textarea */}
              <div>
                <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your announcement here..."
                  rows={4}
                  className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none resize-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-colors"
                />
                <p className="text-[10px] text-muted-foreground/50 mt-1 text-right">{message.length} chars</p>
              </div>

              {/* Recipient + Priority row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
                    <Users className="h-3 w-3 inline mr-1" />
                    Recipients
                  </label>
                  <select
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-red-600/50 focus:ring-1 focus:ring-red-600/20 transition-colors appearance-none"
                  >
                    {RECIPIENTS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
                    Priority
                  </label>
                  <div className="flex items-center gap-2">
                    {PRIORITIES.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setPriority(p.value)}
                        className={cn(
                          'flex-1 py-2 rounded-lg text-xs font-medium border transition-all',
                          priority === p.value
                            ? p.value === 'urgent'
                              ? 'bg-red-600/20 border-red-600/50 text-red-600 dark:text-red-300'
                              : p.value === 'info'
                              ? 'bg-blue-600/20 border-blue-600/50 text-blue-600 dark:text-blue-300'
                              : 'bg-muted border-border text-foreground'
                            : 'bg-background border-border text-muted-foreground hover:text-foreground',
                        )}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Send Button */}
              <div className="flex items-center justify-end gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setShowForm(false); setMessage(''); }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  Send Announcement
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* ── Announcements Feed (2/3) ── */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-red-400" />
                Club Announcements
              </h2>
              <Badge variant="gray" size="sm">{announcements.length} posts</Badge>
            </div>

            {announcements.map((ann) => (
              <Card
                key={ann.id}
                className={cn(
                  'transition-all duration-200',
                  ann.priority === 'urgent' && 'border-red-600/30',
                  ann.priority === 'info' && 'border-blue-600/20',
                )}
              >
                <CardContent className="p-4">
                  {/* Author row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar
                        src={ann.author.avatar}
                        name={ann.author.name}
                        size="sm"
                      />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{ann.author.name}</p>
                        <p className="text-[11px] text-muted-foreground">{ann.author.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <RecipientBadge recipient={ann.recipient} />
                      <PriorityBadge priority={ann.priority} />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="danger"
                            onClick={() =>
                              setAnnouncements((prev) => prev.filter((a) => a.id !== ann.id))
                            }
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Message */}
                  <p className="text-sm text-foreground/80 leading-relaxed">{ann.message}</p>

                  {/* Timestamp */}
                  <p className="text-[11px] text-muted-foreground/60 mt-3">
                    {getRelativeTime(ann.timestamp)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── Notifications Feed (1/3) ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-400" />
                Notifications
              </h2>
              {unreadCount > 0 && (
                <Badge variant="red" dot size="sm">{unreadCount} unread</Badge>
              )}
            </div>

            <div className="space-y-2">
              {notifications.map((notif) => {
                const isRead = readNotifs.has(notif.id);
                return (
                  <button
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    className={cn(
                      'w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all duration-200',
                      isRead
                        ? 'bg-card border-border hover:border-muted-foreground/40'
                        : 'bg-foreground/2.5 border-foreground/6 hover:bg-foreground/4',
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        'h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 mt-0.5',
                        notifIconBg(notif.type),
                      )}
                    >
                      <NotifIcon type={notif.type} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={cn(
                          'text-xs font-semibold truncate',
                          isRead ? 'text-foreground/75' : 'text-foreground',
                        )}>
                          {notif.title}
                        </p>
                        {!isRead && (
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2 leading-snug">
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-muted-foreground/60 mt-1">
                        {getRelativeTime(notif.timestamp)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mark all read */}
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setReadNotifs(new Set(notifications.map((n) => n.id)))
                }
                className="w-full text-xs text-muted-foreground hover:text-foreground"
              >
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                Mark all as read
              </Button>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
