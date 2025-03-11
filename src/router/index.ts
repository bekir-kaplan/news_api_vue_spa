import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ArticleView from '../views/ArticleView.vue';
import LikedNewsView from '../views/LikedNewsView.vue';
import CategoryView from '../views/CategoryView.vue';

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
