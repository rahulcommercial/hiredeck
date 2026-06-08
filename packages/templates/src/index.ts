/**
 * Template registry. Add new templates here.
 */
import type { Resume } from "@hiredeck/schema";
import type { ComponentType } from "react";
import { Atlas } from "./atlas";

export interface TemplateMeta {
  id: string;
  name: string;
  tagline: string;
  /** Comma-separated style hints for the picker UI. */
  vibe: string;
  Component: ComponentType<{ resume: Resume }>;
}

export const TEMPLATES: Record<string, TemplateMeta> = {
  atlas: {
    id: "atlas",
    name: "Atlas",
    tagline: "Modern, minimal, single-column.",
    vibe: "clean · minimal · accent",
    Component: Atlas,
  },
};

export const getTemplate = (id: string): TemplateMeta =>
  TEMPLATES[id] ?? TEMPLATES.atlas!;

export { Atlas } from "./atlas";
