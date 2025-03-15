<script setup lang="ts">
defineProps<{
  loading?: boolean;
}>();
</script>

<template>
  <div v-if="loading" class="loading-spinner-container">
    <div>
      <div class="loading-spinner" />
      <p class="loading-spinner-text">Loading news...</p>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/loading-spinner.css';
</style>
