/**
 * Wire format for `/api/search`.
 *
 * Kept in its own module so the client component and the route handler share
 * one definition. Client-safe: types only, no server imports.
 */
import type { SearchKind } from "@/lib/search/catalog";

export interface SearchResultItem {
  id: string;
  kind: SearchKind;
  title: string;
  subtitle: string;
  summary: string;
  department: {
    slug: string;
    name: string;
    location?: string;
    hours?: string;
  } | null;
  /** Where clicking this result should take the user. */
  href: string;
  score: number;
}

export interface SearchApiResponse {
  query: string;
  count: number;
  results: SearchResultItem[];
  error?: string;
}
