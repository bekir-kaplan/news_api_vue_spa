import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import { useNews } from '@/composables/useNews';
import type { INewsSource } from '@/api/types/news';
import type { INewsReqSourceQParam } from '@/api/types/requests';

export const useNewsSourceStore = defineStore(
  'newsSourceStore',
  () => {
    const newsComposable = useNews();
    const { loading, error } = newsComposable;
    const sources = ref<INewsSource[]>([]);
    let queryParams = reactive<INewsReqSourceQParam>({});

    const groupParam = ref<keyof INewsReqSourceQParam>('category');

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
          //source[groupParam.value] as string;
          const groupKey = source[groupParam.value] as string;
          if (!acc[groupKey]) {
            acc[groupKey] = [];
          }
          acc[groupKey].push(source);
          return acc;
        },
        {}
      );

      Object.keys(grouped).forEach((key) => {
        grouped[key].sort((a, b) => a.name.localeCompare(b.name));
      });

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

    const setQueryParams = (_queryParams: INewsReqSourceQParam): void => {
      queryParams = _queryParams;
      fetch.sources();
    };

    return {
      // State
      loading,
      error,
      sources,
      queryParams,
      groupParam,

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
