"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Send, PenLine, BookOpen, Clock, Target, Mic, CalendarCheck,
  Lock, Star, FileSignature, Rocket, Check, ShieldCheck, Video,
} from "lucide-react";
import { Logo, Toaster } from "@/components/ui";
import { useStore } from "@/lib/store";
import { generateHash } from "@/lib/data";

// ── 13-STAGE DEAL FLOW SIMULATION (spec §11) ──────────────
const STAGES = [
  { n: 1, label: "Request", actor: "producer" },
  { n: 2, label: "NDA-1 Sign", actor: "producer" },
  { n: 3, label: "Countersign", actor: "writer" },
  { n: 4, label: "Synopsis", actor: "producer" },
  { n: 5, label: "7-Day Wait", actor: "system" },
  { n: 6, label: "Decision", actor: "producer" },
  { n: 7, label: "Narration Req", actor: "producer" },
  { n: 8, label: "Writer Confirms", actor: "writer" },
  { n: 9, label: "NDA-2", actor: "both" },
  { n: 10, label: "Scheduled", actor: "system" },
  { n: 11, label: "Evaluation", actor: "producer" },
  { n: 12, label: "Agreement", actor: "both" },
  { n: 13, label: "GREENLIT", actor: "both" },
];

const ACTOR_BANNER = {
  writer: { cls: "actor-writer", label: "✍️ WRITER ACTION — Rohan Mehta" },
  producer: { cls: "actor-producer", label: "🎬 PRODUCER ACTION — Rajesh Films" },
  system: { cls: "actor-system", label: "🤖 KONNECT PLATFORM — Both Notified" },
  both: { cls: "actor-both", label: "🤝 BOTH PARTIES — Action Required" },
};

