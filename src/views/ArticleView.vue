<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { useNewsStore } from '../stores/newsStore';
import NewsLayout from '../layouts/NewsLayout.vue';
import RelatedArticles from '../components/RelatedArticles.vue';
import ShareButtons from '../components/ShareButtons.vue';
import LikeButton from '../components/LikeButton.vue';

const newsStore = useNewsStore();
const router = useRouter();
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

const goBack = (): void => {
  router.push('/');
};
</script>

<template>
  <NewsLayout>
    <!-- Main Content -->
    <template #main>
      <button @click="goBack" class="article-view-back-button">
        <ArrowLeftIcon class="article-view-back-icon" />
        Back to News
      </button>

      <article v-if="selectedArticle" class="article-view-container">
        <img
          v-if="selectedArticle.urlToImage"
          :src="selectedArticle.urlToImage"
          :alt="selectedArticle.title"
          class="article-view-image"
        />

        <div class="article-view-content">
          <div class="article-view-header">
            <h1 class="article-view-title">
              {{ selectedArticle.title }}
            </h1>
            <div class="article-view-meta">
              <div>
                <p class="article-view-author">By {{ selectedArticle.author || 'Unknown' }}</p>
                <p>{{ formattedDate }}</p>
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
            <div class="article-view-text">
              {{ selectedArticle.content }}
            </div>
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
@import '../styles/views/article-view.css';
</style>
