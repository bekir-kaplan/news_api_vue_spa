/**
 * News API Interfaces
 * --------------------------
 * These interfaces define the structure of **news articles** and **news sources**
 * received from the News API.
 *
 * Features:
 * - `INewsArticle`: Represents a single news article with structured properties.
 * - `INewsSource`: Defines a news source (publisher) with metadata.
 *
 * Dependencies:
 * - Uses `TCategoryKey` to categorize news articles.
 */
import type { TCategoryKey } from '@/types/news.types';

export interface INewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: Date;
  content: string | null;
  category?: TCategoryKey;
}

export interface INewsSource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}
