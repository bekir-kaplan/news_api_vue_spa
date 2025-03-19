<!--
  NewsCard.vue
  --------------------
  This component represents an individual news article in a card format.
  It displays the news source, title, description, publication date, and 
  includes a like button and a "Read More" button for navigation.

  Props:
    - article (INewsArticle): The news article data to be displayed.

  Dependencies:
    - Vue Router:
      - useRouter: Handles navigation to the full article page.
    - Pinia Store:
      - useNewsStore: Stores the selected article for navigation.
    - Heroicons:
      - ArrowRightIcon: Displays an arrow icon for the "Read More" button.
    - Components:
      - BaseImage: Handles image rendering with error handling.
      - LikeButton: Allows users to like/unlike an article.
    - Utils:
      - formatW3CDateTime: A utility function to format the article's published date.

  Computed Properties:
    - formattedDate: Formats the article's `publishedAt` timestamp into a readable string.

  Methods:
    - viewArticle(): Stores the selected article in the news store and navigates to the 
    article details page.

  Behavior:
    - Clicking the "Read More" button navigates to the article page.
    - The like button allows users to favorite the article.
    - Images are displayed using the BaseImage component with error handling.
    - The article's publication date is formatted using a utility function.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`news-card.css`) for styling.
-->
<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ArrowRightIcon } from '@heroicons/vue/24/outline';
import { useNewsStore } from '@/stores/newsStore';
import LikeButton from '@/components/LikeButton.vue';
import type { INewsArticle } from '@/api/types/news/news';
import BaseImage from './BaseImage.vue';
import utils from '@/utils';

const props = defineProps<{
  article: INewsArticle;
}>();
const router = useRouter();
const newsStore = useNewsStore();

const formattedDate = computed(() => {
  return utils.formatW3CDateTime({
    timestamp: new Date(props.article.publishedAt).getTime(),
    dateFormat: {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    },
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
        <time :datetime="formattedDate.date" class="news-card-date-time">
          {{ formattedDate.date }}
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
