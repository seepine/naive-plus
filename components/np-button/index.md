---
url: /components/np-button/index.md
---
# NpButton

对 `n-button` 进行封装，扩展了节流和异步能力。

## 基础用法

默认点击事件已做节流处理

```vue
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
```

## 异步按钮

使用 `:click` 属性代替原来的 `@click` 事件

```vue
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
```

## 按钮类型

```vue
<template>
  <div class="flex-row gap-2">
    <np-button :click="handleClick">按钮</np-button>
    <np-button type="primary" :click="handleClick">按钮</np-button>
    <np-button type="success" :click="handleClick">按钮</np-button>
    <np-button type="warning" :click="handleClick">按钮</np-button>
    <np-button type="error" :click="handleClick">按钮</np-button>
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
```

## 属性

### Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | -------- | ------ | ------ |
| throttle-delay | 节流延迟 | number | 350 |
| loading-delay | 加载延迟 | number | 250 |
| click | 点击函数 | `() => Promise<void>` | - |
| tyoe | 主题风格 | `primary/danger/warning/success` | default |
| props | 其他按钮属性 | object -> [Button Props](https://www.naiveui.com/zh-CN/light/components/button#Button-Props) | |

### Events

| 事件名 | 说明           | 参数                          |
| ------ | -------------- | ----------------------------- |
| click  | 点击触发的事件 | `() => void` |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |

## 类型

组件导出以下类型定义

```ts
import type { NpButtonProps } from 'naive-plus'
```
