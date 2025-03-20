import type { INewsReqTopHeadlineQParam } from '@/api/types/news/newsRequests';
import type { TCategoryKey } from '@/types/news.types';

export interface ISection extends INewsReqTopHeadlineQParam {
  pageSize?: number;
  category: TCategoryKey;
  title?: string;
}

export interface ICategoryElement {
  key: TCategoryKey;
  value: string;
}

export type ICategory = {
  [key in TCategoryKey]: ICategoryElement;
};
