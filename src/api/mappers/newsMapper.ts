import type { NewsAPIArticle, NewsAPIResponse } from '../types/responses';
import type { Article, MappedNewsResponse } from '../types/mappedTypes';

export function mapArticle(article: NewsAPIArticle): Article {
  return {
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
    category: detectCategory(`${article.title} ${article.description}`),
  };
}

export function mapNewsResponse(response: NewsAPIResponse): MappedNewsResponse {
  return {
    articles: response.articles.map(mapArticle),
    totalResults: response.totalResults,
    status: response.status === 'ok',
  };
}

function detectCategory(content: string): string {
  const categoryKeywords = {
    business: ['economy', 'market', 'stock', 'trade'],
    technology: ['tech', 'technology', 'software', 'hardware', 'digital'],
    sports: ['sport', 'game', 'match', 'tournament', 'championship'],
    entertainment: ['entertainment', 'movie', 'music', 'celebrity', 'art'],
    health: ['health', 'medical', 'disease', 'treatment', 'wellness'],
    science: ['science', 'research', 'study', 'discovery'],
    politics: ['politics', 'government', 'election', 'policy'],
    general: ['world', 'international', 'global', 'foreign'],
  };

  const lowerContent = content.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((keyword) => lowerContent.includes(keyword))) {
      return category;
    }
  }

  return 'general';
}
