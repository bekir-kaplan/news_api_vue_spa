<script setup lang="ts">
import type { MenuItem } from '../../types/navigation';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  items: MenuItem[];
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const router = useRouter();
const activeDropdown = ref<string | null>(null);

const toggleDropdown = (menuId: string): void => {
  activeDropdown.value = activeDropdown.value === menuId ? null : menuId;
};

const navigate = (path: string): void => {
  router.push(path);
  activeDropdown.value = null;
  emit('close');
};
</script>

<template>
  <div v-show="isOpen" class="md:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <template v-for="item in items" :key="item.id">
        <!-- Mobile Menu Item with Submenu -->
        <div v-if="item.submenu" class="relative">
          <button class="nav-item w-full text-left" @click="toggleDropdown(item.id)">
            <div class="flex justify-between items-center">
              {{ item.label }}
              <span
                class="transition-transform duration-200"
                :class="{ 'rotate-180': activeDropdown === item.id }"
              >
                ▼
              </span>
            </div>
          </button>
          <!-- Mobile Dropdown -->
          <div v-show="activeDropdown === item.id" class="mt-2 ml-4 space-y-1">
            <router-link
              v-for="subItem in item.submenu"
              :key="subItem.id"
              :to="subItem.path"
              class="dropdown-item capitalize"
              active-class="bg-blue-50 text-blue-600"
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
          class="nav-item block"
          active-class="nav-item-active"
          @click="emit('close')"
        >
          {{ item.label }}
        </router-link>
      </template>
    </div>
  </div>
</template>

<style scoped>
.nav-item {
  @apply px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50;
}

.nav-item-active {
  @apply text-blue-600 bg-blue-50;
}

.dropdown-item {
  @apply block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 cursor-pointer;
}
</style>
