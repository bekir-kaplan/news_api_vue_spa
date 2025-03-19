<script setup lang="ts">
import { ref, defineProps, watch } from 'vue';
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
    <PhotoIcon v-else class="w-16 h-16 bg-slate-200 text-gray-100 mx-auto" :class="className" />
  </div>
</template>
