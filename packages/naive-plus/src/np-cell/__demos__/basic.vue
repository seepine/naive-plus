<script setup lang="tsx">
import { ref } from 'vue'
import { NpCell } from '../index'

const checkbox = ref(false)
const radio = ref(false)
const switchVal = ref(false)

const iconRender = () => {
  return <img src="/logo.png" alt="icon" />
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <np-cell v-model:checked="checkbox" type="checkbox" label="Checkbox 类型" />
    <np-cell v-model:checked="radio" type="radio" label="Radio 类型" />
    <np-cell
      v-model:checked="switchVal"
      type="switch"
      label="Switch 类型"
      :value="switchVal ? '开' : '关'"
    />
    <np-cell label="带箭头" :arrow="true" value="跳转" />
    <np-cell label="有图标" :icon="iconRender" />
    <np-cell label="纯文本，无控件" />
  </div>
</template>
