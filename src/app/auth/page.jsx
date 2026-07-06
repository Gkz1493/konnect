"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, PenLine, Clapperboard } from "lucide-react";
import { Logo, Toaster } from "@/components/ui";
import { useStore } from "@/lib/store";
import { supabase, isDemoMode } from "@/lib/supabase";

function AuthInner() {
  const params = useSearchParams();
  const router = useRouter();
  const { setRole, setUser, toast } = useStore();
  const [tab, setTab] = useState(params.get("tab") === "signup" ? "signup" : "login");
  const [role, setLocalRole] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", pass: "", confirm: "" });
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleLogin() {
    if (!form.email || !form.pass) return toast("Enter your email and password", "error");
    setBusy(true);
    if (!isDemoMode) {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.pass,
      });
      if (error) {
        setBusy(false);
        return toast(error.message, "error");
      }
    }
    const name = form.email.split("@")[0].replace(/[._]/g, " ");
    setUser({ name: name.charAt(0).toUpperCase() + name.slice(1), email: form.email });
    // Demo: login with producer@ prefix routes to producer app
    const isProducer = form.email.toLowerCase().startsWith("producer");
    setRole(isProducer ? "producer" : "writer");
    toast("Welcome back to KONNECT!", "success");
    router.push(isProducer ? "/producer" : "/writer");
  }

  async function handleSignup() {
    if (!form.name || !form.email || !form.pass)
      return toast("Please fill in all fields", "error");
    if (form.pass !== form.confirm) return toast("Passwords do not match", "error");
    if (!role) return toast("Choose Writer or Producer to continue", "error");
    setBusy(true);
    if (!isDemoMode) {
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.pass,
        options: { data: { name: form.name, role } },
      });
      if (error) {
        setBusy(false);
        return toast(error.message, "error");
      }
    }
    setUser({ name: form.name, email: form.email });
    setRole(role);
    toast("Account created — welcome aboard!", "success");
    router.push(role === "writer" ? "/onboarding" : "/producer");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-p/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-rose/20 blur-[140px]" />

      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-t2 transition-colors hover:text-t">
          <ArrowLeft size={15} /> Back to <Logo size="text-sm" />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="card glass p-7"
        >
          {/* tabs */}
          <div className="mb-7 grid grid-cols-2 rounded-xl bg-ink3 p-1">
            {["login", "signup"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-lg py-2.5 font-display text-sm font-bold uppercase tracking-wider transition-all ${
                  tab === t ? "bg-grad text-white shadow-glow" : "text-t2 hover:text-t"
                }`}
              >
                {t === "login" ? "Login" : "Sign Up"}
              </button>
            ))}
          </div>

          {tab === "login" ? (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-t2">Email Address</label>
                <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-t2">Password</label>
                <input className="input" type="password" placeholder="••••••••" value={form.pass} onChange={set("pass")} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
              </div>
              <button className="btn-primary w-full !py-3" onClick={handleLogin} disabled={busy}>
                {busy ? "Signing in…" : "Login to KONNECT"}
              </button>
              <p className="text-center text-xs text-t3">
                Forgot password? · Tip: emails starting with <span className="text-rose2">producer</span> open the Producer app
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <input className="input" placeholder="Full Name" value={form.name} onChange={set("name")} />
                <input className="input" type="email" placeholder="Email" value={form.email} onChange={set("email")} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input className="input" type="password" placeholder="Password" value={form.pass} onChange={set("pass")} />
                <input className="input" type="password" placeholder="Confirm" value={form.confirm} onChange={set("confirm")} />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-t2">I am a:</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLocalRole("writer")}
                    className={`card flex flex-col items-center gap-2 !rounded-xl p-4 transition-all ${
                      role === "writer" ? "card-active" : "hover:border-t3"
                    }`}
                  >
                    <PenLine size={22} className="text-p2" />
                    <span className="font-display text-sm font-bold">Writer</span>
                    <span className="text-[11px] text-t3">Pitch your stories</span>
                  </button>
                  <button
                    onClick={() => setLocalRole("producer")}
                    className={`card flex flex-col items-center gap-2 !rounded-xl p-4 transition-all ${
                      role === "producer"
                        ? "!border-rose shadow-roseglow"
                        : "hover:border-t3"
                    }`}
                  >
                    <Clapperboard size={22} className="text-rose2" />
                    <span className="font-display text-sm font-bold">Producer / Studio</span>
                    <span className="text-[11px] text-t3">Acquire scripts</span>
                  </button>
                </div>
              </div>

              <button className="btn-primary w-full !py-3" onClick={handleSignup} disabled={busy}>
                {busy ? "Creating account…" : "Create My Account"}
              </button>
              <p className="text-center text-[11px] leading-relaxed text-t3">
                By signing up you agree to KONNECT&apos;s NDA-first Terms. Your uploads are
                encrypted and never visible without a signed NDA.
              </p>
            </div>
          )}
        </motion.div>
      </div>
      <Toaster />
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense>
      <AuthInner />
    </Suspense>
  );
}
