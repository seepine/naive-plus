<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    type="warning"
    title="确认删除"
    content="确定要删除该条数据吗？此操作不可恢复。"
    positive-text="确认删除"
    negative-text="取消"
    :auto-focus="false"
    :positive-button-props="{ type: 'error', loading }"
    @positive-click="handleConfirm"
    @negative-click="handleCancel"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NModal } from 'naive-ui'
import type { AnyObject } from '../../../types'

const props = defineProps<{
  visible: boolean
  loading: boolean
  row: AnyObject
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  confirm: [row: AnyObject]
}>()

const visible = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val),
})

const handleConfirm = () => {
  emit('confirm', props.row)
}

const handleCancel = () => {
  emit('update:visible', false)
}
</script>
