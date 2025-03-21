/**
 * News Store (Pinia)
 * --------------------------------------
 * Manages fetching, searching, and selecting news articles.
 *
 * Features:
 * - Retrieves top headlines for the carousel and category sections.
 * - Searches for news articles within both top headlines and everything.
 * - Stores selected articles for detailed viewing.
 */
import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useNews } from '@/composables/useNews';
import { useNewsFilterStore } from './newsFilterStore';
import type { INewsArticle } from '@/api/types/news/news';
import type { INewsMapNewsRes } from '@/api/types/news/newsMap';
import type { INewsReqTopHeadlineQParam } from '@/api/types/news/newsRequests';
import { CON_NEWS_DEFAULT_SECTIONS_PAGESIZE } from '@/constants/conNews';
import router from '@/router';

export const useNewsStore = defineStore(
  'newsStore',
  () => {
    const newsComposable = useNews();
    const { loading, error } = newsComposable; // check if needed storeToRefs
    const filterStore = useNewsFilterStore();
    const { newsFilters } = storeToRefs(filterStore); // check if needed storeToRefs
    const carouselArticles = ref<INewsArticle[]>([]);
    const categoryArticles = ref<Record<string, INewsArticle[]>>({});
    const selectedArticle = ref<INewsArticle | null>(null);
    const searchResults = ref<INewsArticle[]>([]);
    const endpointRef = ref<string>('everything');

    const hasSearchResults = computed(() => searchResults.value.length > 0);

    const setEndpointRef = (endpointName: string): void => {
      endpointRef.value = endpointName;
    };

    const fetch = {
      topHeadlines: {
        /**
         * Get main page carousel slide show data from top headlines
         * @param params type INewsReqTopHeadlineQParam
         */
        carousel: async (params?: INewsReqTopHeadlineQParam): Promise<void> => {
          const result: INewsMapNewsRes = await newsComposable.fetchTopHeadlines({
            ...params,
          });
          carouselArticles.value = result.articles;
        },

        /**
         * Get sections data from top headlines
         * @param params type INewsReqTopHeadlineQParam
         */
        sections: async (params: INewsReqTopHeadlineQParam): Promise<void> => {
          if (params.category) {
            const result: INewsMapNewsRes = await newsComposable.fetchTopHeadlines({
              category: params.category,
              pageSize: params.pageSize,
            });

            // Show articles which has minimum 3 records
            if (result.articles.length >= CON_NEWS_DEFAULT_SECTIONS_PAGESIZE - 2) {
              categoryArticles.value[params.category] = result.articles.slice(0, 3);
            }
          }
        },

        /**
         * Search in top headlines with query and newsFilter form params
         * @param query string
         */
        search: async (query: string): Promise<void> => {
          const result: INewsMapNewsRes = await newsComposable.fetchTopHeadlines({
            ...newsFilters.value,
            q: query,
          });
          searchResults.value = result.articles;
        },
      },
      everything: {
        search: async (query: string): Promise<void> => {
          try {
            loading.value = true;
            error.value = null;

            const result = await newsComposable.fetchEverything({
              ...newsFilters.value,
              q: query,
            });
            searchResults.value = result.articles;
          } finally {
            loading.value = false;
          }
        },
      },
    };

    const setSelectedArticle = (article: INewsArticle): void => {
      selectedArticle.value = article;
    };

    const clearSearch = (): void => {
      searchResults.value = [];
    };

    /**
     * Handles article selection and navigates to the article page.
     * @param article - The selected article.
     */
    const handleArticleClick = (article: INewsArticle): void => {
      setSelectedArticle(article);
      router.push(`/article/${encodeURIComponent(article.title)}`);
    };

    return {
      // State
      categoryArticles,
      selectedArticle,
      searchResults,
      carouselArticles,
      endpointRef,
      loading,
      error,

      // Computed
      hasSearchResults,

      // Actions
      fetch,
      setSelectedArticle,
      handleArticleClick,
      setEndpointRef,
      clearSearch,
    };
  },
  {
    persist: true,
  }
);
