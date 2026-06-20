<template>
  <div>
    {{ data }}
    <np-form v-model="data" :option="option" />
  </div>
</template>
<script setup lang="ts">
import type { FormOption } from 'naive-plus'
import { ref } from 'vue'

const data = ref({})

const option: FormOption = {
  onSubmit: async () =>
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200)),
  columns: [
    {
      label: 'Gender',
      key: 'gender',
      type: 'radio',
      defaultValue: 'man',
      options: [
        { label: 'Male', value: 'man' },
        { label: 'Female', value: 'woman' },
      ],
    },
    {
      label: 'Hobby',
      key: 'hobby',
      type: 'select',
      options: form =>
        form.gender === 'man' ? ['Sing', 'Dance', 'Rap'] : ['Piano', 'Dance'],
    },
    {
      label: 'Hobbies (multiple)',
      key: 'hobbyArray',
      type: 'checkbox',
      options: async form => {
        // simulate fetching data from the backend
        const fetch = (gender: string) => {
          return new Promise<any[]>(resolve => {
            setTimeout(() => {
              resolve(
                gender === 'man' ? ['Sing', 'Dance', 'Rap'] : ['Piano', 'Dance']
              )
            }, 600)
          })
        }
        return await fetch(form.gender)
      },
    },
  ],
}
</script>
