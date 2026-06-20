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
  // simulate network request
  await new Promise<any[]>(resolve => setTimeout(resolve, 2000))
  return [
    { label: 'Beijing', value: 'beijing' },
    { label: 'Shanghai', value: 'shanghai' },
    { label: 'Guangzhou', value: 'guangzhou' },
  ]
}
</script>
