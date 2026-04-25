---
permalink: /components/np-cell/
---

# NpCell

单元格组件，支持 checkbox / radio / switch 控件，图标，标签及右侧箭头。

## 基础用法

<demo src="../__demos__/basic.vue"></demo>

## 尺寸

<demo src="../__demos__/size.vue"></demo>

## Props

| 参数    | 说明           | 类型                                 | 默认值  |
| ------- | -------------- | ------------------------------------ | ------- |
| v-model:checked | 控件选中状态   | `boolean`                            | `false` |
| type    | 左侧控件类型   | `'checkbox' \| 'radio' \| 'switch'`  | -       |
| icon    | 左侧图标       | `VNode \| () => VNode`               | -       |
| label   | 单元格标签     | `string \| VNode \| () => VNode`              | -       |
| value   | 单元格值     | `string \| VNode \| () => VNode`              | -       |
| arrow   | 是否显示右侧箭头 | `boolean`                          | `false` |

## Events

| 事件名         | 说明                 | 参数                      |
| -------------- | -------------------- | ------------------------- |
| update:checked | 控件状态变更时触发   | `(value: boolean) => void` |
