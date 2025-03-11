<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '../stores/newsStore';
const newsStore = useNewsStore();
const { articles, selectedArticle } = storeToRefs(newsStore);

const relatedArticles = computed(() => {
  if (!selectedArticle.value) {
    return [];
  }
  return articles.value.filter((article) => article.url !== selectedArticle.value?.url).slice(0, 3);
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-bold mb-4 text-gray-800">Related Articles</h2>
    <div class="space-y-4">
      <div v-for="article in relatedArticles" :key="article.url" class="group">
        <router-link :to="`/article/${encodeURIComponent(article.title)}`">
          <img
            v-if="article.urlToImage"
            :src="article.urlToImage"
            :alt="article.title"
            class="w-full h-48 object-cover rounded-lg mb-2"
          />
          <h3 class="font-semibold group-hover:text-blue-600 line-clamp-2">
            {{ article.title }}
          </h3>
          <span class="text-sm text-gray-500">{{ article.publishedAt }}</span>
          <span class="text-sm text-gray-500">{{ article.author }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
