"""Hiredeck API entrypoint."""

from __future__ import annotations

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from . import __version__
from .config import settings
from .extract import extract_text
from .parse import parse_resume
from .schema import Resume

app = FastAPI(
    title="Hiredeck API",
    description="Extracts structured resume JSON from uploaded files.",
    version=__version__,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "version": __version__}


@app.post("/parse", response_model=Resume)
async def parse(file: UploadFile = File(...)) -> Resume:
    """Upload a PDF / DOCX / TXT resume and receive structured JSON."""
    if not file.filename:
        raise HTTPException(status_code=400, detail="Missing filename.")

    data = await file.read()
    if len(data) > settings.max_upload_mb * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail=f"File exceeds {settings.max_upload_mb} MB limit.",
        )

    try:
        text = extract_text(file.filename, data)
    except ValueError as exc:
        raise HTTPException(status_code=415, detail=str(exc)) from exc

    if len(text.strip()) < 50:
        raise HTTPException(
            status_code=422,
            detail="Couldn't extract enough text from the file. Is it scanned / image-only?",
        )

    try:
        return parse_resume(text)
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
