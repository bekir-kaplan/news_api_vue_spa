import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('error', () => {
  const error = ref<string | null>(null);

  const setError = (message: string): void => {
    error.value = message;
  };

  const clearError = (): void => {
    error.value = null;
  };

  return {
    error,
    setError,
    clearError,
  };
});
