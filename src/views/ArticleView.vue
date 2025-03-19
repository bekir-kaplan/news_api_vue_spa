<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';
import NewsLayout from '@/layouts/NewsLayout.vue';
import RelatedArticles from '@/components/RelatedArticles.vue';
import ShareButtons from '@/components/ShareButtons.vue';
import LikeButton from '@/components/LikeButton.vue';
import GoBackButton from '@/components/GoBackButton.vue';
import BaseImage from '@/components/BaseImage.vue';

const newsStore = useNewsStore();
const { selectedArticle } = storeToRefs(newsStore);

const formattedDate = computed(() => {
  if (!selectedArticle.value) {
    return '';
  }
  return new Date(selectedArticle.value.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>

<template>
  <NewsLayout>
    <!-- Main Content -->
    <template #main>
      <GoBackButton />

      <article v-if="selectedArticle" class="article-view-container">
        <BaseImage
          :src="selectedArticle.urlToImage || ''"
          :alt="selectedArticle.title"
          class-name="w-full h-96 object-cover"
        />

        <div class="article-view-content">
          <div class="article-view-header">
            <h1 class="article-view-title">
              {{ selectedArticle.title }}
            </h1>
            <div class="article-view-meta">
              <div>
                <div class="article-view-author">By {{ selectedArticle.author || 'Unknown' }}</div>
                <div>{{ formattedDate }}</div>
              </div>
              <div class="article-view-actions">
                <LikeButton :article="selectedArticle" />
                <div class="article-view-actions-vertical-divider" />
                <ShareButtons :article="selectedArticle" />
              </div>
            </div>
          </div>

          <div class="article-view-body">
            <p class="article-view-description">
              {{ selectedArticle.description }}
            </p>
            <p class="article-view-text">
              {{ selectedArticle.content }}
            </p>
          </div>

          <a
            :href="selectedArticle.url"
            target="_blank"
            rel="noopener noreferrer"
            class="article-view-link"
          >
            Read Full Article on {{ selectedArticle.source.name }}
          </a>
        </div>
      </article>
    </template>

    <!-- Sidebar Content -->
    <template #sidebar>
      <div class="article-view-sidebar">
        <RelatedArticles />
      </div>
    </template>
  </NewsLayout>
</template>

<style scoped>
@import '@/styles/views/article-view.css';
</style>
