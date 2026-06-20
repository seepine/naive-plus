<template>
  <div>
    {{ value }}
  </div>
  <np-checkbox
    v-model="value"
    :options="[
      { name: 'Beijing', id: 'beijing' },
      { name: 'Shanghai', id: 'shanghai' },
      { name: 'Guangzhou', id: 'guangzhou' },
    ]"
    :keys="{ label: 'name', value: 'id' }"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref([])
</script>
