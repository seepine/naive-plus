<template>
  <div>
    {{ value }}
  </div>
  <div>
    <np-button
      :type="type === '福建' ? 'primary' : undefined"
      @click="() => (type = '福建')"
    >
      福建
    </np-button>
    <np-button
      :type="type === '广东' ? 'primary' : undefined"
      @click="() => (type = '广东')"
    >
      广东
    </np-button>
  </div>
  <np-radio v-model="value" :options="options" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string | null>(null)

const type = ref('福建')

const options = async () => {
  return type.value === '福建'
    ? await new Promise<any[]>(resolve => {
        setTimeout(() => resolve(['福州', '厦门', '龙岩', '三明']), 1500)
      })
    : await new Promise<any[]>(resolve => {
        setTimeout(() => resolve(['广州', '深圳', '珠海']), 1500)
      })
}
</script>
