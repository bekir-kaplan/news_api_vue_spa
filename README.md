# Vue.js News Website

A modern news website built with Vue.js, TypeScript, and Tailwind CSS. This application allows users to browse and search news articles using the NewsAPI.

## Features

- Browse latest news articles
- Search functionality with debouncing
- Responsive design with mobile-first approach
- Article detail view with full content
- Category-based navigation
- State management with Pinia
- Type-safe development with TypeScript
- CSS organization with component-based architecture

## Project Structure

```
src/
├── api/                    # API integration layer
│   ├── lib/               # Shared API utilities
│   ├── mappers/           # Data transformation
│   ├── services/          # API services
│   └── types/             # API type definitions
├── components/            # Reusable Vue components
├── mocks/                 # Mock data for development
│   └── newsapi/          # NewsAPI mock responses
├── router/               # Vue Router configuration
├── stores/               # Pinia state management
├── styles/               # CSS styles
│   ├── base/             # Base styles
│   ├── components/       # Component styles
│   └── layouts/          # Layout utilities
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── views/                # Page components
```

## Technology Stack

- **Vue.js 3**: Progressive JavaScript framework
- **TypeScript**: Static typing and enhanced IDE support
- **Pinia**: State management
- **Vue Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client
- **Vite**: Build tool and development server

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your NewsAPI key:
   ```
   VITE_NEWS_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

### API Integration

The project uses a robust API integration layer:
- `BaseService`: Abstract base class for HTTP requests
- `NewsService`: Handles all news-related API calls
- Type-safe responses with TypeScript interfaces
- Data transformation with dedicated mappers
- Mock data support for development

### Component Architecture

Components are organized into:
- Reusable UI components (`src/components/`)
- Page-level views (`src/views/`)
- Each component is self-contained with its own styles

### Styling

The project uses a component-based CSS architecture:
- Base styles for global defaults
- Component-specific styles
- Layout utilities
- All styles are organized in the `src/styles/` directory

### State Management

Pinia stores handle application state:
- `newsStore`: Manages news articles and search state
- Type-safe actions and state
- Centralized data management

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Lint code
- `npm run lint:check`: Check code for lint issues

## Best Practices

- Type-safe development with TypeScript
- Component composition with Vue 3 Composition API
- Responsive design patterns
- Clean code architecture
- Modular CSS organization
- Error handling and loading states
- Debounced search functionality

## Environment Variables

Required environment variables:
- `VITE_NEWS_API_KEY`: Your NewsAPI API key

## Browser Support

The application supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.