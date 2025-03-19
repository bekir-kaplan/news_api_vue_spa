<script setup lang="ts">
import type { IMenuItem } from '@/types/navigation.types';
import { ref } from 'vue';

defineProps<{
  items: IMenuItem[];
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();
const activeDropdown = ref<string | null>(null);

const toggleDropdown = (menuId: string): void => {
  activeDropdown.value = activeDropdown.value === menuId ? null : menuId;
};
</script>

<template>
  <div v-show="isOpen" class="mobile-menu-container">
    <div class="mobile-menu-list">
      <template v-for="item in items" :key="item.id">
        <!-- Mobile Menu Item with Submenu -->
        <div v-if="item.submenu" class="mobile-menu-item-with-submenu">
          <button class="mobile-menu-item" @click="toggleDropdown(item.id)">
            <div class="mobile-menu-item-content">
              {{ item.label }}
              <span
                class="mobile-menu-item-icon"
                :class="{ 'rotate-180': activeDropdown === item.id }"
              >
                ▼
              </span>
            </div>
          </button>
          <!-- Mobile Dropdown -->
          <div v-show="activeDropdown === item.id" class="mobile-menu-dropdown">
            <router-link
              v-for="subItem in item.submenu"
              :key="subItem.id"
              :to="subItem.path"
              class="mobile-menu-dropdown-item"
              active-class="mobile-menu-dropdown-item-active"
              @click="emit('close')"
            >
              {{ subItem.label }}
            </router-link>
          </div>
        </div>

        <!-- Regular Mobile Menu Item -->
        <router-link
          v-else
          :to="item.path"
          class="mobile-menu-item"
          active-class="mobile-menu-item-active"
          @click="emit('close')"
        >
          {{ item.label }}
        </router-link>
      </template>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/navigation/mobile-menu.css';
</style>
