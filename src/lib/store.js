"use client";
import { create } from "zustand";
import { MY_PITCHES } from "./data";

// ── GLOBAL APP STATE (spec §13.1) ─────────────────────────
export const useStore = create((set) => ({
  role: null, // 'writer' | 'producer'
  writerType: null,
  user: { name: "", email: "", plan: "free" },
  myPitches: MY_PITCHES,
  savedScripts: [],
  toasts: [],

  setRole: (role) => set({ role }),
  setWriterType: (writerType) => set({ writerType }),
  setUser: (user) => set((s) => ({ user: { ...s.user, ...user } })),
  addPitch: (pitch) => set((s) => ({ myPitches: [pitch, ...s.myPitches] })),
  saveScript: (script) =>
    set((s) =>
      s.savedScripts.find((x) => x.id === script.id)
        ? s
        : { savedScripts: [...s.savedScripts, script] }
    ),

  toast: (message, type = "info") => {
    const id = Date.now() + Math.random();
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 3200);
  },
}));
