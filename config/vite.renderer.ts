import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.join(__dirname, '../src/renderer'),
  plugins: [react()],
  base: './',
  build: {
    emptyOutDir: true,
    minify: false,
    outDir: '../dist/renderer',
  },
});
