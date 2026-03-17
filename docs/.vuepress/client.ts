import { defineClientConfig } from '@vuepress/client'
import NaiveUi from 'naive-ui'
import Ui from '../../packages/naive-plus/src'
import Layout from './layouts/Layout.vue'
import './configs/styles/index.scss'

// 引入组件库的少量全局样式变量
import 'naive-plus/index.css'

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
