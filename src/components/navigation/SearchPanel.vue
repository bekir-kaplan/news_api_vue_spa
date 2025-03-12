<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useNewsStore } from '../../stores/newsStore';
import SearchInput from '../SearchInput.vue';
import type { Article } from '../../api/types/mappedTypes';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'select', article: Article): void;
}>();

const newsStore = useNewsStore();
const { categories } = storeToRefs(newsStore);
const selectedCategory = ref('all');

const handleCategoryChange = (category: string): void => {
  selectedCategory.value = category;
  newsStore.setCategory(category);
};
</script>

<template>
  <div
    class="search-panel-container"
    :class="{
      'max-h-0 opacity-0': !isOpen,
      'max-h-[calc(100vh-4rem)] opacity-100': isOpen,
    }"
  >
    <div class="search-panel-inner">
      <!-- Search Categories -->
      <div class="search-panel-categories">
        <div class="search-panel-categories-list">
          <button
            v-for="category in categories"
            :key="category"
            class="search-panel-category-button"
            :class="
              selectedCategory === category
                ? 'search-panel-category-button-active'
                : 'search-panel-category-button-inactive'
            "
            @click="handleCategoryChange(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- Search Input -->
      <SearchInput
        placeholder="Search news articles..."
        :min-chars="2"
        @select="emit('select', $event)"
      />

      <!-- Search Results Stats -->
      <div v-if="newsStore.searchResults.length > 0" class="search-panel-results-stats">
        Found {{ newsStore.searchResults.length }} results
        {{ selectedCategory !== 'all' ? `in ${selectedCategory}` : '' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '../../styles/components/navigation/search-panel.css';
</style>
