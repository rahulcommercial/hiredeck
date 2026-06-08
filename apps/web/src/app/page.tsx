import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="text-lg font-bold tracking-tight text-slate-900">
          Hiredeck<span className="text-sky-600">.</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/builder" className="text-slate-600 hover:text-slate-900">
            Builder
          </Link>
          <a
            href="https://github.com/rahulcommercial/hiredeck"
            className="rounded-full border border-slate-200 px-4 py-1.5 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          >
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center sm:pt-24">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
          <span className="h-2 w-2 rounded-full bg-sky-500" /> Open source · MIT
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          The open-source <span className="text-sky-600">resume deck.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Upload your old resume. Let AI parse it into a clean, structured format.
          Pick a template. Export a polished PDF in seconds.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/builder"
            className="inline-flex h-12 items-center rounded-full bg-slate-900 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Open the builder →
          </Link>
          <a
            href="https://github.com/rahulcommercial/hiredeck"
            className="inline-flex h-12 items-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          >
            Star on GitHub
          </a>
        </div>
      </section>

      {/* Feature strip */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Feature
            kicker="01"
            title="Upload"
            body="Drop your PDF or DOCX. Claude extracts structured JSON in seconds — no manual retyping."
          />
          <Feature
            kicker="02"
            title="Refine"
            body="Edit any field. Live preview updates instantly. Your data stays in your browser."
          />
          <Feature
            kicker="03"
            title="Land"
            body="Pick from 20+ templates. Export print-ready PDF. Your JSON is portable forever."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 text-center text-xs text-slate-500">
        Built with Next.js · FastAPI · Claude · MIT
      </footer>
    </main>
  );
}

function Feature({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-xs font-bold tracking-widest text-sky-600">{kicker}</div>
      <div className="mt-2 text-lg font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
    </div>
  );
}
