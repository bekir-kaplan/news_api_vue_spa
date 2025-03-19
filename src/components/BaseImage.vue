<!--
  BaseImage.vue
  --------------------
  This component is a wrapper around the <img> tag, providing error handling
  and a fallback icon when the image fails to load.

  Props:
    - src (string): The source URL of the image.
    - alt (string, optional): The alternative text for accessibility.
    - className (string, optional): Additional CSS classes for styling.

  Dependencies:
    - Vue Refs:
      - hasError (boolean): Tracks if the image has failed to load.
    - Heroicons:
      - PhotoIcon: Displays a fallback icon when the image cannot be loaded.

  Methods:
    - handleError(): Sets `hasError` to true when the image fails to load.

  Watchers:
    - Watches `src` prop to reset `hasError` when the image source changes.

  Behavior:
    - If the image loads successfully, it is displayed.
    - If the image fails to load, a fallback icon (`PhotoIcon`) is shown.

  Accessibility:
    - Provides an `alt` attribute for images to improve screen reader support.

  Styling:
    - Uses `className` for custom styling.
-->
<script setup lang="ts">
import { ref, watch } from 'vue';
import { PhotoIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  src: string;
  alt?: string;
  className?: string;
}>();

const hasError = ref(false);

const handleError = (): void => {
  hasError.value = true;
};
watch(
  () => props.src,
  () => {
    hasError.value = false;
  }
);
</script>

<template>
  <div class="relative">
    <img
      v-if="!hasError"
      :src="src"
      :alt="alt || 'Image'"
      :class="className"
      loading="lazy"
      @error="handleError"
    />
    <!-- Display a fallback icon if the image fails to load -->
    <PhotoIcon v-else class="bg-slate-200 text-gray-100 mx-auto" :class="className" />
  </div>
</template>
