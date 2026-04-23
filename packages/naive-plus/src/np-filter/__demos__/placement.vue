<script setup lang="ts">
import { ref } from 'vue'
import { NpFilter } from '../index'

const leftParams = ref({})
const rightParams = ref({})

const items = [
  {
    label: '状态',
    key: 'status',
    options: [
      { label: '进行中', value: 'ongoing' },
      { label: '已暂停', value: 'paused' },
      { label: '已完成', value: 'done' },
    ],
  },
  {
    label: '优先级',
    key: 'priority',
    multiple: false,
    options: [
      { label: '高', value: 'high' },
      { label: '中', value: 'medium' },
      { label: '低', value: 'low' },
    ],
  },
]
</script>

<template>
  <div style="display: flex; gap: 16px; justify-content: space-between">
    <div>
      <NpFilter v-model:params="leftParams" :items="items" placement="right">
        <n-button>向右侧弹出</n-button>
      </NpFilter>
      <pre>{{ JSON.stringify(leftParams, null, 2) }}</pre>
    </div>

    <div style="text-align: right">
      <NpFilter v-model:params="rightParams" :items="items" placement="left">
        <n-button>向左侧弹出</n-button>
      </NpFilter>
      <pre>{{ JSON.stringify(rightParams, null, 2) }}</pre>
    </div>
  </div>
</template>
