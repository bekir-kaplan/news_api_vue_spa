/**
 * News API Response Interfaces
 * ----------------------------------
 * These interfaces define the structure of **responses** returned
 * from the News API when fetching news articles and sources.
 *
 * Features:
 * - `INewsApiRes`: Represents the response structure for fetching news articles.
 * - `INewsApiResSource`: Represents the response structure for fetching news sources.
 *
 * Dependencies:
 * - Uses `INewsArticle` for individual news articles.
 * - Uses `INewsSource` for individual news sources.
 */
import type { INewsArticle, INewsSource } from '@/api/types/news/news';

export type IResStatusType = 'ok' | 'error';
export interface INewsApiRes {
  status: IResStatusType;
  totalResults: number;
  articles: INewsArticle[];
  message?: string;
}

export interface INewsApiResSource {
  status: IResStatusType;
  sources: INewsSource[];
}
