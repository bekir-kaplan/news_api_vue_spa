import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/category/:category',
      name: 'category',
      component: (): Promise<unknown> => import('@/views/CategoryView.vue'),
    },
    {
      path: '/sources',
      name: 'sources',
      component: (): Promise<unknown> => import('@/views/SourcesView.vue'),
    },
    {
      path: '/liked',
      name: 'liked',
      component: (): Promise<unknown> => import('@/views/LikedNewsView.vue'),
    },
    {
      path: '/article/:id',
      name: 'article',
      component: (): Promise<unknown> => import('@/views/ArticleView.vue'),
    },
  ],
});

export default router;
