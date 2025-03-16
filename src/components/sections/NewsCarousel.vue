<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { useNewsStore } from '@/stores/newsStore';
import { useRouter } from 'vue-router';
import type { INewsArticle } from '@/api/types/news';

const props = defineProps<{
  articles: INewsArticle[];
  autoplay?: boolean;
  interval?: number;
}>();

const router = useRouter();
const newsStore = useNewsStore();
const currentSlide = ref(0);
const carouselRef = ref<HTMLElement | null>(null);
let autoplayInterval: number | null = null;

const viewArticle = (article: INewsArticle): void => {
  newsStore.setSelectedArticle(article);
  router.push(`/article/${encodeURIComponent(article.title)}`);
};

const nextSlide = (): void => {
  if (currentSlide.value < props.articles?.length - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0;
  }
};

const prevSlide = (): void => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = props.articles?.length - 1;
  }
};

const goToSlide = (index: number): void => {
  currentSlide.value = index;
};

const startAutoplay = (): void => {
  if (props.autoplay && !autoplayInterval) {
    autoplayInterval = window.setInterval(() => {
      nextSlide();
    }, props.interval || 5000);
  }
};

const stopAutoplay = (): void => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

onMounted(() => {
  startAutoplay();
});

onUnmounted(() => {
  stopAutoplay();
});
</script>

<template>
  <div class="news-carousel-container">
    <div class="news-carousel-wrapper" ref="carouselRef">
      <div
        class="news-carousel-track"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div v-for="article in articles" :key="article.url" class="news-carousel-slide">
          <img
            v-if="article.urlToImage"
            :src="article.urlToImage"
            :alt="article.title"
            class="news-carousel-image"
          />
          <div class="news-carousel-content">
            <h3 class="news-carousel-title">
              {{ article.title }}
            </h3>
            <p class="news-carousel-description">
              {{ article.description }}
            </p>
            <button @click="() => viewArticle(article)" class="news-carousel-link">
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="news-carousel-controls">
      <button
        @click="prevSlide"
        class="news-carousel-control-button"
        :disabled="currentSlide === 0"
      >
        <ChevronLeftIcon class="news-carousel-icon" />
      </button>
      <div class="news-carousel-indicators">
        <button
          v-for="(_, index) in articles"
          :key="index"
          @click="goToSlide(index)"
          class="news-carousel-indicator-dot"
          :class="{ 'news-carousel-indicator-active': currentSlide === index }"
        />
      </div>
      <button
        @click="nextSlide"
        class="news-carousel-control-button"
        :disabled="currentSlide === articles?.length - 1"
      >
        <ChevronRightIcon class="news-carousel-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/sections/news-carousel.css';
</style>
