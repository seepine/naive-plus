# naive-plus

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
    // ...
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
