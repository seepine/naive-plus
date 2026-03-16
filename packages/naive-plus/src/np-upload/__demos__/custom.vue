<template>
  <div>
    {{ fileList }}
    <np-upload v-model="fileList" :props="{ listType: 'image-card' }">
      点击上传
    </np-upload>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref<string[]>([])
</script>
