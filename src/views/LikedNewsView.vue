<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLikedNewsStore } from '@/stores/likedNewsStore';
import NewsLayout from '@/layouts/NewsLayout.vue';
import NewsCard from '@/components/NewsCard.vue';
import GoBackButton from '@/components/GoBackButton.vue';

const likedNewsStore = useLikedNewsStore();
const { likedArticles, likedArticlesByCategory } = storeToRefs(likedNewsStore);
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
        <NewsCard v-for="article in likedArticles" :key="article.url" :article="article" />
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
          <router-link
            v-for="(likedArticle, idx) in likedArticlesByCategory"
            :key="idx"
            :to="`/category/${likedArticle.name.toLowerCase()}`"
            class="badge-link"
          >
            {{ likedArticle.name }}
            <span class="badge-count">{{ likedArticle.count }}</span>
          </router-link>
        </div>
      </div>
    </template>
  </NewsLayout>
</template>

<style scoped>
@import '@/styles/views/liked-news-view.css';
</style>
