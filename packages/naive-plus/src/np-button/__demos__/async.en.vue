<template>
  <div class="flex-row gap-2">
    <np-button :click="handleClick">Async</np-button>
    <np-button type="primary" :click="handleClick">Async</np-button>
    <np-button type="error" :click="handleClick">Async</np-button>
    <np-button type="warning" :click="handleClick">Async</np-button>
    <np-button
      type="success"
      :click="(e: any) => handleClick(e, 5000)"
      :loading-delay="1000"
    >
      Async
    </np-button>
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
