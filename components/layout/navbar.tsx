'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Teams', href: '#teams' },
  { label: 'Fixtures', href: '#fixtures' },
  { label: 'News', href: '#news' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isDashboard = pathname?.startsWith('/dashboard');
  const isAuth = pathname?.startsWith('/auth');
  if (isDashboard || isAuth) return null;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-border/50 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="h-9 w-9 rounded-lg bg-linear-to-br from-red-600 to-red-700 flex items-center justify-center shadow-lg group-hover:shadow-red-600/30 transition-shadow">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-sm text-foreground tracking-tight uppercase">
                Waterloo County
              </span>
              <span className="font-bold text-[10px] text-red-500 tracking-[0.15em] uppercase">
                Rugby Club
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : false;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium transition-colors rounded-md',
                    isActive
                      ? 'text-foreground bg-foreground/8'
                      : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="block h-0.5 mt-0.5 rounded-full bg-red-500" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side: ThemeToggle + Join CTA */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <div className="w-px h-5 bg-border mx-1" />
            <a
              href="https://playhq.com/ca/rugby-canada/register/21b765"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="sm">Join the Club</Button>
            </a>
          </div>

          {/* Mobile: ThemeToggle + hamburger */}
          <div className="md:hidden flex items-center gap-1.5">
            <ThemeToggle />
            <button
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border/50"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <a
                  href="https://playhq.com/ca/rugby-canada/register/21b765"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="primary" size="md" className="w-full">Join the Club</Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