function Confetti() {
  const colors = ["#6C63FF", "#E879A0", "#2DD4BF", "#F59E0B", "#4ADE80"];
  return (
    <>
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}vw`,
            background: colors[i % colors.length],
            animationDuration: `${2.2 + Math.random() * 2.5}s`,
            animationDelay: `${Math.random() * 1.2}s`,
            borderRadius: i % 3 === 0 ? "50%" : "2px",
          }}
        />
      ))}
    </>
  );
}

export default function DealDemo() {
  const router = useRouter();
  const { toast } = useStore();
  const [stage, setStage] = useState(1);
  const [pov, setPov] = useState("producer"); // 'writer' | 'producer' | null
  const [writerStatus, setWriterStatus] = useState({ msg: "🔔 Incoming request from Rajesh Films", type: "waiting" });
  const [producerStatus, setProducerStatus] = useState({ msg: "Send your script request to begin", type: "action" });
  const [nda2Phase, setNda2Phase] = useState("writer"); // writer → producer → done
  const [finalPhase, setFinalPhase] = useState("writer");
  const [waitLeft, setWaitLeft] = useState(7);
  const [deal, setDeal] = useState({ nda1Hash: null, nda2Hash: null, narrDate: "Jul 12, 2026 · 11:00 AM", narrMode: "Online" });

  const go = useCallback((n) => {
    setStage(n);
    const s = STAGES[n - 1];
    setPov(s.actor === "writer" ? "writer" : s.actor === "producer" ? "producer" : null);
  }, []);

  // stage side-effects: status bars + auto-advance for system stages
  useEffect(() => {
    let t;
    switch (stage) {
      case 1:
        setWriterStatus({ msg: "🔔 Incoming request from Rajesh Films for 'Bollywood Noir'", type: "waiting" });
        setProducerStatus({ msg: "You spotted this script in your DNA feed — send the request", type: "action" });
        break;
      case 2:
        setWriterStatus({ msg: "Waiting for producer to sign NDA-1…", type: "waiting" });
        setProducerStatus({ msg: "Sign the first-level NDA to request even the synopsis", type: "action" });
        break;
      case 3:
        setWriterStatus({ msg: "Rajesh Films signed NDA-1. Review and countersign to grant access", type: "action" });
        setProducerStatus({ msg: "Waiting for writer to countersign…", type: "waiting" });
        break;
      case 4:
        setWriterStatus({ msg: "Producer is reading your synopsis now", type: "waiting" });
        setProducerStatus({ msg: "Synopsis unlocked. The 7-day decision clock starts when you finish", type: "action" });
        break;
      case 5:
        setWriterStatus({ msg: "Your synopsis has been read. Waiting for producer decision…", type: "waiting" });
        setProducerStatus({ msg: `You have ${waitLeft} days to decide. Request narration or decline`, type: "waiting" });
        t = setInterval(() => {
          setWaitLeft((d) => {
            if (d <= 1) { clearInterval(t); setTimeout(() => go(6), 500); return 0; }
            return d - 1;
          });
        }, 550);
        break;
      case 6:
        setWriterStatus({ msg: "Awaiting the producer's decision", type: "waiting" });
        setProducerStatus({ msg: "Decision time: request a narration session or decline with reason", type: "action" });
        break;
      case 7:
        setWriterStatus({ msg: "Narration request incoming — check your notifications", type: "waiting" });
        setProducerStatus({ msg: "Pick a mode and propose your session slot", type: "action" });
        break;
      case 8:
        setWriterStatus({ msg: "Confirm the session or propose a new time", type: "action" });
        setProducerStatus({ msg: "Waiting for writer to confirm the narration session…", type: "waiting" });
        break;
      case 9:
        setWriterStatus({ msg: nda2Phase === "writer" ? "Sign NDA-2 for full-script + narration protection" : "✍ Signed. Waiting on producer countersign", type: nda2Phase === "writer" ? "action" : "success" });
        setProducerStatus({ msg: nda2Phase === "producer" ? "Writer signed — countersign NDA-2 now" : nda2Phase === "done" ? "✍ Countersigned" : "Writer signs first…", type: nda2Phase === "producer" ? "action" : "waiting" });
        break;
      case 10:
        setWriterStatus({ msg: "📅 Session confirmed · calendar invite sent", type: "success" });
        setProducerStatus({ msg: "📅 Session confirmed · calendar invite sent", type: "success" });
        t = setTimeout(() => go(11), 2600);
        break;
      case 11:
        setWriterStatus({ msg: "Narration complete. Awaiting producer evaluation…", type: "waiting" });
        setProducerStatus({ msg: "Rate the narration and make the call", type: "action" });
        break;
      case 12:
        setWriterStatus({ msg: finalPhase === "writer" ? "Review and sign the final agreement" : "✍ Signed the agreement", type: finalPhase === "writer" ? "action" : "success" });
        setProducerStatus({ msg: finalPhase === "producer" ? "Countersign to close the deal" : finalPhase === "done" ? "✍ Countersigned" : "Waiting for writer signature…", type: finalPhase === "producer" ? "action" : "waiting" });
        break;
      case 13:
        setWriterStatus({ msg: "🎉 GREENLIT! Bollywood Noir is going to screens", type: "success" });
        setProducerStatus({ msg: "🎉 GREENLIT! Bollywood Noir officially acquired", type: "success" });
        break;
      default:
        break;
    }
    return () => { clearInterval(t); clearTimeout(t); };
  }, [stage, nda2Phase, finalPhase, waitLeft, go]);

  // POV override during dual-sign stages
  useEffect(() => {
    if (stage === 9) setPov(nda2Phase === "producer" ? "producer" : nda2Phase === "writer" ? "writer" : null);
    if (stage === 12) setPov(finalPhase === "producer" ? "producer" : finalPhase === "writer" ? "writer" : null);
  }, [stage, nda2Phase, finalPhase]);

  const banner = ACTOR_BANNER[STAGES[stage - 1].actor];

  const StatusBar = ({ s }) => (
    <div className={`status-bar mt-4 text-xs leading-relaxed ${s.type === "action" ? "status-action" : s.type === "success" ? "status-success" : "status-waiting"}`}>
      {s.msg}
    </div>
  );

  const NdaDoc = ({ level }) => (
    <div className="card max-h-36 overflow-y-auto bg-ink3 p-4 text-left text-xs leading-relaxed text-t2">
      <div className="font-bold text-t">KONNECT NDA — LEVEL {level} · Bollywood Noir × Rajesh Films</div>
      <p className="mt-2">{level === 1
        ? "Grants access to the one-page synopsis only. Confidentiality binds the recipient to non-disclosure and non-use of the disclosed premise, characters and world."
        : "Grants full-script access and covers the narration session: confidentiality, non-compete, IP protection and narration terms. Breach triggers liquidated damages."}</p>
      <p className="mt-2 text-t3">Timestamped, hashed and stored by KONNECT as escrow of record.</p>
    </div>
  );

  return (
    <main className="min-h-screen px-4 py-6">
      {stage === 13 && <Confetti />}
      <div className="mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo size="text-base" />
            <span className="hidden text-sm text-t2 sm:block">
              Deal Flow Demo — <span className="font-bold text-t">Bollywood Noir</span> × <span className="font-bold text-rose2">Rajesh Films</span>
            </span>
          </div>
          <button onClick={() => router.push("/producer")} className="btn-ghost !px-3 !py-2 text-sm"><X size={15} /> Close</button>
        </div>

        {/* stage progress */}
        <div className="mb-7 flex items-center gap-1 overflow-x-auto pb-2">
          {STAGES.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <button
                onClick={() => s.n < stage && go(s.n)}
                className={`group relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold transition-all ${
                  s.n === stage
                    ? "bg-grad text-white shadow-glow scale-110"
                    : s.n < stage
                    ? "bg-green/15 text-green"
                    : "bg-ink3 text-t4"
                }`}
              >
                {s.n < stage ? <Check size={13} /> : s.n}
                <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider text-t3 opacity-0 transition-opacity group-hover:opacity-100">{s.label}</span>
              </button>
              {i < 12 && <div className={`h-0.5 w-3 sm:w-5 ${s.n < stage ? "bg-green/50" : "bg-ink4"}`} />}
            </div>
          ))}
        </div>

        {/* 3-column layout */}
        <div className="grid gap-5 lg:grid-cols-[1fr_1.6fr_1fr]">
          {/* WRITER POV */}
          <div className={`pov-panel ${pov === "writer" ? "pov-active-writer" : pov === null ? "" : "pov-waiting"}`}>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-grad text-xs font-bold text-white">R</div>
              <div>
                <div className="font-display text-sm font-bold">Rohan Mehta</div>
                <div className="text-[11px] text-p2">Writer · Pro ⭐</div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs text-t2">
              <div className="rounded-lg bg-ink3 p-3">
                <span className="font-bold text-t">Bollywood Noir</span> · Thriller · ₹5-20 Cr
                <div className="mt-1 flex gap-1.5">
                  <span className="badge badge-teal"><ShieldCheck size={10} /> Verified IP</span>
                  <span className="badge badge-purple"><Lock size={10} /> NDA</span>
                </div>
              </div>
              {deal.nda1Hash && <div className="rounded-lg bg-ink3 p-2.5 font-mono text-[10px] text-t3">NDA-1 {deal.nda1Hash.slice(0, 22)}…</div>}
              {deal.nda2Hash && <div className="rounded-lg bg-ink3 p-2.5 font-mono text-[10px] text-t3">NDA-2 {deal.nda2Hash.slice(0, 22)}…</div>}
            </div>
            <StatusBar s={writerStatus} />
          </div>

          {/* STAGE CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${stage}-${nda2Phase}-${finalPhase}`}
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -22, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="card flex flex-col p-6"
            >
              <div className={`actor-banner ${banner.cls}`}>{banner.label}</div>

              <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
                {stage === 1 && (
                  <>
                    <Send size={36} className="mb-4 text-rose2" />
                    <h2 className="font-display text-2xl font-bold">Script Request</h2>
                    <p className="mt-2 max-w-sm text-sm text-t2">Rajesh Films spotted <b>Bollywood Noir</b> (94% DNA match) in the swipe feed and wants to read it.</p>
                    <div className="card mt-5 w-full max-w-sm bg-ink3 p-4 text-left text-xs text-t2">
                      <div>Requesting: <b className="text-t">Synopsis access (NDA-1 gated)</b></div>
                      <div className="mt-1">Producer: Rajesh Films · Verified ✓</div>
                      <div className="mt-1">Writer notified instantly on send</div>
                    </div>
                    <button className="btn-primary mt-6" onClick={() => { toast("Request sent — writer notified", "success"); go(2); }}>
                      <Send size={15} /> Send Request
                    </button>
                  </>
                )}

                {stage === 2 && (
                  <>
                    <FileSignature size={36} className="mb-4 text-rose2" />
                    <h2 className="font-display text-2xl font-bold">NDA-1 — Producer Signs</h2>
                    <p className="mt-2 max-w-sm text-sm text-t2">Before even the synopsis, the producer signs the first-level NDA.</p>
                    <div className="mt-5 w-full max-w-sm"><NdaDoc level={1} /></div>
                    <button
                      className="btn-primary mt-6"
                      onClick={() => {
                        const h = generateHash();
                        setDeal((x) => ({ ...x, nda1Hash: h }));
                        toast("NDA-1 signed by Rajesh Films", "success");
                        setTimeout(() => go(3), 700);
                      }}
                    >
                      <PenLine size={15} /> I Agree — Sign NDA
                    </button>
                  </>
                )}

                {stage === 3 && (
                  <>
                    <ShieldCheck size={36} className="mb-4 text-p2" />
                    <h2 className="font-display text-2xl font-bold">Writer Countersigns</h2>
                    <p className="mt-2 max-w-sm text-sm text-t2">NDA-1 arrives signed by Rajesh Films. Countersigning grants synopsis access — nothing more.</p>
                    <div className="mt-5 w-full max-w-sm"><NdaDoc level={1} /></div>
                    <div className="status-bar status-success mt-3 w-full max-w-sm text-left text-xs">✓ Signed by Rajesh Films · {deal.nda1Hash?.slice(0, 20)}…</div>
                    <button className="btn-primary mt-5" onClick={() => { toast("Countersigned — synopsis access granted", "success"); go(4); }}>
                      <PenLine size={15} /> Countersign & Grant Access
                    </button>
                  </>
                )}

                {stage === 4 && (
                  <>
                    <BookOpen size={36} className="mb-4 text-rose2" />
                    <h2 className="font-display text-2xl font-bold">Synopsis Access</h2>
                    <div className="card mt-5 max-h-44 w-full max-w-md overflow-y-auto bg-ink3 p-5 text-left text-sm leading-relaxed text-t2">
                      <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wider text-t3">
                        <span>One-pager · watermarked: RAJESH FILMS · {new Date().toLocaleDateString("en-IN")}</span>
                      </div>
                      Inspector Arjun Rane was Mumbai&apos;s most decorated cop until one wrong case buried him in traffic duty. When a starlet dies at a film premiere, evidence begins pointing to a script — one Rane himself rejected as a police consultant years ago. Every murder that follows restages a scene from it. To stop the killer, Rane must finish reading the story everyone else refused to…
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gold"><Clock size={13} /> 7-day decision clock starts when you confirm</div>
                    <button className="btn-primary mt-5" onClick={() => { toast("Read receipt logged — 7-day clock started", "info"); go(5); }}>
                      I&apos;ve Read the Synopsis
                    </button>
                  </>
                )}

                {stage === 5 && (
                  <>
                    <Clock size={36} className="mb-4 animate-pulse text-gold" />
                    <h2 className="font-display text-2xl font-bold">7-Day Wait Period</h2>
                    <p className="mt-2 max-w-sm text-sm text-t2">Platform-enforced. Daily reminders go to both parties; no action auto-expires the deal.</p>
                    <div className="mt-6 font-display text-6xl font-bold grad-text">{waitLeft}</div>
                    <div className="text-xs uppercase tracking-[0.3em] text-t3">days remaining</div>
                    <div className="mt-5 h-2 w-full max-w-xs overflow-hidden rounded-full bg-ink4">
                      <motion.div className="h-full bg-grad" animate={{ width: `${((7 - waitLeft) / 7) * 100}%` }} />
                    </div>
                    <div className="mt-3 text-[11px] text-t3">(demo compresses 7 days into seconds)</div>
                  </>
                )}

                {stage === 6 && (
                  <>
                    <Target size={36} className="mb-4 text-rose2" />
                    <h2 className="font-display text-2xl font-bold">Producer Decides</h2>
                    <p className="mt-2 max-w-sm text-sm text-t2">The synopsis earned a decision. Move forward to a narration session, or decline with a reason the writer actually receives.</p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <button className="btn-primary" onClick={() => { toast("Narration path chosen", "success"); go(7); }}>
                        <Mic size={15} /> Request Narration Session
                      </button>
                      <button className="btn-danger" onClick={() => toast("Demo follows the positive path — click Request Narration", "info")}>
                        Decline — Provide Reason
                      </button>
                    </div>
                  </>
                )}

                {stage === 7 && (
                  <>
                    <Mic size={36} className="mb-4 text-rose2" />
                    <h2 className="font-display text-2xl font-bold">Narration Request</h2>
                    <p className="mt-2 text-sm text-t2">Choose the mode and propose a slot.</p>
                    <div className="mt-5 grid w-full max-w-sm gap-3 text-left">
                      <div className="grid grid-cols-2 gap-3">
                        {["Online", "Offline"].map((m) => (
                          <button
                            key={m}
                            onClick={() => setDeal((x) => ({ ...x, narrMode: m }))}
                            className={`card flex items-center justify-center gap-2 p-3 text-sm font-semibold transition-all ${deal.narrMode === m ? "card-active" : ""}`}
                          >
                            {m === "Online" ? <Video size={15} /> : <Users2 />} {m} {m === "Online" ? "· Google Meet" : "· In-Person"}
                          </button>
                        ))}
                      </div>
                      <div className="card bg-ink3 p-3.5 text-sm">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-t3">Proposed Slot</div>
                        <div className="mt-1 font-semibold">{deal.narrDate}</div>
                      </div>
                    </div>
                    <button className="btn-primary mt-5" onClick={() => { toast("Narration request sent to writer", "success"); go(8); }}>
                      <Send size={15} /> Send Narration Request
                    </button>
                  </>
                )}

                {stage === 8 && (
                  <>
                    <CalendarCheck size={36} className="mb-4 text-p2" />
                    <h2 className="font-display text-2xl font-bold">Writer Confirms</h2>
                    <div className="card mt-5 w-full max-w-sm bg-ink3 p-4 text-left text-sm">
                      <div className="flex justify-between"><span className="text-t3">Session</span><span className="font-semibold">{deal.narrMode} narration</span></div>
                      <div className="mt-1.5 flex justify-between"><span className="text-t3">Date</span><span className="font-semibold">{deal.narrDate}</span></div>
                      <div className="mt-1.5 flex justify-between"><span className="text-t3">From</span><span className="font-semibold">Rajesh Films</span></div>
                      <div className="mt-2 border-t border-t4/60 pt-2 text-xs italic text-t2">&ldquo;Loved the premise. Bring the full narration — we&apos;re serious about this one.&rdquo;</div>
                    </div>
                    <div className="mt-5 flex flex-wrap justify-center gap-3">
                      <button className="btn-primary" onClick={() => { toast("Session confirmed — NDA-2 next", "success"); go(9); }}>
                        Confirm & Proceed to NDA-2
                      </button>
                      <button className="btn-ghost" onClick={() => toast("New time proposed — producer accepted (demo loop)", "info")}>
                        Propose New Time
                      </button>
                    </div>
                  </>
                )}

                {stage === 9 && (
                  <>
                    <Lock size={36} className="mb-4 text-teal" />
                    <h2 className="font-display text-2xl font-bold">NDA-2 — Deep Protection</h2>
                    <p className="mt-2 max-w-sm text-sm text-t2">Full script + narration coverage: confidentiality, non-compete, IP protection. Writer signs first, producer countersigns.</p>
                    <div className="mt-5 w-full max-w-sm"><NdaDoc level={2} /></div>
                    {nda2Phase === "writer" && (
                      <button
                        className="btn-primary mt-5"
                        onClick={() => {
                          setDeal((x) => ({ ...x, nda2Hash: generateHash() }));
                          setNda2Phase("producer");
                          toast("Writer signed NDA-2", "success");
                        }}
                      >
                        <PenLine size={15} /> Sign NDA-2 (Writer)
                      </button>
                    )}
                    {nda2Phase === "producer" && (
                      <>
                        <div className="status-bar status-success mt-4 w-full max-w-sm text-left text-xs">✓ Writer signed · {deal.nda2Hash?.slice(0, 20)}…</div>
                        <button
                          className="btn-primary mt-4"
                          onClick={() => {
                            setNda2Phase("done");
                            toast("NDA-2 fully executed", "success");
                            setTimeout(() => go(10), 800);
                          }}
                        >
                          <PenLine size={15} /> Countersign (Producer)
                        </button>
                      </>
                    )}
                    {nda2Phase === "done" && <div className="status-bar status-success mt-4 w-full max-w-sm text-xs">✓ Fully executed by both parties</div>}
                  </>
                )}

                {stage === 10 && (
                  <>
                    <CalendarCheck size={36} className="mb-4 text-teal" />
                    <h2 className="font-display text-2xl font-bold">Narration Scheduled</h2>
                    <div className="card card-active mt-5 w-full max-w-sm p-5 text-left text-sm">
                      <div className="flex justify-between"><span className="text-t3">Date</span><span className="font-semibold">{deal.narrDate}</span></div>
                      <div className="mt-1.5 flex justify-between"><span className="text-t3">Platform</span><span className="font-semibold">Google Meet</span></div>
                      <div className="mt-1.5 flex justify-between"><span className="text-t3">Link</span><span className="font-mono text-xs text-sky">meet.google.com/kon-nect-demo</span></div>
                      <div className="mt-1.5 flex justify-between"><span className="text-t3">Participants</span><span className="font-semibold">R. Mehta · Rajesh Films</span></div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-teal"><Check size={14} /> Calendar invites sent to both parties</div>
                  </>
                )}

                {stage === 11 && (
                  <>
                    <Star size={36} className="mb-4 text-gold" />
                    <h2 className="font-display text-2xl font-bold">Post-Narration Evaluation</h2>
                    <div className="mt-5 w-full max-w-sm space-y-3 text-left">
                      {[["Story", 90], ["Characters", 85], ["Commercial Potential", 95], ["Platform Fit", 88]].map(([k, v]) => (
                        <div key={k}>
                          <div className="mb-1 flex justify-between text-xs"><span className="text-t2">{k}</span><span className="font-bold text-gold">{"★".repeat(Math.round(v / 20))}</span></div>
                          <div className="h-1.5 overflow-hidden rounded-full bg-ink4">
                            <motion.div className="h-full bg-grad" initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 0.9 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <button className="btn-primary" onClick={() => { toast("GREENLIT — generating agreement", "success"); go(12); }}>
                        <Rocket size={15} /> Greenlight This Project!
                      </button>
                      <button className="btn-ghost text-sm" onClick={() => toast("Demo follows the positive path", "info")}>Request Revisions</button>
                    </div>
                  </>
                )}

                {stage === 12 && (
                  <>
                    <FileSignature size={36} className="mb-4 text-green" />
                    <h2 className="font-display text-2xl font-bold">Final Agreement</h2>
                    <div className="card mt-5 max-h-40 w-full max-w-sm overflow-y-auto bg-ink3 p-4 text-left text-xs leading-relaxed text-t2">
                      <div className="font-bold text-t">ACQUISITION AGREEMENT — Bollywood Noir</div>
                      <p className="mt-2">IP transfer terms · Revenue split: 70/30 post-recoup · Production timeline: 18 months · Exclusivity window: 24 months · Platform rights: worldwide OTT + Indian theatrical.</p>
                      <p className="mt-2 text-t3">Generated by KONNECT · timestamped and stored as deal of record.</p>
                    </div>
                    {finalPhase === "writer" && (
                      <button className="btn-primary mt-5" onClick={() => { setFinalPhase("producer"); toast("Writer signed the agreement", "success"); }}>
                        <PenLine size={15} /> Sign Agreement (Writer)
                      </button>
                    )}
                    {finalPhase === "producer" && (
                      <>
                        <div className="status-bar status-success mt-4 w-full max-w-sm text-left text-xs">✓ Signed by Rohan Mehta · {new Date().toLocaleString("en-IN")}</div>
                        <button className="btn-primary mt-4" onClick={() => { setFinalPhase("done"); toast("Deal executed!", "success"); setTimeout(() => go(13), 600); }}>
                          <PenLine size={15} /> Countersign (Producer)
                        </button>
                      </>
                    )}
                  </>
                )}

                {stage === 13 && (
                  <>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.55 }}>
                      <Rocket size={48} className="mb-4 text-green" />
                    </motion.div>
                    <h2 className="font-display text-3xl font-bold grad-text">GREENLIT! 🚀</h2>
                    <p className="mt-3 max-w-sm text-sm text-t2">
                      <b className="text-t">Bollywood Noir × Rajesh Films</b> — deal complete. KONNECT now facilitates full script transfer, the production intro meeting, and Razorpay payment milestones.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      <span className="badge badge-green"><Rocket size={11} /> Deal Closed badge earned</span>
                      <span className="badge badge-purple">Project → Greenlit folder</span>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button className="btn-primary" onClick={() => { setStage(1); setPov("producer"); setNda2Phase("writer"); setFinalPhase("writer"); setWaitLeft(7); setDeal({ nda1Hash: null, nda2Hash: null, narrDate: "Jul 12, 2026 · 11:00 AM", narrMode: "Online" }); }}>
                        Replay Simulation
                      </button>
                      <button className="btn-ghost" onClick={() => router.push("/producer")}>Back to Dashboard</button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* PRODUCER POV */}
          <div className={`pov-panel ${pov === "producer" ? "pov-active-producer" : pov === null ? "" : "pov-waiting"}`}>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose to-p text-xs font-bold text-white">R</div>
              <div>
                <div className="font-display text-sm font-bold">Rajesh Films</div>
                <div className="text-[11px] text-rose2">Producer · Studio Pro · Verified ✓</div>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs text-t2">
              <div className="rounded-lg bg-ink3 p-3">
                Acquiring: <span className="font-bold text-t">Bollywood Noir</span>
                <div className="mt-1 text-t3">94% DNA match · Thriller · Hindi</div>
              </div>
              <div className="rounded-lg bg-ink3 p-3">
                Stage <span className="font-bold text-t">{stage}/13</span> — {STAGES[stage - 1].label}
              </div>
            </div>
            <StatusBar s={producerStatus} />
          </div>
        </div>
      </div>
      <Toaster />
    </main>
  );
}

function Users2() {
  return <span>🏢</span>;
}
