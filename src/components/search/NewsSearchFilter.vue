<script setup lang="ts">
import { computed } from 'vue';
import FormSelectElement from '@/components/form-elements/FormSelectElement.vue';
import { useNewsFilterStore } from '@/stores/newsFilterStore';
import { CON_NEWS_CATEGORIES } from '@/constants/conNews';
import { CON_COUNTRY_CODES } from '@/constants/conCountryCodes';
import type { INewsReqTopHeadlineQParam } from '@/api/types/requests';
import type { IEventSelectElementChange } from '@/components/form-elements/FormSelectElement.vue';
import type { IFilterOption } from '@/types/news.types';

const props = defineProps<{
  filterOptions?: IFilterOption[];
}>();

const filterStore = useNewsFilterStore();
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
  filterStore.setFilter(param.key as keyof INewsReqTopHeadlineQParam, filterValue);
}

const checkIfNeeded = (type: IFilterOption): boolean => {
  if (Array.isArray(props.filterOptions)) {
    return props.filterOptions.includes(type);
  }
  return true;
};
</script>

<template>
  <div class="filter-container">
    <FormSelectElement
      v-if="checkIfNeeded('category')"
      name="category"
      label="Category"
      default-value="all"
      :options="Object.values(categories)"
      @update:value="updateFilter"
    />

    <FormSelectElement
      v-if="checkIfNeeded('country')"
      name="country"
      label="Country"
      default-value="all"
      :map="{ key: 'key', value: 'text' }"
      :options="Object.values(CON_COUNTRY_CODES)"
      @update:value="updateFilter"
    />

    <FormSelectElement
      v-if="checkIfNeeded('pageSize')"
      name="pageSize"
      label="Page Size"
      default-value="all"
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
