<!--
  LoadingSpinner.vue
  --------------------
  This component displays a loading spinner while content is being loaded.
  It provides a simple, reusable loading indicator for asynchronous operations.

  Props:
    - loading (boolean, optional): Controls the visibility of the loading spinner.

  Behavior:
    - If `loading` is `true`, the spinner and message are displayed.
    - If `loading` is `false` or undefined, the component remains hidden.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`loading-spinner.css`) for styling.
-->
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
