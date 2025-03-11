<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <NavBar />
    <slot />
  </div>
</template>
