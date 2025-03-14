<script setup lang="ts">
import type { NewsAPIArticle } from '@/api/types/news';
import { ShareIcon } from '@heroicons/vue/24/outline';
import { ref, onMounted } from 'vue';

const props = defineProps<{ article: NewsAPIArticle }>();

const shareUrl = ref('');

onMounted(() => {
  if (typeof window !== 'undefined') {
    shareUrl.value = window.location.href;
  }
});

const shareArticle = (): void => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    navigator
      .share({
        title: props.article.title,
        text: props.article.description || undefined,
        url: shareUrl.value,
      })
      .catch((error) => {
        throw new Error(`Sharing failed: ${error}`);
      });
  } else {
    throw new Error('Web Share API is not supported in this browser.');
  }
};
</script>

<template>
  <div class="share-buttons-container">
    <button class="share-buttons-button" @click="shareArticle">
      <ShareIcon class="share-buttons-icon" />
      <span class="share-buttons-text">Share</span>
    </button>
  </div>
</template>

<style scoped>
@import '@/styles/components/share-buttons.css';
</style>
