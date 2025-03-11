<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRightIcon } from '@heroicons/vue/24/outline';
import type { Article } from '../api/types/mappedTypes';
import { useNewsStore } from '../stores/newsStore';
import LikeButton from './LikeButton.vue';

const props = defineProps<{
  article: Article;
}>();

const router = useRouter();
const newsStore = useNewsStore();

const formattedDate = computed(() => {
  return new Date(props.article.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
});

const viewArticle = (): void => {
  newsStore.setSelectedArticle(props.article);
  router.push(`/article/${encodeURIComponent(props.article.title)}`);
};

const imageErrorHandler = (e: Event): void => {
  const target = e.target as HTMLImageElement;
  target.src = 'https://placehold.co/400x300';
};
</script>

<template>
  <article class="news-card-container">
    <!-- Header -->
    <header class="news-card-header">
      <div class="news-card-source">
        {{ article.source.name }}
      </div>
      <img
        :src="article.urlToImage"
        :alt="article.title"
        class="news-card-image"
        loading="lazy"
        :onerror="imageErrorHandler"
      />
      <LikeButton :article="article" />
    </header>

    <!-- Content -->
    <div class="news-card-content">
      <h2 class="news-card-title">
        {{ article.title }}
      </h2>
      <p class="news-card-description">
        {{ article.description }}
      </p>
    </div>

    <!-- Footer -->
    <footer class="news-card-footer">
      <div class="flex items-center justify-between">
        <time :datetime="article.publishedAt" class="news-card-date-time">
          {{ formattedDate }}
        </time>
        <button @click="viewArticle" class="news-card-read-more">
          <ArrowRightIcon class="h-4 w-4 ml-1" />
        </button>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.news-card-container {
  @apply bg-white rounded-lg shadow-md overflow-visible 
  hover:shadow-lg transition-shadow duration-300 flex flex-col;
}

.news-card-header {
  @apply relative;
}

.news-card-source {
  @apply absolute -top-[0.85rem] -left-2 bg-blue-600 text-white 
  text-sm font-medium px-3 py-1 rounded-full z-10;
}

.news-card-image {
  @apply w-full h-48 object-cover rounded-t-lg;
}

.news-card-content {
  @apply p-6 flex-grow;
}

.news-card-title {
  @apply text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors;
}

.news-card-description {
  @apply text-gray-600 line-clamp-3 font-thin text-sm;
}

.news-card-footer {
  @apply px-6 py-4 border-t border-gray-100;
}

.news-card-read-more {
  @apply text-xs inline-flex items-center text-blue-600 
  font-semibold hover:text-blue-800 transition-colors;
}

.news-card-date-time {
  @apply text-xs text-gray-500;
}
</style>
