<!--
  RelatedArticles.vue
  --------------------
  This component displays a list of related news articles based on the selected article's category.
  It retrieves related articles from the news store and provides navigation to article details.

  Dependencies:
    - Pinia Store:
      - useNewsStore: Manages news articles and selected article state.
    - Vue Router:
      - useRouter: Handles navigation to article details.
    - Components:
      - BaseImage: Displays article images with error handling.
    - Computed Properties:
      - relatedArticles: Retrieves articles from the same category as the selected article.

  Computed Properties:
    - relatedArticles: Returns articles from the selected category, or an empty array if none exist.

  Behavior:
    - If a selected article exists, related articles from the same category are displayed.
    - Clicking a related article updates the selected article and navigates to its details.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`related-articles.css`) for styling.
-->
<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';
import BaseImage from './BaseImage.vue';

const newsStore = useNewsStore();
const { categoryArticles, selectedArticle } = storeToRefs(newsStore);

/**
 * Computes related articles based on the selected article's category.
 * If no selected article or category exists, returns an empty array.
 */
const relatedArticles = computed(() => {
  if (!selectedArticle.value || !selectedArticle.value.category) {
    return [];
  }
  return categoryArticles.value[selectedArticle.value.category];
});
</script>

<template>
  <div class="related-articles-container">
    <h2 class="related-articles-title">Related Articles</h2>
    <div class="related-articles-list">
      <div v-for="article in relatedArticles" :key="article.url" class="related-articles-item">
        <router-link
          :to="`/article/${encodeURIComponent(article.title)}`"
          @click="newsStore.handleArticleClick(article)"
        >
          <BaseImage
            :src="article.urlToImage || ''"
            :alt="article.title"
            class-name="global-news-card-image rounded-lg mb-2"
          />
          <h3 class="related-articles-item-title group-hover:text-blue-600">
            {{ article.title }}
          </h3>
          <span class="related-articles-item-meta">{{ article.publishedAt }}</span>
          <span class="related-articles-item-meta">{{ article.author }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/related-articles.css';
</style>
