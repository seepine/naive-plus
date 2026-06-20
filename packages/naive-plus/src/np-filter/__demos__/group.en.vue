<script setup lang="ts">
import { ref } from 'vue'
import { NpFilter } from '../index'

const params = ref({})

const items = [
  {
    label: 'Priority',
    key: 'priority',
    searchable: true,
    options: [
      { title: 'Urgent', options: [{ label: 'High', value: 'high' }] },
      {
        title: 'Normal',
        options: [
          { label: 'Medium', value: 'medium' },
          { label: 'Low', value: 'low' },
        ],
      },
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
