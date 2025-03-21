/**
 * News Service (News API)
 * -----------------------------------
 * This service interacts with the News API to fetch top headlines,
 * search for news articles, and retrieve news sources.
 *
 * Features:
 * - Fetch top headlines with optional filters (country, category, etc.).
 * - Search for news articles based on keywords, language, and sorting preferences.
 * - Retrieve a list of available news sources.
 *
 * Dependencies:
 * - `BaseService`: A base class for API requests.
 * - `API_CONFIGS.CONFIG_NEWS`: Stores API configuration details.
 * - `newsMapper`: Maps API responses into structured data.
 * - `utils`: Provides utility functions like date formatting.
 *
 * Usage:
 * Import `newsService` and call methods like `newsService.getTopHeadlines()`.
 */

import { BaseService } from '@/api/core/BaseService';
import API_CONFIGS from '@/api/config/index';
import { mapNewsResponse, mapStatusResponse } from '@/api/mappers/newsMapper';
import utils from '@/utils';
import type { INewsMapNewsRes, INewsMapSourceRes } from '@/api/types/news/newsMap';
import type {
  INewsReqTopHeadlineQParam,
  INewsReqEverythingQParam,
  INewsReqSourceQParam,
} from '@/api/types/news/newsRequests';
import type { INewsApiRes, INewsApiResSource } from '@/api/types/news/newsResponses';

class NewsService extends BaseService {
  private apiConfig = API_CONFIGS.CONFIG_NEWS;
  constructor() {
    super(API_CONFIGS.CONFIG_NEWS.BASE_URL, API_CONFIGS.CONFIG_NEWS.AXIOS);
  }

  /**
   * Fetches top headlines based on query parameters.
   * @param {INewsReqTopHeadlineQParam} [params={ country: 'us' }] - For filtering news.
   * @returns {Promise<INewsMapNewsRes>}
   */
  async getTopHeadlines(params: INewsReqTopHeadlineQParam): Promise<INewsMapNewsRes> {
    const response = await this.get<INewsApiRes>(API_CONFIGS.CONFIG_NEWS.ENDPOINTS.TOP_HEADLINES, {
      params: {
        ...params,
      },
    });

    return mapNewsResponse(response, params.category);
  }

  /**
   * Searches for news articles based on provided parameters.
   * @param {INewsReqEverythingQParam} params - Query parameters for searching news.
   * @returns {Promise<INewsMapNewsRes>}
   */
  async searchNews(params: INewsReqEverythingQParam): Promise<INewsMapNewsRes> {
    const requestDefaults = this.apiConfig.REQUEST_DEFAULTS;
    const response = await this.get<INewsApiRes>(this.apiConfig.ENDPOINTS.EVERYTHING, {
      params: {
        ...params,
        pageSize: params.pageSize || requestDefaults.MAX_RESULT_PER_REQUEST,
        from: params.from || utils.getDate({ currentDate: Date.now(), dayBefore: 1 }),
      },
    });

    return mapNewsResponse(response);
  }

  /**
   * Retrieves a list of news sources based on optional parameters.
   * @param {INewsReqSourceQParam} [params] - Optional query parameters for filtering sources.
   * @returns {Promise<INewsMapSourceRes>} - Resolving to the mapped news sources response.
   */
  async getSources(params?: INewsReqSourceQParam): Promise<INewsMapSourceRes> {
    const response = await this.get<INewsApiResSource>(API_CONFIGS.CONFIG_NEWS.ENDPOINTS.SOURCES, {
      params: { ...params },
    });

    return mapStatusResponse(response);
  }
}

export const newsService = new NewsService();
