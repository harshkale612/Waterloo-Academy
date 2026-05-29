import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/data";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.category === article.category && a.slug !== slug).slice(0, 3);
  const index = articles.findIndex((a) => a.slug === slug);
  const prev = articles[index + 1];
  const next = articles[index - 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: { "@type": "ImageObject", url: article.image, width: 1200, height: 630 },
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Person", name: article.author },
    publisher: { "@id": "https://www.waterloocountyrugby.com/#organization" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.waterloocountyrugby.com/news/${article.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero image */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden pt-16">
        <Image src={article.image} alt={article.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1421]/90 via-[#0D1421]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 pb-10">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/50 flex-wrap">
              <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li><Link href="/news" className="hover:text-[#D4AF37] transition-colors">News</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/70" aria-current="page">{article.title}</li>
            </ol>
          </nav>
          <Badge className="bg-[#D4AF37] text-[#1A2744] border-0 mb-3">{article.category}</Badge>
          <h1 className="font-display text-4xl sm:text-6xl text-white leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-white/50 text-sm">
            <span className="flex items-center gap-1"><Calendar size={13} />{new Date(article.date).toLocaleDateString("en-CA", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><Clock size={13} />{article.readTime} min read</span>
            <span>By {article.author}</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="bg-white dark:bg-[#1A2744] min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <Link href="/news" className="inline-flex items-center gap-2 text-sm text-[#5A5A5A] dark:text-white/50 hover:text-[#D4AF37] mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to News
          </Link>

          {/* Body text */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {article.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-[#1C1C1C] dark:text-white/80 leading-[1.85] mb-6 text-base sm:text-lg">{para}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-8 pt-8 border-t border-[#EEE9DF] dark:border-white/10">
            <div className="flex flex-wrap items-center gap-2">
              <Tag size={14} className="text-[#5A5A5A] dark:text-white/40" />
              {article.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-[#F8F6F0] dark:bg-[#243560] text-[#5A5A5A] dark:text-white/60 text-xs rounded-full font-medium">{tag}</span>
              ))}
            </div>
          </div>

          {/* Share */}
          <div className="mt-6 flex items-center gap-3">
            <Share2 size={14} className="text-[#5A5A5A] dark:text-white/40" />
            <span className="text-sm text-[#5A5A5A] dark:text-white/50">Share:</span>
            {[
              { label: "X / Twitter", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://www.waterloocountyrugby.com/news/${article.slug}`)}` },
              { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.waterloocountyrugby.com/news/${article.slug}`)}` },
            ].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="px-3 py-1 text-xs font-semibold border border-[#DDD8CE] dark:border-white/10 rounded-full hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors text-[#5A5A5A] dark:text-white/50">
                {label}
              </a>
            ))}
          </div>

          {/* Prev / Next */}
          {(prev || next) && (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-[#EEE9DF] dark:border-white/10">
              {prev && (
                <Link href={`/news/${prev.slug}`} className="group p-4 bg-[#F8F6F0] dark:bg-[#243560] rounded-xl hover:bg-[#EEE9DF] dark:hover:bg-[#1A2744] transition-colors">
                  <div className="text-xs text-[#5A5A5A] dark:text-white/40 mb-1">← Previous</div>
                  <div className="font-semibold text-[#1A2744] dark:text-white group-hover:text-[#D4AF37] transition-colors text-sm line-clamp-2">{prev.title}</div>
                </Link>
              )}
              {next && (
                <Link href={`/news/${next.slug}`} className="group p-4 bg-[#F8F6F0] dark:bg-[#243560] rounded-xl hover:bg-[#EEE9DF] dark:hover:bg-[#1A2744] transition-colors sm:text-right">
                  <div className="text-xs text-[#5A5A5A] dark:text-white/40 mb-1">Next →</div>
                  <div className="font-semibold text-[#1A2744] dark:text-white group-hover:text-[#D4AF37] transition-colors text-sm line-clamp-2">{next.title}</div>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="py-16 bg-[#F8F6F0] dark:bg-[#0D1421]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl text-[#1A2744] dark:text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((a) => (
                <Link key={a.slug} href={`/news/${a.slug}`} className="group bg-white dark:bg-[#1A2744] rounded-2xl overflow-hidden border border-[#EEE9DF] dark:border-white/5 hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden">
                    <Image src={a.image} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <Badge className="bg-[#D4AF37]/15 text-[#1A2744] dark:text-[#D4AF37] border-0 text-xs mb-2">{a.category}</Badge>
                    <h3 className="font-semibold text-[#1A2744] dark:text-white line-clamp-2 group-hover:text-[#D4AF37] transition-colors text-sm">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
