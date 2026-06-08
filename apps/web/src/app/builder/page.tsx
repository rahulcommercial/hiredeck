"use client";

import { useState, useRef } from "react";
import { getTemplate } from "@hiredeck/templates";
import { useResumeStore } from "@/lib/store";
import { TemplatePicker } from "@/components/TemplatePicker";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

export default function BuilderPage() {
  const { resume, hasData, setResume, setTemplate, loadSample, clear } = useResumeStore();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const activeTemplateId = resume.meta?.hiredeck?.template ?? "atlas";
  const { Component } = getTemplate(activeTemplateId);

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
      setResume(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  function triggerUpload() {
    fileRef.current?.click();
  }

  // -------- Empty state (first visit) --------
  if (!hasData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="/" className="text-base font-bold tracking-tight text-slate-900">
              Hiredeck<span className="text-sky-600">.</span>
            </a>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            <span className="h-2 w-2 rounded-full bg-sky-500" /> Step 1 of 3
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Upload your old resume
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
            We&apos;ll extract every section into a clean structured format using AI.
            Then you pick a template and export. Takes 30–60 seconds.
          </p>

          <div className="mx-auto mt-10 max-w-md">
            <button
              onClick={triggerUpload}
              disabled={uploading}
              className="flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-slate-300 bg-white px-8 py-12 transition hover:border-sky-400 hover:bg-sky-50/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? (
                <>
                  <Spinner />
                  <div className="text-sm font-semibold text-slate-700">
                    Parsing your resume with Claude…
                  </div>
                  <div className="text-xs text-slate-500">
                    Usually takes 30–45 seconds
                  </div>
                </>
              ) : (
                <>
                  <UploadIcon />
                  <div className="text-base font-semibold text-slate-900">
                    Click to upload PDF or DOCX
                  </div>
                  <div className="text-xs text-slate-500">
                    Max 5 MB · your file never leaves your browser except for the AI parse
                  </div>
                </>
              )}
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleUpload}
                className="hidden"
                disabled={uploading}
              />
            </button>

            <div className="mt-6 flex items-center gap-3 text-xs text-slate-500">
              <div className="h-px flex-1 bg-slate-200" />
              <span>or</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              onClick={loadSample}
              className="mt-6 text-sm font-medium text-sky-700 hover:underline"
            >
              Try with a sample resume →
            </button>
          </div>

          {error && (
            <div className="mx-auto mt-6 max-w-md rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {error}
            </div>
          )}
        </main>
      </div>
    );
  }

  // -------- Builder state (data loaded) --------
  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      <header className="border-b border-slate-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <a href="/" className="text-base font-bold tracking-tight text-slate-900">
            Hiredeck<span className="text-sky-600">.</span>
          </a>
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={triggerUpload}
              disabled={uploading}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50"
            >
              {uploading ? "Parsing…" : "Re-upload"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
            <button
              onClick={() => {
                if (confirm("Clear all data and start over?")) clear();
              }}
              className="rounded-full border border-slate-200 bg-white px-4 py-1.5 font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            >
              Clear
            </button>
            <button
              onClick={() => window.print()}
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

      {/* Template picker strip */}
      <TemplatePicker resume={resume} activeId={activeTemplateId} onSelect={setTemplate} />

      {/* Preview canvas */}
      <main className="px-6 py-8 print:p-0">
        <div className="mx-auto" style={{ maxWidth: "8.5in" }}>
          <div className="rounded-lg bg-white shadow-xl ring-1 ring-slate-200 print:shadow-none print:ring-0 print:rounded-none">
            <Component resume={resume} />
          </div>
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

function UploadIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-sky-600">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" className="animate-spin text-sky-600">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="60" strokeDashoffset="20" strokeLinecap="round" />
    </svg>
  );
}
