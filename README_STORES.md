# Pinia Stores Directory

This directory contains **Pinia stores** used for managing the application's state efficiently. Each store handles a specific part of the application's logic, ensuring modularity and maintainability.

## Folder Structure

```
stores/
│── apiCacheStore.ts      # Caching system for API responses
│── categoryStore.ts      # Manages news articles by category
│── errorStore.ts         # Centralized error handling store
│── financeStore.ts       # Manages financial data and watchlist
│── likedNewsStore.ts     # Handles liked news articles
│── navigationStore.ts    # Manages the navigation menu structure
│── newsFilterStore.ts    # Stores filtering options for news
│── newsSourceStore.ts    # Fetches and organizes news sources
│── newsStore.ts          # Manages fetching, searching, and selecting news articles
```

---

## Store Details

### **1 - API Cache Store (`apiCacheStore.ts`)**
- Stores API responses to reduce redundant network requests.
- Implements a **time-based cache expiration**.
- Uses `getCache` and `setCache` methods for data retrieval and storage.

### **2 - Category Store (`categoryStore.ts`)**
- Manages **news articles by category**.
- Implements pagination for category-specific articles.
- Allows users to **set categories** dynamically.

### **3 - Error Store (`errorStore.ts`)**
- Handles **global error management**.
- Implements **FIFO error queuing** with timed display.
- Provides `setError()` and `clearError()` methods.

### **4 - Finance Store (`financeStore.ts`)**
- Manages **financial data** such as stock quotes and market data.
- Tracks **watchlisted financial symbols**.
- Provides real-time and historical data for selected stocks.

### **5 - Liked News Store (`likedNewsStore.ts`)**
- Allows users to **like/unlike news articles**.
- Stores liked articles with category-based grouping.
- Provides `toggleLike()` method to manage liked articles.

### **6 - Navigation Store (`navigationStore.ts`)**
- Manages **application navigation structure**.
- Stores **menu items** for dynamic rendering.
- Uses computed properties for real-time navigation updates.

### **7 - News Filter Store (`newsFilterStore.ts`)**
- Stores and applies **filters** for news searches.
- Supports **dynamic filtering by category, country, and language**.
- Allows resetting filters to default.

### **8 - News Source Store (`newsSourceStore.ts`)**
- Fetches **available news sources** dynamically.
- Groups sources by **category, country, or language**.
- Automatically sorts sources when filters change.

### **9 - News Store (`newsStore.ts`)**
- Manages **news article retrieval, search, and selection**.
- Fetches **top headlines** for the homepage.
- Implements **search functionality for both top headlines and full news archive**.
- Stores **selected articles for detailed viewing**.

---

## Usage Example

To use these stores in a Vue component, simply **import and initialize** them:

```ts
<script setup lang="ts">
import { useNewsStore } from '@/stores/newsStore';
import { storeToRefs } from 'pinia';

const newsStore = useNewsStore();
const { categoryArticles, loading, error } = storeToRefs(newsStore);
</script>

<template>
  <div v-if="loading">Loading news...</div>
  <div v-else-if="error">Error fetching news: {{ error }}</div>
  <div v-else>
    <div v-for="(articles, category) in categoryArticles" :key="category">
      <h3>{{ category }}</h3>
      <ul>
        <li v-for="article in articles" :key="article.url">{{ article.title }}</li>
      </ul>
    </div>
  </div>
</template>
```

---

## Summary
Each store is designed to handle a **specific part** of the application's state, making it easier to manage and extend.

---
