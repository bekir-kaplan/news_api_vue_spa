import { ref } from 'vue';
import { newsService } from '@/api/services/newsService';
import type { NewsAPIArticle } from '@/api/types/news';
import type { MappedNewsResponse } from '@/api/types/mappedTypes';

export function useNews(): any {
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch Top Headlines
  const fetchTopHeadlines = async (params: {
    category?: string;
    pageSize?: number;
    page?: number;
  }): Promise<MappedNewsResponse> => {
    try {
      loading.value = true;
      error.value = null;
      const result = await newsService.getTopHeadlines(params);
      return result;
    } finally {
      loading.value = false;
    }
  };

  // Search News
  const searchNewsAPI = async (query: string, category: string): Promise<NewsAPIArticle[]> => {
    try {
      loading.value = true;
      error.value = null;

      const params = {
        q: query,
        category: category !== 'all' ? category : undefined,
        sortBy: 'publishedAt' as const,
        pageSize: 10, // todo pagesize
      };

      const result = await newsService.searchNews(params);
      return result.articles as NewsAPIArticle[];
    } finally {
      loading.value = false;
    }
  };

  return { fetchTopHeadlines, searchNewsAPI, loading, error };
}
