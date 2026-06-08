/**
 * Granite — formal executive serif. Centered header, classic typography.
 * Best for finance, consulting, legal, executive roles.
 */
import type { Resume } from "@hiredeck/schema";
import { fmtDateRange, joinLoc, trimProto } from "../_shared";

interface Props { resume: Resume }

const SERIF = "'Cormorant Garamond', 'EB Garamond', Georgia, 'Times New Roman', serif";

export function Granite({ resume }: Props) {
  const { basics, work, education, projects, skills, awards, languages } = resume;

  return (
    <article
      className="mx-auto bg-white text-stone-900"
      style={{ width: "8.5in", minHeight: "11in", padding: "0.7in 0.85in", fontFamily: SERIF }}
    >
      {/* Centered header */}
      <header className="mb-5 text-center">
        <h1 className="text-[34px] font-semibold leading-tight tracking-wide text-stone-900" style={{ fontFamily: SERIF }}>
          {basics.name || "Your Name"}
        </h1>
        {basics.label && (
          <p className="mt-1 text-[12.5px] italic uppercase tracking-[0.25em] text-stone-600">
            {basics.label}
          </p>
        )}
        <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10.5px] text-stone-700" style={{ fontFamily: "Georgia, serif" }}>
          {joinLoc(basics.location) && <span>{joinLoc(basics.location)}</span>}
          {basics.phone && <span>·</span>}
          {basics.phone && <span>{basics.phone}</span>}
          {basics.email && <span>·</span>}
          {basics.email && <span>{basics.email}</span>}
          {basics.url && <span>·</span>}
          {basics.url && <span>{trimProto(basics.url)}</span>}
        </div>
        <div className="mx-auto mt-4 h-px w-24 bg-stone-400" />
      </header>

      {basics.summary && (
        <FormalSection title="Profile">
          <p className="text-[12px] leading-relaxed text-stone-800" style={{ fontFamily: SERIF }}>
            {basics.summary}
          </p>
        </FormalSection>
      )}

      {work.length > 0 && (
        <FormalSection title="Professional Experience">
          {work.map((w, i) => (
            <div key={i} className="mb-3.5 break-inside-avoid">
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <div className="text-[13px] font-semibold text-stone-900" style={{ fontFamily: SERIF }}>{w.position}</div>
                  <div className="text-[12px] italic text-stone-600" style={{ fontFamily: SERIF }}>{w.name}</div>
                </div>
                <div className="whitespace-nowrap text-[10.5px] text-stone-600" style={{ fontFamily: "Georgia, serif" }}>{fmtDateRange(w.startDate, w.endDate)}</div>
              </div>
              {w.summary && <p className="mt-1 text-[11.5px] leading-relaxed text-stone-800" style={{ fontFamily: SERIF }}>{w.summary}</p>}
              {w.highlights.length > 0 && (
                <ul className="mt-1 space-y-[3px]">
                  {w.highlights.map((h, j) => (
                    <li key={j} className="flex gap-2 text-[11.5px] leading-relaxed text-stone-800" style={{ fontFamily: SERIF }}>
                      <span className="text-stone-400">—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </FormalSection>
      )}

      {projects.length > 0 && (
        <FormalSection title="Selected Projects">
          {projects.map((p, i) => (
            <div key={i} className="mb-2 break-inside-avoid">
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-[12.5px] font-semibold text-stone-900" style={{ fontFamily: SERIF }}>{p.name}</div>
                {p.keywords.length > 0 && <div className="text-[10.5px] italic text-stone-500" style={{ fontFamily: SERIF }}>{p.keywords.join(", ")}</div>}
              </div>
              {p.description && <p className="mt-0.5 text-[11.5px] leading-relaxed text-stone-800" style={{ fontFamily: SERIF }}>{p.description}</p>}
            </div>
          ))}
        </FormalSection>
      )}

      {skills.length > 0 && (
        <FormalSection title="Areas of Expertise">
          <div className="space-y-[3px]">
            {skills.map((s, i) => (
              <div key={i} className="text-[11.5px] leading-relaxed" style={{ fontFamily: SERIF }}>
                <span className="font-semibold text-stone-900">{s.name}.</span>
                {s.keywords.length > 0 && <span className="text-stone-700"> {s.keywords.join(", ")}</span>}
              </div>
            ))}
          </div>
        </FormalSection>
      )}

      {education.length > 0 && (
        <FormalSection title="Education">
          {education.map((e, i) => (
            <div key={i} className="flex items-baseline justify-between gap-4">
              <div>
                <div className="text-[12.5px] font-semibold text-stone-900" style={{ fontFamily: SERIF }}>
                  {e.studyType}{e.area ? `, ${e.area}` : ""}
                </div>
                <div className="text-[11.5px] italic text-stone-600" style={{ fontFamily: SERIF }}>{e.institution}</div>
              </div>
              <div className="whitespace-nowrap text-[10.5px] text-stone-600" style={{ fontFamily: "Georgia, serif" }}>{e.score ?? fmtDateRange(e.startDate, e.endDate)}</div>
            </div>
          ))}
        </FormalSection>
      )}

      {awards.length > 0 && (
        <FormalSection title="Honours">
          <ul className="space-y-1">
            {awards.map((a, i) => (
              <li key={i} className="text-[11.5px] leading-relaxed text-stone-800" style={{ fontFamily: SERIF }}>
                <span className="font-semibold">{a.title}</span>
                {a.awarder && <span className="italic text-stone-600">, {a.awarder}</span>}
                {a.summary && <span>. {a.summary}</span>}
              </li>
            ))}
          </ul>
        </FormalSection>
      )}

      {languages.length > 0 && (
        <FormalSection title="Languages">
          <p className="text-[11.5px] text-stone-800" style={{ fontFamily: SERIF }}>
            {languages.map((l) => `${l.language}${l.fluency ? ` (${l.fluency})` : ""}`).join(", ")}
          </p>
        </FormalSection>
      )}
    </article>
  );
}

function FormalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-4">
      <h2 className="mb-1.5 border-b border-stone-300 pb-1 text-[10.5px] font-semibold uppercase tracking-[0.28em] text-stone-700" style={{ fontFamily: "Georgia, serif" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default Granite;
