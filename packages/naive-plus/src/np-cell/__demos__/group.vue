<script setup lang="ts">
import { ref } from 'vue'
import { NpCellGroup } from '../index'
import type { NpCellOption } from '../index'

const options = ref<NpCellOption[]>([
  { label: '通知提醒' },
  { label: '声音' },
  { label: '震动' },
])

const navOptions: NpCellOption[] = [
  { label: '个人信息', arrow: true },
  {
    label: '账号安全',
    arrow: true,
    description: '账号安全设置',
  },
  { label: '隐私设置', arrow: true, value: '已设置' },
]

const handleClick = (item: NpCellOption) => {
  console.log('clicked:', item.label)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <NpCellGroup title="通知设置" :options="options" />
    <NpCellGroup title="账号" :options="navOptions" @click="handleClick" />
  </div>
</template>
