"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { timeline, committee } from "@/lib/data";

const values = [
  {
    icon: "🤝",
    title: "Community",
    description: "We are deeply rooted in the Waterloo Region, welcoming players and supporters from all walks of life. Rugby brings people together, and we are proud to be the heart of that in our community.",
  },
  {
    icon: "⭐",
    title: "Excellence",
    description: "We strive for excellence on and off the pitch. From our World Rugby-certified coaching to our state-of-the-art training facilities, we give every member the tools to reach their full potential.",
  },
  {
    icon: "🌍",
    title: "Inclusivity",
    description: "Rugby is for everyone. We run teams for all ages and abilities — from 6-year-old Minis experiencing their first tackle to 60-year-old social members who love the game. No one is turned away.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About the Club"
        subtitle="Discover the history, people, and values behind Waterloo County RFC."
        breadcrumbs={[{ label: "About" }]}
        image="https://images.pexels.com/photos/9799196/pexels-photo-9799196.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      {/* INTRO */}
      <section className="py-20 bg-white dark:bg-[#1A2744]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeader eyebrow="Our Story" title="50 Years of Rugby in the Waterloo Region" subtitle="Founded in 1976 by a passionate group of rugby lovers from the University of Waterloo and the wider community, Waterloo County RFC has grown from a handful of players to a thriving club of over 450 members." />
              <p className="mt-4 text-[#5A5A5A] dark:text-white/60 leading-relaxed">
                Over five decades, we have won provincial championships, developed hundreds of players, welcomed families, forged lifelong friendships, and built a club culture that is the envy of the Ontario rugby community. We are more than a rugby club — we are a family.
              </p>
              <div className="mt-8 flex gap-4">
                <Link href="/join"><button className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A2744] dark:bg-[#D4AF37] text-white dark:text-[#1A2744] font-semibold rounded-lg hover:bg-[#243560] dark:hover:bg-[#E8CC6A] transition-colors">Join the Club <ArrowRight size={16} /></button></Link>
                <Link href="/contact"><button className="inline-flex items-center gap-2 px-6 py-3 border border-[#1A2744] dark:border-white/30 text-[#1A2744] dark:text-white font-semibold rounded-lg hover:bg-[#F8F6F0] dark:hover:bg-white/5 transition-colors">Contact Us</button></Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                  <Image src="https://images.pexels.com/photos/3631109/pexels-photo-3631109.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Rugby match action" fill className="object-cover" sizes="25vw" loading="lazy" />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative mt-8">
                  <Image src="https://images.unsplash.com/photo-1613332331877-8a47030be80b?w=600&q=80" alt="Junior rugby players" fill className="object-cover" sizes="25vw" loading="lazy" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 bg-[#F8F6F0] dark:bg-[#0D1421]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What We Stand For" title="Our Mission & Values" centered />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="bg-white dark:bg-[#1A2744] rounded-2xl p-8 text-center border border-[#EEE9DF] dark:border-white/5 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="font-display text-3xl text-[#1A2744] dark:text-white mb-3">{v.title}</h3>
                <p className="text-[#5A5A5A] dark:text-white/60 leading-relaxed text-sm">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="py-20 bg-[#1A2744]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Club History" title="Our Journey" centered light />
          <div className="mt-14 relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-[#D4AF37]/20" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className={`relative flex ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"} items-start gap-8`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Dot */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-[#1A2744] mt-1.5 z-10" />
                  {/* Content */}
                  <div className={`ml-12 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? "sm:text-right sm:pr-8" : "sm:pl-8"}`}>
                    <div className="font-display text-3xl text-[#D4AF37] leading-none">{item.year}</div>
                    <h3 className="text-white font-semibold text-lg mt-1 mb-2">{item.milestone}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HONOURS */}
      <section className="py-20 bg-white dark:bg-[#1A2744]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Trophy Cabinet" title="Honours & Achievements" centered />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { comp: "ORU Premier League", years: ["2023", "2019", "2015", "1984"] },
              { comp: "ORU Knockout Cup", years: ["2022", "2018", "2012", "2008"] },
              { comp: "Ontario Provincial Championship", years: ["2021", "2017", "2010", "2001", "1992"] },
              { comp: "Women's ORU League", years: ["2024", "2020"] },
              { comp: "ORU Junior League", years: ["2023", "2021", "2019"] },
              { comp: "Community Club of the Year", years: ["2022", "2018", "2014"] },
            ].map((h, i) => (
              <motion.div
                key={h.comp}
                className="bg-[#F8F6F0] dark:bg-[#243560] rounded-xl p-5 border border-[#EEE9DF] dark:border-white/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="text-2xl mb-2">🏆</div>
                <h3 className="font-semibold text-[#1A2744] dark:text-white text-sm mb-2">{h.comp}</h3>
                <div className="flex flex-wrap gap-1">
                  {h.years.map((y) => (
                    <span key={y} className="text-xs px-2 py-0.5 bg-[#D4AF37]/15 text-[#1A2744] dark:text-[#D4AF37] rounded font-semibold">{y}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITTEE */}
      <section id="committee" className="py-20 bg-[#F8F6F0] dark:bg-[#0D1421]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="The Team Behind the Team" title="Committee & Coaching Staff" centered />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {committee.map((person, i) => (
              <motion.div
                key={person.name}
                className="bg-white dark:bg-[#1A2744] rounded-2xl overflow-hidden border border-[#EEE9DF] dark:border-white/5 hover:shadow-lg transition-shadow group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image src={person.image} alt={person.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[#1A2744] dark:text-white text-lg">{person.name}</h3>
                  <p className="text-[#D4AF37] text-sm font-medium mb-3">{person.role}</p>
                  <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-xs text-[#5A5A5A] dark:text-white/50 hover:text-[#D4AF37] transition-colors">
                    <Mail size={12} /> {person.email}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAFEGUARDING */}
      <section id="safeguarding" className="py-16 bg-[#1A2744]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-3xl mb-4">🛡️</div>
          <h2 className="font-display text-4xl text-white mb-4">Safeguarding & Welfare</h2>
          <p className="text-white/65 leading-relaxed mb-6">
            Waterloo County RFC is fully committed to the safety and wellbeing of all members, particularly children and young people. All coaches and volunteers are DBS/Police-checked and hold current World Rugby Safeguarding certificates. Our full Safeguarding Policy is available to all members on request.
          </p>
          <a href="mailto:safeguarding@waterloocountyrugby.com" className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-semibold rounded-lg transition-colors">
            Contact Safeguarding Officer <Mail size={16} />
          </a>
        </div>
      </section>
    </>
  );
}
