<script setup lang="ts">
import { ref } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import type { MenuItem } from '../../types/navigation';

defineProps<{
  items: MenuItem[];
}>();

const activeDropdown = ref<string | null>(null);

const toggleDropdown = (menuId: string): void => {
  activeDropdown.value = activeDropdown.value === menuId ? null : menuId;
};
</script>

<template>
  <div class="nav-menu">
    <div v-for="item in items" :key="item.id" class="relative">
      <!-- Menu Item with Submenu -->
      <div v-if="item.submenu" class="relative">
        <button class="nav-item inline-flex items-center" @click="toggleDropdown(item.id)">
          {{ item.label }}
          <ChevronDownIcon
            class="nav-item-icon"
            :class="{ 'rotate-180': activeDropdown === item.id }"
          />
        </button>
        <!-- Dropdown Menu -->
        <div v-show="activeDropdown === item.id" class="dropdown-menu">
          <div class="py-1" role="menu">
            <router-link
              v-for="subItem in item.submenu"
              :key="subItem.id"
              :to="subItem.path"
              class="dropdown-item capitalize"
              active-class="bg-blue-50 text-blue-600"
              @click="activeDropdown = null"
            >
              {{ subItem.label }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- Regular Menu Item -->
      <router-link v-else :to="item.path" class="nav-item" active-class="nav-item-active">
        {{ item.label }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
@import '../../styles/components/navigation/desktop-menu.css';
</style>
