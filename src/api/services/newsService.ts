import { HttpClient } from '@/api/lib/HttpClient';
import { NEWS_API_BASE_URL, NEWS_API_CONFIG, NEWS_API_ENDPOINTS } from '@/api/config';
import type { INewsApiRes, INewsApiResSource } from '@/api/types/responses';
import type {
  INewsReqTopHeadlineQParam,
  INewsReqEverythingQParam,
  INewsReqSourceQParam,
} from '@/api/types/requests';
import { mapNewsResponse, mapStatusResponse } from '@/api/mappers/newsMapper';
import type { INewsMapNewsRes, INewsMapSourceRes } from '@/api/types/mapTypes';

class NewsService extends HttpClient {
  constructor() {
    super(NEWS_API_BASE_URL, NEWS_API_CONFIG);
  }

  async getTopHeadlines(
    params: INewsReqTopHeadlineQParam = { country: 'us' }
  ): Promise<INewsMapNewsRes> {
    const response = await this.get<INewsApiRes>(NEWS_API_ENDPOINTS.TOP_HEADLINES, {
      params: {
        ...params,
      },
    });

    return mapNewsResponse(response, params.category);
  }

  async searchNews(params: INewsReqEverythingQParam): Promise<INewsMapNewsRes> {
    const response = await this.get<INewsApiRes>(NEWS_API_ENDPOINTS.EVERYTHING, {
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

  async getSources(params?: INewsReqSourceQParam): Promise<INewsMapSourceRes> {
    const response = await this.get<INewsApiResSource>(NEWS_API_ENDPOINTS.SOURCES, {
      params: { ...params },
    });

    return mapStatusResponse(response);
  }
}

export const newsService = new NewsService();
