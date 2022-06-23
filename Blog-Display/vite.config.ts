import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/')) {
            if (id.includes('/vuex/') || id.includes('/vue-router/') || id.includes('/vue/')) {
              return 'va';
            } else if (id.includes('/element-plus/')) {
              return 'ep';
            } else if (id.includes('/@element-plus/icons/')) {
              return 'epi';
            } else if (id.includes('/lodash') || id.includes('/qrcode/')) {
              return 'lq';
            } else if (id.includes('/axios/')) {
              return 'a';
            } else {
              return "o";
            }
          } else if (id.includes('/view/Home/index.vue')) {
            return 'h';
          }
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        // warnings: false,
        drop_console: true,  //打包时删除console
        drop_debugger: true, //打包时删除 debugger
        pure_funcs: ['console.log'],
      },
      output: {
        // 去掉注释内容
        comments: true,
      },
    },
  }
})
