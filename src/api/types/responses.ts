import type { INewsArticle, INewsSource } from '@/api/types/news';

// News API Response Types
export interface INewsApiRes {
  status: string;
  totalResults: number;
  articles: INewsArticle[];
  message?: string;
}

export interface INewsApiResSource {
  status: string;
  sources: INewsSource[];
}
