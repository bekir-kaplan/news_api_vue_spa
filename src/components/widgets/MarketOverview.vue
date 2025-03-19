<!--
  MarketOverview.vue
  --------------------
  This component provides an overview of financial market quotes, displaying
  stock names, prices, and percentage changes. It highlights positive and negative
  changes with different colors and allows users to select a stock symbol.

  Props:
    - marketData (IFinMapQuote[]): An array of stock market quotes, each containing:
      - symbol (string): The stock symbol (e.g., AAPL, TSLA).
      - name (string): The full name of the stock.
      - price.close (number): The closing price of the stock.
      - change.percent (number): The percentage change in price.

  Emits:
    - select-symbol: Emitted when a stock is clicked, passing the selected symbol.

  Methods:
    - getQuoteClasses(quote: IFinMapQuote): Returns dynamic CSS classes to indicate
      whether a stock price has increased (green) or decreased (red).

  Behavior:
    - Clicking a stock item emits the `select-symbol` event to allow further interactions.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`market-overview.css`) for styling.
-->
<script setup lang="ts">
import type { IFinMapQuote } from '@/api/types/finance/financeMap';

defineProps<{ marketData: IFinMapQuote[] }>();
defineEmits(['select-symbol']);

/**
 * Determines the styling class for a stock quote based on its price change percentage.
 * - Green for positive change
 * - Red for negative change
 * @param quote - The stock quote object
 * @returns Object containing dynamic CSS classes
 */
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
