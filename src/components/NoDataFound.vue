<!--
  NoDataFound.vue
  --------------------
  This component displays a fallback message when no data is available.
  It provides a default message but also allows custom content via slots.

  Slots:
    - Default slot: Allows customization of the "No data available" message.

  Behavior:
    - If no content is provided in the slot, it defaults to "No data available."

  Styling:
    - Scoped CSS: Uses an external stylesheet (`no-data-found.css`) for styling.
-->
<template>
  <div class="no-data-found-container">
    <p class="no-data-found-message">
      <slot>No data available</slot>
    </p>
  </div>
</template>
<style scoped>
@import '@/styles/components/no-data-found.css';
</style>
