<template>
  <div>
    <n-alert v-if="lastKey" type="success" style="margin-bottom: 12px">
      onSelect triggered, key =
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
    // custom dropdown menu options; using built-in type reuses the default edit/delete logic
    options: [
      { type: 'edit' },
      { type: 'del', label: 'Delete (Danger)' },
      { key: 'detail', label: 'Detail' },
      { key: 'export', label: 'Export' },
    ],
    // handle click on custom options; built-in edit/delete first trigger onBefore and bypass this callback
    onSelect: key => {
      lastKey.value = key
    },
  },
}
</script>
