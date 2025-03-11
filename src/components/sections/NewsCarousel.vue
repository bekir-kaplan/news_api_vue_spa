<template>
  <div class="carousel-container">
    <div class="carousel-wrapper" ref="carouselRef">
      <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div v-for="article in articles" :key="article.url" class="carousel-slide">
          <img
            v-if="article.urlToImage"
            :src="article.urlToImage"
            :alt="article.title"
            class="carousel-image"
          />
          <div class="carousel-content">
            <h3 class="carousel-title">
              {{ article.title }}
            </h3>
            <p class="carousel-description">
              {{ article.description }}
            </p>
            <button @click="() => viewArticle(article)" class="carousel-link">Read More</button>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel-controls">
      <button @click="prevSlide" class="control-button" :disabled="currentSlide === 0">
        <ChevronLeftIcon class="h-6 w-6" />
      </button>
      <div class="carousel-indicators">
        <button
          v-for="(_, index) in articles"
          :key="index"
          @click="goToSlide(index)"
          class="indicator-dot"
          :class="{ 'indicator-active': currentSlide === index }"
        />
      </div>
      <button
        @click="nextSlide"
        class="control-button"
        :disabled="currentSlide === articles.length - 1"
      >
        <ChevronRightIcon class="h-6 w-6" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';
import { useNewsStore } from '../../stores/newsStore';
import { useRouter } from 'vue-router';
import type { Article } from '../../api/types/mappedTypes';

const props = defineProps<{
  articles: Article[];
  autoplay?: boolean;
  interval?: number;
}>();

const router = useRouter();
const newsStore = useNewsStore();
const currentSlide = ref(0);
const carouselRef = ref<HTMLElement | null>(null);
let autoplayInterval: number | null = null;

const viewArticle = (article: Article): void => {
  newsStore.setSelectedArticle(article);
  router.push(`/article/${encodeURIComponent(article.title)}`);
};

const nextSlide = (): void => {
  if (currentSlide.value < props.articles.length - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0;
  }
};

const prevSlide = (): void => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = props.articles.length - 1;
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

<style scoped>
.carousel-container {
  @apply relative w-full overflow-hidden rounded-lg shadow-lg bg-white;
}

.carousel-wrapper {
  @apply relative w-full overflow-hidden;
}

.carousel-track {
  @apply flex transition-transform duration-300 ease-in-out;
}

.carousel-slide {
  @apply w-full flex-shrink-0 relative;
}

.carousel-image {
  @apply w-full h-[400px] object-cover;
}

.carousel-content {
  @apply absolute bottom-0 left-0 right-0 p-6 pb-24 bg-gradient-to-t 
  from-black/80 to-transparent text-white;
}

.carousel-title {
  @apply text-2xl font-bold mb-2;
}

.carousel-description {
  @apply text-sm line-clamp-2;
}

.carousel-link {
  @apply inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded 
  hover:bg-blue-700 transition-colors;
}

.carousel-controls {
  @apply absolute left-0 right-0 bottom-4 flex mx-4 items-center justify-between gap-4;
}

.control-button {
  @apply p-2 rounded-full bg-white/80 text-gray-800 hover:bg-white disabled:opacity-50 
  disabled:cursor-not-allowed transition-colors;
}

.carousel-indicators {
  @apply flex gap-2;
}

.indicator-dot {
  @apply w-2 h-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors;
}

.indicator-active {
  @apply bg-white;
}
</style>
