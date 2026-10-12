---
url: /table/slot/index.md
---
# np-table 插槽

通过插槽在表格顶部、底部插入自定义内容。

## 顶部插槽

* `headerLeft`：顶部左侧内容，位于表格上方最左侧
* `headerRight`：顶部右侧内容，渲染在「添加」按钮及筛选、显隐、刷新等操作按钮之前

## 底部插槽

* `footerLeft`：底部左侧内容，与分页器处于同一行

```vue
<template>
  <np-table :option="option">
    <template #headerLeft>
      <n-text strong style="font-size: 16px">用户列表</n-text>
    </template>
    <template #headerRight>
      <n-button secondary @click="handleExport">导出</n-button>
    </template>
    <template #footerLeft>
      <n-text depth="3">共 {{ total }} 条数据</n-text>
    </template>
  </np-table>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import type { TableOption } from 'naive-plus'

type User = {
  id: number
  name: string
  age: number
  address: string
}

const message = useMessage()

const mockData: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  age: 20 + (i % 30),
  address: `城市 ${i + 1}`,
}))

const total = mockData.length

const option: TableOption<User> = {
  columns: [
    { key: 'name', label: '姓名' },
    { key: 'age', label: '年龄' },
    { key: 'address', label: '地址' },
  ],
  api: {
    fetch: async ({ page, pageSize }) => {
      return {
        items: mockData.slice((page - 1) * pageSize, page * pageSize),
        itemCount: mockData.length,
      }
    },
  },
}

const handleExport = () => {
  message.success(`导出 ${total} 条数据`)
}
</script>
```

## 插槽列表

| 名称        | 说明                                                       |
| ----------- | ---------------------------------------------------------- |
| headerLeft  | 顶部左侧插槽                                               |
| headerRight | 顶部右侧插槽，渲染在「添加」按钮及筛选、显隐、刷新按钮之前 |
| footerLeft  | 底部左侧插槽，与分页器处于同一行                           |

## option.slots

除组件插槽外，也可通过 `option.slots` 配置相同位置的内容；两者同时存在时，**`option.slots` 优先**。

```ts
import { h } from 'vue'
import { NButton } from 'naive-ui'
import type { TableOption } from 'naive-plus'

const option: TableOption = {
  // ...
  slots: {
    headerLeft: () => h('span', '用户列表'),
    headerRight: () =>
      h(NButton, { secondary: true }, { default: () => '导出' }),
    footerLeft: () => h('span', '共 100 条数据'),
  },
}
```

### TableSlotOption

| 属性        | 说明                                 | 类型               |
| ----------- | ------------------------------------ | ------------------ |
| headerLeft  | 顶部左侧内容，优先级高于同名组件插槽 | `() => VNodeChild` |
| headerRight | 顶部右侧内容，优先级高于同名组件插槽 | `() => VNodeChild` |
| footerLeft  | 底部左侧内容，优先级高于同名组件插槽 | `() => VNodeChild` |
