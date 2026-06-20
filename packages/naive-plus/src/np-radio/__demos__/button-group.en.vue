<template>
  <div>
    {{ value }}
  </div>
  <np-radio
    v-model="value"
    button
    :options="[
      { label: 'Shanghai', value: 'shanghai' },
      { label: 'Beijing', value: 'beijing' },
      { label: 'Shenzhen', value: 'shenzhen' },
    ]"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string | null>('shanghai')
</script>
