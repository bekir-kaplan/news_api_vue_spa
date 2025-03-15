import { HttpClient } from '@/api/lib/HttpClient';
import { NEWS_API_BASE_URL, NEWS_API_CONFIG, NEWS_API_ENDPOINTS } from '@/api/config';
import type { NewsAPIResponse, NewsAPISourcesResponse } from '@/api/types/responses';
import type { TopHeadlinesParams, SearchNewsParams } from '@/api/types/requests';
import { mapNewsResponse } from '@/api/mappers/newsMapper';
import type { MappedNewsResponse } from '@/api/types/mappedTypes';

class NewsService extends HttpClient {
  constructor() {
    super(NEWS_API_BASE_URL, NEWS_API_CONFIG);
  }

  async getTopHeadlines(
    params: TopHeadlinesParams = { country: 'us' }
  ): Promise<MappedNewsResponse> {
    const response = await this.get<NewsAPIResponse>(NEWS_API_ENDPOINTS.TOP_HEADLINES, {
      params: {
        ...params,
      },
    });

    return mapNewsResponse(response, params.category);
  }

  async searchNews(params: SearchNewsParams): Promise<MappedNewsResponse> {
    const response = await this.get<NewsAPIResponse>(NEWS_API_ENDPOINTS.EVERYTHING, {
      params: {
        ...params,
        pageSize: params.pageSize || 20, // TODO: pagesize
        language: params.language || 'en',
        sortBy: params.sortBy || 'publishedAt',
        from:
          params.from ||
          new Date(Date.now() - 30 * 12 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
    });

    return mapNewsResponse(response);
  }

  async getSources(category?: string): Promise<string[]> {
    const response = await this.get<NewsAPISourcesResponse>(NEWS_API_ENDPOINTS.SOURCES, {
      params: {
        category,
        language: 'en',
      },
    });

    return response.sources?.map((source: any) => source.id);
  }
}

export const newsService = new NewsService();
