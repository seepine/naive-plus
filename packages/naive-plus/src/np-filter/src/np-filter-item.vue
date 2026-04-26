<template>
  <div :class="bemClass">
    <NpCellGroup
      v-for="(item, idx) in groups"
      :key="`__${idx}`"
      v-model:keys="selectedKeys"
      :title="item.title"
      :options="item.options"
      size="small"
      :type="item.type"
      @change="handleChange"
    ></NpCellGroup>
  </div>
</template>
<script setup lang="tsx">
import { ref, watch } from 'vue'
import { useCreate } from '../../_hooks/create'
import { computedAsync, isArray, runAsync } from '../../utils'
import type { NpFilterItem, NpFilterItemOption } from './props'
import {
  NpCellGroup,
  type NpCellGroupKey,
  type NpCellGroupKeys,
  type NpCellOption,
} from '../../np-cell'

const { bemClass } = useCreate('np-filter-option')

const props = defineProps<{
  option: NpFilterItem
  value?: NpCellGroupKey | NpCellGroupKeys
}>()

const emit = defineEmits<{
  (e: 'update:value', value?: NpCellGroupKey | NpCellGroupKeys): void
}>()

const loading = ref(false)

const selectedKeys = ref<NpCellGroupKeys>([])
const initKeys = () => {
  if (isArray(props.value)) {
    selectedKeys.value = props.value
  } else {
    selectedKeys.value =
      props.value !== undefined && props.value !== null ? [props.value] : []
  }
}
initKeys()

// watch(
//   () => props.value,
//   () => {
//     if (isArray(props.value)) {
//       selectedKeys.value = props.value
//     } else {
//       selectedKeys.value =
//         props.value !== undefined && props.value !== null ? [props.value] : []
//     }
//   },
//   { immediate: true, deep: true }
// )

const groupOption = computedAsync<
  {
    title?: string
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
const groups = ref<
  {
    title?: string
    type: 'checkbox' | 'radio'
    options: NpCellOption[]
  }[]
>([])

watch(
  groupOption,
  () => {
    groups.value = groupOption.value.map(item => {
      return {
        title: item.title,
        type: props.option.multiple === false ? 'radio' : 'checkbox',
        options: item.options.map(opt => {
          return {
            label: opt.label,
            key: opt.value,
            checked: false,
            type: props.option.multiple === false ? 'radio' : 'checkbox',
          }
        }),
      }
    })
  },
  { immediate: true }
)

const handleChange = (keys: NpCellGroupKeys, item: NpCellOption) => {
  // 多选
  if (props.option.multiple !== false) {
    emit('update:value', keys)
  }
  // 单选
  else {
    emit('update:value', keys.length > 0 ? keys[0] : undefined)
  }
}
</script>
