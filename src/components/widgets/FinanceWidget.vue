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
  scales: {
    x: {
      ticks: {
        callback(value: string): any {
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

    <LoadingSpinner v-if="loading" />

    <div>
      <MarketOverview :market-data="marketData" @select-symbol="handleSymbolSelect" />
      <ChartView :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/widgets/finance-widget.css';
</style>
