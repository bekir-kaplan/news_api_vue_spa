<script setup lang="ts">
import { onMounted, watch, ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useCategoryStore } from '@/stores/categoryStore';
import NewsLayout from '@/layouts/NewsLayout.vue';
import NewsCard from '@/components/NewsCard.vue';
import TrendingNews from '@/components/TrendingNews.vue';
import PopularTopics from '@/components/PopularTopics.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import GoBackButton from '@/components/GoBackButton.vue';

const route = useRoute();
const categoryStore = useCategoryStore();
const { category, categoryArticlesPaginated, loading } = storeToRefs(categoryStore);

const observer = ref<IntersectionObserver | null>(null);
const loadMoreArticles = async (): Promise<void> => {
  await categoryStore.loadMoreArticles();
};

// Throttle function
function throttle(func: typeof loadMoreArticles, limit: number | undefined): () => void {
  let inThrottle: boolean;
  return function (this: unknown, ...args: any) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Throttled version of loadMoreArticles
const throttledLoadMoreArticles = (): void => {
  throttle(loadMoreArticles, 1000)();
};

// Watch for category changes
watch(
  () => route.params.category,
  async (newCategory) => {
    categoryStore.setCategory(Array.isArray(newCategory) ? newCategory[0] : newCategory);
    categoryStore.resetArticles();
  },
  { immediate: true }
);

onMounted(() => {
  observer.value = new IntersectionObserver(
    async (entries) => {
      if (entries[0].isIntersecting) {
        console.log('load articles');
        await throttledLoadMoreArticles();
      }
    },
    { rootMargin: '200px' }
  );

  const sentinel = document.querySelector('#infinite-scroll-sentinel');
  if (sentinel) {
    observer.value.observe(sentinel);
  }
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<template>
  <NewsLayout>
    <!-- Main Content -->
    <template #main>
      <LoadingSpinner :loading="loading" />
      <GoBackButton />
      <div class="category-view-header">
        <h1 class="category-view-title">{{ category }} News</h1>
      </div>

      <div class="grid-template">
        <NewsCard
          v-for="article in categoryArticlesPaginated"
          :key="article.url"
          :article="article"
        />
      </div>
      <div id="infinite-scroll-sentinel" />
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
@import '@/styles/views/category-view.css';
</style>
