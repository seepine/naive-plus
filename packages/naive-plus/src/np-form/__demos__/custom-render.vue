<template>
  <np-form :option="option" />
</template>
<script setup lang="tsx">
import type { FormOption } from 'naive-plus'

const option: FormOption = {
  props: {
    labelPlacement: 'left',
    labelWidth: 60,
  },
  onSubmit: async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200))
  },
  columns: [
    {
      render: data => <div class="title">基础信息 {data.fullName}</div>,
    },
    { label: '姓名', key: 'fullName' },
    { label: '电话', key: 'tel', type: 'number' },
    { render: () => <div class="title">更多信息</div> },
    { label: '身份证', key: 'idCard' },
    { label: '银行卡', key: 'bankCard' },
  ],
}
</script>
<style>
.title {
  padding-top: 8px;
  padding-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
}
</style>
