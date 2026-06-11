<script setup lang="ts">
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
]

const handleClick = (item: NpCellGroupOption) => {
  console.log('clicked:', item.label)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <NpCellGroup title="通知设置" :options="options" />
    <NpCellGroup title="账号" :options="navOptions" @click="handleClick" />
  </div>
</template>
