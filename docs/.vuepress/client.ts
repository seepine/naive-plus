import { defineClientConfig } from '@vuepress/client'
import NaiveUi from 'naive-ui'
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
  setup() {},
})
