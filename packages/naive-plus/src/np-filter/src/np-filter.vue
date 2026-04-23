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
          :class="`${bemClass}__category-option-popover`"
        >
          <template #trigger>
            <div :class="`${bemClass}__category-item-content`">
              <div :class="`${bemClass}__category-item-content-left`">
                <div
                  v-if="option.icon"
                  :class="`${bemClass}__category-item-content-icon`"
                >
                  <component :is="option.icon" />
                </div>
                <div :class="`${bemClass}__category-item-content-label`">
                  <component
                    :is="option.label"
                    v-if="isFunction(option.label)"
                  />
                  <span v-else>
                    {{ option.label }}
                  </span>
                </div>
              </div>
              <div :class="`${bemClass}__category-item-content-right`">
                <div
                  v-if="optionCount(option) > 0"
                  :class="`${bemClass}__category-item-content-count`"
                >
                  {{ optionCount(option) }}
                </div>
                <NIcon>
                  <ArrowRightIcon />
                </NIcon>
              </div>
            </div>
          </template>

          <NpFilterOption
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
        <div :class="`${bemClass}__category-item-content`">清除所有筛选</div>
      </div>
    </div>
  </NPopover>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCreate } from '../../_hooks/create'
import { npFilterProps, type NpFilterItem } from './props'
import { NPopover, NIcon, NDivider, type PopoverInst } from 'naive-ui'
import ArrowRightIcon from './icon/arrow-right.vue'
import { isFunction } from '../../utils'
import NpFilterOption from './np-filter-option.vue'
import { throttle } from 'lodash-es'

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
