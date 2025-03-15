export interface TopHeadlinesParams {
  country?: string;
  category?: string;
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
}

export type TopHeadlinesParamTypes = keyof TopHeadlinesParams;

export interface SearchNewsParams {
  q: string;
  sources?: string;
  domains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
  page?: number;
  category?: string;
}

export interface SourcesParams {
  category?: string;
  language?: string;
  country?: string;
}
