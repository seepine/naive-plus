<template>
  <div :class="bemClass">
    <div v-if="props.title" :class="`${bemClass}__title`">
      {{ props.title }}
    </div>
    <NpCell
      v-for="(item, idx) in props.options"
      v-bind="item"
      :key="idx"
      @click="handleClick(item)"
      @update:checked="handleChecked(item, $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useCreate } from '../../_hooks/create'
import { npCellGroupProps, type NpCellOption } from './props'
import NpCell from './np-cell.vue'

const { bemClass } = useCreate('np-cell-group')

const props = defineProps(npCellGroupProps)

const emit = defineEmits<{
  (e: 'click', item: NpCellOption): void
}>()

const handleClick = (item: NpCellOption) => {
  item.onClick?.()
  emit('click', item)
}

const handleChecked = (item: NpCellOption, value: boolean) => {
  item.checked = value
}
</script>
