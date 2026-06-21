---
url: /form/display/index.md
---
# np-form 显隐控制

通过 `display` 控制是否显示。

```vue
<template>
  <np-form :option="option" />
</template>
<script setup lang="ts">
import type { FormOption } from 'naive-plus'

type User = {
  fullName?: string
  gender?: 'man' | 'feman'
  tel?: number
  age?: number
}

const option: FormOption<User> = {
  onSubmit: async data => {
    console.log('点击了提交', data)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200))
  },
  props: {
    labelWidth: 140,
  },
  columns: [
    { label: '姓名', key: 'fullName' },
    {
      label: '性别',
      key: 'gender',
      type: 'radio',
      defaultValue: 'man',
      options: [
        { label: '男', value: 'man' },
        { label: '女', value: 'feman' },
      ],
    },
    {
      label: '电话',
      key: 'tel',
      type: 'number',
      display: false,
    },
    {
      label: '年龄(性别女隐藏)',
      key: 'age',
      type: 'number',
      display: data => data.gender === 'man',
    },
  ],
}
</script>
```

## 组件配置

### FormColumn Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| display | 是否显示 | `boolean / (data)=>boolean` | true |
