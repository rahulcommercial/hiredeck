/**
 * Vista — dark sidebar with photo / initials circle.
 * Inspired by modern resume.io / Canva templates. Strong personal branding.
 */
import type { Resume } from "@hiredeck/schema";
import { fmtDateRange, initials, joinLoc } from "../_shared";
import { MailIcon, MapPinIcon, PhoneIcon } from "../_icons";

interface Props { resume: Resume }

const SIDEBAR_BG = "#1F2937";
const SIDEBAR_TEXT = "#F1F5F9";
const SIDEBAR_DIM = "#94A3B8";
const ACCENT_CYAN = "#38BDF8";

export function Vista({ resume }: Props) {
  const { basics, work, education, skills, languages, interests, projects } = resume;
  const accent = resume.meta?.hiredeck?.accentColor ?? ACCENT_CYAN;

  return (
    <article
      className="mx-auto bg-white text-slate-900"
      style={{
        width: "8.5in",
        minHeight: "11in",
        display: "grid",
        gridTemplateColumns: "2.8in 1fr",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
      }}
    >
      {/* ============== Sidebar ============== */}
      <aside style={{ background: SIDEBAR_BG, color: SIDEBAR_TEXT, padding: "0.55in 0.4in" }}>
        {/* Photo / initials disc */}
        <div className="mx-auto mb-5" style={{ width: "1.7in", height: "1.7in" }}>
          {basics.image ? (
            <img
              src={basics.image}
              alt={basics.name}
              className="h-full w-full rounded-full object-cover"
              style={{ border: "4px solid #334155" }}
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center rounded-full text-[42px] font-bold"
              style={{
                background: "linear-gradient(135deg, #334155, #1E293B)",
                color: accent,
                border: "4px solid #334155",
              }}
            >
              {initials(basics.name)}
            </div>
          )}
        </div>

        {/* Name + label */}
        <div className="mb-6 text-center">
          <h1 className="text-[22px] font-bold leading-tight text-white">
            {basics.name || "Your Name"}
          </h1>
          {basics.label && (
            <p className="mt-1 text-[12px]" style={{ color: accent }}>{basics.label}</p>
          )}
        </div>

        {/* Contact */}
        <SidebarSection title="Contact" accent={accent}>
          <ul className="space-y-2 text-[10.5px]" style={{ color: SIDEBAR_TEXT }}>
            {basics.phone && (
              <li className="flex items-start gap-2">
                <PhoneIcon size={12} color={accent} style={{ marginTop: 2 }} />
                <span>{basics.phone}</span>
              </li>
            )}
            {basics.email && (
              <li className="flex items-start gap-2">
                <MailIcon size={12} color={accent} style={{ marginTop: 2 }} />
                <span className="break-all">{basics.email}</span>
              </li>
            )}
            {joinLoc(basics.location) && (
              <li className="flex items-start gap-2">
                <MapPinIcon size={12} color={accent} style={{ marginTop: 2 }} />
                <span>{joinLoc(basics.location)}</span>
              </li>
            )}
          </ul>
        </SidebarSection>

        {/* Skills */}
        {skills.length > 0 && (
          <SidebarSection title="Skills" accent={accent}>
            <ul className="space-y-1.5 text-[10.5px]">
              {skills.flatMap((s) =>
                s.keywords.length > 0
                  ? s.keywords.slice(0, 3).map((k) => ({ key: `${s.name}-${k}`, label: k }))
                  : [{ key: s.name, label: s.name }]
              ).slice(0, 10).map(({ key, label }) => (
                <li key={key} className="flex items-baseline gap-2" style={{ color: SIDEBAR_TEXT }}>
                  <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full border" style={{ borderColor: accent }} />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </SidebarSection>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <SidebarSection title="Languages" accent={accent}>
            <ul className="space-y-1 text-[10.5px]">
              {languages.map((l, i) => (
                <li key={i} className="flex items-baseline gap-2" style={{ color: SIDEBAR_TEXT }}>
                  <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full border" style={{ borderColor: accent }} />
                  <span><span className="font-semibold">{l.language}</span>{l.fluency && <span style={{ color: SIDEBAR_DIM }}>  ·  {l.fluency}</span>}</span>
                </li>
              ))}
            </ul>
          </SidebarSection>
        )}

        {/* Hobbies / interests */}
        {interests.length > 0 && (
          <SidebarSection title="Interests" accent={accent}>
            <ul className="space-y-1 text-[10.5px]">
              {interests.slice(0, 5).map((i, idx) => (
                <li key={idx} className="flex items-baseline gap-2" style={{ color: SIDEBAR_TEXT }}>
                  <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full border" style={{ borderColor: accent }} />
                  <span className="font-semibold">{i.name}</span>
                </li>
              ))}
            </ul>
          </SidebarSection>
        )}
      </aside>

      {/* ============== Main ============== */}
      <main style={{ padding: "0.55in 0.6in" }}>
        {basics.summary && (
          <MainSection title="Profile" accent={accent}>
            <p className="text-[11.5px] leading-relaxed text-slate-700">{basics.summary}</p>
          </MainSection>
        )}

        {work.length > 0 && (
          <MainSection title="Work Experience" accent={accent}>
            {work.map((w, i) => (
              <div key={i} className="mb-3.5 break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-[13px] font-bold text-slate-900">{w.position}</div>
                    <div className="text-[11px] italic text-slate-600">{w.name}{w.location ? ` · ${w.location}` : ""}</div>
                  </div>
                  <div className="whitespace-nowrap text-[10.5px] font-medium" style={{ color: accent }}>{fmtDateRange(w.startDate, w.endDate)}</div>
                </div>
                {w.summary && <p className="mt-1 text-[11.5px] leading-relaxed text-slate-700">{w.summary}</p>}
                {w.highlights.length > 0 && (
                  <ul className="mt-1 space-y-[3px]">
                    {w.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2 text-[11.5px] leading-relaxed text-slate-700">
                        <span className="mt-1.5 inline-block h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: accent }} />
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
            {projects.slice(0, 4).map((p, i) => (
              <div key={i} className="mb-2 break-inside-avoid">
                <div className="text-[12px] font-bold text-slate-900">{p.name}</div>
                {p.description && <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-700">{p.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {education.length > 0 && (
          <MainSection title="Education" accent={accent}>
            {education.map((e, i) => (
              <div key={i} className="mb-2">
                <div className="text-[12.5px] font-bold text-slate-900">{e.studyType}{e.area ? `, ${e.area}` : ""}</div>
                <div className="text-[11px] italic text-slate-600">{e.institution}</div>
                <div className="text-[10.5px]" style={{ color: accent }}>
                  {fmtDateRange(e.startDate, e.endDate) || e.score}
                </div>
              </div>
            ))}
          </MainSection>
        )}
      </main>
    </article>
  );
}

function SidebarSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-[0.2em] text-white">{title}</h2>
      <div className="mb-2 h-[2px] w-8" style={{ background: accent }} />
      {children}
    </section>
  );
}

function MainSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mb-4">
      <h2 className="mb-2 text-[14px] font-bold uppercase tracking-wide text-slate-900">{title}</h2>
      <div className="mb-2 h-[2px] w-10" style={{ background: accent }} />
      {children}
    </section>
  );
}

export default Vista;
