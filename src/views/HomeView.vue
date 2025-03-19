<script setup lang="ts">
import { onMounted } from 'vue';
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
import { CON_FETCH_SECTIONS_PARAMS, CON_NEWS_CATEGORIES } from '@/constants/conNews';
import type { TCategoryKey } from '@/types/news.types';

const newsStore = useNewsStore();
const { carouselArticles, categoryArticles, loading } = storeToRefs(newsStore);

onMounted(async () => {
  // Fetch general headlines
  await newsStore.fetch.topHeadlines.carousel(CON_FETCH_SECTIONS_PARAMS.CAROUSEL);

  // Fetch articles for each category concurrently
  const fetchPromises = CON_FETCH_SECTIONS_PARAMS.SECTIONS.map(async (section) => {
    await newsStore.fetch.topHeadlines.sections({
      ...section,
    });
  });

  await Promise.all(fetchPromises);
});
</script>

<template>
  <NewsLayout>
    <!-- Main Content -->
    <template #main>
      <LoadingSpinner :loading="loading" />

      <div class="home-view-carousel">
        <NewsCarousel :articles="carouselArticles" :autoplay="true" :interval="5000" />
      </div>

      <!-- Category Section -->
      <NewsSection
        v-for="section in Object.keys(categoryArticles) as TCategoryKey[]"
        :key="section"
        :title="CON_NEWS_CATEGORIES[section].value || ''"
        :category="section || ''"
      >
        <NewsCard
          v-for="article in categoryArticles[section || '']"
          :key="article.url"
          :article="article"
        />
      </NewsSection>
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
