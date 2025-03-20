/**
 * News Filter Store (Pinia)
 * --------------------------------------
 * Manages filtering options for news searches.
 *
 * Features:
 * - Stores selected filter options for news articles.
 * - Allows dynamic updates of individual filter criteria.
 * - Supports resetting all filters to default.
 */
import type { INewsFilterOptions, TNewsFilterOptions } from '@/api/types/news/newsRequests';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNewsFilterStore = defineStore('newsFilter', () => {
  const newsFilters = ref<INewsFilterOptions>({});

  /**
   * Updates a specific filter value.
   * - Encodes the value to ensure URL safety.
   * - Removes the filter if the value is empty.
   *
   * @param key - The filter key to update.
   * @param value - The new filter value.
   */
  const setFilter = (key: TNewsFilterOptions, value: string): void => {
    if (value) {
      newsFilters.value[key] = encodeURIComponent(value) as never;
    } else {
      const currentFilter = { ...newsFilters.value };
      delete currentFilter[key];
      newsFilters.value = currentFilter;
    }
  };

  /**
   * Resets all filters.
   */
  const resetFilter = (): void => {
    newsFilters.value = {};
  };

  return { newsFilters, resetFilter, setFilter };
});
