import type { VNode, PropType, ExtractPropTypes } from 'vue'
import type { AsyncValue } from '../../types'

export interface NpFilterItemOption {
  icon?: VNode | (() => VNode)
  label: string | (() => VNode)
  value: string | number
}

export interface NpFilterItem {
  icon?: VNode | (() => VNode)
  label: string | (() => VNode)
  key: string
  multiple?: boolean
  searchable?: boolean
  options:
    | AsyncValue<NpFilterItemOption[]>
    | Array<{
        title: string | (() => VNode)
        options: AsyncValue<NpFilterItemOption[]>
      }>
}

export type NpFilterItems = NpFilterItem[]

export const npFilterProps = {
  params: {
    type: Object as PropType<Record<string, any>>,
    required: true as const,
  },
  items: {
    type: Array as PropType<NpFilterItems>,
    required: true as const,
  },
  trigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  placement: {
    type: String as PropType<'left' | 'right'>,
  },
  onChange: {
    type: Function as PropType<(params: Record<string, any>) => void>,
    required: false as const,
  },
}

export type NpFilterProps = ExtractPropTypes<typeof npFilterProps>
