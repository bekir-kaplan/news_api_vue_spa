import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('error', () => {
  const error = ref<string[] | null>([]);

  const setError = (message: string): void => {
    error.value = [...(error.value || []), message];
  };

  const clearError = (): void => {
    error.value = [];
  };

  return {
    error,
    setError,
    clearError,
  };
});
