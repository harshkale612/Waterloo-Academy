// ============================================================
// CORE TYPES - Rugby Club Management Platform
// ============================================================

// --- User & Auth ---
export type UserRole = 'club_admin' | 'coach' | 'player' | 'parent' | 'fan';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  clubId?: string;
  teamId?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// --- Club ---
export interface Club {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  banner: string;
  city: string;
  province: string;
  country: string;
  founded: number;
  division: string;
  description: string;
  colors: { primary: string; secondary: string };
  stats: ClubStats;
  contact: ClubContact;
  socialMedia: SocialMedia;
  sponsors: Sponsor[];
  achievements: Achievement[];
}

export interface ClubStats {
  totalPlayers: number;
  totalTeams: number;
  seasonsPlayed: number;
  leagueTitles: number;
  winRate: number;
  totalMembers: number;
}

export interface ClubContact {
  address: string;
  city: string;
  phone: string;
  email: string;
  website: string;
}

export interface SocialMedia {
  twitter?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  website?: string;
}

export interface Achievement {
  id: string;
  title: string;
  year: number;
  description: string;
  type: 'championship' | 'cup' | 'award' | 'milestone';
}

// --- Team ---
export interface Team {
  id: string;
  clubId: string;
  name: string;
  shortName: string;
  ageGroup: string;
  division: string;
  season: string;
  coach: Staff;
  assistantCoaches: Staff[];
  players: Player[];
  stats: TeamStats;
  standing: TeamStanding;
  nextMatch?: Match;
  homeVenue: string;
  kitColors: { home: string; away: string };
}

export interface TeamStats {
  played: number;
  won: number;
  lost: number;
  drawn: number;
  pointsFor: number;
  pointsAgainst: number;
  tries: number;
  triesAgainst: number;
  yellowCards: number;
  redCards: number;
}

export interface TeamStanding {
  position: number;
  points: number;
  leagueName: string;
}

// --- Staff ---
export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  qualifications: string[];
  yearsExperience: number;
  phone?: string;
  email?: string;
  bio?: string;
}

// --- Player ---
export type Position =
  | 'Loosehead Prop' | 'Hooker' | 'Tighthead Prop'
  | 'Lock' | 'Blindside Flanker' | 'Openside Flanker' | 'Number 8'
  | 'Scrum-half' | 'Fly-half' | 'Left Wing' | 'Inside Centre'
  | 'Outside Centre' | 'Right Wing' | 'Fullback';

export interface Player {
  id: string;
  clubId: string;
  teamId: string;
  name: string;
  firstName: string;
  lastName: string;
  jerseyNumber: number;
  position: Position;
  avatar: string;
  dateOfBirth: string;
  nationality: string;
  height: number;
  weight: number;
  stats: PlayerStats;
  seasonStats: PlayerSeasonStats;
  matchHistory: PlayerMatchEntry[];
  status: 'active' | 'injured' | 'suspended' | 'inactive';
  isCaptain?: boolean;
  joinedDate: string;
  bio?: string;
}

export interface PlayerStats {
  totalMatches: number;
  totalTries: number;
  totalConversions: number;
  totalPenalties: number;
  totalDropGoals: number;
  totalPoints: number;
  tackles: number;
  lineouts: number;
  yellowCards: number;
  redCards: number;
}

export interface PlayerSeasonStats {
  season: string;
  matches: number;
  tries: number;
  conversions: number;
  penalties: number;
  points: number;
  tackles: number;
  minutesPlayed: number;
}

export interface PlayerMatchEntry {
  matchId: string;
  date: string;
  opponent: string;
  result: 'W' | 'L' | 'D';
  score: string;
  tries: number;
  conversions: number;
  penalties: number;
  points: number;
  minutesPlayed: number;
  wasStarter: boolean;
}

// --- Match & Fixture ---
export type MatchStatus = 'upcoming' | 'live' | 'completed' | 'postponed' | 'cancelled';
export type MatchType = 'league' | 'cup' | 'friendly' | 'playoff' | 'final';

export interface Match {
  id: string;
  homeTeam: MatchTeam;
  awayTeam: MatchTeam;
  date: string;
  time: string;
  venue: string;
  city: string;
  status: MatchStatus;
  type: MatchType;
  leagueId?: string;
  leagueName: string;
  round?: string;
  referee?: string;
  attendance?: number;
  highlights?: string;
  events: MatchEvent[];
  stats?: MatchDetailStats;
}

export interface MatchTeam {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  score?: number;
}

export interface MatchEvent {
  id: string;
  minute: number;
  type: 'try' | 'conversion' | 'penalty' | 'drop_goal' | 'yellow_card' | 'red_card' | 'substitution';
  team: 'home' | 'away';
  player: string;
  description?: string;
}

export interface MatchDetailStats {
  possession: { home: number; away: number };
  territory: { home: number; away: number };
  scrums: { home: number; away: number };
  lineouts: { home: number; away: number };
  tackles: { home: number; away: number };
  turnovers: { home: number; away: number };
  penalties: { home: number; away: number };
  tries: { home: number; away: number };
  metresCarried: { home: number; away: number };
}

// --- League ---
export interface League {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
  country: string;
  province: string;
  season: string;
  division: string;
  description: string;
  standings: LeagueStanding[];
  fixtures: Match[];
}

export interface LeagueStanding {
  position: number;
  teamId: string;
  teamName: string;
  teamShortName: string;
  teamLogo: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  pointsDiff: number;
  triesFor: number;
  bonusPoints: number;
  points: number;
  form: ('W' | 'L' | 'D')[];
  isUserTeam?: boolean;
}

// --- News / Article ---
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: 'match_report' | 'club_news' | 'player_spotlight' | 'announcement' | 'training' | 'community';
  tags: string[];
  publishedAt: string;
  readTime: number;
  clubId?: string;
  featured: boolean;
}

// --- Notification ---
export interface Notification {
  id: string;
  type: 'match' | 'announcement' | 'payment' | 'injury' | 'selection' | 'system';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

// --- Analytics ---
export interface DashboardStats {
  totalPlayers: number;
  totalTeams: number;
  upcomingMatches: number;
  activeMembers: number;
  revenueThisMonth: number;
  revenueGrowth: number;
  registrationsPending: number;
  attendanceRate: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  secondary?: number;
}
