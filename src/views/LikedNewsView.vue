<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useLikedNewsStore } from '../stores/likedNewsStore';
import NewsLayout from '../layouts/NewsLayout.vue';
import NewsCard from '../components/NewsCard.vue';

const likedNewsStore = useLikedNewsStore();
const { likedArticles } = storeToRefs(likedNewsStore);
</script>

<template>
  <NewsLayout>
    <template #main>
      <h1 class="text-3xl font-bold mb-6">Liked Articles</h1>

      <div v-if="likedArticles.length === 0" class="text-center py-8">
        <p class="text-xl text-gray-600">No liked articles yet</p>
        <router-link to="/" class="mt-4 inline-block text-blue-600 hover:text-blue-800">
          Browse articles
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NewsCard v-for="article in likedArticles" :key="article.url" :article="article" />
      </div>
    </template>

    <template #sidebar>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4">Your Collection</h2>
        <p class="text-gray-600">
          You have liked {{ likedArticles.length }} article{{
            likedArticles.length !== 1 ? 's' : ''
          }}
        </p>
      </div>
    </template>
  </NewsLayout>
</template>
