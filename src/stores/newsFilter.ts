import type { TopHeadlinesParams, TopHeadlinesParamTypes } from '@/api/types/requests';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNewsFilter = defineStore('newsFilter', () => {
  const newsFilters = ref<TopHeadlinesParams>({});

  function setFilter(key: TopHeadlinesParamTypes, value: string): void {
    if (value) {
      newsFilters.value[key] = encodeURIComponent(value) as any;
    } else {
      const currentFilter = { ...newsFilters.value };
      delete currentFilter[key];
      newsFilters.value = currentFilter;
    }
  }

  return { newsFilters, setFilter };
});
