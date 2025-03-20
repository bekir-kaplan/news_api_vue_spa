/**
 * Liked News Store (Pinia)
 * --------------------------------------
 * Manages user interactions with liked news articles.
 *
 * Features:
 * - Tracks liked articles and allows toggling likes.
 * - Computes the total count of liked articles.
 * - Organizes liked articles by category.
 */
import { ref, computed } from 'vue';
import type { INewsArticle } from '@/api/types/news/news';
import { defineStore } from 'pinia';
import type { ILikedArticlesByCategory } from '@/types/news.types';

export const useLikedNewsStore = defineStore(
  'likedNews',
  () => {
    const likedArticles = ref<INewsArticle[]>([]);

    const likedCount = computed(() => likedArticles.value.length);

    /**
     * Checks if an article is already liked.
     * @param article - The news article to check.
     * @returns `true` if the article is liked, otherwise `false`.
     */
    const isLiked = (article: INewsArticle): boolean => {
      return likedArticles.value.some((a) => a.url === article.url);
    };

    /**
     * Toggles the like status of a news article.
     * - If the article is not liked, it adds it to `likedArticles`.
     * - If the article is already liked, it removes it.
     *
     * @param article - The news article to like/unlike.
     */
    const toggleLike = (article: INewsArticle): void => {
      const index = likedArticles.value.findIndex((a) => a.url === article.url);
      if (index === -1) {
        likedArticles.value.push(article);
      } else {
        likedArticles.value.splice(index, 1);
      }
    };

    /**
     * Groups liked articles by their category.
     * @returns An object mapping categories to their liked article counts.
     */
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
