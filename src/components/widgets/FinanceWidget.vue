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

    <MarketOverview v-if="!loading" :market-data="marketData" @select-symbol="handleSymbolSelect" />
    <div v-else class="finance-widget-loader-container">
      <div class="loader" />
    </div>

    <ChartView v-if="!loading" :chart-data="chartData" :chart-options="chartOptions" />
    <div v-else class="finance-widget-loader-container">
      <div class="finance-widget-loader" />
    </div>

    <div v-if="error" class="finance-widget-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useFinanceStore } from '../../stores/financeStore';
import MarketOverview from './MarketOverview.vue';
import ChartView from './ChartView.vue';
import PeriodSelector from './PeriodSelector.vue';
import { CON_TIME_PERIODS } from '../../constants/conFinance';

const financeStore = useFinanceStore();
const { marketData, chartData, loading, error, selectedInterval } = storeToRefs(financeStore);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        callback(value: string) {
          // Extract only the date part without time
          const label = this.getLabelForValue(value);
          return label.split(' ')[0];
        },
      },
    },
  },
};

const handlePeriodChange = (interval: string): void => {
  financeStore.loadTimeSeriesData(undefined, interval);
};

const handleSymbolSelect = (symbol: string): void => {
  financeStore.loadTimeSeriesData(symbol);
};

onMounted(async () => {
  await financeStore.loadMarketData();
  await financeStore.loadTimeSeriesData();
});
</script>

<style scoped>
/* Widget Container */
.finance-widget-header {
  @apply flex justify-between items-center mb-6 flex-wrap md:flex-row;
}

h2 {
  @apply text-xl font-bold text-gray-800;
}

/* Loader */
.finance-widget-loader-container {
  @apply flex justify-center items-center h-16;
}

.finance-widget-loader {
  @apply animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500;
}

/* Error Message */
.finance-widget-error {
  @apply mt-4 p-4 bg-red-100 text-red-600 rounded-lg text-[9px];
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
