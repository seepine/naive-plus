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
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'address', label: 'Address' },
  ],
  api: {
    fetch: async ({ page, pageSize }) => ({
      items: mockData.slice((page - 1) * pageSize, page * pageSize),
      itemCount: mockData.length,
    }),
  },
  operation: {
    label: 'Actions',
    width: 200,
    // insert custom content before the action buttons
    prefixRender: rowData =>
      h(
        NButton,
        { size: 'small', type: 'info', style: 'margin-right:4px' },
        () => `View #${rowData.id}`
      ),
    // insert custom content after the action buttons
    suffixRender: rowData =>
      h(
        NButton,
        { size: 'small', type: 'warning', style: 'margin-left:4px' },
        () => `Logs`
      ),
  },
}
</script>
