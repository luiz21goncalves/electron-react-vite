import path from 'path';
import { defineConfig } from 'vite';
import { builtinModules } from 'module';

export default defineConfig({
  mode: process.env.NODE_ENV,
  root: path.join(__dirname, '../packages/preload'),
  build: {
    outDir: '../../dist/preload',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
    },
    sourcemap: false,
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      external: [...builtinModules, 'electron'],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
  },
});
