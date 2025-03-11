<script setup lang="ts">
import type { Article } from '../api/types/mappedTypes';
import { ShareIcon } from '@heroicons/vue/24/outline';
import { ref, onMounted } from 'vue';

const props = defineProps<{ article: Article }>();

const shareUrl = ref(''); // Reactive variable to store the URL

onMounted(() => {
  if (typeof window !== 'undefined') {
    shareUrl.value = window.location.href; // Assign only when mounted
  }
});

const shareArticle = (): void => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    navigator
      .share({
        title: props.article.title,
        text: props.article.description,
        url: shareUrl.value, // Use reactive value
      })
      .catch((error) => console.error('Sharing failed:', error));
  } else {
    console.warn('Web Share API is not supported in this browser.');
  }
};
</script>

<template>
  <div class="flex items-center space-x-4">
    <button
      class="inline-flex items-center text-gray-600 hover:text-blue-600"
      @click="shareArticle"
    >
      <ShareIcon class="h-5 w-5" />
      <span class="ml-2">Share</span>
    </button>
  </div>
</template>
