"""
Claude-powered resume parser.

Given raw text extracted from a resume file, asks Claude to return a strict
JSON document conforming to the Hiredeck schema. Pydantic validates the
response before it leaves the API.
"""

from __future__ import annotations

import json
from typing import Any

from anthropic import Anthropic
from pydantic import ValidationError

from .config import settings
from .schema import Resume

SYSTEM_PROMPT = """You are an expert resume parser. You convert raw resume text into
strict JSON conforming to the Hiredeck schema (JSON Resume v1.0.0 compatible).

Rules:
- Return ONLY a single JSON object — no prose, no markdown fences, no commentary.
- Preserve the candidate's wording. Do not invent, embellish, or summarize.
- If a field is not present in the resume, OMIT it. Never fabricate.
- Dates: ISO 8601 (YYYY, YYYY-MM, or YYYY-MM-DD). Convert "Jan 2026" → "2026-01".
- "Present" / "Current" → omit the endDate field for that role.
- For bullets, place each impact statement as a separate string in `highlights`.
- `basics.summary` is the candidate's profile blurb. If absent, omit.
- Use the schema keys exactly. Required: basics.name. Everything else optional.
"""

USER_TEMPLATE = """Parse the following resume into Hiredeck JSON.

<resume_text>
{text}
</resume_text>

Return ONLY the JSON object."""


def _extract_json(content: str) -> dict[str, Any]:
    """Tolerate the occasional ```json fence Claude wraps around output."""
    stripped = content.strip()
    if stripped.startswith("```"):
        # strip opening fence + optional language tag
        stripped = stripped.split("\n", 1)[1] if "\n" in stripped else stripped
        if stripped.endswith("```"):
            stripped = stripped.rsplit("```", 1)[0]
    return json.loads(stripped)


def parse_resume(text: str) -> Resume:
    if not settings.anthropic_api_key:
        raise RuntimeError(
            "ANTHROPIC_API_KEY is not set. Add it to apps/api/.env to enable parsing."
        )

    client = Anthropic(api_key=settings.anthropic_api_key)
    response = client.messages.create(
        model=settings.anthropic_model,
        max_tokens=4096,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": USER_TEMPLATE.format(text=text)}],
    )

    raw = "".join(block.text for block in response.content if block.type == "text")
    payload = _extract_json(raw)

    try:
        return Resume.model_validate(payload)
    except ValidationError as exc:
        # Re-raise with the offending payload attached for debuggability.
        raise ValueError(f"LLM returned invalid schema: {exc}\nPayload: {payload}") from exc
