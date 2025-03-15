<script setup lang="ts">
import { useNewsFilter } from '@/stores/newsFilter';
import type { TopHeadlinesParams } from '@/api/types/requests';
import { CON_NEWS_CATEGORIES } from '@/constants/conNews';
import { computed } from 'vue';
import type { IEventSelectElementChange } from '@/components/form-elements/FormSelectElement.vue';
import FormSelectElement from '@/components/form-elements/FormSelectElement.vue';
import { CON_COUNTRY_CODES } from '@/constants/conCountryCodes';

const filterStore = useNewsFilter();
const categories = computed(() => CON_NEWS_CATEGORIES);
const pageSizes = [
  { key: 'all', value: 'All' },
  { key: 5, value: 5 },
  { key: 10, value: 10 },
  { key: 15, value: 15 },
];

function updateFilter(param: IEventSelectElementChange): void {
  let filterValue = param.value;
  if (filterValue === CON_NEWS_CATEGORIES.all.key) {
    filterValue = '';
  }
  filterStore.setFilter(param.key as keyof TopHeadlinesParams, filterValue);
}
</script>

<template>
  <div class="filter-container">
    <FormSelectElement
      name="category"
      label="Category"
      selected="all"
      :options="Object.values(categories)"
      @update:value="updateFilter"
    />

    <FormSelectElement
      name="country"
      label="Country"
      selected="all"
      :map="{ key: 'key', value: 'text' }"
      :options="Object.values(CON_COUNTRY_CODES)"
      @update:value="updateFilter"
    />

    <FormSelectElement
      name="pageSize"
      label="Page Size"
      selected="all"
      :options="pageSizes"
      @update:value="updateFilter"
    />
  </div>
</template>

<style scoped>
@import '@/styles/form-elements/select-element.css';
.filter-container {
  @apply flex flex-wrap gap-2 mb-2;
}
</style>
