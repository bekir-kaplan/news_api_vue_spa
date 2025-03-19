import { ref, computed } from 'vue';
import type { INewsArticle } from '@/api/types/news/news';
import { defineStore } from 'pinia';
import type { ILikedArticlesByCategory } from '@/types/news.types';

export const useLikedNewsStore = defineStore(
  'likedNews',
  () => {
    const likedArticles = ref<INewsArticle[]>([]);

    const likedCount = computed(() => likedArticles.value.length);

    const isLiked = (article: INewsArticle): boolean => {
      return likedArticles.value.some((a) => a.url === article.url);
    };

    const toggleLike = (article: INewsArticle): void => {
      const index = likedArticles.value.findIndex((a) => a.url === article.url);
      if (index === -1) {
        likedArticles.value.push(article);
      } else {
        likedArticles.value.splice(index, 1);
      }
    };

    const likedArticlesByCategory = computed(() => {
      return likedArticles.value.reduce((acc: ILikedArticlesByCategory, article) => {
        const category = article.category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = {
            category,
            count: 0,
          };
        }
        acc[category].category = category;
        acc[category].count++;
        return acc;
      }, {});
    });

    return {
      likedArticles,
      likedCount,
      isLiked,
      toggleLike,
      likedArticlesByCategory,
    };
  },
  {
    persist: true,
  }
);
