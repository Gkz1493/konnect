"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Star, ShieldCheck } from "lucide-react";
import { Logo, Toaster } from "@/components/ui";
import { useStore } from "@/lib/store";
import { WRITER_TYPES, GENRES, LANGUAGES, OTT_PLATFORMS, BUDGETS } from "@/lib/data";

// Phases: wtype → profile (3 steps) → badge
export default function Onboarding() {
  const router = useRouter();
  const { user, setWriterType, setUser, toast } = useStore();
  const [phase, setPhase] = useState("wtype");
  const [wtype, setWtype] = useState(null);
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: user.name || "",
    bio: "",
    genres: [],
    languages: [],
    exp: "",
    ott: [],
    budget: "",
  });

  const toggle = (key, val) =>
    setProfile((p) => ({
      ...p,
      [key]: p[key].includes(val) ? p[key].filter((x) => x !== val) : [...p[key], val],
    }));

  const Chip = ({ active, onClick, children, rose }) => (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
        active
          ? rose
            ? "border-rose bg-rose/15 text-rose2"
            : "border-p bg-p/15 text-p2 shadow-glow"
          : "border-t4 text-t2 hover:border-t3 hover:text-t"
      }`}
    >
      {children}
    </button>
  );

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-p/15 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal/10 blur-[140px]" />

      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center"><Logo /></div>

        <AnimatePresence mode="wait">
          {/* ── WRITER TYPE ── */}
          {phase === "wtype" && (
            <motion.div key="wtype" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}>
              <h1 className="text-center font-display text-3xl font-bold">
                What kind of stories do you tell?
              </h1>
              <p className="mt-2 text-center text-t2">This tunes your DNA matches from day one.</p>
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
                {WRITER_TYPES.map((w) => (
                  <button
                    key={w.key}
                    onClick={() => setWtype(w.key)}
                    className={`card flex flex-col items-center gap-2 p-6 transition-all hover:-translate-y-1 ${
                      wtype === w.key ? "card-active" : "hover:border-t3"
                    }`}
                  >
                    <span className="text-3xl">{w.emoji}</span>
                    <span className="font-display font-bold">{w.label}</span>
                    <span className="text-xs text-t3">{w.desc}</span>
                  </button>
                ))}
              </div>
              <button
                className="btn-primary mx-auto mt-8 flex !px-8"
                disabled={!wtype}
                onClick={() => {
                  setWriterType(wtype);
                  setPhase("profile");
                }}
              >
                Continue <ArrowRight size={17} />
              </button>
            </motion.div>
          )}

          {/* ── PROFILE (3 steps) ── */}
          {phase === "profile" && (
            <motion.div key="profile" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} className="card p-8">
              <h1 className="font-display text-2xl font-bold">Let&apos;s set up your profile</h1>
              <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3].map((n) => (
                  <div key={n} className={`h-1.5 flex-1 rounded-full transition-all ${n <= step ? "bg-grad" : "bg-ink4"}`} />
                ))}
                <span className="ml-2 text-xs font-bold text-t2">Step {step} of 3</span>
              </div>

              <div className="mt-7 min-h-[260px]">
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-p2">Basics</div>
                    <input className="input" placeholder="Display Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
                    <textarea className="input min-h-[110px] resize-none" placeholder="Short bio — what do you write, what have you made?" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
                    <button className="btn-ghost text-sm">Upload Profile Photo</button>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-5">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-p2">Craft</div>
                    <div>
                      <div className="mb-2 text-sm text-t2">Primary Genres</div>
                      <div className="flex flex-wrap gap-2">
                        {GENRES.map((g) => <Chip key={g} active={profile.genres.includes(g)} onClick={() => toggle("genres", g)}>{g}</Chip>)}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 text-sm text-t2">Languages</div>
                      <div className="flex flex-wrap gap-2">
                        {LANGUAGES.map((l) => <Chip key={l} active={profile.languages.includes(l)} onClick={() => toggle("languages", l)}>{l}</Chip>)}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 text-sm text-t2">Experience</div>
                      <div className="flex flex-wrap gap-2">
                        {["Beginner", "Intermediate", "Pro"].map((x) => (
                          <Chip key={x} active={profile.exp === x} onClick={() => setProfile({ ...profile, exp: x })}>{x}</Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-5">
                    <div className="text-xs font-bold uppercase tracking-[0.2em] text-p2">Reach</div>
                    <div>
                      <div className="mb-2 text-sm text-t2">Target OTT / Platform</div>
                      <div className="flex flex-wrap gap-2">
                        {OTT_PLATFORMS.map((o) => <Chip key={o} rose active={profile.ott.includes(o)} onClick={() => toggle("ott", o)}>{o}</Chip>)}
                      </div>
                    </div>
                    <div>
                      <div className="mb-2 text-sm text-t2">Typical Pitch Budget</div>
                      <div className="flex flex-wrap gap-2">
                        {BUDGETS.map((b) => (
                          <Chip key={b} active={profile.budget === b} onClick={() => setProfile({ ...profile, budget: b })}>{b}</Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <button className="btn-ghost" onClick={() => (step === 1 ? setPhase("wtype") : setStep(step - 1))}>
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  className="btn-primary"
                  onClick={() => {
                    if (step < 3) return setStep(step + 1);
                    if (profile.name) setUser({ name: profile.name });
                    toast("Profile complete!", "success");
                    setPhase("badge");
                  }}
                >
                  {step < 3 ? "Continue" : "Complete Profile"} <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── BADGE REVEAL ── */}
          {phase === "badge" && (
            <motion.div key="badge" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl font-bold"
              >
                Welcome to KONNECT, <span className="grad-text">{profile.name || user.name || "Storyteller"}</span>!
              </motion.h1>

              <motion.div
                initial={{ scale: 0.3, opacity: 0, rotateY: 180 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                transition={{ delay: 0.35, duration: 0.9, type: "spring", bounce: 0.45 }}
                className="animate-pulse-glow mx-auto mt-10 flex h-64 w-52 flex-col items-center justify-center gap-3 rounded-3xl border-2 border-p/60 bg-gradient-to-b from-ink3 to-ink2"
              >
                <Logo size="text-lg" />
                <div className="font-display text-2xl font-bold grad-text">MEMBER</div>
                <div className="badge badge-gold"><Star size={11} /> Verified</div>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-t2">
                  <ShieldCheck size={13} className="text-teal" /> NDA-First Protected
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="mx-auto mt-8 max-w-sm text-t2"
              >
                Your story is now protected by KONNECT&apos;s NDA-First framework.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="btn-primary mx-auto mt-7 flex !px-8 !py-3.5"
                onClick={() => router.push("/writer")}
              >
                Explore Your Dashboard <ArrowRight size={18} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Toaster />
    </main>
  );
}
