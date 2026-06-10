<template>
  <NPopover
    ref="popoverRef"
    :class="bemClass"
    :trigger="props.trigger || 'click'"
    :placement="placement"
  >
    <template #trigger>
      <slot />
    </template>

    <div :class="`${bemClass}__category`">
      <div
        v-for="option in props.items"
        :key="option.key"
        :class="`${bemClass}__category-item`"
      >
        <NPopover
          :placement="secondPlacement"
          trigger="hover"
          :show-arrow="false"
          display-directive="show"
          :style="{ '--n-space': '3px', '--n-padding': '4px 0' }"
        >
          <template #trigger>
            <NpCell
              :icon="option.icon"
              :label="option.label"
              :value="
                optionCount(option) > 0 ? `${optionCount(option)}` : undefined
              "
              :arrow="true"
              :hover="true"
              size="small"
            ></NpCell>
          </template>

          <FilterItem
            :option="option"
            :value="props.params?.[option.key]"
            @update:value="handleUpdateValue(option.key, $event)"
          />
        </NPopover>
      </div>

      <NDivider v-if="hasAnyValue" style="margin: 4px 0"></NDivider>

      <div
        v-if="hasAnyValue"
        :class="`${bemClass}__category-item ${bemClass}__category-item-clear`"
        @click="handleClear"
      >
        <NpCell label="清除所有筛选" size="small" :hover="true"></NpCell>
      </div>
    </div>
  </NPopover>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCreate } from '../../_hooks/create'
import { npFilterProps, type NpFilterItem } from './props'
import { NPopover, NDivider, type PopoverInst, NScrollbar } from 'naive-ui'
import { NpCell } from '../../np-cell'
import { throttle } from 'lodash-es'
import FilterItem from './np-filter-item.vue'

const { bemClass } = useCreate('np-filter')
const props = defineProps(npFilterProps)
const emit = defineEmits(['update:params', 'change'])
const popoverRef = ref<PopoverInst>()

const optionCount = (option: NpFilterItem) => {
  const value = props.params?.[option.key]
  if (option.multiple !== false) {
    return Array.isArray(value) ? value.length : 0
  }
  return value !== undefined && value !== null ? 1 : 0
}
const emitParamsChange = throttle((params: Record<string, any>) => {
  emit('update:params', params)
  emit('change', params)
}, 150)

const handleUpdateValue = (key: string, value: any) => {
  const newParams = { ...(props.params || {}) }
  const isEmptyArray = Array.isArray(value) && value.length === 0
  if (value === undefined || value === null || isEmptyArray) {
    delete newParams[key]
  } else {
    newParams[key] = value
  }
  emitParamsChange(newParams)
}

const hasAnyValue = computed(() => {
  return props.items.some(option => {
    const value = props.params?.[option.key]
    if (option.multiple !== false) {
      return Array.isArray(value) && value.length > 0
    }
    return value !== undefined && value !== null
  })
})

const handleClear = () => {
  const newParams: Record<string, any> = {}
  emitParamsChange(newParams)
  popoverRef.value?.setShow(false)
}

const placement = computed(() => {
  if (!props.placement) {
    return 'bottom'
  }
  return `bottom-${props.placement === 'right' ? 'start' : 'end'}`
})

const secondPlacement = computed(() => {
  if (!props.placement) {
    return 'right-start'
  }
  return `${props.placement}-start`
})
</script>
