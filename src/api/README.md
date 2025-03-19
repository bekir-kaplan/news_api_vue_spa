# API Module Overview

This directory contains the core API logic for interacting with external financial and news services. It is structured to maintain **scalability**, **modularity**, and **code reusability**.

## Folder Structure

```
api/
│── config/         # Configuration files for APIs
│   ├── baseApiConfig.ts         # Base API configuration settings
│   ├── financeApiConfig.ts      # Configuration settings for the Finance API
│   ├── newsApiConfig.ts         # Configuration settings for the News API
│   ├── index.ts                 # Consolidated API configurations
│
│── core/       
│   ├── BaseService.ts           # Generic base class for API interactions
│
│── mappers/       # Data transformation layer (maps API responses to structured formats)
│   ├── financeMapper.ts         # Maps raw finance API data to structured objects
│   ├── newsMapper.ts            # Maps raw news API data to structured objects
│
│── services/      # API service classes for interacting with finance and news APIs
│   ├── FinanceService.ts        # Handles API requests for financial data
│   ├── NewsService.ts           # Handles API requests for news articles
│
│── types/
│   │── finance/
│   │   ├── finance.ts           # Finance-related base types
│   │   ├── financeRequests.ts   # Finance API request types
│   │   ├── financeResponses.ts  # Finance API response types
│   │   ├── financeMap.ts        # Finance mapping types
│   │
│   │── news/
│   │   ├── news.ts              # News-related base types
│   │   ├── newsRequests.ts      # News API request types
│   │   ├── newsResponses.ts     # News API response types
│   │   ├── newsMap.ts           # News mapping types
│
│── utils/         # Utility functions for error handling
│   ├── ErrorHandler.ts          # Centralized error handler for API requests
│   ├── FinanceErrorHandler.ts   # Handles errors specific to the Finance API
│   ├── NewsErrorHandler.ts      # Handles errors specific to the News API
│
│── README.md      # Documentation for the API module
```

## Description of Each Module

### **1 - Config (`config/`)**
This folder contains configuration files for API requests.

- **`baseApiConfig.ts`** - Base API configuration shared across all services.
- **`financeApiConfig.ts`** - Finance API configuration settings (headers, base URL, timeouts).
- **`newsApiConfig.ts`** - News API configuration settings.
- **`index.ts`** - Consolidates all configurations for easy imports.

---

### **2 - Core Library (`core/`)**
This folder contains reusable service classes.

- **`BaseService.ts`** - A generic API service class that wraps `Axios` for API requests.

---

### **3 - Data Mappers (`mappers/`)**
Maps raw API responses into structured objects.

- **`financeMapper.ts`** - Transforms raw financial data into structured formats.
- **`newsMapper.ts`** - Converts news API responses into usable application data.

---

### **4 - API Services (`services/`)**
Contains classes responsible for making API requests.

- **`financeService.ts`** - Handles API requests related to financial data.
- **`newsService.ts`** - Handles API requests for retrieving news articles.

---

### **5 - Type Definitions (`types/`)**
Defines all TypeScript types used across the API.

#### **Finance (`types/finance/`)**
- **`finance.ts`** - Defines base finance-related types.
- **`financeRequests.ts`** - Defines request parameter types for the Finance API.
- **`financeResponses.ts`** - Defines response types for the Finance API.
- **`financeMap.ts`** - Defines mapped response types for the Finance API.

#### **News (`types/news/`)**
- **`news.ts`** - Defines base news-related types.
- **`newsRequests.ts`** - Defines request parameter types for the News API.
- **`newsResponses.ts`** - Defines response types for the News API.
- **`newsMap.ts`** - Defines mapped response types for the News API.

---

### **6 - Utility Functions (`utils/`)**
Contains helper functions for error handling.

- **`ErrorHandler.ts`** - Centralized function for handling API request errors.
- **`FinanceErrorHandler.ts`** - Handles errors specific to the Finance API.
- **`NewsErrorHandler.ts`** - Handles errors specific to the News API.

---

## Usage Guide

To use the API services, import them in your application:

```ts
import { financeService } from '@/api/services/financeService';
import { newsService } from '@/api/services/newsService';

// Fetching financial data
const stockData = await financeService.getQuote({ symbol: 'AAPL' });

// Fetching top headlines
const headlines = await newsService.getTopHeadlines({ country: 'us' });

console.log(stockData, headlines);
```

---

## 🛠 Technologies Used
- **TypeScript** - For strong typing and maintainability.
- **Axios** - HTTP client for making API requests.
- **Pinia** - Used in `ErrorHandler.ts` for global error management.

---

## Summary
This API module is structured for **scalability, readability, and maintainability**. Each subfolder serves a dedicated purpose, ensuring modularity and reusability.
