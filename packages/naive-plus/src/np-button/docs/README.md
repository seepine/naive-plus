---
permalink: /components/np-button/
---

# NpButton

对 `n-button` 进行封装，扩展了节流和异步能力。

## 基础用法

默认点击事件已做节流处理

<demo src="../__demos__/basic.vue"></demo>

## 异步按钮

使用 `:click` 属性代替原来的 `@click` 事件

<demo src="../__demos__/async.vue"></demo>

## 按钮类型

<demo src="../__demos__/type.vue"></demo>

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
