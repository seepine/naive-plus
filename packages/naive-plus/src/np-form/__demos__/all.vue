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
    { label: '输入框', key: 'input' },
    { label: '数字输入框', key: 'number', type: 'number' },
    {
      label: '自动补全',
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
      label: '级联选择',
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
      label: '多选框',
      key: 'checkbox',
      type: 'checkbox',
      options: ['a', 'b', 'c'],
    },
    { label: '日期选择器', key: 'date', type: 'date' },
    { label: '单选框', key: 'radio', type: 'radio', options: ['a', 'b'] },
    { label: '评分', key: 'rate', type: 'rate' },
    {
      label: '选择器',
      key: 'select',
      type: 'select',
      options: ['A', 'B', 'C'],
    },
    { label: '滑块', key: 'slider', type: 'slider' },
    { label: '开关', key: 'switch', type: 'switch' },
    { label: '多行文本框', key: 'textarea', type: 'textarea' },
    {
      label: '穿梭框',
      key: 'transfer',
      type: 'transfer',
      options: ['A', 'B', 'C'],
    },
    { label: '时间选择器', key: 'time', type: 'time' },
    {
      label: '树选择器',
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
      label: '文件上传',
      key: 'upload',
      type: 'upload',
      props: {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      },
    },
  ],
}
</script>
