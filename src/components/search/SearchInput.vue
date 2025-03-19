<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNewsStore } from '@/stores/newsStore';
import { useSearch } from '@/composables/useSearch';
import type { INewsArticle } from '@/api/types/news';
import BaseImage from '../BaseImage.vue';

const props = defineProps<{
  placeholder?: string;
  minChars?: number;
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
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder || 'Search...'"
      class="search-input"
      maxlength="500"
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
