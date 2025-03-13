import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const ArticleView = (): Promise<unknown> => import('@/views/ArticleView.vue');
const LikedNewsView = (): Promise<unknown> => import('@/views/LikedNewsView.vue');
const CategoryView = (): Promise<unknown> => import('@/views/CategoryView.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ArticleView,
    },
    {
      path: '/liked',
      name: 'liked',
      component: LikedNewsView,
    },
    {
      path: '/category/:category',
      name: 'category',
      component: CategoryView,
    },
  ],
});

export default router;
