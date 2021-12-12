import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer()
  ],
  build: {
    rollupOptions: {
      external: ['element-plus', '@element-plus/icons', 'vue', 'axios', 'vue-router']
    }
  }
})
