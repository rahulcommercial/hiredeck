/**
 * Helpers shared across templates.
 */

export function fmtDateRange(start?: string, end?: string): string {
  if (!start && !end) return "";
  const fmt = (d?: string, isEnd = false) => {
    if (!d) return isEnd ? "Present" : "";
    const [y, m] = d.split("-");
    if (!m) return y!;
    const month = new Date(`${d}-01`).toLocaleString("en-US", { month: "short" });
    return `${month} ${y}`;
  };
  return `${fmt(start)} – ${fmt(end, true)}`;
}

export function joinLoc(loc?: {
  city?: string | undefined;
  region?: string | undefined;
  countryCode?: string | undefined;
}): string {
  if (!loc) return "";
  return [loc.city, loc.region, loc.countryCode].filter(Boolean).join(", ");
}

export function trimProto(url?: string): string {
  return (url ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** Two-letter initials from a name. "Rahul Kumar Singh" → "RS". */
export function initials(name: string): string {
  if (!name) return "·";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}
