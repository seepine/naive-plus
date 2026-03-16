import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { NpButton } from '../index'

describe('NpButton', () => {
  test('render', async () => {
    const wrapper = mount(NpButton)
    await nextTick()
    expect(wrapper.html()).include('np-button')
  })
})
