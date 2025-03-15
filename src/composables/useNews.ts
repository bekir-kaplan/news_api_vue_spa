import { ref } from 'vue';
import { newsService } from '@/api/services/newsService';
import type { NewsAPIArticle } from '@/api/types/news';
import type { MappedNewsResponse } from '@/api/types/mappedTypes';
import type { SearchNewsParams, TopHeadlinesParams } from '@/api/types/requests';

export function useNews(): any {
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch Top Headlines
  const fetchTopHeadlines = async (params: TopHeadlinesParams): Promise<MappedNewsResponse> => {
    try {
      loading.value = true;
      error.value = null;
      const result = await newsService.getTopHeadlines({ ...params });
      return result;
    } finally {
      loading.value = false;
    }
  };

  // Search News
  const searchNewsAPI = async (query: SearchNewsParams): Promise<NewsAPIArticle[]> => {
    try {
      loading.value = true;
      error.value = null;

      const params = {
        ...query,
      };

      const result = await newsService.searchNews(params);
      return result.articles as NewsAPIArticle[];
    } finally {
      loading.value = false;
    }
  };

  return { fetchTopHeadlines, searchNewsAPI, loading, error };
}
