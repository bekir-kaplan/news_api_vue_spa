import type {
  INewsFilterParam,
  INewsReqEverythingQParam,
  INewsReqSourceQParam,
  INewsReqTopHeadlineQParam,
} from '@/api/types/requests';

export type ICategoryKey =
  | 'all'
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
