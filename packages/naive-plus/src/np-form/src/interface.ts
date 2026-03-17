import type { AnyObject, Run } from '../../types'
import type { ComputedRef, CSSProperties, Ref, VNode } from 'vue'
import type {
  AutoCompleteGroupOption,
  AutoCompleteOption,
  AutoCompleteProps,
  AutoCompleteSlots,
  ButtonProps,
  CascaderOption,
  CascaderProps,
  CascaderSlots,
  DatePickerProps,
  DatePickerSlots,
  DynamicTagsProps,
  DynamicTagsSlots,
  FormItemProps,
  FormItemRule,
  FormProps,
  InputNumberProps,
  InputNumberSlots,
  InputProps,
  InputSlots,
  RateProps,
  SelectOption,
  SelectProps,
  SelectSlots,
  SliderProps,
  SliderSlots,
  SwitchProps,
  SwitchSlots,
  TimePickerProps,
  TimePickerSlots,
  TransferOption,
  TransferProps,
  TreeSelectOption,
  TreeSelectProps,
  TreeSelectSlots,
  UploadProps,
} from 'naive-ui'
import type { NpRadioProps, RadioOption, RadioValue } from '../../np-radio'
import type {
  CheckboxOption,
  CheckboxValue,
  NpCheckboxProps,
} from '../../np-checkbox'
import type EventBus from '../../utils/event-bus'

export interface FormColumnBase<FormData extends AnyObject = AnyObject> {
  /**
   * 标签值
   */
  label?:
    | Run<FormData, string | ComputedRef<string>>
    | ((data: FormData) => VNode)
  /**
   * 属性值
   */
  key?: string
  /**
   * 完全自定义渲染
   * @param data 当前表单数据
   * @returns 视图
   */
  render?: (data: FormData) => VNode
  /**
   * 表单字段校验规则。TS 类型：Array<FormItemRule>
   */
  rule?:
    | Run<FormData, FormItemRule | Array<FormItemRule>>
    | FormItemRule
    | Array<FormItemRule>
  /**
   * 表单项属性
   */
  formItemProps?: Omit<FormItemProps, 'label' | 'rule' | 'path' | 'rulePath'>
  /**
   * 是否显示
   * @defaultValue true
   */
  display?: Run<FormData, boolean>
}

type OmitValue =
  | 'defaultValue'
  | 'modelValue'
  | 'value'
  | 'onUpdate:value'
  | 'onUpdateValue'
