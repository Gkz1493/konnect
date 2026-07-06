"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Film, Dna, Radar, Store, Users, Swords, Crown,
  Plus, Bell, Eye, Pencil, BarChart3, Trash2, Star, Send, ShieldCheck,
  Trophy, LogOut, Flame, IndianRupee, Target, Clapperboard,
} from "lucide-react";
import { Logo, Toaster, StatCard, SectionHead, Progress, MatchRing, PlanGrid, Empty } from "@/components/ui";
import { useStore } from "@/lib/store";
import {
  PRODUCERS, PITCH_TRACKER, MARKETPLACE, ROOMS, WRITER_PLANS,
  GENRES, BUDGETS, LANGUAGES, dnaMatch,
} from "@/lib/data";

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={17} /> },
  { key: "pitches", label: "My Pitches", icon: <Film size={17} /> },
  { key: "dna", label: "DNA Match", icon: <Dna size={17} /> },
  { key: "tracker", label: "Pitch Tracker", icon: <Radar size={17} /> },
  { key: "marketplace", label: "Marketplace", icon: <Store size={17} /> },
  { key: "rooms", label: "Writers Room", icon: <Users size={17} /> },
  { key: "battle", label: "Battle Room", icon: <Swords size={17} /> },
  { key: "membership", label: "Membership", icon: <Crown size={17} /> },
];

const STATUS_BADGE = {
  draft: "badge-gray",
  submitted: "badge-sky",
  under_review: "badge-gold",
  nda: "badge-purple",
  narration: "badge-teal",
  offer: "badge-green",
  declined: "badge-red",
};

