// News API Response Types
export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
  message?: string;
}

export interface NewsAPIArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}
// Generic API Response type for future endpoints
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
