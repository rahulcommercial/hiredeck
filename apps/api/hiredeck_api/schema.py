"""
Pydantic mirror of @hiredeck/schema (Zod).

⚠️  Keep in sync with packages/schema/src/index.ts.
A codegen step will replace this manual mirror in a later phase.
"""

from __future__ import annotations

from pydantic import BaseModel, EmailStr, Field, HttpUrl


class Location(BaseModel):
    address: str | None = None
    postalCode: str | None = None
    city: str | None = None
    countryCode: str | None = Field(default=None, min_length=2, max_length=2)
    region: str | None = None


class Profile(BaseModel):
    network: str
    username: str | None = None
    url: HttpUrl | None = None


class Basics(BaseModel):
    name: str
    label: str | None = None
    image: HttpUrl | None = None
    email: EmailStr | None = None
    phone: str | None = None
    url: HttpUrl | None = None
    summary: str | None = None
    location: Location | None = None
    profiles: list[Profile] = []


class Work(BaseModel):
    name: str
    position: str
    url: HttpUrl | None = None
    startDate: str | None = None
    endDate: str | None = None
    summary: str | None = None
    highlights: list[str] = []
    location: str | None = None


class Volunteer(BaseModel):
    organization: str
    position: str | None = None
    url: HttpUrl | None = None
    startDate: str | None = None
    endDate: str | None = None
    summary: str | None = None
    highlights: list[str] = []


class Education(BaseModel):
    institution: str
    url: HttpUrl | None = None
    area: str | None = None
    studyType: str | None = None
    startDate: str | None = None
    endDate: str | None = None
    score: str | None = None
    courses: list[str] = []


class Award(BaseModel):
    title: str
    date: str | None = None
    awarder: str | None = None
    summary: str | None = None


class Certificate(BaseModel):
    name: str
    date: str | None = None
    issuer: str | None = None
    url: HttpUrl | None = None


class Publication(BaseModel):
    name: str
    publisher: str | None = None
    releaseDate: str | None = None
    url: HttpUrl | None = None
    summary: str | None = None


class Skill(BaseModel):
    name: str
    level: str | None = None
    keywords: list[str] = []


class Language(BaseModel):
    language: str
    fluency: str | None = None


class Interest(BaseModel):
    name: str
    keywords: list[str] = []


class Reference(BaseModel):
    name: str
    reference: str | None = None


class Project(BaseModel):
    name: str
    description: str | None = None
    highlights: list[str] = []
    keywords: list[str] = []
    startDate: str | None = None
    endDate: str | None = None
    url: HttpUrl | None = None
    roles: list[str] = []
    entity: str | None = None
    type: str | None = None


class HiredeckMeta(BaseModel):
    template: str = "atlas"
    accentColor: str = "#2E75B6"
    fontFamily: str = "sans"
    density: str = "comfortable"


class Meta(BaseModel):
    canonical: HttpUrl | None = None
    version: str = "v1.0.0"
    lastModified: str | None = None
    hiredeck: HiredeckMeta = Field(default_factory=HiredeckMeta)


class Resume(BaseModel):
    """Root resume document."""

    basics: Basics
    work: list[Work] = []
    volunteer: list[Volunteer] = []
    education: list[Education] = []
    awards: list[Award] = []
    certificates: list[Certificate] = []
    publications: list[Publication] = []
    skills: list[Skill] = []
    languages: list[Language] = []
    interests: list[Interest] = []
    references: list[Reference] = []
    projects: list[Project] = []
    meta: Meta = Field(default_factory=Meta)
