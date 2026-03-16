<template>
  <div>
    {{ value }}
  </div>
  <np-checkbox v-model="value" :options="['北京', '上海', '广州']" />

  <!-- <div style="margin-top: 8px">支持全选</div>
  <np-checkbox
    v-model="value"
    :options="[
      { label: '全选', checkAll: true },
      { label: '北京', value: 'beijing' },
      { label: '上海', value: 'shanghai' },
      { label: '广州', value: 'guangzhou' },
    ]"
  /> -->
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
</script>
