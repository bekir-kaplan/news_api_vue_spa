import type { INewsReqTopHeadlineQParam } from '@/api/types/requests';
import type { ICategory, ISection } from '@/types/homeView.types';

export const CON_NEWS_DEFAULT_SECTIONS_PAGESIZE = 5;
export const CON_NEWS_DEFAULT_CAROUSEL_PAGESIZE = 12;
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

export const CON_FILTER_GROUPBY_VALUES = [
  { key: 'category', value: 'Category' },
  { key: 'country', value: 'Country' },
  { key: 'language', value: 'Language' },
];

export const CON_FILTER_PAGESIZE_VALUES = [
  { key: 'all', value: 'All' },
  { key: 5, value: 5 },
  { key: 10, value: 10 },
  { key: 15, value: 15 },
];

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

export const CON_FETCH_SECTIONS_PARAMS = {
  CAROUSEL: {
    pageSize: CON_NEWS_DEFAULT_CAROUSEL_PAGESIZE,
    country: CON_NEWS_DEFAULT_COUNTRY,
  } as INewsReqTopHeadlineQParam,
  SECTIONS: [
    {
      pageSize: CON_NEWS_DEFAULT_SECTIONS_PAGESIZE,
      category: CON_NEWS_CATEGORIES.politics.key,
      title: CON_NEWS_CATEGORIES.politics.value,
    },
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
    {
      pageSize: CON_NEWS_DEFAULT_SECTIONS_PAGESIZE,
      category: CON_NEWS_CATEGORIES.health.key,
      title: CON_NEWS_CATEGORIES.health.value,
    },
    {
      pageSize: CON_NEWS_DEFAULT_SECTIONS_PAGESIZE,
      category: CON_NEWS_CATEGORIES.technology.key,
      title: CON_NEWS_CATEGORIES.technology.value,
    },
  ] as ISection[], // 'entertainment', 'technology', 'health'
};
