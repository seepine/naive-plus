<template>
  <NpFilter
    v-if="props.filters && props.filters.length > 0"
    :params="filterValue"
    :items="props.filters"
    placement="left"
    @change="handleFilterParamsChange"
  >
    <NBadge :dot="true" :show="hasFilter" type="info">
      <NButton secondary :class="`${bemClass}-button`">
        <template #icon>
          <NIcon>
            <FilterIcon />
          </NIcon>
        </template>
      </NButton>
    </NBadge>
  </NpFilter>

  <!-- 显隐设置 -->
  <NPopover
    trigger="click"
    show-arrow
    :class="`${bemClass}-display-popover`"
    placement="bottom-end"
    :style="{
      '--n-padding': '4px',
    }"
  >
    <template #trigger>
      <NButton secondary :class="`${bemClass}-button`">
        <template #icon>
          <NIcon>
            <DisplayIcon />
          </NIcon>
        </template>
      </NButton>
    </template>
    <div style="min-width: 120px">
      <NpCellGroup
        size="small"
        title="显示设置"
        :options="displayOptions"
      ></NpCellGroup>
    </div>
  </NPopover>

  <NButton secondary :class="`${bemClass}-button`" @click="onRefresh">
    <template #icon>
      <NIcon>
        <RefreshIcon />
      </NIcon>
    </template>
  </NButton>
</template>

<script setup lang="tsx">
import { computed, ref } from 'vue'
import { NButton, NSwitch, NIcon, useMessage, NPopover } from 'naive-ui'
import type { NTableColumnExt } from '../interface'
import { NpFilter, type NpFilterItem } from '../../../np-filter'
import FilterIcon from '../icon/filter.vue'
import DisplayIcon from '../icon/display.vue'
import RefreshIcon from '../icon/refresh.vue'
import { NpCellGroup, type NpCellOption } from '../../../np-cell-group'

const props = defineProps<{
  filters?: NpFilterItem[]
  columns: NTableColumnExt[]
  onRefresh: () => void
  onFilterChange: (params: Record<string, any>) => void
}>()
const emit = defineEmits<{
  (e: 'update:columns', columns: NTableColumnExt[]): void
}>()

const bemClass = 'np-table__header-right'

const filterValue = ref<Record<string, any>>({})

const handleFilterParamsChange = (params: Record<string, any>) => {
  filterValue.value = params
  props.onFilterChange(params)
}
const hasFilter = computed(() => {
  return filterValue.value && Object.keys(filterValue.value).length > 0
})

const handleColumnDisplay = (key: string, val: boolean) => {
  const displayCount = props.columns.filter(col => col.display !== false).length
  if (displayCount === 1 && !val) {
    // 最后一个显示的列不允许隐藏
    try {
      const message = useMessage()
      message.warning('至少保留一列显示')
    } catch {}
    return
  }
  props.columns.forEach(col => {
    if (col.key === key) {
      col.display = val
    }
  })

  emit('update:columns', props.columns)
}

const displayOptions = computed<NpCellOption[]>(() => {
  return props.columns.map(
    (col): NpCellOption => ({
      key: col.key,
      label: col.label,
      hover: true,
      value: () => <NSwitch size="small" value={col.display} />,
      onClick: () => handleColumnDisplay(col.key, col.display === false),
    })
  )
})
</script>
