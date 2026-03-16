import { defaultTheme, defineUserConfig, viteBundler } from 'vuepress'
import vueDefineOptions from 'unplugin-vue-define-options/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as navbar from './configs/navbar'
import * as sidebar from './configs/sidebar'
import { codeBlockPlugin } from './plugins'

export default defineUserConfig({
  base: '/',

  pagePatterns: [
    '**/*.md',
    '!.vuepress',
    '!node_modules',
    '../packages/naive-plus/src/**/*.md',
    '!../packages/**/node_modules',
  ],

  head: [['link', { rel: 'icon', href: '/favicon.png' }]],

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'NaivePlus',
      description: '一个基于 Vue3 和 NaiveUI 的组件库',
    },
    // '/en/': {
    //   lang: 'en-US',
    //   title: 'NaivePlus',
    //   description: 'A component library based on Vue3 and NaiveUI',
    // },
  },

  bundler: viteBundler({
    viteOptions: {
      // @ts-ignore
      plugins: [vueDefineOptions(), vueJsx()],
      ssr: {
        noExternal: ['naive-ui', 'vueuc', '@css-render/vue3-ssr'],
      },
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
          },
        },
      },
    },
    vuePluginOptions: {},
  }),

  theme: defaultTheme({
    // @ts-ignore
    logo: '/logo.png',

    repo: 'https://github.com/seepine/naive-plus',

    locales: {
      '/': {
        navbar: navbar.zh,
        sidebar: sidebar.zh,
        sidebarDepth: 1,
        // selectLanguageName: '简体中文',
        // selectLanguageText: '选择语言',
        // selectLanguageAriaLabel: '选择语言',
      },
      // '/en/': {
      //   navbar: navbar.en,
      //   sidebar: sidebar.en,
      //   sidebarDepth: 1,
      //   selectLanguageName: 'English',
      //   selectLanguageText: 'Choose Language',
      //   selectLanguageAriaLabel: 'Choose Language',
      // },
    },
  }),

  plugins: [
    // custom plugin
    codeBlockPlugin(),
  ],
})
