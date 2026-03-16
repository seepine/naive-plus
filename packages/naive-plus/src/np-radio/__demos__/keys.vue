<template>
  <div>
    {{ value }}
  </div>
  <np-radio
    v-model="value"
    :options="[
      { name: '北京', id: 'beijing' },
      { name: '上海', id: 'shanghai' },
      { name: '广州', id: 'guangzhou' },
    ]"
    value-field="id"
    label-field="name"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string | null>(null)
</script>
