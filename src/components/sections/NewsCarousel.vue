<!--
  NewsCarousel.vue
  --------------------
  This component provides a dynamic news carousel that allows users to browse through 
  news articles. It supports autoplay functionality, navigation controls, and interactive 
  article selection.

  Props:
    - articles (INewsArticle[]): An array of news articles to be displayed in the carousel.
    - autoplay (boolean, optional): Enables automatic sliding between articles.
    - interval (number, optional): The duration (in milliseconds) for each slide in autoplay mode.

  Dependencies:
    - Vue Refs:
      - currentSlide (number): Stores the index of the currently visible slide.
      - carouselRef (HTMLElement | null): Stores a reference to the carousel element.
    - Vue Lifecycle Hooks:
      - onMounted: Initializes autoplay and event listeners.
      - onUnmounted: Cleans up autoplay and event listeners.
    - Heroicons:
      - ChevronLeftIcon & ChevronRightIcon: Used for navigation controls.
    - Vue Router:
      - useRouter: Handles navigation to article details.
    - Pinia Store:
      - useNewsStore: Stores the selected article for navigation.
    - BaseImage Component:
      - Renders article images with proper styling.

  Methods:
    - viewArticle(article: INewsArticle): Navigates to the article details page.
    - nextSlide(): Moves to the next slide or loops back to the first slide.
    - prevSlide(): Moves to the previous slide or loops to the last slide.
    - goToSlide(index: number): Moves to a specific slide based on the index.
    - startAutoplay(): Starts the automatic slideshow if autoplay is enabled.
    - stopAutoplay(): Stops the autoplay functionality.
    - handleMouseOver(): Stops autoplay when the user hovers over the carousel.
    - handleMouseOut(): Resumes autoplay when the user moves the mouse away.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`news-carousel.css`) for styling.
-->

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

/**
 * Navigates to the article details page by storing the selected article
 * in the Pinia store and updating the route.
 * @param article - The article to be viewed
 */
const viewArticle = (article: INewsArticle): void => {
  newsStore.setSelectedArticle(article);
  router.push(`/article/${encodeURIComponent(article.title)}`);
};

/**
 * Moves to the next slide in the carousel. If the last slide is reached,
 * it loops back to the first slide.
 */
const nextSlide = (): void => {
  if (currentSlide.value < props.articles?.length - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0;
  }
};

/**
 * Moves to the previous slide in the carousel. If the first slide is reached,
 * it loops back to the last slide.
 */
const prevSlide = (): void => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = props.articles?.length - 1;
  }
};

/**
 * Jumps to a specific slide in the carousel.
 * @param index - The index of the slide to navigate to
 */
const goToSlide = (index: number): void => {
  currentSlide.value = index;
};

/**
 * Starts the automatic slideshow if autoplay is enabled.
 */
const startAutoplay = (): void => {
  if (props.autoplay && !autoplayInterval) {
    autoplayInterval = window.setInterval(() => {
      nextSlide();
    }, props.interval || 5000);
  }
};

/**
 * Stops the automatic slideshow.
 */
const stopAutoplay = (): void => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

/**
 * Stops autoplay when the user hovers over the carousel.
 */
const handleMouseOver = (): void => {
  stopAutoplay();
};

/**
 * Resumes autoplay when the user moves the mouse away from the carousel.
 */
const handleMouseOut = (): void => {
  startAutoplay();
};

// Initializes
onMounted(() => {
  startAutoplay();

  if (carouselRef.value) {
    carouselRef.value.addEventListener('mouseenter', handleMouseOver);
    carouselRef.value.addEventListener('mouseleave', handleMouseOut);
  }
});

// Cleanup
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

    <!-- Navigation Controls -->
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
