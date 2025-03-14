import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { newsService } from '@/api/services/newsService';
import { CON_NEWS_CATEGORIES } from '@/constants/conNews';
import type { NewsAPIArticle } from '@/api/types/news';
import { useNews } from '@/composables/useNews';

export const useNewsStore = defineStore(
  'news',
  () => {
    const newsComposable = useNews();
    const articles = ref<NewsAPIArticle[]>([]);
    const categoryArticles = ref<Record<string, NewsAPIArticle[]>>({});
    const selectedArticle = ref<NewsAPIArticle | null>(null);
    const searchResults = ref<NewsAPIArticle[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const selectedCategory = ref('all');

    const categories = computed(() => CON_NEWS_CATEGORIES);

    const hasArticles = computed(() => articles.value.length > 0);
    const hasSearchResults = computed(() => searchResults.value.length > 0);

    const fetchTopHeadlines = async (params?: {
      category?: string;
      pageSize?: number;
      page?: number;
    }): Promise<void> => {
      try {
        loading.value = true;
        error.value = null;

        const result = await newsComposable.fetchTopHeadlines({
          ...params,
          category: params?.category !== 'all' ? params?.category?.toLocaleLowerCase() : undefined,
          pageSize: params?.pageSize || 10,
          page: params?.page || 1,
        });

        if (params?.category) {
          categoryArticles.value[params.category] = result.articles;
        } else {
          articles.value = result.articles;
        }
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
          pageSize: 20, // todo pagesize
        };

        const result = await newsService.searchNews(params);
        searchResults.value = result.articles;
      } finally {
        loading.value = false;
      }
    };

    const setSelectedArticle = (article: NewsAPIArticle): void => {
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
      categoryArticles,
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
