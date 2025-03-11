import { ref } from 'vue';
import { financeService } from '../api/services/financeService';
import type { MappedQuote, MappedTimeSeriesValue } from '../api/types/mappedTypes';

export function useFinance() {
  const loading = ref(false);
  const error = ref<string | null>(null);
  const marketData = ref<MappedQuote[]>([]);
  const timeSeriesData = ref<MappedTimeSeriesValue[]>([]);

  const fetchMarketData = async (symbols: string[]): Promise<MappedQuote[] | null> => {
    try {
      loading.value = true;
      error.value = null;

      const quotes = await Promise.all(
        symbols.map(async (symbol) => {
          try {
            return await financeService.getQuote(symbol);
          } catch (err) {
            console.error(`Failed to fetch quote for ${symbol}:`, err);
            return null;
          }
        })
      );

      const validQuotes = quotes.filter((quote): quote is MappedQuote => quote !== null);
      marketData.value = validQuotes;
      return validQuotes;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch market data';
      return null;
    } finally {
      loading.value = false;
    }
  };

  const fetchTimeSeriesData = async (
    symbol: string,
    interval: string = '1day'
  ): Promise<MappedTimeSeriesValue[] | null> => {
    try {
      loading.value = true;
      error.value = null;

      const response = await financeService.getTimeSeries(symbol, interval);
      timeSeriesData.value = response.values;
      return response.values;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch time series data';
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    marketData,
    timeSeriesData,
    fetchMarketData,
    fetchTimeSeriesData,
  };
}
