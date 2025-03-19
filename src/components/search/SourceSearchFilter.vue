<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useNewsSourceStore } from '@/stores/newsSourceStore';
import { storeToRefs } from 'pinia';
import NewsSearchFilter from '@/components/search/NewsSearchFilter.vue';
import { useNewsFilterStore } from '@/stores/newsFilterStore';
import { CON_NEWS_SOURCE_FILTER_OPTIONS } from '@/constants/conFilter';

const newsSourceStore = useNewsSourceStore();
const filterStore = useNewsFilterStore();
const { newsFilters } = storeToRefs(filterStore);

const queryParams = computed(() => {
  return {
    category: newsFilters.value.category,
    language: '',
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

<template>
  <div class="filter-container">
    <div class="filter-section">
      <NewsSearchFilter title="Source Filter" :filter-options="CON_NEWS_SOURCE_FILTER_OPTIONS" />
    </div>
  </div>
</template>
