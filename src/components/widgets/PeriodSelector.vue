<!--
  PeriodSelector.vue
  --------------------
  This component provides a button-based selector for choosing a time period.
  It allows users to select predefined intervals for financial data visualization.

  Props:
    - periods ({ label: string; value: string }[]): An array of selectable periods, each containing:
      - label (string): The display text for the period (e.g., "1D", "1W", "1M").
      - value (string): The corresponding value for the period selection.
    - selectedInterval (string): The currently active time period.

  Emits:
    - update-period: Emitted when a user selects a different period, passing the selected value.

  Behavior:
    - Clicking a button updates the selected interval by emitting the `update-period` event.
    - The currently selected period is visually highlighted.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`period-selector.css`) for styling.
-->
<script setup lang="ts">
defineProps<{
  periods: { label: string; value: string }[];
  selectedInterval: string;
}>();
defineEmits(['update-period']);
</script>

<template>
  <div class="period-selector-container">
    <!-- Loop through periods and create a button for each -->
    <button
      v-for="period in periods"
      :key="period.value"
      @click="$emit('update-period', period.value)"
      class="period-selector-period-button"
      :class="
        selectedInterval === period.value
          ? 'period-selector-selected'
          : 'period-selector-unselected'
      "
    >
      {{ period.label }}
    </button>
  </div>
</template>

<style scoped>
@import '@/styles/components/widgets/period-selector.css';
</style>
