import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Article } from '../api/types/mappedTypes';
import { newsService } from '../api/services/newsService';
import { CON_NEWS_CATEGORIES } from '../constants/conNews';

export const useNewsStore = defineStore(
  'news',
  () => {
    const articles = ref<Article[]>([]);
    const selectedArticle = ref<Article | null>(null);
    const searchResults = ref<Article[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const selectedCategory = ref('all');

    const categories = computed(() => CON_NEWS_CATEGORIES);

    const hasArticles = computed(() => articles.value.length > 0);
    const hasSearchResults = computed(() => searchResults.value.length > 0);

    const fetchTopHeadlines = async (params?: {
      category?: string;
      pageSize?: number;
    }): Promise<Article[]> => {
      try {
        loading.value = true;
        error.value = null;

        const result = await newsService.getTopHeadlines({
          ...params,
          pageSize: params?.pageSize || 20,
        });

        if (params?.category) {
          return result.articles;
        } else {
          articles.value = result.articles;
        }

        return result.articles;
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to fetch news articles';
        return [];
      } finally {
        loading.value = false;
      }
    };

    const searchNews = async (query: string): Promise<void> => {
      try {
        loading.value = true;
        error.value = null;

        const params = {
          q: query,
          category: selectedCategory.value !== 'all' ? selectedCategory.value : undefined,
          sortBy: 'publishedAt' as const,
          pageSize: 20,
        };

        const result = await newsService.searchNews(params);
        searchResults.value = result.articles;
      } catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to search news articles';
        searchResults.value = [];
      } finally {
        loading.value = false;
      }
    };

    const setSelectedArticle = (article: Article): void => {
      selectedArticle.value = article;
    };

    const setCategory = (category: string): void => {
      selectedCategory.value = category;
    };

    const clearSearch = (): void => {
      searchResults.value = [];
    };

    return {
      // State
      articles,
      selectedArticle,
      searchResults,
      loading,
      error,
      selectedCategory,
      categories,

      // Computed
      hasArticles,
      hasSearchResults,

      // Actions
      fetchTopHeadlines,
      searchNews,
      setSelectedArticle,
      setCategory,
      clearSearch,
    };
  },
  {
    persist: true,
  }
);
