<template>
  <div>
    {{ value }}
  </div>
  <np-radio v-model="value" :options="['北京', '上海', '广州']" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const value = ref<string | null>(null)
</script>
