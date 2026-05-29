"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { SponsorLogo } from "@/components/shared/sponsor-logos";
import { sponsors } from "@/lib/data";

const tierTable = [
  { feature: "Annual investment",           title: "POA",          gold: "POA",           silver: "POA",            bronze: "POA" },
  { feature: "Logo on matchday kit",        title: "✓ Front",      gold: "✓ Sleeve",      silver: "✓ Kit Bag",      bronze: "—" },
  { feature: "Website banner placement",    title: "✓ Homepage",   gold: "✓ All pages",   silver: "✓ Fixtures",     bronze: "✓ Sponsors" },
  { feature: "Social media mentions/season",title: "12",           gold: "6",             silver: "3",              bronze: "1" },
  { feature: "Matchday pitch signage",      title: "✓ 2 boards",  gold: "✓ 1 board",     silver: "—",              bronze: "—" },
  { feature: "Newsletter feature",          title: "✓ Monthly",   gold: "✓ Quarterly",   silver: "—",              bronze: "—" },
  { feature: "VIP hospitality tickets",     title: "4 / match",   gold: "2 / match",     silver: "—",              bronze: "—" },
  { feature: "Clubhouse branding",          title: "✓ Premium",   gold: "✓ Standard",    silver: "—",              bronze: "—" },
];

