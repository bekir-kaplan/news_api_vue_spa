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
    <div class="container mx-auto p-4">
      <!-- Search Categories -->
      <div class="mb-4 border-b pb-3">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="category in categories"
            :key="category"
            class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
            :class="
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
      <div v-if="newsStore.searchResults.length > 0" class="mt-3 text-sm text-gray-600">
        Found {{ newsStore.searchResults.length }} results
        {{ selectedCategory !== 'all' ? `in ${selectedCategory}` : '' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-panel-container {
  @apply absolute left-0 right-0 bg-white z-50 shadow-lg 
  transition-all duration-300 ease-in-out overflow-hidden;
}
.search-panel-enter-active,
.search-panel-leave-active {
  transition: all 0.3s ease-in-out;
}

.search-panel-enter-from,
.search-panel-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
