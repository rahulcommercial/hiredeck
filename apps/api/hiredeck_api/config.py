"""Runtime configuration loaded from environment variables."""

from pathlib import Path

from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

# Some host environments (notably macOS Claude Desktop) inject
# ANTHROPIC_API_KEY="" (empty string) into every spawned shell. That empty
# value silently outranks .env values in pydantic-settings. We force the
# .env file to override system env vars during dev so the developer's local
# key actually wins.
_ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
if _ENV_PATH.exists():
    load_dotenv(_ENV_PATH, override=True)


class Settings(BaseSettings):
    """Server settings. Override via env vars or .env file."""

    anthropic_api_key: str = ""
    anthropic_model: str = "claude-sonnet-4-6"
    max_upload_mb: int = 5
    allowed_origins: str = "http://localhost:3000"

    model_config = SettingsConfigDict(extra="ignore")

    @property
    def origins_list(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]


settings = Settings()
