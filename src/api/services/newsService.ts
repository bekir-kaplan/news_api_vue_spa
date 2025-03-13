import { HttpClient } from '@/api/lib/HttpClient';
import { API_BASE_URL, API_CONFIG, API_ENDPOINTS } from '@/api/config';
import type { NewsAPIResponse, NewsAPISourcesResponse } from '@/api/types/responses';
import type { TopHeadlinesParams, SearchNewsParams } from '@/api/types/requests';
import { mapNewsResponse } from '@/api/mappers/newsMapper';
import type { MappedNewsResponse } from '@/api/types/mappedTypes';
import everythingMockData from '@/mocks/newsapi/everything.json';
import topHeadlinesMockData from '@/mocks/newsapi/top-headlines.json';

class NewsService extends HttpClient {
  constructor() {
    super(API_BASE_URL, API_CONFIG);
  }

  async getTopHeadlines(
    params: TopHeadlinesParams = { country: 'us' }
  ): Promise<MappedNewsResponse> {
    try {
      const response = await this.get<NewsAPIResponse>(API_ENDPOINTS.TOP_HEADLINES, {
        params: {
          ...params,
          pageSize: params.pageSize || 20,
          language: params.language || 'en',
          country: params.country || 'us',
        },
      });

      if (response.status === 'error') {
        throw new Error(response.message || 'Failed to fetch top headlines');
      }

      return mapNewsResponse(response);
    } catch (error) {
      // console.warn('Failed to fetch from API, using mock data:', error);
      let filteredArticles = topHeadlinesMockData.articles;

      if (params.category) {
        filteredArticles = filteredArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(params.category!.toLowerCase()) ||
            article.description?.toLowerCase().includes(params.category!.toLowerCase()) ||
            article.content?.toLowerCase().includes(params.category!.toLowerCase())
        );
      }

      return mapNewsResponse({
        status: 'ok',
        totalResults: filteredArticles.length,
        articles: filteredArticles,
      });
    }
  }

  async searchNews(params: SearchNewsParams): Promise<MappedNewsResponse> {
    try {
      const response = await this.get<NewsAPIResponse>(API_ENDPOINTS.EVERYTHING, {
        params: {
          ...params,
          pageSize: params.pageSize || 20,
          language: params.language || 'en',
          sortBy: params.sortBy || 'publishedAt',
          from:
            params.from ||
            new Date(Date.now() - 30 * 12 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
      });

      if (response.status === 'error') {
        throw new Error(response.message || 'Failed to search news');
      }

      return mapNewsResponse(response);
    } catch (error) {
      // console.warn('Failed to fetch from API, using filtered mock data:', error);
      let filteredArticles = everythingMockData.articles.filter(
        (article) =>
          article.title?.toLowerCase().includes(params.q.toLowerCase()) ||
          article.description?.toLowerCase().includes(params.q.toLowerCase()) ||
          article.content?.toLowerCase().includes(params.q.toLowerCase())
      );

      if (params.category) {
        filteredArticles = filteredArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(params.category!.toLowerCase()) ||
            article.description?.toLowerCase().includes(params.category!.toLowerCase()) ||
            article.content?.toLowerCase().includes(params.category!.toLowerCase())
        );
      }

      return mapNewsResponse({
        status: 'ok',
        totalResults: filteredArticles.length,
        articles: filteredArticles,
      });
    }
  }

  async getSources(category?: string): Promise<string[]> {
    try {
      const response = await this.get<NewsAPISourcesResponse>(API_ENDPOINTS.SOURCES, {
        params: {
          category,
          language: 'en',
        },
      });

      return response.sources?.map((source: any) => source.id);
    } catch (error) {
      console.warn('Failed to fetch sources:', error);
      return [];
    }
  }
}

export const newsService = new NewsService();
