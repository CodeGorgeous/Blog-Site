import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';
import externalGlobals from 'rollup-plugin-external-globals'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer()
  ],
  build: {
    rollupOptions: {
      external: ['element-plus', 'vue', 'axios'],
      plugins: [
        externalGlobals({
          vue: 'Vue',
          'element-plus': 'ElementPlus',
          'axios': 'axios'
        })
      ],
    }
  }
})
