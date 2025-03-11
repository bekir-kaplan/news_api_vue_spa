<template>
  <NewsLayout>
    <!-- Main Content -->
    <template #main>
      <div class="mb-8">
        <h1 class="text-3xl font-bold capitalize">{{ category }} News</h1>
      </div>

      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" />
        <p class="mt-4 text-xl text-gray-600">Loading news...</p>
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-500">
        <p class="text-xl font-semibold mb-2">Error loading news</p>
        <p>{{ error }}</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NewsCard v-for="article in articles" :key="article.url" :article="article" />
      </div>
    </template>

    <!-- Sidebar Content -->
    <template #sidebar>
      <div class="space-y-6 sticky top-6">
        <TrendingNews />
        <PopularTopics />
      </div>
    </template>
  </NewsLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '../stores/newsStore';
import NewsLayout from '../layouts/NewsLayout.vue';
import NewsCard from '../components/NewsCard.vue';
import TrendingNews from '../components/TrendingNews.vue';
import PopularTopics from '../components/PopularTopics.vue';

const route = useRoute();
const newsStore = useNewsStore();
const { loading, error } = storeToRefs(newsStore);

const category = computed(() => route.params.category as string);
const articles = ref<typeof newsStore.articles>([]);

const loadArticles = async () => {
  articles.value = await newsStore.fetchTopHeadlines({
    category: category.value,
    pageSize: 30,
  });
};

// Watch for category changes
watch(
  () => route.params.category,
  () => {
    loadArticles();
  },
  { immediate: true }
);

onMounted(() => {
  if (!articles.value.length) {
    loadArticles();
  }
});
</script>
