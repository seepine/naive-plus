<template>
  <div>
    <n-space style="margin-bottom: 12px">
      <n-tag
        v-for="key in checkedRowKeys"
        :key="key"
        type="primary"
        closable
        @close="removeKey(key)"
      >
        ID: {{ key }}
      </n-tag>
      <n-text v-if="checkedRowKeys.length === 0" depth="3">
        No selected rows
      </n-text>
    </n-space>
    <np-table :option="option" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TableOption } from 'naive-plus'
import type { DataTableRowKey } from 'naive-ui'

const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  age: 20 + (i % 30),
  address: `City ${i + 1}`,
}))

const checkedRowKeys = ref<DataTableRowKey[]>([])

const removeKey = (key: DataTableRowKey) => {
  checkedRowKeys.value = checkedRowKeys.value.filter(k => k !== key)
}

const option = computed<TableOption>(() => ({
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'address', label: 'Address' },
  ],
  selection: {
    onChange: (keys, rows, meta) => {
      checkedRowKeys.value = keys
      console.log(keys, rows, meta)
    },
  },
  api: {
    fetch: async ({ page, pageSize }) => {
      return {
        items: mockData.slice((page - 1) * pageSize, page * pageSize),
        itemCount: mockData.length,
      }
    },
  },
}))
</script>
