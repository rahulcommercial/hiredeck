/**
 * Resume store — zustand + localStorage persistence.
 *
 * Single source of truth for the document being edited. The Atlas template
 * (and every future template) reads from `state.resume`.
 */
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Resume, ResumeSchema, sampleResume } from "@hiredeck/schema";

interface ResumeState {
  resume: Resume;
  /** Wholesale replace — used after upload/parse. */
  setResume: (r: Resume) => void;
  /** Targeted edits — top-level fields. */
  patch: <K extends keyof Resume>(key: K, value: Resume[K]) => void;
  /** Reset to the bundled sample (Rahul's resume). */
  reset: () => void;
  /** Clear everything to an empty doc. */
  clear: () => void;
}

const empty = (): Resume =>
  ResumeSchema.parse({
    basics: { name: "" },
  });

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: sampleResume,
      setResume: (r) => set({ resume: r }),
      patch: (key, value) =>
        set((s) => ({ resume: { ...s.resume, [key]: value } as Resume })),
      reset: () => set({ resume: sampleResume }),
      clear: () => set({ resume: empty() }),
    }),
    { name: "hiredeck-resume-v1" }
  )
);
