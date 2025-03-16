import type { NewsAPIResponse, NewsAPISourceResponse } from '@/api/types/responses';
import type { MappedNewsResponse, MappedSourceResponse } from '@/api/types/mappedTypes';
import type { NewsAPIArticle, NewsAPISource } from '@/api/types/news';

export function mapArticle(
  response: NewsAPIResponse,
  category: string | undefined
): NewsAPIArticle[] {
  return response.articles.map((article) => ({
    source: {
      id: article.source.id,
      name: article.source.name,
    },
    author: article.author || 'Unknown',
    title: article.title,
    description: article.description || '',
    url: article.url,
    urlToImage: article.urlToImage || '',
    publishedAt: new Date(article.publishedAt),
    content: article.content || '',
    category: category || 'general',
  }));
}

export function mapSource(response: NewsAPISourceResponse): NewsAPISource[] {
  return response.sources.map((source) => ({
    id: source.id,
    name: source.name,
    description: source.description,
    url: source.url,
    category: source.category,
    language: source.language,
    country: source.country,
  }));
}

export function mapNewsResponse(
  response: NewsAPIResponse,
  category?: string | undefined
): MappedNewsResponse {
  return {
    articles: mapArticle(response, category),
    totalResults: response.totalResults,
    status: response.status === 'ok' ? 'success' : 'error',
  };
}

export function mapStatusResponse(response: NewsAPISourceResponse): MappedSourceResponse {
  return {
    sources: mapSource(response),
    status: response.status === 'ok' ? 'success' : 'error',
  };
}
