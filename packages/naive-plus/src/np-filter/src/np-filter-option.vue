<template>
  <div :class="`${bemClass}`">
    <div
      v-for="(group, idx) in groupOption"
      :key="`__${idx}`"
      :class="`${bemClass}__group`"
    >
      <div v-if="group.title" :class="`${bemClass}__group-title`">
        <component :is="group.title" v-if="isFunction(group.title)" />
        <span v-else>
          {{ group.title }}
        </span>
      </div>
      <div
        v-for="item in group.options"
        :key="item.value"
        :class="[
          `${bemClass}__item`,
          isSelected(item.value) && `${bemClass}__item--selected`,
        ]"
        @click="handleSelect(item.value)"
      >
        <div :class="`${bemClass}__item-left`">
          <div :class="`${bemClass}__item-status`">
            <NCheckbox
              v-if="option.multiple !== false"
              size="small"
              :checked="isSelected(item.value)"
            ></NCheckbox>
            <NRadio
              v-else
              size="small"
              :checked="isSelected(item.value)"
            ></NRadio>
          </div>

          <div v-if="item.icon" :class="`${bemClass}__item-icon`">
            <component :is="item.icon" />
          </div>
          <div :class="`${bemClass}__item-label`">
            <component :is="item.label" v-if="isFunction(item.label)" />
            <span v-else>
              {{ item.label }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="tsx">
import { ref, type VNode } from 'vue'
import { useCreate } from '../../_hooks/create'
import { computedAsync, isFunction, runAsync } from '../../utils'
import type { NpFilterItem, NpFilterItemOption } from './props'
import { NCheckbox, NRadio } from 'naive-ui'

const { bemClass } = useCreate('np-filter-option')

const props = defineProps<{
  option: NpFilterItem
  value: any
}>()

const emit = defineEmits<{
  (e: 'update:value', value: any): void
}>()

const loading = ref(false)
const groupOption = computedAsync<
  {
    title?: string | (() => VNode)
    options: NpFilterItemOption[]
  }[]
>(
  async () => {
    const timer = setTimeout(() => {
      loading.value = true
    }, 250)
    try {
      const res = await runAsync<any[]>(props.option.options)
      if (res.length === 0) {
        return []
      }
      const isGroup = 'title' in res[0] && 'options' in res[0]
      if (!isGroup) {
        return [
          {
            title: '',
            options: res,
          },
        ]
      }
      return await Promise.all(
        res.map(async item => {
          const options = await runAsync<any[]>(item.options)
          return {
            title: item.title,
            options,
          }
        })
      )
    } catch {
      return []
    } finally {
      clearTimeout(timer)
      loading.value = false
    }
  },
  [],
  { resetInitialStateEffect: true }
)

const isSelected = (itemValue: any) => {
  if (props.option.multiple !== false) {
    const values = Array.isArray(props.value) ? props.value : []
    return values.includes(itemValue)
  }
  return props.value === itemValue
}

const handleSelect = (itemValue: any) => {
  if (props.option.multiple !== false) {
    const values = Array.isArray(props.value) ? [...props.value] : []
    const index = values.indexOf(itemValue)
    if (index > -1) {
      values.splice(index, 1)
    } else {
      values.push(itemValue)
    }
    emit('update:value', values)
  } else {
    if (props.value === itemValue) {
      emit('update:value', undefined)
    } else {
      emit('update:value', itemValue)
    }
  }
}
</script>
