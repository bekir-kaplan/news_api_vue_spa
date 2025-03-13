<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';

const newsStore = useNewsStore();
const { categories } = storeToRefs(newsStore);

const filteredCategories = categories.value.filter((category: string) => category !== 'all');
</script>

<template>
  <div class="popular-topics-container">
    <h2 class="popular-topics-title">Popular Topics</h2>
    <div class="popular-topics-list">
      <router-link
        v-for="category in filteredCategories"
        :key="category"
        :to="`/category/${category.toLowerCase()}`"
        class="badge-link"
      >
        {{ category }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/popular-topics.css';
</style>
