import type { NewsAPIArticle, NewsAPISource } from '@/api/types/news';

// News API Response Types
export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
  message?: string;
}

// Generic API Response type for future endpoints
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface NewsAPISourceResponse {
  status: string;
  sources: NewsAPISource[];
}
