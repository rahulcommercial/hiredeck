"use client";

import { TEMPLATE_LIST, type TemplateMeta } from "@hiredeck/templates";
import type { Resume } from "@hiredeck/schema";

interface Props {
  resume: Resume;
  activeId: string;
  onSelect: (id: string) => void;
}

/**
 * Horizontal scrollable strip of template thumbnails. Each thumbnail
 * renders the actual template at 0.22× scale with the user's real data,
 * so the picker always reflects what the export will look like.
 */
export function TemplatePicker({ resume, activeId, onSelect }: Props) {
  return (
    <div className="border-b border-slate-200 bg-slate-50 print:hidden">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="mb-2 flex items-baseline justify-between">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
            Templates
          </h3>
          <p className="text-[11px] text-slate-500">
            Click a template to switch · changes export instantly
          </p>
        </div>
        <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2">
          {TEMPLATE_LIST.map((t) => (
            <Thumb
              key={t.id}
              meta={t}
              resume={resume}
              active={t.id === activeId}
              onSelect={() => onSelect(t.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Thumb({
  meta, resume, active, onSelect,
}: { meta: TemplateMeta; resume: Resume; active: boolean; onSelect: () => void }) {
  const { Component } = meta;
  // Thumb dimensions: render at 0.22× of 8.5"×11" letter
  // 8.5" ≈ 816px at 96dpi → thumb width 180px (scale ≈ 0.22)
  const SCALE = 0.22;
  const THUMB_W = 180;
  const THUMB_H = 230;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 bg-white text-left shadow-sm transition-all hover:shadow-md ${
        active
          ? "border-sky-500 ring-2 ring-sky-200"
          : "border-slate-200 hover:border-slate-300"
      }`}
      style={{ width: THUMB_W }}
    >
      <div
        className="overflow-hidden bg-white"
        style={{ width: THUMB_W, height: THUMB_H, pointerEvents: "none" }}
      >
        <div
          style={{
            width: 816,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
          }}
        >
          <Component resume={resume} />
        </div>
      </div>
      <div className="border-t border-slate-100 bg-white px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="text-[12px] font-semibold text-slate-900">{meta.name}</div>
          {active && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
              ● Active
            </span>
          )}
        </div>
        <div className="mt-0.5 text-[10px] leading-snug text-slate-500">{meta.tagline}</div>
      </div>
    </button>
  );
}
