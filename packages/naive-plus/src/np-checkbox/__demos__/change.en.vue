<template>
  <div>
    {{ value }}
  </div>
  <np-checkbox
    :options="[
      { label: 'Beijing', value: 'beijing' },
      { label: 'Shanghai', value: 'shanghai' },
      { label: 'Guangzhou', value: 'guangzhou' },
    ]"
    @change="(val: any) => (value = val)"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
</script>
