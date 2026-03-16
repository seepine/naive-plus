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
