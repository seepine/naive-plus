<script setup lang="tsx">
import { ref } from 'vue'
import { NpCell } from '../index'

const checkbox = ref(false)
const radio = ref(false)
const switchVal = ref(false)

const iconRender = () => {
  return <img src="/logo.png" alt="icon" />
}

const valueRender = () => {
  return <span style="color: #18a058">Render 值</span>
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
    <np-cell
      v-model:checked="checkbox"
      type="checkbox"
      label="带底部内容"
      value="说明"
      description="底部内容位于主内容下方，不影响左侧控件与内容区域居中"
    >
      <template #footer>
        <div style="font-size: 12px; color: #8a8a8a">
          底部内容位于主内容下方，不影响左侧控件与内容区域居中
        </div>
      </template>
    </np-cell>
    <np-cell label="渲染函数" :value="valueRender" />
    <np-cell label="纯文本，无控件" />
  </div>
</template>
