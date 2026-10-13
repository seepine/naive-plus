---
url: /table/search/index.md
---
# np-table 搜索

通过 `search` 配置表格搜索框，搜索框渲染在表格顶部最左侧（`headerLeft` 区域），与 `headerLeft` 插槽内容并存。

```vue
<template>
  <np-table :option="option" />
</template>

<script setup lang="ts">
import type { TableOption } from 'naive-plus'

const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  age: 20 + (i % 30),
  status: i % 3 === 0 ? 'enabled' : i % 3 === 1 ? 'disabled' : 'pending',
}))

const option: TableOption = {
  columns: [
    { key: 'name', label: '姓名' },
    { key: 'age', label: '年龄' },
    { key: 'status', label: '状态' },
  ],
  search: {
    key: 'keyword',
    placeholder: '搜索姓名',
  },
  api: {
    fetch: async ({ page, pageSize }, queryParams) => {
      await new Promise<void>(resolve => setTimeout(resolve, 500))

      let items = [...mockData]

      // 根据搜索关键词过滤
      if (queryParams.keyword) {
        items = items.filter(item => item.name.includes(queryParams.keyword))
      }

      return {
        items: items.slice((page - 1) * pageSize, page * pageSize),
        itemCount: items.length,
      }
    },
  },
}
</script>
```

## 基础用法

```ts
import type { TableOption } from 'naive-plus'

const option: TableOption = {
  columns: [
    { key: 'name', label: '姓名' },
    { key: 'age', label: '年龄' },
  ],
  search: {
    key: 'keyword',
    placeholder: '搜索姓名',
  },
  api: {
    fetch: async ({ page, pageSize }, { keyword }) => {
      // keyword 即搜索框输入值
      return { items: [], itemCount: 0 }
    },
  },
}
```

搜索值会以 `search.key`（默认 `keyword`）为字段名，合并进 `api.fetch` 的第二个参数，与 `filters`、`tableRef.params` 共存。输入框清空后该字段会被移除。

## 自动搜索

输入框监听值变化并自动触发搜索，无需回车或点击。通过 `debounce` 控制防抖时间（默认 300ms），避免连续输入时频繁请求。

```ts
const option: TableOption = {
  // ...
  search: {
    debounce: 500,
  },
}
```

## 类型定义

```ts
import type { TableSearchOption } from 'naive-plus'
```

### TableSearchOption

| 属性        | 说明                                         | 类型               | 默认值             |
| ----------- | -------------------------------------------- | ------------------ | ------------------ |
| key         | 提交给 `api.fetch` 的查询参数名              | string             | `keyword`          |
| placeholder | 输入框占位文本                               | string             | `请输入关键词搜索` |
| width       | 输入框宽度                                   | `string \| number` | `220`              |
| clearable   | 是否可清空                                   | boolean            | `true`             |
| debounce    | 输入防抖时间（毫秒），停止输入后自动触发搜索 | number             | `300`              |
| props       | 透传给 `n-input` 的其他属性                  | `InputProps`       | -                  |
