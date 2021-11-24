import path from 'path'
import { builtinModules } from 'module'
import { defineConfig } from 'vite'
import isDev from 'electron-is-dev'

export default defineConfig({
  mode: process.env.NODE_ENV,
  root: path.join(__dirname, '../src/main'),
  build: {
    outDir: '../../dist/main',
    lib: {
      entry: 'index.ts',
      formats: ['cjs']
    },
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      external: [ ...builtinModules, 'electron' ],
      output: {
        entryFileNames: '[name].cjs'
      }
    }
  } 
})
