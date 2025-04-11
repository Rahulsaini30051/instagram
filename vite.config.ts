// vite.config.ts
import { defineConfig } from 'vitest/config'; // ✅ use this instead of 'vite'

export default defineConfig({
  // your Vite config here (plugins, etc.)

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./jest.setup.ts'], // or './src/setupTests.ts' based on your file
  },
});
