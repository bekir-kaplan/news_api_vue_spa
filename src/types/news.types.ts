import type {
  INewsReqSourceQParam,
  INewsReqEverythingQParam,
  INewsReqTopHeadlineQParam,
  INewsFilterParam,
} from '@/api/types/news/newsRequests';

/**
 * Sorting options for news queries.
 * - `relevancy`: Articles are sorted by relevance to the search query.
 * - `popularity`: Articles are sorted by popularity among sources.
 * - `publishedAt`: Articles are sorted by the date they were published.
 */
export type TSortBy = 'relevancy' | 'popularity' | 'publishedAt';
export type TNewsFilterParam = 'category' | 'country' | 'language';
export type TNewsFilterSearchIn = 'title' | 'description' | 'content';
export type TCategoryKey =
  | 'business'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology'
  | 'politics'
  | 'general';

export type IFilterOption =
  | keyof INewsReqSourceQParam
  | keyof INewsReqEverythingQParam
  | keyof INewsReqTopHeadlineQParam
  | keyof INewsFilterParam;

export interface ILikedArticlesByCategory {
  [key: string]: {
    category: TCategoryKey | 'Uncategorized';
    count: number;
  };
}
