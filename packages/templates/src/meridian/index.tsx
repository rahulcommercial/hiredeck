/**
 * Meridian — vertical timeline with circular icons. Strong narrative flow,
 * perfect for candidates with a clear career story.
 */
import type { Resume } from "@hiredeck/schema";
import { fmtDateRange, joinLoc, trimProto } from "../_shared";
import { MailIcon, MapPinIcon, PhoneIcon, GlobeIcon, UserIcon, BriefcaseIcon, GraduationIcon, StarIcon } from "../_icons";

interface Props { resume: Resume }

const INK = "#111827";
const LINE = "#CBD5E1";
const DOT = "#94A3B8";

export function Meridian({ resume }: Props) {
  const { basics, work, education, skills, languages, references, projects, awards } = resume;
  const accent = resume.meta?.hiredeck?.accentColor ?? INK;

  return (
    <article
      className="mx-auto bg-white text-slate-900"
      style={{ width: "8.5in", minHeight: "11in", padding: "0.45in 0.6in",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif" }}
    >
      {/* Header */}
      <header className="mb-5">
        <h1 className="text-[34px] font-extrabold uppercase leading-none tracking-wider" style={{ color: INK }}>
          {basics.name || "Your Name"}
        </h1>
        {basics.label && (
          <p className="mt-1 text-[12.5px] uppercase tracking-[0.32em] text-slate-700">{basics.label}</p>
        )}
        <div className="mt-3 h-[3px] w-full" style={{ background: INK }} />
      </header>

      {/* Two columns */}
      <div className="grid gap-7" style={{ gridTemplateColumns: "1.7in 1fr" }}>
        {/* Sidebar */}
        <aside>
          <SideHeading title="Contact" />
          <ul className="mb-5 space-y-2 text-[10.5px] text-slate-700">
            {basics.phone && (
              <li className="flex items-start gap-2"><PhoneIcon size={11} color={accent} style={{ marginTop: 2 }} /><span>{basics.phone}</span></li>
            )}
            {basics.email && (
              <li className="flex items-start gap-2"><MailIcon size={11} color={accent} style={{ marginTop: 2 }} /><span className="break-all">{basics.email}</span></li>
            )}
            {joinLoc(basics.location) && (
              <li className="flex items-start gap-2"><MapPinIcon size={11} color={accent} style={{ marginTop: 2 }} /><span>{joinLoc(basics.location)}</span></li>
            )}
            {basics.url && (
              <li className="flex items-start gap-2"><GlobeIcon size={11} color={accent} style={{ marginTop: 2 }} /><span className="break-all">{trimProto(basics.url)}</span></li>
            )}
          </ul>

          {skills.length > 0 && (
            <>
              <SideHeading title="Skills" />
              <ul className="mb-5 space-y-1 text-[11px] text-slate-700">
                {skills.flatMap((s) => s.keywords.length > 0 ? s.keywords : [s.name]).slice(0, 12).map((k, i) => (
                  <li key={i} className="flex gap-2 leading-snug">
                    <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-slate-700" />
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {languages.length > 0 && (
            <>
              <SideHeading title="Languages" />
              <ul className="mb-5 space-y-1 text-[11px] text-slate-700">
                {languages.map((l, i) => (
                  <li key={i} className="leading-snug">
                    <span className="font-semibold">{l.language}</span>{l.fluency && <span className="text-slate-500"> ({l.fluency})</span>}
                  </li>
                ))}
              </ul>
            </>
          )}

          {references.length > 0 && (
            <>
              <SideHeading title="Reference" />
              {references.slice(0, 2).map((r, i) => (
                <div key={i} className="mb-2 text-[11px] text-slate-700">
                  <div className="font-bold" style={{ color: INK }}>{r.name}</div>
                  {r.reference && <div className="text-slate-600">{r.reference}</div>}
                </div>
              ))}
            </>
          )}
        </aside>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-2 left-[10px] top-2 w-px" style={{ background: LINE }} />

          {basics.summary && (
            <TimelineNode title="Profile" Icon={UserIcon} accent={accent}>
              <p className="text-[11.5px] italic leading-relaxed text-slate-700">&ldquo;{basics.summary}&rdquo;</p>
            </TimelineNode>
          )}

          {work.length > 0 && (
            <TimelineNode title="Work Experience" Icon={BriefcaseIcon} accent={accent}>
              {work.map((w, i) => (
                <div key={i} className="mb-3 break-inside-avoid">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="text-[12.5px] font-bold" style={{ color: INK }}>{w.name}</div>
                    <div className="whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-wide text-slate-600">
                      {fmtDateRange(w.startDate, w.endDate)}
                    </div>
                  </div>
                  <div className="text-[11.5px] text-slate-700">{w.position}</div>
                  {w.highlights.length > 0 && (
                    <ul className="mt-1 space-y-[3px]">
                      {w.highlights.map((h, j) => (
                        <li key={j} className="flex gap-2 text-[11px] leading-relaxed text-slate-700">
                          <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-slate-700" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {w.summary && w.highlights.length === 0 && (
                    <p className="mt-1 text-[11px] italic leading-relaxed text-slate-700">&ldquo;{w.summary}&rdquo;</p>
                  )}
                </div>
              ))}
            </TimelineNode>
          )}

          {projects.length > 0 && (
            <TimelineNode title="Projects" Icon={StarIcon} accent={accent}>
              {projects.slice(0, 4).map((p, i) => (
                <div key={i} className="mb-2 break-inside-avoid">
                  <div className="text-[12px] font-bold" style={{ color: INK }}>{p.name}</div>
                  {p.description && <p className="mt-0.5 text-[11px] leading-relaxed text-slate-700">{p.description}</p>}
                </div>
              ))}
            </TimelineNode>
          )}

          {education.length > 0 && (
            <TimelineNode title="Education" Icon={GraduationIcon} accent={accent}>
              {education.map((e, i) => (
                <div key={i} className="mb-2 break-inside-avoid">
                  <div className="text-[12.5px] font-bold" style={{ color: INK }}>
                    {e.studyType}{e.area ? `, ${e.area}` : ""}
                  </div>
                  <div className="text-[11px] text-slate-600">{e.institution}{e.score ? `  ·  ${e.score}` : ""}</div>
                </div>
              ))}
            </TimelineNode>
          )}

          {awards.length > 0 && (
            <TimelineNode title="Recognition" Icon={StarIcon} accent={accent}>
              <ul className="space-y-1">
                {awards.map((a, i) => (
                  <li key={i} className="text-[11px] leading-relaxed text-slate-700">
                    <span className="font-bold" style={{ color: INK }}>{a.title}</span>
                    {a.awarder && <span className="text-slate-500"> · {a.awarder}</span>}
                  </li>
                ))}
              </ul>
            </TimelineNode>
          )}
        </div>
      </div>
    </article>
  );
}

function SideHeading({ title }: { title: string }) {
  return (
    <h3 className="mb-2 text-[14px] font-extrabold uppercase tracking-wider" style={{ color: INK }}>
      {title}
    </h3>
  );
}

function TimelineNode({
  title, Icon, accent, children,
}: {
  title: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative mb-5 pl-7 break-inside-avoid-page">
      {/* Icon disc */}
      <div
        className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-full"
        style={{ background: INK, color: "white" }}
      >
        <Icon size={11} color="white" />
      </div>
      {/* Small dot below icon for line decoration */}
      <span
        className="absolute left-[8px] top-[26px] inline-block h-1.5 w-1.5 rounded-full bg-white"
        style={{ border: `1px solid ${DOT}` }}
      />
      <h2 className="mb-1.5 text-[14px] font-extrabold uppercase tracking-wide" style={{ color: INK }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default Meridian;
