"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { galleryImages } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", "Matches", "Training", "Events", "Club Life"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = galleryImages.filter((img) => activeCategory === "All" || img.category === activeCategory);

  const openLightbox = (id: number) => {
    const idx = filtered.findIndex((img) => img.id === id);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  };

  const next = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <>
      <PageHero
        title="Photo Gallery"
        subtitle="Matchday action, training sessions, club events, and life at Waterloo County RFC."
        breadcrumbs={[{ label: "Gallery" }]}
        image="https://images.pexels.com/photos/8530366/pexels-photo-8530366.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="bg-[#F8F6F0] dark:bg-[#0D1421] min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

          {/* Masonry grid */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <motion.button
                key={img.id}
                className="break-inside-avoid block w-full rounded-xl overflow-hidden relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                onClick={() => openLightbox(img.id)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.05 }}
                aria-label={`View: ${img.alt}`}
              >
                <div className={cn("relative w-full", i % 3 === 0 ? "aspect-[3/4]" : "aspect-square")}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1421]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium line-clamp-2 text-left">{img.alt}</p>
                    <p className="text-white/50 text-[10px] mt-0.5 text-left">{new Date(img.date).toLocaleDateString("en-CA", { month: "short", year: "numeric" })}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Upload CTA */}
          <div className="mt-16 text-center p-8 bg-[#1A2744] rounded-2xl">
            <h3 className="font-display text-3xl text-white mb-2">Have a Great Photo?</h3>
            <p className="text-white/60 text-sm mb-5">Share your matchday moments with the club and we may feature it in our gallery.</p>
            <a href="mailto:media@waterloocountyrugby.com" className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-bold rounded-xl transition-colors text-sm">
              <Mail size={15} /> Submit a Photo
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            tabIndex={0}
          >
            {/* Close */}
            <button onClick={closeLightbox} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Close lightbox">
              <X size={20} />
            </button>

            {/* Prev */}
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Previous image">
              <ChevronLeft size={24} />
            </button>

            {/* Image */}
            <motion.div
              className="relative max-w-5xl w-full max-h-[85vh] mx-12"
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[75vh]">
                <Image
                  src={filtered[lightboxIndex].src}
                  alt={filtered[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-white text-sm">{filtered[lightboxIndex].alt}</p>
                <p className="text-white/40 text-xs mt-1">{lightboxIndex + 1} / {filtered.length}</p>
              </div>
            </motion.div>

            {/* Next */}
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Next image">
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
