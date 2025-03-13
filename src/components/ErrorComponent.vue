<script setup lang="ts">
const props = defineProps<{
  error: string;
  class?: string;
}>();
</script>

<template>
  <div class="error-container" :class="[props.class]">
    <p class="error-title">Error loading news</p>
    <p class="error-message">{{ error }}</p>
  </div>
</template>

<style scoped>
@import '@/styles/components/error-component.css';
</style>
