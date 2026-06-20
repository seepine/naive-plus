<script setup lang="ts">
import { ref } from 'vue'
import { NpFilter } from '../index'

const leftParams = ref({})
const rightParams = ref({})

const items = [
  {
    label: 'Status',
    key: 'status',
    options: [
      { label: 'In Progress', value: 'ongoing' },
      { label: 'Paused', value: 'paused' },
      { label: 'Done', value: 'done' },
    ],
  },
  {
    label: 'Priority',
    key: 'priority',
    multiple: false,
    options: [
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ],
  },
]
</script>

<template>
  <div style="display: flex; gap: 16px; justify-content: space-between">
    <div>
      <NpFilter v-model:params="leftParams" :items="items" placement="right">
        <n-button>Pop to the right</n-button>
      </NpFilter>
      <pre>{{ JSON.stringify(leftParams, null, 2) }}</pre>
    </div>

    <div style="text-align: right">
      <NpFilter v-model:params="rightParams" :items="items" placement="left">
        <n-button>Pop to the left</n-button>
      </NpFilter>
      <pre>{{ JSON.stringify(rightParams, null, 2) }}</pre>
    </div>
  </div>
</template>
