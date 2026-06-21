---
url: /table/filter/index.md
---
# np-table 筛选

通过 `filters` 配置表格筛选器，支持单选/多选、搜索功能。

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
  filters: [
    {
      key: 'status',
      label: '状态',
      options: [
        { label: '启用', value: 'enabled' },
        { label: '禁用', value: 'disabled' },
        { label: '待处理', value: 'pending' },
      ],
      multiple: true,
    },
    {
      key: 'users',
      label: '用户',
      options: mockData.map(item => ({
        label: item.name,
        value: item.id,
      })),
      multiple: true,
      searchable: true,
    },
  ],
  api: {
    fetch: async ({ page, pageSize }, queryParams) => {
      await new Promise<void>(resolve => setTimeout(resolve, 500))

      let items = [...mockData]

      // 根据筛选条件过滤
      if (queryParams.status && queryParams.status.length > 0) {
        const statuses = Array.isArray(queryParams.status)
          ? queryParams.status
          : [queryParams.status]
        items = items.filter(item => statuses.includes(item.status))
      }
      // 根据筛选条件过滤
      if (queryParams.users && queryParams.users.length > 0) {
        const users = Array.isArray(queryParams.users)
          ? queryParams.users
          : [queryParams.users]
        items = items.filter(item => users.includes(item.id))
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

## 类型定义

```ts
import type { TableFilter } from 'naive-plus'
```

### TableFilter

| 属性       | 说明         | 类型                                   | 默认值 |
| ---------- | ------------ | ------------------------------------ | ------ |
| key        | 筛选字段名   | string                               | -      |
| label      | 筛选器标签   | string                               | -      |
| options    | 筛选选项列表 | `Array<{ label: string, value: any }>` | -      |
| multiple   | 是否支持多选 | boolean                              | false  |
| searchable | 是否可搜索   | boolean                              | false  |
