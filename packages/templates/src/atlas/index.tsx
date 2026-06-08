/**
 * Atlas — modern, minimal, single-column.
 *
 * Reference implementation. Every other template should follow the same
 * contract: a default-exported React component that takes `{ resume }` and
 * renders a print-ready A4/Letter page using Tailwind utilities only.
 */
import type { Resume, Work, Education, Project, Skill } from "@hiredeck/schema";

interface Props {
  resume: Resume;
}

function fmtDateRange(start?: string, end?: string): string {
  if (!start && !end) return "";
  const fmt = (d?: string) => {
    if (!d) return "Present";
    const [y, m] = d.split("-");
    if (!m) return y!;
    const month = new Date(`${d}-01`).toLocaleString("en-US", { month: "short" });
    return `${month} ${y}`;
  };
  return `${fmt(start)} – ${fmt(end)}`;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 mt-6 border-b border-slate-200 pb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900">
      {children}
    </h2>
  );
}

function WorkBlock({ w }: { w: Work }) {
  return (
    <div className="mb-4 break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-[13px] font-semibold text-slate-900">{w.position}</div>
          <div className="text-[12px] italic text-sky-700">{w.name}</div>
        </div>
        <div className="whitespace-nowrap text-[11px] text-slate-500">
          {fmtDateRange(w.startDate, w.endDate)}
        </div>
      </div>
      {w.summary && <p className="mt-1 text-[12px] leading-relaxed text-slate-700">{w.summary}</p>}
      {w.highlights.length > 0 && (
        <ul className="mt-1.5 space-y-1">
          {w.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-slate-700">
              <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-sky-600" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function EduBlock({ e }: { e: Education }) {
  return (
    <div className="mb-3 break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <div className="text-[13px] font-semibold text-slate-900">
            {e.studyType}
            {e.area ? `, ${e.area}` : ""}
          </div>
          <div className="text-[12px] italic text-slate-600">{e.institution}</div>
        </div>
        <div className="whitespace-nowrap text-[11px] text-slate-500">
          {e.score ?? fmtDateRange(e.startDate, e.endDate)}
        </div>
      </div>
    </div>
  );
}

function ProjectBlock({ p }: { p: Project }) {
  return (
    <div className="mb-3 break-inside-avoid">
      <div className="flex items-baseline justify-between gap-4">
        <div className="text-[13px] font-semibold text-slate-900">{p.name}</div>
        {p.keywords.length > 0 && (
          <div className="text-[11px] italic text-slate-500">{p.keywords.join(" · ")}</div>
        )}
      </div>
      {p.description && <p className="mt-1 text-[12px] leading-relaxed text-slate-700">{p.description}</p>}
    </div>
  );
}

function SkillBlock({ s }: { s: Skill }) {
  return (
    <div className="mb-1.5 text-[12px] leading-relaxed">
      <span className="font-semibold text-slate-900">{s.name}</span>
      {s.keywords.length > 0 && (
        <span className="text-slate-700"> · {s.keywords.join(", ")}</span>
      )}
    </div>
  );
}

export function Atlas({ resume }: Props) {
  const { basics, work, education, projects, skills, awards, languages, interests } = resume;
  const accent = resume.meta?.hiredeck?.accentColor ?? "#2E75B6";

  return (
    <article
      className="mx-auto bg-white text-slate-900"
      style={{
        width: "8.5in",
        minHeight: "11in",
        padding: "0.6in 0.75in",
        fontFamily:
          "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* ============== Header ============== */}
      <header className="mb-4 border-b-2 pb-4" style={{ borderColor: accent }}>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{basics.name || "Your Name"}</h1>
        {basics.label && (
          <p className="mt-1 text-[13px] uppercase tracking-[0.22em]" style={{ color: accent }}>
            {basics.label}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600">
          {basics.location && (
            <span>
              {[basics.location.city, basics.location.region, basics.location.countryCode]
                .filter(Boolean)
                .join(", ")}
            </span>
          )}
          {basics.phone && <><span className="text-slate-300">·</span><span>{basics.phone}</span></>}
          {basics.email && (
            <>
              <span className="text-slate-300">·</span>
              <a href={`mailto:${basics.email}`} className="hover:underline">
                {basics.email}
              </a>
            </>
          )}
          {basics.url && (
            <>
              <span className="text-slate-300">·</span>
              <a href={basics.url} className="hover:underline">
                {basics.url.replace(/^https?:\/\//, "")}
              </a>
            </>
          )}
          {basics.profiles.map((p, i) => (
            <span key={i} className="flex gap-3">
              <span className="text-slate-300">·</span>
              <a href={p.url} className="hover:underline">
                {p.network}
                {p.username ? ` / ${p.username}` : ""}
              </a>
            </span>
          ))}
        </div>
      </header>

      {/* ============== Summary ============== */}
      {basics.summary && (
        <>
          <SectionHeading>Profile</SectionHeading>
          <p className="text-[12px] leading-relaxed text-slate-700">{basics.summary}</p>
        </>
      )}

      {/* ============== Experience ============== */}
      {work.length > 0 && (
        <>
          <SectionHeading>Experience</SectionHeading>
          {work.map((w, i) => <WorkBlock key={i} w={w} />)}
        </>
      )}

      {/* ============== Projects ============== */}
      {projects.length > 0 && (
        <>
          <SectionHeading>Selected Projects</SectionHeading>
          {projects.map((p, i) => <ProjectBlock key={i} p={p} />)}
        </>
      )}

      {/* ============== Skills ============== */}
      {skills.length > 0 && (
        <>
          <SectionHeading>Technical Skills</SectionHeading>
          {skills.map((s, i) => <SkillBlock key={i} s={s} />)}
        </>
      )}

      {/* ============== Education ============== */}
      {education.length > 0 && (
        <>
          <SectionHeading>Education</SectionHeading>
          {education.map((e, i) => <EduBlock key={i} e={e} />)}
        </>
      )}

      {/* ============== Awards ============== */}
      {awards.length > 0 && (
        <>
          <SectionHeading>Recognition</SectionHeading>
          <ul className="space-y-1">
            {awards.map((a, i) => (
              <li key={i} className="text-[12px] leading-relaxed text-slate-700">
                <span className="font-semibold text-slate-900">{a.title}</span>
                {a.awarder && <span className="text-slate-500"> · {a.awarder}</span>}
                {a.summary && <span className="text-slate-700"> — {a.summary}</span>}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* ============== Languages & Interests ============== */}
      {(languages.length > 0 || interests.length > 0) && (
        <>
          <SectionHeading>More</SectionHeading>
          {languages.length > 0 && (
            <div className="mb-1 text-[12px] leading-relaxed">
              <span className="font-semibold text-slate-900">Languages</span>
              {" · "}
              {languages.map((l) => `${l.language}${l.fluency ? ` (${l.fluency})` : ""}`).join(", ")}
            </div>
          )}
          {interests.length > 0 && (
            <div className="text-[12px] leading-relaxed">
              <span className="font-semibold text-slate-900">Interests</span>
              {" · "}
              {interests.map((i) =>
                i.keywords.length > 0 ? `${i.name} (${i.keywords.join(", ")})` : i.name
              ).join(", ")}
            </div>
          )}
        </>
      )}
    </article>
  );
}

export default Atlas;
