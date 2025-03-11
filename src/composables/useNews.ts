import { ref, computed } from 'vue';
import type { Article } from '../api/types/mappedTypes';
import { newsService } from '../api/services/newsService';
import { CON_NEWS_CATEGORIES } from '../constants/conNews';

export function useNews() {
  const articles = ref<Article[]>([]);
  const selectedArticle = ref<Article | null>(null);
  const searchResults = ref<Article[]>([]);
  const searchQuery = ref('');
  const loading = ref(false);
  const error = ref<string | null>(null);
  const selectedCategory = ref('all');

  const categories = computed(() => CON_NEWS_CATEGORIES);

  const hasArticles = computed(() => articles.value.length > 0);
  const hasSearchResults = computed(() => searchResults.value.length > 0);

  const fetchTopHeadlines = async (category?: string) => {
    try {
      loading.value = true;
      error.value = null;
      articles.value = await newsService.getTopHeadlines({
        category: category && category !== 'all' ? category : undefined,
      });
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch news articles';
      articles.value = [];
    } finally {
      loading.value = false;
    }
  };

  const searchNews = async (query: string) => {
    try {
      loading.value = true;
      error.value = null;
      searchQuery.value = query;
      const params = {
        q: query,
        category: selectedCategory.value !== 'all' ? selectedCategory.value : undefined,
      };
      searchResults.value = await newsService.searchNews(params);
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to search news articles';
      searchResults.value = [];
    } finally {
      loading.value = false;
    }
  };

  const setSelectedArticle = (article: Article) => {
    selectedArticle.value = article;
  };

  const setCategory = (category: string) => {
    selectedCategory.value = category;
    if (searchQuery.value) {
      searchNews(searchQuery.value);
    } else {
      fetchTopHeadlines(category);
    }
  };

  const clearSearch = () => {
    searchResults.value = [];
    searchQuery.value = '';
  };

  return {
    // State
    articles,
    selectedArticle,
    searchResults,
    searchQuery,
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
}
