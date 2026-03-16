<template>
  <np-button style="margin-right: 8px" @click="handleClick">
    默认节流350ms
  </np-button>
  <np-button :throttle-delay="1000" type="primary" @click="handleClick">
    设置节流1000ms
  </np-button>
  <!-- 点击日志 -->
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
  logs.value.push(`点击了: ${Date().toString()}`)
}
</script>
