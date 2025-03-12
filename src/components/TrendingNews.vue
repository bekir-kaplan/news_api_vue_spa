<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNewsStore } from '../stores/newsStore';

const newsStore = useNewsStore();
const { articles } = storeToRefs(newsStore);
</script>

<template>
  <div class="trending-news-container">
    <h2 class="trending-news-title">Trending Now</h2>
    <div class="trending-news-list">
      <div
        v-for="(article, index) in articles.slice(0, 5)"
        :key="article.url"
        class="trending-news-item"
      >
        <span class="trending-news-index">{{ index + 1 }}</span>
        <router-link
          :to="`/article/${encodeURIComponent(article.title)}`"
          class="trending-news-link"
        >
          {{ article.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../styles/components/trending-news.css';
</style>
