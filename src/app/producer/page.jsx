"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Layers, Kanban, Store, Users, SlidersHorizontal, Crown,
  Bell, X, Heart, Check, Star, LogOut, Eye, Play, Bookmark, Dna,
  Clapperboard, TrendingUp, FileCheck, Rocket,
} from "lucide-react";
import { Logo, Toaster, StatCard, SectionHead, PlanGrid, MatchRing } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  SWIPE_SCRIPTS, PIPELINE_COLUMNS, MARKETPLACE, TALENT, PRODUCER_PLANS,
  GENRES, LANGUAGES, BUDGETS, OTT_PLATFORMS,
} from "@/lib/data";

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={17} /> },
  { key: "swipe", label: "DNA Swipe", icon: <Layers size={17} /> },
  { key: "pipeline", label: "Deal Pipeline", icon: <Kanban size={17} /> },
  { key: "marketplace", label: "Marketplace", icon: <Store size={17} /> },
  { key: "talent", label: "Talent Pool", icon: <Users size={17} /> },
  { key: "preferences", label: "Preferences", icon: <SlidersHorizontal size={17} /> },
  { key: "membership", label: "Membership", icon: <Crown size={17} /> },
];

export default function ProducerApp() {
  const [sec, setSec] = useState("dashboard");
  const { toast } = useStore();

  return (
    <main className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-t4/60 bg-ink2 p-4">
        <div className="mb-1 px-2 pt-1"><Logo /></div>
        <div className="mb-6 px-2 text-[10px] font-bold uppercase tracking-[0.25em] text-rose2">Producer Studio</div>
        <nav className="flex-1 space-y-1">
          {NAV.map((n) => (
            <button
              key={n.key}
              onClick={() => setSec(n.key)}
              className={`sidebar-item ${sec === n.key ? "sidebar-item-active" : ""}`}
            >
              {n.icon} {n.label}
            </button>
          ))}
        </nav>
        <Link href="/deal-demo" className="btn-primary w-full !py-3">
          <Play size={16} /> View Deal Demo
        </Link>
        <Link href="/" className="sidebar-item mt-3 !text-t3"><LogOut size={16} /> Sign out</Link>
      </aside>

      <div className="ml-60 flex-1">
        <header className="glass sticky top-0 z-30 flex items-center justify-end gap-4 px-8 py-3">
          <button className="relative text-t2 hover:text-t" onClick={() => toast("5 new 90%+ DNA matches this week", "info")}>
            <Bell size={19} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-p text-[9px] font-bold text-white">5</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-rose to-p font-display text-xs font-bold text-white">R</div>
            <div className="text-sm">
              <div className="font-semibold leading-tight">Rajesh Films</div>
              <div className="text-[11px] text-rose2">Studio Pro · Verified ✓</div>
            </div>
          </div>
        </header>

        <div className="px-8 py-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={sec}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25 }}
            >
              {sec === "dashboard" && <Dashboard onNav={setSec} toast={toast} />}
              {sec === "swipe" && <Swipe toast={toast} />}
              {sec === "pipeline" && <Pipeline />}
              {sec === "marketplace" && <ProdMarketplace toast={toast} />}
              {sec === "talent" && <Talent toast={toast} />}
              {sec === "preferences" && <Preferences toast={toast} />}
              {sec === "membership" && (
                <>
                  <SectionHead title="Studio Membership" sub="Scale your acquisition pipeline." />
                  <PlanGrid plans={PRODUCER_PLANS} onSelect={(p) => toast(`Razorpay checkout for ${p.name} would open here`, "info")} />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <Toaster />
    </main>
  );
}

/* ── DASHBOARD ─────────────────────────────────────────── */
function Dashboard({ onNav, toast }) {
  const top = SWIPE_SCRIPTS[0];
  return (
    <>
      <SectionHead
        title={<>Welcome, <span className="grad-text">Rajesh Films</span>! 🎬</>}
        sub="Your acquisition radar for the week."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard value="847" label="Matches This Month" icon={<Dna size={19} />} />
        <StatCard value="23" label="Review Queue" icon={<Eye size={19} />} delay={0.08} />
        <StatCard value="5" label="Active Deals" icon={<FileCheck size={19} />} delay={0.16} />
        <StatCard value="2" label="Greenlit Projects" icon={<Rocket size={19} />} delay={0.24} />
      </div>

      <h3 className="mb-4 mt-9 font-display text-lg font-bold">Recent Matches</h3>
      <div className="card card-active flex flex-wrap items-center gap-5 p-5">
        <span className="text-3xl">{top.emoji}</span>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-display text-lg font-bold">&lsquo;{top.title}&rsquo;</span>
            <span className="text-sm text-t2">— {top.writer}</span>
            <span className="badge badge-purple">{top.match}% DNA Match</span>
          </div>
          <div className="mt-1 text-xs text-t2">{top.genre.join(" · ")} | {top.budget} | {top.language} | {top.format}</div>
        </div>
        <div className="flex gap-2.5">
          <Link href="/deal-demo" className="btn-primary !px-4 !py-2 text-sm">Request Script</Link>
          <button className="btn-secondary !px-4 !py-2 text-sm" onClick={() => toast("Saved for later", "success")}><Bookmark size={14} /> Save</button>
          <button className="btn-ghost !px-4 !py-2 text-sm" onClick={() => toast("Passed", "info")}>Pass</button>
        </div>
      </div>

      <h3 className="mb-4 mt-9 font-display text-lg font-bold">Quick Actions</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Browse DNA Feed", <Layers key="i" size={20} />, "swipe"],
          ["View Deal Pipeline", <Kanban key="i" size={20} />, "pipeline"],
          ["Explore Talent Pool", <Users key="i" size={20} />, "talent"],
        ].map(([label, icon, target]) => (
          <button key={label} onClick={() => onNav(target)} className="card group flex items-center gap-4 p-5 text-left transition-all hover:-translate-y-1 hover:border-rose/50 hover:shadow-roseglow">
            <span className="rounded-xl bg-rose/15 p-3 text-rose2">{icon}</span>
            <span className="font-display font-bold">{label}</span>
          </button>
        ))}
      </div>

      <div className="card mt-9 flex flex-wrap items-center justify-around gap-6 p-6 text-center">
        {[["2,400+", "Writers"], ["312", "Verified Producers"], ["156", "Deals Closed"]].map(([v, l]) => (
          <div key={l}>
            <div className="font-display text-2xl font-bold grad-text">{v}</div>
            <div className="text-xs uppercase tracking-wider text-t2">{l}</div>
          </div>
        ))}
        <div className="flex items-center gap-2 text-sm text-t2"><TrendingUp size={16} className="text-green" /> Platform growing 18% MoM</div>
      </div>
    </>
  );
}

