import { defineStore } from 'pinia';
import { useNavigation } from '@/composables/useNavigation';

export const useNavigationStore = defineStore(
  'navigation',
  () => {
    const { navigation, menuItems } = useNavigation();
    return { navigation, menuItems };
  },
  {
    persist: true,
  }
);
