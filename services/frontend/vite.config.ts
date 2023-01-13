import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts';

export default defineConfig({

  plugins: [
    vue(),
    WindiCSS({
      scan: {
        dirs: ['.'],
        fileExtensions: ['vue', 'js', 'ts'],
      },
    }),
    Pages({
      extensions: ['vue'],
    }),
    Layouts({ layoutsDirs: 'src/layouts', defaultLayout: 'default' }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core', 'vuex'],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      dirs: ['src/**/components'],
      extensions: ['vue'],
      deep: true,
      dts: 'src/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/],
      // custom resolvers

    }),
  ],
  server: {
    host: true,
    port: 8080,

  }
})
