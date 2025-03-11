// stores/apiCacheStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

interface CachedResponse {
  data: any;
  timestamp: number;
}

export const useApiCacheStore = defineStore(
  'apiCache',
  () => {
    const cache = ref<Record<string, CachedResponse>>({});

    const getCache = (key: string, maxAge = 600000 * 6): CachedResponse | null => {
      // Default 1 hour cache
      const cached = cache.value[key];
      if (cached && Date.now() - cached.timestamp < maxAge) {
        return cached.data;
      }
      return null;
    };

    const setCache = (key: string, data: any): void => {
      cache.value[key] = { data, timestamp: Date.now() };
    };

    return { cache, getCache, setCache };
  },
  {
    persist: true,
  }
);
