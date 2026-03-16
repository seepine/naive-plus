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
  onSubmit: async () =>
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200)),
  columns: [
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
      type: 'select',
      options: form =>
        form.gender === 'man' ? ['唱', '跳', 'rapper'] : ['弹琴', '跳舞'],
    },
    {
      label: '喜好多选',
      key: 'hobbyArray',
      type: 'checkbox',
      options: async form => {
        // 模仿从后端获取数据
        const fetch = (gender: string) => {
          return new Promise<any[]>(resolve => {
            setTimeout(() => {
              resolve(
                gender === 'man' ? ['唱', '跳', 'rapper'] : ['弹琴', '跳舞']
              )
            }, 600)
          })
        }
        return await fetch(form.gender)
      },
    },
  ],
}
</script>
