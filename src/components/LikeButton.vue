<script setup lang="ts">
import { computed } from 'vue';
import { HeartIcon as HeartOutline } from '@heroicons/vue/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/vue/24/solid';
import type { Article } from '../api/types/mappedTypes';
import { useLikedNewsStore } from '../stores/likedNewsStore';

const props = defineProps<{
  article: Article;
}>();

const likedNewsStore = useLikedNewsStore();

const isLiked = computed(() => likedNewsStore.isLiked(props.article));

const toggleLike = (event: Event): void => {
  event.stopPropagation();
  likedNewsStore.toggleLike(props.article);
};
</script>

<template>
  <button
    class="top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
    @click="toggleLike"
  >
    <HeartSolid v-if="isLiked" class="h-5 w-5 text-red-500" />
    <HeartOutline v-else class="h-5 w-5 text-gray-600" />
  </button>
</template>
