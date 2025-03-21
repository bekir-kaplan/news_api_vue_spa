<!--
  NewsSearchFilter.vue
  --------------------
  This component provides a dynamic filtering interface for news articles.
  Users can filter news by country, category, sources, page size, and grouping options.
  It integrates with Pinia for state management and updates filters dynamically.

  Props:
    - title (string, optional): The title of the filter section.
    - filterOptions (IFilterOption[], optional): A list of available filter options.

  Dependencies:
    - Pinia (useNewsFilterStore, useNewsSourceStore): Manages filter states and news sources.
    - FormSelectElement: A reusable form select component.
    - Computed Properties: Dynamically generates available filter options.
    - Constants: Uses predefined news categories, country codes, and other filter values.

  Methods:
    - updateFilter: Updates the store with selected filter values.
    - checkIfNeeded: Determines whether a filter option should be displayed.
-->

<script setup lang="ts">
import { computed } from 'vue';
import FormSelectElement from '@/components/form-elements/FormSelectElement.vue';
import { useNewsFilterStore } from '@/stores/newsFilterStore';
import { useNewsSourceStore } from '@/stores/newsSourceStore';
import { storeToRefs } from 'pinia';
import type { IFilterOption } from '@/types/news.types';
import type { INewsReqTopHeadlineQParam } from '@/api/types/news/newsRequests';
import {
  CON_FILTER_GROUPBY_VALUES,
  CON_FILTER_PAGESIZE_VALUES,
  CON_FILTER_SEARCHIN_VALUES,
  CON_FILTER_SORTBY_VALUES,
  CON_NEWS_CATEGORIES,
} from '@/constants/conNews';
import { CON_COUNTRY_CODES } from '@/constants/conCountryCodes';
import { CON_LANGUAGE_MAPPING, CON_SELECT_ELEMENT_DEFAULT_VALUE_ALL } from '@/constants/conFilter';
import FormMultiSelect from '../form-elements/FormMultiSelect.vue';
import type {
  IEventSelectElementChange,
  TCountryCodes,
  TLanguageCodes,
} from '@/types/uiForm.types';

const props = defineProps<{
  title?: string;
  filterOptions?: IFilterOption[];
  autoFilter?: boolean;
}>();

const groupSelectValues = CON_FILTER_GROUPBY_VALUES;
const filterStore = useNewsFilterStore();
const sourcesStore = useNewsSourceStore();
const categories = computed(() => CON_NEWS_CATEGORIES);
const searchIn = computed(() => CON_FILTER_SEARCHIN_VALUES);
const sortBy = computed(() => CON_FILTER_SORTBY_VALUES);
const pageSizes = CON_FILTER_PAGESIZE_VALUES;
const { sources } = storeToRefs(sourcesStore);

const updateFilter = (param: IEventSelectElementChange): void => {
  let filterValue = param.value;
  if (filterValue === CON_SELECT_ELEMENT_DEFAULT_VALUE_ALL) {
    filterValue = '';
  }
  filterStore.setFilter(param.key as keyof INewsReqTopHeadlineQParam, filterValue);
};

const newSetLanguages = sources.value.reduce((acc, source) => {
  if (source.language) {
    acc.add(source.language);
  }
  return acc;
}, new Set());

const newSetCountries = sources.value.reduce((acc, source) => {
  if (CON_COUNTRY_CODES[source.country]) {
    acc.add(source.country);
  }
  return acc;
}, new Set());

const newSetDomainNames = sources.value.reduce((acc, source) => {
  if (source.url) {
    acc.add(new URL(source.url).hostname);
  }
  return acc;
}, new Set());

const newArrLanguages = Array.from(newSetLanguages);
const newArrCountries = Array.from(newSetCountries);
const newArrDomainNames = Array.from(newSetDomainNames);

const sourcesWithLanguage = newArrLanguages.map((lang) => ({
  key: lang as TLanguageCodes,
  value: CON_LANGUAGE_MAPPING[lang as TLanguageCodes],
}));

const sourcesWithCountries = newArrCountries.map((country) => ({
  key: country as TCountryCodes,
  value: CON_COUNTRY_CODES[country as TCountryCodes]?.text,
}));

const sourcesWithDomainNames = newArrDomainNames.map((country) => ({
  key: country,
  value: country,
}));

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
        :options="Object.values(sourcesWithCountries)"
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
        v-if="checkIfNeeded('sortBy')"
        name="sortBy"
        label="Sort By"
        default-value="all"
        :options="sortBy"
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
        v-if="checkIfNeeded('language')"
        name="language"
        label="Language"
        default-value="all"
        :options="sourcesWithLanguage"
        @update:value="updateFilter"
      />

      <FormSelectElement
        v-if="checkIfNeeded('groupBy')"
        name="groupBy"
        label="GroupBy"
        :options="groupSelectValues"
        default-value="all"
        @update:value="updateFilter"
      />

      <FormMultiSelect
        v-if="checkIfNeeded('searchIn')"
        name="searchIn"
        label="Search In"
        :options="Object.values(searchIn)"
        @update:value="updateFilter"
      />

      <FormMultiSelect
        v-if="checkIfNeeded('sources')"
        label="Sources"
        name="sources"
        :options="sources"
        :map="{ key: 'id', value: 'name' }"
        searchable
        :max-selections="20"
        placeholder="Select Sources"
        @update:value="updateFilter"
      />

      <FormMultiSelect
        v-if="checkIfNeeded('domains')"
        label="Include Domains"
        name="domains"
        :options="sourcesWithDomainNames"
        searchable
        :max-selections="20"
        placeholder="Include Domains"
        @update:value="updateFilter"
      />

      <FormMultiSelect
        v-if="checkIfNeeded('excludeDomains')"
        label="Exclude Domains"
        name="excludeDomains"
        :options="sourcesWithDomainNames"
        searchable
        :max-selections="20"
        placeholder="Exclude Domains"
        @update:value="updateFilter"
      />
    </div>
  </div>
</template>
