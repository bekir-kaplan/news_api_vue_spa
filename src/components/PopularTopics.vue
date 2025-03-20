<!--
  PopularTopics.vue
  --------------------
  This component displays a list of popular news categories as navigable links.
  It filters out the "all" category and provides direct links to individual category pages.

  Dependencies:
    - Constants:
      - CON_NEWS_CATEGORIES: A predefined object containing available news categories.
    - Vue Router:
      - <router-link>: Handles navigation to category-specific news pages.

  Computed Data:
    - filteredCategories: Extracts and filters out the "all" category from CON_NEWS_CATEGORIES.

  Behavior:
    - Each category is displayed as a clickable badge.
    - Clicking a badge navigates to the corresponding category page.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`popular-topics.css`) for styling.
-->
<script setup lang="ts">
import { CON_NEWS_CATEGORIES } from '@/constants/conNews';
</script>

<template>
  <div class="popular-topics-container">
    <h2 class="popular-topics-title">Popular Topics</h2>
    <div class="popular-topics-list">
      <router-link
        v-for="category in CON_NEWS_CATEGORIES"
        :key="category.key"
        :to="`/category/${category.key}`"
        class="badge-link"
      >
        {{ category.value }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/popular-topics.css';
</style>
