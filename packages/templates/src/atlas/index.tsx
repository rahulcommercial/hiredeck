/**
 * Atlas — minimal, single-column, accent-led.
 * Best for engineers, designers, generalists. ATS-friendly.
 */
import type { Resume } from "@hiredeck/schema";
import { fmtDateRange, joinLoc, trimProto } from "../_shared";

interface Props { resume: Resume }

export function Atlas({ resume }: Props) {
  const { basics, work, education, projects, skills, awards, languages } = resume;
  const accent = resume.meta?.hiredeck?.accentColor ?? "#2E75B6";

  return (
    <article
      className="mx-auto bg-white text-slate-900"
      style={{ width: "8.5in", minHeight: "11in", padding: "0.55in 0.75in",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif" }}
    >
      {/* Header */}
      <header className="mb-5">
        <h1 className="text-[28px] font-bold leading-tight tracking-tight text-slate-900">
          {basics.name || "Your Name"}
        </h1>
        {basics.label && (
          <p className="mt-1 text-[12px] font-medium uppercase tracking-[0.18em]" style={{ color: accent }}>
            {basics.label}
          </p>
        )}
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[10.5px] text-slate-600">
          {joinLoc(basics.location) && <span>{joinLoc(basics.location)}</span>}
          {basics.phone && <span className="text-slate-300">·</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.email && <span className="text-slate-300">·</span>}
          {basics.email && <span>{basics.email}</span>}
          {basics.url && <span className="text-slate-300">·</span>}
          {basics.url && <span>{trimProto(basics.url)}</span>}
        </div>
        <div className="mt-3 h-[2px] w-full" style={{ background: accent }} />
      </header>

      {basics.summary && (
        <Section title="Profile" accent={accent}>
          <p className="text-[11.5px] leading-relaxed text-slate-700">{basics.summary}</p>
        </Section>
      )}

      {work.length > 0 && (
        <Section title="Experience" accent={accent}>
          {work.map((w, i) => (
            <div key={i} className="mb-3.5 break-inside-avoid">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-[12.5px] font-semibold text-slate-900">{w.position}</div>
                  <div className="text-[11.5px] italic" style={{ color: accent }}>{w.name}</div>
                </div>
                <div className="whitespace-nowrap text-[10.5px] text-slate-500">{fmtDateRange(w.startDate, w.endDate)}</div>
              </div>
              {w.summary && <p className="mt-1 text-[11.5px] leading-relaxed text-slate-700">{w.summary}</p>}
              {w.highlights.length > 0 && (
                <ul className="mt-1 space-y-[3px]">
                  {w.highlights.map((h, j) => (
                    <li key={j} className="flex gap-2 text-[11.5px] leading-relaxed text-slate-700">
                      <span className="mt-[6px] inline-block h-[3px] w-[3px] shrink-0 rounded-full" style={{ background: accent }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {projects.length > 0 && (
        <Section title="Selected Projects" accent={accent}>
          {projects.map((p, i) => (
            <div key={i} className="mb-2 break-inside-avoid">
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-[12px] font-semibold text-slate-900">{p.name}</div>
                {p.keywords.length > 0 && <div className="text-[10.5px] italic text-slate-500">{p.keywords.join(" · ")}</div>}
              </div>
              {p.description && <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-700">{p.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {skills.length > 0 && (
        <Section title="Technical Skills" accent={accent}>
          <div className="space-y-1">
            {skills.map((s, i) => (
              <div key={i} className="text-[11.5px] leading-relaxed">
                <span className="font-semibold text-slate-900">{s.name}</span>
                {s.keywords.length > 0 && <span className="text-slate-700">{"  ·  "}{s.keywords.join(", ")}</span>}
              </div>
            ))}
          </div>
        </Section>
      )}

      {education.length > 0 && (
        <Section title="Education" accent={accent}>
          {education.map((e, i) => (
            <div key={i} className="flex items-baseline justify-between gap-4">
              <div>
                <div className="text-[12px] font-semibold text-slate-900">
                  {e.studyType}{e.area ? `, ${e.area}` : ""}
                </div>
                <div className="text-[11.5px] italic text-slate-600">{e.institution}</div>
              </div>
              <div className="whitespace-nowrap text-[10.5px] text-slate-500">{e.score ?? fmtDateRange(e.startDate, e.endDate)}</div>
            </div>
          ))}
        </Section>
      )}

      {awards.length > 0 && (
        <Section title="Recognition" accent={accent}>
          <ul className="space-y-1">
            {awards.map((a, i) => (
              <li key={i} className="text-[11.5px] leading-relaxed text-slate-700">
                <span className="font-semibold text-slate-900">{a.title}</span>
                {a.awarder && <span className="text-slate-500"> · {a.awarder}</span>}
                {a.summary && <span> — {a.summary}</span>}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {languages.length > 0 && (
        <Section title="Languages" accent={accent}>
          <p className="text-[11.5px] text-slate-700">
            {languages.map((l) => `${l.language}${l.fluency ? ` (${l.fluency})` : ""}`).join(" · ")}
          </p>
        </Section>
      )}
    </article>
  );
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mb-3">
      <h2 className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[0.22em]" style={{ color: accent }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default Atlas;
