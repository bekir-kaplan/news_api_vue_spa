<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <div class="nav-logo-container">
    <router-link to="/" class="nav-logo" @click="emit('click')"> NewsApp </router-link>
  </div>
</template>

<style scoped>
@import '@/styles/components/navigation/nav-logo.css';
</style>
