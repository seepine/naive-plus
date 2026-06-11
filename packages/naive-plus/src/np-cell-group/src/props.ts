import type { PropType, ExtractPropTypes, VNode } from 'vue'

export type NpCellGroupKey = number | string
export type NpCellGroupKeys = NpCellGroupKey[]

export interface NpCellOption {
  key?: NpCellGroupKey
  label: string | VNode | (() => VNode)
  icon?: VNode | (() => VNode)
  value?: string | VNode | (() => VNode)
  description?: string | VNode | (() => VNode)
  hover?: boolean
  arrow?: boolean
  onClick?: () => void
}

export const npCellGroupProps = {
  keys: {
    type: Array as PropType<NpCellGroupKeys>,
    default: () => [],
  },
  title: {
    type: String,
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
  type: {
    type: String as PropType<'checkbox' | 'radio' | 'switch'>,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<NpCellOption[]>,
    default: () => [],
  },
}

export type NpCellGroupProps = ExtractPropTypes<typeof npCellGroupProps>
