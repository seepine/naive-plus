<script setup lang="tsx">
import { ref } from 'vue'
import { NpCell } from '../index'

const checkbox = ref(false)

const iconRender = () => {
  return <img src="/logo.png" alt="icon" />
}
</script>

<template>
  <div>
    <NpCell
      v-model:checked="checkbox"
      size="small"
      :icon="iconRender"
      type="checkbox"
      label="Checkbox 类型"
      :arrow="true"
    />
    <NpCell
      v-model:checked="checkbox"
      :icon="iconRender"
      type="checkbox"
      label="Checkbox 类型"
      :arrow="true"
    />
    <NpCell
      v-model:checked="checkbox"
      size="large"
      :icon="iconRender"
      type="checkbox"
      label="Checkbox 类型"
      :arrow="true"
    />
  </div>
</template>
