<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { useNewsStore } from '../stores/newsStore';
import NewsLayout from '../layouts/NewsLayout.vue';
import RelatedArticles from '../components/RelatedArticles.vue';
import ShareButtons from '../components/ShareButtons.vue';
import LikeButton from '../components/LikeButton.vue';

const newsStore = useNewsStore();
const router = useRouter();
const { selectedArticle } = storeToRefs(newsStore);

const formattedDate = computed(() => {
  if (!selectedArticle.value) {
    return '';
  }
  return new Date(selectedArticle.value.publishedAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const goBack = (): void => {
  router.push('/');
};
</script>

<template>
  <NewsLayout>
    <!-- Main Content -->
    <template #main>
      <button @click="goBack" class="back-button">
        <ArrowLeftIcon class="h-5 w-5 mr-2" />
        Back to News
      </button>

      <article
        v-if="selectedArticle"
        class="bg-white rounded-lg shadow-lg overflow-hidden relative"
      >
        <img
          v-if="selectedArticle.urlToImage"
          :src="selectedArticle.urlToImage"
          :alt="selectedArticle.title"
          class="w-full h-96 object-cover"
        />
        <LikeButton :article="selectedArticle" />

        <div class="p-8">
          <div class="mb-6">
            <h1 class="text-4xl font-bold mb-4">
              {{ selectedArticle.title }}
            </h1>
            <div class="flex items-center justify-between text-gray-600 mb-6">
              <div>
                <p class="font-semibold">By {{ selectedArticle.author || 'Unknown' }}</p>
                <p>{{ formattedDate }}</p>
              </div>
              <ShareButtons :article="selectedArticle" />
            </div>
          </div>

          <div class="prose max-w-none">
            <p class="text-xl mb-6">
              {{ selectedArticle.description }}
            </p>
            <div class="text-lg leading-relaxed">
              {{ selectedArticle.content }}
            </div>
          </div>

          <a
            :href="selectedArticle.url"
            target="_blank"
            rel="noopener noreferrer"
            class="link-read"
          >
            Read Full Article on {{ selectedArticle.source.name }}
          </a>
        </div>
      </article>
    </template>

    <!-- Sidebar Content -->
    <template #sidebar>
      <div class="space-y-6">
        <RelatedArticles />
      </div>
    </template>
  </NewsLayout>
</template>

<style scoped>
.back-button {
  @apply mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center;
}

.link-read {
  @apply inline-block mt-8 px-6 py-3 bg-blue-600 text-white 
  rounded-lg hover:bg-blue-700 transition-colors;
}
</style>
