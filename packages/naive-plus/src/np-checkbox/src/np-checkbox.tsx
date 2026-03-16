import { defineComponent, ref, watch } from 'vue'
import { useCreate } from '../../_hooks/create'
import {
  npCheckboxProps,
  type CheckboxGroupValue,
  type CheckboxOption,
} from './props'
import { arrayTransferByKeys, computedAsync, runAsync } from '../../utils'
import { NCheckbox, NCheckboxGroup, NSpin } from 'naive-ui'

const { name, bemClass } = useCreate('np-checkbox')

export default defineComponent({
  name,
  props: npCheckboxProps,
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const data = ref<CheckboxGroupValue>(props.modelValue || [])
    watch(
      () => props.modelValue,
      val => {
        data.value = val ?? []
      },
      {
        deep: true,
      }
    )

    const handleChange = (value: CheckboxGroupValue) => {
      data.value = value
      emit('update:modelValue', value)
      props.onChange?.(value)
    }

    const loading = ref(false)
    const options = computedAsync<CheckboxOption[]>(
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

    return () => (
      <div class={bemClass.value} style={{ minHeight: '25.6px' }}>
        <NCheckboxGroup
          {...props.props}
          value={data.value}
          onUpdateValue={handleChange}
        >
          {loading.value && options.value.length === 0 ? (
            <NSpin size={16} style={{ marginTop: '2px' }}>
              <NCheckbox></NCheckbox>
            </NSpin>
          ) : (
            options.value.map(item => (
              <NCheckbox value={item.value} label={item.label}></NCheckbox>
            ))
          )}
        </NCheckboxGroup>
      </div>
    )
  },
})
