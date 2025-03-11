import { ref, watch } from 'vue';
import type { Article } from '../api/types/mappedTypes';
import { useNewsStore } from '../stores/newsStore';
import { debounce } from '../utils/debounce';

export function useSearch(minChars = 3) {
  const newsStore = useNewsStore();
  const searchQuery = ref('');
  const showResults = ref(false);

  const debouncedSearch = debounce(async (query: string) => {
    if (query.length >= minChars) {
      await newsStore.searchNews(query);
      showResults.value = true;
    } else {
      showResults.value = false;
      newsStore.clearSearch();
    }
  }, 300);

  watch(searchQuery, (newQuery) => {
    debouncedSearch(newQuery);
  });

  const handleSelect = (article: Article) => {
    searchQuery.value = article.title;
    showResults.value = false;
    newsStore.clearSearch();
  };

  const handleBlur = () => {
    setTimeout(() => {
      showResults.value = false;
    }, 200);
  };

  return {
    searchQuery,
    showResults,
    handleSelect,
    handleBlur,
  };
}
