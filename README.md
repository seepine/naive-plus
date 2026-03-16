<h1 align="center" style="text-align:center;">
<img src="https://naiveplus.seepine.com/logo.png" width="128" />
<br />
Naive Plus
</h1>
<p align="center">
  <br/>
  一个基于 Vue3 和 NaiveUI 的组件库，旨在将逻辑都包装起来，开发者只需要通过配置即可实现复杂的业务功能
</p>
<p align="center">
	<a href="https://naiveplus.seepine.com/">https://naiveplus.seepine.com</a>
</p>

<p align="center">
  <a target="_blank" href="https://cn.vuejs.org/">
    <img src="https://img.shields.io/badge/Vue-3.3+-green.svg" alt="vue3+" />
  </a>
  <a target="_blank" href="https://www.naiveui.com/zh-CN/os-theme/docs/installation">
    <img src="https://img.shields.io/badge/NaiveUI-2.43.0+-green.svg" alt="NaiveUI-2.43.0+" />
  </a>
  <a target="_blank" href="https://github.com/seepine/naive-plus/blob/main/LICENSE">
    <img src="https://img.shields.io/:license-MIT-blue.svg" alt="MIT" />
  </a>
  <a target="_blank" href='https://github.com/seepine/naive-plus/stargazers'>
		<img src="https://img.shields.io/github/stars/seepine/naive-plus.svg?logo=github" alt="github star"/>
	</a>
</p>

## 一、快速入门

### 1. 安装 naive-ui

> `naive-plus` 基于 [naiveUI](https://www.naiveui.com/zh-CN/os-theme/docs/installation) 封装

```shell
npm i naive-ui -D
```

### 2. 安装 naive-plus

```shell
npm i naive-plus -D
```

### 3. 安装 unplugin

通过 `unplugin-vue-components` 和 `unplugin-auto-import` 来实现按需引入和自动导入

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

### 4. 按需引入

```js
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

import { NaivePlusResolver } from 'naive-plus/resolver'

export default {
  plugins: [
    AutoImport({
       imports: ['vue'],
    }),
    Components({
      resolvers: [
        NaiveUiResolver(),
        // 添加按需引入
        NaivePlusResolver(),
      ],
    }),
  ],
};
```

### 5. 使用

```vue
<np-button>按钮</np-button>
```
