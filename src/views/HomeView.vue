<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '../stores/newsStore';
import NewsLayout from '../layouts/NewsLayout.vue';
import NewsSection from '../components/sections/NewsSection.vue';
import NewsCarousel from '../components/sections/NewsCarousel.vue';
import NewsCard from '../components/NewsCard.vue';
import TrendingNews from '../components/TrendingNews.vue';
import WeatherWidget from '../components/WeatherWidget.vue';
import PopularTopics from '../components/PopularTopics.vue';
import FinanceWidget from '../components/widgets/FinanceWidget.vue';

const newsStore = useNewsStore();
const { articles, loading, error } = storeToRefs(newsStore);

const categories = ['Sports', 'Entertainment', 'Technology', 'Health'];
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
      <div v-if="loading" class="text-center py-8">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto" />
        <p class="mt-4 text-xl text-gray-600">Loading news...</p>
      </div>

      <div v-else-if="error" class="text-center py-8 text-red-500">
        <p class="text-xl font-semibold mb-2">Error loading news</p>
        <p>{{ error }}</p>
      </div>

      <template v-else>
        <!-- Featured Articles Carousel -->
        <div class="mb-12">
          <NewsCarousel :articles="featuredArticles" :autoplay="true" :interval="5000" />
        </div>

        <!-- Category Sections -->
        <div class="space-y-12">
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
        </div>
      </template>
    </template>

    <!-- Sidebar Content -->
    <template #sidebar>
      <div class="space-y-6 sticky top-6">
        <FinanceWidget />
        <TrendingNews />
        <WeatherWidget />
        <PopularTopics />
      </div>
    </template>
  </NewsLayout>
</template>
