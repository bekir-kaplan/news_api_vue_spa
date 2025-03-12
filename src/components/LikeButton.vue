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
  <button class="btn like-button" @click="toggleLike">
    <HeartSolid v-if="isLiked" class="like-button-icon liked" />
    <HeartOutline v-else class="like-button-icon not-liked" />
  </button>
</template>

<style scoped>
@import '../styles/components/like-button.css';
</style>
