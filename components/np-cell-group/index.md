---
url: /components/np-cell-group/index.md
---
# NpCellGroup

单元格组，通过 `options` 配置批量渲染 NpCell，支持分组标题。

## 基础用法

options 支持所有 `np-cell` 属性

## Props

| 参数 | 说明 | 类型 | 默认值 |
| ------- | -------------- | --------------------- | ------ |
| title | 分组标题 | `string` | - |
| options | 单元格配置列表 | `NpCellGroupOption[]` | `[]` |
| type | 左侧控件类型 | `'checkbox' \| 'radio' \| 'switch'` | - |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `medium` |
| bordered | 是否显示分割线 | `boolean` | `false` |

## NpCellGroupOption

| 参数 | 说明 | 类型 | 默认值 |
| ------- | ---------------------- | ----------------------------------- | ------- |
| key | 选项标识 | `string \| number` | 当前索引 |
| icon | 左侧图标 | `VNode \| () => VNode` | - |
| label | 单元格标签 | `string \| VNode \| () => VNode` | - |
| value | 单元格值 | `string \| VNode \| () => VNode` | - |
| description | 单元格描述 | `string \| VNode \| () => VNode` | - |
| footer | 底部内容 | `VNode \| () => VNode` | - |
| hover | 是否启用悬停态 | `boolean` | - |
| arrow | 是否显示右侧箭头 | `boolean` | `false` |
| onClick | 点击时的回调函数 | `() => void` | - |

## Events

| 事件名 | 说明 | 参数 |
| ------ | ------------------ | ---------------------------- |
| change | 选中项变化时触发 | `(keys: NpCellGroupKeys, item: NpCellGroupOption) => void` |
| update:keys | 控件状态变更时触发 | `(keys: NpCellGroupKeys) => void` |
