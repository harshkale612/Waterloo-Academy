"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Calendar, Newspaper, Phone, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#1A2744] flex items-center justify-center px-4 pt-16">
      <div className="max-w-2xl w-full text-center">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-20 h-20 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🏉</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="font-display text-[120px] text-[#D4AF37]/20 leading-none select-none">404</div>
          <h1 className="font-display text-5xl sm:text-6xl text-white -mt-8 mb-4">
            Looks Like a Knock-on…
          </h1>
          <p className="text-white/60 text-lg mb-8">
            That page has been knocked into touch. Let&apos;s get you back on the pitch.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/"><button className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-bold rounded-xl transition-colors"><Home size={16} /> Home</button></Link>
          <Link href="/fixtures"><button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors border border-white/20"><Calendar size={16} /> Fixtures</button></Link>
          <Link href="/news"><button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors border border-white/20"><Newspaper size={16} /> News</button></Link>
          <Link href="/contact"><button className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl transition-colors border border-white/20"><Phone size={16} /> Contact</button></Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Search the site…"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
