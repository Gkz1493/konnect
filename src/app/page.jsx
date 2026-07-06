"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ShieldCheck, Dna, Handshake, ArrowRight, Play, UserPlus,
  Upload, Sparkles, Trophy, Lock, Clock, FileSignature,
} from "lucide-react";
import { Logo, PlanGrid } from "@/components/ui";
import { WRITER_PLANS } from "@/lib/data";

const Hero3D = dynamic(() => import("@/components/Hero3D"), { ssr: false });

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const FEATURES = [
  {
    icon: <ShieldCheck size={26} />,
    title: "NDA First",
    desc: "Two-level NDA gating before anyone reads a word. Synopsis after NDA-1, full script after NDA-2. Every signature hashed and timestamped.",
    tone: "text-p2",
  },
  {
    icon: <Dna size={26} />,
    title: "DNA Match",
    desc: "Our algorithm scores every pitch against every verified producer's acquisition profile — genre, budget, language and format — surfacing only 70%+ matches.",
    tone: "text-rose2",
  },
  {
    icon: <Handshake size={26} />,
    title: "Deal Flow",
    desc: "A structured 13-stage pipeline from first request to greenlight: time-boxed decisions, scheduled narrations, and platform-generated agreements.",
    tone: "text-teal",
  },
];

const STEPS = [
  { n: "01", icon: <UserPlus size={20} />, title: "Create Profile", desc: "Verify your identity, declare your craft, set your genres and budget band." },
  { n: "02", icon: <Upload size={20} />, title: "Upload Pitch", desc: "9-panel guided pitch builder. Your script is encrypted and NDA-protected from second one." },
  { n: "03", icon: <Sparkles size={20} />, title: "Get Matched", desc: "DNA algorithm puts your pitch in front of producers actively acquiring your kind of story." },
  { n: "04", icon: <Trophy size={20} />, title: "Close Deal", desc: "13-stage protected deal flow ends in a signed, timestamped agreement — and a greenlight." },
];

const OTT = ["Netflix", "Prime Video", "ZEE5", "SonyLIV", "Disney+ Hotstar"];

