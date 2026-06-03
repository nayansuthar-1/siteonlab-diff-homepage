import type { BlogInput, BlogSection } from "./blogs";
import type { CaseStudyInput, CaseStudySection, CaseStudyMetric } from "./case-studies";
import { slugify } from "./slug";

export type ParseResult<T> = { ok: true; data: T } | { ok: false; error: string };

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function parseSections(raw: unknown): BlogSection[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((s) => {
      const title = asString((s as Record<string, unknown>)?.title);
      const content = asString((s as Record<string, unknown>)?.content);
      const listRaw = (s as Record<string, unknown>)?.list;
      const list = Array.isArray(listRaw)
        ? listRaw.map((i) => asString(i)).filter(Boolean)
        : [];
      const section: BlogSection = { title, content };
      if (list.length) section.list = list;
      return section;
    })
    .filter((s) => s.title || s.content || (s.list && s.list.length));
}

export function parseBlogInput(body: unknown): ParseResult<BlogInput> {
  const b = (body ?? {}) as Record<string, unknown>;
  const title = asString(b.title);
  if (!title) return { ok: false, error: "Title is required." };

  const slug = asString(b.slug) ? slugify(asString(b.slug)) : slugify(title);
  if (!slug) return { ok: false, error: "Could not derive a slug from the title." };

  const imageUrl = asString(b.imageUrl);
  if (!imageUrl) return { ok: false, error: "A cover image is required." };

  const sections = parseSections(b.sections);
  if (sections.length === 0) return { ok: false, error: "Add at least one content section." };

  return {
    ok: true,
    data: {
      slug,
      title,
      excerpt: asString(b.excerpt),
      category: asString(b.category) || "General",
      date:
        asString(b.date) ||
        new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      commentsCount: asString(b.commentsCount) || "No Comments",
      imageUrl,
      accent: asString(b.accent) || "#3b82f6",
      sections,
    },
  };
}

function parseMetrics(raw: unknown): CaseStudyMetric[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((m) => ({
      label: asString((m as Record<string, unknown>)?.label),
      value: asString((m as Record<string, unknown>)?.value),
    }))
    .filter((m) => m.label || m.value);
}

export function parseCaseStudyInput(body: unknown): ParseResult<CaseStudyInput> {
  const b = (body ?? {}) as Record<string, unknown>;
  const title = asString(b.title);
  if (!title) return { ok: false, error: "Title is required." };

  const slug = asString(b.slug) ? slugify(asString(b.slug)) : slugify(title);
  if (!slug) return { ok: false, error: "Could not derive a slug from the title." };

  const imageUrl = asString(b.imageUrl);
  if (!imageUrl) return { ok: false, error: "A cover image is required." };

  const sections = parseSections(b.sections) as CaseStudySection[];
  if (sections.length === 0) return { ok: false, error: "Add at least one content section." };

  return {
    ok: true,
    data: {
      slug,
      title,
      client: asString(b.client),
      category: asString(b.category) || "General",
      description: asString(b.description),
      imageUrl,
      accent: asString(b.accent) || "#0d9488",
      metrics: parseMetrics(b.metrics),
      challenge: asString(b.challenge),
      solution: asString(b.solution),
      sections,
    },
  };
}
