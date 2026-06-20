<script setup lang="tsx">
import { ref } from 'vue'
import { NpCellGroup } from '../index'
import type { NpCellGroupOption } from '../index'

const options = ref<NpCellGroupOption[]>([
  { label: 'Notifications' },
  { label: 'Sound' },
  { label: 'Vibration' },
])

const navOptions: NpCellGroupOption[] = [
  { label: 'Profile', arrow: true, hover: true },
  {
    label: 'Account Security',
    arrow: true,
    hover: true,
    description: 'Account security settings',
  },
  { label: 'Privacy', arrow: true, hover: true, value: 'Configured' },
  {
    key: 'storage',
    label: 'Storage',
    arrow: true,
    hover: true,
    value: () => <span style="color: #18a058">storage</span>,
    footer: () => (
      <span style="font-size: 12px; color: #8a8a8a">
        Supports render functions
      </span>
    ),
  },
]

const handleChange = (_keys: unknown[], item: NpCellGroupOption) => {
  console.log('changed:', item.label)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <NpCellGroup title="Notifications" :options="options" />
    <NpCellGroup
      title="Account"
      bordered
      :options="navOptions"
      @change="handleChange"
    />
  </div>
</template>
