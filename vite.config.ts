import { defineConfig } from 'vite';
import { resolve } from 'path';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
