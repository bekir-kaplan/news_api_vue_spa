import { ref, watch } from 'vue';
import { useNewsStore } from '@/stores/newsStore';
import { debounce } from '@/utils/debounce';

export function useSearch(minChars = 3): any {
  const newsStore = useNewsStore();
  const searchQuery = ref('');
  const showResults = ref(false);

  const debouncedSearch = debounce(async (query: string) => {
    if (query.length >= minChars) {
      await newsStore.fetch.topHeadlines.search(query);
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
    searchQuery,
    showResults,
    handleFocus,
    handleSelect,
    handleBlur,
  };
}
