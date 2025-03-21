/**
 * News API Constants
 * ----------------------------------------------------
 * This file contains predefined constants for configuring the news API search,
 * filtering options, and language mappings. These constants help standardize
 * API interactions across the application.
 *
 * Key Features:
 * - **Search Endpoints**: Defines available endpoints (`TOP_HEADLINES` and `EVERYTHING`).
 * - **Filter Options**:
 *   - `CON_NEWS_SEARCH_TOP_HEADLINES_FILTER_OPTIONS` - Filters for fetching top headlines.
 *   - `CON_NEWS_SEARCH_EVERYTHING_FILTER_OPTIONS` - Filters for retrieving all news articles.
 *   - `CON_NEWS_SOURCE_FILTER_OPTIONS` - Filters for retrieving available news sources.
 * - **Language Mapping**: Provides a dictionary for language codes and their human-readable names.
 * - **Default Values**: Defines default selections for dropdowns and filters.
 *
 * Usage:
 * These constants should be imported wherever API queries or filters are needed.
 */

import type { IFilterOption } from '@/types/news.types';

export const CON_NEWS_SEARCH_ENDPOINTS = {
  TOP_HEADLINES: { key: 'top-headlines', value: 'Top Headlines' },
  EVERYTHING: { key: 'everything', value: 'Everything' },
};

export const CON_NEWS_SEARCH_TOP_HEADLINES_FILTER_OPTIONS: IFilterOption[] = [
  'country',
  'category',
  'sources',
  'pageSize',
  'searchIn',
];
export const CON_NEWS_SEARCH_EVERYTHING_FILTER_OPTIONS: IFilterOption[] = [
  'country',
  'category',
  'searchIn',
  'sources',
  'domains',
  'excludeDomains',
  'from',
  'to',
  'sortBy',
];
export const CON_NEWS_SOURCE_FILTER_OPTIONS: IFilterOption[] = [
  'category',
  'country',
  'language',
  'groupBy',
];
export const CON_SELECT_ELEMENT_DEFAULT_VALUE_ALL = 'all';

export const CON_LANGUAGE_MAPPING: Record<string, string> = {
  en: 'English',
  no: 'Norwegian',
  it: 'Italian',
  ar: 'Arabic',
  ud: 'Urdu',
  de: 'German',
  pt: 'Portuguese',
  es: 'Spanish',
  fr: 'French',
  he: 'Hebrew',
  ru: 'Russian',
  sv: 'Swedish',
  nl: 'Dutch',
  zh: 'Chinese',
};
