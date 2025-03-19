/**
 * News API Mapped Response Types
 * ----------------------------------
 * These interfaces define the structure of **mapped** responses
 * after processing raw API data from the News API.
 *
 * Features:
 * - `INewsMapNewsRes`: Represents a processed news response.
 * - `INewsMapSourceRes`: Represents a processed news sources response.
 *
 * Dependencies:
 * - Uses `INewsArticle` for individual news articles.
 * - Uses `INewsSource` for individual news sources.
 */
import type { INewsArticle, INewsSource } from '@/api/types/news/news';

export interface INewsMapNewsRes {
  status: string;
  totalResults: number;
  articles: INewsArticle[];
}

export interface INewsMapSourceRes {
  status: 'success' | 'error';
  sources: INewsSource[];
}
