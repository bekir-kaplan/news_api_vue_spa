/**
 * Navigation Store (Pinia)
 * --------------------------------------
 * Manages the application's navigation structure.
 *
 * Features:
 * - Provides access to the full navigation structure.
 * - Extracts menu items from the navigation data.
 */
import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { INavigation } from '@/types/navigation.types';
import navigationData from '@/mocks/navigation.json';

export const useNavigationStore = defineStore(
  'navigation',
  () => {
    /**
     * Retrieves the entire navigation structure from JSON mock data.
     * @returns {INavigation} The navigation structure.
     */
    const navigation = computed<INavigation>(() => navigationData as INavigation);

    /**
     * Extracts the menu items from the navigation structure.
     * @returns The menu items for navigation.
     */
    const menuItems = computed(() => navigation.value.menu);
    return { navigation, menuItems };
  },
  {
    persist: true,
  }
);
