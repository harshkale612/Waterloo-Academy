import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { ThemeProvider } from '@/components/providers/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Waterloo County Rugby Club — Waterloo, Ontario',
  description:
    'Waterloo County Rugby Club — community rugby for all ages in Waterloo, Ontario. Senior Men, Senior Women, Junior and Minor divisions from U8 Flag Rugby to competitive Senior sides. Affiliated with Rugby Canada and Rugby Ontario.',
  keywords: 'Waterloo County Rugby, Waterloo rugby club, Rugby Ontario, rugby Waterloo Ontario, junior rugby Waterloo, senior rugby Ontario',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
