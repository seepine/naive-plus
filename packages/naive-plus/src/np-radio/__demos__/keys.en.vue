<template>
  <div>
    {{ value }}
  </div>
  <np-radio
    v-model="value"
    :options="[
      { name: 'Beijing', id: 'beijing' },
      { name: 'Shanghai', id: 'shanghai' },
      { name: 'Guangzhou', id: 'guangzhou' },
    ]"
    value-field="id"
    label-field="name"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string | null>(null)
</script>
