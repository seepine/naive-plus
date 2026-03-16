---
home: true
title: 首页
heroImage: logo.png
actions:
  - text: 开始使用
    link: /form/base/
    type: primary

features:
- title: 快速开发
  details: 坚实贯彻配置驱动视图的思想，落实万物皆可 option。
- title: 极简代码
  details: 坚决贯彻极简封装和最少代码原则，让枯燥的crud在几秒内即可完成。
- title: 最佳实践
  details: 提供最佳实践代码，让每一位开发者都能以正确的姿势来使用 carton ui。
footer: MIT Licensed | Copyright © 2025 seepine 
---


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

import { NaivePlusResolver } from 'naive-plus/lib/resolver'

export default {
  plugins: [
    // ...
    AutoImport({
       imports: ['vue'],
    }),
    Components({
      resolvers: [
         // 添加按需引入
        NaiveUiResolver(),
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
