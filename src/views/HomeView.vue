<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';
import NewsLayout from '@/layouts/NewsLayout.vue';
import NewsSection from '@/components/sections/NewsSection.vue';
import NewsCarousel from '@/components/sections/NewsCarousel.vue';
import NewsCard from '@/components/NewsCard.vue';
import TrendingNews from '@/components/TrendingNews.vue';
import WeatherWidget from '@/components/WeatherWidget.vue';
import PopularTopics from '@/components/PopularTopics.vue';
import FinanceWidget from '@/components/widgets/FinanceWidget.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';

const newsStore = useNewsStore();
const { articles, loading, error } = storeToRefs(newsStore);

const categories = ['Business', 'Sports', 'Entertainment', 'Technology', 'Health'];
const categoryArticles = ref<Record<string, any[]>>({});

const featuredArticles = computed(() => articles.value?.slice(0, 5) || []);

onMounted(async () => {
  // Fetch general headlines
  await newsStore.fetchTopHeadlines();

  // Fetch articles for each category
  for (const category of categories) {
    const result = await newsStore.fetchTopHeadlines({
      category: category.toLowerCase(),
      pageSize: 3,
    });
    categoryArticles.value[category] = result;
  }
});
</script>

<template>
  <NewsLayout>
    <!-- Main Content -->
    <template #main>
      <LoadingSpinner v-if="loading" />
      <ErrorComponent v-else-if="error" :error="error" />

      <template v-else>
        <div class="home-view-carousel">
          <NewsCarousel :articles="featuredArticles" :autoplay="true" :interval="5000" />
        </div>

        <!-- Category Section -->
        <NewsSection
          v-for="category in categories"
          :key="category"
          :title="category"
          :category="category"
        >
          <NewsCard
            v-for="article in categoryArticles[category]"
            :key="article.url"
            :article="article"
          />
        </NewsSection>
      </template>
    </template>

    <!-- Sidebar Content -->
    <template #sidebar>
      <div class="home-view-sidebar">
        <FinanceWidget />
        <TrendingNews />
        <WeatherWidget />
        <PopularTopics />
      </div>
    </template>
  </NewsLayout>
</template>

<style scoped>
@import '@/styles/views/home-view.css';
</style>
