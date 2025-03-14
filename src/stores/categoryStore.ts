import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useNews } from '@/composables/useNews';
import type { NewsAPIArticle } from '@/api/types/news';
import type { MappedNewsResponse } from '@/api/types/mappedTypes';

export const useCategoryStore = defineStore('category', () => {
  const { fetchTopHeadlines, loading } = useNews();
  const category = ref<string>('');
  const page = ref(0);
  const result = ref<MappedNewsResponse>({ status: 'ok', totalResults: 0, articles: [] });
  const categoryArticlesPaginated = ref<NewsAPIArticle[]>([]);

  const setCategory = (newCategory: string): void => {
    category.value = newCategory;
  };

  const loadArticles = async (): Promise<void> => {
    try {
      const response = await fetchTopHeadlines({
        category: category.value,
        pageSize: 10, // todo pagesize
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
