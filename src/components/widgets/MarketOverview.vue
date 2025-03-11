<template>
  <div class="market-overview-container">
    <div
      v-for="quote in marketData"
      :key="quote.symbol"
      class="quote"
      :class="getQuoteClasses(quote)"
      @click="$emit('select-symbol', quote.symbol)"
    >
      <div class="flex justify-between items-start flex-wrap">
        <div>
          <h3 class="font-semibold">{{ quote.name }}</h3>
          <p class="text-xl font-bold">
            {{ quote.price.close.toLocaleString() }}
          </p>
        </div>
        <span class="change" :class="quote.change.percent >= 0 ? 'text-green-600' : 'text-red-600'">
          {{ quote.change.percent.toFixed(2) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MappedQuote } from '../../api/types/mappedTypes';

defineProps<{ marketData: MappedQuote[] }>();
defineEmits(['select-symbol']);

const getQuoteClasses = (quote: MappedQuote) => {
  return {
    'border-green-200 bg-green-50': quote.change.percent >= 0,
    'border-red-200 bg-red-50': quote.change.percent < 0,
  };
};
</script>

<style scoped>
.market-overview-container {
  @apply grid grid-cols-2 gap-2 mb-6;
}
.quote {
  @apply p-4 rounded-lg border cursor-pointer;
}
.change {
  @apply text-sm font-semibold;
}
</style>
