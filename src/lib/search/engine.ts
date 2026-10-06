/**
 * Catalogue matching.
 *
 * A small, dependency-free scorer rather than a search server: the catalogue is
 * a few hundred short entries, so ranking in-process is both faster and simpler
 * than standing up an index. If the catalogue ever grows past a few thousand
 * entries, replace `search()` here — the API route and UI stay unchanged.
 */
import { searchCatalog, type SearchEntry, type SearchKind } from "@/lib/search/catalog";

export interface SearchHit {
  entry: SearchEntry;
  score: number;
}

export interface SearchOptions {
  limit?: number;
  kinds?: SearchKind[];
}

/** Lowercase, strip punctuation, collapse whitespace. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s&+]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string): string[] {
  return normalize(value).split(" ").filter(Boolean);
}

/**
 * Score one token against one entry. Higher is better; 0 means no match.
 *
 * The weighting encodes an editorial judgement: a title hit is worth far more
 * than a summary hit, and an exact keyword hit ("bp") should beat a partial
 * title hit so abbreviations land on the right department.
 */
function scoreToken(token: string, entry: SearchEntry): number {
  const title = normalize(entry.title);
  const summary = normalize(entry.summary);
  const keywords = entry.keywords.map(normalize);

  if (title === token) return 120;
  if (keywords.includes(token)) return 100;
  if (title.startsWith(`${token} `) || title === token) return 80;

  const titleWords = title.split(" ");
  if (titleWords.includes(token)) return 70;
  if (titleWords.some((word) => word.startsWith(token) && token.length >= 3)) return 55;
  if (title.includes(token) && token.length >= 3) return 40;

  if (keywords.some((keyword) => keyword.split(" ").includes(token))) return 45;
  if (keywords.some((keyword) => keyword.includes(token) && token.length >= 3)) return 30;

  if (summary.includes(token) && token.length >= 4) return 12;

  return 0;
}

/** Kinds are nudged so a department outranks one of its own service bullets. */
const KIND_BONUS: Record<SearchKind, number> = {
  department: 14,
  condition: 10,
  service: 0,
};

export function search(query: string, options: SearchOptions = {}): SearchHit[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  const limit = options.limit ?? 8;
  const pool = options.kinds
    ? searchCatalog.filter((entry) => options.kinds!.includes(entry.kind))
    : searchCatalog;

  const normalizedQuery = normalize(query);
  const hits: SearchHit[] = [];

  for (const entry of pool) {
    let total = 0;
    let matchedTokens = 0;

    for (const token of tokens) {
      const tokenScore = scoreToken(token, entry);
      if (tokenScore > 0) {
        total += tokenScore;
        matchedTokens += 1;
      }
    }

    if (matchedTokens === 0) continue;

    // Reward entries that matched the whole query, not just one word of it.
    const coverage = matchedTokens / tokens.length;
    total *= 0.45 + 0.55 * coverage;

    // A phrase hit ("chest pain") should clearly beat two scattered word hits.
    if (tokens.length > 1) {
      const haystack = [normalize(entry.title), ...entry.keywords.map(normalize)];
      if (haystack.some((candidate) => candidate.includes(normalizedQuery))) {
        total += 60;
      }
    }

    total += KIND_BONUS[entry.kind];

    // Shorter titles are usually the more general, more useful answer.
    total -= Math.min(entry.title.length / 12, 6);

    hits.push({ entry, score: Math.round(total) });
  }

  hits.sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title));

  // Collapse near-duplicates: keep the best hit per department per kind.
  const seen = new Set<string>();
  const deduped: SearchHit[] = [];

  for (const hit of hits) {
    const key = `${hit.entry.kind}:${hit.entry.departmentSlug}`;
    if (hit.entry.kind === "service" && seen.has(key)) continue;
    seen.add(key);
    deduped.push(hit);
  }

  return deduped.slice(0, limit);
}

/** Departments referenced by the top hits, in relevance order, de-duplicated. */
export function departmentSlugsFor(hits: SearchHit[]): string[] {
  const slugs: string[] = [];
  for (const hit of hits) {
    if (!slugs.includes(hit.entry.departmentSlug)) slugs.push(hit.entry.departmentSlug);
  }
  return slugs;
}
