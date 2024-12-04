import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom', 
    globals: true,
    setupFiles: '__tests__/setup.ts', 
    //include: [path.resolve(__dirname, './__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}')],
  },
  resolve: {
    alias: {
      '@/components/ui/button': path.resolve(__dirname, './components/ui/button.tsx'),
    },
  },
  
});