export default function WriterApp() {
  const [sec, setSec] = useState("dashboard");
  const { user, myPitches, toast } = useStore();
  const name = user.name || "Rohan Mehta";

  return (
    <main className="flex min-h-screen">
      {/* ── SIDEBAR ── */}
      <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col border-r border-t4/60 bg-ink2 p-4">
        <div className="mb-6 px-2 pt-1"><Logo /></div>
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
        <Link href="/pitch" className="btn-primary w-full !py-3">
          <Plus size={17} /> New Pitch
        </Link>
        <Link href="/" className="sidebar-item mt-3 !text-t3">
          <LogOut size={16} /> Sign out
        </Link>
      </aside>

      {/* ── CONTENT ── */}
      <div className="ml-60 flex-1">
        {/* topbar */}
        <header className="glass sticky top-0 z-30 flex items-center justify-end gap-4 px-8 py-3">
          <button className="relative text-t2 transition-colors hover:text-t" onClick={() => toast("3 producer requests waiting", "info")}>
            <Bell size={19} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[9px] font-bold text-white">3</span>
          </button>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-grad font-display text-xs font-bold text-white">
              {name.slice(0, 1)}
            </div>
            <div className="text-sm">
              <div className="font-semibold leading-tight">{name}</div>
              <div className="text-[11px] text-p2">Pro Writer ⭐</div>
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
              {sec === "dashboard" && <Dashboard name={name} pitches={myPitches} toast={toast} onNav={setSec} />}
              {sec === "pitches" && <MyPitches pitches={myPitches} toast={toast} />}
              {sec === "dna" && <DnaMatch toast={toast} />}
              {sec === "tracker" && <Tracker />}
              {sec === "marketplace" && <Marketplace toast={toast} />}
              {sec === "rooms" && <Rooms toast={toast} />}
              {sec === "battle" && <Battle toast={toast} />}
              {sec === "membership" && (
                <>
                  <SectionHead title="Membership" sub="Upgrade to pitch more, match more, and enter the Battle Room." />
                  <PlanGrid plans={WRITER_PLANS} onSelect={(p) => toast(`Razorpay checkout for ${p.name} would open here`, "info")} />
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
function Dashboard({ name, pitches, toast, onNav }) {
  return (
    <>
      <SectionHead
        title={<>Welcome back, <span className="grad-text">{name.split(" ")[0]}</span>! <Flame className="inline text-gold" size={22} /></>}
        sub="Here's how your stories are travelling this week."
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard value="12" label="Pitches Sent" icon={<Send size={19} />} />
        <StatCard value="3" label="Active Deals" icon={<Clapperboard size={19} />} delay={0.08} />
        <StatCard value="94%" label="Match Rate" icon={<Target size={19} />} delay={0.16} />
        <StatCard value="₹2.4L" label="Earned" icon={<IndianRupee size={19} />} delay={0.24} />
      </div>

      <h3 className="mb-4 mt-9 font-display text-lg font-bold">My Projects</h3>
      <div className="space-y-3">
        {pitches.slice(0, 3).map((p) => (
          <div key={p.id} className="card flex items-center gap-5 p-5 transition-all hover:border-p/50">
            <span className="text-2xl">{p.emoji}</span>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="font-display font-bold">{p.title}</span>
                <span className={`badge ${STATUS_BADGE[p.status]}`}>{p.statusLabel}</span>
              </div>
              <div className="mt-1 text-xs text-t2">
                {p.genre.join(", ")} · {p.viewCount} producer views
              </div>
              <div className="mt-2.5 max-w-md"><Progress value={p.progress} /></div>
            </div>
            <div className="font-display text-sm font-bold text-p2">{p.progress}%</div>
          </div>
        ))}
      </div>

      <h3 className="mb-4 mt-9 font-display text-lg font-bold">Producer Requests</h3>
      <div className="card card-active flex flex-wrap items-center gap-4 p-5">
        <span className="text-2xl">🎬</span>
        <div className="flex-1">
          <div className="font-semibold">Rajesh Films wants to read <span className="text-p2">&lsquo;Bollywood Noir&rsquo;</span></div>
          <div className="mt-0.5 text-xs text-t2">NDA-1 already signed by producer · awaiting your countersign</div>
        </div>
        <div className="flex gap-2.5">
          <Link href="/deal-demo" className="btn-primary !px-4 !py-2 text-sm"><ShieldCheck size={15} /> Accept with NDA</Link>
          <button className="btn-ghost !px-4 !py-2 text-sm" onClick={() => onNav("tracker")}>View Request</button>
          <button className="btn-danger !px-4 !py-2 text-sm" onClick={() => toast("Request declined", "info")}>Decline</button>
        </div>
      </div>
    </>
  );
}

/* ── MY PITCHES ────────────────────────────────────────── */
function MyPitches({ pitches, toast }) {
  return (
    <>
      <SectionHead
        title="My Pitches"
        sub="Every story you've protected on KONNECT."
        action={<Link href="/pitch" className="btn-primary !px-4 !py-2 text-sm"><Plus size={15} /> New Pitch</Link>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {pitches.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card group p-5 transition-all hover:-translate-y-1 hover:border-p/50 hover:shadow-glow"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{p.emoji}</span>
              <span className={`badge ${STATUS_BADGE[p.status]}`}>{p.statusLabel}</span>
            </div>
            <h3 className="mt-3 font-display text-lg font-bold">{p.title}</h3>
            <div className="mt-1 text-xs text-t2">{p.format} · {p.genre.join(", ")}</div>
            <div className="mt-3 flex items-center gap-4 text-xs text-t3">
              <span className="flex items-center gap-1"><Eye size={13} /> {p.viewCount} views</span>
              <span>Submitted {p.submittedAt}</span>
            </div>
            {(p.ipCertificate || p.ndaSigned) && (
              <div className="mt-3 flex gap-2">
                {p.ipCertificate && <span className="badge badge-teal"><ShieldCheck size={11} /> Verified IP</span>}
                {p.ndaSigned && <span className="badge badge-purple">NDA Protected</span>}
              </div>
            )}
            <div className="mt-4 flex gap-2 border-t border-t4/60 pt-4">
              <button className="btn-ghost flex-1 !px-2 !py-1.5 text-xs" onClick={() => toast("Edit pitch (demo)", "info")}><Pencil size={13} /> Edit</button>
              <button className="btn-ghost flex-1 !px-2 !py-1.5 text-xs" onClick={() => toast(`${p.viewCount} views · ${Math.max(1, Math.round(p.viewCount * 0.6))} full reads`, "info")}><BarChart3 size={13} /> Analytics</button>
              <button className="btn-danger !px-3 !py-1.5 text-xs" onClick={() => toast("Pitch withdrawn (demo)", "error")}><Trash2 size={13} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* ── DNA MATCH ─────────────────────────────────────────── */
function DnaMatch({ toast }) {
  const [filters, setFilters] = useState({ genre: "All", budget: "All", lang: "All" });
  const samplePitch = { genre: [filters.genre === "All" ? "Thriller" : filters.genre], budget: filters.budget === "All" ? "₹5-20 Cr" : filters.budget, language: filters.lang === "All" ? "Hindi" : filters.lang, format: "Feature Film" };

  const scored = PRODUCERS.map((pr) => ({ ...pr, match: dnaMatch(samplePitch, pr) }))
    .sort((a, b) => b.match - a.match);

  const Select = ({ label, value, onChange, options }) => (
    <div>
      <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-t2">{label}</label>
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)}>
        <option>All</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

  return (
    <>
      <SectionHead title="DNA Match" sub="Producers whose acquisition profile matches your stories — live-scored." />
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="card h-fit w-full space-y-4 p-5 lg:w-60 lg:shrink-0">
          <Select label="Genre" value={filters.genre} onChange={(v) => setFilters({ ...filters, genre: v })} options={GENRES} />
          <Select label="Budget" value={filters.budget} onChange={(v) => setFilters({ ...filters, budget: v })} options={BUDGETS} />
          <Select label="Language" value={filters.lang} onChange={(v) => setFilters({ ...filters, lang: v })} options={LANGUAGES} />
          <button className="btn-secondary w-full text-sm" onClick={() => toast("Filters applied — scores recomputed", "success")}>Apply Filters</button>
        </div>
        <div className="grid flex-1 gap-4 md:grid-cols-2">
          {scored.map((pr, i) => (
            <motion.div
              key={pr.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
              className="card p-5 transition-all hover:border-p/50 hover:shadow-glow"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-2xl">{pr.emoji}</div>
                  <h3 className="mt-2 font-display font-bold">{pr.companyName}</h3>
                  <div className="text-xs text-t2">{pr.contactName} {pr.verified && <span className="text-teal">· Verified ✓</span>}</div>
                </div>
                <MatchRing value={pr.match} />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {pr.genres.map((g) => <span key={g} className="badge badge-gray">{g}</span>)}
              </div>
              <div className="mt-2 text-xs text-t3">{pr.budgetRange.join(" · ")} · {pr.languages.join(", ")}</div>
              <button className="btn-primary mt-4 w-full !py-2 text-sm" onClick={() => toast(`Pitch sent to ${pr.companyName} — deal flow begins on their request`, "success")}>
                <Send size={14} /> Send Pitch
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── TRACKER ───────────────────────────────────────────── */
function Tracker() {
  const toneMap = { purple: "badge-purple", sky: "badge-sky", teal: "badge-teal", gold: "badge-gold" };
  return (
    <>
      <SectionHead title="Pitch Tracker" sub="Live status of every pitch in a producer's hands." />
      <div className="card overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-t4/60 text-[11px] uppercase tracking-wider text-t3">
              <th className="px-5 py-3.5">Script Title</th>
              <th className="px-5 py-3.5">Producer</th>
              <th className="px-5 py-3.5">Stage</th>
              <th className="px-5 py-3.5">Last Update</th>
              <th className="px-5 py-3.5"></th>
            </tr>
          </thead>
          <tbody>
            {PITCH_TRACKER.map((row, i) => (
              <tr key={i} className="border-b border-t4/40 transition-colors last:border-0 hover:bg-ink3/50">
                <td className="px-5 py-4 font-semibold">{row.title}</td>
                <td className="px-5 py-4 text-t2">{row.producer}</td>
                <td className="px-5 py-4"><span className={`badge ${toneMap[row.tone]}`}>{row.stage}</span></td>
                <td className="px-5 py-4 text-t3">{row.updated}</td>
                <td className="px-5 py-4 text-right">
                  <Link href="/deal-demo" className="text-xs font-bold text-p2 hover:underline">View Deal →</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ── MARKETPLACE ───────────────────────────────────────── */
function Marketplace({ toast }) {
  return (
    <>
      <SectionHead
        title="Marketplace"
        sub="List approved scripts for direct discovery — or browse what's selling."
        action={<button className="btn-secondary !px-4 !py-2 text-sm" onClick={() => toast("Listing wizard (demo)", "info")}><Plus size={15} /> List a Script</button>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {MARKETPLACE.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-glow"
          >
            <div className="flex h-28 items-center justify-center bg-gradient-to-br from-ink3 to-ink4 text-5xl transition-transform duration-300 group-hover:scale-110">
              {m.emoji}
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="badge badge-purple">{m.genre}</span>
                <span className="flex items-center gap-1 text-xs text-gold"><Star size={12} fill="currentColor" /> {m.rating}</span>
              </div>
              <h3 className="mt-2.5 font-display font-bold">{m.title}</h3>
              <div className="mt-0.5 text-xs text-t3">by {m.writer} · <span className="text-teal">{m.badge}</span></div>
              <button className="btn-secondary mt-4 w-full !py-2 text-sm" onClick={() => toast(`Access request sent for '${m.title}'`, "success")}>
                {m.price}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* ── WRITERS ROOM ──────────────────────────────────────── */
function Rooms({ toast }) {
  return (
    <>
      <SectionHead
        title="Writers Room"
        sub="Invite-only collaboration spaces. IP splits are declared on creation and locked."
        action={<button className="btn-primary !px-4 !py-2 text-sm" onClick={() => toast("Room created — invite link copied", "success")}><Plus size={15} /> Create Room</button>}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {ROOMS.map((r) => (
          <div key={r.id} className="card p-6 transition-all hover:border-p/50">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{r.emoji}</span>
              <div>
                <h3 className="font-display text-lg font-bold">{r.name}</h3>
                <div className="text-xs text-t2">{r.members} members · {r.scripts} shared scripts · active {r.active}</div>
              </div>
            </div>
            <div className="mt-4 flex -space-x-2">
              {Array.from({ length: r.members }).map((_, i) => (
                <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink2 bg-grad text-[10px] font-bold text-white">
                  {"RSAP"[i % 4]}
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-2">
              <button className="btn-primary flex-1 !py-2 text-sm" onClick={() => toast("Room workspace (chat, shared editor, version history) — demo", "info")}>Enter Room</button>
              <button className="btn-ghost !py-2 text-sm" onClick={() => toast("Invite link copied", "success")}>Invite</button>
              <button className="btn-danger !py-2 text-sm" onClick={() => toast("You left the room", "info")}>Leave</button>
            </div>
          </div>
        ))}
        <Empty
          emoji="🔑"
          title="Rooms are invite-only"
          sub="Create a room, declare IP ownership splits, and co-write with locked-in protection."
          action={<button className="btn-secondary text-sm" onClick={() => toast("Room created — invite link copied", "success")}><Plus size={15} /> Create Room</button>}
        />
      </div>
    </>
  );
}

/* ── BATTLE ROOM ───────────────────────────────────────── */
function Battle({ toast }) {
  const TOTAL = 167; // 02:47
  const [left, setLeft] = useState(TOTAL);
  const [votesA, setVotesA] = useState(60);
  const [voted, setVoted] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (left <= 0) { setDone(true); return; }
    const id = setInterval(() => setLeft((l) => l - 1), 1000);
    return () => clearInterval(id);
  }, [left]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const winner = votesA >= 50 ? "A" : "B";

  const vote = (side) => {
    if (voted || done) return;
    setVoted(side);
    setVotesA((v) => (side === "A" ? Math.min(v + 4, 97) : Math.max(v - 4, 3)));
    toast(`Vote cast for Script ${side}!`, "success");
  };

  const ScriptCard = ({ side, text, pct }) => (
    <div className={`card p-6 transition-all ${done && winner === side ? "card-active" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="badge badge-purple">Script {side} · Anonymous</span>
        {done && winner === side && <span className="badge badge-green"><Trophy size={11} /> Battle Proven</span>}
      </div>
      <p className="mt-4 font-display text-lg leading-relaxed">&ldquo;{text}&rdquo;</p>
      <div className="mt-5">
        <div className="mb-1.5 flex justify-between text-xs text-t2">
          <span>Live votes</span><span className="font-bold text-t">{pct}%</span>
        </div>
        <Progress value={pct} tone={side === "A" ? "purple" : "teal"} />
      </div>
      <button
        className={`mt-4 w-full !py-2.5 text-sm ${voted === side ? "btn-secondary" : "btn-primary"}`}
        onClick={() => vote(side)}
        disabled={done || !!voted}
      >
        {voted === side ? "✓ Your Vote" : `Vote for ${side}`}
      </button>
    </div>
  );

  return (
    <>
      <SectionHead
        title={<>🎤 Live Battle Room</>}
        sub="Anonymous head-to-head pitching. 5-person jury. Winner earns the Battle Proven badge."
        action={
          <div className={`card px-5 py-2.5 font-display text-xl font-bold ${left < 30 ? "text-red" : "text-gold"}`}>
            ⏱ {done ? "ENDED" : `${mm}:${ss}`}
          </div>
        }
      />
      {done && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="card card-active mb-5 p-5 text-center">
          <span className="font-display text-lg font-bold grad-text">🏆 Script {winner} wins the battle!</span>
          <div className="mt-1 text-sm text-t2">The winner&apos;s pitch card now carries the Battle Proven badge.</div>
        </motion.div>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        <ScriptCard side="A" pct={votesA} text="A disgraced detective hunts a killer who only strikes during film premieres — and every clue points to a script he rejected years ago." />
        <ScriptCard side="B" pct={100 - votesA} text="In 2047, a Mumbai cop discovers time can be sold — and the city's poorest are auctioning their futures to survive." />
      </div>
      <div className="card mt-5 flex flex-wrap items-center gap-5 p-5">
        <div className="text-xs font-bold uppercase tracking-wider text-t2">Jury Panel</div>
        <div className="flex gap-2">
          {["J1", "J2", "J3", "J4", "J5"].map((j) => (
            <div key={j} className="flex h-9 w-9 items-center justify-center rounded-full bg-ink4 text-xs font-bold text-p2 ring-2 ring-green/50">{j}</div>
          ))}
        </div>
        <div className="flex-1 text-sm italic text-t2">💬 &ldquo;Script A has a stronger hook — that premiere-night device is fresh.&rdquo;</div>
      </div>
    </>
  );
}
