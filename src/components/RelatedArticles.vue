<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';

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
  <div class="related-articles-container">
    <h2 class="related-articles-title">Related Articles</h2>
    <div class="related-articles-list">
      <div v-for="article in relatedArticles" :key="article.url" class="related-articles-item">
        <router-link
          :to="`/article/${encodeURIComponent(article.title)}`"
          onclick="newsStore.setSelectedArticle(article)"
        >
          <img
            v-if="article.urlToImage"
            :src="article.urlToImage"
            :alt="article.title"
            class="related-articles-image"
          />
          <h3 class="related-articles-item-title group-hover:text-blue-600">
            {{ article.title }}
          </h3>
          <span class="related-articles-item-meta">{{ article.publishedAt }}</span>
          <span class="related-articles-item-meta">{{ article.author }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/related-articles.css';
</style>
