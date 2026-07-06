"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Upload, ShieldCheck, FileText, CheckCircle2,
  Sparkles, Lock, PenLine,
} from "lucide-react";
import { Logo, Toaster, MatchRing } from "@/components/ui";
import { useStore } from "@/lib/store";
import { GENRES, OTT_PLATFORMS, BUDGETS, PRODUCERS, generateHash } from "@/lib/data";

const PANELS = ["Basics", "Story", "Characters", "Budget", "Uploads", "Market", "Writer Info", "NDA", "Review"];
const THEMES = ["Redemption", "Family", "Identity", "Power", "Love", "Survival", "Justice", "Ambition"];
const TONES = ["Dark", "Gritty", "Inspiring", "Humorous", "Surreal", "Romantic"];
const FORMATS = ["Feature Film", "Web Series", "Short Film", "Documentary", "Reality Show"];

// Module-level helper (stable identity — inputs keep focus across re-renders)
const Field = ({ label, children, hint }) => (
  <div>
    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-t2">{label}</label>
    {children}
    {hint && <div className="mt-1 text-[11px] text-t3">{hint}</div>}
  </div>
);

export default function PitchCreator() {
  const router = useRouter();
  const { addPitch, toast, user } = useStore();
  const [panel, setPanel] = useState(1);
  const [signed, setSigned] = useState(false);
  const [sigHash, setSigHash] = useState("");
  const [d, setD] = useState({
    title: "", format: "", genre: [], logline: "", ott: [],
    synopsis: "", themes: [], tone: "", inspired: "", usp: "",
    lead1: "", lead2: "", antagonist: "", castVision: "",
    budget: "", episodes: "", locations: "", scale: "",
    comps: "", audience: "", differentiation: "", international: "",
    legalName: "", credits: "", awards: "", agent: "", cowriters: "",
    ipCert: false,
  });
  const set = (k) => (e) => setD((x) => ({ ...x, [k]: e.target.value }));
  const toggle = (k, v) => setD((x) => ({ ...x, [k]: x[k].includes(v) ? x[k].filter((i) => i !== v) : [...x[k], v] }));

  const canNext = () => {
    if (panel === 1) return d.title && d.format && d.genre.length && d.logline;
    if (panel === 8) return signed;
    return true;
  };

  const next = () => {
    if (!canNext()) return toast(panel === 8 ? "Sign the NDA to continue" : "Fill in the required fields first", "error");
    setPanel((p) => Math.min(9, p + 1));
  };

  const submit = () => {
    addPitch({
      id: "pitch_" + Date.now(),
      title: d.title,
      format: d.format,
      genre: d.genre,
      status: "submitted",
      statusLabel: "Submitted",
      submittedAt: new Date().toISOString().slice(0, 10),
      viewCount: 0,
      progress: 100,
      emoji: "✨",
      ndaSigned: true,
      ipCertificate: d.ipCert,
    });
    toast("Pitch submitted — entering verification queue!", "success");
    setTimeout(() => router.push("/writer"), 900);
  };

  const Chip = ({ list, k, v }) => (
    <button
      onClick={() => toggle(k, v)}
      className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
        list.includes(v) ? "border-p bg-p/15 text-p2" : "border-t4 text-t2 hover:border-t3"
      }`}
    >
      {v}
    </button>
  );
  const Radio = ({ k, v }) => (
    <button
      onClick={() => setD((x) => ({ ...x, [k]: v }))}
      className={`rounded-full border px-4 py-1.5 text-sm transition-all ${
        d[k] === v ? "border-p bg-p/15 text-p2" : "border-t4 text-t2 hover:border-t3"
      }`}
    >
      {v}
    </button>
  );
  const UploadBox = ({ label, badge, note }) => (
    <button
      onClick={() => toast(`${label} attached (demo)`, "success")}
      className="card flex w-full items-center gap-4 border-dashed p-4 text-left transition-all hover:border-p/60"
    >
      <span className="rounded-lg bg-p/15 p-2.5 text-p2"><Upload size={18} /></span>
      <span className="flex-1">
        <span className="block text-sm font-semibold">{label}</span>
        <span className="text-xs text-t3">{note}</span>
      </span>
      {badge && <span className="badge badge-purple shrink-0"><Lock size={10} /> {badge}</span>}
    </button>
  );

  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/writer" className="flex items-center gap-2 text-sm text-t2 hover:text-t">
            <ArrowLeft size={15} /> Back to Dashboard
          </Link>
          <Logo size="text-base" />
        </div>

        <div className="mb-2 flex justify-between text-xs text-t2">
          <span className="font-bold text-p2">Panel {panel} of 9 — {PANELS[panel - 1]}</span>
          <span>{Math.round((panel / 9) * 100)}%</span>
        </div>
        <div className="mb-2 h-2 overflow-hidden rounded-full bg-ink4">
          <motion.div className="h-full bg-grad" animate={{ width: `${(panel / 9) * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
        <div className="mb-7 flex flex-wrap gap-1.5">
          {PANELS.map((p, i) => (
            <button
              key={p}
              onClick={() => i + 1 < panel && setPanel(i + 1)}
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all ${
                i + 1 === panel ? "bg-p/20 text-p2" : i + 1 < panel ? "text-teal" : "text-t4"
              }`}
            >
              {i + 1 < panel ? "✓ " : ""}{p}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={panel}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -32 }}
            transition={{ duration: 0.25 }}
            className="card space-y-5 p-7"
          >
            {panel === 1 && (
              <>
                <Field label="Project Title *"><input className="input" maxLength={80} placeholder="e.g. Bollywood Noir" value={d.title} onChange={set("title")} /></Field>
                <Field label="Format *"><div className="flex flex-wrap gap-2">{FORMATS.map((f) => <Radio key={f} k="format" v={f} />)}</div></Field>
                <Field label="Primary Genre *"><div className="flex flex-wrap gap-2">{GENRES.map((g) => <Chip key={g} list={d.genre} k="genre" v={g} />)}</div></Field>
                <Field label="Logline *" hint="The one-sentence hook. Max 150 characters.">
                  <textarea className="input resize-none" maxLength={150} rows={2} placeholder="A washed-up Mumbai cop finds himself at the center of a conspiracy…" value={d.logline} onChange={set("logline")} />
                </Field>
                <Field label="Target OTT / Platform"><div className="flex flex-wrap gap-2">{OTT_PLATFORMS.map((o) => <Chip key={o} list={d.ott} k="ott" v={o} />)}</div></Field>
              </>
            )}

            {panel === 2 && (
              <>
                <Field label="Story Synopsis" hint="Max 500 words. Visible ONLY after NDA-1 is countersigned — encrypted at rest.">
                  <textarea className="input min-h-[140px]" placeholder="Your full synopsis…" value={d.synopsis} onChange={set("synopsis")} />
                </Field>
                <Field label="Core Themes"><div className="flex flex-wrap gap-2">{THEMES.map((t) => <Chip key={t} list={d.themes} k="themes" v={t} />)}</div></Field>
                <Field label="Tone"><div className="flex flex-wrap gap-2">{TONES.map((t) => <Radio key={t} k="tone" v={t} />)}</div></Field>
                <Field label="Inspired by (optional)"><input className="input" placeholder="Reference films / shows" value={d.inspired} onChange={set("inspired")} /></Field>
                <Field label="Unique Selling Point"><textarea className="input resize-none" maxLength={200} rows={2} placeholder="Why this story can't be told by anyone else…" value={d.usp} onChange={set("usp")} /></Field>
              </>
            )}

            {panel === 3 && (
              <>
                <Field label="Lead Character 1" hint="Name, age, gender, background, arc.">
                  <textarea className="input min-h-[90px]" placeholder="Inspector Arjun Rane, 46 — a decorated cop dismantled by one wrong case…" value={d.lead1} onChange={set("lead1")} />
                </Field>
                <Field label="Lead Character 2 (optional)"><textarea className="input min-h-[70px]" value={d.lead2} onChange={set("lead2")} placeholder="…" /></Field>
                <Field label="Antagonist (optional)"><textarea className="input min-h-[70px]" value={d.antagonist} onChange={set("antagonist")} placeholder="…" /></Field>
                <Field label="Cast Vision (optional)"><input className="input" placeholder="Could work with…" value={d.castVision} onChange={set("castVision")} /></Field>
              </>
            )}

            {panel === 4 && (
              <>
                <Field label="Estimated Budget Range"><div className="flex flex-wrap gap-2">{BUDGETS.map((b) => <Radio key={b} k="budget" v={b} />)}</div></Field>
                <Field label="No. of Episodes (if series)"><div className="flex flex-wrap gap-2">{["6", "8", "10", "13", "20+", "Feature"].map((e) => <Radio key={e} k="episodes" v={e} />)}</div></Field>
                <Field label="Shooting Locations"><input className="input" placeholder="Mumbai, Rajasthan, London…" value={d.locations} onChange={set("locations")} /></Field>
                <Field label="Scale"><div className="flex flex-wrap gap-2">{["Intimate/Indie", "Mid-Budget", "Big Budget", "Tentpole"].map((s) => <Radio key={s} k="scale" v={s} />)}</div></Field>
              </>
            )}

            {panel === 5 && (
              <>
                <div className="status-bar status-action mb-1 text-t2">
                  <Lock size={13} className="mr-1.5 inline text-p2" />
                  Files are encrypted on upload. Access is NDA-gated per level — nobody reads what they haven&apos;t signed for.
                </div>
                <UploadBox label="Full Script (PDF)" badge="NDA-2 gated" note="Only visible after second-level NDA" />
                <UploadBox label="One-Pager / Teaser (PDF)" badge="NDA-1 gated" note="Visible after first NDA countersign" />
                <UploadBox label="Mood Board / Visual References" note="Images, optional" />
                <UploadBox label="Sample Episode / First Act (PDF)" note="Optional" />
                <Field label="Showreel / Previous Work Link"><input className="input" placeholder="https://…" /></Field>
              </>
            )}

            {panel === 6 && (
              <>
                <Field label="Comparable Titles" hint="Comp titles from the last 3 years."><input className="input" placeholder="Sacred Games × Drishyam" value={d.comps} onChange={set("comps")} /></Field>
                <Field label="Target Audience"><input className="input" placeholder="18–45, urban thriller lovers, true-crime adjacent" value={d.audience} onChange={set("audience")} /></Field>
                <Field label="Market Differentiation"><textarea className="input min-h-[90px]" placeholder="Why this story, why now…" value={d.differentiation} onChange={set("differentiation")} /></Field>
                <Field label="International Appeal"><div className="flex gap-2">{["Yes", "No", "Maybe"].map((v) => <Radio key={v} k="international" v={v} />)}</div></Field>
              </>
            )}

            {panel === 7 && (
              <>
                <Field label="Full Legal Name" hint="Used on NDAs and the final agreement."><input className="input" placeholder={user.name || "Your legal name"} value={d.legalName} onChange={set("legalName")} /></Field>
                <Field label="Previous Credits"><textarea className="input min-h-[70px]" placeholder="Produced works…" value={d.credits} onChange={set("credits")} /></Field>
                <Field label="Awards / Recognition"><input className="input" value={d.awards} onChange={set("awards")} placeholder="…" /></Field>
                <Field label="Agent / Manager (optional)"><input className="input" value={d.agent} onChange={set("agent")} placeholder="…" /></Field>
                <Field label="Co-writers & IP Split % (if any)"><input className="input" placeholder="e.g. S. Iqbal — 30%" value={d.cowriters} onChange={set("cowriters")} /></Field>
              </>
            )}

            {panel === 8 && (
              <>
                <div className="flex items-center gap-2 font-display text-lg font-bold">
                  <ShieldCheck className="text-teal" size={20} /> NDA & IP Protection
                </div>
                <div className="card max-h-52 overflow-y-auto bg-ink3 p-5 text-sm leading-relaxed text-t2">
                  <p className="font-bold text-t">KONNECT STANDARD NON-DISCLOSURE & IP PROTECTION AGREEMENT</p>
                  <p className="mt-3">1. All material submitted through this platform remains the sole intellectual property of the submitting writer(s) as declared, including declared co-writer splits.</p>
                  <p className="mt-2">2. Producers may access material strictly per the two-level NDA gate: synopsis after NDA-1 countersign; full script and narration after NDA-2.</p>
                  <p className="mt-2">3. Every access event is logged, watermarked and timestamped. Signed URLs expire in 15 minutes.</p>
                  <p className="mt-2">4. Breach triggers immediate platform ban and liquidated damages per the KONNECT Terms of Service, enforceable under Indian Contract Act, 1872 and the Copyright Act, 1957.</p>
                  <p className="mt-2">5. KONNECT acts as the escrow of record for all signatures, hashes and deal documents.</p>
                </div>
                {!signed ? (
                  <button
                    className="btn-primary w-full !py-3"
                    onClick={() => {
                      const h = generateHash();
                      setSigHash(h);
                      setSigned(true);
                      toast("NDA signed — your script is now protected", "success");
                    }}
                  >
                    <PenLine size={16} /> I Agree & Sign
                  </button>
                ) : (
                  <div className="status-bar status-success">
                    <div className="flex items-center gap-2 font-bold text-green"><CheckCircle2 size={16} /> Digitally signed</div>
                    <div className="signature-line mt-2 overflow-hidden whitespace-nowrap font-mono text-xs text-t3">
                      {sigHash} · {new Date().toLocaleString("en-IN")}
                    </div>
                  </div>
                )}
                <label className="flex cursor-pointer items-center gap-3 text-sm text-t2">
                  <input type="checkbox" checked={d.ipCert} onChange={(e) => setD({ ...d, ipCert: e.target.checked })} className="h-4 w-4 accent-[#6C63FF]" />
                  Apply for KONNECT IP Certificate — adds a <span className="badge badge-teal">Verified IP</span> badge to this pitch
                </label>
              </>
            )}

            {panel === 9 && (
              <>
                <div className="flex items-center gap-2 font-display text-lg font-bold">
                  <Sparkles className="text-gold" size={20} /> Review & Submit
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Title", d.title || "—"], ["Format", d.format || "—"],
                    ["Genre", d.genre.join(", ") || "—"], ["Budget", d.budget || "—"],
                    ["Tone", d.tone || "—"], ["Target OTT", d.ott.join(", ") || "—"],
                    ["Themes", d.themes.join(", ") || "—"], ["Legal Name", d.legalName || "—"],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-ink3 p-3.5">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-t3">{k}</div>
                      <div className="mt-0.5 truncate text-sm font-semibold">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-ink3 p-3.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-t3">Logline</div>
                  <div className="mt-0.5 text-sm italic text-t2">&ldquo;{d.logline || "—"}&rdquo;</div>
                </div>
                <div>
                  <div className="mb-3 text-xs font-bold uppercase tracking-wider text-t2">DNA Match Preview — top producers for this pitch</div>
                  <div className="flex flex-wrap gap-4">
                    {PRODUCERS.slice(0, 3).map((p, i) => (
                      <div key={p.id} className="card flex items-center gap-3 p-3.5">
                        <MatchRing value={94 - i * 8} size={46} />
                        <div>
                          <div className="text-sm font-bold">{p.companyName}</div>
                          <div className="text-[11px] text-t3">{p.genres.slice(0, 2).join(", ")}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="status-bar status-waiting text-sm text-t2">
                  <FileText size={13} className="mr-1.5 inline text-gold" />
                  On submit, your pitch enters the verification queue before going live to matched producers.
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-between">
          <button className="btn-ghost" onClick={() => setPanel((p) => Math.max(1, p - 1))} disabled={panel === 1}>
            <ArrowLeft size={16} /> Back
          </button>
          {panel < 9 ? (
            <button className="btn-primary" onClick={next}>Continue <ArrowRight size={16} /></button>
          ) : (
            <button className="btn-primary !px-8" onClick={submit}><Sparkles size={16} /> Submit Pitch</button>
          )}
        </div>
      </div>
      <Toaster />
    </main>
  );
}
