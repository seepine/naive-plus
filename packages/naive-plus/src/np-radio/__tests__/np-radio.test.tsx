import { nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import { NRadioGroup } from 'naive-ui'
import { NpRadio } from '../index'

describe('NpRadio', () => {
  test('render', async () => {
    const wrapper = mount(NpRadio)
    await nextTick()
    expect(wrapper.html()).include('np-radio')
  })

  test('change', async () => {
    const onChange = vi.fn()
    const wrapper = mount(NpRadio, {
      props: {
        options: ['北京', '上海'],
        onChange,
      },
    })

    await flushPromises()
    await nextTick()
    const group = wrapper.findComponent(NRadioGroup)
    expect(group.exists()).toBe(true)
    const onUpdateValue = group.props('onUpdateValue') as
      | ((value: string) => void)
      | undefined
    expect(typeof onUpdateValue).toBe('function')
    onUpdateValue?.('北京')
    await nextTick()

    expect(onChange).toHaveBeenCalledWith('北京')
  })
})
