/**
 * Onyx — premium dark hero, numbered sections, gold accents.
 * Best for senior engineers, tech leads, candidates with award-worthy work.
 */
import type { Resume } from "@hiredeck/schema";
import { fmtDateRange, joinLoc } from "../_shared";

interface Props { resume: Resume }

const NAVY = "#0E2A47";
const GOLD = "#C9A227";
const SUB = "#BBD0E5";

export function Onyx({ resume }: Props) {
  const { basics, work, education, projects, skills, awards, languages } = resume;
  const accent = resume.meta?.hiredeck?.accentColor ?? "#2E75B6";

  return (
    <article
      className="mx-auto bg-white text-slate-900"
      style={{ width: "8.5in", minHeight: "11in",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif" }}
    >
      {/* Hero band */}
      <header
        style={{ background: NAVY, padding: "0.5in 0.75in", color: "white" }}
      >
        <h1 className="text-[32px] font-bold leading-tight tracking-tight text-white">
          {basics.name || "Your Name"}
        </h1>
        {basics.label && (
          <p className="mt-1.5 text-[14px] text-white">
            {basics.label.split(/\s·\s|\s—\s|\s\|\s/).map((part, i, arr) => (
              <span key={i}>
                <span style={{ color: i === 0 ? "white" : SUB }}>{part}</span>
                {i < arr.length - 1 && <span style={{ color: SUB }}>  ·  </span>}
              </span>
            ))}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10.5px]" style={{ color: "white" }}>
          {joinLoc(basics.location) && <span>{joinLoc(basics.location)}</span>}
          {basics.phone && <span style={{ color: SUB }}>|</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.email && <span style={{ color: SUB }}>|</span>}
          {basics.email && <span>{basics.email}</span>}
        </div>
      </header>

      {/* Body */}
      <div style={{ padding: "0.4in 0.75in" }}>
        {basics.summary && (
          <NumberedSection num="01" title="Profile" accent={accent}>
            <p className="text-[11.5px] leading-relaxed text-slate-700">{basics.summary}</p>
          </NumberedSection>
        )}

        {work.length > 0 && (
          <NumberedSection num="02" title="Experience" accent={accent}>
            {work.map((w, i) => (
              <div key={i} className="mb-3 break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-[12.5px] font-bold text-slate-900">{w.position}</div>
                    <div className="text-[11.5px] italic" style={{ color: accent }}>{w.name}</div>
                  </div>
                  <div className="whitespace-nowrap text-[10.5px] text-slate-500">{fmtDateRange(w.startDate, w.endDate)}</div>
                </div>
                {w.summary && <p className="mt-1 text-[11.5px] leading-relaxed text-slate-700">{w.summary}</p>}
                {w.highlights.length > 0 && (
                  <ul className="mt-1 space-y-[3px]">
                    {w.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2 text-[11.5px] leading-relaxed text-slate-700">
                        <span className="mt-[7px] inline-block h-[2px] w-[8px] shrink-0" style={{ background: GOLD }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </NumberedSection>
        )}

        {projects.length > 0 && (
          <NumberedSection num="03" title="Selected Projects" accent={accent}>
            {projects.map((p, i) => (
              <div key={i} className="mb-2 break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <div className="text-[12px] font-bold text-slate-900">{p.name}</div>
                  {p.keywords.length > 0 && <div className="text-[10px] italic text-slate-500">{p.keywords.join(" · ")}</div>}
                </div>
                {p.description && <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-700">{p.description}</p>}
              </div>
            ))}
          </NumberedSection>
        )}

        {skills.length > 0 && (
          <NumberedSection num="04" title="Technical Skills" accent={accent}>
            <div className="space-y-[3px]">
              {skills.map((s, i) => (
                <div key={i} className="text-[11.5px] leading-relaxed">
                  <span className="font-bold" style={{ color: NAVY }}>{s.name}</span>
                  {s.keywords.length > 0 && <span className="text-slate-700">{"  ·  "}{s.keywords.join(", ")}</span>}
                </div>
              ))}
            </div>
          </NumberedSection>
        )}

        {education.length > 0 && (
          <NumberedSection num="05" title="Education" accent={accent}>
            {education.map((e, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-[12px] font-bold text-slate-900">
                    {e.studyType}{e.area ? `, ${e.area}` : ""}
                  </div>
                  <div className="text-[11.5px] italic text-slate-600">{e.institution}</div>
                </div>
                <div className="whitespace-nowrap text-[10.5px] text-slate-500">{e.score ?? fmtDateRange(e.startDate, e.endDate)}</div>
              </div>
            ))}
          </NumberedSection>
        )}

        {awards.length > 0 && (
          <NumberedSection num="06" title="Recognition" accent={accent}>
            <ul className="space-y-1">
              {awards.map((a, i) => (
                <li key={i} className="text-[11.5px] leading-relaxed text-slate-700">
                  <span className="font-bold text-slate-900">{a.title}</span>
                  {a.awarder && <span className="text-slate-500"> · {a.awarder}</span>}
                  {a.summary && <span> — {a.summary}</span>}
                </li>
              ))}
            </ul>
          </NumberedSection>
        )}

        {languages.length > 0 && (
          <NumberedSection num="07" title="Languages" accent={accent}>
            <p className="text-[11.5px] text-slate-700">
              {languages.map((l) => `${l.language}${l.fluency ? ` (${l.fluency})` : ""}`).join("  ·  ")}
            </p>
          </NumberedSection>
        )}
      </div>
    </article>
  );
}

function NumberedSection({
  num, title, accent, children,
}: { num: string; title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mb-4 break-inside-avoid-page">
      <div
        className="mb-2 flex items-center gap-3 px-2 py-1.5"
        style={{
          background: "#F4F7FB",
          borderLeft: `3px solid ${accent}`,
          borderBottom: `1px solid ${accent}33`,
        }}
      >
        <span className="text-[11px] font-bold tracking-[0.2em]" style={{ color: GOLD }}>{num}</span>
        <span className="text-[11.5px] font-bold uppercase tracking-[0.22em]" style={{ color: NAVY }}>{title}</span>
      </div>
      {children}
    </section>
  );
}

export default Onyx;
