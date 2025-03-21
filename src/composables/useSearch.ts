import { ref, watch } from 'vue';
import { useNewsStore } from '@/stores/newsStore';
import utils from '@/utils/index';
import { storeToRefs } from 'pinia';
import { CON_NEWS_SEARCH_ENDPOINTS } from '@/constants/conFilter';
import DOMPurify from 'dompurify';

export function useSearch(minChars = 3): any {
  const newsStore = useNewsStore();
  const { endpointRef } = storeToRefs(newsStore);
  const searchQuery = ref('');
  const showResults = ref(false);

  const debouncedSearch = utils.debounce(async (query: string) => {
    const cleanQuery = DOMPurify.sanitize(query);

    if (cleanQuery.length >= minChars) {
      if (endpointRef.value === CON_NEWS_SEARCH_ENDPOINTS.EVERYTHING.key) {
        await newsStore.fetch.everything.search(cleanQuery);
      }
      if (endpointRef.value === CON_NEWS_SEARCH_ENDPOINTS.TOP_HEADLINES.key) {
        await newsStore.fetch.topHeadlines.search(cleanQuery);
      }
      showResults.value = true;
    } else {
      showResults.value = false;
      newsStore.clearSearch();
    }
  }, 1000);

  watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery);
  });

  const handleSelect = (): void => {
    showResults.value = false;
    newsStore.clearSearch();
  };

  const handleFocus = (): void => {
    showResults.value = true;
  };

  const handleBlur = (): void => {
    setTimeout(() => {
      showResults.value = false;
    }, 500);
  };

  return {
    endpointRef,
    searchQuery,
    showResults,
    handleFocus,
    handleSelect,
    handleBlur,
  };
}
