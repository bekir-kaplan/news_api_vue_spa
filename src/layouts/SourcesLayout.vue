<template>
  <div class="sources-layout-container">
    <div class="sources-layout-inner">
      <div class="sources-layout-grid">
        <!-- Main Content -->
        <main class="sources-layout-main">
          <slot name="main" />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/styles/layouts/sources-layout.css';
</style>
