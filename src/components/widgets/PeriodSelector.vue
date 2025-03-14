<script setup lang="ts">
defineProps<{
  periods: { label: string; value: string }[];
  selectedInterval: string;
}>();
defineEmits(['update-period']);
</script>

<template>
  <div class="period-selector-container">
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
