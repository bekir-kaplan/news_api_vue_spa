<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '../stores/newsStore';
import NewsLayout from '../layouts/NewsLayout.vue';
import NewsCard from '../components/NewsCard.vue';
import TrendingNews from '../components/TrendingNews.vue';
import PopularTopics from '../components/PopularTopics.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import ErrorComponent from '../components/ErrorComponent.vue';

const route = useRoute();
const newsStore = useNewsStore();
const { loading, error } = storeToRefs(newsStore);

const category = computed(() => route.params.category as string);
const articles = ref<typeof newsStore.articles>([]);

const loadArticles = async (): Promise<void> => {
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

<template>
  <NewsLayout>
    <!-- Main Content -->
    <template #main>
      <div class="category-view-header">
        <h1 class="category-view-title">{{ category }} News</h1>
      </div>

      <LoadingSpinner v-if="loading" />
      <ErrorComponent v-else-if="error" :error="error" />

      <div v-else class="grid-template">
        <NewsCard v-for="article in articles" :key="article.url" :article="article" />
      </div>
    </template>

    <!-- Sidebar Content -->
    <template #sidebar>
      <div class="category-view-sidebar">
        <TrendingNews />
        <PopularTopics />
      </div>
    </template>
  </NewsLayout>
</template>

<style scoped>
@import '../styles/views/category-view.css';
</style>
