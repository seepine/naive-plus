<template>
  <div>
    {{ data }}
    <np-form v-model="data" :option="option" />
  </div>
</template>
<script setup lang="ts">
import type { FormOption } from 'naive-plus'
import { ref, h } from 'vue'

type User = {
  fullName?: string
  tel?: number
  age?: number
  gender?: 'man' | 'woman'
  hobby?: Array<'Sing' | 'Dance' | 'Rap'>
}

const data = ref<User>({
  hobby: ['Sing'],
})

const option: FormOption<User> = {
  onSubmit: async form => {
    console.log('Submitted', form)
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1200))
  },
  onReset: form => {
    console.log('Reset', form)
  },
  columns: [
    {
      label: 'Name',
      key: 'fullName',
    },
    {
      label: 'Phone',
      key: 'tel',
      type: 'number',
    },
    {
      label: 'Age',
      key: 'age',
      // type declares the inner component, e.g. number uses naive-ui's n-input[type=number]
      type: 'number',
      // props passed to the inner component; see InputProps of naive-ui
      props: {
        min: 0,
        max: 99,
      },
      // slots passed to the inner component; see InputSlots of naive-ui
      slots: {
        suffix: () => [h('span', null, 'years')],
      },
    },
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
      label: 'Hobbies',
      key: 'hobby',
      type: 'checkbox',
      options: ['Sing', 'Dance', 'Rap'],
    },
  ],
}
</script>
