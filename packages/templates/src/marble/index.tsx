/**
 * Marble — elegant centered serif with wide letter-spacing and decorative
 * horizontal rules. Inspired by classic editorial / wedding-stationery resumes.
 */
import type { Resume } from "@hiredeck/schema";
import { fmtDateRange, joinLoc, trimProto } from "../_shared";

interface Props { resume: Resume }

const SERIF = "'Cormorant Garamond', 'EB Garamond', Georgia, 'Times New Roman', serif";
const SANS = "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";
const STONE = "#1F2937";
const DIM = "#6B7280";

export function Marble({ resume }: Props) {
  const { basics, work, education, skills, languages, projects, awards } = resume;
  const accent = resume.meta?.hiredeck?.accentColor ?? "#1F2937";

  return (
    <article
      className="mx-auto bg-white text-stone-900"
      style={{ width: "8.5in", minHeight: "11in", padding: "0.55in 0.7in", fontFamily: SERIF }}
    >
      {/* Decorative top rule */}
      <div className="mb-4 h-px bg-stone-400" />

      {/* Centered name */}
      <header className="mb-5 text-center">
        <h1
          className="text-[40px] font-light leading-none text-stone-900"
          style={{ fontFamily: SERIF, letterSpacing: "0.18em" }}
        >
          {(basics.name || "Your Name").toUpperCase()}
        </h1>
        {basics.label && (
          <p
            className="mt-3 text-[11px] uppercase text-stone-600"
            style={{ fontFamily: SANS, letterSpacing: "0.28em" }}
          >
            {basics.label}
          </p>
        )}
      </header>

      {/* Decorative bottom rule */}
      <div className="mb-5 h-px bg-stone-400" />

      {/* Two columns */}
      <div className="grid gap-6" style={{ gridTemplateColumns: "2.2in 1fr" }}>
        {/* Sidebar */}
        <aside>
          <SideBlock title="Contact" accent={accent}>
            <ul className="space-y-1 text-[10.5px] text-stone-700" style={{ fontFamily: SANS }}>
              {basics.phone && <li>{basics.phone}</li>}
              {basics.email && <li className="break-all">{basics.email}</li>}
              {joinLoc(basics.location) && <li>{joinLoc(basics.location)}</li>}
              {basics.url && <li className="break-all">{trimProto(basics.url)}</li>}
            </ul>
          </SideBlock>

          {education.length > 0 && (
            <SideBlock title="Education" accent={accent}>
              {education.map((e, i) => (
                <div key={i} className="mb-2.5">
                  <div className="text-[10.5px] uppercase tracking-[0.15em] text-stone-500" style={{ fontFamily: SANS }}>
                    {fmtDateRange(e.startDate, e.endDate)}
                  </div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-900" style={{ fontFamily: SANS }}>
                    {e.institution}
                  </div>
                  <ul className="ml-3 mt-0.5 text-[11px] text-stone-700">
                    <li className="flex gap-1.5 leading-snug">
                      <span className="text-stone-400">•</span>
                      <span>{e.studyType}{e.area ? `, ${e.area}` : ""}</span>
                    </li>
                    {e.score && (
                      <li className="flex gap-1.5 leading-snug">
                        <span className="text-stone-400">•</span>
                        <span>{e.score}</span>
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </SideBlock>
          )}

          {skills.length > 0 && (
            <SideBlock title="Skills" accent={accent}>
              <ul className="space-y-[3px] text-[11px] text-stone-700">
                {skills.flatMap((s) =>
                  s.keywords.length > 0 ? s.keywords : [s.name]
                ).slice(0, 10).map((k, i) => (
                  <li key={i} className="flex gap-1.5 leading-snug">
                    <span className="text-stone-400">•</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </SideBlock>
          )}

          {languages.length > 0 && (
            <SideBlock title="Languages" accent={accent}>
              <ul className="space-y-[3px] text-[11px] text-stone-700">
                {languages.map((l, i) => (
                  <li key={i} className="flex gap-1.5 leading-snug">
                    <span className="text-stone-400">•</span>
                    <span>{l.language}{l.fluency ? `: ${l.fluency}` : ""}</span>
                  </li>
                ))}
              </ul>
            </SideBlock>
          )}
        </aside>

        {/* Main */}
        <main>
          {basics.summary && (
            <MainBlock title="Profile Summary" accent={accent}>
              <p className="text-[11.5px] leading-relaxed text-stone-800" style={{ fontFamily: SERIF }}>
                {basics.summary}
              </p>
            </MainBlock>
          )}

          {work.length > 0 && (
            <MainBlock title="Work Experience" accent={accent}>
              {work.map((w, i) => (
                <div key={i} className="mb-3.5 break-inside-avoid">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="text-[12.5px] font-semibold text-stone-900" style={{ fontFamily: SANS }}>
                      {w.name}
                    </div>
                    <div className="text-[10.5px] uppercase tracking-[0.12em] text-stone-500" style={{ fontFamily: SANS }}>
                      {fmtDateRange(w.startDate, w.endDate)}
                    </div>
                  </div>
                  <div className="text-[11.5px] italic text-stone-700" style={{ fontFamily: SERIF }}>{w.position}</div>
                  {w.highlights.length > 0 && (
                    <ul className="mt-1 space-y-[3px]">
                      {w.highlights.map((h, j) => (
                        <li key={j} className="flex gap-2 text-[11.5px] leading-relaxed text-stone-800" style={{ fontFamily: SERIF }}>
                          <span className="text-stone-400">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {w.summary && w.highlights.length === 0 && (
                    <p className="mt-1 text-[11.5px] leading-relaxed text-stone-800" style={{ fontFamily: SERIF }}>{w.summary}</p>
                  )}
                </div>
              ))}
            </MainBlock>
          )}

          {projects.length > 0 && (
            <MainBlock title="Selected Projects" accent={accent}>
              {projects.slice(0, 4).map((p, i) => (
                <div key={i} className="mb-2 break-inside-avoid">
                  <div className="text-[12px] font-semibold text-stone-900" style={{ fontFamily: SANS }}>{p.name}</div>
                  {p.description && <p className="mt-0.5 text-[11.5px] leading-relaxed text-stone-800" style={{ fontFamily: SERIF }}>{p.description}</p>}
                </div>
              ))}
            </MainBlock>
          )}

          {awards.length > 0 && (
            <MainBlock title="Honours" accent={accent}>
              <ul className="space-y-1">
                {awards.map((a, i) => (
                  <li key={i} className="text-[11.5px] leading-relaxed text-stone-800" style={{ fontFamily: SERIF }}>
                    <span className="font-semibold">{a.title}</span>
                    {a.awarder && <span className="italic" style={{ color: DIM }}>, {a.awarder}</span>}
                  </li>
                ))}
              </ul>
            </MainBlock>
          )}
        </main>
      </div>
    </article>
  );
}

function SideBlock({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-full" style={{ background: `${accent}1A`, border: `1px solid ${accent}66` }} />
        <h3 className="text-[12px] font-medium uppercase tracking-[0.28em]" style={{ color: STONE, fontFamily: SANS }}>{title}</h3>
      </div>
      {children}
    </section>
  );
}

function MainBlock({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="mb-4">
      <div className="mb-2.5 flex items-center gap-2">
        <span className="inline-block h-3 w-3 rounded-full" style={{ background: `${accent}1A`, border: `1px solid ${accent}66` }} />
        <h2 className="text-[13px] font-medium uppercase tracking-[0.28em]" style={{ color: STONE, fontFamily: SANS }}>{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default Marble;
