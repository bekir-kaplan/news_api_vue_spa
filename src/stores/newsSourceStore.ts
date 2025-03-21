/**
 * News Source Store (Pinia)
 * --------------------------------------
 * Manages news sources and applies dynamic filtering.
 *
 * Features:
 * - Fetches a list of available news sources.
 * - Allows grouping sources dynamically (category, country, etc.).
 * - Supports filtering and sorting sources based on query parameters.
 */
import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import { useNews } from '@/composables/useNews';
import type { INewsSource } from '@/api/types/news/news';
import { useNewsFilterStore } from './newsFilterStore';
import type { INewsFilterOptions, INewsReqSourceQParam } from '@/api/types/news/newsRequests';
import { CON_FILTER_CATEGORIES } from '@/constants/conNews';

export const useNewsSourceStore = defineStore(
  'newsSourceStore',
  () => {
    const newsComposable = useNews();
    const filterStore = useNewsFilterStore();
    const { loading, error } = newsComposable;
    const sources = ref<INewsSource[]>([]);
    let queryParams = reactive<INewsReqSourceQParam>({});

    /**
     * Computes the grouping parameter for categorizing news sources.
     * Defaults to 'category' if no filter is applied.
     */
    const groupByParam = computed(
      () => filterStore.newsFilters.groupBy || CON_FILTER_CATEGORIES.CATEGORY
    );

    const fetch = {
      sources: async (): Promise<void> => {
        try {
          loading.value = true;
          error.value = null;
          const result = await newsComposable.fetchSources({ ...queryParams });
          sources.value = result.sources;
        } finally {
          loading.value = false;
        }
      },
    };

    const groupedSources = computed(() => {
      const grouped = sources.value.reduce(
        (acc: Record<string, INewsSource[]>, source: INewsSource) => {
          const groupKey = source[groupByParam.value] as string;
          if (!acc[groupKey]) {
            acc[groupKey] = [];
          }
          acc[groupKey].push(source);
          return acc;
        },
        {}
      );

      Object.keys(grouped).forEach((key) => {
        grouped[key].sort((a, b) => a[groupByParam.value].localeCompare(b[groupByParam.value]));
      });

      // sort by object key
      Object.keys(grouped)
        .sort()
        .reduce((obj: Record<string, INewsSource[]>, key) => {
          obj[key] = grouped[key];
          return obj;
        }, {});

      return grouped;
    });

    // Watch for changes in queryParams and sort sources accordingly
    watch(
      () => queryParams,
      (newQueryParams) => {
        // Sort sources based on newQueryParams
        sources.value.sort((a, b) => {
          // Example: Sort by multiple parameters (you can customize this based on queryParams)
          if (newQueryParams.category && a.category !== b.category) {
            return a.category.localeCompare(b.category);
          }
          if (newQueryParams.language && a.language !== b.language) {
            return a.language.localeCompare(b.language);
          }
          if (newQueryParams.country && a.country !== b.country) {
            return a.country.localeCompare(b.country);
          }
          return a.name.localeCompare(b.name); // Default sort by name
        });
      },
      { deep: true }
    );

    const setQueryParams = (_queryParams: INewsFilterOptions): void => {
      delete _queryParams.groupBy;
      queryParams = _queryParams;
      fetch.sources();
    };

    return {
      // State
      loading,
      error,
      sources,
      queryParams,
      groupByParam,

      // Computed
      groupedSources,

      // Actions
      fetch,
      setQueryParams,
    };
  },
  {
    persist: true,
  }
);
