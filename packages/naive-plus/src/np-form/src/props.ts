import type { ExtractPropTypes, PropType } from 'vue'
import type { FormColumn, FormOption } from './interface'
import type { AnyObject } from '../../types'

export const npFormProps = {
  modelValue: {
    type: Object as PropType<AnyObject>,
    required: false,
  },
  'update:modelValue': {
    type: Function as PropType<(data: AnyObject) => void>,
    required: false,
  },
  option: {
    type: Object as PropType<FormOption<any>>,
    required: true,
    default: () => {
      return { columns: [] }
    },
  },
}

export type NpFormProps = ExtractPropTypes<typeof npFormProps>

export const npFormItemProps = {
  column: {
    type: Object as PropType<FormColumn<any>>,
    required: true,
    default: () => {
      return {}
    },
  },
  injectKey: {},
}

export type NpFormItemProps = ExtractPropTypes<typeof npFormItemProps>
