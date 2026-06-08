/**
 * Hiredeck Resume Schema
 * ----------------------
 * Compatible with JSON Resume v1.0.0 (https://jsonresume.org/schema)
 * with conservative Hiredeck extensions namespaced under `meta.hiredeck`.
 *
 * Single source of truth for:
 *  - apps/web   (Zod validation, TS types, template props)
 *  - apps/api   (Pydantic mirror — kept in sync manually for now)
 *  - templates  (every template renders from this exact shape)
 */
import { z } from "zod";

// ---------------------------------------------------------------------------
// Atoms
// ---------------------------------------------------------------------------
const isoDate = z
  .string()
  .regex(/^\d{4}(-\d{2}(-\d{2})?)?$/, "Use ISO 8601 (YYYY, YYYY-MM, or YYYY-MM-DD)")
  .optional();

const url = z.string().url().optional();
const email = z.string().email().optional();

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------
export const LocationSchema = z.object({
  address: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  countryCode: z.string().length(2).optional(),
  region: z.string().optional(),
});

export const ProfileSchema = z.object({
  network: z.string(),
  username: z.string().optional(),
  url: url,
});

export const BasicsSchema = z.object({
  name: z.string(),
  label: z.string().optional(),
  image: url,
  email: email,
  phone: z.string().optional(),
  url: url,
  summary: z.string().optional(),
  location: LocationSchema.optional(),
  profiles: z.array(ProfileSchema).default([]),
});

export const WorkSchema = z.object({
  name: z.string(),
  position: z.string(),
  url: url,
  startDate: isoDate,
  endDate: isoDate,
  summary: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  location: z.string().optional(),
});

export const VolunteerSchema = z.object({
  organization: z.string(),
  position: z.string().optional(),
  url: url,
  startDate: isoDate,
  endDate: isoDate,
  summary: z.string().optional(),
  highlights: z.array(z.string()).default([]),
});

export const EducationSchema = z.object({
  institution: z.string(),
  url: url,
  area: z.string().optional(),
  studyType: z.string().optional(),
  startDate: isoDate,
  endDate: isoDate,
  score: z.string().optional(),
  courses: z.array(z.string()).default([]),
});

export const AwardSchema = z.object({
  title: z.string(),
  date: isoDate,
  awarder: z.string().optional(),
  summary: z.string().optional(),
});

export const CertificateSchema = z.object({
  name: z.string(),
  date: isoDate,
  issuer: z.string().optional(),
  url: url,
});

export const PublicationSchema = z.object({
  name: z.string(),
  publisher: z.string().optional(),
  releaseDate: isoDate,
  url: url,
  summary: z.string().optional(),
});

export const SkillSchema = z.object({
  name: z.string(),
  level: z.string().optional(),
  keywords: z.array(z.string()).default([]),
});

export const LanguageSchema = z.object({
  language: z.string(),
  fluency: z.string().optional(),
});

export const InterestSchema = z.object({
  name: z.string(),
  keywords: z.array(z.string()).default([]),
});

export const ReferenceSchema = z.object({
  name: z.string(),
  reference: z.string().optional(),
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  highlights: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  startDate: isoDate,
  endDate: isoDate,
  url: url,
  roles: z.array(z.string()).default([]),
  entity: z.string().optional(),
  type: z.string().optional(),
});

// Hiredeck-specific metadata: template selection, theming, build info.
export const HiredeckMetaSchema = z.object({
  template: z.string().default("atlas"),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default("#2E75B6"),
  fontFamily: z.enum(["sans", "serif", "mono"]).default("sans"),
  density: z.enum(["compact", "comfortable"]).default("comfortable"),
});

export const MetaSchema = z.object({
  canonical: url,
  version: z.string().default("v1.0.0"),
  lastModified: z.string().optional(),
  hiredeck: HiredeckMetaSchema.default({}),
});

// ---------------------------------------------------------------------------
// Root
// ---------------------------------------------------------------------------
export const ResumeSchema = z.object({
  $schema: z.string().default("https://hiredeck.dev/schema/resume.v1.json"),
  basics: BasicsSchema,
  work: z.array(WorkSchema).default([]),
  volunteer: z.array(VolunteerSchema).default([]),
  education: z.array(EducationSchema).default([]),
  awards: z.array(AwardSchema).default([]),
  certificates: z.array(CertificateSchema).default([]),
  publications: z.array(PublicationSchema).default([]),
  skills: z.array(SkillSchema).default([]),
  languages: z.array(LanguageSchema).default([]),
  interests: z.array(InterestSchema).default([]),
  references: z.array(ReferenceSchema).default([]),
  projects: z.array(ProjectSchema).default([]),
  meta: MetaSchema.default({}),
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type Location = z.infer<typeof LocationSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Basics = z.infer<typeof BasicsSchema>;
export type Work = z.infer<typeof WorkSchema>;
export type Volunteer = z.infer<typeof VolunteerSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Award = z.infer<typeof AwardSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Language = z.infer<typeof LanguageSchema>;
export type Interest = z.infer<typeof InterestSchema>;
export type Reference = z.infer<typeof ReferenceSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type HiredeckMeta = z.infer<typeof HiredeckMetaSchema>;
export type Meta = z.infer<typeof MetaSchema>;
export type Resume = z.infer<typeof ResumeSchema>;

// ---------------------------------------------------------------------------
// Empty / sample factories
// ---------------------------------------------------------------------------
export const emptyResume = (): Resume =>
  ResumeSchema.parse({
    basics: { name: "", profiles: [] },
  });

