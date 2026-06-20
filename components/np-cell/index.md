---
url: /components/np-cell/index.md
---
# NpCell

单元格组件。

## 基础用法

通过 type 指定控件类型，支持 checkbox / radio / switch 控件，并支持图标及右侧箭头

## 尺寸

通过 size 指定尺寸

## 下边框

通过 bordered 指定下边框

## Props

| 参数 | 说明 | 类型 | 默认值 |
| ------- | -------------- | ------------------------------------ | ------- |
| v-model:checked | 控件选中状态 | `boolean` | `false` |
| type | 左侧控件类型 | `'checkbox' \| 'radio' \| 'switch'` | - |
| hover | 是否启用悬停态 | `boolean` | 未传时 `type` 非空为 `true`，否则 `false` |
| icon | 左侧图标 | `VNode \| () => VNode` | - |
| label | 单元格标签 | `string \| VNode \| () => VNode` | - |
| value | 单元格值 | `string \| VNode \| () => VNode` | - |
| description | 单元格描述 | `string \| VNode \| () => VNode` | - |
| arrow | 是否显示右侧箭头 | `boolean` | `false` |

## Slots

| 名称 | 说明 |
| ------- | ---------------- |
| footer | 底部内容，显示在主内容区域下方 |

## Events

| 事件名         | 说明                 | 参数                      |
| -------------- | -------------------- | ------------------------- |
| update:checked | 控件状态变更时触发   | `(value: boolean) => void` |
