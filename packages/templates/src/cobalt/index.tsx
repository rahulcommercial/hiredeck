/**
 * Cobalt — blue sidebar with monogram tile. Clean corporate look,
 * inspired by classic enterprise / consulting resumes.
 */
import type { Resume } from "@hiredeck/schema";
import { fmtDateRange, initials, joinLoc, trimProto } from "../_shared";

interface Props { resume: Resume }

const BLUE = "#1E40AF";
const BLUE_DEEP = "#1E3A8A";
const INK = "#0F172A";

export function Cobalt({ resume }: Props) {
  const { basics, work, education, skills, languages, certificates, projects } = resume;
  const accent = resume.meta?.hiredeck?.accentColor ?? BLUE;

  return (
    <article
      className="mx-auto bg-white text-slate-900"
      style={{ width: "8.5in", minHeight: "11in",
        display: "grid",
        gridTemplateColumns: "2.6in 1fr",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif" }}
    >
      {/* ============== Sidebar ============== */}
      <aside style={{ background: accent, color: "white", padding: "0.55in 0.4in" }}>
        {/* Monogram tile */}
        <div
          className="mb-6 flex items-center justify-center"
          style={{
            width: "1.4in",
            height: "1.4in",
            background: "white",
            color: accent,
            fontSize: 44,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          {initials(basics.name)}
        </div>

        <SideHeading>Contact</SideHeading>
        <ul className="mb-5 space-y-1 text-[10.5px]">
          {basics.email && <li className="break-all">{basics.email}</li>}
          {basics.phone && <li>{basics.phone}</li>}
          {joinLoc(basics.location) && <li>{joinLoc(basics.location)}</li>}
          {basics.url && <li className="break-all">{trimProto(basics.url)}</li>}
        </ul>

        {skills.length > 0 && (
          <>
            <SideHeading>Skills</SideHeading>
            <ul className="mb-5 space-y-1 text-[11px]">
              {skills.slice(0, 6).map((s, i) => (
                <li key={i} className="flex gap-2 leading-snug">
                  <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-white" />
                  <span>
                    <span className="font-semibold">{s.name}</span>
                    {s.keywords.length > 0 && <span style={{ color: "#DBEAFE" }}>{": " + s.keywords.slice(0, 4).join(", ")}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}

        {languages.length > 0 && (
          <>
            <SideHeading>Languages</SideHeading>
            <ul className="mb-5 space-y-[3px] text-[11px]">
              {languages.map((l, i) => (
                <li key={i} className="leading-snug">
                  <span className="font-semibold">{l.language}: </span>
                  <span style={{ color: "#DBEAFE" }}>{l.fluency ?? ""}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {certificates.length > 0 && (
          <>
            <SideHeading>Certificates</SideHeading>
            <ul className="mb-5 space-y-1.5 text-[10.5px]">
              {certificates.slice(0, 4).map((c, i) => (
                <li key={i} className="leading-snug">
                  <span className="font-semibold">{c.name}</span>
                  {c.issuer && <div style={{ color: "#DBEAFE" }}>{c.issuer}</div>}
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>

      {/* ============== Main ============== */}
      <main style={{ padding: "0.55in 0.55in" }}>
        {/* Top header */}
        <header className="mb-5">
          <h1 className="text-[30px] font-extrabold leading-tight tracking-tight" style={{ color: INK }}>
            {basics.name || "Your Name"}
          </h1>
          {basics.label && (
            <p className="mt-0.5 text-[13.5px] text-slate-700">{basics.label}</p>
          )}
          <div className="mt-2 h-[2px] w-32" style={{ background: accent }} />
        </header>

        {basics.summary && (
          <MainSection title="Summary" accent={accent}>
            <p className="text-[11.5px] leading-relaxed text-slate-700">{renderWithBold(basics.summary, INK)}</p>
          </MainSection>
        )}

        {work.length > 0 && (
          <MainSection title="Experience" accent={accent}>
            {work.map((w, i) => (
              <div key={i} className="mb-3 break-inside-avoid">
                <div className="text-[13px] font-bold leading-tight" style={{ color: INK }}>
                  {w.name} <span className="font-normal text-slate-500">|</span> {w.position}
                </div>
                <div className="text-[10.5px] font-semibold text-slate-600">{fmtDateRange(w.startDate, w.endDate)}</div>
                {w.highlights.length > 0 && (
                  <ul className="mt-1 space-y-[3px]">
                    {w.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2 text-[11.5px] leading-relaxed text-slate-700">
                        <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-slate-700" />
                        <span>{renderWithBold(h, INK)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {w.summary && w.highlights.length === 0 && (
                  <p className="mt-1 text-[11.5px] leading-relaxed text-slate-700">{w.summary}</p>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {projects.length > 0 && (
          <MainSection title="Projects" accent={accent}>
            {projects.slice(0, 4).map((p, i) => (
              <div key={i} className="mb-2 break-inside-avoid">
                <div className="text-[12.5px] font-bold" style={{ color: INK }}>{p.name}</div>
                {p.description && <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-700">{p.description}</p>}
              </div>
            ))}
          </MainSection>
        )}

        {education.length > 0 && (
          <MainSection title="Education" accent={accent}>
            {education.map((e, i) => (
              <div key={i} className="mb-2">
                <div className="text-[12.5px] font-bold" style={{ color: INK }}>{e.studyType}{e.area ? `, ${e.area}` : ""}</div>
                <div className="text-[11.5px] italic text-slate-700">{e.institution}</div>
                <div className="text-[10.5px] text-slate-600">{fmtDateRange(e.startDate, e.endDate) || e.score}</div>
              </div>
            ))}
          </MainSection>
        )}
      </main>
    </article>
  );

  function renderWithBold(s: string, ink: string): React.ReactNode {
    const parts = s.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} style={{ color: ink }}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }
}

function SideHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-[12.5px] font-extrabold uppercase tracking-[0.2em] text-white">
      {children}
    </h3>
  );
}

function MainSection({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mb-4 break-inside-avoid-page">
      <h2 className="mb-1.5 text-[14px] font-extrabold uppercase tracking-wide" style={{ color: INK }}>
        {title}
      </h2>
      <div className="mb-2 h-[1px] w-full" style={{ background: `${accent}55` }} />
      {children}
    </section>
  );
}

void BLUE_DEEP; // reserved for future hover/print accent variants

export default Cobalt;
