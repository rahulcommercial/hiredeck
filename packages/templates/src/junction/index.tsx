/**
 * Junction — modern tech lead. Left accent rail down the page, keyword
 * pills, bold section markers. Best for engineering managers, staff/principal.
 */
import type { Resume } from "@hiredeck/schema";
import { fmtDateRange, joinLoc, trimProto } from "../_shared";

interface Props { resume: Resume }

export function Junction({ resume }: Props) {
  const { basics, work, education, projects, skills, awards, languages } = resume;
  const accent = resume.meta?.hiredeck?.accentColor ?? "#2E75B6";

  return (
    <article
      className="mx-auto bg-white text-slate-900"
      style={{ width: "8.5in", minHeight: "11in",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
        display: "grid",
        gridTemplateColumns: "0.18in 1fr",
      }}
    >
      {/* Left rail */}
      <div style={{ background: accent }} />

      {/* Content */}
      <div style={{ padding: "0.55in 0.7in 0.55in 0.55in" }}>
        <header className="mb-5">
          <h1 className="text-[30px] font-extrabold leading-tight tracking-tight text-slate-900">
            {basics.name || "Your Name"}
          </h1>
          {basics.label && (
            <p className="mt-1 text-[13px] font-medium text-slate-700">{basics.label}</p>
          )}
          <div className="mt-2.5 flex flex-wrap gap-x-2 gap-y-1 text-[10.5px] text-slate-600">
            {joinLoc(basics.location) && <Chip>{joinLoc(basics.location)}</Chip>}
            {basics.phone && <Chip>{basics.phone}</Chip>}
            {basics.email && <Chip>{basics.email}</Chip>}
            {basics.url && <Chip>{trimProto(basics.url)}</Chip>}
          </div>
        </header>

        {basics.summary && (
          <RailSection title="Profile" accent={accent}>
            <p className="text-[11.5px] leading-relaxed text-slate-700">{basics.summary}</p>
          </RailSection>
        )}

        {work.length > 0 && (
          <RailSection title="Experience" accent={accent}>
            {work.map((w, i) => (
              <div key={i} className="mb-3 break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-[12.5px] font-bold text-slate-900">{w.position}</div>
                    <div className="text-[11.5px]" style={{ color: accent }}>{w.name}</div>
                  </div>
                  <div className="whitespace-nowrap rounded-full px-2 py-[1px] text-[10px] font-semibold" style={{ background: `${accent}1A`, color: accent }}>
                    {fmtDateRange(w.startDate, w.endDate)}
                  </div>
                </div>
                {w.summary && <p className="mt-1 text-[11.5px] leading-relaxed text-slate-700">{w.summary}</p>}
                {w.highlights.length > 0 && (
                  <ul className="mt-1 space-y-[3px]">
                    {w.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2 text-[11.5px] leading-relaxed text-slate-700">
                        <span className="mt-1 inline-block h-[7px] w-[2px] shrink-0" style={{ background: accent }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </RailSection>
        )}

        {projects.length > 0 && (
          <RailSection title="Selected Projects" accent={accent}>
            {projects.map((p, i) => (
              <div key={i} className="mb-2 break-inside-avoid">
                <div className="text-[12px] font-bold text-slate-900">{p.name}</div>
                {p.description && <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-700">{p.description}</p>}
                {p.keywords.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {p.keywords.map((k, j) => (
                      <span key={j} className="rounded px-1.5 py-[1px] text-[9.5px] font-medium" style={{ background: `${accent}14`, color: accent }}>
                        {k}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </RailSection>
        )}

        {skills.length > 0 && (
          <RailSection title="Skills" accent={accent}>
            <div className="space-y-1.5">
              {skills.map((s, i) => (
                <div key={i} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[11px] font-bold text-slate-900">{s.name}</span>
                  {s.keywords.map((k, j) => (
                    <span key={j} className="rounded px-1.5 py-[1px] text-[10px] font-medium" style={{ background: "#F1F5F9", color: "#334155" }}>
                      {k}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </RailSection>
        )}

        {education.length > 0 && (
          <RailSection title="Education" accent={accent}>
            {education.map((e, i) => (
              <div key={i} className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-[12px] font-bold text-slate-900">
                    {e.studyType}{e.area ? `, ${e.area}` : ""}
                  </div>
                  <div className="text-[11px] text-slate-600">{e.institution}</div>
                </div>
                <div className="whitespace-nowrap text-[10.5px] text-slate-500">
                  {e.score ?? fmtDateRange(e.startDate, e.endDate)}
                </div>
              </div>
            ))}
          </RailSection>
        )}

        {awards.length > 0 && (
          <RailSection title="Recognition" accent={accent}>
            <ul className="space-y-1">
              {awards.map((a, i) => (
                <li key={i} className="text-[11.5px] leading-relaxed text-slate-700">
                  <span className="font-bold text-slate-900">{a.title}</span>
                  {a.awarder && <span className="text-slate-500"> · {a.awarder}</span>}
                  {a.summary && <span> — {a.summary}</span>}
                </li>
              ))}
            </ul>
          </RailSection>
        )}

        {languages.length > 0 && (
          <RailSection title="Languages" accent={accent}>
            <p className="text-[11.5px] text-slate-700">
              {languages.map((l) => `${l.language}${l.fluency ? ` (${l.fluency})` : ""}`).join("  ·  ")}
            </p>
          </RailSection>
        )}
      </div>
    </article>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-[1px] text-[10px] font-medium text-slate-700">
      {children}
    </span>
  );
}

function RailSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mb-4 break-inside-avoid-page">
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-block h-[2px] w-4" style={{ background: accent }} />
        <h2 className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default Junction;
