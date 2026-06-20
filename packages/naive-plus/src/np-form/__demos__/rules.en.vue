<template>
  <div>
    {{ data }}
    <n-space style="margin: 12px 0">
      <n-button @click="validateAge">Validate Age</n-button>
      <n-button @click="validateInfo">Validate Info</n-button>
    </n-space>
    <np-form ref="formRef" v-model="data" :option="option" />
  </div>
</template>
<script setup lang="ts">
import type { FormOption, FormInst } from 'naive-plus'
import { NButton, NSpace } from 'naive-ui'
import { ref } from 'vue'

type User = {
  fullName?: string
  tel?: number
  age?: number
  ageMax: number
}

const data = ref<User>()
const formRef = ref<FormInst>()

const validateAge = () => {
  formRef.value?.validateFields('age')
}

const validateInfo = () => {
  formRef.value?.validateFields(['fullName', 'tel'])
}

const option: FormOption<User> = {
  onSubmit: async form => {
    console.log('Submitted', form)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200))
  },
  columns: [
    {
      label: 'Name',
      key: 'fullName',
      rule: [
        { required: true, message: 'Name is required', trigger: ['blur'] },
      ],
    },
    {
      label: 'Phone',
      key: 'tel',
      type: 'number',
      rule: {
        required: true,
        message: 'Phone is required',
        trigger: ['change'],
      },
    },
    {
      label: 'Max Age',
      key: 'ageMax',
      type: 'number',
      defaultValue: 50,
      rule: {
        required: true,
        message: 'Max age is required',
        trigger: ['change'],
      },
    },
    {
      label: 'Age',
      key: 'age',
      type: 'number',
      // supports dynamic rules, e.g. validating against other fields
      rule: formData => {
        return [
          {
            required: true,
            message: 'Age is required',
            trigger: ['change'],
          },
          {
            validator: (value: number) => value >= 0,
            message: 'Age must be a positive number',
            trigger: ['change'],
          },
          {
            validator: (value: number) => value <= formData.ageMax,
            message: `Age cannot exceed ${formData.ageMax}`,
            trigger: ['change'],
          },
        ]
      },
    },
  ],
}
</script>
