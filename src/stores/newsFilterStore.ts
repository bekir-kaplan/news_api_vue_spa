import type { INewsReqTopHeadlineQParam, TNewsReqTopHeadlineQParam } from '@/api/types/requests';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNewsFilterStore = defineStore('newsFilter', () => {
  const newsFilters = ref<INewsReqTopHeadlineQParam>({});

  function setFilter(key: TNewsReqTopHeadlineQParam, value: string): void {
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
