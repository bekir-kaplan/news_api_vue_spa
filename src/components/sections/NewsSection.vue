<template>
  <section class="news-section">
    <div class="section-header">
      <h2 class="section-title">{{ title }}</h2>
      <router-link :to="`/category/${category.toLowerCase()}`" class="section-link">
        View All
        <ArrowRightIcon class="h-4 w-4 ml-1" />
      </router-link>
    </div>
    <div class="section-content">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline';

defineProps<{
  title: string;
  category: string;
}>();
</script>

<style scoped>
.news-section {
  @apply mb-12;
}

.section-header {
  @apply flex justify-between items-center mb-6;
}

.section-title {
  @apply text-2xl font-bold;
}

.section-link {
  @apply flex items-center text-blue-600 hover:text-blue-800 font-semibold;
}

.section-content {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}
</style>
