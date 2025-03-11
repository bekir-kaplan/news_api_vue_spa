<script setup lang="ts">
import NavBar from '../components/NavBar.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div class="container mx-auto px-4 py-6">
      <div class="grid grid-cols-12 gap-6">
        <!-- Main Content -->
        <main class="col-span-12 lg:col-span-8">
          <slot name="main" />
        </main>

        <!-- Sidebar -->
        <aside class="col-span-12 lg:col-span-4">
          <slot name="sidebar" />
        </aside>
      </div>
    </div>
  </div>
</template>
