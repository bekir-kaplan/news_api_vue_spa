import type { INewsApiRes, INewsApiResSource } from '@/api/types/responses';
import type { INewsMapNewsRes, INewsMapSourceRes } from '@/api/types/mapTypes';
import type { INewsArticle, INewsSource } from '@/api/types/news';

export function mapArticle(response: INewsApiRes, category: string | undefined): INewsArticle[] {
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

export function mapSource(response: INewsApiResSource): INewsSource[] {
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
  response: INewsApiRes,
  category?: string | undefined
): INewsMapNewsRes {
  return {
    articles: mapArticle(response, category),
    totalResults: response.totalResults,
    status: response.status === 'ok' ? 'success' : 'error',
  };
}

export function mapStatusResponse(response: INewsApiResSource): INewsMapSourceRes {
  return {
    sources: mapSource(response),
    status: response.status === 'ok' ? 'success' : 'error',
  };
}
