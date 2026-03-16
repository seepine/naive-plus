<template>
  <div>
    {{ value }}
  </div>
  <np-radio
    :options="[
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
    ]"
    @change="(val: any) => (value = val)"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string | number | boolean | null>(null)
</script>
