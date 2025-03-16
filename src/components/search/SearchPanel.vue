<script setup lang="ts">
import { useNewsStore } from '@/stores/newsStore';
import SearchInput from '@/components/search/SearchInput.vue';
import type { INewsArticle } from '@/api/types/news';
import NewsSearchFilter from './NewsSearchFilter.vue';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'select', article: INewsArticle): void;
}>();

const newsStore = useNewsStore();
</script>

<template>
  <div
    class="search-panel-container"
    :class="{
      'max-h-0 opacity-0': !isOpen,
      'max-h-[calc(100vh-4rem)] opacity-100': isOpen,
    }"
  >
    <div v-if="isOpen" class="search-panel-inner">
      <NewsSearchFilter />
      <!-- Search Input -->
      <SearchInput
        placeholder="Search news articles..."
        :min-chars="2"
        @select="emit('select', $event)"
      />

      <!-- Search Results Stats -->
      <div v-if="newsStore.searchResults.length > 0" class="search-panel-results-stats">
        Found {{ newsStore.searchResults.length }} results
        <!-- {{ selectedCategory !== 'all' ? `in ${selectedCategory}` : '' }} -->
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/navigation/search-panel.css';
</style>
