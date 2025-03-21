/**
 * News Category Store (Pinia)
 * --------------------------------------
 * Manages news articles fetched by category.
 *
 * Features:
 * - Fetches top headlines based on the selected category.
 * - Supports pagination with `loadMoreArticles()`.
 * - Stores fetched articles in `categoryArticlesPaginated`.
 */
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useNews } from '@/composables/useNews';
import type { INewsArticle } from '@/api/types/news/news';
import type { INewsMapNewsRes } from '@/api/types/news/newsMap';
import { CON_NEWS_DEFAULT_CATEGORY_PAGESIZE } from '@/constants/conNews';

export const useCategoryStore = defineStore('category', () => {
  const { fetchTopHeadlines, loading } = useNews();
  const category = ref<string>('');
  const page = ref(0);
  const result = ref<INewsMapNewsRes>({ status: 'ok', totalResults: 0, articles: [] });
  const categoryArticlesPaginated = ref<INewsArticle[]>([]);

  const setCategory = (newCategory: string): void => {
    category.value = newCategory;
  };

  const loadArticles = async (): Promise<void> => {
    try {
      const response = await fetchTopHeadlines({
        category: category.value,
        pageSize: CON_NEWS_DEFAULT_CATEGORY_PAGESIZE,
        page: page.value,
      });
      result.value = response;
      categoryArticlesPaginated.value = [...categoryArticlesPaginated.value, ...response.articles];
    } finally {
      loading.value = false;
    }
  };

  const loadMoreArticles = async (): Promise<void> => {
    page.value += 1;
    await loadArticles();
  };

  const resetArticles = (): void => {
    categoryArticlesPaginated.value = [];
    page.value = 0;
  };

  return {
    category,
    page,
    result,
    categoryArticlesPaginated,
    loading,
    setCategory,
    loadArticles,
    loadMoreArticles,
    resetArticles,
  };
});
