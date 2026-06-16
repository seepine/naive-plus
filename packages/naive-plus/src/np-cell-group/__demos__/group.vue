<script setup lang="tsx">
import { ref } from 'vue'
import { NpCellGroup } from '../index'
import type { NpCellGroupOption } from '../index'

const options = ref<NpCellGroupOption[]>([
  { label: '通知提醒' },
  { label: '声音' },
  { label: '震动' },
])

const navOptions: NpCellGroupOption[] = [
  { label: '个人信息', arrow: true, hover: true },
  {
    label: '账号安全',
    arrow: true,
    hover: true,
    description: '账号安全设置',
  },
  { label: '隐私设置', arrow: true, hover: true, value: '已设置' },
  {
    key: 'storage',
    label: '存储空间',
    arrow: true,
    hover: true,
    value: () => <span style="color: #18a058">storage</span>,
    footer: () => (
      <span style="font-size: 12px; color: #8a8a8a">支持渲染函数</span>
    ),
  },
]

const handleChange = (_keys: unknown[], item: NpCellGroupOption) => {
  console.log('changed:', item.label)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <NpCellGroup title="通知设置" :options="options" />
    <NpCellGroup
      title="账号"
      bordered
      :options="navOptions"
      @change="handleChange"
    />
  </div>
</template>
