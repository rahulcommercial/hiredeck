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
