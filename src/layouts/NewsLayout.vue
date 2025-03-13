<template>
  <div class="news-layout-container">
    <div class="news-layout-inner">
      <div class="news-layout-grid">
        <!-- Main Content -->
        <main class="news-layout-main">
          <slot name="main" />
        </main>

        <!-- Sidebar -->
        <aside class="news-layout-sidebar">
          <slot name="sidebar" />
        </aside>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/layouts/news-layout.css';
</style>
