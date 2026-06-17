import type { PropType, ExtractPropTypes } from 'vue'
import type { CustomVNode } from '../../types'

export type NpCellGroupKey = number | string
export type NpCellGroupKeys = NpCellGroupKey[]

export interface NpCellGroupOption {
  key?: NpCellGroupKey
  label: string | CustomVNode
  icon?: CustomVNode
  value?: string | CustomVNode
  description?: string | CustomVNode
  footer?: CustomVNode
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
    type: Array as PropType<NpCellGroupOption[]>,
    default: () => [],
  },
}

export type NpCellGroupProps = ExtractPropTypes<typeof npCellGroupProps>
