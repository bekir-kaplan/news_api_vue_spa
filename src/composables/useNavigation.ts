import { computed } from 'vue';
import type { Navigation } from '../types/navigation';
import navigationData from '../mocks/navigation.json';

export function useNavigation() {
  const navigation = computed<Navigation>(() => navigationData as Navigation);
  const menuItems = computed(() => navigation.value.menu);

  return {
    navigation,
    menuItems,
  };
}
