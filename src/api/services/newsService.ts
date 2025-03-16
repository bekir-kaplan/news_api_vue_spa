import { HttpClient } from '@/api/lib/HttpClient';
import { NEWS_API_BASE_URL, NEWS_API_CONFIG, NEWS_API_ENDPOINTS } from '@/api/config';
import type { NewsAPIResponse, NewsAPISourceResponse } from '@/api/types/responses';
import type {
  TopHeadlinesParams,
  SearchNewsParams,
  SearchSourceParams,
} from '@/api/types/requests';
import { mapNewsResponse, mapStatusResponse } from '@/api/mappers/newsMapper';
import type { MappedNewsResponse, MappedSourceResponse } from '@/api/types/mappedTypes';

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

  async getTopHeadlinesSource(
    params: TopHeadlinesParams = { country: 'us' }
  ): Promise<MappedNewsResponse> {
    const response = await this.get<NewsAPIResponse>(NEWS_API_ENDPOINTS.SOURCES, {
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

  async getSources(params?: SearchSourceParams): Promise<MappedSourceResponse> {
    const response = await this.get<NewsAPISourceResponse>(NEWS_API_ENDPOINTS.SOURCES, {
      params: { ...params },
    });

    return mapStatusResponse(response);
  }
}

export const newsService = new NewsService();
