<script setup lang="ts">
defineProps<{
  error: string;
}>();
</script>

<template>
  <div class="error-container">
    <p class="error-title">Error loading news</p>
    <p class="error-message">{{ error }}</p>
  </div>
</template>

<style scoped>
@import '../styles/components/error-component.css';
</style>
