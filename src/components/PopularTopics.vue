<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNewsStore } from '../stores/newsStore';

const newsStore = useNewsStore();
const { categories } = storeToRefs(newsStore);

const filteredCategories = categories.value.filter((category: string) => category !== 'all');
</script>

<template>
  <div class="popular-topics-container">
    <h2 class="title">Popular Topics</h2>
    <div class="flex flex-wrap gap-2">
      <router-link
        v-for="category in filteredCategories"
        :key="category"
        :to="`/category/${category.toLowerCase()}`"
        class="router-link-style"
      >
        {{ category }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.popular-topics-container {
  @apply bg-white rounded-lg shadow-lg p-6;
}
.title {
  @apply text-xl font-bold mb-4 text-gray-800;
}
.router-link-style {
  @apply px-3 py-1 bg-gray-100 text-gray-700 
    rounded-full hover:bg-blue-100 hover:text-blue-700 capitalize;
}
</style>
