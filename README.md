# Hexagon Labs - Creator Platform

A modern creator platform built with React, TypeScript, and Vite, featuring AI-powered content creation tools integrated with Google Gemini AI.

## Features

- **Creator Dashboard**: Central hub for managing your creator business
- **Brand Marketplace**: Discover and apply for brand campaigns
- **Content Creation Studio**: AI-powered tools for content creation
- **Earnings Analytics**: Track your performance and earnings
- **AI Tools Integration**: Powered by Google Gemini AI

## AI Tools (Powered by Gemini)

The platform includes several AI-powered tools:

- **Script Generator**: Create professional video scripts
- **Content Ideas**: Generate creative content suggestions
- **Hashtag Generator**: Optimize your content with relevant hashtags
- **Content Analyzer**: Analyze content for engagement potential

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your Gemini API key:
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a `.env` file in the root directory
   - Add your API key:
     ```
     VITE_GEMINI_API_KEY=your_gemini_api_key_here
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Google Gemini AI

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
"# hexagon-labs-experiment" 
