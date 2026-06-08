/**
 * Ember — coral accents, bold black headings, results-led bullets.
 * Inspired by modern resume.io coral templates. Great for showcasing impact.
 */
import type { Resume } from "@hiredeck/schema";
import { fmtDateRange, joinLoc, trimProto } from "../_shared";
import { MailIcon, MapPinIcon, PhoneIcon, GlobeIcon } from "../_icons";

interface Props { resume: Resume }

const CORAL = "#F87171";
const CORAL_DARK = "#EF4444";
const INK = "#111827";

export function Ember({ resume }: Props) {
  const { basics, work, education, skills, certificates, volunteer, projects, languages } = resume;
  const accent = resume.meta?.hiredeck?.accentColor ?? CORAL;

  return (
    <article
      className="mx-auto bg-white text-slate-900"
      style={{ width: "8.5in", minHeight: "11in", padding: "0.5in 0.6in",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif" }}
    >
      {/* Big name */}
      <header className="mb-3">
        <h1 className="text-[34px] font-extrabold uppercase leading-none tracking-tight" style={{ color: INK, letterSpacing: "0.02em" }}>
          {basics.name || "Your Name"}
        </h1>
        {basics.label && (
          <p className="mt-1 text-[16px] font-extrabold" style={{ color: accent }}>{basics.label}</p>
        )}
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[10.5px] text-slate-700">
          {basics.email && <span className="flex items-center gap-1.5"><MailIcon size={12} color={accent} /> {basics.email}</span>}
          {basics.phone && <span className="flex items-center gap-1.5"><PhoneIcon size={12} color={accent} /> {basics.phone}</span>}
          {joinLoc(basics.location) && <span className="flex items-center gap-1.5"><MapPinIcon size={12} color={accent} /> {joinLoc(basics.location)}</span>}
          {basics.url && <span className="flex items-center gap-1.5"><GlobeIcon size={12} color={accent} /> {trimProto(basics.url)}</span>}
        </div>
      </header>

      {/* Two columns */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "1.55fr 1fr" }}>
        {/* Left: Work + Volunteer */}
        <div>
          {basics.summary && (
            <SectionH title="Profile">
              <p className="text-[11.5px] leading-relaxed text-slate-700">{basics.summary}</p>
            </SectionH>
          )}

          {work.length > 0 && (
            <SectionH title="Work Experience">
              {work.map((w, i) => (
                <div key={i} className="mb-3 break-inside-avoid">
                  <div className="text-[13px] font-bold leading-tight" style={{ color: INK }}>{w.position}</div>
                  <div className="text-[12px] font-semibold" style={{ color: accent }}>{w.name}</div>
                  <div className="mt-0.5 flex flex-wrap gap-x-4 text-[10.5px] text-slate-600">
                    <span>📅 {fmtDateRange(w.startDate, w.endDate)}</span>
                    {w.location && <span>📍 {w.location}</span>}
                  </div>
                  {w.highlights.length > 0 && (
                    <ul className="mt-1.5 space-y-[3px]">
                      {w.highlights.map((h, j) => (
                        <li key={j} className="flex gap-2 text-[11.5px] leading-relaxed text-slate-700">
                          <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full" style={{ background: INK }} />
                          <span>{renderWithBold(h)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {w.summary && w.highlights.length === 0 && (
                    <p className="mt-1 text-[11.5px] leading-relaxed text-slate-700">{w.summary}</p>
                  )}
                </div>
              ))}
            </SectionH>
          )}

          {projects.length > 0 && (
            <SectionH title="Selected Projects">
              {projects.slice(0, 4).map((p, i) => (
                <div key={i} className="mb-2 break-inside-avoid">
                  <div className="text-[12.5px] font-bold" style={{ color: INK }}>{p.name}</div>
                  {p.description && <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-700">{p.description}</p>}
                </div>
              ))}
            </SectionH>
          )}
        </div>

        {/* Right: Education, Skills, Licenses, Activities */}
        <div>
          {education.length > 0 && (
            <SectionH title="Education">
              {education.map((e, i) => (
                <div key={i} className="mb-2">
                  <div className="text-[12px] font-bold leading-tight" style={{ color: INK }}>{e.studyType}{e.area ? `\n${e.area}` : ""}</div>
                  <div className="text-[11.5px] font-semibold" style={{ color: accent }}>{e.institution}</div>
                  <div className="mt-0.5 text-[10.5px] text-slate-600">
                    {fmtDateRange(e.startDate, e.endDate) || e.score}
                  </div>
                </div>
              ))}
            </SectionH>
          )}

          {skills.length > 0 && (
            <SectionH title="Skills">
              <ul className="space-y-1 text-[11.5px]">
                {skills.flatMap((s) =>
                  s.keywords.length > 0 ? s.keywords.slice(0, 4) : [s.name]
                ).slice(0, 10).map((k, i) => (
                  <li key={i} className="flex gap-2 leading-snug text-slate-700">
                    <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full" style={{ background: INK }} />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </SectionH>
          )}

          {certificates.length > 0 && (
            <SectionH title="Licenses & Certificates">
              <ul className="space-y-1 text-[11.5px]">
                {certificates.slice(0, 5).map((c, i) => (
                  <li key={i} className="text-slate-700 leading-snug">
                    <span className="font-semibold" style={{ color: INK }}>{c.name}</span>
                    {c.issuer && <span className="text-slate-500"> · {c.issuer}</span>}
                  </li>
                ))}
              </ul>
            </SectionH>
          )}

          {languages.length > 0 && (
            <SectionH title="Languages">
              <ul className="space-y-1 text-[11.5px]">
                {languages.map((l, i) => (
                  <li key={i} className="flex gap-2 leading-snug text-slate-700">
                    <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full" style={{ background: INK }} />
                    <span><span className="font-semibold">{l.language}</span>{l.fluency && ` · ${l.fluency}`}</span>
                  </li>
                ))}
              </ul>
            </SectionH>
          )}

          {volunteer.length > 0 && (
            <SectionH title="Activities">
              {volunteer.slice(0, 3).map((v, i) => (
                <div key={i} className="mb-1.5">
                  <div className="text-[11.5px] font-bold" style={{ color: INK }}>{v.organization}</div>
                  {v.position && <div className="text-[11px] text-slate-700">{v.position}</div>}
                </div>
              ))}
            </SectionH>
          )}
        </div>
      </div>
    </article>
  );

  // Helper to bold inline **text**
  function renderWithBold(s: string): React.ReactNode {
    const parts = s.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} style={{ color: INK }}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }
}

function SectionH({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-4 break-inside-avoid-page">
      <h2 className="mb-2 border-b-[2.5px] pb-1 text-[14px] font-extrabold uppercase tracking-wide" style={{ color: INK, borderColor: INK }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

// Suppress unused-var warning for CORAL_DARK; reserved for hover/print accent variants.
void CORAL_DARK;

export default Ember;
