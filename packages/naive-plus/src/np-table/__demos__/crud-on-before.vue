<template>
  <div>
    <n-space vertical>
      <n-alert type="info">
        onBefore 控制：
        <n-radio-group v-model:value="mode">
          <n-radio value="normal">正常打开</n-radio>
          <n-radio value="block">阻断（返回 false）</n-radio>
          <n-radio value="replace">
            替换数据（修改地址为「已覆盖地址」）
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
        // 返回 false 阻断操作，弹窗不打开
        return false
      }
      if (mode.value === 'replace' && type === 'edit') {
        // 返回新对象替换初始数据
        return { ...rowData, address: '已覆盖地址' }
      }
      // 返回 undefined / void 则正常打开
    },
  },
}
</script>
