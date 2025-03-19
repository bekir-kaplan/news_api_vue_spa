<!--
  NavLogo.vue
  --------------------
  This component represents the navigation logo for the news application.
  It displays the application logo and name, acting as a clickable link to the homepage.

  Emits:
    - click: Triggered when the logo is clicked, allowing parent components to handle navigation 
    interactions.

  Dependencies:
    - BaseImage: A reusable image component used for rendering the application logo.
    - Vue Router: Provides navigation functionality via <router-link>.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`nav-logo.css`) to style the component.

  Methods:
    - Emits 'click' event when the logo is clicked to notify the parent component.
-->
<script setup lang="ts">
import BaseImage from '@/components/BaseImage.vue';

const emit = defineEmits<{
  (e: 'click'): void;
}>();
</script>

<template>
  <div class="nav-logo-container">
    <router-link to="/" class="nav-logo" @click="emit('click')">
      <BaseImage src="/news-app-logo4.png" alt="Technical Task News" class-name="w-10 rounded-lg" />
      TTNews
    </router-link>
  </div>
</template>

<style scoped>
@import '@/styles/components/navigation/nav-logo.css';
</style>
