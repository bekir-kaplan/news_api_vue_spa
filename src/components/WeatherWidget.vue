<script setup lang="ts">
const weather = {
  location: 'New York, NY',
  temperature: '72°F',
  condition: 'Partly Cloudy',
  icon: '⛅',
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <h2 class="text-xl font-bold mb-4 text-gray-800">Weather</h2>
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600">{{ weather.location }}</p>
        <p class="text-3xl font-bold">{{ weather.temperature }}</p>
      </div>
      <div class="text-4xl">{{ weather.icon }}</div>
    </div>
    <p class="text-gray-600 mt-2">{{ weather.condition }}</p>
  </div>
</template>
