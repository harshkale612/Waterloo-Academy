import type { Club } from '@/types';

export const mockClubs: Club[] = [
  {
    id: 'toronto-arrows',
    name: 'Toronto Arrows RFC',
    shortName: 'Arrows',
    logo: '/images/clubs/arrows-logo.svg',
    banner: '/images/clubs/arrows-banner.jpg',
    city: 'Toronto',
    province: 'Ontario',
    country: 'Canada',
    founded: 1987,
    division: 'Ontario Rugby Union - Premier Division',
    description:
      'One of Canada\'s most decorated rugby clubs, the Toronto Arrows RFC has been a cornerstone of Ontario rugby for over three decades. Known for developing elite Canadian talent and competing at the highest levels of club rugby in North America.',
    colors: { primary: '#DC2626', secondary: '#1E3A5F' },
    stats: {
      totalPlayers: 186,
      totalTeams: 8,
      seasonsPlayed: 37,
      leagueTitles: 12,
      winRate: 68,
      totalMembers: 412,
    },
    contact: {
      address: '40 Harbord St',
      city: 'Toronto, ON M5S 1G8',
      phone: '+1 (416) 555-0178',
      email: 'info@torontoarrowsrfc.ca',
      website: 'www.torontoarrowsrfc.ca',
    },
    socialMedia: {
      twitter: '@TorontoArrowsRFC',
      instagram: '@torontoarrowsrfc',
      facebook: 'TorontoArrowsRFC',
      youtube: 'TorontoArrowsTV',
    },
    sponsors: [
      { id: 's1', name: 'RBC Royal Bank', logo: '/images/sponsors/rbc.svg', tier: 'platinum' },
      { id: 's2', name: 'Air Canada', logo: '/images/sponsors/aircanada.svg', tier: 'gold' },
      { id: 's3', name: 'Scotiabank', logo: '/images/sponsors/scotiabank.svg', tier: 'gold' },
      { id: 's4', name: 'Canadian Tire', logo: '/images/sponsors/ctire.svg', tier: 'silver' },
      { id: 's5', name: 'Tim Hortons', logo: '/images/sponsors/timhortons.svg', tier: 'silver' },
      { id: 's6', name: 'Molson Canadian', logo: '/images/sponsors/molson.svg', tier: 'bronze' },
    ],
    achievements: [
      { id: 'a1', title: 'Ontario Premier Division Champions', year: 2023, description: 'Undefeated season with a dominant final against Ottawa Wolves.', type: 'championship' },
      { id: 'a2', title: 'Canada Rugby Club Championship', year: 2021, description: 'National champions after defeating Pacific Pride in Vancouver.', type: 'championship' },
      { id: 'a3', title: 'Ontario Rugby Union Cup', year: 2022, description: 'Knockout cup victory after a tense 24-21 final.', type: 'cup' },
      { id: 'a4', title: 'Youth Development Award', year: 2023, description: 'Ontario Rugby Union recognition for outstanding youth pathway programs.', type: 'award' },
      { id: 'a5', title: '1000 Registered Members', year: 2020, description: 'Club milestone of surpassing 1,000 registered players and members.', type: 'milestone' },
    ],
  },
  {
    id: 'vancouver-ravens',
    name: 'Vancouver Ravens RFC',
    shortName: 'Ravens',
    logo: '/images/clubs/ravens-logo.svg',
    banner: '/images/clubs/ravens-banner.jpg',
    city: 'Vancouver',
    province: 'British Columbia',
    country: 'Canada',
    founded: 1993,
    division: 'BC Rugby - Premier Division',
    description:
      'The Vancouver Ravens are a powerhouse on the West Coast, known for their attacking style of rugby and strong community ties across Greater Vancouver.',
    colors: { primary: '#1E3A5F', secondary: '#F59E0B' },
    stats: {
      totalPlayers: 152,
      totalTeams: 6,
      seasonsPlayed: 31,
      leagueTitles: 8,
      winRate: 61,
      totalMembers: 330,
    },
    contact: {
      address: '1050 Howe St',
      city: 'Vancouver, BC V6Z 2K1',
      phone: '+1 (604) 555-0234',
      email: 'info@vancouverravens.ca',
      website: 'www.vancouverravens.ca',
    },
    socialMedia: {
      twitter: '@VancouverRavens',
      instagram: '@vancouverravensrfc',
      facebook: 'VancouverRavensRFC',
    },
    sponsors: [
      { id: 's7', name: 'TELUS', logo: '/images/sponsors/telus.svg', tier: 'platinum' },
      { id: 's8', name: 'BC Hydro', logo: '/images/sponsors/bchydro.svg', tier: 'gold' },
    ],
    achievements: [
      { id: 'a6', title: 'BC Premier Division Champions', year: 2022, description: 'Dominant West Coast campaign.', type: 'championship' },
      { id: 'a7', title: 'Pacific Rim Rugby Cup', year: 2023, description: 'International club competition victory.', type: 'cup' },
    ],
  },
  {
    id: 'calgary-thunder',
    name: 'Calgary Thunder RFC',
    shortName: 'Thunder',
    logo: '/images/clubs/thunder-logo.svg',
    banner: '/images/clubs/thunder-banner.jpg',
    city: 'Calgary',
    province: 'Alberta',
    country: 'Canada',
    founded: 1978,
    division: 'Alberta Rugby - Premier Division',
    description:
      'The Calgary Thunder are the pride of the prairies, with a rich history and a passionate fanbase that fills Shouldice Park every home match.',
    colors: { primary: '#F59E0B', secondary: '#DC2626' },
    stats: {
      totalPlayers: 174,
      totalTeams: 7,
      seasonsPlayed: 46,
      leagueTitles: 15,
      winRate: 72,
      totalMembers: 456,
    },
    contact: {
      address: '2030 4th St SW',
      city: 'Calgary, AB T2S 1W7',
      phone: '+1 (403) 555-0312',
      email: 'contact@calgarythunder.ca',
      website: 'www.calgarythunder.ca',
    },
    socialMedia: {
      twitter: '@CalgaryThunder',
      instagram: '@calgarythunderrfc',
      facebook: 'CalgaryThunderRFC',
    },
    sponsors: [
      { id: 's9', name: 'Suncor Energy', logo: '/images/sponsors/suncor.svg', tier: 'platinum' },
      { id: 's10', name: 'ATB Financial', logo: '/images/sponsors/atb.svg', tier: 'gold' },
    ],
    achievements: [
      { id: 'a8', title: 'Alberta Premier Division Champions', year: 2023, description: 'Back-to-back title.', type: 'championship' },
    ],
  },
];

export const getClubById = (id: string) => mockClubs.find(c => c.id === id);
export const primaryClub = mockClubs[0];
