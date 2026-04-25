<script setup lang="tsx">
import { ref } from 'vue'
import { NpCell } from '../index'

const iconRender = () => {
  return <img src="/logo.png" alt="icon" />
}
</script>

<template>
  <div>
    <np-cell
      type="checkbox"
      label="个人信息"
      :icon="iconRender"
      arrow
      bordered
    />
    <np-cell type="checkbox" label="账号设置" arrow bordered />
    <np-cell type="checkbox" label="隐私安全" arrow />
  </div>
</template>
