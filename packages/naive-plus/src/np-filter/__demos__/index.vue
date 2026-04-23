<script setup lang="tsx">
import { ref } from 'vue'
import { NpFilter } from '../index'

const params = ref({})

const items = [
  {
    label: '状态',
    key: 'status',
    options: [
      {
        label: '进行中',
        value: 'ongoing',
      },
      { label: '已暂停', value: 'paused' },
      { label: '已完成', value: 'done' },
    ],
  },
  {
    label: '优先级',
    key: 'priority',
    searchable: true,
    multiple: false,
    options: [
      { label: '高', value: 'high' },
      { label: '中', value: 'medium' },
      { label: '低', value: 'low' },
    ],
  },
  {
    label: '创建人',
    key: 'creator',
    searchable: true,
    options: [
      { label: '张三', value: 'zhangsan' },
      { label: '李四', value: 'lisi' },
      { label: '王五', value: 'wangwu' },
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
