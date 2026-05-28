import { LandingHero } from '@/features/landing/hero';
import { LandingStats } from '@/features/landing/stats';
import { LandingFeatures } from '@/features/landing/features';
import { LandingTeams } from '@/features/landing/teams';
import { LandingFixtures } from '@/features/landing/fixtures';
import { LandingStandings } from '@/features/landing/standings';
import { LandingNews } from '@/features/landing/news';
import { LandingSponsors } from '@/features/landing/sponsors';
import { LandingTestimonials } from '@/features/landing/testimonials';
import { LandingCTA } from '@/features/landing/cta';
import { Footer } from '@/components/layout/footer';

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <LandingHero />
      <LandingStats />
      <LandingFeatures />
      <LandingTeams />
      <LandingFixtures />
      <LandingStandings />
      <LandingNews />
      <LandingSponsors />
      <LandingTestimonials />
      <LandingCTA />
      <Footer />
    </main>
  );
}
