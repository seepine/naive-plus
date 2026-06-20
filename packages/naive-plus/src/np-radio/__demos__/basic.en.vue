<template>
  <div>
    {{ value }}
  </div>
  <np-radio v-model="value" :options="['Beijing', 'Shanghai', 'Guangzhou']" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string | null>(null)
</script>
