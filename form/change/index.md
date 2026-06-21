---
url: /form/change/index.md
---
# np-form 改变事件

通过 `onChange` 监听值变化。

```vue
<template>
  {{ form }}
  <np-form v-model="form" :option="option" />
</template>
<script setup lang="ts">
import type { FormOption } from 'naive-plus'
import { ref } from 'vue'

type User = {
  fullName?: string
  gender?: 'man' | 'feman'
}

const form = ref<User>()

const option: FormOption<User> = {
  columns: [
    {
      label: '姓名',
      key: 'fullName',
      onChange: val => {
        console.log(val)
      },
    },
    {
      label: '性别',
      key: 'gender',
      type: 'radio',
      options: [
        { label: '男', value: 'man' },
        { label: '女', value: 'feman' },
      ],
      onChange: (val, ctx) => {
        console.log(val)
        ctx.data.fullName = `选择了 ${val}`
      },
    },
  ],
}
</script>
```

## 组件配置

### FormColumn Props

| 属性 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| onChange | 改变事件，可通过 `ctx.data` 改变表单值 | `(val:T, ctx: { data:FormData, ... })=>void` | - |
