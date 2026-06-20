<template>
  <div class="flex-row gap-2">
    <np-button :click="handleClick">Button</np-button>
    <np-button type="primary" :click="handleClick">Button</np-button>
    <np-button type="success" :click="handleClick">Button</np-button>
    <np-button type="warning" :click="handleClick">Button</np-button>
    <np-button type="error" :click="handleClick">Button</np-button>
  </div>
</template>
<script setup lang="ts">
const handleClick = async (e: MouseEvent, delay = 2000) => {
  console.log('Clicked', delay)
  // simulate a time-consuming operation
  await new Promise<void>(resolve => setTimeout(resolve, delay))
}
</script>
<style>
.flex-row {
  display: flex;
  flex-direction: row;
}

.gap-2 {
  gap: 8px;
}
</style>
