import type { INewsReqTopHeadlineQParam } from '@/api/types/requests';
import type { TCategoryKey } from './news.types';

export interface ISection extends INewsReqTopHeadlineQParam {
  pageSize?: number;
  title?: string;
}

export interface ICategoryElement {
  key: TCategoryKey;
  value: string;
}

export type ICategory = {
  [key in TCategoryKey]: ICategoryElement;
};
