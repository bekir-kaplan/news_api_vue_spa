/**
 * Finance Service (Twelve Data API)
 * -----------------------------------
 * This service interacts with the Twelve Data API to fetch financial data,
 * including time series data, stock quotes, and market states.
 *
 * Features:
 * - Fetch historical time series data with configurable intervals.
 * - Retrieve real-time stock or currency quotes.
 * - Check the market state for a given symbol.
 *
 * Dependencies:
 * - `BaseService`: A base class for API interactions.
 * - `API_CONFIGS.CONFIG_FINANCE`: Stores API configuration details.
 * - `financeMapper`: Maps API responses to structured data types.
 *
 * Usage:
 * Import `financeService` and call methods like `financeService.getTimeSeries(symbol, interval)`.
 */

import { BaseService } from '@/api/core/BaseService';
import API_CONFIGS from '@/api/config/index';
import { mapTimeSeries, mapQuote, mapMarketState } from '@/api/mappers/financeMapper';
import type {
  IFinResMarketState,
  IFinResQuote,
  IFinResTimeSeries,
} from '@/api/types/finance/financeResponses';
import type {
  IFinMapMarketState,
  IFinMapQuote,
  IFinMapResTimeSeries,
} from '@/api/types/finance/financeMap';
import type {
  IFinReqMarketState,
  IFinReqQuote,
  IFinReqTimeSeries,
} from '@/api/types/finance/financeRequests';

class FinanceService extends BaseService {
  private apiConfig = API_CONFIGS.CONFIG_FINANCE;
  constructor() {
    super(API_CONFIGS.CONFIG_FINANCE.BASE_URL, API_CONFIGS.CONFIG_FINANCE.AXIOS);
  }

  /**
   * Fetches historical time series data.
   * @param {IFinReqTimeSeries} params - Request parameters for time series.
   * @returns {Promise<IFinMapResTimeSeries>}
   */
  async getTimeSeries(params: IFinReqTimeSeries): Promise<IFinMapResTimeSeries> {
    const response = await this.get<IFinResTimeSeries>(this.apiConfig.ENDPOINTS.TIME_SERIES, {
      params: {
        ...params,
        interval: params.interval || this.apiConfig.REQUEST_DEFAULTS.INTERVAL,
        outputsize: params.outputsize || this.apiConfig.REQUEST_DEFAULTS.OUTPUT_SIZE,
      },
    });
    return mapTimeSeries(response);
  }

  /**
   * Fetches the latest stock or currency quote for a given symbol.
   * @param {string} symbol - The financial symbol (e.g., "AAPL", "BTC/USD").
   * @returns {Promise<IFinMapQuote | null>}
   */
  async getQuote(symbol: IFinReqQuote): Promise<IFinMapQuote | null> {
    const response = await this.get<IFinResQuote>(this.apiConfig.ENDPOINTS.QUOTE, {
      params: { symbol },
    });
    return mapQuote(response);
  }

  /**
   * Retrieves the current market state (open/closed) for a given symbol.
   * @param {string} symbol - The financial symbol.
   * @returns {Promise<IFinMapMarketState>}
   */
  async getMarketState(symbol: IFinReqMarketState): Promise<IFinMapMarketState> {
    const response = await this.get<IFinResMarketState>(this.apiConfig.ENDPOINTS.MARKET_STATE, {
      params: { symbol },
    });
    return mapMarketState(response);
  }
}

export const financeService = new FinanceService();
