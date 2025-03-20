<!--
  SideBar.vue
  --------------------
  This component implements a sidebar for displaying details about a news source.
  It includes source information such as name, description, category, 
  language, country, and website.

  Props:
    - content (INewsSource | undefined): The news source details to display.
    - toggle (boolean, optional): Controls the visibility of the sidebar.

  Emits:
    - toggle (boolean): Emits when the sidebar is toggled open or closed.
    - close: Emits when the sidebar is closed.

  Dependencies:
    - Vue:
      - ref: Manages local reactive state.
      - defineEmits: Defines custom events.
      - watch: Listens for prop changes to toggle sidebar visibility.
    - Heroicons:
      - XMarkIcon: Close button icon.
      - ArrowTopRightOnSquareIcon: External link icon.
    - Components:
      - BaseImage: Displays images with error handling.
    - Utilities:
      - utils.getCountryFlagUrl(): Fetches the flag URL for a country.
    - Constants:
      - CON_COUNTRY_CODES: Provides country code-to-name mappings.

  Reactive State:
    - isSidebarOpen (boolean): Controls sidebar visibility.
    - imageFailed (boolean): Tracks whether an image has failed to load.

  Methods:
    - toggleSidebar(newValue: boolean): Updates sidebar visibility and resets image state.
    - closeSidebar(): Closes the sidebar and emits a close event.

  Watchers:
    - Watches `toggle` prop and updates sidebar state accordingly.

  Behavior:
    - Clicking outside the sidebar closes it.
    - Displays news source information, including category, language, and country.
    - Provides a link to visit the source's website.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`side-bar.css`) for styling.
-->
<script setup lang="ts">
import type { INewsSource } from '@/api/types/news/news';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { ref, defineEmits, watch } from 'vue';
import BaseImage from './BaseImage.vue';
import utils from '@/utils/index';
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline';
import { CON_COUNTRY_CODES } from '@/constants/conCountryCodes';
import { CON_SELECT_ELEMENT_DEFAULT_VALUE_ALL } from '@/constants/conFilter';

const props = defineProps<{
  content: INewsSource | undefined;
  toggle?: boolean;
}>();

const emit = defineEmits(['toggle', 'close']);
const isSidebarOpen = ref(false);
const imageFailed = ref(false);

/**
 * Toggles the sidebar visibility.
 * @param newValue - The new state of the sidebar.
 */
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
              {{
                `( ${
                  CON_COUNTRY_CODES[content?.country || CON_SELECT_ELEMENT_DEFAULT_VALUE_ALL]?.text
                } )`
              }}
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
