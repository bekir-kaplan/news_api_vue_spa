<script setup lang="ts">
import { computed, onMounted } from 'vue';
import FormSelectElement from '@/components/form-elements/FormSelectElement.vue';
import { useNewsFilterStore } from '@/stores/newsFilterStore';
import {
  CON_FILTER_GROUPBY_VALUES,
  CON_FILTER_PAGESIZE_VALUES,
  CON_NEWS_CATEGORIES,
} from '@/constants/conNews';
import { CON_COUNTRY_CODES } from '@/constants/conCountryCodes';
import type { INewsReqTopHeadlineQParam } from '@/api/types/requests';
import type { IEventSelectElementChange } from '@/components/form-elements/FormSelectElement.vue';
import type { IFilterOption } from '@/types/news.types';
import { useNewsSourceStore } from '@/stores/newsSourceStore';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  title?: string;
  filterOptions?: IFilterOption[];
}>();

const groupSelectValues = CON_FILTER_GROUPBY_VALUES;
const filterStore = useNewsFilterStore();
const categories = computed(() => CON_NEWS_CATEGORIES);
const pageSizes = CON_FILTER_PAGESIZE_VALUES;
const sourcesStore = useNewsSourceStore();
const { sources } = storeToRefs(sourcesStore);

const updateFilter = (param: IEventSelectElementChange): void => {
  let filterValue = param.value;
  if (filterValue === CON_NEWS_CATEGORIES.all.key) {
    filterValue = '';
  }
  filterStore.setFilter(param.key as keyof INewsReqTopHeadlineQParam, filterValue);
};

onMounted(async () => {
  if (sources.value.length === 0) {
    await sourcesStore.fetch.sources();
  }
});

const checkIfNeeded = (type: IFilterOption): boolean => {
  if (Array.isArray(props.filterOptions)) {
    return props.filterOptions.includes(type);
  }
  return true;
};
</script>

<template>
  <div class="filter-container">
    <div class="filter-title">
      <h3>{{ title || 'Filter' }}</h3>
    </div>
    <div class="filter-section">
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
        v-if="checkIfNeeded('category')"
        name="category"
        label="Category"
        default-value="all"
        :options="Object.values(categories)"
        @update:value="updateFilter"
      />

      <FormSelectElement
        v-if="checkIfNeeded('sources')"
        name="sources"
        label="Sources"
        default-value="all"
        :map="{ key: 'id', value: 'name' }"
        :options="sources"
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

      <FormSelectElement
        v-if="checkIfNeeded('groupBy')"
        name="groupBy"
        label="GroupBy"
        :options="groupSelectValues"
        default-value="category"
        @update:value="updateFilter"
      />
    </div>
  </div>
</template>
