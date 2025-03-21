# Components Directory

This directory contains **Vue components** categorized based on their **functional roles**. Each component is structured to maintain **reusability, readability, and modularity**.

## Folder Structure

```
components/
│── form-elements/      # UI form components
│   ├── FormSelectElement.vue  # Custom select dropdown element
│   ├── FormMultiSelect.vue    # Custom multiselect dropdown element
│
│── navigation/         # Navigation-related components
│   ├── DesktopMenu.vue  # Navigation menu for desktop view
│   ├── MobileMenu.vue   # Navigation menu for mobile view
│   ├── NavLogo.vue      # Logo component used in the navigation bar
│
│── search/             # Components for searching and filtering news
│   ├── EndpointSelection.vue   # Filter component for news search
│   ├── NewsSearchFilter.vue    # Filter component for news search
│   ├── SearchInput.vue         # Search input field with autocomplete
│   ├── SearchPanel.vue         # Search results panel
│   ├── SourceSearchFilter.vue  # Filter component for news sources
│
│── sections/           # Section-based components for displaying grouped content
│   ├── NewsCarousel.vue  # News carousel for displaying trending news
│   ├── NewsSection.vue   # A reusable section for news listings
│
│── widgets/            # Widgets displaying financial or news-related information
│   ├── ChartView.vue         # Displays stock or financial chart data
│   ├── FinanceWidget.vue     # Widget for financial statistics
│   ├── MarketOverview.vue    # Displays stock market trends
│   ├── PeriodSelector.vue    # Dropdown for selecting time periods in charts
│
│── BaseImage.vue        # A wrapper for handling images with fallback support
│── ErrorComponent.vue   # Displays error messages in the UI
│── GoBackButton.vue     # Button for navigating back to the previous page
│── LikeButton.vue       # Button for liking or favoriting news articles
│── LoadingSpinner.vue   # Animated loading indicator
│── NavBar.vue           # The main navigation bar component
│── NewsCard.vue         # Card component for individual news articles
│── NoDataFound.vue      # Displays a message when no data is found
│── PopularTopics.vue    # Displays trending or popular news topics
│── RelatedArticles.vue  # Suggests related news articles
│── ShareButtons.vue     # Social media sharing buttons
│── SideBar.vue          # Sidebar component for additional navigation
│── TrendingNews.vue     # Displays trending news articles
│── WeatherWidget.vue    # Widget for displaying weather updates
│── README.md            # Documentation for the components module
```

---

## Component Categories

### **1 - Form Elements (`form-elements/`)**
Contains reusable **form UI components**.

- **`FormSelectElement.vue`** – A **select dropdown** with custom styling and event handling.

---

### **2 - Navigation (`navigation/`)**
Handles **UI navigation**, including menus and branding.

- **`DesktopMenu.vue`** – Menu for **desktop** users.
- **`MobileMenu.vue`** – Menu for **mobile** users.
- **`NavLogo.vue`** – Displays the website **logo** in the navbar.

---

### **3 - Search (`search/`)**
Manages **news search functionality**.

- **`NewsSearchFilter.vue`** – Provides filters for refining news search results.
- **`SearchInput.vue`** – Input field for **searching news articles**.
- **`SearchPanel.vue`** – Panel displaying **search results**.
- **`SourceSearchFilter.vue`** – Filters news sources.

---

### **4 - Sections (`sections/`)**
Handles **layout sections** for structured news presentation.

- **`NewsCarousel.vue`** – A carousel to display **trending news**.
- **`NewsSection.vue`** – A reusable **section layout** for displaying news.

---

### **5 - Widgets (`widgets/`)**
Provides **interactive widgets** for finance and news.

- **`ChartView.vue`** – Displays **financial market charts**.
- **`FinanceWidget.vue`** – Financial statistics widget.
- **`MarketOverview.vue`** – Shows an **overview of the stock market**.
- **`PeriodSelector.vue`** – Dropdown for selecting a **time period** in charts.

---

### **6 - General UI Components**
Reusable **UI elements** across different parts of the app.

- **`BaseImage.vue`** – Handles image loading with a **fallback mechanism**.
- **`ErrorComponent.vue`** – Displays **error messages**.
- **`GoBackButton.vue`** – A button for **navigating back** to the previous page.
- **`LikeButton.vue`** – Used for **liking news articles**.
- **`LoadingSpinner.vue`** – Shows a **spinner** when loading data.
- **`NavBar.vue`** – The **main navigation bar**.
- **`NewsCard.vue`** – Card UI for displaying a **news article**.
- **`NoDataFound.vue`** – Displays a **message when no data is available**.
- **`PopularTopics.vue`** – Lists **popular and trending topics**.
- **`RelatedArticles.vue`** – Displays **related news articles**.
- **`ShareButtons.vue`** – Social media **sharing buttons**.
- **`SideBar.vue`** – Sidebar component for **additional navigation**.
- **`TrendingNews.vue`** – Displays **trending news**.
- **`WeatherWidget.vue`** – Displays **weather updates**.

---

## Usage Example

To use these components, simply **import and register** them in a Vue component:

```vue
<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import NewsCard from '@/components/NewsCard.vue';
import SearchInput from '@/components/search/SearchInput.vue';
</script>

<template>
  <NavBar />
  <SearchInput placeholder="Search news..." />
  <NewsCard :article="newsArticle" />
</template>
```

---

## Summary

The **`components/` folder** follows **best practices** by organizing components into categories based on **functionality**. Each component is **modular**, **reusable**, and **easy to maintain**.

---

