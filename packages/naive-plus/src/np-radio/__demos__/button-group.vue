<template>
  <div>
    {{ value }}
  </div>
  <np-radio
    v-model="value"
    type="button"
    :options="[
      { label: '上海', value: 'shanghai' },
      { label: '北京', value: 'beijing' },
      { label: '深圳', value: 'shenzhen' },
    ]"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string | null>('shanghai')
</script>
