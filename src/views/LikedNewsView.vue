<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLikedNewsStore } from '@/stores/likedNewsStore';
import NewsLayout from '@/layouts/NewsLayout.vue';
import NewsCard from '@/components/NewsCard.vue';
import GoBackButton from '@/components/GoBackButton.vue';
import { computed, ref } from 'vue';
import type { TCategoryKey } from '@/types/news.types';

const likedNewsStore = useLikedNewsStore();
const { likedArticles, likedArticlesByCategory, likedCount } = storeToRefs(likedNewsStore);

const selectedCategory = ref<TCategoryKey | 'Uncategorized'>('all');

// Computed property to filter articles based on selected category
const filteredLikedArticles = computed(() => {
  if (!selectedCategory.value) {
    return likedArticles.value; // Return all articles if no filter is applied
  }
  return likedArticles.value.filter((article) =>
    selectedCategory.value !== 'all' ? article.category === selectedCategory.value : article
  );
});

const filterLikedArticles = (type: TCategoryKey | 'Uncategorized'): void => {
  selectedCategory.value = type;
};
</script>

<template>
  <NewsLayout>
    <template #main>
      <GoBackButton />
      <div class="liked-news-header">
        <h1 class="liked-news-view-title">Liked Articles</h1>
      </div>

      <div v-if="likedArticles.length === 0" class="liked-news-view-empty">
        <p class="liked-news-view-empty-text">No liked articles yet</p>
        <router-link to="/" class="liked-news-view-browse-link"> Browse articles </router-link>
      </div>

      <div v-else class="grid-template">
        <NewsCard v-for="article in filteredLikedArticles" :key="article.url" :article="article" />
      </div>
    </template>

    <template #sidebar>
      <div class="liked-news-view-sidebar">
        <h2 class="liked-news-view-sidebar-title">Your Collection</h2>
        <p class="liked-news-view-sidebar-text">
          You have liked {{ likedArticles.length }} article{{
            likedArticles.length !== 1 ? 's' : ''
          }}
        </p>

        <div class="badge-container">
          <button @click="filterLikedArticles('all')" class="badge-link badge-link-full">
            All
            <span class="badge-count">{{ likedCount }}</span>
          </button>
          <button
            v-for="(likedArticle, idx) in likedArticlesByCategory"
            :key="idx"
            @click="filterLikedArticles(likedArticle.category)"
            class="badge-link"
          >
            {{ likedArticle.category }}
            <span class="badge-count">{{ likedArticle.count }}</span>
          </button>
        </div>
      </div>
    </template>
  </NewsLayout>
</template>

<style scoped>
@import '@/styles/views/liked-news-view.css';
</style>
