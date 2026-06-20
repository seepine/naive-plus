<template>
  <div>
    {{ data }}
    <np-form v-model="data" :option="option" />
  </div>
</template>
<script setup lang="ts">
import type { FormOption } from 'naive-plus'
import { ref } from 'vue'

const data = ref({})

const option: FormOption = {
  columns: [
    { label: 'Input', key: 'input' },
    { label: 'Number Input', key: 'number', type: 'number' },
    {
      label: 'AutoComplete',
      key: 'autoComplete',
      type: 'autoComplete',
      options: async formData => {
        if (!formData.autoComplete) {
          return []
        }
        return ['@gmail.com', '@qq.com', '@icloud.com'].map(
          item => `${formData.autoComplete}${item}`
        )
      },
    },
    {
      label: 'Cascader',
      type: 'cascader',
      key: 'cascader',
      options: [
        {
          label: 'a',
          value: 'a',
          children: [
            { label: 'a1', value: 'a1' },
            { label: 'a2', value: 'a2' },
          ],
        },
        { label: 'b', value: 'b' },
      ],
    },
    {
      label: 'Checkbox',
      key: 'checkbox',
      type: 'checkbox',
      options: ['a', 'b', 'c'],
    },
    { label: 'Date Picker', key: 'date', type: 'date' },
    { label: 'Radio', key: 'radio', type: 'radio', options: ['a', 'b'] },
    { label: 'Rate', key: 'rate', type: 'rate' },
    {
      label: 'Select',
      key: 'select',
      type: 'select',
      options: ['A', 'B', 'C'],
    },
    { label: 'Slider', key: 'slider', type: 'slider' },
    { label: 'Switch', key: 'switch', type: 'switch' },
    { label: 'Textarea', key: 'textarea', type: 'textarea' },
    {
      label: 'Transfer',
      key: 'transfer',
      type: 'transfer',
      options: ['A', 'B', 'C'],
    },
    { label: 'Time Picker', key: 'time', type: 'time' },
    {
      label: 'Tree',
      key: 'tree',
      type: 'tree',
      options: [
        {
          label: 'a',
          value: 'a',
          children: [
            { label: 'a1', value: 'a1' },
            { label: 'a2', value: 'a2' },
          ],
        },
        { label: 'b', value: 'b' },
      ],
    },
    {
      label: 'File Upload',
      key: 'upload',
      type: 'upload',
      props: {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      },
    },
  ],
}
</script>
