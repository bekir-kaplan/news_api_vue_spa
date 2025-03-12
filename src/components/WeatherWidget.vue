<script setup lang="ts">
const weather = {
  location: 'New York, NY',
  temperature: '72°F',
  condition: 'Partly Cloudy',
  icon: '⛅',
};
</script>

<template>
  <div class="weather-widget-container">
    <h2 class="weather-widget-title">Weather</h2>
    <div class="weather-widget-info">
      <div>
        <p class="weather-widget-location">{{ weather.location }}</p>
        <p class="weather-widget-temperature">{{ weather.temperature }}</p>
      </div>
      <div class="weather-widget-icon">{{ weather.icon }}</div>
    </div>
    <p class="weather-widget-condition">{{ weather.condition }}</p>
  </div>
</template>

<style scoped>
@import '../styles/components/weather-widget.css';
</style>
