/**
 * News API Configuration
 * --------------------------
 * This module defines configuration settings for the News API,
 * including Axios request options, API endpoints, base URL, and
 * default request parameters.
 *
 * Configuration Includes:
 * - `AXIOS`: Default Axios request configuration.
 * - `ENDPOINTS`: API endpoint paths for different news data queries.
 * - `BASE_URL`: The base URL for the News API.
 * - `REQUEST_DEFAULTS`: Default values for API requests.
 *
 * Usage:
 * Import `CONFIG_NEWS` where API requests need to be made.
 */

import type { AxiosRequestConfig } from 'axios';

// News Api Config
const NEWS_API_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': import.meta.env.VITE_NEWS_API_KEY,
  },
  timeout: 10000,
};

const NEWS_API_ENDPOINTS = {
  TOP_HEADLINES: '/v2/top-headlines',
  EVERYTHING: '/v2/everything',
  SOURCES: '/v2/top-headlines/sources',
} as const;

const NEWS_API_BASE_URL = import.meta.env.VITE_NEWS_DATA_BASE_URL;

const REQUEST_DEFAULTS = {
  MAX_SEARCH_INPUT_CHARACTER: 500,
  MAX_RESULT_PER_REQUEST: 100,
  HEADLINE_DEFAULT_COUNTRY: 'us',
  DEFAULT_LANG: 'en',
  DEFAULT_SORT: 'publishedAt',
};

const CONFIG_NEWS = {
  AXIOS: NEWS_API_CONFIG,
  ENDPOINTS: NEWS_API_ENDPOINTS,
  BASE_URL: NEWS_API_BASE_URL,
  REQUEST_DEFAULTS,
};

export default CONFIG_NEWS;
