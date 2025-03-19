<!--
  ShareButtons.vue
  --------------------
  This component provides a share button for news articles using the Web Share API.
  If the browser supports the API, users can share the article via native sharing options.

  Props:
    - article (INewsArticle): The news article data to be shared.

  Dependencies:
    - Heroicons:
      - ShareIcon: Displays the share button icon.

  Reactive State:
    - shareUrl (string): Stores the current page URL.

  Lifecycle Hooks:
    - onMounted: Sets the `shareUrl` to the current browser URL when the component is mounted.

  Methods:
    - shareArticle(): Uses the Web Share API to share the article if supported.
      - Includes the article title, description, and current URL.
      - If the Web Share API is not supported, throws an error.

  Behavior:
    - Clicking the share button triggers the browser's native sharing options (if available).
    - If sharing fails, an error is thrown.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`share-buttons.css`) for styling.
-->
<script setup lang="ts">
import type { INewsArticle } from '@/api/types/news/news';
import { ShareIcon } from '@heroicons/vue/24/outline';
import { ref, onMounted } from 'vue';

const props = defineProps<{ article: INewsArticle }>();

const shareUrl = ref('');

onMounted(() => {
  if (typeof window !== 'undefined') {
    shareUrl.value = window.location.href;
  }
});

/**
 * Shares the article using the Web Share API if supported.
 * Includes the article title, description, and current page URL.
 * Throws an error if the API is not supported or sharing fails.
 */
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
