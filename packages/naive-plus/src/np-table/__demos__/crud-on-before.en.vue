<template>
  <div>
    <n-space vertical>
      <n-alert type="info">
        onBefore control:
        <n-radio-group v-model:value="mode">
          <n-radio value="normal">Open normally</n-radio>
          <n-radio value="block">Block (return false)</n-radio>
          <n-radio value="replace">
            Replace data (overwrite the address to "Overwritten Address")
          </n-radio>
        </n-radio-group>
      </n-alert>
      <np-table :option="option" />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NAlert, NRadio, NRadioGroup, NSpace } from 'naive-ui'
import type { TableOption } from 'naive-plus'

type User = {
  id: number
  name: string
  age: number
  address: string
}

const mode = ref<'normal' | 'block' | 'replace'>('normal')

const mockData: User[] = [
  { id: 1, name: 'John', age: 30, address: 'New York' },
  { id: 2, name: 'Jane', age: 25, address: 'Los Angeles' },
  { id: 3, name: 'Bob', age: 35, address: 'Chicago' },
]

const option: TableOption<User> = {
  columns: [
    {
      key: 'name',
      label: 'Name',
      formProps: { type: 'input' },
    },
    {
      key: 'age',
      label: 'Age',
      formProps: { type: 'number' },
    },
    {
      key: 'address',
      label: 'Address',
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
  operation: {
    onBefore: async (rowData, type) => {
      if (mode.value === 'block') {
        // return false to block the action, the dialog will not open
        return false
      }
      if (mode.value === 'replace' && type === 'edit') {
        // return a new object to replace the initial data
        return { ...rowData, address: 'Overwritten Address' }
      }
      // return undefined / void to open normally
    },
  },
}
</script>
