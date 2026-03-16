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
  gender?: 'man' | 'feman'
  hobby?: Array<'唱' | '跳' | 'rapper'>
}

const data = ref<User>({
  hobby: ['唱'],
})

const option: FormOption<User> = {
  onSubmit: async form => {
    console.log('点击了提交', form)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200))
  },
  onReset: form => {
    console.log('点击了重置', form)
  },
  columns: [
    {
      label: '姓名',
      key: 'fullName',
    },
    {
      label: '电话',
      key: 'tel',
      type: 'number',
    },
    {
      label: '年龄',
      key: 'age',
      type: 'number',
      props: {
        min: 0,
        max: 99,
      },
    },
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
      label: '喜好',
      key: 'hobby',
      type: 'checkbox',
      options: ['唱', '跳', 'rapper'],
    },
  ],
}
</script>
