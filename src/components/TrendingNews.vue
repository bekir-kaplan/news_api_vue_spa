<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNewsStore } from '../stores/newsStore';

const newsStore = useNewsStore();
const { articles } = storeToRefs(newsStore);
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-bold mb-4 text-gray-800">Trending Now</h2>
    <div class="space-y-4">
      <div
        v-for="(article, index) in articles.slice(0, 5)"
        :key="article.url"
        class="flex gap-4 items-start"
      >
        <span class="text-2xl font-bold text-blue-600">{{ index + 1 }}</span>
        <router-link
          :to="`/article/${encodeURIComponent(article.title)}`"
          class="text-gray-700 hover:text-blue-600 line-clamp-2"
        >
          {{ article.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>
