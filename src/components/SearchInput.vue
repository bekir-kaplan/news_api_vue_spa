<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';
import { useSearch } from '@/composables/useSearch';
import type { NewsAPIArticle } from '@/api/types/news';

const props = defineProps<{
  placeholder?: string;
  minChars?: number;
}>();

const emit = defineEmits<{
  (e: 'select', article: NewsAPIArticle): void;
}>();

const newsStore = useNewsStore();
const { loading, searchResults } = storeToRefs(newsStore);
const { searchQuery, showResults, handleSelect, handleBlur } = useSearch(props.minChars);

const onSelect = (article: NewsAPIArticle): void => {
  handleSelect();
  emit('select', article);
};
</script>

<template>
  <div class="relative w-full">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder || 'Search...'"
      class="search-input"
      maxlength="500"
      @blur="handleBlur"
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
            <img
              v-if="article.urlToImage"
              :src="article.urlToImage"
              :alt="article.title"
              class="search-result-item-image"
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
