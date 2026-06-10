<template>
  <div>
    <n-alert v-if="lastKey" type="success" style="margin-bottom: 12px">
      onSelect 触发，key =
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
  operation: {
    label: '操作',
    // 自定义下拉菜单选项，使用内置 type 可复用默认编辑/删除逻辑
    options: [
      { type: 'edit' },
      { type: 'del', label: '删除(危险)' },
      { key: 'detail', label: '详情' },
      { key: 'export', label: '导出' },
    ],
    // 处理自定义选项的点击事件，内置 edit/delete 会优先触发 onBefore，不经过此回调
    onSelect: key => {
      lastKey.value = key
    },
  },
}
</script>
