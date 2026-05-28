'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Award,
  Star,
  Globe,
  Mail,
  Phone,
  MapPin,
  AtSign,
  Hash,
  ExternalLink,
  Users,
  Shield,
  TrendingUp,
  Calendar,
  Pencil,
  Plus,
  Trash2,
  MoreHorizontal,
} from 'lucide-react';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { primaryClub } from '@/data/mock-clubs';
import { mockStaff } from '@/data/mock-teams';
import { useToast } from '@/components/ui/toast';

const EASE = 'easeOut' as const;

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: EASE },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.07 } },
};

const tierConfig: Record<string, { label: string; variant: 'gold' | 'gray' | 'blue' | 'green'; color: string }> = {
  platinum: { label: 'Platinum', variant: 'gray', color: 'bg-slate-300/15 text-slate-500 dark:text-slate-200 border border-slate-300/25' },
  gold: { label: 'Gold', variant: 'gold', color: 'bg-amber-500/15 text-amber-400 border border-amber-500/25' },
  silver: { label: 'Silver', variant: 'gray', color: 'bg-slate-400/15 text-slate-500 dark:text-slate-300 border border-slate-400/25' },
  bronze: { label: 'Bronze', variant: 'gray', color: 'bg-orange-700/20 text-orange-400 border border-orange-600/25' },
};

const achievementTypeIcon = (type: string) => {
  switch (type) {
    case 'championship': return <Trophy className="h-5 w-5 text-amber-400" />;
    case 'cup': return <Award className="h-5 w-5 text-blue-400" />;
    case 'award': return <Star className="h-5 w-5 text-purple-400" />;
    default: return <Shield className="h-5 w-5 text-green-400" />;
  }
};

const statItems = [
  { label: 'Total Players', value: '186', icon: <Users className="h-5 w-5 text-red-400" /> },
  { label: 'Total Teams', value: '8', icon: <Shield className="h-5 w-5 text-amber-400" /> },
  { label: 'League Titles', value: '12', icon: <Trophy className="h-5 w-5 text-amber-400" /> },
  { label: 'Win Rate', value: '68%', icon: <TrendingUp className="h-5 w-5 text-green-400" /> },
];

