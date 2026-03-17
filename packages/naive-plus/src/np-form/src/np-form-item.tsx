import {
  computed,
  defineComponent,
  inject,
  onUnmounted,
  provide,
  ref,
} from 'vue'
import { useCreate } from '../../_hooks/create'
import { npFormItemProps } from './props'
import {
  NAutoComplete,
  NCascader,
  NDatePicker,
  NFormItem,
  NInput,
  NInputNumber,
  NRate,
  NSelect,
  NSlider,
  NSwitch,
  NTimePicker,
  NTransfer,
  NTreeSelect,
  type FormItemRule,
} from 'naive-ui'
import type {
  FormColumnComponent,
  FormInjection,
  FormItemToolInjection,
} from './interface'
import NpCheckbox from '../../np-checkbox'
import NpRadio from '../../np-radio'
import NpUpload from '../../np-upload'
import {
  arrayTransferByKeys,
  computedAsync,
  isArray,
  isFunction,
  isString,
  runAsync,
} from '../../utils'
import type { AnyObject } from '../../types'
import EventBus from '../../utils/event-bus'

const { name, bemClass } = useCreate('np-form-item')

export default defineComponent({
  name,
  props: npFormItemProps,
  setup(props) {
    const formInj = inject<FormInjection>(props.injectKey as any, {
      props: { option: { columns: [] } },
      data: ref({}),
      injectKey: Symbol('default-form-item-key'),
      event: new EventBus<{
        'data-change': AnyObject
      }>(),
    })

    const { type } = props.column || {}
    const columnKey = props.column.key || '_unknown'

    const value = computed({
      get: () => formInj.data.value[columnKey],
      set: val => (formInj.data.value[columnKey] = val),
    })

    const label = ref('')
    const display = ref(true)
    const rule = ref<FormItemRule[]>()

    const uploadBlobRule: FormItemRule = {
      validator: (_rule: FormItemRule, value: any) => {
        if (!isArray(value)) return true
        const hasBlobUrl = value.some((item: string) => {
          try {
            const parsed = JSON.parse(item)
            return parsed.url && String(parsed.url).startsWith('blob:')
          } catch {
            return String(item).startsWith('blob:')
          }
        })
        if (hasBlobUrl) {
          return new Error('文件上传未完成')
        }
        return true
      },
    }

    const init = async (newData: AnyObject) => {
      runAsync(props.column?.label, newData).then(res => {
        label.value = res
      })
      if (props.column?.display !== undefined) {
        runAsync(props.column?.display, newData).then(res => {
          display.value = res !== false
        })
      }
      if (props.column?.rule !== undefined) {
        runAsync<FormItemRule[] | FormItemRule>(
          props.column?.rule,
          newData
        ).then(res => {
          const newRule = isArray(res) ? res : [res]
          // 数字类型默认加上 type: 'number' 的校验
          if (type === 'number' || type === 'rate' || type === 'slider') {
            rule.value = newRule.map(item => {
              if (item.type === undefined) {
                return { ...item, type: 'number' }
              }
              return item
            })
            return
          }
          // upload 类型默认加上 blob URL 校验
          if (type === 'upload') {
            rule.value = [...newRule, uploadBlobRule]
            return
          }
          rule.value = newRule
        })
      } else if (type === 'upload') {
        rule.value = [uploadBlobRule]
      }
    }
    init(formInj.data.value)
    const dataChange = (newData: AnyObject) => {
      init(newData)
    }
    formInj.event.on('data-change', dataChange)
    onUnmounted(() => {
      formInj.event.off('data-change', dataChange)
    })

    const options = computedAsync<any[]>(
      async () => {
        const { options, labelField, valueField, keyField } = (props.column ||
          {}) as any
        const res = await runAsync(options, formInj.data.value)
        return arrayTransferByKeys(res || [], {
          label: labelField,
          value: type === 'tree' ? keyField : valueField,
        })
      },
      [],
      {
        resetInitialStateEffect: type !== 'autoComplete',
      }
    )

    const onChange = (val: any, ...args: any[]) => {
      value.value = val
      // @ts-ignore
      props.column.onChange?.(val, {
        ...args,
        data: formInj.data.value,
        setData: (newData: AnyObject) => {
          formInj.data.value = { ...formInj.data.value, ...newData }
        },
      } as any)
    }

    const onBlur = (
      val: any,
      trim: 'trim' | 'trimStart' | 'trimEnd' = 'trim'
    ) => {
      value.value = isString(val) ? val[trim]() : val
    }

    const isFormColumnComponent = (obj: any): obj is FormColumnComponent => {
      return !isFunction(obj.render)
    }

    const comp = () => {
      const column = props.column || {}
      if (!isFormColumnComponent(column)) {
        return <span>RenderFunctionFirst</span>
      }
      const { type } = column
      if (type === 'input') {
        return (
          <NInput
            clearable
            {...props.column.props}
            value={value.value}
            onUpdateValue={onChange}
            onBlur={() => onBlur(value.value)}
          >
            {{ ...column.slots }}
          </NInput>
        )
      }
      if (type === 'textarea') {
        return (
          <NInput
            type="textarea"
            {...props.column.props}
            value={value.value}
            onUpdateValue={onChange}
            onBlur={() => onBlur(value.value, 'trimEnd')}
          >
            {{ ...column.slots }}
          </NInput>
        )
      }
      if (type === 'password') {
        return (
          <NInput
            type="password"
            {...props.column.props}
            value={value.value}
            onUpdateValue={onChange}
            onBlur={() => onBlur(value.value)}
          >
            {{ ...column.slots }}
          </NInput>
        )
      }

      if (type === 'number') {
        return (
          <NInputNumber
            style="width:100%"
            showButton={false}
            {...props.column.props}
            value={value.value}
            onUpdateValue={onChange}
          >
            {{ ...column.slots }}
          </NInputNumber>
        )
      }

      if (type === 'autoComplete') {
        return (
          <NAutoComplete
            clearable
            {...props.column.props}
            options={options.value}
            value={value.value}
            onBlur={() => onBlur(value.value)}
            onUpdateValue={onChange}
          >
            {{ ...column.slots }}
          </NAutoComplete>
        )
      }

      if (type === 'cascader') {
        return (
          <NCascader
            clearable
            {...props.column.props}
            value={value.value}
            onUpdateValue={onChange}
            options={options.value}
          >
            {{ ...column.slots }}
          </NCascader>
        )
      }

      if (type === 'checkbox') {
        return (
          <NpCheckbox
            props={props.column.props}
            loadingDelay={props.column.props?.loadingDelay}
            options={options.value}
            modelValue={value.value}
            onChange={onChange}
          ></NpCheckbox>
        )
      }

      if (type === 'date') {
        return (
          <NDatePicker
            clearable
            style="width:100%"
            {...props.column.props}
            formattedValue={value.value}
            onUpdateFormattedValue={onChange}
          >
            {{ ...column.slots }}
          </NDatePicker>
        )
      }

      if (type === 'time') {
        return (
          <NTimePicker
            clearable
            style="width:100%"
            {...props.column.props}
            formattedValue={value.value}
            onUpdateFormattedValue={onChange}
          >
            {{ ...column.slots }}
          </NTimePicker>
        )
      }

      if (type === 'radio') {
        return (
          <NpRadio
            props={props.column.props}
            loadingDelay={props.column.props?.loadingDelay}
            options={options.value}
            modelValue={value.value}
            onChange={onChange}
          ></NpRadio>
        )
      }
      if (type === 'rate') {
        return (
          <NRate
            {...props.column.props}
            value={value.value}
            onUpdateValue={onChange}
          ></NRate>
        )
      }

      if (type === 'select') {
        return (
          <NSelect
            clearable
            {...props.column.props}
            options={options.value}
            value={value.value}
            onUpdateValue={onChange}
          >
            {{ ...column.slots }}
          </NSelect>
        )
      }

      if (type === 'slider') {
        return (
          <NSlider
            {...props.column.props}
            value={value.value}
            onUpdateValue={onChange}
          >
            {{ ...column.slots }}
          </NSlider>
        )
      }

      if (type === 'switch') {
        return (
          <NSwitch
            {...props.column.props}
            value={value.value}
            onUpdateValue={onChange}
          >
            {{ ...column.slots }}
          </NSwitch>
        )
      }

      if (type === 'transfer') {
        return (
          <NTransfer
            {...props.column.props}
            value={value.value || []}
            onUpdateValue={onChange}
            options={options.value}
          ></NTransfer>
        )
      }

      if (type === 'tree') {
        return (
          <NTreeSelect
            clearable
            keyField="value"
            {...props.column.props}
            value={value.value}
            onUpdateValue={onChange}
            options={options.value}
          >
            {{ ...column.slots }}
          </NTreeSelect>
        )
      }

      if (type === 'upload') {
        return (
          <NpUpload
            props={props.column.props}
            urlOnly={(props.column as any).urlOnly}
            modelValue={value.value || []}
            onChange={onChange}
          >
            {{ ...column.slots }}
          </NpUpload>
        )
      }

      if (isFunction(type)) {
        return type(formInj.data.value)
      }

      return <span>NotSupportType</span>
    }

    const feedbackMsg = ref()
    const validationStatus = ref<'error' | 'success' | 'warning'>()
    provide<FormItemToolInjection>('np-form-item-tool', {
      setFeedback: (
        feedback?: string,
        status: 'error' | 'success' | 'warning' = 'error'
      ) => {
        feedbackMsg.value = feedback
        validationStatus.value = status || (feedback ? 'error' : undefined)
      },
    })

    return () =>
      display.value ? (
        <NFormItem
          class={bemClass.value}
          {...props.column.formItemProps}
          path={props.column.key}
          label={label.value}
          rule={rule.value}
          first={props.column.formItemProps?.first ?? true}
          feedback={feedbackMsg.value}
          validationStatus={validationStatus.value}
        >
          {comp()}
        </NFormItem>
      ) : undefined
  },
})
