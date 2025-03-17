<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';
import type { INewsArticle } from '@/api/types/news';
import router from '@/router';

const newsStore = useNewsStore();
const { carouselArticles } = storeToRefs(newsStore);

// TODO: move common folder to share functionality
const handleArticleClick = (article: INewsArticle): void => {
  newsStore.setSelectedArticle(article);
  router.push(`/article/${encodeURIComponent(article.title)}`);
};
</script>

<template>
  <div class="trending-news-container">
    <h2 class="trending-news-title">Trending Now</h2>
    <div class="trending-news-list">
      <div
        v-for="(article, index) in carouselArticles.slice(0, 5)"
        :key="article.url"
        class="trending-news-item"
      >
        <span class="trending-news-index">{{ index + 1 }}</span>
        <router-link
          :to="`/article/${encodeURIComponent(article.title)}`"
          @click="handleArticleClick(article)"
          class="trending-news-link"
        >
          {{ article.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/trending-news.css';
</style>
