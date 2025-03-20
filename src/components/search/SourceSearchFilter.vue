<!--
  SourceSearchFilter.vue
  -----------------
  This component provides filtering options for news sources.
  It manages state with Pinia, watches query parameters, and updates the news source store.

  Dependencies:
    - Pinia (useNewsSourceStore, useNewsFilterStore): Manages state for news sources and filters.
    - Computed Properties: Generates query parameters dynamically based on selected filters.
    - Lifecycle Hooks: Uses onMounted to fetch news sources on component mount.
    - NewsSearchFilter Component: Renders the filter UI.
-->

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useNewsSourceStore } from '@/stores/newsSourceStore';
import { useNewsFilterStore } from '@/stores/newsFilterStore';
import { CON_NEWS_SOURCE_FILTER_OPTIONS } from '@/constants/conFilter';
import NewsSearchFilter from '@/components/search/NewsSearchFilter.vue';

const newsSourceStore = useNewsSourceStore();
const filterStore = useNewsFilterStore();
const { newsFilters } = storeToRefs(filterStore);

const queryParams = computed(() => {
  return {
    category: newsFilters.value.category,
    language: newsFilters.value.language,
    country: newsFilters.value.country,
  };
});

watch(queryParams, (newParams) => {
  newsSourceStore.setQueryParams(newParams);
});

onMounted(() => {
  newsSourceStore.fetch.sources();
});
</script>

<!-- TODO: parametrik olarak zaten aliniyor neden ayri bir component olusturdun ??? duzenle -->
<template>
  <div class="filter-container">
    <div class="filter-section">
      <NewsSearchFilter title="Source Filter" :filter-options="CON_NEWS_SOURCE_FILTER_OPTIONS" />
    </div>
  </div>
</template>
