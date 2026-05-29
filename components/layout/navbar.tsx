"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "About", href: "/about" },
  {
    label: "Teams",
    href: "/teams",
    children: [
      { label: "Men's 1st XV", href: "/teams/mens-1st" },
      { label: "Men's 2nd XV", href: "/teams/mens-2nd" },
      { label: "Women's 1st XV", href: "/teams/womens-1st" },
      { label: "Under 18s", href: "/teams/under-18" },
      { label: "Under 14s", href: "/teams/under-14" },
      { label: "Minis (U6–U12)", href: "/teams/minis" },
    ],
  },
  { label: "Fixtures", href: "/fixtures" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [teamsOpen, setTeamsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const navBase = cn(
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    scrolled || !isHome
      ? "bg-[#1A2744]/98 backdrop-blur-md shadow-lg"
      : "bg-transparent"
  );

  return (
    <header role="banner" className={navBase}>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <nav
        aria-label="Primary navigation"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1A2744] font-display text-lg font-bold group-hover:scale-105 transition-transform">
            WC
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-white text-xl leading-none block">WATERLOO COUNTY</span>
            <span className="text-[#D4AF37] text-xs tracking-widest uppercase leading-none">Rugby Football Club</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1" role="list">
          {navLinks.map((link) =>
            link.children ? (
              <li key={link.label} className="relative">
                <button
                  onClick={() => setTeamsOpen((o) => !o)}
                  onBlur={() => setTimeout(() => setTeamsOpen(false), 150)}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90 hover:text-[#D4AF37] transition-colors rounded",
                    pathname.startsWith(link.href) && "text-[#D4AF37]"
                  )}
                  aria-expanded={teamsOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown size={14} className={cn("transition-transform", teamsOpen && "rotate-180")} />
                </button>
                <AnimatePresence>
                  {teamsOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-[#1A2744] border border-[#243560] rounded-lg shadow-xl overflow-hidden z-50"
                      role="menu"
                    >
                      <li>
                        <Link
                          href="/teams"
                          className="block px-4 py-2 text-sm text-white/80 hover:bg-[#243560] hover:text-[#D4AF37] transition-colors"
                          role="menuitem"
                          onClick={() => setTeamsOpen(false)}
                        >
                          All Teams
                        </Link>
                      </li>
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-sm text-white/80 hover:bg-[#243560] hover:text-[#D4AF37] transition-colors"
                            role="menuitem"
                            onClick={() => setTeamsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium text-white/90 hover:text-[#D4AF37] transition-colors rounded relative group",
                    pathname === link.href && "text-[#D4AF37]"
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#D4AF37] rounded-full"
                    />
                  )}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDark}
            className="p-2 text-white/70 hover:text-[#D4AF37] transition-colors"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link href="/join" className="hidden lg:block">
            <Button size="sm" className="bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-semibold px-5">
              Join Now
            </Button>
          </Link>

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className="lg:hidden p-2 text-white/90 hover:text-[#D4AF37] transition-colors"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </SheetTrigger>
            <SheetContent
              id="mobile-nav"
              side="right"
              className="w-[300px] bg-[#1A2744] border-[#243560] p-0"
            >
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-[#243560]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1A2744] font-display text-lg font-bold">WC</div>
                    <div>
                      <div className="font-display text-white text-lg leading-none">WATERLOO COUNTY</div>
                      <div className="text-[#D4AF37] text-xs tracking-widest uppercase">Rugby FC</div>
                    </div>
                  </div>
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                  <ul className="space-y-1">
                    <li>
                      <Link href="/" className={cn("block px-4 py-3 text-white/80 hover:text-[#D4AF37] hover:bg-[#243560] rounded-lg transition-colors", pathname === "/" && "text-[#D4AF37] bg-[#243560]")} onClick={() => setMobileOpen(false)}>Home</Link>
                    </li>
                    {navLinks.map((link) => (
                      link.children ? (
                        <li key={link.label}>
                          <div className="px-4 py-3 text-white/60 text-xs uppercase tracking-widest font-semibold">{link.label}</div>
                          <ul className="space-y-1 pl-4">
                            <li><Link href="/teams" className="block px-4 py-2 text-white/70 hover:text-[#D4AF37] hover:bg-[#243560] rounded-lg text-sm transition-colors" onClick={() => setMobileOpen(false)}>All Teams</Link></li>
                            {link.children.map((child) => (
                              <li key={child.href}>
                                <Link href={child.href} className="block px-4 py-2 text-white/70 hover:text-[#D4AF37] hover:bg-[#243560] rounded-lg text-sm transition-colors" onClick={() => setMobileOpen(false)}>{child.label}</Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ) : (
                        <li key={link.href}>
                          <Link href={link.href} className={cn("block px-4 py-3 text-white/80 hover:text-[#D4AF37] hover:bg-[#243560] rounded-lg transition-colors", pathname === link.href && "text-[#D4AF37] bg-[#243560]")} onClick={() => setMobileOpen(false)}>{link.label}</Link>
                        </li>
                      )
                    ))}
                  </ul>
                </nav>
                <div className="p-4 border-t border-[#243560]">
                  <Link href="/join" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-bold">Join the Club</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
