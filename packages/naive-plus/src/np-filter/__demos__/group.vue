<script setup lang="ts">
import { ref } from 'vue'
import { NpFilter } from '../index'

const params = ref({})

const items = [
  {
    label: '优先级',
    key: 'priority',
    searchable: true,
    options: [
      { title: '紧急', options: [{ label: '高', value: 'high' }] },
      {
        title: '普通',
        options: [
          { label: '中', value: 'medium' },
          { label: '低', value: 'low' },
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
      <n-button>点击筛选</n-button>
    </NpFilter>

    <pre>{{ JSON.stringify(params, null, 2) }}</pre>
  </div>
</template>
