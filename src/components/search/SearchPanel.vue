<script setup lang="ts">
import { useNewsStore } from '@/stores/newsStore';
import router from '@/router';
import SearchInput from '@/components/search/SearchInput.vue';
import NewsSearchFilter from './NewsSearchFilter.vue';
import SourceSearchFilter from './SourceSearchFilter.vue';
import type { INewsArticle } from '@/api/types/news';

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
    <div v-show="isOpen" class="search-panel-inner">
      <div v-if="router.currentRoute.value.name !== 'sources'">
        <NewsSearchFilter
          title="News Filter"
          :filter-options="['category', 'country', 'pageSize']"
        />
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

      <SourceSearchFilter v-else />
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/navigation/search-panel.css';
</style>
