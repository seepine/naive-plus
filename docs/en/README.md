---
home: true
title: Home
heroImage: logo.png
lang: en-US
actions:
  - text: Get Started
    link: /en/form/base/
    type: primary

features:
- title: Rapid Development
  details: A configuration-driven approach that lets every UI element be defined through options.
- title: Minimal Code
  details: Embrace the principle of minimal abstraction and the least code, completing tedious CRUD in seconds.
- title: Best Practices
  details: Best practice code is provided so every developer can use it the right way.
footer: MIT Licensed | Copyright © 2026 seepine 
---


## Quick Start

### 1. Install naive-ui

> `naive-plus` is built on top of [naiveUI](https://www.naiveui.com/en-US/os-theme/docs/installation)

```shell
npm i naive-ui -D
```

### 2. Install naive-plus

```shell
npm i naive-plus -D
```

### 3. Install unplugin

Use `unplugin-vue-components` and `unplugin-auto-import` to enable on-demand import and auto-import.

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

### 4. On-demand Import

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
        // On-demand import
        NaivePlusResolver(),
      ],
    }),
  ],
};
```

### 5. Usage

```vue
<np-button>Button</np-button>
```