export default function ClubPage() {
  const { toast } = useToast();
  const [staffList, setStaffList] = useState([...mockStaff]);
  const [sponsorList, setSponsorList] = useState([...primaryClub.sponsors]);
  const [achievementList, setAchievementList] = useState([...primaryClub.achievements]);

  function handleDeleteStaff(id: string) {
    setStaffList((prev) => prev.filter((s) => s.id !== id));
  }

  function handleDeleteSponsor(id: string) {
    setSponsorList((prev) => prev.filter((s) => s.id !== id));
  }

  function handleDeleteAchievement(id: string) {
    setAchievementList((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <DashboardHeader
        title="Club Profile"
        subtitle="Toronto Arrows RFC"
        actions={
          <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => toast('Club edit form coming soon', 'info')}>
            <Pencil className="h-3.5 w-3.5" />
            Edit Club
          </Button>
        }
      />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Hero Banner */}
        <motion.div
          {...fadeUp}
          className="relative rounded-2xl overflow-hidden bg-card border border-border p-8"
        >
          <div className="absolute inset-0 bg-linear-to-r from-red-600/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-linear-to-br from-red-600 to-red-800 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-red-900/40">
              A
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className="text-3xl md:text-4xl font-black text-foreground">
                  {primaryClub.name}
                </h2>
                <Badge variant="red" className="text-xs">
                  Founded {primaryClub.founded}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {primaryClub.city}, {primaryClub.province}
                </span>
                <Badge variant="gold" size="sm">{primaryClub.division}</Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={stagger}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {statItems.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <Card className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</span>
                  {s.icon}
                </div>
                <p className="text-3xl font-black text-foreground">{s.value}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div {...fadeUp} transition={{ duration: 0.35, delay: 0.1 }}>
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
              <TabsTrigger value="sponsors">Sponsors</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview">
              <motion.div
                key="overview"
                variants={stagger}
                initial="initial"
                animate="animate"
                className="grid md:grid-cols-2 gap-6"
              >
                {/* About */}
                <motion.div variants={fadeUp}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-red-500" />
                          About the Club
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground" onClick={() => toast('Edit club description coming soon', 'info')}>
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed text-sm">{primaryClub.description}</p>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="bg-background rounded-lg p-3 border border-border/40">
                          <p className="text-xs text-muted-foreground mb-0.5">Seasons Played</p>
                          <p className="text-xl font-bold text-foreground">{primaryClub.stats.seasonsPlayed}</p>
                        </div>
                        <div className="bg-background rounded-lg p-3 border border-border/40">
                          <p className="text-xs text-muted-foreground mb-0.5">Total Members</p>
                          <p className="text-xl font-bold text-foreground">{primaryClub.stats.totalMembers}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Contact */}
                <motion.div variants={fadeUp}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-red-500" />
                          Contact Information
                        </CardTitle>
                        <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground" onClick={() => toast('Edit contact information coming soon', 'info')}>
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm text-foreground">{primaryClub.contact.address}</p>
                          <p className="text-sm text-muted-foreground">{primaryClub.contact.city}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                        <p className="text-sm text-foreground">{primaryClub.contact.phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                        <p className="text-sm text-foreground">{primaryClub.contact.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                        <a
                          href={`https://${primaryClub.contact.website}`}
                          className="text-sm text-red-400 hover:text-red-300 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {primaryClub.contact.website}
                        </a>
                      </div>

                      {/* Social Media */}
                      <div className="pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Social Media</p>
                        <div className="flex flex-wrap gap-2">
                          {primaryClub.socialMedia.twitter && (
                            <div className="flex items-center gap-1.5 bg-background border border-border rounded-lg px-3 py-1.5">
                              <AtSign className="h-3.5 w-3.5 text-sky-400" />
                              <span className="text-xs text-foreground/80">{primaryClub.socialMedia.twitter}</span>
                            </div>
                          )}
                          {primaryClub.socialMedia.instagram && (
                            <div className="flex items-center gap-1.5 bg-background border border-border rounded-lg px-3 py-1.5">
                              <Hash className="h-3.5 w-3.5 text-pink-400" />
                              <span className="text-xs text-foreground/80">{primaryClub.socialMedia.instagram}</span>
                            </div>
                          )}
                          {primaryClub.socialMedia.facebook && (
                            <div className="flex items-center gap-1.5 bg-background border border-border rounded-lg px-3 py-1.5">
                              <ExternalLink className="h-3.5 w-3.5 text-blue-400" />
                              <span className="text-xs text-foreground/80">{primaryClub.socialMedia.facebook}</span>
                            </div>
                          )}
                          {primaryClub.socialMedia.youtube && (
                            <div className="flex items-center gap-1.5 bg-background border border-border rounded-lg px-3 py-1.5">
                              <ExternalLink className="h-3.5 w-3.5 text-red-400" />
                              <span className="text-xs text-foreground/80">{primaryClub.socialMedia.youtube}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Staff Tab */}
            <TabsContent value="staff">
              <motion.div key="staff" variants={stagger} initial="initial" animate="animate" className="space-y-4">
                {/* Staff header */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{staffList.length} staff member{staffList.length !== 1 ? 's' : ''}</p>
                  <Button size="sm" className="gap-1.5" onClick={() => toast('Add Staff form coming soon', 'info')}>
                    <Plus className="h-3.5 w-3.5" />
                    Add Staff
                  </Button>
                </div>

                <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
                  {staffList.map((member) => (
                    <motion.div key={member.id} variants={fadeUp} className="relative group/staff">
                      <Card className="h-full flex flex-col">
                        <CardContent className="pt-5 flex flex-col gap-4 flex-1">
                          <div className="flex flex-col items-center text-center gap-2">
                            <Avatar src={member.avatar} name={member.name} size="xl" />
                            <div>
                              <p className="font-semibold text-foreground">{member.name}</p>
                              <p className="text-xs text-red-400 mt-0.5">{member.role}</p>
                            </div>
                          </div>

                          {member.bio && (
                            <p className="text-xs text-muted-foreground leading-relaxed text-center line-clamp-3">
                              {member.bio}
                            </p>
                          )}

                          <div className="space-y-2 mt-auto">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Qualifications</p>
                            <div className="flex flex-wrap gap-1.5">
                              {member.qualifications.map((q, i) => (
                                <span
                                  key={i}
                                  className="inline-block bg-background border border-border text-foreground/80 text-[10px] px-2 py-0.5 rounded-md"
                                >
                                  {q}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-border">
                            <span className="text-xs text-muted-foreground">Experience</span>
                            <span className="text-sm font-semibold text-amber-400">{member.yearsExperience} yrs</span>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Action menu */}
                      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover/staff:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="h-7 w-7 rounded-md bg-background/90 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                              <MoreHorizontal className="h-3.5 w-3.5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast(`Edit form for ${member.name} coming soon`, 'info')}>
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="danger" onClick={() => handleDeleteStaff(member.id)}>
                              <Trash2 className="h-3.5 w-3.5" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>

            {/* Sponsors Tab */}
            <TabsContent value="sponsors">
              <motion.div key="sponsors" variants={stagger} initial="initial" animate="animate" className="space-y-6">
                {/* Sponsors header */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{sponsorList.length} sponsor{sponsorList.length !== 1 ? 's' : ''}</p>
                  <Button size="sm" className="gap-1.5" onClick={() => toast('Add Sponsor form coming soon', 'info')}>
                    <Plus className="h-3.5 w-3.5" />
                    Add Sponsor
                  </Button>
                </div>

                {(['platinum', 'gold', 'silver', 'bronze'] as const).map((tier) => {
                  const sponsors = sponsorList.filter((s) => s.tier === tier);
                  if (!sponsors.length) return null;
                  const cfg = tierConfig[tier];
                  return (
                    <motion.div key={tier} variants={fadeUp}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`badge text-xs font-semibold ${cfg.color}`}>
                          {cfg.label} Partners
                        </span>
                        <div className="flex-1 h-px bg-border" />
                      </div>
                      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {sponsors.map((sponsor) => (
                          <div key={sponsor.id} className="relative group/sponsor">
                            <Card>
                              <CardContent className="p-5 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="h-10 w-10 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground text-xs font-bold">
                                    {sponsor.name.slice(0, 2).toUpperCase()}
                                  </div>
                                  <p className="font-medium text-foreground text-sm">{sponsor.name}</p>
                                </div>
                                <span className={`badge text-[10px] font-semibold ${cfg.color}`}>
                                  {cfg.label}
                                </span>
                              </CardContent>
                            </Card>

                            {/* Action menu */}
                            <div className="absolute top-2 right-2 z-10 opacity-0 group-hover/sponsor:opacity-100 transition-opacity">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="h-7 w-7 rounded-md bg-background/90 border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                                    <MoreHorizontal className="h-3.5 w-3.5" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => toast(`Edit ${sponsor.name} coming soon`, 'info')}>
                                    <Pencil className="h-3.5 w-3.5" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem variant="danger" onClick={() => handleDeleteSponsor(sponsor.id)}>
                                    <Trash2 className="h-3.5 w-3.5" />
                                    Remove
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements">
              <motion.div key="achievements" variants={stagger} initial="initial" animate="animate" className="space-y-4">
                {/* Achievements header */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{achievementList.length} achievement{achievementList.length !== 1 ? 's' : ''}</p>
                  <Button size="sm" className="gap-1.5" onClick={() => toast('Add Achievement form coming soon', 'info')}>
                    <Plus className="h-3.5 w-3.5" />
                    Add Achievement
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
                  <div className="space-y-4 pl-16">
                    {achievementList
                      .sort((a, b) => b.year - a.year)
                      .map((achievement) => (
                        <motion.div key={achievement.id} variants={fadeUp} className="relative group/achievement">
                          <div className="absolute -left-10 top-4 flex items-center justify-center">
                            <div className="h-8 w-8 rounded-full bg-card border border-border flex items-center justify-center">
                              {achievementTypeIcon(achievement.type)}
                            </div>
                          </div>
                          <Card>
                            <CardContent className="p-5">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <p className="font-semibold text-foreground">{achievement.title}</p>
                                  <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                  <span className="text-sm font-bold text-amber-400">{achievement.year}</span>

                                  {/* Action menu */}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <button className="h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors ml-1">
                                        <MoreHorizontal className="h-3.5 w-3.5" />
                                      </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem onClick={() => toast(`Edit "${achievement.title}" coming soon`, 'info')}>
                                        <Pencil className="h-3.5 w-3.5" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem variant="danger" onClick={() => handleDeleteAchievement(achievement.id)}>
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              <div className="mt-3">
                                <Badge
                                  variant={
                                    achievement.type === 'championship' ? 'gold'
                                    : achievement.type === 'cup' ? 'blue'
                                    : achievement.type === 'award' ? 'purple'
                                    : 'green'
                                  }
                                  size="sm"
                                >
                                  {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
