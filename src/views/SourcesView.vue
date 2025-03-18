<script setup lang="ts">
import GoBackButton from '@/components/GoBackButton.vue';
import SourcesLayout from '@/layouts/SourcesLayout.vue';
import { computed, onMounted, onUnmounted, watch } from 'vue';
import { useNewsSourceStore } from '@/stores/newsSourceStore';
import { storeToRefs } from 'pinia';
import { useNewsFilterStore } from '@/stores/newsFilterStore';
import { ArrowTopRightOnSquareIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';

const newsSourceStore = useNewsSourceStore();
const searchFilter = useNewsFilterStore();
const filterStore = useNewsFilterStore();
const { newsFilters } = storeToRefs(searchFilter);
const { groupedSources } = storeToRefs(newsSourceStore);

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
</script>

<template>
  <SourcesLayout>
    <template #main>
      <div class="sources-view-header">
        <GoBackButton />
        <h1>News Sources</h1>
      </div>
      <div class="sources-view-container">
        <div class="sources-view-card" v-for="(group, letter) in groupedSources" :key="letter">
          <h2 class="sources-view-title">{{ letter }}</h2>
          <ul class="sources-view-ul">
            <li class="sources-view-li" v-for="source in group" :key="source.id">
              {{ source.name }}

              <div class="source-view-li-options">
                <a :href="source.url" target="_blank" class="source-view-li-options-item link">
                  <ArrowTopRightOnSquareIcon class="text-icon" />
                </a>
                <a href="#" class="source-view-li-options-item link">
                  <InformationCircleIcon class="text-icon" />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </SourcesLayout>
</template>

<style scoped>
.sources-view-header {
  @apply mb-8;
}
.sources-view-container {
  @apply grid gap-4 flex-wrap
  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
}
.sources-view-card {
  @apply bg-white rounded-md p-4;
}

.sources-view-title {
  @apply text-2xl font-bold mb-6 capitalize;
}

.sources-view-li {
  @apply flex gap-2 justify-between pb-2 items-center mr-2;
}

.source-view-li-options {
  @apply flex gap-1;
}

.source-view-li-options-item {
  @apply bg-slate-200 rounded-md;
}

.sources-view-ul {
  @apply max-h-52 overflow-auto;
}
</style>
