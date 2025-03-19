<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { useNewsStore } from '@/stores/newsStore';
import { useRouter } from 'vue-router';
import BaseImage from '../BaseImage.vue';
import type { INewsArticle } from '@/api/types/news/news';

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

const handleMouseOver = (): void => {
  stopAutoplay();
};

const handleMouseOut = (): void => {
  startAutoplay();
};

onMounted(() => {
  startAutoplay();

  if (carouselRef.value) {
    carouselRef.value.addEventListener('mouseenter', handleMouseOver);
    carouselRef.value.addEventListener('mouseleave', handleMouseOut);
  }
});

onUnmounted(() => {
  stopAutoplay();

  if (carouselRef.value) {
    carouselRef.value.removeEventListener('mouseenter', handleMouseOver);
    carouselRef.value.removeEventListener('mouseleave', handleMouseOut);
  }
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
          <BaseImage
            :src="article.urlToImage || ''"
            :alt="article.title"
            class-name="w-full h-[500px] object-cover"
          />
          <div class="news-carousel-content">
            <button @click="() => viewArticle(article)" class="news-carousel-link">
              Read More
            </button>
            <h4 class="news-carousel-title short-text">
              {{ article.title }}
            </h4>
            <p class="news-carousel-description short-text">
              {{ article.description }}
            </p>
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