export default function Landing() {
  return (
    <main className="relative">
      {/* ── NAV ── */}
      <nav className="glass fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <Logo />
          <div className="hidden items-center gap-8 text-sm text-t2 md:flex">
            <a href="#features" className="transition-colors hover:text-t">Features</a>
            <a href="#how" className="transition-colors hover:text-t">How It Works</a>
            <a href="#pricing" className="transition-colors hover:text-t">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth?tab=login" className="btn-ghost !px-4 !py-2 text-sm">Login</Link>
            <Link href="/auth?tab=signup" className="btn-primary !px-4 !py-2 text-sm">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="relative flex min-h-screen items-center overflow-hidden">
        <Hero3D />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="badge badge-purple mb-6">
              <Lock size={11} /> India&apos;s NDA-First Script Marketplace
            </span>
            <h1 className="font-display font-bold leading-[1.05]" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}>
              Where Great Stories Find Their{" "}
              <span className="grad-text">Perfect Producer</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-t2">
              Pitch your screenplay, series or documentary to verified producers
              and OTT acquisition teams — legally protected, algorithm-matched,
              and never stolen.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/auth?tab=signup" className="btn-primary !px-7 !py-3.5 text-base">
                Get Started — Free <ArrowRight size={18} />
              </Link>
              <Link href="/deal-demo" className="btn-ghost !px-7 !py-3.5 text-base">
                <Play size={17} /> View Deal Demo
              </Link>
            </div>
            <div className="mt-14">
              <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-t3">
                Trusted by acquisition teams at
              </div>
              <div className="flex flex-wrap gap-3">
                {OTT.map((o, i) => (
                  <motion.div
                    key={o}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="glass rounded-xl px-5 py-2.5 font-display text-sm font-semibold text-t2 shadow-glow"
                  >
                    {o}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ── STATS BAND ── */}
      <section className="border-y border-t4/50 bg-ink2/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {[
            ["2,400+", "Writers Onboarded"],
            ["312", "Verified Producers"],
            ["156", "Deals Closed"],
            ["₹48 Cr+", "Deal Value Facilitated"],
          ].map(([v, l], i) => (
            <motion.div key={l} {...fadeUp} transition={{ delay: i * 0.08 }} className="text-center">
              <div className="font-display text-3xl font-bold grad-text">{v}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-t2">{l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <motion.div {...fadeUp} className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Built for <span className="grad-text">protection</span>, tuned for{" "}
            <span className="grad-text-teal">discovery</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-t2">
            KONNECT removes gatekeeping for writers and noise for producers — with legal armour on every interaction.
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              {...fadeUp}
              transition={{ delay: i * 0.12 }}
              className="card group p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-p/60 hover:shadow-glow"
            >
              <div className={`mb-4 inline-flex rounded-xl bg-ink3 p-3 ${f.tone}`}>{f.icon}</div>
              <h3 className="font-display text-xl font-bold">{f.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-t2">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── DEAL FLOW TEASER (interactive infographic) ── */}
      <section className="border-y border-t4/50 bg-ink2/40">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <motion.div {...fadeUp} className="mb-10 text-center">
            <span className="badge badge-gold mb-4"><Clock size={11} /> Time-boxed &amp; enforced</span>
            <h2 className="font-display text-3xl font-bold md:text-4xl">The 13-Stage Protected Deal Flow</h2>
            <p className="mx-auto mt-3 max-w-lg text-t2">
              Every deal moves through the same auditable pipeline. Hover a stage to see who acts.
            </p>
          </motion.div>
          <motion.div {...fadeUp} className="flex flex-wrap items-center justify-center gap-2">
            {[
              ["Request", "P"], ["NDA-1", "P"], ["Countersign", "W"], ["Synopsis", "P"],
              ["7-Day Wait", "S"], ["Decision", "P"], ["Narration Req", "P"], ["Confirm", "W"],
              ["NDA-2", "B"], ["Scheduled", "S"], ["Evaluation", "P"], ["Agreement", "B"], ["GREENLIT", "🚀"],
            ].map(([label, actor], i) => (
              <div key={label} className="group relative">
                <div
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 group-hover:-translate-y-1 ${
                    actor === "🚀"
                      ? "border-green/40 bg-green/10 text-green group-hover:shadow-[0_0_20px_rgba(74,222,128,.35)]"
                      : actor === "W"
                      ? "border-p/40 bg-p/10 text-p2 group-hover:shadow-glow"
                      : actor === "P"
                      ? "border-rose/40 bg-rose/10 text-rose2 group-hover:shadow-[0_0_20px_rgba(232,121,160,.35)]"
                      : actor === "B"
                      ? "border-green/30 bg-green/5 text-green/90"
                      : "border-gold/40 bg-gold/10 text-gold"
                  }`}
                >
                  <span className="font-display">{i + 1}</span> {label}
                </div>
                <div className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink4 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-t2 opacity-0 shadow-card transition-opacity group-hover:opacity-100">
                  {actor === "W" ? "✍️ Writer acts" : actor === "P" ? "🎬 Producer acts" : actor === "B" ? "🤝 Both sign" : actor === "🚀" ? "🎉 Deal complete" : "🤖 Platform enforced"}
                </div>
              </div>
            ))}
          </motion.div>
          <motion.div {...fadeUp} className="mt-10 text-center">
            <Link href="/deal-demo" className="btn-secondary">
              <FileSignature size={16} /> Run the full 13-stage simulation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-24">
        <motion.h2 {...fadeUp} className="mb-12 text-center font-display text-3xl font-bold md:text-4xl">
          From first draft to <span className="grad-text">greenlight</span> in four moves
        </motion.h2>
        <div className="grid gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div key={s.n} {...fadeUp} transition={{ delay: i * 0.12 }} className="relative">
              <div className="card h-full p-6 transition-all hover:border-p/50">
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-flex rounded-lg bg-p/15 p-2.5 text-p2">{s.icon}</span>
                  <span className="font-display text-3xl font-bold text-ink5">{s.n}</span>
                </div>
                <h3 className="font-display text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-t2">{s.desc}</p>
              </div>
              {i < 3 && (
                <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 text-t3 md:block">
                  <ArrowRight size={18} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="mx-auto max-w-5xl px-6 pb-24">
        <motion.div {...fadeUp} className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Simple, writer-first pricing</h2>
          <p className="mt-3 text-t2">Producers have separate studio plans inside the app.</p>
        </motion.div>
        <motion.div {...fadeUp}>
          <PlanGrid plans={WRITER_PLANS} />
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <motion.div
          {...fadeUp}
          className="card animate-pulse-glow relative overflow-hidden p-12 text-center"
          style={{ background: "linear-gradient(135deg, rgba(108,99,255,.15), rgba(232,121,160,.12))" }}
        >
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Your story deserves a <span className="grad-text">protected pitch</span>
          </h2>
          <p className="mx-auto mt-3 max-w-md text-t2">
            Join 2,400+ writers already matched with verified producers across India.
          </p>
          <Link href="/auth?tab=signup" className="btn-primary mx-auto mt-8 !px-8 !py-3.5 text-base">
            Create Free Account <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-t4/50 bg-ink2/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-t3">
          <Logo size="text-base" />
          <div>© 2026 KONNECT · Made for India&apos;s storytellers · NDA-first, always.</div>
        </div>
      </footer>
    </main>
  );
}
