<template>
  <div>
    {{ data }}
    <np-form v-model="data" :option="option" />
  </div>
</template>
<script setup lang="tsx">
import type { FormOption } from 'naive-plus'
import { NInput } from 'naive-ui'
import { ref } from 'vue'

type User = {
  fullName?: string
  tel?: number
  range: string[]
}

const data = ref<User>()

const option: FormOption<User> = {
  columns: [
    { label: '姓名', key: 'fullName' },
    { label: '电话', key: 'tel', type: 'number' },
    {
      label: '自定义组件',
      key: 'range',
      defaultValue: ['', ''],
      type: form => {
        return (
          <div style="display:flex; align-items:center; gap: 8px;">
            <NInput
              value={form.range?.[0]}
              onUpdateValue={(val: string) => (form.range[0] = val)}
            ></NInput>
            <span>~</span>
            <NInput
              value={form.range?.[1]}
              onUpdateValue={(val: string) => (form.range[1] = val)}
            ></NInput>
          </div>
        )
      },
    },
  ],
}
</script>
