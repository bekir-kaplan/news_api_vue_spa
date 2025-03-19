<!--
  LikeButton.vue
  --------------------
  This component provides a like/unlike button for news articles.
  It allows users to mark articles as liked and manages the liked state using Pinia.

  Props:
    - article (INewsArticle): The news article object associated with the like button.

  Dependencies:
    - Pinia Store:
      - useLikedNewsStore: Manages liked news articles.
    - Heroicons:
      - HeartIcon (Solid & Outline): Displays the liked/unliked state.

  Computed Properties:
    - isLiked: Checks whether the given article is liked.

  Methods:
    - toggleLike(event: Event): Toggles the liked state for the article.

  Behavior:
    - Clicking the button toggles between liked and unliked states.
    - Stops event propagation to prevent triggering parent click events.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`like-button.css`) for styling.
-->
<script setup lang="ts">
import { computed } from 'vue';
import { HeartIcon as HeartOutline } from '@heroicons/vue/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/vue/24/solid';
import { useLikedNewsStore } from '@/stores/likedNewsStore';
import type { INewsArticle } from '@/api/types/news/news';

const props = defineProps<{
  article: INewsArticle;
}>();

const likedNewsStore = useLikedNewsStore();
const isLiked = computed(() => likedNewsStore.isLiked(props.article));

/**
 * Toggles the like state of an article.
 * Stops event propagation to prevent unintended parent component interactions.
 * @param event - Click event
 */
const toggleLike = (event: Event): void => {
  event.stopPropagation();
  likedNewsStore.toggleLike(props.article);
};
</script>

<template>
  <button class="btn like-button" @click="toggleLike">
    <HeartSolid v-if="isLiked" class="like-button-icon liked" />
    <HeartOutline v-else class="like-button-icon not-liked" />
  </button>
</template>

<style scoped>
@import '@/styles/components/like-button.css';
</style>
