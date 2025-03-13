import { ref, computed } from 'vue';
import { newsService } from '@/api/services/newsService';
import { CON_NEWS_CATEGORIES } from '@/constants/conNews';
import type { NewsAPIArticle } from '@/api/types/news';

export function useNews(): any {
  const articles = ref<NewsAPIArticle[]>([]);
  const selectedArticle = ref<NewsAPIArticle | null>(null);
  const searchResults = ref<NewsAPIArticle[]>([]);
  const searchQuery = ref('');
  const loading = ref(false);
  const error = ref<string | null>(null);
  const selectedCategory = ref('all');

  const categories = computed(() => CON_NEWS_CATEGORIES);

  const hasArticles = computed(() => articles.value.length > 0);
  const hasSearchResults = computed(() => searchResults.value.length > 0);

  const fetchTopHeadlines = async (category?: string): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;
      const mappedNewsResponse = await newsService.getTopHeadlines({
        category: category && category !== 'all' ? category : undefined,
      });
      articles.value = mappedNewsResponse.articles;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch news articles';
      articles.value = [];
    } finally {
      loading.value = false;
    }
  };

  const searchNews = async (query: string): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;
      searchQuery.value = query;
      const params = {
        q: query,
        category: selectedCategory.value !== 'all' ? selectedCategory.value : undefined,
      };
      const mappedNewsResponse = await newsService.searchNews(params);
      searchResults.value = mappedNewsResponse.articles;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to search news articles';
      searchResults.value = [];
    } finally {
      loading.value = false;
    }
  };

  const setSelectedArticle = (article: NewsAPIArticle): void => {
    selectedArticle.value = article;
  };

  const setCategory = (category: string): void => {
    selectedCategory.value = category;
    if (searchQuery.value) {
      searchNews(searchQuery.value);
    } else {
      fetchTopHeadlines(category);
    }
  };

  const clearSearch = (): void => {
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
