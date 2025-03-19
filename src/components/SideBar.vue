<script setup lang="ts">
import type { INewsSource } from '@/api/types/news/news';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { ref, defineProps, defineEmits, watch } from 'vue';
import BaseImage from './BaseImage.vue';
import utils from '@/utils/index';
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
import { CON_COUNTRY_CODES } from '@/constants/conCountryCodes';

const props = defineProps<{
  content: INewsSource | undefined;
  toggle?: boolean;
}>();

const emit = defineEmits(['toggle', 'close']);

const isSidebarOpen = ref(false);
const imageFailed = ref(false);

const toggleSidebar = (newValue: boolean): void => {
  isSidebarOpen.value = newValue;
  imageFailed.value = false;
  emit('toggle', isSidebarOpen.value);
};

const closeSidebar = (): void => {
  isSidebarOpen.value = false;
  emit('close');
};

watch(
  () => props.toggle,
  (newValue) => {
    toggleSidebar(newValue);
  }
);
</script>

<template>
  <!-- Sidebar -->
  <div
    :class="[
      'sidebar-backdrop-container',
      isSidebarOpen
        ? 'transition-transform duration-1000 transform translate-x-0'
        : 'transition-transform duration-1000 transform -translate-x-full',
    ]"
    @click="closeSidebar"
  >
    <BaseImage
      v-if="content?.country"
      :src="utils.getCountryFlagUrl(content?.country)"
      :alt="content?.country"
      class="sidebar-flag-img"
    />
  </div>
  <div
    :class="[
      'sidebar-container',
      isSidebarOpen
        ? 'transition-transform duration-1000 transform -translate-x-0'
        : 'transition-transform duration-1000 transform translate-x-full',
    ]"
  >
    <div class="sidebar-content">
      <!-- Header -->
      <header class="sidebar-header">
        <h2 class="sidebar-brand">{{ content?.name }}</h2>
        <button type="button" class="sidebar-close-button" @click="closeSidebar">
          <XMarkIcon class="x-mark-icon" />
        </button>
      </header>

      <!-- Sidebar Content -->
      <div class="sidebar-body">
        <p class="sidebar-description">{{ content?.description }}</p>
        <ul class="sidebar-info">
          <li class="sidebar-info-list">
            <div class="sidebar-info-key">Category:</div>
            <div class="capitalize">{{ content?.category }}</div>
          </li>
          <li class="sidebar-info-list">
            <div class="sidebar-info-key">Language:</div>
            <div class="uppercase">{{ content?.language }}</div>
          </li>
          <li class="sidebar-info-list">
            <div class="sidebar-info-key">Country:</div>
            <div class="uppercase">
              {{ content?.country }}
              {{ `( ${CON_COUNTRY_CODES[content?.country || 'all']?.text} )` }}
            </div>
          </li>
          <li class="sidebar-info-list">
            <div class="sidebar-info-key">Web Page:</div>
            <div class="lowercase">
              <a :href="content?.url" target="_blank" class="sidebar-link">
                Visit Website <ArrowTopRightOnSquareIcon class="text-icon" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/components/side-bar.css';
</style>
