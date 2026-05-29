"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Filter } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { fixtures, standings, teams } from "@/lib/data";
import { cn } from "@/lib/utils";

type TimeFilter = "all" | "upcoming" | "past";
type TeamFilter = string;

export default function FixturesPage() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [teamFilter, setTeamFilter] = useState<TeamFilter>("all");

  const filtered = useMemo(() => {
    return fixtures.filter((f) => {
      const isPast = f.homeScore !== null;
      if (timeFilter === "upcoming" && isPast) return false;
      if (timeFilter === "past" && !isPast) return false;
      if (teamFilter !== "all" && f.team !== teamFilter) return false;
      return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [timeFilter, teamFilter]);

  const getResult = (f: typeof fixtures[0]) => {
    if (!f.homeScore === null) return null;
    const homeWin = (f.homeScore ?? 0) > (f.awayScore ?? 0);
    const draw = f.homeScore === f.awayScore;
    const isHome = f.isHome;
    if (draw) return "D";
    return (isHome && homeWin) || (!isHome && !homeWin) ? "W" : "L";
  };

  return (
    <>
      <PageHero
        title="Fixtures & Results"
        subtitle="All home and away fixtures for the 2025/26 season across all teams."
        breadcrumbs={[{ label: "Fixtures & Results" }]}
        image="https://images.pexels.com/photos/32471037/pexels-photo-32471037.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="bg-[#F8F6F0] dark:bg-[#0D1421] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Tabs value={timeFilter} onValueChange={(v) => setTimeFilter(v as TimeFilter)} className="w-full sm:w-auto">
              <TabsList className="bg-white dark:bg-[#1A2744] border border-[#EEE9DF] dark:border-white/5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Results</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={14} className="text-[#5A5A5A] dark:text-white/50 shrink-0" />
              {[{ slug: "all", name: "All Teams" }, ...teams.slice(0, 4).map((t) => ({ slug: t.slug, name: t.name }))].map((t) => (
                <button
                  key={t.slug}
                  onClick={() => setTeamFilter(t.slug)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors",
                    teamFilter === t.slug
                      ? "bg-[#1A2744] dark:bg-[#D4AF37] text-white dark:text-[#1A2744] border-transparent"
                      : "border-[#DDD8CE] dark:border-white/10 text-[#5A5A5A] dark:text-white/50 hover:border-[#1A2744] dark:hover:border-white/30"
                  )}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Fixtures table */}
          <div className="space-y-3 mb-16">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-[#5A5A5A] dark:text-white/40">No fixtures found for the selected filters.</div>
            ) : (
              filtered.map((f, i) => {
                const isPast = f.homeScore !== null;
                const result = isPast ? getResult(f) : null;
                const resultColors: Record<string, string> = { W: "bg-green-500/15 text-green-700 dark:text-green-400", L: "bg-red-500/15 text-red-700 dark:text-red-400", D: "bg-amber-500/15 text-amber-700 dark:text-amber-400" };
                const rowBg = result === "W" ? "border-l-green-500" : result === "L" ? "border-l-red-500" : result === "D" ? "border-l-amber-500" : "border-l-transparent";

                return (
                  <motion.div
                    key={f.id}
                    className={cn("bg-white dark:bg-[#1A2744] border border-[#EEE9DF] dark:border-white/5 border-l-4 rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4", rowBg)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    {/* Date */}
                    <div className="shrink-0 text-center sm:w-28">
                      <div className="text-xs text-[#5A5A5A] dark:text-white/40 uppercase font-semibold">{new Date(f.date).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" })}</div>
                      <div className="text-xs text-[#5A5A5A] dark:text-white/40">{new Date(f.date).toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" })}</div>
                    </div>

                    {/* Match */}
                    <div className="flex-1 flex items-center gap-3">
                      <span className="font-semibold text-[#1A2744] dark:text-white text-sm sm:text-base">{f.home}</span>
                      {isPast ? (
                        <span className="font-display text-2xl text-[#1A2744] dark:text-white shrink-0">{f.homeScore}–{f.awayScore}</span>
                      ) : (
                        <span className="text-[#D4AF37] font-bold text-sm shrink-0">VS</span>
                      )}
                      <span className="font-semibold text-[#1A2744] dark:text-white text-sm sm:text-base">{f.away}</span>
                    </div>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <span className="text-xs text-[#5A5A5A] dark:text-white/40 flex items-center gap-1"><MapPin size={11} />{f.venue.split(",")[0]}</span>
                      <Badge className="bg-[#D4AF37]/10 text-[#5A5A5A] dark:text-[#D4AF37] border-0 text-[10px]">{f.competition}</Badge>
                      {result && (
                        <span className={cn("w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center", resultColors[result])}>{result}</span>
                      )}
                      {!isPast && (
                        <a
                          href={`data:text/calendar;charset=utf8,BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${f.home} vs ${f.away}\nDTSTART:${new Date(f.date).toISOString().replace(/[-:]/g, "").split(".")[0]}Z\nLOCATION:${f.venue}\nEND:VEVENT\nEND:VCALENDAR`}
                          download={`${f.id}.ics`}
                          className="text-xs text-[#D4AF37] hover:text-[#1A2744] dark:hover:text-white font-semibold flex items-center gap-1 transition-colors"
                          aria-label="Add to calendar"
                        >
                          <Calendar size={12} /> Add
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* League Standings */}
          <div>
            <SectionHeader eyebrow="2025/26 Season" title="League Standings" subtitle="ORU Premier League — Men's 1st XV" />
            <div className="mt-6 bg-white dark:bg-[#1A2744] rounded-2xl border border-[#EEE9DF] dark:border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm" aria-label="League standings table">
                  <thead>
                    <tr className="bg-[#1A2744] text-white text-xs uppercase font-semibold tracking-wide">
                      <th className="py-3 px-4 text-left">Pos</th>
                      <th className="py-3 px-4 text-left">Team</th>
                      <th className="py-3 px-4 text-center">P</th>
                      <th className="py-3 px-4 text-center">W</th>
                      <th className="py-3 px-4 text-center">D</th>
                      <th className="py-3 px-4 text-center">L</th>
                      <th className="py-3 px-4 text-center">PF</th>
                      <th className="py-3 px-4 text-center">PA</th>
                      <th className="py-3 px-4 text-center font-bold text-[#D4AF37]">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((row, i) => {
                      const isWaterloo = row.team.includes("Waterloo");
                      return (
                        <tr
                          key={row.team}
                          className={cn(
                            "border-b border-[#EEE9DF] dark:border-white/5 last:border-0 transition-colors",
                            isWaterloo ? "bg-[#D4AF37]/10 font-semibold" : "hover:bg-[#F8F6F0] dark:hover:bg-[#243560]/50"
                          )}
                        >
                          <td className="py-3 px-4">
                            <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold", i < 3 ? "bg-[#D4AF37] text-[#1A2744]" : "text-[#5A5A5A] dark:text-white/50")}>{row.pos}</span>
                          </td>
                          <td className="py-3 px-4 text-[#1A2744] dark:text-white">{row.team}</td>
                          <td className="py-3 px-4 text-center text-[#5A5A5A] dark:text-white/60">{row.p}</td>
                          <td className="py-3 px-4 text-center text-green-700 dark:text-green-400">{row.w}</td>
                          <td className="py-3 px-4 text-center text-amber-700 dark:text-amber-400">{row.d}</td>
                          <td className="py-3 px-4 text-center text-red-700 dark:text-red-400">{row.l}</td>
                          <td className="py-3 px-4 text-center text-[#5A5A5A] dark:text-white/60">{row.pf}</td>
                          <td className="py-3 px-4 text-center text-[#5A5A5A] dark:text-white/60">{row.pa}</td>
                          <td className="py-3 px-4 text-center font-display text-xl text-[#1A2744] dark:text-[#D4AF37]">{row.pts}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
