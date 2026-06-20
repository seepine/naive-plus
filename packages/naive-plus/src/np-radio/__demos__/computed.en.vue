<template>
  <div>
    {{ value }}
  </div>
  <div>
    <np-button
      :type="type === 'Fujian' ? 'primary' : undefined"
      @click="() => (type = 'Fujian')"
    >
      Fujian
    </np-button>
    <np-button
      :type="type === 'Guangdong' ? 'primary' : undefined"
      @click="() => (type = 'Guangdong')"
    >
      Guangdong
    </np-button>
  </div>
  <np-radio v-model="value" :options="options" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string | null>(null)

const type = ref('Fujian')

const options = async () => {
  return type.value === 'Fujian'
    ? await new Promise<any[]>(resolve => {
        setTimeout(
          () => resolve(['Fuzhou', 'Xiamen', 'Longyan', 'Sanming']),
          1500
        )
      })
    : await new Promise<any[]>(resolve => {
        setTimeout(() => resolve(['Guangzhou', 'Shenzhen', 'Zhuhai']), 1500)
      })
}
</script>
