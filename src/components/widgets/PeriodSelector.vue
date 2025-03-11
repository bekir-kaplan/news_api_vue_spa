<template>
  <div class="period-selector-container">
    <button
      v-for="period in periods"
      :key="period.value"
      @click="$emit('update-period', period.value)"
      class="period-button"
      :class="selectedInterval === period.value ? 'selected' : 'unselected'"
    >
      {{ period.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  periods: { label: string; value: string }[];
  selectedInterval: string;
}>();
defineEmits(['update-period']);
</script>

<style scoped>
.period-selector-container {
  @apply flex gap-2 flex-wrap;
}
.period-button {
  @apply px-2 py-1 text-sm rounded-md transition-colors;
}
.selected {
  @apply bg-blue-600 text-white;
}
.unselected {
  @apply bg-gray-100 text-gray-700 hover:bg-gray-200;
}
</style>