const sponsorshipStats = [
  { value: "450+",    label: "Club Members" },
  { value: "2,000+",  label: "Matchday Fans / Season" },
  { value: "5,000+",  label: "Social Media Followers" },
  { value: "10,000+", label: "Monthly Website Visits" },
];

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        title="Sponsors & Partners"
        subtitle="We are proud to partner with local and national businesses who share our passion for rugby and community."
        breadcrumbs={[{ label: "Sponsors & Partners" }]}
        image="https://images.pexels.com/photos/9799193/pexels-photo-9799193.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="bg-[#F8F6F0] dark:bg-[#0D1421] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Thank-you intro ───────────────────────────────────────── */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-widest">
              With Grateful Thanks
            </span>
            <h2 className="font-display text-5xl text-[#1A2744] dark:text-white mt-2 mb-4">
              Our Amazing Partners
            </h2>
            <p className="text-[#5A5A5A] dark:text-white/60 leading-relaxed">
              Without the generous support of our sponsors, Waterloo County RFC could not deliver
              the rugby experience our members deserve. Thank you to all our partners.
            </p>
          </div>

          {/* ── Title sponsor ─────────────────────────────────────────── */}
          <div className="mb-14">
            <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em] text-center mb-6">
              Title Sponsor
            </p>
            {sponsors.title.map((s) => (
              <motion.div
                key={s.name}
                className="bg-white dark:bg-[#1A2744] border-2 border-[#D4AF37] rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto shadow-xl shadow-[#D4AF37]/10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-8">
                  {/* Logo */}
                  <div className="shrink-0 w-44 h-24 flex items-center justify-center bg-[#F8F6F0] dark:bg-[#243560] rounded-xl px-4">
                    <SponsorLogo name={s.name} className="h-14 w-auto max-w-[160px]" />
                  </div>
                  {/* Details */}
                  <div className="flex-1 text-center sm:text-left">
                    <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full mb-2">
                      Senior Men&apos;s Sponsor
                    </div>
                    <h3 className="font-display text-4xl text-[#1A2744] dark:text-white">{s.name}</h3>
                    <p className="text-[#5A5A5A] dark:text-white/60 text-sm mt-2 leading-relaxed">
                      {s.description}
                    </p>
                    <a
                      href={s.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-[#D4AF37] hover:text-[#1A2744] dark:hover:text-white transition-colors"
                    >
                      Visit Website <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Gold sponsors ─────────────────────────────────────────── */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-[#D4AF37]/20" />
              <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em]">Gold Partners</p>
              <div className="flex-1 h-px bg-[#D4AF37]/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {sponsors.gold.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-[#1A2744] border border-[#DDD8CE] dark:border-white/10 rounded-2xl p-7 flex flex-col items-center gap-4 hover:border-[#D4AF37] hover:shadow-lg transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  aria-label={`Visit ${s.name}`}
                >
                  <div className="h-16 flex items-center justify-center">
                    <SponsorLogo name={s.name} className="h-14 w-auto max-w-[200px]" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-[#1A2744] dark:text-white/80">{s.name}</p>
                    <p className="text-[10px] text-[#5A5A5A] dark:text-white/40 mt-0.5 flex items-center justify-center gap-1">
                      Visit site <ExternalLink size={9} />
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Silver sponsors ───────────────────────────────────────── */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-[#D4AF37]/20" />
              <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em]">Silver Partners</p>
              <div className="flex-1 h-px bg-[#D4AF37]/20" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {sponsors.silver.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-[#1A2744] border border-[#DDD8CE] dark:border-white/10 rounded-xl p-5 flex flex-col items-center gap-3 hover:border-[#D4AF37] hover:shadow-md transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  aria-label={`Visit ${s.name}`}
                >
                  <div className="h-12 flex items-center justify-center">
                    <SponsorLogo name={s.name} className="h-10 w-auto max-w-[160px]" />
                  </div>
                  <p className="text-[10px] font-semibold text-[#5A5A5A] dark:text-white/50 text-center">{s.name}</p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Bronze sponsors ───────────────────────────────────────── */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-[#D4AF37]/20" />
              <p className="text-xs font-semibold text-[#D4AF37] uppercase tracking-[0.2em]">Bronze Partners</p>
              <div className="flex-1 h-px bg-[#D4AF37]/20" />
            </div>
            <div className="flex flex-wrap items-stretch justify-center gap-4">
              {sponsors.bronze.map((s, i) => (
                <motion.a
                  key={s.name}
                  href={s.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-[#1A2744] border border-[#DDD8CE] dark:border-white/10 rounded-xl p-4 flex flex-col items-center justify-center gap-2 w-36 hover:border-[#D4AF37] hover:shadow-md transition-all group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  aria-label={`Visit ${s.name}`}
                >
                  <div className="h-10 flex items-center justify-center">
                    <SponsorLogo name={s.name} className="h-9 w-auto max-w-[120px]" />
                  </div>
                  <p className="text-[9px] font-semibold text-[#5A5A5A] dark:text-white/40 text-center leading-tight">
                    {s.name}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── Become a sponsor ──────────────────────────────────────── */}
          <div id="become" className="bg-[#1A2744] rounded-3xl p-8 sm:p-12">
            <SectionHeader
              eyebrow="Partner With Us"
              title="Become a Sponsor"
              subtitle="Support rugby in the Waterloo Region and get your brand in front of thousands of passionate fans, players, and community members."
              centered
              light
            />

            {/* Reach stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-10">
              {sponsorshipStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="bg-[#243560] rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="font-display text-4xl text-[#D4AF37]">{stat.value}</div>
                  <div className="text-white/60 text-xs mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Tier comparison table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 mb-8">
              <table className="w-full text-sm min-w-[600px]" aria-label="Sponsorship tier comparison">
                <thead>
                  <tr className="bg-[#243560]">
                    <th className="py-3 px-4 text-left text-white/60 text-xs uppercase font-semibold">Feature</th>
                    {["Title", "Gold", "Silver", "Bronze"].map((tier) => (
                      <th key={tier} className="py-3 px-4 text-center text-xs font-bold uppercase tracking-wide">
                        <span className={tier === "Title" ? "text-[#D4AF37]" : "text-white/80"}>{tier}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tierTable.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-[#1A2744]" : "bg-[#243560]/40"}>
                      <td className="py-3 px-4 text-white/70 text-xs">{row.feature}</td>
                      <td className="py-3 px-4 text-center text-[#D4AF37] text-xs">{row.title}</td>
                      <td className="py-3 px-4 text-center text-white/70 text-xs">{row.gold}</td>
                      <td className="py-3 px-4 text-center text-white/70 text-xs">{row.silver}</td>
                      <td className="py-3 px-4 text-center text-white/70 text-xs">{row.bronze}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center">
              <Link href="/contact?subject=Sponsorship+Enquiry">
                <button className="inline-flex items-center gap-2 px-8 py-3 bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-bold rounded-xl transition-colors">
                  Enquire Now <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
