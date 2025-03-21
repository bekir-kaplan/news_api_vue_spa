/**
 * Finance Store (Pinia)
 * --------------------------------------
 * Manages financial market data, including stock quotes and time series data.
 *
 * Features:
 * - Fetches real-time market data for a selected watchlist.
 * - Retrieves historical time series data for a selected symbol.
 * - Generates formatted chart data for visualization.
 * - Stores selected symbols and intervals for analysis.
 * - Uses **computed properties** for dynamically updating chart data.
 */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useFinance } from '@/composables/useFinance';
import type { IFinMapQuote, IFinMapTimeSeries } from '@/api/types/finance/financeMap';
import { CON_UI_FINANCE_WATCHLIST } from '@/constants/conUiConfigs';
import utils from '@/utils';

export const useFinanceStore = defineStore(
  'finance',
  () => {
    const { fetchMarketData, fetchTimeSeriesData, loading, error } = useFinance();

    const marketData = ref<IFinMapQuote[]>([]);
    const timeSeriesData = ref<IFinMapTimeSeries[]>([]);
    const selectedSymbol = ref<string>('SPY');
    const selectedInterval = ref<string>('1day');

    const watchlist = ref(CON_UI_FINANCE_WATCHLIST);

    const chartData = computed(() => {
      if (!timeSeriesData.value?.length) {
        return null;
      }

      return {
        labels: timeSeriesData.value.map((data) => {
          const date = utils.getDate({
            currentDate: new Date(data.datetime).getTime(),
            dateFormat: { month: 'short', day: 'numeric' },
          });
          return `${date}`;
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

    /**
     * Loads historical time series data for a selected symbol.
     * Updates `timeSeriesData` with the latest price history.
     * Ensures data is sorted in chronological order.
     *
     * @param symbol - Financial symbol to fetch data for.
     * @param interval - Time interval for fetching data (e.g., '1min', '1day').
     */
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
            (a: IFinMapTimeSeries, b: IFinMapTimeSeries) =>
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
