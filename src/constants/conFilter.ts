import type { IFilterOption } from '@/types/news.types';

export const CON_NEWS_SEARCH_TOP_HEADLINES_FILTER_OPTIONS: IFilterOption[] = [
  'country',
  'category',
  'sources',
  'pageSize',
  'searchIn',
];
export const CON_NEWS_SEARCH_EVERYTHING_FILTER_OPTIONS: IFilterOption[] = [
  'searchIn',
  'sources',
  'domains',
  'excludeDomains',
  'from',
  'to',
  'sortBy',
  'pageSize',
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
