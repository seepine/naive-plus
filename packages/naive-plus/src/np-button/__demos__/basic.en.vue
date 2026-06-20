<template>
  <np-button style="margin-right: 8px" @click="handleClick">
    Default throttle 350ms
  </np-button>
  <np-button :throttle-delay="1000" type="primary" @click="handleClick">
    Throttle 1000ms
  </np-button>
  <!-- click log -->
  <div v-for="(item, idx) in logs" :key="idx">
    {{ item }}
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const logs = ref<string[]>([])
const handleClick = async () => {
  if (logs.value.length > 5) {
    logs.value.splice(0, 1)
  }
  logs.value.push(`Clicked: ${Date().toString()}`)
}
</script>
