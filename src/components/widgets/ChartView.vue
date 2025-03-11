<template>
  <div class="h-64">
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    <div v-else class="no-data">No data available</div>
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

defineProps<{ chartData: any; chartOptions: any }>();
</script>

<style scoped>
.no-data {
  @apply flex justify-center items-center h-full text-gray-500;
}
</style>
