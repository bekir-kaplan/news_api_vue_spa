<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline';

defineProps<{
  title: string;
  category: string;
}>();
</script>

<template>
  <section class="news-section">
    <div class="news-section-header">
      <h2 class="news-section-title">{{ title }}</h2>
      <router-link :to="`/category/${category.toLowerCase()}`" class="news-section-link">
        View All
        <ArrowRightIcon class="news-section-icon" />
      </router-link>
    </div>
    <div class="grid-template">
      <slot />
    </div>
  </section>
</template>

<style scoped>
@import '@/styles/components/sections/news-section.css';
</style>
