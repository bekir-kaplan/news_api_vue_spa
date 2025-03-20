<!--
  SearchInput.vue
  -----------------
  This component provides a search input field with autocomplete functionality.
  It integrates with Pinia for state management, supports search queries,
  and displays search results dynamically.

  Props:
    - placeholder (string, optional): Placeholder text for the input field.
    - minChars (number, optional): Minimum characters required to trigger a search.

  Emits:
    - select (INewsArticle): Emits an event when a news article is selected from the results.

  Dependencies:
    - Pinia (useNewsStore): Manages search state and results.
    - useSearch composable: Handles search-related logic.
    - BaseImage component: Displays images for search results.
-->

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';
import { useSearch } from '@/composables/useSearch';
import BaseImage from '../BaseImage.vue';
import API_CONFIG from '@/api/config/index';
import type { INewsArticle } from '@/api/types/news/news';

const props = defineProps<{
  placeholder?: string;
  minChars?: number;
  label?: string;
}>();

const emit = defineEmits<{
  (e: 'select', article: INewsArticle): void;
}>();

const newsStore = useNewsStore();
const { loading, searchResults } = storeToRefs(newsStore);
const { searchQuery, showResults, handleSelect, handleBlur, handleFocus } = useSearch(
  props.minChars
);

const onSelect = (article: INewsArticle): void => {
  handleSelect();
  emit('select', article);
};
</script>

<template>
  <div class="relative w-full">
    <label v-if="label" for="query-input">{{ label }}</label>
    <input
      id="query-input"
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder || 'Search...'"
      class="search-input"
      :maxlength="API_CONFIG.CONFIG_NEWS.REQUEST_DEFAULTS.MAX_SEARCH_INPUT_CHARACTER"
      @blur="handleBlur"
      @focus="handleFocus"
    />

    <div v-if="loading" class="search-input-spinner-container">
      <div class="search-input-spinner" />
    </div>

    <div v-if="showResults && searchResults.length > 0" class="search-results">
      <ul class="py-1">
        <li
          v-for="article in searchResults"
          :key="article.url"
          class="search-result-item"
          @mousedown="onSelect(article)"
        >
          <div class="search-result-item-content">
            <BaseImage
              :src="article.urlToImage || ''"
              :alt="article.title"
              class-name="w-12 h-12 object-cover rounded"
            />
            <div class="search-result-item-text">
              <p class="search-result-item-title">{{ article.title }}</p>
              <p class="search-result-item-source">{{ article.source.name }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/search-input.css';
</style>
