<template>
  <div>
    {{ fileList }}
    <np-upload v-model="fileList" :props="{ listType: 'image-card' }">
      Click to upload
    </np-upload>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const fileList = ref<string[]>([])
</script>
