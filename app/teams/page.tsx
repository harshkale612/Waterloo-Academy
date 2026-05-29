"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { teams } from "@/lib/data";

export default function TeamsPage() {
  return (
    <>
      <PageHero
        title="Our Teams"
        subtitle="From Minis to Men's 1st XV — there's a place for every rugby player at Waterloo County RFC."
        breadcrumbs={[{ label: "Teams" }]}
        image="https://images.pexels.com/photos/35102692/pexels-photo-35102692.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <section className="py-20 bg-[#F8F6F0] dark:bg-[#0D1421]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="2025/26 Season"
            title="All Teams"
            subtitle="Six teams covering every age group and ability level. Whatever your stage of the game, you belong here."
            centered
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map((team, i) => (
              <motion.div
                key={team.slug}
                className="bg-white dark:bg-[#1A2744] rounded-2xl overflow-hidden border border-[#EEE9DF] dark:border-white/5 hover:shadow-xl transition-shadow group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-[16/9] relative overflow-hidden">
                  <Image src={team.image} alt={team.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 50vw" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1421]/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-[#D4AF37] text-[#1A2744] border-0 text-xs font-semibold">{team.ageGroup}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-3xl text-[#1A2744] dark:text-white leading-none mb-2">{team.name}</h2>
                  <p className="text-[#5A5A5A] dark:text-white/55 text-sm leading-relaxed mb-5 line-clamp-3">{team.description}</p>

                  {team.played > 0 && (
                    <div className="grid grid-cols-4 gap-2 mb-5 p-3 bg-[#F8F6F0] dark:bg-[#243560] rounded-xl">
                      {[
                        { label: "P", value: team.played },
                        { label: "W", value: team.wins },
                        { label: "D", value: team.draws },
                        { label: "L", value: team.losses },
                      ].map(({ label, value }) => (
                        <div key={label} className="text-center">
                          <div className="font-display text-2xl text-[#1A2744] dark:text-white leading-none">{value}</div>
                          <div className="text-[10px] text-[#5A5A5A] dark:text-white/40 uppercase font-semibold">{label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="text-xs text-[#5A5A5A] dark:text-white/50 mb-4">
                    <span className="font-semibold text-[#1A2744] dark:text-white">Coach:</span> {team.coach}
                    <br />
                    <span className="font-semibold text-[#1A2744] dark:text-white">Training:</span> {team.training}
                  </div>

                  <Link href={`/teams/${team.slug}`}>
                    <button className="w-full py-2.5 bg-[#1A2744] dark:bg-[#D4AF37] text-white dark:text-[#1A2744] font-semibold rounded-xl hover:bg-[#243560] dark:hover:bg-[#E8CC6A] transition-colors flex items-center justify-center gap-2 text-sm">
                      View Full Squad <ArrowRight size={15} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training info CTA */}
      <section className="py-16 bg-[#1A2744]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-5xl text-white mb-4">WANT TO TRY RUGBY?</h2>
          <p className="text-white/65 mb-8">Come down to a training session and try it for free. No experience necessary — just show up in sports kit and we'll do the rest.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/join"><button className="px-8 py-3 bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-bold rounded-xl transition-colors">Register to Play</button></Link>
            <Link href="/contact"><button className="px-8 py-3 border border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl transition-colors">Contact a Coach</button></Link>
          </div>
        </div>
      </section>
    </>
  );
}
