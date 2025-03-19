<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRightIcon } from '@heroicons/vue/24/outline';
import { useNewsStore } from '@/stores/newsStore';
import LikeButton from '@/components/LikeButton.vue';
import type { INewsArticle } from '@/api/types/news';
import BaseImage from './BaseImage.vue';

const props = defineProps<{
  article: INewsArticle;
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
</script>

<template>
  <article class="news-card-container">
    <!-- Header -->
    <header class="news-card-header">
      <div class="news-card-source short-text">
        {{ article.source.name }}
      </div>
      <BaseImage
        :src="article.urlToImage || ''"
        :alt="article.title"
        class-name="global-news-card-image rounded-t-lg"
      />
      <LikeButton :article="article" />
    </header>

    <!-- Content -->
    <div class="news-card-content">
      <h2 class="news-card-title" :title="article.title">
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
