---
url: /table/display/index.md
---
# 显隐控制

`np-table` 支持表格列与表单字段的显隐控制，分别通过列的 `display` 与 `formProps.display` 配置。

## 表格列隐藏

通过列的 `display` 控制表格列是否显示，默认为 `true`。设置为 `false` 的列会在表格中**彻底隐藏**，也不会出现在右上角的「显示设置」中，常用于只在新增 / 编辑表单中使用的字段。

```vue
<template>
  <np-table :option="option" />
</template>

<script setup lang="ts">
import type { TableOption } from 'naive-plus'

type User = {
  id: number
  name: string
  age: number
  address: string
  email: string
  remark?: string
}

const mockData: User[] = [
  {
    id: 1,
    name: 'John',
    age: 30,
    address: 'New York',
    email: 'john@example.com',
    remark: 'VIP 用户',
  },
  {
    id: 2,
    name: 'Jane',
    age: 25,
    address: 'Los Angeles',
    email: 'jane@example.com',
    remark: '普通用户',
  },
  {
    id: 3,
    name: 'Bob',
    age: 35,
    address: 'Chicago',
    email: 'bob@example.com',
  },
]

const option: TableOption<User> = {
  columns: [
    {
      key: 'name',
      label: '姓名',
      formProps: { type: 'input' },
    },
    {
      key: 'age',
      label: '年龄',
      formProps: { type: 'number' },
    },
    {
      key: 'address',
      label: '地址',
      formProps: { type: 'input' },
    },
    {
      key: 'email',
      label: '邮箱',
      // display: false 表示该列在表格中彻底隐藏，
      // 常用于只在新增 / 编辑表单中使用的字段
      display: false,
      formProps: { type: 'input' },
    },
    {
      key: 'remark',
      label: '备注',
      // 表格中不显示
      display: false,
      formProps: {
        type: 'input',
        // 新增表单中也不显示，仅在编辑表单中显示
        addProps: { display: false },
      },
    },
  ],
  api: {
    fetch: async ({ page, pageSize }) => {
      return {
        items: mockData.slice((page - 1) * pageSize, page * pageSize),
        itemCount: mockData.length,
      }
    },
    add: async rowData => {
      mockData.unshift({ ...rowData, id: mockData.length + 1 })
    },
    edit: async rowData => {
      const idx = mockData.findIndex(item => item.id === rowData.id)
      if (idx !== -1) {
        mockData[idx] = { ...mockData[idx], ...rowData }
      }
    },
    del: async rowData => {
      const idx = mockData.findIndex(item => item.id === rowData.id)
      if (idx !== -1) {
        mockData.splice(idx, 1)
      }
    },
  },
}
</script>
```

> 表格右上角的「显示设置」可动态切换列的显示 / 隐藏（针对未设置 `display: false` 的列），且至少会保留一列显示。

结合 `formProps.addProps` / `formProps.editProps`，还可以让字段只在某个操作模式下显示。例如“只在编辑时有的字段”（表格与新增表单均不显示）：

```ts
{
  key: 'remark',
  label: '备注',
  display: false, // 表格中彻底隐藏
  formProps: {
    type: 'input',
    addProps: { display: false }, // 新增表单中也隐藏，仅编辑表单显示
  },
}
```

> 上方「表格列隐藏」示例中的「备注」字段即为该用法，点击「编辑」可见、点击「添加」不可见。

## 表单字段显隐

CRUD 表单字段的显隐通过列的 `formProps.display` 控制，支持布尔值或函数。函数会接收当前表单数据，可根据其他字段动态显隐。

```vue
<template>
  <np-table :option="option" />
</template>

<script setup lang="ts">
import type { TableOption } from 'naive-plus'

type User = {
  id: number
  name: string
  gender: 'man' | 'feman'
  age: number
  address: string
}

const mockData: User[] = [
  { id: 1, name: 'John', gender: 'man', age: 30, address: 'New York' },
  { id: 2, name: 'Jane', gender: 'feman', age: 25, address: 'Los Angeles' },
  { id: 3, name: 'Bob', gender: 'man', age: 35, address: 'Chicago' },
]

const option: TableOption<User> = {
  columns: [
    {
      key: 'name',
      label: '姓名',
      formProps: { type: 'input' },
    },
    {
      key: 'gender',
      label: '性别',
      formProps: {
        type: 'radio',
        defaultValue: 'man',
        options: [
          { label: '男', value: 'man' },
          { label: '女', value: 'feman' },
        ],
      },
    },
    {
      key: 'age',
      label: '年龄',
      formProps: {
        type: 'number',
        // 表单中性别为「男」时才显示
        display: data => data.gender === 'man',
      },
    },
    {
      key: 'address',
      label: '地址',
      formProps: { type: 'input' },
    },
  ],
  api: {
    fetch: async ({ page, pageSize }) => {
      return {
        items: mockData.slice((page - 1) * pageSize, page * pageSize),
        itemCount: mockData.length,
      }
    },
    add: async rowData => {
      mockData.unshift({ ...rowData, id: mockData.length + 1 })
    },
    edit: async rowData => {
      const idx = mockData.findIndex(item => item.id === rowData.id)
      if (idx !== -1) {
        mockData[idx] = { ...mockData[idx], ...rowData }
      }
    },
    del: async rowData => {
      const idx = mockData.findIndex(item => item.id === rowData.id)
      if (idx !== -1) {
        mockData.splice(idx, 1)
      }
    },
  },
}
</script>
```

## 类型定义

### TableColumn.display

| 属性    | 说明       | 类型      | 默认值 |
| ------- | ---------- | --------- | ------ |
| display | 是否在表格中显示该列，`false` 表示彻底隐藏 | `boolean` | true   |

### TableColumn.formProps.display

| 属性    | 说明           | 类型                          | 默认值 |
| ------- | -------------- | ----------------------------- | ------ |
| display | 表单字段是否显示 | `boolean / (data) => boolean` | true   |
