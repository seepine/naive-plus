<template>
  <div>
    {{ data }}
    <np-form v-model="data" :option="option" />
  </div>
</template>
<script setup lang="ts">
import type { FormOption } from 'naive-plus'
import { ref } from 'vue'

type User = {
  fullName?: string
  tel?: number
  age?: number
  ageMax: number
}

const data = ref<User>()

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
      defaultValue: 99,
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
            validator: (_rule: any, value: number) => value >= 0,
            message: '年龄必须为正数',
            trigger: ['change'],
          },
          {
            validator: (_rule: any, value: number) => value <= formData.ageMax,
            message: `年龄不能超过${formData.ageMax}岁`,
            trigger: ['change'],
          },
        ]
      },
    },
  ],
}
</script>
