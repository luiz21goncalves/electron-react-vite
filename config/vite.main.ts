import path from 'path';
import { builtinModules } from 'module';
import { defineConfig } from 'vite';

export default defineConfig({
  mode: process.env.NODE_ENV,
  root: path.join(__dirname, '../packages/main'),
  build: {
    outDir: '../../dist/main',
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
    },
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      external: [...builtinModules, 'electron'],
      output: {
        entryFileNames: '[name].cjs',
      },
    },
  },
});
