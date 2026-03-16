import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { NpCheckbox } from '../index'

describe('NpCheckbox', () => {
  test('render', async () => {
    const wrapper = mount(NpCheckbox)
    await nextTick()
    expect(wrapper.html()).include('np-checkbox')
  })
})
