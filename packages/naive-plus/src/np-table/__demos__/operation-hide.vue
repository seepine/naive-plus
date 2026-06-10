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
