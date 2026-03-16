import type { ExtractPropTypes, PropType } from 'vue'
import { makeStringProp } from '../../utils'
import type { AsyncValue } from '../../types'
import type { RadioGroupProps } from 'naive-ui'

export type RadioValue = string | number | boolean
export type RadioGroupValue = RadioValue | null
export interface RadioOption {
  label: string
  value: RadioValue
}

export const npRadioProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<RadioGroupValue>,
    required: false,
    default: null,
  },
  options: {
    type: [Object, Function] as PropType<AsyncValue<Array<RadioOption | any>>>,
  },
  labelField: makeStringProp('label'),
  valueField: makeStringProp('value'),
  type: {
    type: String as PropType<'default' | 'button'>,
    default: 'default',
  },
  /**
   * 点击加载延迟 ms
   * @defaultValue 250
   */
  loadingDelay: {
    type: Number,
    default: 250,
  },
  /**
   * 原 n-radio-group 属性
   */
  props: {
    type: Object as PropType<
      Omit<
        RadioGroupProps,
        'value' | 'onUpdate:value' | 'onUpdateValue' | 'onChange'
      >
    >,
  },
  /**
   * 改变事件
   */
  onChange: {
    type: Function as PropType<(value: RadioGroupValue) => void>,
  },
}

export type NpRadioProps = ExtractPropTypes<typeof npRadioProps>
