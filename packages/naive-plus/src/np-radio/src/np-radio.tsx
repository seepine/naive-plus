import { defineComponent, ref, watch } from 'vue'
import { useCreate } from '../../_hooks/create'
import { npRadioProps, type RadioGroupValue, type RadioOption } from './props'
import { arrayTransferByKeys, computedAsync, runAsync } from '../../utils'
import { NRadio, NRadioButton, NRadioGroup, NSpin } from 'naive-ui'

const { name, bemClass } = useCreate('np-radio')

export default defineComponent({
  name,
  props: npRadioProps,
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const data = ref<RadioGroupValue>(props.modelValue)
    watch(
      () => props.modelValue,
      val => {
        data.value = val
      }
    )

    const handleChange = (value: RadioGroupValue) => {
      data.value = value
      emit('update:modelValue', value)
      props.onChange?.(value)
    }

    const loading = ref(false)
    const options = computedAsync<RadioOption[]>(
      async () => {
        const timer = setTimeout(() => {
          loading.value = true
        }, props.loadingDelay)
        try {
          const res = await runAsync(props.options)
          return arrayTransferByKeys(res, {
            label: props.labelField,
            value: props.valueField,
          })
        } catch {
          return []
        } finally {
          clearTimeout(timer)
          loading.value = false
        }
      },
      [],
      { resetInitialStateEffect: true }
    )
    const RadioItem = props.type === 'button' ? NRadioButton : NRadio

    return () => (
      <div class={bemClass.value} style={{ minHeight: '25.6px' }}>
        <NRadioGroup
          {...props.props}
          value={data.value}
          onUpdateValue={handleChange}
        >
          {loading.value && options.value.length === 0 ? (
            <NSpin size={16}>
              <RadioItem></RadioItem>
            </NSpin>
          ) : (
            options.value.map(item => (
              <RadioItem
                value={item.value}
                disabled={(item as any).disabled === true}
              >
                {item.label}
              </RadioItem>
            ))
          )}
        </NRadioGroup>
      </div>
    )
  },
})
