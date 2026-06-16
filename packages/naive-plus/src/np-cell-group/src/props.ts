import type { VNode, PropType, ExtractPropTypes } from 'vue'
import type { NpCellContent, NpCellRender } from '../../np-cell'

export type NpCellGroupKey = number | string
export type NpCellGroupKeys = NpCellGroupKey[]
export type NpCellGroupContent = NpCellContent
export type NpCellGroupRender = NpCellRender

export interface NpCellGroupOption {
  key?: NpCellGroupKey
  label: NpCellGroupContent
  icon?: VNode | NpCellGroupRender
  value?: NpCellGroupContent
  description?: NpCellGroupContent
  footer?: VNode | NpCellGroupRender
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
