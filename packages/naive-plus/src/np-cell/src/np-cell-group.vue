<template>
  <div :class="`${bemClass} ${bemClass}__${props.size}`">
    <div v-if="props.title" :class="`${bemClass}__title`">
      {{ props.title }}
    </div>
    <NpCell
      v-for="(item, idx) in props.options"
      :key="item.key"
      :label="item.label"
      :icon="item.icon"
      :value="item.value"
      :description="item.description"
      :hover="item.hover"
      :arrow="item.arrow"
      :type="props.type"
      :size="props.size"
      :bordered="props.bordered && idx < props.options.length - 1"
      :checked="selectedKeys.includes(item.key === undefined ? idx : item.key)"
      @click="handleClick(item)"
    />
  </div>
</template>
<script setup lang="ts">
import { useCreate } from '../../_hooks/create'
import {
  npCellGroupProps,
  type NpCellGroupKeys,
  type NpCellOption,
} from './props'
import NpCell from './np-cell.vue'
import { ref, watch } from 'vue'

const { bemClass } = useCreate('np-cell-group')

const props = defineProps(npCellGroupProps)

const emit = defineEmits<{
  (e: 'update:keys', keys: NpCellGroupKeys): void
  (e: 'change', keys: NpCellGroupKeys, item: NpCellOption): void
}>()

const selectedKeys = ref<NpCellGroupKeys>([])
watch(
  () => props.keys,
  () => {
    selectedKeys.value = props.keys
  },
  { immediate: true, deep: true }
)

const handleClick = (item: NpCellOption) => {
  const key = item.key === undefined ? props.options.indexOf(item) : item.key
  if (props.type === 'radio') {
    if (selectedKeys.value.includes(key)) {
      selectedKeys.value = []
    } else {
      selectedKeys.value = [key]
    }
  } else {
    if (selectedKeys.value.includes(key)) {
      selectedKeys.value = selectedKeys.value.filter(k => k !== key)
    } else {
      selectedKeys.value.push(key)
    }
  }

  emit('change', selectedKeys.value, item)
  emit('update:keys', selectedKeys.value)

  item.onClick?.()
}
</script>
