"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeader } from "@/components/shared/section-header";
import { membershipTiers, testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

const faqs = [
  { q: "Do I need rugby experience to join?", a: "No experience needed at all. We welcome complete beginners across every age group, from U8 Flag through to Senior. Our coaches are experienced at introducing new players to the game." },
  { q: "What age groups do you have?", a: "We field 12 teams across all ages: U8 Flag, U10 Flag (non-contact), U12 Contact, U14, U16, U18 (Boys & Girls in each), plus County Senior Men, County Senior Women, and a Mixed Ability / Social team for adults." },
  { q: "How do I register for 2026?", a: "All registration and payment is handled online through the PlayHQ platform. Visit the homepage and click the County Registration and Payment Link, or go to playhq.com/ca/rugby-canada/register/21b765. Every member must register each season — returning players are not rolled over automatically." },
  { q: "What kit is included?", a: "Junior registrations (U8–U18) include a Gilbert Canada rugby kit (rugby shorts + training tee) in the registration fee. Kit is ordered in bulk on May 1st, June 12th, and June 26th — register early for the fastest delivery." },
  { q: "What are the 2026 fees?", a: "U6/U8/U10 Flag: $292 | U12 Contact: $347.54 | U14 Contact: $427 | U16 Contact: $470 | U18 Contact: $470. Fees cover Rugby Canada insurance, Rugby Ontario registration, SWORU High-Performance levy, and club costs including athletic therapy and equipment. Senior fees are communicated separately." },
  { q: "Is there a pathway to higher competition for junior players?", a: "Yes! The club works closely with SWORU (Southwest Ontario Rugby Union) and the Rugby Ontario development pathway. Top players can progress through SWORU provincial teams, the Ontario Blues Development Academy, Team Ontario, and ultimately Rugby Canada selection." },
  { q: "What is the U14 combined programme with Guelph?", a: "Due to enrollment numbers in 2026, the U14 programme is run as a combined squad with Guelph RFC. This gives players more competition and development opportunities, and both clubs manage the logistics jointly." },
  { q: "Who do I contact with questions?", a: "For junior rugby enquiries, contact Trevor Williams (Director of Junior Rugby). For general membership and club matters, reach out through the Contact page on this site. You can also reach us via Instagram @waterloocountyrugby or Facebook at WaterlooCountyRugby." },
];

const steps = [
  { step: "01", title: "Register via PlayHQ", description: "Complete registration & payment at playhq.com/ca/rugby-canada/register/21b765." },
  { step: "02", title: "Confirmation", description: "You'll receive a PlayHQ confirmation and welcome details from the club." },
  { step: "03", title: "First Training", description: "Come down to 80 Bluevale St N and meet your team. All welcome!" },
  { step: "04", title: "Kit Delivery", description: "Your Gilbert Canada kit arrives on the next bulk order date." },
];

export default function JoinPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedTier, setSelectedTier] = useState("adult-player");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get("honeypot")) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success("Registration received! We'll be in touch within 2 business days.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <PageHero
        title="Join the Club"
        subtitle="Start your rugby journey with Waterloo County RFC. All ages, all abilities welcome."
        breadcrumbs={[{ label: "Join" }]}
        image="https://images.pexels.com/photos/20399915/pexels-photo-20399915.jpeg?auto=compress&cs=tinysrgb&w=1920"
      />

      <div className="bg-[#F8F6F0] dark:bg-[#0D1421] min-h-screen">

        {/* MEMBERSHIP TIERS */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="2026/27 Season" title="Membership Options" subtitle="Choose the membership that best suits you. Early bird discount available until June 30th." centered />
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {membershipTiers.map((tier, i) => (
                <motion.div
                  key={tier.id}
                  className={cn(
                    "rounded-2xl p-6 border-2 relative cursor-pointer transition-all",
                    tier.recommended
                      ? "bg-[#1A2744] border-[#D4AF37] text-white shadow-2xl shadow-[#D4AF37]/10"
                      : selectedTier === tier.id
                      ? "bg-white dark:bg-[#1A2744] border-[#1A2744] dark:border-[#D4AF37]"
                      : "bg-white dark:bg-[#1A2744] border-[#DDD8CE] dark:border-white/10 hover:border-[#1A2744] dark:hover:border-white/30"
                  )}
                  onClick={() => setSelectedTier(tier.id)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#1A2744] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}
                  <div className={cn("text-xs font-semibold uppercase tracking-widest mb-1", tier.recommended ? "text-[#D4AF37]" : "text-[#D4AF37]")}>{tier.subtitle}</div>
                  <h3 className={cn("font-display text-3xl mb-3", tier.recommended ? "text-white" : "text-[#1A2744] dark:text-white")}>{tier.name}</h3>
                  <div className={cn("mb-5", tier.recommended ? "text-[#D4AF37]" : "text-[#1A2744] dark:text-[#D4AF37]")}>
                    <span className="font-display text-5xl">${tier.price}</span>
                    <span className="text-sm opacity-70">/season</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {tier.perks.map((perk) => (
                      <li key={perk} className={cn("flex items-start gap-2 text-sm", tier.recommended ? "text-white/85" : "text-[#5A5A5A] dark:text-white/65")}>
                        <Check size={14} className={cn("mt-0.5 shrink-0", tier.recommended ? "text-[#D4AF37]" : "text-[#2E7D32]")} />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => { setSelectedTier(tier.id); document.getElementById("signup-form")?.scrollIntoView({ behavior: "smooth" }); }}
                    className={cn(
                      "w-full py-2.5 rounded-xl font-bold text-sm transition-colors",
                      tier.recommended
                        ? "bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744]"
                        : "bg-[#1A2744] dark:bg-[#243560] hover:bg-[#243560] text-white"
                    )}
                  >
                    {tier.cta}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ONBOARDING STEPS */}
        <section className="py-14 bg-white dark:bg-[#1A2744]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="What to Expect" title="Getting Started" centered />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/15 flex items-center justify-center mx-auto mb-4">
                    <span className="font-display text-2xl text-[#D4AF37]">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-[#1A2744] dark:text-white mb-1">{step.title}</h3>
                  <p className="text-[#5A5A5A] dark:text-white/55 text-sm">{step.description}</p>
                  {i < steps.length - 1 && <div className="hidden lg:block absolute" />}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SIGNUP FORM */}
        <section id="signup-form" className="py-16 bg-[#F8F6F0] dark:bg-[#0D1421]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <SectionHeader eyebrow="Start Today" title="Membership Registration" centered />
            <motion.form
              className="mt-10 bg-white dark:bg-[#1A2744] rounded-2xl p-8 border border-[#EEE9DF] dark:border-white/5 shadow-sm"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              aria-label="Membership registration form"
            >
              {/* Honeypot */}
              <input type="text" name="honeypot" className="hidden" aria-hidden="true" tabIndex={-1} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "first_name", label: "First Name", type: "text", required: true, half: true },
                  { id: "last_name", label: "Last Name", type: "text", required: true, half: true },
                  { id: "email", label: "Email Address", type: "email", required: true, half: false },
                  { id: "phone", label: "Phone Number", type: "tel", required: false, half: true },
                  { id: "dob", label: "Date of Birth", type: "date", required: true, half: true },
                ].map(({ id, label, type, required, half }) => (
                  <div key={id} className={half ? "" : "sm:col-span-2"}>
                    <label htmlFor={id} className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">
                      {label} {required && <span className="text-[#C62828]" aria-hidden="true">*</span>}
                    </label>
                    <input
                      id={id}
                      name={id}
                      type={type}
                      required={required}
                      aria-required={required}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CE] dark:border-white/10 bg-[#F8F6F0] dark:bg-[#243560] text-[#1A2744] dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">Address</label>
                  <input id="address" name="address" type="text" className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CE] dark:border-white/10 bg-[#F8F6F0] dark:bg-[#243560] text-[#1A2744] dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>

                <div>
                  <label htmlFor="membership_type" className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">Membership Type <span className="text-[#C62828]">*</span></label>
                  <select id="membership_type" name="membership_type" required value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)} className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CE] dark:border-white/10 bg-[#F8F6F0] dark:bg-[#243560] text-[#1A2744] dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors">
                    {membershipTiers.map((t) => <option key={t.id} value={t.id}>{t.name} — ${t.price}/season</option>)}
                  </select>
                </div>

                <div>
                  <label htmlFor="team_preference" className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">Team Preference</label>
                  <select id="team_preference" name="team_preference" className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CE] dark:border-white/10 bg-[#F8F6F0] dark:bg-[#243560] text-[#1A2744] dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors">
                    <option value="">Not sure yet</option>
                    <option>Men&apos;s 1st XV</option>
                    <option>Men&apos;s 2nd XV</option>
                    <option>Women&apos;s 1st XV</option>
                    <option>Under 18s</option>
                    <option>Under 14s</option>
                    <option>Minis (U6–U12)</option>
                    <option>Social / Non-playing</option>
                  </select>
                </div>

                <div>
                  <fieldset>
                    <legend className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">Playing or Social?</legend>
                    <div className="flex gap-4">
                      {["Playing", "Social"].map((opt) => (
                        <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm text-[#5A5A5A] dark:text-white/60">
                          <input type="radio" name="player_type" value={opt.toLowerCase()} defaultChecked={opt === "Playing"} className="accent-[#D4AF37]" />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>

                <div>
                  <label htmlFor="hear_about" className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">How did you hear about us?</label>
                  <select id="hear_about" name="hear_about" className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CE] dark:border-white/10 bg-[#F8F6F0] dark:bg-[#243560] text-[#1A2744] dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors">
                    <option value="">Select one</option>
                    <option>Friend / Family</option>
                    <option>Social Media</option>
                    <option>Google / Online Search</option>
                    <option>Community Event</option>
                    <option>School / University</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="emergency_contact" className="block text-sm font-semibold text-[#1A2744] dark:text-white mb-1.5">Emergency Contact (Name &amp; Phone) <span className="text-[#C62828]">*</span></label>
                  <input id="emergency_contact" name="emergency_contact" type="text" required aria-required="true" placeholder="e.g. Jane Doe — (519) 123-4567" className="w-full px-4 py-2.5 rounded-xl border border-[#DDD8CE] dark:border-white/10 bg-[#F8F6F0] dark:bg-[#243560] text-[#1A2744] dark:text-white text-sm focus:outline-none focus:border-[#D4AF37] transition-colors" />
                </div>
              </div>

              <p className="mt-4 text-xs text-[#5A5A5A] dark:text-white/40">Fields marked <span className="text-[#C62828]">*</span> are required. We&apos;ll only use your data in line with our Privacy Policy.</p>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full py-3 bg-[#D4AF37] hover:bg-[#E8CC6A] text-[#1A2744] font-bold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-base"
              >
                {submitting ? "Submitting…" : <><span>Complete Registration</span> <ArrowRight size={18} /></>}
              </button>
            </motion.form>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 bg-white dark:bg-[#1A2744]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Member Stories" title="What Our Members Say" centered />
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  className="bg-[#F8F6F0] dark:bg-[#243560] rounded-2xl p-6 border border-[#EEE9DF] dark:border-white/5"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-[#1C1C1C] dark:text-white/80 text-sm leading-relaxed mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative shrink-0">
                      <Image src={t.image} alt={t.name} fill className="object-cover" sizes="40px" loading="lazy" />
                    </div>
                    <div>
                      <div className="font-semibold text-[#1A2744] dark:text-white text-sm">{t.name}</div>
                      <div className="text-xs text-[#D4AF37]">{t.role}</div>
                      <div className="text-xs text-[#5A5A5A] dark:text-white/40">{t.years}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-[#F8F6F0] dark:bg-[#0D1421]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <SectionHeader eyebrow="Got Questions?" title="Frequently Asked Questions" centered />
            <div className="mt-10 space-y-2">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white dark:bg-[#1A2744] border border-[#EEE9DF] dark:border-white/5 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-[#1A2744] dark:text-white hover:text-[#D4AF37] transition-colors"
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.2 }} className="px-5 pb-5 text-sm text-[#5A5A5A] dark:text-white/60 leading-relaxed">
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
