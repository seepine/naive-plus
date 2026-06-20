<template>
  <np-form :option="option" />
</template>
<script setup lang="tsx">
import type { FormOption } from 'naive-plus'

const option: FormOption = {
  enterSubmitMode: false,
  onSubmit: data => {
    console.log('Submitted:', data)
    return new Promise(resolve => setTimeout(resolve, 1000))
  },
  columns: [
    {
      label: 'Username',
      key: 'username',
      type: 'input',
      rule: { required: true, message: 'Please input the username' },
    },
    {
      label: 'Password',
      key: 'password',
      type: 'password',
      rule: { required: true, message: 'Please input the password' },
    },
  ],
}
</script>
