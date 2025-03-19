/**
 * Finance API Configuration (Twelve Data)
 * ----------------------------------------
 * This module provides configuration settings for the Twelve Data API,
 * including Axios request options, API endpoints, and the base URL.
 *
 * Configuration Includes:
 * - `AXIOS`: Default Axios request configuration (headers, params, timeout).
 * - `ENDPOINTS`: API endpoint paths for different financial data queries.
 * - `BASE_URL`: The base URL for Twelve Data API.
 * - `REQUEST_DEFAULTS`: Default values for API requests.
 *
 * Usage:
 * Import `CONFIG_FINANCE` wherever financial API requests need to be made.
 */

import type { AxiosRequestConfig } from 'axios';

// Finance Api Config
const TWELVE_DATA_CONFIG: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  params: {
    apikey: import.meta.env.VITE_TWELVE_DATA_API_KEY,
  },
  timeout: 10000,
};

const TWELVE_DATA_ENDPOINTS = {
  TIME_SERIES: '/time_series',
  QUOTE: '/quote',
  PRICE: '/price',
  MARKET_STATE: '/market_state',
} as const;

const TWELVE_DATA_BASE_URL = import.meta.env.VITE_TWELVE_DATA_BASE_URL;

const REQUEST_DEFAULTS = {
  INTERVAL: '1day',
  OUTPUT_SIZE: 30,
};

const CONFIG_FINANCE = {
  AXIOS: TWELVE_DATA_CONFIG,
  ENDPOINTS: TWELVE_DATA_ENDPOINTS,
  BASE_URL: TWELVE_DATA_BASE_URL,
  REQUEST_DEFAULTS,
};

export default CONFIG_FINANCE;
