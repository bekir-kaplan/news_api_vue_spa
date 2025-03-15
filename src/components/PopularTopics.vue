<script setup lang="ts">
import { CON_NEWS_CATEGORIES } from '@/constants/conNews';
const filteredCategories = Object.values(CON_NEWS_CATEGORIES).filter(
  (category) => category.key !== 'all'
);
</script>

<template>
  <div class="popular-topics-container">
    <h2 class="popular-topics-title">Popular Topics</h2>
    <div class="popular-topics-list">
      <router-link
        v-for="category in filteredCategories"
        :key="category.key"
        :to="`/category/${category.key}`"
        class="badge-link"
      >
        {{ category.value }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/popular-topics.css';
</style>
