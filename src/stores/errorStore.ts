import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('error', () => {
  const error = ref<string[] | null>([]);
  const errorList = new Map<string, string>();
  let tmpArr: string[] = [];
  let time = 4000;

  const setError = (message: string, errCode: string): void => {
    if (!errorList.has(errCode)) {
      errorList.set(errCode, message);
      tmpArr = Array.from(errorList.values());
      error.value = [...tmpArr];

      setTimeout(() => {
        tmpArr.shift();
        error.value = [...tmpArr];
      }, time);
      time += 4000;
    }
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
