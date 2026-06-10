<template>
  <n-modal
    v-model:show="show"
    preset="card"
    :title="title"
    :style="{ width: '560px' }"
    :closable="!loading"
    :auto-focus="false"
  >
    <np-form ref="formRef" v-model="innerData" :option="formOption" />
    <template #footer>
      <div style="display: flex; gap: 8px; justify-content: flex-end">
        <n-button :disabled="loading" @click="handleCancel">取消</n-button>
        <n-button type="primary" :loading="loading" @click="handleSubmit">
          确认
        </n-button>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { NButton, NModal } from 'naive-ui'
import NpForm from '../../../np-form'
import { buildFormColumns, getFormTitle, type CrudMode } from '../use-crud'
import type { TableColumn } from '../interface'
import type { FormOption } from '../../../np-form'
import type { AnyObject } from '../../../types'

type FormMode = Exclude<CrudMode, 'del'>

const props = defineProps<{
  visible: boolean
  mode: FormMode
  columns: TableColumn[]
  modelValue: AnyObject
  loading: boolean
  formProps?: FormOption['props']
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'update:modelValue': [value: AnyObject]
  submit: [data: AnyObject]
}>()

const formRef = ref()

const show = computed({
  get: () => props.visible,
  set: val => emit('update:visible', val),
})

const innerData = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const title = computed(() => getFormTitle(props.mode))

const formOption = computed<FormOption>(() => ({
  footer: false,
  props: props.formProps,
  columns: buildFormColumns(props.columns, props.mode),
}))

watch(
  () => props.visible,
  val => {
    if (!val) formRef.value?.restoreValidation?.()
  }
)

const handleCancel = () => emit('update:visible', false)

const handleSubmit = async () => {
  try {
    await formRef.value?.validate?.()
  } catch {
    return
  }
  emit('submit', { ...innerData.value })
}
</script>
