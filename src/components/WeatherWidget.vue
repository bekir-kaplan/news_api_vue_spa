<!--
  WeatherWidget.vue
  --------------------
  This component displays a simple weather widget with location, temperature, 
  weather condition, and an icon representing the condition.

  Data:
    - weather (object): Contains static weather details, including:
      - location (string): The city and state of the weather report.
      - temperature (string): The current temperature in Fahrenheit.
      - condition (string): A brief description of the weather condition.
      - icon (string): A Unicode symbol representing the weather condition.

  Behavior:
    - The weather information is currently static but can be extended 
      to fetch real-time weather data from an API.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`weather-widget.css`) for styling.
-->
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
@import '@/styles/components/weather-widget.css';
</style>
