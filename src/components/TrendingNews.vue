<!--
  TrendingNews.vue
  --------------------
  This component displays a list of trending news articles in a numbered format.
  It retrieves trending articles from the news store and provides navigation to article details.

  Dependencies:
    - Pinia Store:
      - useNewsStore: Manages news articles, including trending articles.
    - Vue Router:
      - router: Handles navigation to article details.
    - Types:
      - INewsArticle: Represents a news article data structure.

  Reactive State:
    - carouselArticles: Retrieves trending news articles from the store.

  Behavior:
    - Displays the top 5 trending news articles.
    - Clicking an article updates the selected article and navigates to its details.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`trending-news.css`) for styling.
-->
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';

const newsStore = useNewsStore();
const { carouselArticles } = storeToRefs(newsStore);
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
          @click="newsStore.handleArticleClick(article)"
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
