import type { VNode, PropType, ExtractPropTypes } from 'vue'

export const npCellProps = {
  type: {
    type: String as PropType<'checkbox' | 'radio' | 'switch'>,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [Object, Function] as PropType<VNode | (() => VNode)>,
  },
  label: {
    type: [String, Function] as PropType<string | VNode | (() => VNode)>,
    required: true as const,
  },
  value: {
    type: [String, Function] as PropType<string | VNode | (() => VNode)>,
  },
  arrow: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
}

export interface NpCellOption {
  type?: 'checkbox' | 'radio' | 'switch'
  checked?: boolean
  icon?: VNode | (() => VNode)
  label: string | VNode | (() => VNode)
  value?: string | VNode | (() => VNode)
  arrow?: boolean
  onClick?: () => void
}

export const npCellGroupProps = {
  title: {
    type: String,
  },
  options: {
    type: Array as PropType<NpCellOption[]>,
    default: () => [],
  },
}

export type NpCellProps = ExtractPropTypes<typeof npCellProps>
export type NpCellGroupProps = ExtractPropTypes<typeof npCellGroupProps>
