<template>
  <div :class="bemClass">
    <div :class="bemClass + '__left'">
      <slot name="header-left" />
    </div>
    <div :class="bemClass + '__right'">
      <slot name="header-right" />
      <NpFilter
        v-if="props.filters && props.filters.length > 0"
        :params="filterValue"
        :items="props.filters"
        placement="left"
        @change="handleFilterParamsChange"
      >
        <NButton size="small" secondary :class="bemClass + '__button'">
          <template #icon>
            <NIcon>
              <FilterIcon />
            </NIcon>
          </template>
        </NButton>
      </NpFilter>

      <!-- 显隐设置 -->
      <NDropdown
        :show="displayShow"
        trigger="manual"
        :options="displayOptions"
        show-arrow
        class="np-table-header__display_dropdown"
        placement="bottom-end"
        @clickoutside="displayShow = false"
      >
        <NButton
          size="small"
          secondary
          :class="bemClass + '__button'"
          @click="handlerDisplayTrigger"
        >
          <template #icon>
            <NIcon>
              <DisplayIcon />
            </NIcon>
          </template>
        </NButton>
      </NDropdown>

      <NButton
        size="small"
        secondary
        :class="bemClass + '__button'"
        @click="onRefresh"
      >
        <template #icon>
          <NIcon>
            <RefreshIcon />
          </NIcon>
        </template>
      </NButton>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { computed, ref, watch } from 'vue'
import {
  NButton,
  NSwitch,
  NIcon,
  NDropdown,
  type DropdownOption,
  useMessage,
} from 'naive-ui'
import { useCreate } from '../../../../_hooks/create'
import type { TableColumn } from '../../interface'
import { NpFilter, type NpFilterItem } from '../../../../np-filter'
import FilterIcon from './icon/filter.vue'
import DisplayIcon from './icon/display.vue'
import RefreshIcon from './icon/refresh.vue'

defineOptions({
  name: 'NpTableHeader',
})

const props = defineProps<{
  filters?: NpFilterItem[]
  columns: TableColumn[]
  onRefresh: () => void
  onFilterChange: (key: string, value: any) => void
  onDisplayChange: (columns: TableColumn[]) => void
}>()

const { bemClass } = useCreate('np-table-header')

const filterValue = ref<Record<string, any>>({})
const localColumns = ref<TableColumn[]>([])

const isSameFilterValue = (prev: any, next: any) => {
  if (Array.isArray(prev) && Array.isArray(next)) {
    if (prev.length !== next.length) {
      return false
    }
    return prev.every((item, index) => item === next[index])
  }
  return prev === next
}

const normalizeFilterValue = (
  value: any,
  filter: NpFilterItem
): undefined | any[] | any => {
  if (filter.multiple === false) {
    return value
  }
  return Array.isArray(value) ? value : []
}

const normalizeFilterParams = (params: Record<string, any>) => {
  const nextParams: Record<string, any> = {}
  props.filters?.forEach(filter => {
    nextParams[filter.key] = normalizeFilterValue(params?.[filter.key], filter)
  })
  return nextParams
}

watch(
  () => props.filters,
  () => {
    filterValue.value = normalizeFilterParams(filterValue.value)
  },
  { immediate: true }
)

const initLocalColumns = () => {
  if (props.columns) {
    localColumns.value = props.columns.map(col => ({
      ...col,
      display: col.display !== false,
    }))
  }
}

watch(
  () => props.columns,
  () => {
    if (
      props.columns &&
      props.columns.length > 0 &&
      localColumns.value.length === 0
    ) {
      initLocalColumns()
    }
  },
  { immediate: true }
)

const displayableColumns = computed(() => {
  return localColumns.value.filter(
    col => !col.type || !['selection', 'index', 'expand'].includes(col.type)
  )
})

const handleFilterParamsChange = (params: Record<string, any>) => {
  const nextParams = normalizeFilterParams(params)
  props.filters?.forEach(filter => {
    const key = filter.key
    if (!isSameFilterValue(filterValue.value[key], nextParams[key])) {
      props.onFilterChange(key, nextParams[key])
    }
  })
  filterValue.value = nextParams
}

const handleColumnDisplay = (key: string, val: boolean) => {
  const displayCount = displayableColumns.value.filter(
    col => col.display !== false
  ).length
  if (displayCount === 1 && !val) {
    // 最后一个显示的列不允许隐藏
    try {
      const message = useMessage()
      message.warning('至少保留一列显示')
    } catch {}
    return
  }
  const column = localColumns.value.find(c => c.key === key)
  if (column) {
    column.display = val
  }
}

const handleDisplayConfirm = () => {
  props.onDisplayChange(localColumns.value)
}

const displayShow = ref(false)
const displayOptions = computed<DropdownOption[]>(() => {
  return [
    {
      type: 'group',
      label: '显示设置',
    },
    ...displayableColumns.value.map(item => {
      return {
        label: () => {
          return (
            <div class="np-table-header__display_option">
              <span>{item.title}</span>
              <NSwitch size="small" value={item.display}></NSwitch>
            </div>
          )
        },
        key: item.key,
        props: {
          onClick: (e: Event) => {
            handleColumnDisplay(item.key, !(item.display ?? true))
            handleDisplayConfirm()
          },
        },
      }
    }),
  ]
})

const handlerDisplayTrigger = (e: Event) => {
  e.stopPropagation()
  e.preventDefault()
  if (!displayShow.value) {
    displayShow.value = true
  }
}
</script>
