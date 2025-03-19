import { ref } from 'vue';
import type { IFinMapQuote, IFinMapTimeSeries } from '@/api/types/finance/financeMap';
import { financeService } from '@/api/services/financeService';

export function useFinance(): any {
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchMarketData = async (symbols: string[]): Promise<IFinMapQuote[] | null> => {
    try {
      loading.value = true;
      error.value = null;

      const quotes = await Promise.all(
        symbols.map(async (symbol) => {
          return await financeService.getQuote({ symbol });
        })
      );

      const validQuotes = quotes.filter((quote): quote is IFinMapQuote => quote !== null);
      return validQuotes;
    } finally {
      loading.value = false;
    }
  };

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
