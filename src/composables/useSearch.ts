import { ref, watch } from 'vue';
import { useNewsStore } from '@/stores/newsStore';
import { debounce } from '@/utils/debounce';

export function useSearch(minChars = 3): any {
  const newsStore = useNewsStore();
  const searchQuery = ref('');
  const showResults = ref(false);

  const debouncedSearch = debounce(async (query: string) => {
    const encodedQuery = encodeURIComponent(query);
    if (encodedQuery.length >= minChars) {
      await newsStore.searchNews({ q: encodedQuery });
      showResults.value = true;
    } else {
      showResults.value = false;
      newsStore.clearSearch();
    }
  }, 300);

  watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery);
  });

  const handleSelect = (): void => {
    showResults.value = false;
    newsStore.clearSearch();
  };

  const handleBlur = (): void => {
    setTimeout(() => {
      showResults.value = false;
    }, 1000);
  };

  return {
    searchQuery,
    showResults,
    handleSelect,
    handleBlur,
  };
}
