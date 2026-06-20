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
  return <span style="color: #18a058">Render Value</span>
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 8px">
    <np-cell v-model:checked="checkbox" type="checkbox" label="Checkbox Type" />
    <np-cell v-model:checked="radio" type="radio" label="Radio Type" />
    <np-cell
      v-model:checked="switchVal"
      type="switch"
      label="Switch Type"
      :value="switchVal ? 'On' : 'Off'"
    />
    <np-cell label="With Arrow" :arrow="true" value="Navigate" />
    <np-cell label="With Icon" :icon="iconRender" />
    <np-cell
      v-model:checked="checkbox"
      type="checkbox"
      label="With Footer"
      value="Description"
      description="Footer is below the main content and does not affect the left control and content alignment"
    >
      <template #footer>
        <div style="font-size: 12px; color: #8a8a8a">
          Footer is below the main content and does not affect the left control
          and content alignment
        </div>
      </template>
    </np-cell>
    <np-cell label="Render Function" :value="valueRender" />
    <np-cell label="Plain Text, No Control" />
  </div>
</template>
