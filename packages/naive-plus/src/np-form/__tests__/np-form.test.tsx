import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { NpForm } from '../index'
import type { FormOption } from '../src/interface'

describe('NpForm', () => {
  test('render', async () => {
    const wrapper = mount(NpForm, {
      props: {
        option: {
          columns: [],
        },
      },
    })
    await nextTick()
    expect(wrapper.html()).include('np-form')
  })

  test('reset clears input display after model data resets', async () => {
    const option: FormOption<Record<string, any>> = {
      columns: [
        {
          label: '姓名',
          key: 'fullName',
        },
        {
          label: '电话',
          key: 'tel',
          type: 'number',
        },
        {
          label: '年龄最大值',
          key: 'ageMax',
          type: 'number',
          defaultValue: 50,
        },
      ],
    }

    const wrapper = mount(
      defineComponent({
        setup() {
          const data = ref<Record<string, any>>()
          return () =>
            h(NpForm, {
              modelValue: data.value,
              'onUpdate:modelValue': value => {
                data.value = value
              },
              option,
            })
        },
      })
    )

    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('张三')
    await inputs[1].setValue('13800138000')

    expect((inputs[0].element as HTMLInputElement).value).toBe('张三')
    expect((inputs[1].element as HTMLInputElement).value).toBe('13800138000')

    const resetButton = wrapper
      .findAll('button')
      .find(button => button.text() === '重置')
    await resetButton?.trigger('click')
    await nextTick()

    expect((inputs[0].element as HTMLInputElement).value).toBe('')
    expect((inputs[1].element as HTMLInputElement).value).toBe('')
    expect((inputs[2].element as HTMLInputElement).value).toBe('50')
  })
})
