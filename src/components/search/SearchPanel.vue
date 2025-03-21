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
import {
  CON_NEWS_SEARCH_TOP_HEADLINES_FILTER_OPTIONS,
  CON_NEWS_SEARCH_EVERYTHING_FILTER_OPTIONS,
  CON_NEWS_SEARCH_ENDPOINTS,
} from '@/constants/conFilter';
import type { INewsArticle } from '@/api/types/news/news';
import { computed, ref } from 'vue';
import EndpointSelection from './EndpointSelection.vue';
import { watch } from 'vue';

defineProps<{ isOpen: boolean }>();
const emit = defineEmits<{ (e: 'select', article: INewsArticle): void }>();
const newsStore = useNewsStore();
const searchRef = ref('everything');

watch(
  () => searchRef.value,
  (newVal) => {
    newsStore.setEndpointRef(newVal);
  }
);
const currentRouteName = computed(() => {
  return router.currentRoute.value.name;
});
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
      <div v-if="currentRouteName !== 'sources'">
        <EndpointSelection v-model="searchRef" />
        <!-- News Filter -->
        <NewsSearchFilter
          :title="`${
            searchRef === CON_NEWS_SEARCH_ENDPOINTS.TOP_HEADLINES.key
              ? CON_NEWS_SEARCH_ENDPOINTS.TOP_HEADLINES.value
              : CON_NEWS_SEARCH_ENDPOINTS.EVERYTHING.value
          } News Filter`"
          :filter-options="
            searchRef === CON_NEWS_SEARCH_ENDPOINTS.TOP_HEADLINES.key
              ? CON_NEWS_SEARCH_TOP_HEADLINES_FILTER_OPTIONS
              : CON_NEWS_SEARCH_EVERYTHING_FILTER_OPTIONS
          "
        />

        <!-- Search Input -->
        <SearchInput
          label="Query"
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
