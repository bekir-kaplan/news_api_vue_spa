import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { INavigation } from '@/types/navigation.types';
import navigationData from '@/mocks/navigation.json';

export const useNavigationStore = defineStore(
  'navigation',
  () => {
    const navigation = computed<INavigation>(() => navigationData as INavigation);
    const menuItems = computed(() => navigation.value.menu);
    return { navigation, menuItems };
  },
  {
    persist: true,
  }
);
