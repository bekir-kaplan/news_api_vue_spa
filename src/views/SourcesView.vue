<script setup lang="ts">
import GoBackButton from '@/components/GoBackButton.vue';
import SourcesLayout from '@/layouts/SourcesLayout.vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useNewsSourceStore } from '@/stores/newsSourceStore';
import { storeToRefs } from 'pinia';
import { useNewsFilterStore } from '@/stores/newsFilterStore';
import { ArrowTopRightOnSquareIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import SideBar from '@/components/SideBar.vue';
import type { INewsSource } from '@/api/types/news';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import { CON_COUNTRY_CODES } from '@/constants/conCountryCodes';

const newsSourceStore = useNewsSourceStore();
const searchFilter = useNewsFilterStore();
const filterStore = useNewsFilterStore();
const { newsFilters } = storeToRefs(searchFilter);
const { groupedSources, groupByParam, loading } = storeToRefs(newsSourceStore);
const sideBarContentRef = ref<INewsSource>();
const isSidebarOpenRef = ref(false);

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
  filterStore.resetFilter();
});

onUnmounted(() => {
  filterStore.resetFilter();
});

const getSourceViewTitle = (letter: string): string => {
  let title = letter;
  if (groupByParam.value === 'country') {
    title = `${CON_COUNTRY_CODES[letter]?.text || ''} (${letter})`;
  }
  return title;
};
const showSideBarInfo = (content: INewsSource): void => {
  sideBarContentRef.value = content;
  isSidebarOpenRef.value = !isSidebarOpenRef.value;
};
</script>

<template>
  <SourcesLayout>
    <template #main>
      <LoadingSpinner :loading="loading" />
      <div class="sources-view-header">
        <GoBackButton />
        <h1>News Sources</h1>
      </div>
      <div class="sources-view-container">
        <div class="sources-view-card" v-for="(group, letter) in groupedSources" :key="letter">
          <h2 class="sources-view-title">{{ getSourceViewTitle(letter) }}</h2>
          <ul class="sources-view-ul">
            <li class="sources-view-li" v-for="source in group" :key="source.id">
              {{ source.name }}

              <div class="source-view-li-options">
                <a :href="source.url" target="_blank" class="source-view-li-options-item link">
                  <ArrowTopRightOnSquareIcon class="text-icon" />
                </a>
                <button @click="showSideBarInfo(source)" class="source-view-li-options-item link">
                  <InformationCircleIcon class="text-icon" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <SideBar
        :content="sideBarContentRef"
        :toggle="isSidebarOpenRef"
        @close="() => (isSidebarOpenRef = !isSidebarOpenRef)"
      />
    </template>
  </SourcesLayout>
</template>

<style scoped>
@import '@/styles/views/sources-view.css';
</style>
