<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';
import { CheckIcon } from '@heroicons/vue/24/outline';
import { CON_NEWS_SEARCH_ENDPOINTS } from '@/constants/conFilter';

const props = defineProps<{
  modelValue: string;
}>();

const selectedEndpoint = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);

const handleSearchIn = (searchIn: string): void => {
  selectedEndpoint.value = searchIn;
  emit('update:modelValue', searchIn);
};
</script>

<template>
  <div class="search-panel-endpoint-selection">
    <button class="endpoint-selection-button" @click="handleSearchIn('everything')">
      Search in Everything
      <CheckIcon v-if="selectedEndpoint === 'everything'" class="endpoint-selection-icon" />
    </button>
    <button
      class="endpoint-selection-button"
      @click="handleSearchIn(CON_NEWS_SEARCH_ENDPOINTS.TOP_HEADLINES.key)"
    >
      Search in Top Headlines
      <CheckIcon
        v-if="selectedEndpoint === CON_NEWS_SEARCH_ENDPOINTS.TOP_HEADLINES.key"
        class="endpoint-selection-icon"
      />
    </button>
  </div>
</template>

<style scoped>
@import '@/styles/components/navigation/endpoint-selection.css';
</style>
