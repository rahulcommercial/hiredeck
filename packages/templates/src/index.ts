/**
 * Template registry. Each entry exposes a React component + metadata for
 * the picker. Add a new template by importing its component and adding it
 * to the TEMPLATES object — no other file needs to change.
 */
import type { Resume } from "@hiredeck/schema";
import type { ComponentType } from "react";
import { Atlas } from "./atlas";
import { Onyx } from "./onyx";
import { Mesa } from "./mesa";
import { Granite } from "./granite";
import { Junction } from "./junction";
import { Vista } from "./vista";
import { Marble } from "./marble";
import { Ember } from "./ember";
import { Meridian } from "./meridian";
import { Cobalt } from "./cobalt";

export interface TemplateMeta {
  id: string;
  name: string;
  tagline: string;
  /** Comma-separated style hints for the picker UI. */
  vibe: string;
  /** Default accent colour suggestion (templates honour the user's choice in resume.meta.hiredeck.accentColor). */
  defaultAccent: string;
  Component: ComponentType<{ resume: Resume }>;
}

export const TEMPLATES: Record<string, TemplateMeta> = {
  atlas: {
    id: "atlas",
    name: "Atlas",
    tagline: "Minimal · single-column · ATS-friendly",
    vibe: "clean · minimal",
    defaultAccent: "#2E75B6",
    Component: Atlas,
  },
  onyx: {
    id: "onyx",
    name: "Onyx",
    tagline: "Dark hero · numbered sections · premium",
    vibe: "bold · executive",
    defaultAccent: "#2E75B6",
    Component: Onyx,
  },
  vista: {
    id: "vista",
    name: "Vista",
    tagline: "Dark sidebar · photo / initials · cyan accents",
    vibe: "branded · modern",
    defaultAccent: "#38BDF8",
    Component: Vista,
  },
  mesa: {
    id: "mesa",
    name: "Mesa",
    tagline: "Two-column · sidebar · structured",
    vibe: "modern · scannable",
    defaultAccent: "#0F766E",
    Component: Mesa,
  },
  cobalt: {
    id: "cobalt",
    name: "Cobalt",
    tagline: "Blue sidebar · monogram · corporate",
    vibe: "corporate · professional",
    defaultAccent: "#1E40AF",
    Component: Cobalt,
  },
  granite: {
    id: "granite",
    name: "Granite",
    tagline: "Formal · serif · executive",
    vibe: "classic · refined",
    defaultAccent: "#1F2937",
    Component: Granite,
  },
  marble: {
    id: "marble",
    name: "Marble",
    tagline: "Elegant centered serif · editorial",
    vibe: "elegant · editorial",
    defaultAccent: "#1F2937",
    Component: Marble,
  },
  ember: {
    id: "ember",
    name: "Ember",
    tagline: "Coral accents · bold · results-led",
    vibe: "impact · warm",
    defaultAccent: "#F87171",
    Component: Ember,
  },
  meridian: {
    id: "meridian",
    name: "Meridian",
    tagline: "Vertical timeline · icons · narrative flow",
    vibe: "narrative · structured",
    defaultAccent: "#111827",
    Component: Meridian,
  },
  junction: {
    id: "junction",
    name: "Junction",
    tagline: "Tech lead · keyword pills · left accent rail",
    vibe: "engineering · modern",
    defaultAccent: "#7C3AED",
    Component: Junction,
  },
};

export const TEMPLATE_LIST: TemplateMeta[] = Object.values(TEMPLATES);

export const getTemplate = (id: string): TemplateMeta =>
  TEMPLATES[id] ?? TEMPLATES.atlas!;

export { Atlas } from "./atlas";
export { Onyx } from "./onyx";
export { Mesa } from "./mesa";
export { Granite } from "./granite";
export { Junction } from "./junction";
export { Vista } from "./vista";
export { Marble } from "./marble";
export { Ember } from "./ember";
export { Meridian } from "./meridian";
export { Cobalt } from "./cobalt";
