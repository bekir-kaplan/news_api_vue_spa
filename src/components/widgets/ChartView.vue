<!--
  ChartView.vue
  --------------------
  This component provides a reusable line chart visualization using `vue-chartjs`
  and `chart.js`. It dynamically renders a line chart based on provided data and options.

  Props:
    - chartData (object): The dataset for the chart.
    - chartOptions (object): Configuration options for customizing the chart appearance.

  Dependencies:
    - vue-chartjs:
      - Line: A Vue wrapper component for rendering a Chart.js line chart.
    - chart.js:
      - CategoryScale: Enables category-based scaling for the X-axis.
      - LinearScale: Enables linear scaling for the Y-axis.
      - PointElement: Represents data points on the line chart.
      - LineElement: Defines the visual representation of the line.
      - Title: Enables chart title display.
      - Tooltip: Displays tooltips on hover.
      - Legend: Provides a legend for identifying datasets.

  Behavior:
    - If `chartData` is available, the chart is rendered.
    - If `chartData` is empty or undefined, a "No data available" message is displayed.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`chart-view.css`) for styling.
-->
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
import NoDataFound from '../NoDataFound.vue';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

defineProps<{ chartData: any; chartOptions: any }>();
</script>

<template>
  <div class="chart-view-container">
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    <NoDataFound v-else />
  </div>
</template>

<style scoped>
@import '@/styles/components/widgets/chart-view.css';
</style>
