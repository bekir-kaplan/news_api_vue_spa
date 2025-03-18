<template>
  <div class="sources-layout-container">
    <div class="sources-layout-filter-bar" v-if="$slots.filterBar">
      <slot name="filterBar" />
    </div>
    <div class="sources-layout-inner">
      <div class="sources-layout-grid">
        <!-- Main Content -->
        <main class="sources-layout-main">
          <slot name="main" />
        </main>

        <!-- Sidebar -->
        <aside class="sources-layout-sidebar" v-if="$slots.sidebar">
          <slot name="sidebar" />
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/layouts/sources-layout.css';
</style>
