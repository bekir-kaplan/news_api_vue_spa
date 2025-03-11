<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useNavigationStore } from '../stores/navigationStore';
import { useLikedNewsStore } from '../stores/likedNewsStore';
import { MagnifyingGlassIcon, XMarkIcon, Bars3Icon, HeartIcon } from '@heroicons/vue/24/outline';
import { useNewsStore } from '../stores/newsStore';
import type { Article } from '../api/types/mappedTypes';
import Logo from './navigation/Logo.vue';
import DesktopMenu from './navigation/DesktopMenu.vue';
import MobileMenu from './navigation/MobileMenu.vue';
import SearchPanel from './navigation/SearchPanel.vue';

const router = useRouter();
const navigationStore = useNavigationStore();
const likedNewsStore = useLikedNewsStore();
const { menuItems } = storeToRefs(navigationStore);
const { likedCount } = storeToRefs(likedNewsStore);
const newsStore = useNewsStore();

const isMobileMenuOpen = ref(false);
const isSearchOpen = ref(false);

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const toggleSearch = (): void => {
  isSearchOpen.value = !isSearchOpen.value;
  if (!isSearchOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

const handleArticleSelect = (article: Article): void => {
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
        <Logo @click="closeMobileMenu" />

        <!-- Desktop Navigation Menu -->
        <DesktopMenu :items="menuItems" />

        <div class="hidden md:flex items-center gap-2">
          <!-- Desktop Search Icon -->
          <button class="btn-icon" @click="toggleSearch" aria-label="Toggle search">
            <MagnifyingGlassIcon v-if="!isSearchOpen" class="h-5 w-5" />
            <XMarkIcon v-else class="h-5 w-5" />
          </button>

          <!-- Liked News Icon -->
          <button class="btn-icon relative" @click="goToLikedNews" aria-label="Liked news">
            <HeartIcon class="h-5 w-5" />
            <span v-if="likedCount > 0" class="liked-count">
              {{ likedCount }}
            </span>
          </button>
        </div>

        <!-- Mobile Menu Buttons -->
        <div class="md:hidden flex items-center gap-2">
          <!-- Mobile Search Icon -->
          <button class="btn-icon" @click="toggleSearch" aria-label="Toggle search">
            <MagnifyingGlassIcon v-if="!isSearchOpen" class="h-5 w-5" />
            <XMarkIcon v-else class="h-5 w-5" />
          </button>

          <!-- Mobile Liked News Icon -->
          <button class="btn-icon relative" @click="goToLikedNews" aria-label="Liked news">
            <HeartIcon class="h-5 w-5" />
            <span v-if="likedCount > 0" class="liked-count">
              {{ likedCount }}
            </span>
          </button>

          <!-- Mobile Menu Toggle -->
          <button class="btn-icon" @click="toggleMobileMenu" aria-label="Toggle mobile menu">
            <Bars3Icon v-if="!isMobileMenuOpen" class="h-6 w-6" />
            <XMarkIcon v-else class="h-6 w-6" />
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
.navbar {
  @apply bg-white shadow-md relative;
}

.navbar-container {
  @apply container mx-auto px-4;
}

.navbar-content {
  @apply flex justify-between items-center h-16;
}

.btn-icon {
  @apply p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none;
}

.liked-count {
  @apply absolute -top-1 -right-1 bg-red-500 text-white 
          text-xs rounded-full h-4 w-4 flex items-center justify-center;
}
</style>
