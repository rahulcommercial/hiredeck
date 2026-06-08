/**
 * Resume store — zustand + localStorage persistence.
 *
 * Single source of truth for the document being edited. Starts EMPTY so
 * first-time visitors don't see somebody else's data. The bundled sample
 * is opt-in via `loadSample()`.
 */
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { emptyResume, type Resume, sampleResume } from "@hiredeck/schema";

interface ResumeState {
  resume: Resume;
  /** True once the user has uploaded, loaded sample, or edited fields. */
  hasData: boolean;
  /** Wholesale replace — used after upload/parse. */
  setResume: (r: Resume) => void;
  /** Targeted edits — top-level fields. */
  patch: <K extends keyof Resume>(key: K, value: Resume[K]) => void;
  /** Set just the active template id (lives in meta.hiredeck.template). */
  setTemplate: (id: string) => void;
  /** Load the bundled sample resume — opt-in. */
  loadSample: () => void;
  /** Reset everything to empty. */
  clear: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: emptyResume(),
      hasData: false,
      setResume: (r) => set({ resume: r, hasData: true }),
      patch: (key, value) =>
        set((s) => ({ resume: { ...s.resume, [key]: value } as Resume, hasData: true })),
      setTemplate: (id) =>
        set((s) => ({
          resume: {
            ...s.resume,
            meta: {
              ...s.resume.meta,
              hiredeck: { ...s.resume.meta.hiredeck, template: id },
            },
          },
        })),
      loadSample: () => set({ resume: sampleResume, hasData: true }),
      clear: () => set({ resume: emptyResume(), hasData: false }),
    }),
    { name: "hiredeck-resume-v2" } // bumped to invalidate the old persisted sample
  )
);
