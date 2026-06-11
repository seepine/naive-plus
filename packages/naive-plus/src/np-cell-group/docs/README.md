---
permalink: /components/np-cell-group/
---

# NpCellGroup

单元格组，通过 `options` 配置批量渲染 NpCell，支持分组标题。

## 基础用法

options 支持所有 `np-cell` 属性

<demo src="../__demos__/group.vue"></demo>

## Props

| 参数    | 说明           | 类型              | 默认值 |
| ------- | -------------- | ----------------- | ------ |
| title   | 分组标题       | `string`          | -      |
| options | 单元格配置列表 | `NpCellOption[]`  | `[]`   |

## NpCellOption

| 参数    | 说明                   | 类型                                | 默认值  |
| ------- | ---------------------- | ----------------------------------- | ------- |
| type    | 左侧控件类型           | `'checkbox' \| 'radio' \| 'switch'` | -       |
| checked | 控件选中状态           | `boolean`                           | `false` |
| icon    | 左侧图标               | `VNode \| () => VNode`              | -       |
| label   | 单元格标签             | `string \| () => VNode`             | -       |
| arrow   | 是否显示右侧箭头       | `boolean`                           | `false` |
| onClick | 点击时的回调函数       | `() => void`                        | -       |

## Events

| 事件名 | 说明               | 参数                         |
| ------ | ------------------ | ---------------------------- |
| click  | 点击某个单元格时触发 | `(item: NpCellOption) => void` |
