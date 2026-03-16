import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { NpForm } from '../index'

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
})
