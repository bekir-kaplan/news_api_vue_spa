<script setup lang="ts">
import BaseImage from '../BaseImage.vue';

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <div class="nav-logo-container">
    <router-link to="/" class="nav-logo" @click="emit('click')">
      <BaseImage src="/news-app-logo4.png" alt="Technical Task News" class-name="w-10 rounded-lg" />
      TTNews
    </router-link>
  </div>
</template>

<style scoped>
@import '@/styles/components/navigation/nav-logo.css';
</style>
