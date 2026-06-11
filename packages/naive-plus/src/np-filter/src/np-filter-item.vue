<template>
  <div :class="bemClass">
    <template v-if="props.option.searchable">
      <div style="padding: 4px">
        <NInput v-model:value="searchKey" size="small"></NInput>
      </div>

      <NDivider style="margin: 0"></NDivider>
    </template>

    <NScrollbar style="max-height: 300px">
      <div style="padding: 4px">
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
        <NEmpty v-if="groups.length === 0" size="tiny"></NEmpty>
      </div>
    </NScrollbar>
  </div>
</template>

<script setup lang="tsx">
import { ref, watch } from 'vue'
import { useCreate } from '../../_hooks/create'
import { computedAsync, isArray, isString, runAsync } from '../../utils'
import type { NpFilterItem, NpFilterItemOption } from './props'
import {
  NpCellGroup,
  type NpCellGroupKey,
  type NpCellGroupKeys,
  type NpCellGroupOption,
} from '../../np-cell-group'
import { NDivider, NEmpty, NInput } from 'naive-ui'

const { bemClass } = useCreate('np-filter-option')

const props = defineProps<{
  option: NpFilterItem
  value?: NpCellGroupKey | NpCellGroupKeys
}>()

const emit = defineEmits<{
  (e: 'update:value', value?: NpCellGroupKey | NpCellGroupKeys): void
}>()

const loading = ref(false)
const searchKey = ref('')

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
    options: NpCellGroupOption[]
  }[]
>([])
const calcGroup = () => {
  groups.value = groupOption.value
    .map(item => {
      return {
        title: item.title,
        type:
          props.option.multiple === false
            ? ('radio' as const)
            : ('checkbox' as const),
        options: item.options
          .filter(opt => {
            if (searchKey.value && isString(opt.label)) {
              return opt.label.includes(searchKey.value)
            }
            return true
          })
          .map(opt => {
            return {
              label: opt.label,
              key: opt.value,
            }
          }),
      }
    })
    .filter(group => group.options.length > 0)
}

watch(groupOption, calcGroup, { immediate: true, deep: true })
watch(searchKey, calcGroup, { immediate: true })

const handleChange = (keys: NpCellGroupKeys, item: NpCellGroupOption) => {
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
