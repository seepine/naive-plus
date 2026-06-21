---
url: /form/footer/index.md
---
# np-form 自定义底部

通过 `footer` 属性自定义底部。

```vue
<template>
  <np-form :option="option" />
</template>
<script setup lang="tsx">
import type { FormOption } from 'naive-plus'
import { NButton } from 'naive-ui'

const option: FormOption = {
  footer: {
    submitBtn: {
      props: {
        block: true,
      },
    },
    resetBtn: false,
    prefixRender: () => <span style="width:40px">前缀</span>,
    suffixRender: () => <NButton onClick={() => {}}>自定义按钮</NButton>,
  },
  onSubmit: () =>
    new Promise<void>(resolve => setTimeout(() => resolve(), 1200)),
  columns: [
    { label: '姓名', key: 'fullName' },
    { label: '电话', key: 'tel', type: 'number' },
    {
      label: '性别',
      key: 'gender',
      type: 'radio',
      options: [
        { label: '男', value: 'man' },
        { label: '女', value: 'feman' },
      ],
    },
    {
      label: '喜好',
      key: 'hobby',
      type: 'checkbox',
      options: ['唱', '跳', 'rapper'],
    },
  ],
}
</script>
```

## 组件配置

### FormOption Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| footer | 底部属性，`false` 则隐藏整个底部 | boolean / [FooterProps](#footer-props) | - |

### Footer Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| submitBtn | 提交按钮是否显示 | boolean | true |
| resetBtn | 重置按钮是否显示 | boolean | true |
| prefixRender | 前缀渲染函数 | `(data)=>VNode` | - |
| suffixRender | 后缀渲染函数 | `(data)=>VNode` | - |
