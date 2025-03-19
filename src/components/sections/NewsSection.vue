<!--
  NewsSection.vue
  --------------------
  This component defines a reusable section layout for displaying categorized news articles.
  It provides a title, a "View All" link to the corresponding category page, and a slot for content.

  Props:
    - title (string): The title of the news section.
    - category (string): The category of news articles, used for routing to category pages.

  Dependencies:
    - Heroicons:
      - ArrowRightIcon: Used as an icon for the "View All" link.
    - Vue Router:
      - <router-link>: Handles navigation to the category page.

  Slots:
    - Default slot: Allows inserting news articles or other related content.

  TODO:
    - Move this component to a layout-specific directory for better structure.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`news-section.css`) for styling.
-->
<script setup lang="ts">
import { ArrowRightIcon } from '@heroicons/vue/24/outline';

defineProps<{
  title: string;
  category: string;
}>();
</script>

<template>
  <section class="news-section">
    <div class="news-section-header">
      <!-- Section title -->
      <h2 class="news-section-title">{{ title }}</h2>

      <!-- "View All" link navigates to the category page -->
      <router-link :to="`/category/${category.toLowerCase()}`" class="news-section-link">
        View All
        <ArrowRightIcon class="news-section-icon" />
      </router-link>
    </div>
    <div class="grid-template">
      <slot />
    </div>
  </section>
</template>

<style scoped>
@import '@/styles/components/sections/news-section.css';
</style>
