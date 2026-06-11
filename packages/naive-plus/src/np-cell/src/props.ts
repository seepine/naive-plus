import type { VNode, PropType, ExtractPropTypes } from 'vue'

export const npCellProps = {
  type: {
    type: String as PropType<'checkbox' | 'radio' | 'switch'>,
  },
  hover: {
    type: Boolean,
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
  description: {
    type: [String, Function] as PropType<string | VNode | (() => VNode)>,
  },
  arrow: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium',
  },
}

export type NpCellProps = ExtractPropTypes<typeof npCellProps>
