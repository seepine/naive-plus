<template>
  <np-form :option="option" />
</template>
<script setup lang="tsx">
import type { FormOption } from 'naive-plus'

const option: FormOption = {
  enterSubmitMode: 'last',
  onSubmit: data => {
    console.log('提交:', data)
    return new Promise(resolve => setTimeout(resolve, 1000))
  },
  columns: [
    {
      label: '用户名',
      key: 'username',
      type: 'input',
      rule: { required: true, message: '请输入用户名' },
    },
    {
      label: '密码',
      key: 'password',
      type: 'password',
      rule: { required: true, message: '请输入密码' },
    },
  ],
}
</script>
