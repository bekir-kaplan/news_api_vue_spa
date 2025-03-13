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
