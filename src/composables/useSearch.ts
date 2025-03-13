import { ref, watch } from 'vue';
import { useNewsStore } from '@/stores/newsStore';
import { debounce } from '@/utils/debounce';
import type { NewsAPIArticle } from '@/api/types/news';

export function useSearch(minChars = 3): any {
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

  const handleSelect = (article: NewsAPIArticle): void => {
    searchQuery.value = article.title;
    showResults.value = false;
    newsStore.clearSearch();
  };

  const handleBlur = (): void => {
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
