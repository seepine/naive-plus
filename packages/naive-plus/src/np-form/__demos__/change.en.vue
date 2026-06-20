<template>
  {{ form }}
  <np-form v-model="form" :option="option" />
</template>
<script setup lang="ts">
import type { FormOption } from 'naive-plus'
import { ref } from 'vue'

type User = {
  fullName?: string
  gender?: 'man' | 'woman'
}

const form = ref<User>()

const option: FormOption<User> = {
  columns: [
    {
      label: 'Name',
      key: 'fullName',
      onChange: val => {
        console.log(val)
      },
    },
    {
      label: 'Gender',
      key: 'gender',
      type: 'radio',
      options: [
        { label: 'Male', value: 'man' },
        { label: 'Female', value: 'woman' },
      ],
      onChange: (val, ctx) => {
        console.log(val)
        ctx.data.fullName = `Selected ${val}`
      },
    },
  ],
}
</script>
