"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { articles } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", "Match Report", "Club News", "Announcements", "Community"];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = articles.filter((a) => activeCategory === "All" || a.category === activeCategory);

  return (
    <>
      <PageHero
        title="News & Reports"
        subtitle="The latest match reports, club announcements, and community stories from Waterloo County RFC."
        breadcrumbs={[{ label: "News" }]}
        image="https://images.pexels.com/photos/20192747/pexels-photo-20192747.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="bg-[#F8F6F0] dark:bg-[#0D1421] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Featured article */}
          {articles[0] && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={`/news/${articles[0].slug}`} className="group block">
                <div className="relative aspect-[21/9] sm:aspect-[16/6] rounded-2xl overflow-hidden">
                  <Image src={articles[0].image} alt={articles[0].title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" priority sizes="100vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1421]/90 via-[#0D1421]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8">
                    <Badge className="bg-[#D4AF37] text-[#1A2744] border-0 mb-3">{articles[0].category}</Badge>
                    <h2 className="font-display text-4xl sm:text-5xl text-white leading-tight max-w-3xl group-hover:text-[#D4AF37] transition-colors">
                      {articles[0].title}
                    </h2>
                    <p className="mt-2 text-white/70 max-w-2xl line-clamp-2 hidden sm:block">{articles[0].excerpt}</p>
                    <div className="flex items-center gap-4 mt-4 text-white/50 text-sm">
                      <span>{new Date(articles[0].date).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}</span>
                      <span className="flex items-center gap-1"><Clock size={13} /> {articles[0].readTime} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold border transition-colors",
                  activeCategory === cat
                    ? "bg-[#1A2744] dark:bg-[#D4AF37] text-white dark:text-[#1A2744] border-transparent"
                    : "border-[#DDD8CE] dark:border-white/10 text-[#5A5A5A] dark:text-white/50 hover:border-[#1A2744] dark:hover:border-white/30 bg-white dark:bg-transparent"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <motion.article
                key={article.slug}
                className="bg-white dark:bg-[#1A2744] rounded-2xl overflow-hidden border border-[#EEE9DF] dark:border-white/5 hover:shadow-lg transition-shadow group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image src={article.image} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-[#D4AF37]/15 text-[#1A2744] dark:text-[#D4AF37] hover:bg-[#D4AF37]/20 border-0 text-xs">{article.category}</Badge>
                    <span className="text-xs text-[#5A5A5A] dark:text-white/40">{new Date(article.date).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span className="ml-auto text-xs text-[#5A5A5A] dark:text-white/40 flex items-center gap-1"><Clock size={11} />{article.readTime}m</span>
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

          {filtered.length === 0 && (
            <div className="text-center py-20 text-[#5A5A5A] dark:text-white/40">No articles in this category yet.</div>
          )}
        </div>
      </div>
    </>
  );
}
