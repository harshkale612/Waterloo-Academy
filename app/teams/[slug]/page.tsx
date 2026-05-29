import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock, User, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/shared/page-hero";
import { teams, fixtures } from "@/lib/data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return teams.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const team = teams.find((t) => t.slug === slug);
  if (!team) return {};
  return { title: team.name, description: team.description };
}

export default async function TeamPage({ params }: Props) {
  const { slug } = await params;
  const team = teams.find((t) => t.slug === slug);
  if (!team) notFound();

  const teamFixtures = fixtures.filter((f) => f.team === slug);
  const pastResults = teamFixtures.filter((f) => f.homeScore !== null).slice(-5).reverse();
  const upcomingMatches = teamFixtures.filter((f) => f.homeScore === null).slice(0, 3);

  return (
    <>
      <PageHero
        title={team.name}
        subtitle={team.description}
        breadcrumbs={[{ label: "Teams", href: "/teams" }, { label: team.name }]}
        image={team.image}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/teams" className="inline-flex items-center gap-2 text-sm text-[#5A5A5A] dark:text-white/50 hover:text-[#D4AF37] mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Teams
        </Link>

        {/* Season Stats */}
        {team.played > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[
              { label: "Played", value: team.played },
              { label: "Won", value: team.wins, color: "text-green-600" },
              { label: "Drew", value: team.draws, color: "text-amber-600" },
              { label: "Lost", value: team.losses, color: "text-red-600" },
              { label: "Points For", value: team.pointsFor },
              { label: "Points Against", value: team.pointsAgainst },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-white dark:bg-[#1A2744] border border-[#EEE9DF] dark:border-white/5 rounded-xl p-4 text-center">
                <div className={`font-display text-4xl leading-none ${color ?? "text-[#1A2744] dark:text-white"}`}>{value}</div>
                <div className="text-xs text-[#5A5A5A] dark:text-white/50 mt-1 uppercase font-semibold">{label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Squad */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl text-[#1A2744] dark:text-white mb-6">Squad</h2>
            {team.players.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {team.players.map((player) => (
                  <div key={player.number} className="bg-white dark:bg-[#1A2744] border border-[#EEE9DF] dark:border-white/5 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#1A2744] dark:bg-[#243560] flex items-center justify-center text-[#D4AF37] font-display text-lg leading-none shrink-0">
                      {player.number}
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A2744] dark:text-white text-sm">{player.name}</div>
                      <div className="text-xs text-[#5A5A5A] dark:text-white/50">{player.position}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#5A5A5A] dark:text-white/50 text-sm">Squad list coming soon.</p>
            )}

            {/* Recent Results */}
            {pastResults.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-3xl text-[#1A2744] dark:text-white mb-5">Recent Results</h2>
                <div className="space-y-3">
                  {pastResults.map((f) => {
                    const homeWin = (f.homeScore ?? 0) > (f.awayScore ?? 0);
                    const draw = f.homeScore === f.awayScore;
                    const isHome = f.isHome;
                    const won = (isHome && homeWin) || (!isHome && !homeWin && !draw);
                    const result = draw ? "D" : won ? "W" : "L";
                    const resultColor = result === "W" ? "bg-green-500" : result === "L" ? "bg-red-500" : "bg-amber-500";
                    return (
                      <div key={f.id} className="flex items-center gap-4 bg-white dark:bg-[#1A2744] border border-[#EEE9DF] dark:border-white/5 rounded-xl px-5 py-3">
                        <span className={`w-7 h-7 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0 ${resultColor}`}>{result}</span>
                        <div className="flex-1 flex items-center justify-between text-sm font-medium text-[#1A2744] dark:text-white">
                          <span>{f.home}</span>
                          <span className="font-display text-lg mx-3">{f.homeScore}–{f.awayScore}</span>
                          <span>{f.away}</span>
                        </div>
                        <span className="text-xs text-[#5A5A5A] dark:text-white/40 hidden sm:block">{new Date(f.date).toLocaleDateString("en-CA", { month: "short", day: "numeric" })}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coach */}
            <div className="bg-white dark:bg-[#1A2744] border border-[#EEE9DF] dark:border-white/5 rounded-2xl p-6">
              <h3 className="font-display text-2xl text-[#1A2744] dark:text-white mb-4">Coaching Staff</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                  <User size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <div className="font-semibold text-[#1A2744] dark:text-white text-sm">{team.coach}</div>
                  <div className="text-xs text-[#5A5A5A] dark:text-white/50">Head Coach</div>
                </div>
              </div>
            </div>

            {/* Training */}
            <div className="bg-white dark:bg-[#1A2744] border border-[#EEE9DF] dark:border-white/5 rounded-2xl p-6">
              <h3 className="font-display text-2xl text-[#1A2744] dark:text-white mb-4">Training</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <Clock size={15} className="text-[#D4AF37] mt-0.5 shrink-0" />
                  <span className="text-[#5A5A5A] dark:text-white/60">{team.training}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin size={15} className="text-[#D4AF37] mt-0.5 shrink-0" />
                  <span className="text-[#5A5A5A] dark:text-white/60">{team.ground}</span>
                </div>
              </div>
              <Link href="/join" className="mt-5 block">
                <button className="w-full py-2.5 bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-bold rounded-xl text-sm transition-colors">
                  Join this Team
                </button>
              </Link>
            </div>

            {/* Upcoming */}
            {upcomingMatches.length > 0 && (
              <div className="bg-white dark:bg-[#1A2744] border border-[#EEE9DF] dark:border-white/5 rounded-2xl p-6">
                <h3 className="font-display text-2xl text-[#1A2744] dark:text-white mb-4">Next Fixtures</h3>
                <div className="space-y-4">
                  {upcomingMatches.map((f) => (
                    <div key={f.id} className="text-sm border-b border-[#EEE9DF] dark:border-white/5 pb-3 last:border-0 last:pb-0">
                      <div className="text-[#5A5A5A] dark:text-white/50 text-xs mb-1">{new Date(f.date).toLocaleDateString("en-CA", { weekday: "short", month: "short", day: "numeric" })}</div>
                      <div className="font-semibold text-[#1A2744] dark:text-white">{f.home} vs {f.away}</div>
                      <div className="text-xs text-[#5A5A5A] dark:text-white/40">{f.venue}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
