/**
 * useFinance.ts
 * --------------------
 * This composable provides functions to fetch financial market data and time series data.
 * It manages the loading state and error handling.
 *
 * Dependencies:
 * - Vue:
 *   - ref: Manages loading and error states.
 * - API Services:
 *   - financeService: Provides methods for fetching financial data.
 * - Types:
 *   - IFinMapQuote: Represents financial market quote data.
 *   - IFinMapTimeSeries: Represents time series data for stock prices.
 *
 * State:
 * - loading (boolean): Indicates whether data is being fetched.
 * - error (string | null): Stores error messages if any occur during API calls.
 *
 * Methods:
 * - fetchMarketData(symbols: string[]): Fetches quote data for multiple symbols.
 * - fetchTimeSeriesData(symbol: string, interval: string): Fetches time series data for
 * a given symbol and interval.
 *
 * Behavior:
 * - When an API call starts, `loading` is set to `true`, and `error` is cleared.
 * - If an API call succeeds, data is returned.
 * - If an API call fails, `error` is set and `loading` is reset to `false`.
 */
import { ref } from 'vue';
import type { IFinMapQuote, IFinMapTimeSeries } from '@/api/types/finance/financeMap';
import { financeService } from '@/api/services/FinanceService';
import type { IFinReqQuote } from '@/api/types/finance/financeRequests';

export function useFinance(): any {
  const loading = ref(false);
  const error = ref<string | null>(null);

  /**
   * Fetches market quote data for multiple symbols.
   * @param symbols - An array of stock symbols to fetch quotes for.
   * @returns An array of valid financial quotes or null if none are found.
   */
  const fetchMarketData = async (symbols: IFinReqQuote[]): Promise<IFinMapQuote[] | null> => {
    try {
      loading.value = true;
      error.value = null;

      const quotes = await Promise.all(
        symbols.map(async (symbol) => {
          return await financeService.getQuote(symbol);
        })
      );

      const validQuotes = quotes.filter((quote): quote is IFinMapQuote => quote !== null);
      return validQuotes;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Fetches time series data for a given stock symbol.
   * @param symbol - The stock symbol to retrieve time series data for.
   * @param interval - The time interval (default is '1day').
   * @returns An array of time series data points or null if no data is found.
   */
  const fetchTimeSeriesData = async (
    symbol: string,
    interval: string = '1day'
  ): Promise<IFinMapTimeSeries[] | null> => {
    try {
      loading.value = true;
      error.value = null;

      const response = await financeService.getTimeSeries({ symbol, interval });
      return response.values;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    fetchMarketData,
    fetchTimeSeriesData,
  };
}
