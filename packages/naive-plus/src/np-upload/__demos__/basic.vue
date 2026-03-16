<template>
  <div>
    {{ fileList }}
    <np-upload
      v-model="fileList"
      :props="{
        action: '/api/file/upload',
        name: 'file',
      }"
    >
      <n-button>上传文件</n-button>
    </np-upload>
  </div>
</template>
<script setup lang="ts">
import { NButton } from 'naive-ui'
import { ref } from 'vue'

const fileList = ref<string[]>([])
</script>
