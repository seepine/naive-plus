<template>
  <div class="flex-row gap-2">
    <np-button :click="handleClick">异步按钮</np-button>
    <np-button type="primary" :click="handleClick">异步按钮</np-button>
    <np-button type="error" :click="handleClick">异步按钮</np-button>
    <np-button type="warning" :click="handleClick">异步按钮</np-button>
    <np-button
      type="success"
      :click="(e: any) => handleClick(e, 5000)"
      :loading-delay="1000"
    >
      异步按钮
    </np-button>
  </div>
</template>
<script setup lang="ts">
const handleClick = async (e: MouseEvent, delay = 2000) => {
  console.log('点击按钮', delay)
  // 模拟耗时操作
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
