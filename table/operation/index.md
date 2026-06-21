---
url: /table/operation/index.md
---
# 自定义操作列

通过 `operation` 配置项灵活控制操作列的显示与行为。

## 隐藏操作列

将 `operation` 设为 `false`，同时隐藏操作列和顶部「添加」按钮。

```vue
<template>
  <np-table :option="option" />
</template>

<script setup lang="ts">
import type { TableOption } from 'naive-plus'

type User = { id: number; name: string; age: number; address: string }

const mockData: User[] = [
  { id: 1, name: 'John', age: 30, address: 'New York' },
  { id: 2, name: 'Jane', age: 25, address: 'Los Angeles' },
  { id: 3, name: 'Bob', age: 35, address: 'Chicago' },
]

const option: TableOption<User> = {
  columns: [
    { key: 'name', label: '姓名' },
    { key: 'age', label: '年龄' },
    { key: 'address', label: '地址' },
  ],
  api: {
    fetch: async ({ page, pageSize }) => ({
      items: mockData.slice((page - 1) * pageSize, page * pageSize),
      itemCount: mockData.length,
    }),
  },
  // 设置 false 隐藏操作列，同时隐藏顶部添加按钮
  operation: false,
}
</script>
```

## 前后插槽

通过 `prefixRender` 和 `suffixRender` 在默认操作按钮的前后插入自定义内容。

```vue
<template>
  <np-table :option="option" />
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NButton } from 'naive-ui'
import type { TableOption } from 'naive-plus'

type User = { id: number; name: string; age: number; address: string }

const mockData: User[] = [
  { id: 1, name: 'John', age: 30, address: 'New York' },
  { id: 2, name: 'Jane', age: 25, address: 'Los Angeles' },
  { id: 3, name: 'Bob', age: 35, address: 'Chicago' },
]

const option: TableOption<User> = {
  columns: [
    { key: 'name', label: '姓名' },
    { key: 'age', label: '年龄' },
    { key: 'address', label: '地址' },
  ],
  api: {
    fetch: async ({ page, pageSize }) => ({
      items: mockData.slice((page - 1) * pageSize, page * pageSize),
      itemCount: mockData.length,
    }),
  },
  operation: {
    label: '操作',
    width: 200,
    // 操作按钮前插入自定义内容
    prefixRender: rowData =>
      h(
        NButton,
        { size: 'small', type: 'info', style: 'margin-right:4px' },
        () => `查看 #${rowData.id}`
      ),
    // 操作按钮后插入自定义内容
    suffixRender: rowData =>
      h(
        NButton,
        { size: 'small', type: 'warning', style: 'margin-left:4px' },
        () => `日志`
      ),
  },
}
</script>
```

## 自定义选项与 onSelect

通过 `options` 配置下拉菜单选项，使用 `onSelect` 处理自定义项的点击事件。

* `{ type: 'edit' }` / `{ type: 'del' }` 会复用内置的编辑/删除逻辑（触发 `onBefore`、弹窗等）
* 自定义 `key` 的选项点击后触发 `onSelect` 回调

```vue
<template>
  <div>
    <n-alert v-if="lastKey" type="success" style="margin-bottom: 12px">
      onSelect 触发，key =
      <strong>{{ lastKey }}</strong>
    </n-alert>
    <np-table :option="option" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NAlert } from 'naive-ui'
import type { TableOption } from 'naive-plus'

type User = { id: number; name: string; age: number; address: string }

const lastKey = ref('')

const mockData: User[] = [
  { id: 1, name: 'John', age: 30, address: 'New York' },
  { id: 2, name: 'Jane', age: 25, address: 'Los Angeles' },
  { id: 3, name: 'Bob', age: 35, address: 'Chicago' },
]

const option: TableOption<User> = {
  columns: [
    { key: 'name', label: '姓名' },
    { key: 'age', label: '年龄' },
    { key: 'address', label: '地址' },
  ],
  api: {
    fetch: async ({ page, pageSize }) => ({
      items: mockData.slice((page - 1) * pageSize, page * pageSize),
      itemCount: mockData.length,
    }),
  },
  operation: {
    label: '操作',
    // 自定义下拉菜单选项，使用内置 type 可复用默认编辑/删除逻辑
    options: [
      { type: 'edit' },
      { type: 'del', label: '删除(危险)' },
      { key: 'detail', label: '详情' },
      { key: 'export', label: '导出' },
    ],
    // 处理自定义选项的点击事件，内置 edit/delete 会优先触发 onBefore，不经过此回调
    onSelect: key => {
      lastKey.value = key
    },
  },
}
</script>
```

## 类型定义

### operation

```ts
operation?:
  | false
  | {
      label?: string
      width?: number | string
      prefixRender?: (rowData: T, rowIndex: number) => VNode
      suffixRender?: (rowData: T, rowIndex: number) => VNode
      options?: TableOperationOption[]
      onSelect?: (key: string) => void | boolean
      onBefore?: (rowData: T, type: 'add' | 'edit' | 'del') => boolean | T | void | Promise<...>
    }
```

### TableOperationOption

| 字段 | 说明 | 类型 |
| --- | --- | --- |
| `type` | 使用内置类型，复用编辑/删除逻辑 | `'edit'` | `'del'` |
| `key` | 自定义选项标识，触发 `onSelect` 回调 | `string \| number` |
| `label` | 自定义选项显示文字 | `string \| (() => VNode)` |

> 可同时混合内置 type 与自定义 key，例如 `[{ type: 'edit' }, { type: 'del' }, { key: 'export', label: '导出' }]`。
