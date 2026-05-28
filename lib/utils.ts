import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string, opts?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...opts,
  });
}

export function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
}

export function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat('en-CA').format(n);
}

export function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
  if (diffWeek < 4) return `${diffWeek} week${diffWeek > 1 ? 's' : ''} ago`;
  return formatShortDate(dateStr);
}

export function getMatchResult(homeScore?: number, awayScore?: number, teamSide: 'home' | 'away' = 'home'): 'W' | 'L' | 'D' | null {
  if (homeScore === undefined || awayScore === undefined) return null;
  if (homeScore === awayScore) return 'D';
  if (teamSide === 'home') return homeScore > awayScore ? 'W' : 'L';
  return awayScore > homeScore ? 'W' : 'L';
}

export function getPositionGroup(position: string): 'Forward' | 'Back' {
  const forwards = ['Loosehead Prop', 'Hooker', 'Tighthead Prop', 'Lock', 'Blindside Flanker', 'Openside Flanker', 'Number 8'];
  return forwards.includes(position) ? 'Forward' : 'Back';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function calculateAge(dob: string): number {
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
  return age;
}

export function getFormColor(result: 'W' | 'L' | 'D'): string {
  if (result === 'W') return 'bg-green-500';
  if (result === 'L') return 'bg-red-500';
  return 'bg-yellow-500';
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    active: 'badge-green',
    injured: 'badge-red',
    suspended: 'badge-yellow',
    inactive: 'badge-gray',
    upcoming: 'badge-blue',
    live: 'badge-red',
    completed: 'badge-gray',
    postponed: 'badge-yellow',
    cancelled: 'badge-red',
  };
  return map[status] ?? 'badge-gray';
}

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
