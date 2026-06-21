---
url: /table/selection/index.md
---
# np-table 多选

在 `columns` 中添加 `type: 'selection'` 列开启多选，通过 `option.props` 传入 `checkedRowKeys` 和 `onUpdateCheckedRowKeys` 控制选中状态。

> 注意：需将 `option` 定义为 `computed`，以保证 `checkedRowKeys` 的响应式更新能同步到表格。

```vue
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
      <n-text v-if="checkedRowKeys.length === 0" depth="3">暂无选中行</n-text>
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
  name: `用户 ${i + 1}`,
  age: 20 + (i % 30),
  address: `城市 ${i + 1}`,
}))

const checkedRowKeys = ref<DataTableRowKey[]>([])

const removeKey = (key: DataTableRowKey) => {
  checkedRowKeys.value = checkedRowKeys.value.filter(k => k !== key)
}

const option = computed<TableOption>(() => ({
  columns: [
    { key: 'name', label: '姓名' },
    { key: 'age', label: '年龄' },
    { key: 'address', label: '地址' },
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
```
