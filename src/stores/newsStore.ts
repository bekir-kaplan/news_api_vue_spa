import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useNews } from '@/composables/useNews';
import { newsService } from '@/api/services/newsService';
import { useNewsFilter } from './newsFilter';
import type { NewsAPIArticle } from '@/api/types/news';
import type { SearchNewsParams, TopHeadlinesParams } from '@/api/types/requests';
import type { MappedNewsResponse } from '@/api/types/mappedTypes';

export const useNewsStore = defineStore(
  'news',
  () => {
    const filterStore = useNewsFilter();
    const { newsFilters } = storeToRefs(filterStore);
    const newsComposable = useNews();
    const { loading, error } = newsComposable;
    const articles = ref<NewsAPIArticle[]>([]);
    const carouselArticles = ref<NewsAPIArticle[]>([]);
    const categoryArticles = ref<Record<string, NewsAPIArticle[]>>({});
    const selectedArticle = ref<NewsAPIArticle | null>(null);
    const searchResults = ref<NewsAPIArticle[]>([]);

    const hasArticles = computed(() => articles.value.length > 0);
    const hasSearchResults = computed(() => searchResults.value.length > 0);

    const fetch = {
      topHeadlines: {
        /**
         * Get main page carousel slide show data from top headlines
         * @param params type TopHeadlinesParams
         */
        carousel: async (params?: TopHeadlinesParams): Promise<void> => {
          const result: MappedNewsResponse = await newsComposable.fetchTopHeadlines({
            ...params,
          });
          carouselArticles.value = result.articles;
        },

        /**
         * Get sections data from top headlines
         * @param params type TopHeadlinesParams
         */
        sections: async (params: TopHeadlinesParams): Promise<void> => {
          if (params.category) {
            const result: MappedNewsResponse = await newsComposable.fetchTopHeadlines({
              category: params.category,
              pageSize: params.pageSize,
            });
            categoryArticles.value[params.category] = result.articles;
          }
        },

        /**
         * Search in top headlines with query and newsFilter form params
         * @param query string
         */
        search: async (query: string): Promise<void> => {
          const result: MappedNewsResponse = await newsComposable.fetchTopHeadlines({
            ...newsFilters.value,
            q: query,
          });
          searchResults.value = result.articles;
        },
      },
      everything: {
        search: async (query: SearchNewsParams): Promise<void> => {
          try {
            loading.value = true;
            error.value = null;

            const params = {
              ...query,
            };

            const result = await newsService.searchNews(params);

            searchResults.value = result.articles;
          } finally {
            loading.value = false;
          }
        },
      },
    };

    const setSelectedArticle = (article: NewsAPIArticle): void => {
      selectedArticle.value = article;
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
      carouselArticles,
      loading,
      error,

      // Computed
      hasArticles,
      hasSearchResults,

      // Actions
      fetch,
      setSelectedArticle,
      clearSearch,
    };
  },
  {
    persist: true,
  }
);
