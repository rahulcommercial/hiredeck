"use client";

import { useState } from "react";
import { Atlas } from "@hiredeck/templates";
import { useResumeStore } from "@/lib/store";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export default function BuilderPage() {
  const { resume, setResume, reset, clear } = useResumeStore();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/parse`, { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail ?? `Upload failed (${res.status})`);
      }
      const parsed = await res.json();
      setResume(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function exportPDF() {
    // v1: rely on the browser's print dialog (clean, native, zero dependency)
    window.print();
  }

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      {/* Toolbar — hidden when printing */}
      <header className="border-b border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <a href="/" className="text-base font-bold tracking-tight text-slate-900">
            Hiredeck<span className="text-sky-600">.</span>
          </a>
          <div className="flex items-center gap-2 text-sm">
            <label className="cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-1.5 font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50">
              {uploading ? "Parsing…" : "Upload resume"}
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
            <button
              onClick={reset}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            >
              Use sample
            </button>
            <button
              onClick={clear}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            >
              Clear
            </button>
            <button
              onClick={exportPDF}
              className="rounded-full bg-slate-900 px-5 py-1.5 font-semibold text-white shadow-sm hover:bg-slate-800"
            >
              Export PDF
            </button>
          </div>
        </div>
        {error && (
          <div className="border-t border-amber-200 bg-amber-50 px-6 py-2 text-center text-xs text-amber-900">
            {error}
          </div>
        )}
      </header>

      {/* Preview canvas */}
      <main className="px-6 py-10 print:p-0">
        <div className="mx-auto" style={{ maxWidth: "8.5in" }}>
          <div className="rounded-lg bg-white shadow-xl ring-1 ring-slate-200 print:shadow-none print:ring-0">
            <Atlas resume={resume} />
          </div>
          <p className="mt-4 text-center text-xs text-slate-500 print:hidden">
            v1 builder · template:{" "}
            <code className="rounded bg-slate-200 px-1.5 py-0.5">atlas</code> · template
            picker and inline editor land in the next phase.
          </p>
        </div>
      </main>

      <style>{`
        @media print {
          @page { size: Letter; margin: 0; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
