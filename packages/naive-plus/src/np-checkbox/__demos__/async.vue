<template>
  <div>
    {{ value }}
  </div>
  <np-checkbox v-model="value" :options="options" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])

const options = async () => {
  // 模拟网络请求
  await new Promise<any[]>(resolve => setTimeout(resolve, 2000))
  return [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
  ]
}
</script>
