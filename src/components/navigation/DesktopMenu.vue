<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';
import type { MenuItem } from '../../types/navigation';

const props = defineProps<{
  items: MenuItem[];
}>();

const router = useRouter();
const activeDropdown = ref<string | null>(null);

const toggleDropdown = (menuId: string) => {
  activeDropdown.value = activeDropdown.value === menuId ? null : menuId;
};

const navigate = (path: string) => {
  router.push(path);
  activeDropdown.value = null;
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
            class="ml-1 h-4 w-4 transition-transform duration-200"
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
.nav-menu {
  @apply hidden md:flex items-center space-x-4;
}

.nav-item {
  @apply px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50;
}

.nav-item-active {
  @apply text-blue-600 bg-blue-50;
}

.dropdown-menu {
  @apply absolute z-50 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5;
}

.dropdown-item {
  @apply block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer;
}
</style>
