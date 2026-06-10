<template>
  <div :class="bemClass">
    <component :is="prefixRender?.(rowData, rowIndex)" v-if="prefixRender" />
    <NDropdown
      trigger="click"
      placement="bottom-end"
      :options="dropdownOptions"
      :class="`${bemClass}-dropdown`"
      @select="handleSelect"
    >
      <NButton size="small" secondary :class="`${bemClass}-button`">
        <template #icon>
          <icon-more />
        </template>
      </NButton>
    </NDropdown>
    <component :is="suffixRender?.(rowData, rowIndex)" v-if="suffixRender" />
  </div>
</template>

<script setup lang="ts">
import { computed, type VNode } from 'vue'
import { NButton, NDropdown, type DropdownOption } from 'naive-ui'
import { buildOperationOptions } from './use-action-option'
import type { TableOperationOption } from './interface'
import IconMore from './icon/more.vue'

const props = defineProps<{
  rowData: Record<string, any>
  rowIndex: number
  options?: TableOperationOption[]
  prefixRender?: (rowData: Record<string, any>, rowIndex: number) => VNode
  suffixRender?: (rowData: Record<string, any>, rowIndex: number) => VNode
  onSelect?: (key: string) => void | boolean
}>()

const bemClass = 'np-table__operation'

const dropdownOptions = computed<DropdownOption[]>(() =>
  buildOperationOptions(props.options)
)

const handleSelect = (key: string | number) => {
  props.onSelect?.(String(key))
}
</script>
