import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useNews } from '@/composables/useNews';
import { newsService } from '@/api/services/newsService';
import { useNewsFilterStore } from './newsFilterStore';
import type { INewsArticle } from '@/api/types/news/news';
import type { INewsMapNewsRes } from '@/api/types/news/newsMap';
import type {
  INewsReqTopHeadlineQParam,
  INewsReqEverythingQParam,
} from '@/api/types/news/newsRequests';
import { CON_NEWS_DEFAULT_SECTIONS_PAGESIZE } from '@/constants/conNews';

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

    const hasSearchResults = computed(() => searchResults.value.length > 0);

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
        // TODO: In search panel we need to add selection
        // to search in everything or topheadlines search
        search: async (query: INewsReqEverythingQParam): Promise<void> => {
          try {
            loading.value = true;
            error.value = null;

            const params = {
              ...query,
            };

            // TODO: comosable uzerinden git
            const result = await newsService.searchNews(params);

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

    return {
      // State
      categoryArticles,
      selectedArticle,
      searchResults,
      carouselArticles,
      loading,
      error,

      // Computed
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
