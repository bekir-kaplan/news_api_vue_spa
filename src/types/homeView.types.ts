import type { INewsReqTopHeadlineQParam } from '@/api/types/requests';
import type { ICategoryKey } from './news.types';

export interface ISection extends INewsReqTopHeadlineQParam {
  pageSize?: number;
  title?: string;
}

export interface ICategoryElement {
  key: ICategoryKey;
  value: string;
}

export type ICategory = {
  [key in ICategoryKey]: ICategoryElement;
};
