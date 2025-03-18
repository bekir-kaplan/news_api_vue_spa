export type TSortBy = 'relevancy' | 'popularity' | 'publishedAt';
export interface INewsReqTopHeadlineQParam {
  q?: string;
  country?: string;
  category?: string;
  sources?: string;
  pageSize?: number;
  page?: number;
}
export interface INewsReqEverythingQParam {
  q?: string;
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

export interface INewsFilterParam {
  groupBy?: 'category' | 'country' | 'language';
}

export interface INewsFilterOptions
  extends INewsReqTopHeadlineQParam,
    INewsReqEverythingQParam,
    INewsReqSourceQParam,
    INewsFilterParam {}

export type TNewsFilterOptions = keyof INewsFilterOptions;
