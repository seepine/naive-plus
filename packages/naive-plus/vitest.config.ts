import { defineConfig } from 'vitest/config'
import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDefineOptions from 'unplugin-vue-define-options/vite'

// https://cn.vitest.dev/config/
export default defineConfig({
  plugins: [vueDefineOptions() as unknown as PluginOption, vue(), vueJsx()],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    clearMocks: true,
    environment: 'happy-dom',
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
})
