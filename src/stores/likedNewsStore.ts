import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Article } from '../api/types/mappedTypes';

export const useLikedNewsStore = defineStore(
  'likedNews',
  () => {
    const likedArticles = ref<Article[]>([]);

    const likedCount = computed(() => likedArticles.value.length);

    const isLiked = (article: Article): boolean => {
      return likedArticles.value.some((a) => a.url === article.url);
    };

    const toggleLike = (article: Article): void => {
      const index = likedArticles.value.findIndex((a) => a.url === article.url);
      if (index === -1) {
        likedArticles.value.push(article);
      } else {
        likedArticles.value.splice(index, 1);
      }
    };

    return {
      likedArticles,
      likedCount,
      isLiked,
      toggleLike,
    };
  },
  {
    persist: true,
  }
);
