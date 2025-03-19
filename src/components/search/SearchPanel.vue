<!--
  SearchPanel.vue
  -----------------
  This component provides a search panel for filtering and searching news articles.
  It supports toggling visibility, displays search results, and integrates different
  filters for news and sources.

  Props:
    - isOpen (boolean): Controls the visibility of the search panel.

  Emits:
    - select (INewsArticle): Emits an event when a news article is selected.

  Dependencies:
    - Vue Router: Used to check the current route for conditional rendering.
    - Pinia (useNewsStore): Manages the state of news search results.
    - SearchInput: Component for user search input.
    - NewsSearchFilter: Component for filtering news results.
    - SourceSearchFilter: Component for filtering sources.
-->

<script setup lang="ts">
import { useNewsStore } from '@/stores/newsStore';
import router from '@/router';
import SearchInput from '@/components/search/SearchInput.vue';
import NewsSearchFilter from './NewsSearchFilter.vue';
import SourceSearchFilter from './SourceSearchFilter.vue';
import { CON_NEWS_SEARCH_FILTER_OPTIONS } from '@/constants/conFilter';
import type { INewsArticle } from '@/api/types/news/news';

defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ (e: 'select', article: INewsArticle): void }>();
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
      <!-- Conditional rendering based on route -->
      <div v-if="router.currentRoute.value.name !== 'sources'">
        <!-- News Filter -->
        <NewsSearchFilter title="News Filter" :filter-options="CON_NEWS_SEARCH_FILTER_OPTIONS" />

        <!-- Search Input -->
        <SearchInput
          placeholder="Search news articles..."
          :min-chars="2"
          @select="emit('select', $event)"
        />

        <!-- Search Results Stats -->
        <div v-if="newsStore.searchResults.length > 0" class="search-panel-results-stats">
          Found {{ newsStore.searchResults.length }} results
        </div>
      </div>

      <!-- Source Filter when on 'sources' route -->
      <SourceSearchFilter v-else />
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/navigation/search-panel.css';
</style>
