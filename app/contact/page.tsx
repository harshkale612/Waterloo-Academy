"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, ArrowRight } from "lucide-react";
import { FacebookIcon, InstagramIcon, TwitterXIcon, YoutubeIcon } from "@/components/shared/social-icons";
import { toast } from "sonner";
import { PageHero } from "@/components/shared/page-hero";

const subjects = ["General Enquiry", "Membership", "Sponsorship", "Media", "Safeguarding", "Junior Enquiry", "Other"];

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get("honeypot")) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    toast.success("Message sent! We'll get back to you within 2 business days.");
    (e.target as HTMLFormElement).reset();
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    "@id": "https://www.waterloocountyrugby.com/contact#localbusiness",
    name: "Waterloo County Rugby Club",
    address: { "@type": "PostalAddress", streetAddress: "80 Bluevale Street North", addressLocality: "Waterloo", addressRegion: "ON", postalCode: "N2J 3R5", addressCountry: "CA" },
    geo: { "@type": "GeoCoordinates", latitude: 43.475193, longitude: -80.5000229 },
    sameAs: [
      "https://www.facebook.com/WaterlooCountyRugby",
      "https://www.instagram.com/waterloocountyrugby/",
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        title="Get in Touch"
        subtitle="We'd love to hear from you. Questions about membership, sponsorship, or just want to say hello?"
        breadcrumbs={[{ label: "Contact" }]}
        image="https://images.pexels.com/photos/3639065/pexels-photo-3639065.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="bg-[#F8F6F0] dark:bg-[#0D1421] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Contact form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-4xl text-[#1A2744] dark:text-white mb-2">Send Us a Message</h2>
              <p className="text-sm text-[#5A5A5A] dark:text-white/55 mb-8">We reply within 2 business days.</p>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                aria-label="Contact form"
                noValidate
              >
                {/* Honeypot */}
                <input type="text" name="honeypot" className="hidden" aria-hidden="true" tabIndex={-1} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="full_name" className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">Full Name <span className="text-[#C62828]">*</span></label>
                    <input id="full_name" name="full_name" type="text" required aria-required="true" className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CE] dark:border-white/10 bg-white dark:bg-[#1A2744] text-[#1A2744] dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="contact_email" className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">Email <span className="text-[#C62828]">*</span></label>
                    <input id="contact_email" name="email" type="email" required aria-required="true" className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CE] dark:border-white/10 bg-white dark:bg-[#1A2744] text-[#1A2744] dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact_phone" className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">Phone (optional)</label>
                    <input id="contact_phone" name="phone" type="tel" className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CE] dark:border-white/10 bg-white dark:bg-[#1A2744] text-[#1A2744] dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">Subject <span className="text-[#C62828]">*</span></label>
                    <select id="subject" name="subject" required aria-required="true" className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CE] dark:border-white/10 bg-white dark:bg-[#1A2744] text-[#1A2744] dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors">
                      <option value="">Select subject</option>
                      {subjects.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">Message <span className="text-[#C62828]">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    minLength={20}
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CE] dark:border-white/10 bg-white dark:bg-[#1A2744] text-[#1A2744] dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors resize-none"
                    placeholder="How can we help? (minimum 20 characters)"
                  />
                </div>

                <p className="text-xs text-[#5A5A5A] dark:text-white/40">Fields marked <span className="text-[#C62828]">*</span> are required.</p>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-[#1A2744] dark:bg-[#D4AF37] hover:bg-[#243560] dark:hover:bg-[#E8CC6A] text-white dark:text-[#1A2744] font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 text-base"
                >
                  {submitting ? "Sending…" : <><span>Send Message</span> <ArrowRight size={18} /></>}
                </button>
              </form>
            </motion.div>

            {/* Contact details */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-white dark:bg-[#1A2744] rounded-2xl p-6 border border-[#EEE9DF] dark:border-white/5">
                <h3 className="font-display text-2xl text-[#1A2744] dark:text-white mb-5">Club Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm">
                    <MapPin size={16} className="text-[#D4AF37] mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-[#1A2744] dark:text-white">Club Address</div>
                      <div className="text-[#5A5A5A] dark:text-white/55">80 Bluevale Street North<br />Waterloo, ON N2J 3R5<br />Canada</div>
                      <a
                        href="https://maps.google.com/maps?q=43.475193,-80.5000229"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#D4AF37] hover:text-[#1A2744] dark:hover:text-white mt-1 inline-block transition-colors"
                      >
                        View on Google Maps →
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Clock size={16} className="text-[#D4AF37] mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-[#1A2744] dark:text-white">Registration</div>
                      <a
                        href="https://www.playhq.com/ca/rugby-canada/register/21b765"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#5A5A5A] dark:text-white/55 hover:text-[#D4AF37] transition-colors"
                      >
                        Register 2026 via PlayHQ →
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-[#EEE9DF] dark:border-white/10">
                  <div className="font-semibold text-[#1A2744] dark:text-white text-sm mb-3">Affiliations</div>
                  <div className="space-y-1.5 text-sm text-[#5A5A5A] dark:text-white/55">
                    <div><a href="http://www.rugbyontario.com/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">Rugby Ontario</a></div>
                    <div><a href="http://www.rugbycanada.ca" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors">Rugby Canada</a></div>
                    <div>Southwest Ontario Rugby Union (SWORU)</div>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-[#EEE9DF] dark:border-white/10">
                  <div className="font-semibold text-[#1A2744] dark:text-white text-sm mb-3">Follow Us</div>
                  <div className="flex gap-3">
                    {[
                      { Icon: FacebookIcon, label: "Facebook", href: "https://www.facebook.com/WaterlooCountyRugby" },
                      { Icon: InstagramIcon, label: "Instagram", href: "https://www.instagram.com/waterloocountyrugby/" },
                      { Icon: TwitterXIcon, label: "X / Twitter", href: "https://twitter.com" },
                      { Icon: YoutubeIcon, label: "YouTube", href: "https://youtube.com" },
                    ].map(({ Icon, label, href }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-9 h-9 rounded-full bg-[#F8F6F0] dark:bg-[#243560] flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#1A2744] text-[#5A5A5A] dark:text-white/50 transition-all">
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Club committee contacts */}
              <div className="bg-white dark:bg-[#1A2744] rounded-2xl p-6 border border-[#EEE9DF] dark:border-white/5">
                <h3 className="font-display text-2xl text-[#1A2744] dark:text-white mb-4">Club Committee</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { role: "President", name: "Josh Windsor" },
                    { role: "Secretary", name: "Stu Bailey" },
                    { role: "Director of Operations & Finance", name: "Eric Ciezar" },
                    { role: "Director of Junior Rugby", name: "Trevor Williams" },
                  ].map(({ role, name }) => (
                    <div key={role}>
                      <div className="font-semibold text-[#1A2744] dark:text-white text-xs uppercase tracking-wide mb-0.5">{role}</div>
                      <div className="text-[#5A5A5A] dark:text-white/55">{name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <h3 className="font-display text-3xl text-[#1A2744] dark:text-white mb-4">Find Us</h3>
            <div className="rounded-2xl overflow-hidden border border-[#EEE9DF] dark:border-white/10 h-80">
              <iframe
                src="https://maps.google.com/maps?q=43.475193,-80.5000229&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="80 Bluevale Street North, Waterloo, ON — Waterloo County RFC"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
