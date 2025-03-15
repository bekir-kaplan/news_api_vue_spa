import type { TopHeadlinesParams } from '@/api/types/requests';
import type { ICategory, ISection } from '@/types/homeView.types';

export const CON_NEWS_DEFAULT_SECTIONS_PAGESIZE = 3;
export const CON_NEWS_DEFAULT_CAROUSEL_PAGESIZE = 10;
export const CON_NEWS_DEFAULT_COUNTRY = 'us';

export const CON_REQUEST_PARAMS = {
  TOP_HEADLINE: {
    country: 'country',
    category: 'category',
    sources: 'sources',
    q: 'q',
    pageSize: 'pageSize',
    page: 'page',
  },
};

export const CON_NEWS_CATEGORIES = {
  all: { key: 'all', value: 'All' },
  general: { key: 'general', value: 'General' },
  business: { key: 'business', value: 'Business' },
  entertainment: { key: 'entertainment', value: 'Entertainment' },
  health: { key: 'health', value: 'Health' },
  science: { key: 'science', value: 'Science' },
  sports: { key: 'sports', value: 'Sports' },
  technology: { key: 'technology', value: 'Technology' },
  politics: { key: 'politics', value: 'Politics' },
} as ICategory;

export const CON_FETCH_PARAMS = {
  CAROUSEL: {
    pageSize: CON_NEWS_DEFAULT_CAROUSEL_PAGESIZE,
    country: CON_NEWS_DEFAULT_COUNTRY,
  } as TopHeadlinesParams,
  SECTIONS: [
    {
      pageSize: CON_NEWS_DEFAULT_SECTIONS_PAGESIZE,
      category: CON_NEWS_CATEGORIES.business.key,
      title: CON_NEWS_CATEGORIES.business.value,
    },
    {
      pageSize: CON_NEWS_DEFAULT_SECTIONS_PAGESIZE,
      category: CON_NEWS_CATEGORIES.entertainment.key,
      title: CON_NEWS_CATEGORIES.entertainment.value,
    },
  ] as ISection[], // 'entertainment', 'technology', 'health'
};
