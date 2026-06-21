---
url: /form/custom/index.md
---
# np-form 自定义类型

## 自定义类型

表单项 `type` 除了支持默认组件之外，也支持自定义 `VNode`。

```vue
<template>
  <div>
    {{ data }}
    <np-form v-model="data" :option="option" />
  </div>
</template>
<script setup lang="tsx">
import type { FormOption } from 'naive-plus'
import { NInput } from 'naive-ui'
import { ref } from 'vue'

type User = {
  fullName?: string
  tel?: number
  range: string[]
}

const data = ref<User>()

const option: FormOption<User> = {
  columns: [
    { label: '姓名', key: 'fullName' },
    { label: '电话', key: 'tel', type: 'number' },
    {
      label: '自定义组件',
      key: 'range',
      defaultValue: ['', ''],
      type: form => {
        return (
          <div style="display:flex; align-items:center; gap: 8px;">
            <NInput
              value={form.range?.[0]}
              onUpdateValue={(val: string) => (form.range[0] = val)}
            ></NInput>
            <span>~</span>
            <NInput
              value={form.range?.[1]}
              onUpdateValue={(val: string) => (form.range[1] = val)}
            ></NInput>
          </div>
        )
      },
    },
  ],
}
</script>
```

## 完全自定义渲染

使用 `render` 完全自定义渲染，例如实现分组表单。

```vue
<template>
  <np-form :option="option" />
</template>
<script setup lang="tsx">
import type { FormOption } from 'naive-plus'

const option: FormOption = {
  props: {
    labelPlacement: 'left',
    labelWidth: 60,
  },
  onSubmit: async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200))
  },
  columns: [
    {
      render: data => <div class="title">基础信息 {data.fullName}</div>,
    },
    { label: '姓名', key: 'fullName' },
    { label: '电话', key: 'tel', type: 'number' },
    { render: () => <div class="title">更多信息</div> },
    { label: '身份证', key: 'idCard' },
    { label: '银行卡', key: 'bankCard' },
  ],
}
</script>
<style>
.title {
  padding-top: 8px;
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
}
</style>
```

## 组件配置

### FormColumn Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | 类型函数，只会渲染输入区域 | `(data: AnyObject)=>VNode` | - |
| render | 渲染函数，会渲染整个form-item | `(data: AnyObject)=>VNode` | - |
