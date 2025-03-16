import type { AxiosRequestConfig } from 'axios';

// News Api Config
export const NEWS_API_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': import.meta.env.VITE_NEWS_API_KEY,
  },
  timeout: 10000,
};

export const NEWS_API_ENDPOINTS = {
  TOP_HEADLINES: '/v2/top-headlines',
  EVERYTHING: '/v2/everything',
  SOURCES: '/v2/top-headlines/sources',
} as const;

export const NEWS_API_BASE_URL = import.meta.env.VITE_NEWS_DATA_BASE_URL;

// Finance Api Config
export const TWELVE_DATA_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apikey: import.meta.env.VITE_TWELVE_DATA_API_KEY,
  },
  timeout: 10000,
};

export const TWELVE_DATA_ENDPOINTS = {
  TIME_SERIES: '/time_series',
  QUOTE: '/quote',
  PRICE: '/price',
  MARKET_STATE: '/market_state',
} as const;

export const TWELVE_DATA_BASE_URL = import.meta.env.VITE_TWELVE_DATA_BASE_URL;
