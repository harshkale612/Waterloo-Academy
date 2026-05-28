import type { League, LeagueStanding } from '@/types';

export const mockStandings: LeagueStanding[] = [
  {
    position: 1, teamId: 'toronto-arrows', teamName: 'Toronto Arrows RFC', teamShortName: 'TOR', teamLogo: '',
    played: 14, won: 11, drawn: 1, lost: 2,
    pointsFor: 378, pointsAgainst: 201, pointsDiff: 177,
    triesFor: 54, bonusPoints: 8, points: 54,
    form: ['W', 'W', 'D', 'W', 'W'], isUserTeam: true,
  },
  {
    position: 2, teamId: 'ottawa-wolves', teamName: 'Ottawa Wolves RFC', teamShortName: 'OTT', teamLogo: '',
    played: 14, won: 10, drawn: 0, lost: 4,
    pointsFor: 342, pointsAgainst: 234, pointsDiff: 108,
    triesFor: 47, bonusPoints: 6, points: 46,
    form: ['L', 'W', 'W', 'W', 'W'],
  },
  {
    position: 3, teamId: 'kingston-rfc', teamName: 'Kingston RFC', teamShortName: 'KGN', teamLogo: '',
    played: 14, won: 9, drawn: 1, lost: 4,
    pointsFor: 318, pointsAgainst: 247, pointsDiff: 71,
    triesFor: 43, bonusPoints: 5, points: 43,
    form: ['W', 'L', 'W', 'D', 'W'],
  },
  {
    position: 4, teamId: 'barrie-rfc', teamName: 'Barrie RFC', teamShortName: 'BAR', teamLogo: '',
    played: 14, won: 8, drawn: 2, lost: 4,
    pointsFor: 289, pointsAgainst: 261, pointsDiff: 28,
    triesFor: 38, bonusPoints: 4, points: 40,
    form: ['D', 'W', 'W', 'L', 'W'],
  },
  {
    position: 5, teamId: 'hamilton-rfc', teamName: 'Hamilton RFC', teamShortName: 'HAM', teamLogo: '',
    played: 14, won: 7, drawn: 1, lost: 6,
    pointsFor: 267, pointsAgainst: 288, pointsDiff: -21,
    triesFor: 34, bonusPoints: 5, points: 35,
    form: ['L', 'W', 'L', 'W', 'D'],
  },
  {
    position: 6, teamId: 'oshawa-sharks', teamName: 'Oshawa Sharks RFC', teamShortName: 'OSH', teamLogo: '',
    played: 14, won: 6, drawn: 0, lost: 8,
    pointsFor: 241, pointsAgainst: 312, pointsDiff: -71,
    triesFor: 29, bonusPoints: 4, points: 28,
    form: ['L', 'L', 'W', 'L', 'W'],
  },
  {
    position: 7, teamId: 'london-rfc', teamName: 'London RFC', teamShortName: 'LON', teamLogo: '',
    played: 14, won: 4, drawn: 1, lost: 9,
    pointsFor: 198, pointsAgainst: 356, pointsDiff: -158,
    triesFor: 24, bonusPoints: 3, points: 21,
    form: ['L', 'D', 'L', 'W', 'L'],
  },
  {
    position: 8, teamId: 'windsor-rfc', teamName: 'Windsor RFC', teamShortName: 'WIN', teamLogo: '',
    played: 14, won: 3, drawn: 0, lost: 11,
    pointsFor: 167, pointsAgainst: 401, pointsDiff: -234,
    triesFor: 19, bonusPoints: 2, points: 14,
    form: ['L', 'L', 'L', 'W', 'L'],
  },
];

export const mockLeagues: League[] = [
  {
    id: 'oru-premier',
    name: 'Ontario Rugby Union Premier Division',
    shortName: 'ORU Premier',
    country: 'Canada',
    province: 'Ontario',
    season: '2024',
    division: 'Premier',
    description: 'The highest level of club rugby competition in Ontario, featuring 8 of the province\'s top clubs competing for the ORU Premier Division championship and automatic entry into the Rugby Canada Club Championship.',
    standings: mockStandings,
    fixtures: [],
  },
  {
    id: 'bc-premier',
    name: 'BC Rugby Premier League',
    shortName: 'BC Premier',
    country: 'Canada',
    province: 'British Columbia',
    season: '2024',
    division: 'Premier',
    description: 'The premier rugby competition on the West Coast of Canada.',
    standings: [
      {
        position: 1, teamId: 'calgary-thunder', teamName: 'Calgary Thunder RFC', teamShortName: 'CGY', teamLogo: '',
        played: 14, won: 12, drawn: 0, lost: 2,
        pointsFor: 412, pointsAgainst: 187, pointsDiff: 225,
        triesFor: 61, bonusPoints: 10, points: 58,
        form: ['W', 'W', 'W', 'W', 'W'],
      },
      {
        position: 2, teamId: 'vancouver-ravens', teamName: 'Vancouver Ravens RFC', teamShortName: 'VAN', teamLogo: '',
        played: 14, won: 11, drawn: 0, lost: 3,
        pointsFor: 387, pointsAgainst: 212, pointsDiff: 175,
        triesFor: 55, bonusPoints: 7, points: 51,
        form: ['W', 'L', 'W', 'W', 'W'],
      },
    ],
    fixtures: [],
  },
];

export const getLeagueById = (id: string) => mockLeagues.find(l => l.id === id);
