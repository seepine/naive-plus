<template>
  <div>
    {{ value }}
  </div>
  <np-radio v-model="value" :options="options" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string | null>(null)

const options = async () => {
  await new Promise<any[]>(resolve => setTimeout(resolve, 2000))
  return [
    { label: '北京', value: 'beijing' },
    { label: '上海', value: 'shanghai' },
    { label: '广州', value: 'guangzhou' },
  ]
}
</script>
