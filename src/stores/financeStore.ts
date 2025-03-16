import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useFinance } from '@/composables/useFinance';
import type { IFinMapQuote, MappedTimeSeriesValue } from '@/api/types/mapTypes';

export const useFinanceStore = defineStore(
  'finance',
  () => {
    const { fetchMarketData, fetchTimeSeriesData, loading, error } = useFinance();

    const marketData = ref<IFinMapQuote[]>([]);
    const timeSeriesData = ref<MappedTimeSeriesValue[]>([]);
    const selectedSymbol = ref<string>('SPY');
    const selectedInterval = ref<string>('1day');

    const watchlist = ref([
      'SPY', // S&P 500 ETF
      'QQQ', // NASDAQ ETF
      'GLD', // Gold ETF
      'BTC/USD', // Bitcoin
    ]);

    const chartData = computed(() => {
      if (!timeSeriesData.value?.length) {
        return null;
      }

      return {
        labels: timeSeriesData.value.map((data) => {
          const date = new Date(data.datetime);
          return `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;
        }),
        datasets: [
          {
            label: selectedSymbol.value,
            data: timeSeriesData.value.map((data) => data.close),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.4,
          },
        ],
      };
    });

    const loadMarketData = async (): Promise<void> => {
      const data = await fetchMarketData(watchlist.value);
      if (data) {
        marketData.value = data;
      }
    };

    const loadTimeSeriesData = async (symbol?: string, interval?: string): Promise<void> => {
      try {
        if (symbol) {
          selectedSymbol.value = symbol;
        }
        if (interval) {
          selectedInterval.value = interval;
        }

        const data = await fetchTimeSeriesData(selectedSymbol.value, selectedInterval.value);

        if (data) {
          timeSeriesData.value = data.sort(
            (a: MappedTimeSeriesValue, b: MappedTimeSeriesValue) =>
              a.datetime.getTime() - b.datetime.getTime()
          );
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      marketData,
      timeSeriesData,
      selectedSymbol,
      selectedInterval,
      watchlist,
      chartData,
      loading,
      error,
      loadMarketData,
      loadTimeSeriesData,
    };
  },
  {
    persist: true,
  }
);
