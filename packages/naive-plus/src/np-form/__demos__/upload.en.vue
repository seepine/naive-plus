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
  onSubmit: async form => {
    console.log('Submitted', form)
  },
  columns: [
    {
      label: 'Attachment',
      key: 'files',
      type: 'upload',
      props: {
        action: '/api/file/upload',
      },
    },
  ],
}
</script>
