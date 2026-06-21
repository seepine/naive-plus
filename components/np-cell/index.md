---
url: /components/np-cell/index.md
---
# NpCell

单元格组件。

## 基础用法

通过 type 指定控件类型，支持 checkbox / radio / switch 控件，并支持图标及右侧箭头

```vue
<script setup lang="tsx">
import { ref } from 'vue'
import { NpCell } from '../index'

const checkbox = ref(false)
const radio = ref(false)
const switchVal = ref(false)

const iconRender = () => {
  return <img src="/logo.png" alt="icon" />
}

const valueRender = () => {
  return <span style="color: #18a058">Render 值</span>
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <np-cell v-model:checked="checkbox" type="checkbox" label="Checkbox 类型" />
    <np-cell v-model:checked="radio" type="radio" label="Radio 类型" />
    <np-cell
      v-model:checked="switchVal"
      type="switch"
      label="Switch 类型"
      :value="switchVal ? '开' : '关'"
    />
    <np-cell label="带箭头" :arrow="true" value="跳转" />
    <np-cell label="有图标" :icon="iconRender" />
    <np-cell
      v-model:checked="checkbox"
      type="checkbox"
      label="带底部内容"
      value="说明"
      description="底部内容位于主内容下方，不影响左侧控件与内容区域居中"
    >
      <template #footer>
        <div style="font-size: 12px; color: #8a8a8a">
          底部内容位于主内容下方，不影响左侧控件与内容区域居中
        </div>
      </template>
    </np-cell>
    <np-cell label="渲染函数" :value="valueRender" />
    <np-cell label="纯文本，无控件" />
  </div>
</template>
```

## 尺寸

通过 size 指定尺寸

```vue
<script setup lang="tsx">
import { ref } from 'vue'
import { NpCell } from '../index'

const checkbox = ref(false)

const iconRender = () => {
  return <img src="/logo.png" alt="icon" />
}
</script>

<template>
  <div>
    <NpCell
      v-model:checked="checkbox"
      size="small"
      :icon="iconRender"
      type="checkbox"
      label="Checkbox 类型"
      :arrow="true"
    />
    <NpCell
      v-model:checked="checkbox"
      :icon="iconRender"
      type="checkbox"
      label="Checkbox 类型"
      :arrow="true"
    />
    <NpCell
      v-model:checked="checkbox"
      size="large"
      :icon="iconRender"
      type="checkbox"
      label="Checkbox 类型"
      :arrow="true"
    />
  </div>
</template>
```

## 下边框

通过 bordered 指定下边框

```vue
<script setup lang="tsx">
import { ref } from 'vue'
import { NpCell } from '../index'

const iconRender = () => {
  return <img src="/logo.png" alt="icon" />
}
</script>

<template>
  <div>
    <np-cell type="checkbox" label="个人信息" :icon="iconRender" arrow bordered>
      <template #footer>
        <span style="font-size: 12px; color: #8a8a8a">基础资料与头像信息</span>
      </template>
    </np-cell>
    <np-cell type="checkbox" label="账号设置" arrow bordered />
    <np-cell type="checkbox" label="隐私安全" arrow />
  </div>
</template>
```

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
