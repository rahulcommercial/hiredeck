# Hiredeck

> The open-source resume deck. Upload, refine, land.

Hiredeck is an AI-powered resume builder that turns your old PDF or DOCX into a clean, structured document — then renders it through any of a growing collection of professional templates.

**Status:** v0.1 — scaffold and first template (Atlas) shipped. Roadmap below.

## Why Hiredeck

Most resume builders ship one of three things:

1. A clunky form you fill out manually
2. A templating tool with no AI
3. An AI tool that produces a black-box PDF you can't customize

Hiredeck does all three, and the data layer is the [JSON Resume schema](https://jsonresume.org/schema) — so your data is portable forever, and every template renders from the same canonical shape.

## How it works

```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Upload    │ →  │   Parse      │ →  │   Refine     │ →  │   Export     │
│ PDF/DOCX    │    │ Claude →     │    │  Editor +    │    │  Pick a      │
│             │    │ structured   │    │  live        │    │  template,   │
│             │    │ JSON         │    │  preview     │    │  print PDF   │
└─────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
```

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 16 · React 19 · TypeScript · Tailwind v4 |
| State | Zustand (localStorage-persisted) |
| API | FastAPI · Python 3.12 · Pydantic |
| AI | Anthropic Claude (extraction) |
| Schema | JSON Resume v1.0.0 + Hiredeck extensions, mirrored as Zod + Pydantic |
| Templates | React components, print-CSS, single-file |
| PDF | Browser print (v1) → Puppeteer/headless Chromium (v2) |

## Repo layout

```
hiredeck/
├─ apps/
│  ├─ web/           Next.js builder + landing
│  └─ api/           FastAPI parsing service
└─ packages/
   ├─ schema/        Zod schema + sample resume (single source of truth)
   └─ templates/     Atlas + future templates
```

## Quick start

```bash
# 1 — install
pnpm install

# 2 — copy env files
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
# add your ANTHROPIC_API_KEY to apps/api/.env

# 3 — install Python deps for the API
cd apps/api && pip install -e ".[dev]" && cd ../..

# 4 — run both services (in two terminals)
pnpm dev          # → http://localhost:3000
pnpm dev:api      # → http://localhost:8000
```

Open `http://localhost:3000`, click **Open the builder**, then either:

- **Use sample** to render the bundled sample resume in the Atlas template, or
- **Upload resume** to let Claude parse your own PDF/DOCX.

## Roadmap

- [x] **Phase 0** — Monorepo scaffold, schema, sample data, Atlas template
- [ ] **Phase 1** — Inline editor for every resume section
- [ ] **Phase 2** — Template picker UI with live previews
- [ ] **Phase 3** — Templates 2–5 (Granite, Junction, Mesa, Onyx)
- [ ] **Phase 4** — Puppeteer-based server-side PDF rendering
- [ ] **Phase 5** — Templates 6–20 (rest of the starter pack)
- [ ] **Phase 6** — Optional Supabase backend for accounts and shareable links
- [ ] **Phase 7** — Job board integration (long-term)

## Contributing

Templates are the easiest way to contribute. Each template is a single React component that takes a `Resume` and renders a print-ready page. See `packages/templates/src/atlas/index.tsx` as the reference implementation.

## License

MIT — see [LICENSE](./LICENSE).

---

Built by [Rahul Kumar Singh](https://github.com/rahulcommercial). If Hiredeck helps you land a role, star the repo.
