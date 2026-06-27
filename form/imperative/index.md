---
url: /form/imperative/index.md
---
# np-form 主动方法

通过 `ref` 获取表单实例后，可主动调用 `submit`、`reset` 与 `validateFields`。

* `submit`：手动触发提交，行为与底部提交按钮一致，会先校验再执行 `onSubmit`。
* `reset`：手动触发重置，行为与底部重置按钮一致，会清空校验并执行 `onReset`。
* `validateFields`：按字段名校验指定字段。

```vue
<template>
  <div>
    {{ data }}
    <n-space style="margin: 12px 0">
      <n-button @click="onSubmit">主动提交</n-button>
      <n-button @click="onValidateAge">校验年龄</n-button>
      <n-button @click="onValidateInfo">校验信息</n-button>
    </n-space>
    <np-form ref="formRef" v-model="data" :option="option" />
  </div>
</template>
<script setup lang="ts">
import type { FormOption, FormInst } from 'naive-plus'
import { NButton, NSpace, useMessage } from 'naive-ui'
import { ref } from 'vue'

type User = {
  fullName?: string
  tel?: number
  age?: number
  ageMax: number
}

const data = ref<User>({ ageMax: 50 })
const formRef = ref<FormInst>()
const message = useMessage()

const onSubmit = () => {
  formRef.value?.submit()
}

const onValidateAge = () => {
  formRef.value?.validateFields('age').then(() => {
    message.success('年龄校验通过')
  })
}

const onValidateInfo = () => {
  formRef.value?.validateFields(['fullName', 'tel']).then(() => {
    message.success('姓名/电话校验通过')
  })
}

const option: FormOption<User> = {
  onSubmit: async form => {
    console.log('点击了提交', form)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200))
  },
  columns: [
    {
      label: '姓名',
      key: 'fullName',
      rule: [{ required: true, message: '姓名不能为空', trigger: ['blur'] }],
    },
    {
      label: '电话',
      key: 'tel',
      type: 'number',
      rule: {
        required: true,
        message: '电话不能为空',
        trigger: ['change'],
      },
    },
    {
      label: '年龄最大值',
      key: 'ageMax',
      type: 'number',
      defaultValue: 50,
      rule: {
        required: true,
        message: '年龄最大值不能为空',
        trigger: ['change'],
      },
    },
    {
      label: '年龄',
      key: 'age',
      type: 'number',
      // 支持动态规则，例如根据其他字段的值来校验
      rule: formData => {
        return [
          {
            required: true,
            message: '年龄不能为空',
            trigger: ['change'],
          },
          {
            validator: (value: number) => value >= 0,
            message: '年龄必须为正数',
            trigger: ['change'],
          },
          {
            validator: (value: number) => value <= formData.ageMax,
            message: `年龄不能超过${formData.ageMax}岁`,
            trigger: ['change'],
          },
        ]
      },
    },
  ],
}
</script>
```

## 组件配置

### FormInst methods

| 方法 | 说明 | 类型 |
| ---- | ---- | ---- |
| submit | 主动提交表单 | `() => Promise<void>` |
| reset | 主动重置表单 | `() => Promise<void>` |
| validateFields | 校验指定字段 | `(fields: string \| string[]) => Promise<void>` |
