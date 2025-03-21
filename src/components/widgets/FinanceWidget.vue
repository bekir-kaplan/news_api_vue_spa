<!--
  FinanceWidget.vue
  --------------------
  This component provides an overview of financial market data and a chart visualization 
  for time series financial data. It allows users to select different time periods and 
  market symbols.

  Dependencies:
    - Pinia Store:
      - useFinanceStore: Manages financial market data and time series data.
    - Components:
      - MarketOverview: Displays market summary data and allows symbol selection.
      - ChartView: Renders financial data as a line chart.
      - PeriodSelector: Provides time period selection for filtering data.
      - LoadingSpinner: Displays a loading indicator while fetching data.
    - Constants:
      - CON_TIME_PERIODS: A predefined set of available time intervals.

  Props:
    - None (fetches data from Pinia store)

  Data & Computed:
    - marketData: Contains financial market summary data.
    - chartData: Contains historical time series data for selected financial symbols.
    - loading: Boolean indicating whether data is being fetched.
    - selectedInterval: Stores the currently selected time period.

  Methods:
    - handlePeriodChange(interval: string): Updates the selected time period and fetches new data.
    - handleSymbolSelect(symbol: string): Updates the selected market symbol and fetches 
    corresponding data.

  Lifecycle Hooks:
    - onMounted: Fetches market data and time series data on component initialization.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`finance-widget.css`) for layout and styling.
-->
<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFinanceStore } from '@/stores/financeStore';
import { CON_TIME_PERIODS } from '@/constants/conFinance';
import MarketOverview from '@/components/widgets/MarketOverview.vue';
import ChartView from '@/components/widgets/ChartView.vue';
import PeriodSelector from '@/components/widgets/PeriodSelector.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

const financeStore = useFinanceStore();
const { marketData, chartData, loading, selectedInterval } = storeToRefs(financeStore);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

/**
 * Updates the selected time period and reloads financial data.
 * @param interval - The new selected time period (e.g., "1D", "1W", "1M").
 */
const handlePeriodChange = (interval: string): void => {
  financeStore.loadTimeSeriesData(undefined, interval);
};

/**
 * Updates the selected market symbol and reloads financial data.
 * @param symbol - The selected market symbol (e.g., "AAPL", "TSLA").
 */
const handleSymbolSelect = (symbol: string): void => {
  financeStore.loadTimeSeriesData(symbol);
};

// Fetch initial market and time series data
onMounted(async () => {
  await financeStore.loadMarketData();
  await financeStore.loadTimeSeriesData();
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="finance-widget-header">
      <h2>Financial Markets</h2>
      <PeriodSelector
        :periods="CON_TIME_PERIODS"
        :selected-interval="selectedInterval"
        @update-period="handlePeriodChange"
      />
    </div>

    <LoadingSpinner :loading="loading" />

    <div>
      <MarketOverview :market-data="marketData" @select-symbol="handleSymbolSelect" />
      <ChartView :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/widgets/finance-widget.css';
</style>
