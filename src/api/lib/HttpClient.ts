import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { useApiCacheStore } from '@/stores/apiCacheStore'; // Import the cache store
import { handleHttpError } from '@/api/utils/ErrorHandler';
import { checkErrorInFinanceApiResponse } from '@/api/utils/FinanceErrorHandler';
import { checkErrorInNewsApiResponse } from '@/api/utils/NewsErrorHandler';
import { NEWS_API_BASE_URL, TWELVE_DATA_BASE_URL } from '@/api/config';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  constructor(baseURL: string, config: AxiosRequestConfig = {}) {
    this.instance = axios.create({ baseURL, ...config });
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor(): void {
    this.instance.interceptors.response.use(this._handleResponse, handleHttpError);
  }

  private _handleResponse = ({ data }: AxiosResponse): any => data;

  // protected _handleError = (error: any): Promise<typeof Error> => {
  //   const message =
  //     error.response?.data?.message || error.message || 'An unexpected error occurred';
  //   return Promise.reject(new Error(message));
  // };

  /**
   * Perform a GET request with optional caching.
   * @param url - The URL to request.
   * @param config - Axios request configuration.
   * @param cacheTime - Cache expiry time in milliseconds (default: 10 minutes).
   * @param useCache - Whether to use caching (default: true).
   * @returns The response data.
   */
  protected async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    cacheTime = 600000 * 6, // Default cache expiry: 1 hour
    useCache = true // Default to not using cache
  ): Promise<T> {
    const cacheStore = useApiCacheStore(); // Access the Pinia store

    if (useCache) {
      const cacheKey = this._getCacheKey(url, config);
      const cachedData = this._getCachedData<T>(cacheStore, cacheKey, cacheTime);
      if (cachedData) {
        // console.log(`Cache hit for: ${cacheKey}`);
        return cachedData;
      }
    }

    const response = await this.instance.get<T, T>(url, config);

    if (this.instance.getUri().indexOf(TWELVE_DATA_BASE_URL) !== -1) {
      checkErrorInFinanceApiResponse(response);
    } else if (this.instance.getUri().indexOf(NEWS_API_BASE_URL) !== -1) {
      checkErrorInNewsApiResponse(response);
    }
    if (useCache) {
      const cacheKey = this._getCacheKey(url, config);
      this._storeInCache(cacheStore, cacheKey, response);
    }
    return response;
  }

  private _getCacheKey(url: string, config?: AxiosRequestConfig): string {
    const queryString = config?.params ? JSON.stringify(config.params) : '';
    return `${url}?${queryString}`;
  }

  private _getCachedData<T>(
    cacheStore: ReturnType<typeof useApiCacheStore>,
    cacheKey: string,
    cacheTime: number
  ): T | null {
    return cacheStore.getCache(cacheKey, cacheTime) as T | null;
  }

  private _storeInCache<T>(
    cacheStore: ReturnType<typeof useApiCacheStore>,
    cacheKey: string,
    data: T
  ): void {
    cacheStore.setCache(cacheKey, data);
  }
}
