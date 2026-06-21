---
url: /form/enter-submit/index.md
---
# np-form 回车提交表单

支持在表单中的单行输入框按回车键触发表单提交。

## last 模式

仅在最后一个表单项按回车时提交。

```vue
<template>
  <np-form :option="option" />
</template>
<script setup lang="tsx">
import type { FormOption } from 'naive-plus'

const option: FormOption = {
  enterSubmitMode: 'last',
  onSubmit: data => {
    console.log('提交:', data)
    return new Promise(resolve => setTimeout(resolve, 1000))
  },
  columns: [
    {
      label: '用户名',
      key: 'username',
      type: 'input',
      rule: { required: true, message: '请输入用户名' },
    },
    {
      label: '密码',
      key: 'password',
      type: 'password',
      rule: { required: true, message: '请输入密码' },
    },
  ],
}
</script>
```

## all 模式

在任意表单项按回车都提交。

```vue
<template>
  <np-form :option="option" />
</template>
<script setup lang="tsx">
import type { FormOption } from 'naive-plus'

const option: FormOption = {
  enterSubmitMode: 'all',
  onSubmit: data => {
    console.log('提交:', data)
    return new Promise(resolve => setTimeout(resolve, 1000))
  },
  columns: [
    {
      label: '用户名',
      key: 'username',
      type: 'input',
      rule: { required: true, message: '请输入用户名' },
    },
    {
      label: '密码',
      key: 'password',
      type: 'password',
      rule: { required: true, message: '请输入密码' },
    },
  ],
}
</script>
```

## false 模式

禁用回车提交功能。

```vue
<template>
  <np-form :option="option" />
</template>
<script setup lang="tsx">
import type { FormOption } from 'naive-plus'

const option: FormOption = {
  enterSubmitMode: false,
  onSubmit: data => {
    console.log('提交:', data)
    return new Promise(resolve => setTimeout(resolve, 1000))
  },
  columns: [
    {
      label: '用户名',
      key: 'username',
      type: 'input',
      rule: { required: true, message: '请输入用户名' },
    },
    {
      label: '密码',
      key: 'password',
      type: 'password',
      rule: { required: true, message: '请输入密码' },
    },
  ],
}
</script>
```

## 组件配置

| 属性               | 说明               | 类型                       | 默认值   |
| ------------------ | ------------------ | -------------------------- | -------- |
| enterSubmitMode | 回车提交表单的方式 | `'last' \| 'all' \| false` | `false` |
