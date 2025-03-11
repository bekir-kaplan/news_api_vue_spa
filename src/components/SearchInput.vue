<script setup lang="ts">
import { storeToRefs } from 'pinia';
import type { Article } from '../api/types/mappedTypes';
import { useNewsStore } from '../stores/newsStore';
import { useSearch } from '../composables/useSearch';

const props = defineProps<{
  placeholder?: string;
  minChars?: number;
}>();

const emit = defineEmits<{
  (e: 'select', article: Article): void;
}>();

const newsStore = useNewsStore();
const { loading, searchResults } = storeToRefs(newsStore);
const { searchQuery, showResults, handleSelect, handleBlur } = useSearch(props.minChars);

const onSelect = (article: Article): void => {
  handleSelect(article);
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
      @blur="handleBlur"
    />

    <div v-if="loading" class="absolute right-3 top-2.5">
      <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500" />
    </div>

    <div v-if="showResults && searchResults.length > 0" class="search-results">
      <ul class="py-1">
        <li
          v-for="article in searchResults"
          :key="article.url"
          class="search-result-item"
          @mousedown="onSelect(article)"
        >
          <div class="flex items-start gap-2">
            <img
              v-if="article.urlToImage"
              :src="article.urlToImage"
              :alt="article.title"
              class="w-12 h-12 object-cover rounded"
            />
            <div class="flex-1">
              <p class="font-medium line-clamp-2">{{ article.title }}</p>
              <p class="text-sm text-gray-500">{{ article.source.name }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.search-input {
  @apply w-full p-2 border rounded-lg focus:ring-2 
  focus:ring-blue-300 focus:border-blue-500 outline-none;
}

.search-results {
  @apply relative z-50 w-full mt-1 bg-white border 
  rounded-lg shadow-lg max-h-96 overflow-y-auto;
}

.search-result-item {
  @apply px-4 py-2 hover:bg-gray-100 cursor-pointer;
}
</style>