type OnChangeCtx<FormData extends AnyObject> = {
  data: FormData
  setData: (newData: FormData) => void
}
export type FormColumnComponent<FormData extends AnyObject = AnyObject> =
  | {
      type?: 'input' | 'text'
      props?: Omit<InputProps, OmitValue | 'type'>
      slots?: InputSlots
      defaultValue?: string
      onChange?: (value: string, ctx: OnChangeCtx<FormData>) => void
    }
  | {
      type: 'textarea'
      props?: Omit<InputProps, OmitValue | 'type'>
      slots?: InputSlots
      defaultValue?: string
      onChange?: (value: string, ctx: OnChangeCtx<FormData>) => void
    }
  | {
      type: 'password'
      props?: Omit<InputProps, OmitValue | 'type'>
      slots?: InputSlots
      defaultValue?: string
      onChange?: (value: string, ctx: OnChangeCtx<FormData>) => void
    }
  | {
      type: 'number'
      props?: Omit<InputNumberProps, OmitValue>
      slots?: InputNumberSlots
      defaultValue?: number
      onChange?: (value: number, ctx: OnChangeCtx<FormData>) => void
    }
  | {
      type: 'radio'
      props?: Omit<NpRadioProps, OmitValue>
      defaultValue?: RadioValue
      options: Run<FormData, Array<RadioOption | any>>
      onChange?: (value: RadioValue, ctx: OnChangeCtx<FormData>) => void
    }
  | {
      type: 'checkbox'
      props?: Omit<NpCheckboxProps, OmitValue>
      defaultValue?: CheckboxValue
      options: Run<FormData, Array<CheckboxOption | any>>
      onChange?: (value: CheckboxValue, ctx: OnChangeCtx<FormData>) => void
    }
  | {
      type: 'autoComplete'
      props?: Omit<AutoCompleteProps, OmitValue>
      slots?: AutoCompleteSlots
      defaultValue?: string
      options: Run<
        FormData,
        Array<AutoCompleteOption | AutoCompleteGroupOption | string>
      >
      onChange?: (value: string, ctx: OnChangeCtx<FormData>) => void
    }
  | {
      type: 'cascader'
      props?: Omit<CascaderProps, OmitValue>
      slots?: CascaderSlots
      defaultValue?: string | number | Array<string> | Array<number>
      options: Run<FormData, Array<CascaderOption>>
      onChange?: (
        value: string | number | Array<string> | Array<number>,
        ctx: OnChangeCtx<FormData>
      ) => void
    }
  | {
      type: 'tag'
      props?: Omit<DynamicTagsProps, OmitValue>
      slots?: DynamicTagsSlots
      defaultValue?: string[]
      onChange?: (value: string[], ctx: OnChangeCtx<FormData>) => void
    }
  | {
      type: 'date'
      props?: Omit<DatePickerProps, OmitValue>
      slots?: DatePickerSlots
      defaultValue?: string | [string, string]
      onChange?: (
        value: string | [string, string],
        ctx: OnChangeCtx<FormData>
      ) => void
    }
  | {
      type: 'rate'
      props?: Omit<RateProps, OmitValue>
      defaultValue?: number
      onChange?: (value: number, ctx: OnChangeCtx<FormData>) => void
    }
  | {
      type: 'select'
      props?: Omit<SelectProps, OmitValue>
      slots?: SelectSlots
      defaultValue?: Array<string | number> | string | number
      options: Run<FormData, Array<SelectOption | any>>
      onChange?: (
        value: Array<string | number> | string | number,
        ctx: {
          data: FormData
          ctx: OnChangeCtx<FormData> & {
            option: SelectOption | SelectOption[]
          }
        }
      ) => void
    }
  | {
      type: 'slider'
      props?: Omit<SliderProps, OmitValue>
      slots?: SliderSlots
      defaultValue?: number | number[]
      onChange?: (value: number | number[], ctx: OnChangeCtx<FormData>) => void
    }
  | {
      type: 'switch'
      props?: Omit<SwitchProps, OmitValue>
      slots?: SwitchSlots
      defaultValue?: string | number | boolean
      onChange?: (
        value: string | number | boolean,
        ctx: OnChangeCtx<FormData>
      ) => void
    }
  | {
      type: 'time'
      props?: Omit<TimePickerProps, OmitValue>
      slots?: TimePickerSlots
      defaultValue?: string
      onChange?: (value: string, ctx: OnChangeCtx<FormData>) => void
    }
  // | {
  //     type: 'selectInput'
  //     props?: Omit<TdSelectInputProps, OmitValue>
  //     /**
  //      * 默认值
  //      */
  //     defaultValue?: SelectInputValue
  //   }
  | {
      type: 'transfer'
      props?: Omit<TransferProps, OmitValue>
      defaultValue?: Array<string | number>
      options: Run<FormData, Array<TransferOption | string | number>>
      onChange?: (
        value: Array<string | number>,
        ctx: OnChangeCtx<FormData>
      ) => void
    }
  | {
      type: 'tree'
      props?: Omit<TreeSelectProps, OmitValue>
      slots?: TreeSelectSlots
      defaultValue?: string | number | Array<string | number>
      options: Run<FormData, Array<TreeSelectOption>>
      onChange?: (
        value: string | number | Array<string | number>,
        ctx: OnChangeCtx<FormData> & {
          option: TreeSelectOption &
            null &
            TreeSelectOption[] &
            Array<TreeSelectOption | null>
          meta:
            | {
                node: TreeSelectOption
                action: 'select' | 'unselect'
              }
            | {
                node: TreeSelectOption | null
                action: 'delete'
              }
            | {
                node: null
                action: 'clear'
              }
        }
      ) => void
    }
  | {
      type: 'upload'
      props?: Omit<
        UploadProps,
        | 'fileList'
        | 'defaultFileList'
        | 'onUpdate:fileList'
        | 'onUpdateFileList'
      >
      slots?: {
        default?: () => VNode
      }
      urlOnly?: boolean
      defaultValue?: string[]
      onChange?: (value: string[], ctx: OnChangeCtx<FormData>) => void
    }
  | {
      type: (form: FormData) => VNode
      props?: any
      defaultValue?: any
      onChange?: (value: any, ctx: OnChangeCtx<FormData>) => void
    }

export type FormColumn<FormData extends AnyObject = AnyObject> =
  FormColumnBase<FormData> & FormColumnComponent<FormData>

export interface FormOption<FormData extends AnyObject = AnyObject> {
  onSubmit?: Run<FormData, void>
  onReset?: Run<FormData, void>
  columns: FormColumn<FormData>[]
  props?: Omit<FormProps, 'model' | 'rules' | 'onSubmit'>
  footer?:
    | false
    | {
        formItemProps?: Omit<
          FormItemProps,
          'label' | 'rule' | 'path' | 'rulePath'
        >
        style?: CSSProperties
        prefixRender?: (data: FormData) => VNode
        suffixRender?: (data: FormData) => VNode
        submitBtn?:
          | false
          | {
              text?: string
              props?: Omit<ButtonProps, 'type' | 'onClick'>
            }
        resetBtn?:
          | false
          | {
              text?: string
              props?: Omit<ButtonProps, 'onClick'>
            }
      }
}

export interface FormInjection<FormData extends AnyObject = AnyObject> {
  props: {
    option: FormOption<FormData>
  }
  data: Ref<FormData>
  readonly event: EventBus<{
    'data-change': AnyObject
  }>
  readonly injectKey: symbol
}

/**
 * 表单项工具注入接口
 * @example
 * ```ts
 * const formItemTool = inject<FormItemToolInjection>('np-form-item-tool', {
 *   setFeedback: () => {},
 * })
 * formItemTool.setFeedback('错误信息', 'error')
 *
 * formItemTool.setFeedback() // 清除反馈信息
 * ```
 */
export interface FormItemToolInjection {
  /**
   * 更新反馈信息
   * @param feedback 反馈信息，当 undefined 时表示不显示反馈信息
   * @param status 反馈状态，默认值为 'error'
   * @returns void
   */
  setFeedback: (
    feedback?: string,
    status?: 'error' | 'success' | 'warning'
  ) => void
}
