<!--
  Navbar.vue
  --------------------
  This component serves as the main navigation bar for the news application.
  It includes a logo, desktop and mobile navigation menus, a search toggle,
  and an icon for accessing liked news.

  Dependencies:
    - Pinia Stores:
      - useNavigationStore: Manages menu items.
      - useLikedNewsStore: Tracks liked news count.
      - useNewsStore: Handles news article selection.
    - Vue Router:
      - useRouter: Manages navigation between pages.
    - Heroicons:
      - MagnifyingGlassIcon: Search icon.
      - XMarkIcon: Close button icon.
      - Bars3Icon: Mobile menu icon.
      - HeartIcon: Liked news icon.
    - Components:
      - NavLogo: Displays the application logo.
      - DesktopMenu: Handles desktop navigation.
      - MobileMenu: Handles mobile navigation.
      - SearchPanel: Provides search functionality.

  Reactive State:
    - isMobileMenuOpen (boolean): Tracks whether the mobile menu is open.
    - isSearchOpen (boolean): Tracks whether the search panel is open.

  Methods:
    - toggleMobileMenu(): Toggles visibility of the mobile menu.
    - toggleSearch(): Toggles visibility of the search panel.
    - handleArticleSelect(article: INewsArticle): Selects an article and navigates to its 
    details page.
    - closeMobileMenu(): Closes the mobile menu.
    - goToLikedNews(): Navigates to the liked news page.

  Behavior:
    - Desktop menu is always visible on larger screens.
    - Mobile menu opens via the menu button on smaller screens.
    - Search can be toggled independently.
    - Clicking an article in the search panel navigates to the article details page.

  Styling:
    - Scoped CSS: Uses an external stylesheet (`navbar.css`) for layout and styling.
-->

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useNavigationStore } from '@/stores/navigationStore';
import { useLikedNewsStore } from '@/stores/likedNewsStore';
import { MagnifyingGlassIcon, XMarkIcon, Bars3Icon, HeartIcon } from '@heroicons/vue/24/outline';
import { useNewsStore } from '@/stores/newsStore';
import NavLogo from '@/components/navigation/NavLogo.vue';
import DesktopMenu from '@/components/navigation/DesktopMenu.vue';
import MobileMenu from '@/components/navigation/MobileMenu.vue';
import SearchPanel from '@/components/search/SearchPanel.vue';
import type { INewsArticle } from '@/api/types/news/news';

const router = useRouter();
const navigationStore = useNavigationStore();
const likedNewsStore = useLikedNewsStore();
const newsStore = useNewsStore();

// Extract state from stores
const { menuItems } = storeToRefs(navigationStore);
const { likedCount } = storeToRefs(likedNewsStore);
const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false);

/**
 * Toggles the mobile navigation menu visibility.
 */
const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

/**
 * Toggles the search panel visibility.
 * Closes the mobile menu when search panel is closed.
 */
const toggleSearch = (): void => {
  isSearchOpen.value = !isSearchOpen.value;
  if (!isSearchOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

/**
 * Handles the selection of a news article from the search panel.
 * Stores the selected article and navigates to the article details page.
 * @param article - The selected news article
 */
const handleArticleSelect = (article: INewsArticle): void => {
  newsStore.setSelectedArticle(article);
  router.push(`/article/${encodeURIComponent(article.title)}`);
  isSearchOpen.value = false;
};

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false;
};

const goToLikedNews = (): void => {
  router.push('/liked');
};
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="navbar-content">
        <!-- Logo -->
        <NavLogo @click="closeMobileMenu" />

        <!-- Desktop Navigation Menu -->
        <DesktopMenu :items="menuItems" />

        <div class="hidden md:flex items-center gap-2">
          <!-- Desktop Search Icon -->
          <button
            class="navbar-btn-icon flex gap-2"
            @click="toggleSearch"
            aria-label="Toggle search"
          >
            Search
            <MagnifyingGlassIcon v-if="!isSearchOpen" class="navbar-icon" />
            <XMarkIcon v-else class="navbar-icon" />
          </button>

          <!-- Liked News Icon -->
          <button class="navbar-btn-icon relative" @click="goToLikedNews" aria-label="Liked news">
            <HeartIcon class="navbar-icon" />
            <span v-if="likedCount > 0" class="navbar-liked-count">
              {{ likedCount }}
            </span>
          </button>
        </div>

        <!-- Mobile Menu Buttons -->
        <div class="md:hidden flex items-center gap-2">
          <!-- Mobile Search Icon -->
          <button class="navbar-btn-icon" @click="toggleSearch" aria-label="Toggle search">
            <MagnifyingGlassIcon v-if="!isSearchOpen" class="navbar-icon" />
            <XMarkIcon v-else class="navbar-icon" />
          </button>

          <!-- Mobile Liked News Icon -->
          <button class="navbar-btn-icon relative" @click="goToLikedNews" aria-label="Liked news">
            <HeartIcon class="navbar-icon" />
            <span v-if="likedCount > 0" class="navbar-liked-count">
              {{ likedCount }}
            </span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button class="navbar-btn-icon" @click="toggleMobileMenu" aria-label="Toggle mobile menu">
            <Bars3Icon v-if="!isMobileMenuOpen" class="navbar-icon-large" />
            <XMarkIcon v-else class="navbar-icon-large" />
          </button>
        </div>
      </div>

      <!-- Search Panel -->
      <SearchPanel :is-open="isSearchOpen" @select="handleArticleSelect" />

      <!-- Mobile Menu -->
      <MobileMenu :items="menuItems" :is-open="isMobileMenuOpen" @close="closeMobileMenu" />
    </div>
  </nav>
</template>

<style scoped>
/* Imports styles from the external CSS file */
@import '@/styles/components/navbar.css';
</style>
