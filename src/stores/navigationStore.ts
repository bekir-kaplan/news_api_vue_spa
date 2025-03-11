import { defineStore } from 'pinia';
import { useNavigation } from '../composables/useNavigation';

export const useNavigationStore = defineStore(
  'navigation',
  () => {
    const navigation = useNavigation();
    return { ...navigation };
  },
  {
    persist: true,
  }
);
