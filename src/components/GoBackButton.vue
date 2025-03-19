<!--
  GoBackButton.vue
  --------------------
  This component provides a simple "Back" button that navigates to the previous page
  using Vue Router's `router.back()` method.

  Dependencies:
    - Vue Router:
      - useRouter: Provides access to the router instance for navigation.
    - Heroicons:
      - ArrowLeftIcon: Displays a left-arrow icon for the button.

  Methods:
    - goBack(): Calls `router.back()` to navigate to the previous page.

  Behavior:
    - When the button is clicked, the user is taken back to the previous page.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`go-back-button.css`) for styling.
-->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';

const router = useRouter();

const goBack = (): void => {
  router.back();
};
</script>

<template>
  <button @click="goBack" class="go-back-button">
    <ArrowLeftIcon class="go-back-icon" />
    Back
  </button>
</template>

<style scoped>
@import '@/styles/components/go-back-button.css';
</style>
