<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRightIcon } from '@heroicons/vue/24/outline';
import { useNewsStore } from '@/stores/newsStore';
import LikeButton from '@/components/LikeButton.vue';
import type { NewsAPIArticle } from '@/api/types/news';

const props = defineProps<{
  article: NewsAPIArticle;
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
        :src="article.urlToImage || 'https://placehold.co/400x300'"
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
        <time :datetime="formattedDate" class="news-card-date-time">
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
@import '@/styles/components/news-card.css';
</style>
