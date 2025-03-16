<script setup lang="ts">
import type { IFinMapQuote } from '@/api/types/mapTypes';

defineProps<{ marketData: IFinMapQuote[] }>();
defineEmits(['select-symbol']);

const getQuoteClasses = (quote: IFinMapQuote): { [key: string]: boolean } => {
  return {
    'border-green-200 bg-green-50': quote.change.percent >= 0,
    'border-red-200 bg-red-50': quote.change.percent < 0,
  };
};
</script>

<template>
  <div class="market-overview-container">
    <div
      v-for="quote in marketData"
      :key="quote.symbol"
      class="market-overview-quote"
      :class="getQuoteClasses(quote)"
      @click="$emit('select-symbol', quote.symbol)"
    >
      <div class="market-overview-quote-content" :title="quote.name">
        <h3 class="market-overview-quote-title">{{ quote.name }}</h3>
        <div class="market-overview-quote-price">
          {{ quote.price.close.toLocaleString() }}
        </div>
        <div
          class="market-overview-quote-change"
          :class="quote.change.percent >= 0 ? 'text-green-600' : 'text-red-600'"
        >
          {{ quote.change.percent.toFixed(2) }}%
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/widgets/market-overview.css';
</style>
