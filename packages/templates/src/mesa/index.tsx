/**
 * Mesa — two-column with left sidebar (contact + skills + education) and
 * right main column (summary + work + projects). ATS-friendly and modern.
 */
import type { Resume } from "@hiredeck/schema";
import { fmtDateRange, joinLoc, trimProto } from "../_shared";

interface Props { resume: Resume }

export function Mesa({ resume }: Props) {
  const { basics, work, education, projects, skills, awards, languages } = resume;
  const accent = resume.meta?.hiredeck?.accentColor ?? "#2E75B6";

  return (
    <article
      className="mx-auto bg-white text-slate-900"
      style={{ width: "8.5in", minHeight: "11in", padding: "0.55in 0.6in",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif" }}
    >
      {/* Top header */}
      <header className="mb-4 pb-3" style={{ borderBottom: `3px solid ${accent}` }}>
        <h1 className="text-[30px] font-bold leading-tight tracking-tight text-slate-900">
          {basics.name || "Your Name"}
        </h1>
        {basics.label && (
          <p className="mt-0.5 text-[13px] font-medium" style={{ color: accent }}>
            {basics.label}
          </p>
        )}
      </header>

      {/* Two-column grid */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "2.7in 1fr" }}>
        {/* Sidebar */}
        <aside>
          <SidebarBlock title="Contact" accent={accent}>
            <ul className="space-y-[3px] text-[10.5px] text-slate-700">
              {joinLoc(basics.location) && <li>{joinLoc(basics.location)}</li>}
              {basics.phone && <li>{basics.phone}</li>}
              {basics.email && <li className="break-all">{basics.email}</li>}
              {basics.url && <li className="break-all">{trimProto(basics.url)}</li>}
            </ul>
          </SidebarBlock>

          {skills.length > 0 && (
            <SidebarBlock title="Skills" accent={accent}>
              <div className="space-y-2">
                {skills.map((s, i) => (
                  <div key={i}>
                    <div className="text-[11px] font-semibold text-slate-900">{s.name}</div>
                    {s.keywords.length > 0 && (
                      <div className="mt-0.5 text-[10.5px] leading-snug text-slate-600">
                        {s.keywords.join(", ")}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SidebarBlock>
          )}

          {education.length > 0 && (
            <SidebarBlock title="Education" accent={accent}>
              {education.map((e, i) => (
                <div key={i} className="mb-2">
                  <div className="text-[11px] font-semibold text-slate-900">
                    {e.studyType}{e.area ? `, ${e.area}` : ""}
                  </div>
                  <div className="text-[10.5px] italic text-slate-600">{e.institution}</div>
                  <div className="text-[10px] text-slate-500">
                    {e.score ?? fmtDateRange(e.startDate, e.endDate)}
                  </div>
                </div>
              ))}
            </SidebarBlock>
          )}

          {languages.length > 0 && (
            <SidebarBlock title="Languages" accent={accent}>
              <ul className="space-y-[2px] text-[10.5px] text-slate-700">
                {languages.map((l, i) => (
                  <li key={i}>
                    <span className="font-medium">{l.language}</span>
                    {l.fluency && <span className="text-slate-500"> · {l.fluency}</span>}
                  </li>
                ))}
              </ul>
            </SidebarBlock>
          )}

          {awards.length > 0 && (
            <SidebarBlock title="Recognition" accent={accent}>
              <ul className="space-y-1.5">
                {awards.map((a, i) => (
                  <li key={i} className="text-[10.5px] leading-snug text-slate-700">
                    <div className="font-semibold text-slate-900">{a.title}</div>
                    {a.awarder && <div className="text-slate-500">{a.awarder}</div>}
                  </li>
                ))}
              </ul>
            </SidebarBlock>
          )}
        </aside>

        {/* Main */}
        <main>
          {basics.summary && (
            <MainSection title="Profile" accent={accent}>
              <p className="text-[11.5px] leading-relaxed text-slate-700">{basics.summary}</p>
            </MainSection>
          )}

          {work.length > 0 && (
            <MainSection title="Experience" accent={accent}>
              {work.map((w, i) => (
                <div key={i} className="mb-3 break-inside-avoid">
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
                          <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full" style={{ background: accent }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </MainSection>
          )}

          {projects.length > 0 && (
            <MainSection title="Selected Projects" accent={accent}>
              {projects.map((p, i) => (
                <div key={i} className="mb-2 break-inside-avoid">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="text-[12px] font-semibold text-slate-900">{p.name}</div>
                    {p.keywords.length > 0 && <div className="text-[10.5px] italic text-slate-500">{p.keywords.slice(0, 3).join(" · ")}</div>}
                  </div>
                  {p.description && <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-700">{p.description}</p>}
                </div>
              ))}
            </MainSection>
          )}
        </main>
      </div>
    </article>
  );
}

function SidebarBlock({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mb-4">
      <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

function MainSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mb-4">
      <h2 className="mb-2 pb-1 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: accent, borderBottom: `1px solid ${accent}33` }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default Mesa;
