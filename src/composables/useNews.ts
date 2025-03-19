import { ref } from 'vue';
import { newsService } from '@/api/services/newsService';
import type { INewsArticle } from '@/api/types/news/news';
import type { INewsMapNewsRes, INewsMapSourceRes } from '@/api/types/news/newsMap';
import type {
  INewsReqTopHeadlineQParam,
  INewsReqEverythingQParam,
  INewsReqSourceQParam,
} from '@/api/types/news/newsRequests';

export function useNews(): any {
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Fetch Top Headlines
  const fetchTopHeadlines = async (params: INewsReqTopHeadlineQParam): Promise<INewsMapNewsRes> => {
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
  const fetchEverything = async (params: INewsReqEverythingQParam): Promise<INewsArticle[]> => {
    try {
      loading.value = true;
      error.value = null;
      const result = await newsService.searchNews({ ...params });
      return result.articles;
    } finally {
      loading.value = false;
    }
  };

  // Fetch Sources
  const fetchSources = async (params: INewsReqSourceQParam): Promise<INewsMapSourceRes> => {
    try {
      loading.value = true;
      error.value = null;
      const result = await newsService.getSources({ ...params });
      return result;
    } finally {
      loading.value = false;
    }
  };

  return { fetchTopHeadlines, fetchEverything, fetchSources, loading, error };
}
