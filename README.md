# React + TypeScript + Vite
# Run npm run dev
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js


---
## ✅ 2. Explanation of Design Choices (Performance & Scalability)

```markdown
## Design Choices & Optimizations

### 🧠 Component Architecture

- The app is split into reusable and clearly separated components:
  - `StoryList`: for displaying a list of stories.
  - `StoryViewer`: for rendering and navigating stories with video/image support.
- Components follow the **Single Responsibility Principle**, making them easy to test and maintain.

### ⚡ Performance Optimizations

- **Lazy loading of media** using `onLoad` and `onLoadedData` to handle loading states.
- **Media preload avoidance** — videos and images only load when needed to save memory.
- **Conditional rendering** of the `StoryViewer` to prevent unnecessary DOM updates.
- **Timeout cleanup** using `useEffect` cleanup functions to avoid memory leaks and race conditions.

### 🔁 Scalability Considerations

- The app is designed to work with a dynamic list of stories from JSON or future API integration.
- Media duration and story timers are abstracted to easily support custom durations, per-story configs, or future story types.

### 🧪 Testability

- Core logic (e.g., story navigation, timers, click handlers) is written in a way that makes it easy to write unit and integration tests.
- Testable hooks and deterministic behavior ensure minimal flakiness in tests.

export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
