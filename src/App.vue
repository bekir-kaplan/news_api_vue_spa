<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import ErrorComponent from '@/components/ErrorComponent.vue';
</script>

<template>
  <DefaultLayout>
    <ErrorComponent />
    <router-view />
  </DefaultLayout>
</template>

<style>
@import '@/styles/global.css';
</style>
