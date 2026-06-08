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
    vibe: "clean · minimal · accent",
    defaultAccent: "#2E75B6",
    Component: Atlas,
  },
  onyx: {
    id: "onyx",
    name: "Onyx",
    tagline: "Dark hero · numbered sections · premium",
    vibe: "bold · executive · branded",
    defaultAccent: "#2E75B6",
    Component: Onyx,
  },
  mesa: {
    id: "mesa",
    name: "Mesa",
    tagline: "Two-column · sidebar · structured",
    vibe: "modern · organised · scannable",
    defaultAccent: "#0F766E",
    Component: Mesa,
  },
  granite: {
    id: "granite",
    name: "Granite",
    tagline: "Formal · serif · executive",
    vibe: "classic · refined · timeless",
    defaultAccent: "#1F2937",
    Component: Granite,
  },
  junction: {
    id: "junction",
    name: "Junction",
    tagline: "Tech lead · keyword pills · left accent rail",
    vibe: "engineering · modern · confident",
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
