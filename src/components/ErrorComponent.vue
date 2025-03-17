<script setup lang="ts">
import { useErrorStore } from '@/stores/errorStore';
import { XCircleIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';

const errorStore = useErrorStore();

const props = defineProps<{
  title?: string;
  customError?: string;
  class?: string;
}>();

const storeErrors = computed(() => errorStore.error);
</script>

<template>
  <div v-if="storeErrors?.length || props.customError">
    <div class="error-container" :class="[props.class]">
      <button @click="errorStore.clearError" class="error-close-button">
        <XCircleIcon class="error-close-icon" />
      </button>
      <div v-for="(err, idx) in storeErrors" :key="idx">
        <p class="error-title">{{ props.title || 'Error' }}</p>
        <p class="error-message">{{ err || props.customError }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/error-component.css';
</style>
