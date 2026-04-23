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
    { key: 'name', title: '姓名' },
    { key: 'age', title: '年龄' },
    { key: 'status', title: '状态' },
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

      return {
        items: items.slice((page - 1) * pageSize, page * pageSize),
        itemCount: items.length,
      }
    },
  },
}
</script>
