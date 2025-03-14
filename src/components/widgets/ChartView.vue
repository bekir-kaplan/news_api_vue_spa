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

<template>
  <div class="chart-view-container">
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    <div v-else class="no-data">No data available</div>
  </div>
</template>

<style scoped>
@import '@/styles/components/widgets/chart-view.css';
</style>
