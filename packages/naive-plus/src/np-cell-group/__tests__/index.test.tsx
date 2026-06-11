import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import NpCellGroup from '../src/np-cell-group.vue'

const stubs = {
  'n-checkbox': true,
  'n-radio': true,
  'n-switch': true,
  'n-icon': true,
  'arrow-right-icon': true,
}

describe('NpCellGroup', () => {
  test('renders title', () => {
    const wrapper = mount(NpCellGroup, {
      props: { title: '分组标题', options: [] },
      global: { stubs },
    })
    expect(wrapper.text()).toContain('分组标题')
  })

  test('renders options as NpCell', () => {
    const wrapper = mount(NpCellGroup, {
      props: { options: [{ label: '选项一' }, { label: '选项二' }] },
      global: { stubs },
    })
    expect(wrapper.findAll('.np-cell').length).toBe(2)
  })

  test('emits click and calls item onClick', async () => {
    const onClick = vi.fn()
    const options = ref([{ label: '选项', onClick }])
    const wrapper = mount(NpCellGroup, {
      props: { options: options.value },
      global: { stubs },
    })
    await wrapper.find('.np-cell').trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  test('passes option hover to child cell', () => {
    const options = ref([{ label: '选项', hover: true }])
    const wrapper = mount(NpCellGroup, {
      props: { options: options.value },
      global: { stubs },
    })
    expect(wrapper.find('.np-cell').classes()).toContain('np-cell__hover')
  })
})
