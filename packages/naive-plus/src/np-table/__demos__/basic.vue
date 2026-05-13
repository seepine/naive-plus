<template>
  <np-table :option="option" />
</template>

<script setup lang="ts">
import type { TableOption } from 'naive-plus'

// Mock API
const mockData = [
  { id: 1, name: 'John', age: 30, address: 'New York' },
  { id: 2, name: 'Jane', age: 25, address: 'Los Angeles' },
  { id: 3, name: 'Bob', age: 35, address: 'Chicago' },
]
for (let i = 4; i <= 100; i++) {
  mockData.push({
    id: i,
    name: `User ${i}`,
    age: 20 + (i % 30),
    address: `City ${i}`,
  })
}
const option: TableOption = {
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'address', label: 'Address' },
  ],
  api: {
    fetch: async ({ page, pageSize }) => {
      await new Promise<void>(resolve => setTimeout(resolve, 500)) // 模拟网络延迟
      return {
        items: mockData.slice((page - 1) * pageSize, page * pageSize),
        itemCount: mockData.length,
      }
    },
  },
}
</script>
