<template>
  <np-form :option="option" />
</template>
<script setup lang="tsx">
import type { FormOption } from 'naive-plus'

const option: FormOption = {
  props: {
    labelPlacement: 'left',
    labelWidth: 80,
  },
  onSubmit: async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200))
  },
  columns: [
    {
      render: data => <div class="title">Basic Info {data.fullName}</div>,
    },
    { label: 'Name', key: 'fullName' },
    { label: 'Phone', key: 'tel', type: 'number' },
    { render: () => <div class="title">More Info</div> },
    { label: 'ID Card', key: 'idCard' },
    { label: 'Bank Card', key: 'bankCard' },
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
