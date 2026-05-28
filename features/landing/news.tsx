'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NewsItem {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  categoryVariant: 'red' | 'gold' | 'green' | 'gray';
  delay: number;
}

const newsItems: NewsItem[] = [
  {
    title: '2026 Registration Details',
    excerpt:
      'Members must complete registration and payment through the youinsports platform for the 2026 season. Full details and step-by-step instructions are now available.',
    date: 'Mar 2026',
    category: 'Registration',
    categoryVariant: 'red',
    delay: 0,
  },
  {
    title: '2026 Junior & Minor Fees Explanation',
    excerpt:
      'A full breakdown of the fee structure for Junior and Minor divisions for the 2026 season is now available for families to review before registering.',
    date: 'Mar 2026',
    category: 'Fees',
    categoryVariant: 'gold',
    delay: 0.1,
  },
  {
    title: 'Higher Competition Pathway',
    excerpt:
      'Information about advanced competitive opportunities for players looking to progress beyond club level competition in the Rugby Ontario pathway is now available.',
    date: 'Mar 2026',
    category: 'Development',
    categoryVariant: 'green',
    delay: 0.2,
  },
  {
    title: '2026 Training Tee Design Contest',
    excerpt:
      'The community design competition for the 2026 training tee is now open. Submit your design and get your artwork on the pitch for the entire club.',
    date: 'Mar 2026',
    category: 'Community',
    categoryVariant: 'gray',
    delay: 0.3,
  },
];

export function LandingNews() {
  return (
    <section className="py-20 px-4 bg-background transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge variant="red" dot size="sm" className="mb-4">Club News</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest from Waterloo County Rugby
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Stay up to date with the latest announcements, registration details, and updates from the club.
          </p>
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {newsItems.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4 hover:border-red-600/40 transition-colors duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <Badge variant={item.categoryVariant} size="sm">{item.category}</Badge>
                <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-foreground font-semibold text-base mb-2 group-hover:text-red-400 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-red-500 text-xs font-medium">
                <span>Read more</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
