import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { useApiCacheStore } from '@/stores/apiCacheStore'; // Import the cache store
import { checkErrorInFinanceApiResponse, handleHttpError } from '@/api/utils/ErrorHandler';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  constructor(baseURL: string, config: AxiosRequestConfig = {}) {
    this.instance = axios.create({ baseURL, ...config });
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor(): void {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError);
  }

  private _handleResponse = ({ data }: AxiosResponse): any => data;

  protected _handleError = (error: any): Promise<typeof Error> => {
    const message =
      error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  };

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
    cacheTime = 600000 * 3, // Default cache expiry: 30 minutes
    useCache = false // Default to not using cache
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

    try {
      const response = await this.instance.get<T, T>(url, config);
      checkErrorInFinanceApiResponse(response);
      if (useCache) {
        const cacheKey = this._getCacheKey(url, config);
        this._storeInCache(cacheStore, cacheKey, response);
      }
      return response;
    } catch (error) {
      handleHttpError(error);
    }
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
