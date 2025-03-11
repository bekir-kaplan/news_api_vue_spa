<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <div class="flex-shrink-0">
    <router-link to="/" class="nav-logo" @click="emit('click')"> NewsApp </router-link>
  </div>
</template>

<style scoped>
.nav-logo {
  @apply text-2xl font-bold text-blue-600;
}
</style>
