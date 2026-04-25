<script setup lang="ts">
import { ref } from 'vue'
import { NpCellGroup } from '../index'
import type { NpCellOption } from '../index'

const options = ref<NpCellOption[]>([
  { label: '通知提醒', type: 'switch', checked: true },
  { label: '声音', type: 'switch', checked: false },
  { label: '震动', type: 'switch', checked: true },
])

const navOptions: NpCellOption[] = [
  { label: '个人信息', arrow: true },
  { label: '账号安全', arrow: true },
  { label: '隐私设置', arrow: true },
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
