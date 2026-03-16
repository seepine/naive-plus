<template>
  {{ form }}
  <np-form v-model="form" :option="option" />
</template>
<script setup lang="ts">
import type { FormOption } from 'naive-plus'
import { ref } from 'vue'

type User = {
  fullName?: string
  gender?: 'man' | 'feman'
}

const form = ref<User>()

const option: FormOption<User> = {
  columns: [
    {
      label: '姓名',
      key: 'fullName',
      onChange: val => {
        console.log(val)
      },
    },
    {
      label: '性别',
      key: 'gender',
      type: 'radio',
      options: [
        { label: '男', value: 'man' },
        { label: '女', value: 'feman' },
      ],
      onChange: (val, ctx) => {
        console.log(val)
        ctx.data.fullName = `选择了 ${val}`
      },
    },
  ],
}
</script>
