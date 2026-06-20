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
    prefixRender: () => <span style="width:40px">Prefix</span>,
    suffixRender: () => <NButton onClick={() => {}}>Custom Button</NButton>,
  },
  onSubmit: () =>
    new Promise<void>(resolve => setTimeout(() => resolve(), 1200)),
  columns: [
    { label: 'Name', key: 'fullName' },
    { label: 'Phone', key: 'tel', type: 'number' },
    {
      label: 'Gender',
      key: 'gender',
      type: 'radio',
      options: [
        { label: 'Male', value: 'man' },
        { label: 'Female', value: 'woman' },
      ],
    },
    {
      label: 'Hobbies',
      key: 'hobby',
      type: 'checkbox',
      options: ['Sing', 'Dance', 'Rap'],
    },
  ],
}
</script>
