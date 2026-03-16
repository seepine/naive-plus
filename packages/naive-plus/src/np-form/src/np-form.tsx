import { defineComponent, provide, ref, watch, type StyleValue } from 'vue'
import { useCreate } from '../../_hooks/create'
import { npFormProps } from './props'
import { NForm, NFormItem, NSpin, type FormInst } from 'naive-ui'
import NpFormItem from './np-form-item'
import type { FormInjection } from './interface'
import { cloneDeep, isEqual, throttle } from 'lodash-es'
import NpButton from '../../np-button'
import type { AnyObject } from '../../types'
import { isFunction, runAsync } from '../../utils'
import EventBus from '../../utils/event-bus'

const { name, bemClass } = useCreate('np-form')

export default defineComponent({
  name,
  props: npFormProps,
  emits: ['update:modelValue'],
  setup(props, { emit, expose }) {
    const injectKey = Symbol('np-form-inject-key')
    const formRef = ref<FormInst>()
    const data = ref<AnyObject>({})
    const backData = ref<AnyObject>({})
    const event = new EventBus<{
      'data-change': AnyObject
    }>()

    const loading = ref(false)

    watch(
      data,
      throttle(() => {
        emit('update:modelValue', data.value)
        event.emit('data-change', data.value)
      }, 100),
      { deep: true }
    )

    const initDefaultValue = (val: AnyObject = {}) => {
      backData.value = cloneDeep(val)
      props.option.columns?.forEach(column => {
        const key = column.key || '_unknown'
        if (
          column.defaultValue !== undefined &&
          backData.value[key] === undefined
        ) {
          backData.value[key] = column.defaultValue
        } else if (
          column.props?.defaultValue !== undefined &&
          backData.value[key] === undefined
        ) {
          backData.value[key] = column.props.defaultValue
        }
      })
      data.value = cloneDeep(backData.value)
    }

    initDefaultValue(props.modelValue)

    watch(
      () => props.modelValue,
      throttle(val => {
        if (!isEqual(data.value, val)) {
          initDefaultValue(val)
        }
      }, 100),
      { deep: true, immediate: false }
    )

    provide<FormInjection>(injectKey, {
      data,
      props,
      injectKey,
      event,
    })

    const submit = async () => {
      if (loading.value) {
        return
      }
      try {
        await formRef.value?.validate()
      } catch {
        return
      }
      loading.value = true
      try {
        await runAsync(props.option.onSubmit, data.value)
      } catch {
      } finally {
        loading.value = false
      }
    }

    const reset = async () => {
      formRef.value?.restoreValidation()
      data.value = cloneDeep(backData.value)
      await runAsync(props.option.onReset, data.value)
    }

    expose(
      new Proxy(
        {},
        {
          get(_, p) {
            return ((formRef.value || {}) as any)[p]
          },
          has(_, p) {
            return p in (formRef.value || {})
          },
        }
      )
    )

    const footer = () => {
      if (props.option.footer === false) {
        return undefined
      }

      const {
        prefixRender,
        suffixRender,
        submitBtn = {},
        resetBtn = {},
        style = {},
      } = props.option.footer || {}

      const defaultStyle: StyleValue = {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '16px',
        ...style,
      }

      return (
        <NFormItem
          label=" "
          show-label={props.option.props?.labelPlacement === 'left'}
          {...props.option.footer?.formItemProps}
        >
          <div style={defaultStyle}>
            {isFunction(prefixRender) ? prefixRender(data.value) : undefined}
            {submitBtn ? (
              <NpButton
                type="primary"
                click={submit}
                loadingDelay={250}
                props={submitBtn.props}
              >
                {submitBtn.text || '提交'}
              </NpButton>
            ) : undefined}
            {resetBtn ? (
              <NpButton props={resetBtn.props} click={reset}>
                {resetBtn.text || '重置'}
              </NpButton>
            ) : undefined}
            {isFunction(suffixRender) ? suffixRender(data.value) : undefined}
          </div>
        </NFormItem>
      )
    }

    return () => (
      <NSpin
        class="np-form__loading"
        show={loading.value}
        delay={250}
        stroke-width={0}
      >
        <NForm
          ref={formRef}
          model={data.value}
          class={bemClass.value}
          {...props.option.props}
          onSubmit={(e: Event) => {
            e?.preventDefault()
            submit()
          }}
        >
          {(props.option.columns || []).map(column => {
            if (typeof column.render === 'function') {
              return column.render(data.value)
            }
            return (
              <NpFormItem column={column} injectKey={injectKey}></NpFormItem>
            )
          })}
          {footer()}
        </NForm>
      </NSpin>
    )
  },
})
