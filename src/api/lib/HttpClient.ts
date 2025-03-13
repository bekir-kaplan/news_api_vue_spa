import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { useApiCacheStore } from '@/stores/apiCacheStore'; // Import the cache store

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
   * Perform a GET request with caching.
   * @param url - The URL to request.
   * @param config - Axios request configuration.
   * @param cacheTime - Cache expiry time in milliseconds (default: 10 minutes).
   * @returns The response data.
   */
  protected async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    cacheTime = 600000 * 6 // Default cache expiry: 10 minutes
  ): Promise<T> {
    const cacheStore = useApiCacheStore(); // Access the Pinia store

    // Unique cache key (URL + query params)
    const queryString = config?.params ? JSON.stringify(config.params) : '';
    const cacheKey = `${url}?${queryString}`;

    // If data exists in cache, return it.
    const cachedData = cacheStore.getCache(cacheKey, cacheTime);

    if (cachedData) {
      console.log(`Cache hit for: ${cacheKey}`);
      return cachedData as T;
    }

    // If not cached, make the request
    console.log(`Fetching new data for: ${cacheKey}`);
    const response = await this.instance.get<T, T>(url, config);

    // Store response in cache
    cacheStore.setCache(cacheKey, response);

    return response;
  }
}
