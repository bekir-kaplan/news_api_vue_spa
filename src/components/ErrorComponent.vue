<script setup lang="ts">
import { useErrorStore } from '@/stores/errorStore';
import { storeToRefs } from 'pinia';
import { XCircleIcon } from '@heroicons/vue/24/outline';

const errorStore = useErrorStore();
const { error } = storeToRefs(errorStore);

const props = defineProps<{
  customError?: string;
  class?: string;
}>();
</script>

<template>
  <div v-if="error || props.customError" class="error-container" :class="[props.class]">
    <button @click="errorStore.clearError" class="error-close-button">
      <XCircleIcon class="error-close-icon" />
    </button>
    <p class="error-title">Error</p>
    <p class="error-message">{{ error || customError }}</p>
  </div>
</template>

<style scoped>
@import '@/styles/components/error-component.css';
</style>
