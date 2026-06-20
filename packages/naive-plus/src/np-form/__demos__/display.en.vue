<template>
  <np-form :option="option" />
</template>
<script setup lang="ts">
import type { FormOption } from 'naive-plus'

type User = {
  fullName?: string
  gender?: 'man' | 'woman'
  tel?: number
  age?: number
}

const option: FormOption<User> = {
  onSubmit: async data => {
    console.log('Submitted', data)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200))
  },
  props: {
    labelWidth: 200,
  },
  columns: [
    { label: 'Name', key: 'fullName' },
    {
      label: 'Gender',
      key: 'gender',
      type: 'radio',
      defaultValue: 'man',
      options: [
        { label: 'Male', value: 'man' },
        { label: 'Female', value: 'woman' },
      ],
    },
    {
      label: 'Phone',
      key: 'tel',
      type: 'number',
      display: false,
    },
    {
      label: 'Age (hidden when gender is female)',
      key: 'age',
      type: 'number',
      display: data => data.gender === 'man',
    },
  ],
}
</script>