/* ── DNA SWIPE ─────────────────────────────────────────── */
function Swipe({ toast }) {
  const [idx, setIdx] = useState(0);
  const [exitDir, setExitDir] = useState(0);
  const { saveScript } = useStore();
  const deck = SWIPE_SCRIPTS;
  const card = deck[idx];

  const act = (dir, label) => {
    if (!card) return;
    setExitDir(dir);
    toast(label, dir > 0 ? "success" : "info");
    setTimeout(() => setIdx((i) => i + 1), 60);
  };

  return (
    <>
      <SectionHead title="DNA Swipe Feed" sub="Scripts matched to your acquisition preferences. Swipe right to request, left to pass." />
      <div className="relative mx-auto h-[430px] max-w-sm">
        <AnimatePresence>
          {deck.slice(idx, idx + 3).reverse().map((s, revI, arr) => {
            const isTop = revI === arr.length - 1;
            const depth = arr.length - 1 - revI;
            return (
              <motion.div
                key={s.id}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 110) act(1, `Script requested — deal flow starts with '${s.title}'`);
                  else if (info.offset.x < -110) act(-1, "Passed");
                }}
                initial={{ scale: 0.92, y: 24, opacity: 0 }}
                animate={{ scale: 1 - depth * 0.045, y: depth * 14, opacity: 1 }}
                exit={{ x: exitDir > 0 ? 420 : -420, rotate: exitDir > 0 ? 18 : -18, opacity: 0, transition: { duration: 0.32 } }}
                className={`card absolute inset-0 flex flex-col p-6 ${isTop ? "cursor-grab active:cursor-grabbing card-active" : ""}`}
                style={{ zIndex: 10 - depth }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{s.emoji}</span>
                  <MatchRing value={s.match} size={52} />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold">{s.title}</h3>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <span className="badge badge-purple">{s.format}</span>
                  {s.genre.map((g) => <span key={g} className="badge badge-gray">{g}</span>)}
                  <span className="badge badge-gold">{s.budget}</span>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-t2">&ldquo;{s.logline}&rdquo;</p>
                <div className="mt-4 flex items-center gap-2.5 border-t border-t4/60 pt-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-grad text-xs font-bold text-white">{s.writer[0]}</div>
                  <div>
                    <div className="text-sm font-semibold">{s.writer}</div>
                    <div className="text-[11px] text-p2">{s.writerPlan} ⭐</div>
                  </div>
                  <span className="badge badge-teal ml-auto">NDA Protected</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {!card && (
          <div className="card flex h-full flex-col items-center justify-center gap-3 text-center">
            <span className="text-4xl">🧬</span>
            <h3 className="font-display text-lg font-bold">Feed complete!</h3>
            <p className="max-w-xs text-sm text-t2">New DNA matches land daily based on your preferences.</p>
            <button className="btn-secondary mt-2 text-sm" onClick={() => setIdx(0)}>Replay Feed</button>
          </div>
        )}
      </div>

      {card && (
        <div className="mt-6 flex items-center justify-center gap-5">
          <button onClick={() => act(-1, "Passed")} className="flex h-14 w-14 items-center justify-center rounded-full border border-red/40 bg-red/10 text-red transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(248,113,113,.4)]">
            <X size={22} />
          </button>
          <button
            onClick={() => { saveScript(card); toast(`'${card.title}' saved for later`, "success"); setIdx((i) => i + 1); }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-all hover:scale-110"
          >
            <Heart size={19} />
          </button>
          <button onClick={() => act(1, `Script requested — deal flow starts with '${card.title}'`)} className="flex h-14 w-14 items-center justify-center rounded-full border border-green/40 bg-green/10 text-green transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(74,222,128,.4)]">
            <Check size={22} />
          </button>
        </div>
      )}
    </>
  );
}

/* ── PIPELINE ──────────────────────────────────────────── */
function Pipeline() {
  const tones = {
    gold: "border-gold/40 text-gold",
    sky: "border-sky/40 text-sky",
    teal: "border-teal/40 text-teal",
    purple: "border-p/40 text-p2",
    green: "border-green/40 text-green",
  };
  return (
    <>
      <SectionHead title="Deal Pipeline" sub="Every active deal across the 13-stage protected flow. Amber = your move, purple = writer's move." />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_COLUMNS.map((col) => (
          <div key={col.key} className="w-60 shrink-0">
            <div className={`mb-3 rounded-lg border bg-ink2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider ${tones[col.tone]}`}>
              {col.label} <span className="float-right opacity-70">{col.deals.length}</span>
            </div>
            <div className="space-y-3">
              {col.deals.map((deal) => (
                <Link key={deal.title} href="/deal-demo" className="card block p-4 transition-all hover:-translate-y-0.5 hover:border-p/60 hover:shadow-glow">
                  <div className="font-display text-sm font-bold">🎬 {deal.title}</div>
                  <div className="mt-1 text-xs text-t2">{deal.writer}</div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-t3">
                    <span>Updated {deal.updated}</span>
                    <span className="font-bold text-p2">View →</span>
                  </div>
                </Link>
              ))}
              {col.deals.length === 0 && (
                <div className="rounded-xl border border-dashed border-t4 p-4 text-center text-xs text-t4">No deals here</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── MARKETPLACE (producer view) ───────────────────────── */
function ProdMarketplace({ toast }) {
  return (
    <>
      <SectionHead title="Marketplace" sub="Browse listed scripts. Every request is NDA-gated automatically." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {MARKETPLACE.map((m, i) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-roseglow">
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-ink3 to-ink4 text-5xl transition-transform duration-300 group-hover:scale-110">{m.emoji}</div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="badge badge-rose">{m.genre}</span>
                <span className="flex items-center gap-1 text-xs text-gold"><Star size={12} fill="currentColor" /> {m.rating}</span>
              </div>
              <h3 className="mt-2.5 font-display font-bold">{m.title}</h3>
              <div className="mt-0.5 text-xs text-t3">by {m.writer} · <span className="text-teal">{m.badge}</span></div>
              <button className="btn-primary mt-4 w-full !py-2 text-sm" onClick={() => toast(`NDA-gated request sent for '${m.title}'`, "success")}>Request with NDA</button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* ── TALENT POOL ───────────────────────────────────────── */
function Talent({ toast }) {
  return (
    <>
      <SectionHead title="Talent Pool" sub="Writers you've engaged, saved, or closed deals with." />
      <div className="mb-5 flex flex-wrap gap-3">
        {["Genre", "Experience", "Budget Fit", "Status"].map((f) => (
          <select key={f} className="input !w-auto text-sm"><option>{f}: All</option></select>
        ))}
      </div>
      <div className="space-y-3">
        {TALENT.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="card flex flex-wrap items-center gap-5 p-5 transition-all hover:border-rose/50">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-grad font-display font-bold text-white">{t.name[0]}</div>
            <div className="min-w-44 flex-1">
              <div className="flex items-center gap-2.5">
                <span className="font-display font-bold">{t.name}</span>
                <span className="badge badge-purple">{t.plan} ⭐</span>
              </div>
              <div className="mt-0.5 text-xs text-t2">{t.genres} · {t.years} yrs · {t.city}</div>
            </div>
            <div className="flex gap-6 text-center text-sm">
              <div><div className="font-display font-bold">{t.projects}</div><div className="text-[10px] uppercase text-t3">Projects</div></div>
              <div><div className="font-display font-bold text-green">{t.deals}</div><div className="text-[10px] uppercase text-t3">Deals</div></div>
            </div>
            <div className="flex gap-2">
              <button className="btn-ghost !px-4 !py-2 text-xs" onClick={() => toast(`${t.name}'s profile (demo)`, "info")}>View Profile</button>
              <button className="btn-secondary !px-4 !py-2 text-xs" onClick={() => toast(`New pitch requested from ${t.name}`, "success")}>Request New Pitch</button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* ── PREFERENCES ───────────────────────────────────────── */
function Preferences({ toast }) {
  const [prefs, setPrefs] = useState({
    genres: ["Thriller", "Drama", "Action"],
    languages: ["Hindi", "English"],
    budgets: ["₹5-20 Cr", "₹20-100 Cr"],
    formats: ["Feature Film", "Web Series"],
    ott: ["Netflix", "Amazon", "Theatrical"],
    stage: "Final draft",
    notif: "Real-time",
  });
  const toggle = (k, v) =>
    setPrefs((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));

  const Chips = ({ label, k, options, single }) => (
    <div>
      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-t2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = single ? prefs[k] === o : prefs[k].includes(o);
          return (
            <button
              key={o}
              onClick={() => (single ? setPrefs({ ...prefs, [k]: o }) : toggle(k, o))}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
                active ? "border-rose bg-rose/15 text-rose2" : "border-t4 text-t2 hover:border-t3"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <SectionHead title="Acquisition Preferences" sub="These parameters ARE the DNA algorithm — every pitch is scored against them." />
      <div className="card space-y-6 p-7">
        <Chips label="Preferred Genres" k="genres" options={GENRES} />
        <Chips label="Budget Range" k="budgets" options={BUDGETS} />
        <Chips label="Languages" k="languages" options={LANGUAGES} />
        <Chips label="Formats" k="formats" options={["Feature Film", "Web Series", "Short Film", "Documentary"]} />
        <Chips label="Target Platform" k="ott" options={OTT_PLATFORMS} />
        <Chips label="Script Stage" k="stage" options={["Concept", "Draft", "Final draft", "Produced"]} single />
        <Chips label="Notification Frequency" k="notif" options={["Real-time", "Daily digest", "Weekly"]} single />
        <button className="btn-primary" onClick={() => toast("Preferences saved — DNA feed recalibrating", "success")}>Save Preferences</button>
      </div>
    </>
  );
}
