<script setup lang="ts">
import GoBackButton from '@/components/GoBackButton.vue';
import SourcesLayout from '@/layouts/SourcesLayout.vue';
import { computed, onMounted, watch } from 'vue';
import { useNewsSourceStore } from '@/stores/newsSourceStore';
import { storeToRefs } from 'pinia';
import NewsSearchFilter from '@/components/search/NewsSearchFilter.vue';
import { useNewsFilterStore } from '@/stores/newsFilterStore';

const newsSourceStore = useNewsSourceStore();
const searchFilter = useNewsFilterStore();
const { newsFilters } = storeToRefs(searchFilter);
const { groupedSources, groupParam } = storeToRefs(newsSourceStore);

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
  <SourcesLayout>
    <template #filterBar>
      <NewsSearchFilter :filter-options="['category', 'country']" />
    </template>
    <template #main>
      <GoBackButton />
      <h1>News Sources</h1>
    </template>
    <template #sidebar>
      <div>
        <label for="sort">Group by:</label>
        <select v-model="groupParam">
          <option value="category">Category</option>
          <option value="country">Country</option>
          <option value="language">Language</option>
        </select>
      </div>
      <ul>
        <li v-for="(group, letter) in groupedSources" :key="letter">
          <h2>{{ letter }}</h2>
          <ul>
            <li v-for="source in group" :key="source.id">{{ source.name }}</li>
          </ul>
        </li>
      </ul>
    </template>
  </SourcesLayout>
  <div />
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
