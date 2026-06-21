---
url: /components/np-cell-group/index.md
---
# NpCellGroup

单元格组，通过 `options` 配置批量渲染 NpCell，支持分组标题。

## 基础用法

options 支持所有 `np-cell` 属性

```vue
<script setup lang="tsx">
import { ref } from 'vue'
import { NpCellGroup } from '../index'
import type { NpCellGroupOption } from '../index'

const options = ref<NpCellGroupOption[]>([
  { label: '通知提醒' },
  { label: '声音' },
  { label: '震动' },
])

const navOptions: NpCellGroupOption[] = [
  { label: '个人信息', arrow: true, hover: true },
  {
    label: '账号安全',
    arrow: true,
    hover: true,
    description: '账号安全设置',
  },
  { label: '隐私设置', arrow: true, hover: true, value: '已设置' },
  {
    key: 'storage',
    label: '存储空间',
    arrow: true,
    hover: true,
    value: () => <span style="color: #18a058">storage</span>,
    footer: () => (
      <span style="font-size: 12px; color: #8a8a8a">支持渲染函数</span>
    ),
  },
]

const handleChange = (_keys: unknown[], item: NpCellGroupOption) => {
  console.log('changed:', item.label)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <NpCellGroup title="通知设置" :options="options" />
    <NpCellGroup
      title="账号"
      bordered
      :options="navOptions"
      @change="handleChange"
    />
  </div>
</template>
```

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
