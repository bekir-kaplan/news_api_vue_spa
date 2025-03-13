import { ref, computed } from 'vue';
import type { NewsAPIArticle } from '@/api/types/news';
import { defineStore } from 'pinia';

export interface ILikedArticlesByCategory {
  [key: string]: {
    name: string;
    count: number;
  };
}

export const useLikedNewsStore = defineStore(
  'likedNews',
  () => {
    const likedArticles = ref<NewsAPIArticle[]>([]);

    const likedCount = computed(() => likedArticles.value.length);

    const isLiked = (article: NewsAPIArticle): boolean => {
      return likedArticles.value.some((a) => a.url === article.url);
    };

    const toggleLike = (article: NewsAPIArticle): void => {
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
            name: category,
            count: 0,
          };
        }
        acc[category].name = category;
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
