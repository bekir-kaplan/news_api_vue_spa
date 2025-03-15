import type { NewsAPIResponse } from '@/api/types/responses';
import type { MappedNewsResponse } from '@/api/types/mappedTypes';
import type { NewsAPIArticle } from '@/api/types/news';

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
