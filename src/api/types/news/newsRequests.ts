/**
 * News API Request Parameters
 * ----------------------------------
 * These interfaces define the structure of request parameters used
 * when querying the News API.
 *
 * Features:
 * - `TSortBy`: Defines sorting options for news queries.
 * - `INewsReqTopHeadlineQParam`: Defines parameters for fetching top headlines.
 * - `INewsReqEverythingQParam`: Defines parameters for searching all news articles.
 * - `INewsReqSourceQParam`: Defines parameters for retrieving available news sources.
 * - `INewsFilterParam`: Defines filtering options for grouping results.
 * - `INewsFilterOptions`: Combines all request parameters into a single interface.
 * - `TNewsFilterOptions`: Defines valid filter option keys.
 *
 * Dependencies:
 * - Uses `TCategoryKey` for categorization.
 * - Uses `TNewsFilterParam` for grouping.
 * - Uses `TSortBy` for sorting.
 */
import type { TCategoryKey, TNewsFilterParam, TSortBy } from '@/types/news.types';

export interface INewsReqTopHeadlineQParam {
  q?: string;
  country?: string;
  category?: TCategoryKey;
  sources?: string;
  pageSize?: number;
  page?: number;
}
export interface INewsReqEverythingQParam {
  q?: string; // Keywords or phrases to search for
  searchIn?: string; // Fields to search in: title, description, content
  sources?: string; // Comma-separated list of news source IDs
  excludeDomains?: string; // Domains to exclude from results
  domains?: string; // Domains to include in results
  from?: string; // Start date for filtering results (ISO 8601 format)
  to?: string; // End date for filtering results (ISO 8601 format)
  language?: string; // Language code (e.g., 'en' for English)
  sortBy?: TSortBy; // Sorting method: 'relevancy', 'popularity', or 'publishedAt'
  pageSize?: number; // Number of results per page (default: 20, max: 100)
  page?: number; // Page number for pagination
  category?: TCategoryKey; // Optional category filter
}
export interface INewsReqSourceQParam {
  country?: string;
  language?: string;
  category?: TCategoryKey;
}

export interface INewsFilterParam {
  groupBy?: TNewsFilterParam;
}

export interface INewsFilterOptions
  extends INewsReqTopHeadlineQParam,
    INewsReqEverythingQParam,
    INewsReqSourceQParam,
    INewsFilterParam {}

/**
 * Defines **valid filter option keys**.
 * - Extracts keys from `INewsFilterOptions` to ensure consistency.
 */
export type TNewsFilterOptions = keyof INewsFilterOptions;
