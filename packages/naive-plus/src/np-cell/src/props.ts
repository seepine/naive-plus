import type { VNode, PropType, ExtractPropTypes } from 'vue'

export type NpCellRender = () => VNode
export type NpCellContent = string | VNode | NpCellRender

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
    type: [Object, Function] as PropType<VNode | NpCellRender>,
  },
  label: {
    type: [String, Object, Function] as PropType<NpCellContent>,
    required: true as const,
  },
  value: {
    type: [String, Object, Function] as PropType<NpCellContent>,
  },
  description: {
    type: [String, Object, Function] as PropType<NpCellContent>,
  },
  footer: {
    type: [Object, Function] as PropType<VNode | NpCellRender>,
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
