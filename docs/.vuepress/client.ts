import { defineClientConfig } from '@vuepress/client'
import NaiveUi from 'naive-ui'
import { onMounted } from 'vue'
import Layout from './layouts/Layout.vue'
import './configs/styles/index.scss'

// 引入组件库的少量全局样式变量
import Ui from '../../packages/naive-plus/src'
import '../../packages/naive-plus/src/index.scss'

export default defineClientConfig({
  layouts: {
    Layout,
  },
  enhance({ app }) {
    app.use(NaiveUi)
    app.use(Ui)
  },
  setup() {
    onMounted(() => {
      const htmlEl = document.documentElement
      const changeTheme = () => {
        const isDark = htmlEl.classList.contains('dark')
        if (isDark) {
          htmlEl.setAttribute('theme-mode', 'dark')
        } else {
          htmlEl.removeAttribute('theme-mode')
        }
      }

      const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.attributeName === 'class') {
            changeTheme()
          }
        })
      })
      observer.observe(htmlEl, { attributes: true })
      // 手动触发一次
      changeTheme()
    })
  },
})
