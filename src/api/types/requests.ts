export interface TopHeadlinesParams {
  country?: string;
  category?: string;
  sources?: string;
  q?: string;
  language?: string;
  pageSize?: number;
  page?: number;
}

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
