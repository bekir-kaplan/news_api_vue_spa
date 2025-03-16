export type TNewsReqTopHeadlineQParam = keyof INewsReqTopHeadlineQParam;
export type TSortBy = 'relevancy' | 'popularity' | 'publishedAt';
export interface INewsReqTopHeadlineQParam {
  country?: string;
  category?: string;
  sources?: string;
  q?: string;
  pageSize?: number;
  page?: number;
}
export interface INewsReqEverythingQParam {
  q: string;
  searchIn?: string; // title, description, content,
  sources?: string;
  excludeDomains?: string;
  domains?: string;
  from?: string;
  to?: string;
  language?: string;
  sortBy?: TSortBy;
  pageSize?: number;
  page?: number;
  category?: string;
}
export interface INewsReqSourceQParam {
  country?: string;
  language?: string;
  category?: string;
}
