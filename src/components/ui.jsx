"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";

// ── TOASTER ───────────────────────────────────────────────
export function Toaster() {
  const toasts = useStore((s) => s.toasts);
  const icons = {
    success: <CheckCircle2 size={16} className="text-green" />,
    error: <AlertCircle size={16} className="text-red" />,
    info: <Info size={16} className="text-sky" />,
  };
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            className="glass flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm shadow-card"
          >
            {icons[t.type] || icons.info}
            <span>{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── STAT CARD ─────────────────────────────────────────────
export function StatCard({ value, label, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="card group p-5 transition-all hover:border-p/50 hover:shadow-glow"
    >
      <div className="mb-2 text-t3 transition-colors group-hover:text-p2">{icon}</div>
      <div className="font-display text-2xl font-bold">{value}</div>
      <div className="mt-0.5 text-xs font-medium uppercase tracking-wider text-t2">{label}</div>
    </motion.div>
  );
}

// ── SECTION HEADER ────────────────────────────────────────
export function SectionHead({ title, sub, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="font-display text-[1.6rem] font-bold">{title}</h2>
        {sub && <p className="mt-1 text-sm text-t2">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ── PROGRESS BAR ──────────────────────────────────────────
export function Progress({ value, tone = "purple" }) {
  const tones = {
    purple: "bg-grad",
    teal: "bg-grad2",
  };
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink4">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full rounded-full ${tones[tone]}`}
      />
    </div>
  );
}

// ── MATCH RING (circular DNA % indicator) ─────────────────
export function MatchRing({ value, size = 56 }) {
  const r = size / 2 - 5;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#252344" strokeWidth="5" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#dnaGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="dnaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="100%" stopColor="#E879A0" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-display text-xs font-bold">
        {value}%
      </div>
    </div>
  );
}

// ── PLAN CARDS ────────────────────────────────────────────
export function PlanGrid({ plans, onSelect }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {plans.map((plan, i) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`card relative flex flex-col p-6 ${
            plan.popular ? "card-active animate-pulse-glow" : ""
          }`}
        >
          {plan.popular && (
            <span className="badge badge-purple absolute -top-3 left-1/2 -translate-x-1/2">
              <Sparkles size={11} /> Most Popular
            </span>
          )}
          <h3 className="font-display text-lg font-bold">{plan.name}</h3>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-display text-3xl font-bold grad-text">{plan.price}</span>
            <span className="text-sm text-t3">{plan.period}</span>
          </div>
          <ul className="mt-5 flex-1 space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-t2">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-p2" />
                {f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => onSelect && onSelect(plan)}
            className={`mt-6 w-full ${plan.current ? "btn-ghost" : "btn-primary"}`}
            disabled={plan.current}
          >
            {plan.cta}
          </button>
        </motion.div>
      ))}
    </div>
  );
}

// ── EMPTY STATE ───────────────────────────────────────────
export function Empty({ emoji, title, sub, action }) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-3 text-4xl">{emoji}</div>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-t2">{sub}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

// ── KONNECT WORDMARK ──────────────────────────────────────
export function Logo({ size = "text-xl" }) {
  return (
    <span className={`font-display font-bold tracking-tight ${size}`}>
      K<span className="grad-text">O</span>NNECT
    </span>
  );
}
