"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Users, Shield, Trophy, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/section-header";
import { articles, teams, fixtures, clubStats, sponsors } from "@/lib/data";
import { SponsorLogo } from "@/components/shared/sponsor-logos";

const upcomingFixtures = fixtures.filter((f) => !f.homeScore && !f.awayScore).slice(0, 3);
const latestNews = articles.slice(0, 3);

const statIcons: Record<string, React.ElementType> = { Calendar, Users, Shield, Trophy };

function FixtureCountdown({ dateStr }: { dateStr: string }) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  return (
    <div className="text-center">
      <div className="text-3xl font-display text-[#D4AF37] leading-none">{days}</div>
      <div className="text-xs text-white/50 uppercase tracking-wide">days</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/3624737/pexels-photo-3624737.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Waterloo County RFC players in action"
            fill
            className="object-cover object-center"
            priority
            fetchPriority="high"
          />
          <div className="absolute inset-0 hero-gradient" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-[#D4AF37] text-sm font-semibold uppercase tracking-[0.2em] mb-4 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
              Est. 1976 · Waterloo Region, Ontario
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-6xl sm:text-8xl lg:text-[108px] text-white leading-none mt-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            WATERLOO COUNTY
            <span className="block text-[#D4AF37]">RUGBY CLUB</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-xl text-white/75 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            Rugby for everyone in Waterloo Region. All ages, all abilities — join the family today.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/join">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-bold text-base px-8 h-12 shadow-lg shadow-[#D4AF37]/20">
                Join the Club <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link href="/fixtures">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold text-base px-8 h-12 bg-transparent">
                Next Match <ChevronRight size={18} className="ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1 h-2.5 rounded-full bg-[#D4AF37]" />
          </div>
        </motion.div>
      </section>

      {/* UPCOMING FIXTURES STRIP */}
      <section className="bg-[#1A2744] py-8" aria-label="Upcoming fixtures">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-widest">Upcoming Fixtures</span>
            <div className="flex-1 h-px bg-white/10" />
            <Link href="/fixtures" className="text-xs text-white/50 hover:text-[#D4AF37] transition-colors flex items-center gap-1">
              View all <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {upcomingFixtures.map((f, i) => (
              <motion.div
                key={f.id}
                className="bg-[#243560] rounded-xl p-5 border border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-widest truncate flex-1 pr-2">{f.competition}</span>
                  <FixtureCountdown dateStr={f.date} />
                </div>
                <div className="text-sm text-white/50 mb-2">
                  {new Date(f.date).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" })}
                  {" · "}
                  {new Date(f.date).toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div className="flex items-center justify-between text-white font-semibold text-sm">
                  <span className="truncate flex-1">{f.home}</span>
                  <span className="text-[#D4AF37] text-xs font-bold mx-2 shrink-0">VS</span>
                  <span className="truncate flex-1 text-right">{f.away}</span>
                </div>
                <div className="mt-2 text-xs text-white/40">{f.venue}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CLUB STATS */}
      <section className="bg-[#D4AF37] py-12" aria-label="Club statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {clubStats.map((stat, i) => {
              const Icon = statIcons[stat.icon];
              return (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Icon size={24} className="mx-auto mb-2 text-[#1A2744]/60" />
                  <div className="font-display text-5xl text-[#1A2744] leading-none">{stat.value}</div>
                  <div className="text-[#1A2744]/70 text-sm font-semibold mt-1 uppercase tracking-wide">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="py-20 bg-[#F8F6F0] dark:bg-[#0D1421]" aria-label="Latest news">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader eyebrow="Latest News" title="From the Club" subtitle="Match reports, club announcements, and community stories." />
            <Link href="/news" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#1A2744] dark:text-[#D4AF37] hover:text-[#D4AF37] transition-colors">
              All News <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article, i) => (
              <motion.article
                key={article.slug}
                className="bg-white dark:bg-[#1A2744] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group border border-[#EEE9DF] dark:border-white/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-[#D4AF37]/15 text-[#1A2744] dark:text-[#D4AF37] hover:bg-[#D4AF37]/20 border-0 text-xs">{article.category}</Badge>
                    <span className="text-xs text-[#5A5A5A] dark:text-white/40">{new Date(article.date).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}</span>
                  </div>
                  <h3 className="font-semibold text-[#1A2744] dark:text-white text-lg leading-snug mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">{article.title}</h3>
                  <p className="text-sm text-[#5A5A5A] dark:text-white/55 line-clamp-2 mb-4">{article.excerpt}</p>
                  <Link href={`/news/${article.slug}`} className="text-sm font-semibold text-[#1A2744] dark:text-[#D4AF37] hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                    Read more <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="py-20 bg-white dark:bg-[#1A2744]" aria-label="About the club">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <SectionHeader eyebrow="Our Story" title="Built on Community, Driven by Passion" subtitle="Since 1976, Waterloo County RFC has been home to rugby players and supporters of all ages across the Waterloo Region. We believe in the power of sport to build character, forge lifelong friendships, and strengthen our community." />
              <div className="mt-8 space-y-4">
                {[
                  { icon: "🏆", text: "23 provincial titles across all age groups" },
                  { icon: "👥", text: "450+ members from ages 6 to 60+" },
                  { icon: "🌱", text: "World Rugby-certified junior development pathway" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-[#1A2744] dark:text-white">
                    <span className="text-xl">{icon}</span>
                    <span className="text-base">{text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-3">
                <Link href="/about"><Button className="bg-[#1A2744] hover:bg-[#243560] text-white dark:bg-[#D4AF37] dark:hover:bg-[#E8CC6A] dark:text-[#1A2744]">Our Story <ArrowRight size={16} className="ml-2" /></Button></Link>
                <Link href="/join"><Button variant="outline" className="border-[#1A2744] text-[#1A2744] dark:border-white/30 dark:text-white">Join Us</Button></Link>
              </div>
            </motion.div>
            <motion.div className="relative" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                <Image src="https://images.pexels.com/photos/29292737/pexels-photo-29292737.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Waterloo County RFC players in action" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#D4AF37] text-[#1A2744] rounded-xl p-4 shadow-xl">
                <div className="font-display text-4xl leading-none">1976</div>
                <div className="text-xs font-bold uppercase tracking-widest mt-1">Founded</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TEAMS PREVIEW */}
      <section className="py-20 bg-[#F8F6F0] dark:bg-[#0D1421]" aria-label="Our teams">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader eyebrow="Our Teams" title="Rugby for All" subtitle="From Minis to Men's 1st XV — there's a team for every player." />
            <Link href="/teams" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#1A2744] dark:text-[#D4AF37] hover:text-[#D4AF37] transition-colors">
              All Teams <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.slice(0, 6).map((team, i) => (
              <motion.div key={team.slug} className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Image src={team.image} alt={team.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1421]/90 via-[#0D1421]/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <Badge className="bg-[#D4AF37] text-[#1A2744] border-0 text-[10px] font-semibold mb-2">{team.ageGroup}</Badge>
                  <h3 className="font-display text-2xl text-white leading-none">{team.name}</h3>
                  <Link href={`/teams/${team.slug}`} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#D4AF37] hover:text-white transition-colors">
                    View Team <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN CTA */}
      <section className="relative py-24 overflow-hidden bg-[#1A2744]" aria-label="Join the club">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2E7D32] rounded-full filter blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">Ready to Play?</span>
            <h2 className="font-display text-5xl sm:text-6xl text-white mt-3 leading-none">
              JOIN WATERLOO<br />
              <span className="text-[#D4AF37]">COUNTY RFC</span>
            </h2>
            <p className="mt-4 text-white/65 text-lg">Memberships from just $65/season. All ages, all abilities welcome.</p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/join"><Button size="lg" className="bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-bold text-base px-10 h-12">Register Now <ArrowRight size={18} className="ml-2" /></Button></Link>
              <Link href="/contact"><Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent font-semibold px-8 h-12">Get in Touch</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SPONSORS BAR */}
      <section className="py-14 bg-[#F8F6F0] dark:bg-[#0D1421]" aria-label="Our sponsors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold text-[#5A5A5A] dark:text-white/40 uppercase tracking-[0.2em] mb-8">Proud Partners of Waterloo County RFC</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[...sponsors.gold, ...sponsors.silver].map((s) => (
              <a key={s.name} href={s.website} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="hover:scale-110 transition-transform duration-300">
                <SponsorLogo name={s.name} className="h-10 w-auto max-w-[160px]" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
