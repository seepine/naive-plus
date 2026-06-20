<script setup lang="tsx">
import { ref } from 'vue'
import { NpFilter } from '../index'

const params = ref({})

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
    searchable: true,
    multiple: false,
    options: [
      { label: 'High', value: 'high' },
      { label: 'Medium', value: 'medium' },
      { label: 'Low', value: 'low' },
    ],
  },
  {
    label: 'Creator',
    key: 'creator',
    searchable: true,
    options: [
      { label: 'Alice', value: 'alice' },
      { label: 'Bob', value: 'bob' },
      { label: 'Carol', value: 'carol' },
    ],
  },
]

const handleChange = (newParams: Record<string, any>) => {
  console.log('filter change:', newParams)
}
</script>

<template>
  <div>
    <NpFilter v-model:params="params" :items="items" @change="handleChange">
      <n-button>Filter</n-button>
    </NpFilter>

    <pre>{{ JSON.stringify(params, null, 2) }}</pre>
  </div>
</template>
