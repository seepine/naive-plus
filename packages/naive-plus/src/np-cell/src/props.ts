import type { PropType, ExtractPropTypes } from 'vue'
import type { CustomVNode } from '../../types'

export const npCellProps = {
  type: {
    type: String as PropType<'checkbox' | 'radio' | 'switch'>,
  },
  hover: {
    type: Boolean,
    default: undefined,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: [Object, Function] as PropType<CustomVNode>,
  },
  label: {
    type: [String, Object, Function] as PropType<string | CustomVNode>,
    required: true as const,
  },
  value: {
    type: [String, Object, Function] as PropType<string | CustomVNode>,
  },
  description: {
    type: [String, Object, Function] as PropType<string | CustomVNode>,
  },
  footer: {
    type: [Object, Function] as PropType<CustomVNode>,
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
