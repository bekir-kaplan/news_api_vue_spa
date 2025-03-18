import type { INewsFilterOptions, TNewsFilterOptions } from '@/api/types/requests';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNewsFilterStore = defineStore('newsFilter', () => {
  const newsFilters = ref<INewsFilterOptions>({});

  const setFilter = (key: TNewsFilterOptions, value: string): void => {
    if (value) {
      newsFilters.value[key] = encodeURIComponent(value) as never;
    } else {
      const currentFilter = { ...newsFilters.value };
      delete currentFilter[key];
      newsFilters.value = currentFilter;
    }
  };

  const resetFilter = (): void => {
    newsFilters.value = {};
  };

  return { newsFilters, resetFilter, setFilter };
});
