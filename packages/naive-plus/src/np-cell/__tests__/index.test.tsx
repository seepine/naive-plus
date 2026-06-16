import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import NpCell from '../src/np-cell.vue'

const stubs = {
  'n-checkbox': true,
  'n-radio': true,
  'n-switch': true,
  'n-icon': true,
  'arrow-right-icon': true,
}

describe('NpCell', () => {
  test('renders label correctly', () => {
    const wrapper = mount(NpCell, {
      props: { label: '测试标签' },
      global: { stubs },
    })
    expect(wrapper.text()).toContain('测试标签')
  })

  test('renders content render functions', () => {
    const wrapper = mount(NpCell, {
      props: {
        label: () => <span>标签</span>,
        value: () => <span>值</span>,
        size: 'large',
      },
      global: { stubs },
    })

    expect(wrapper.text()).toContain('标签')
    expect(wrapper.text()).toContain('值')
  })

  test('renders control when type is set', () => {
    const wrapper = mount(NpCell, {
      props: { label: '选项', type: 'checkbox', checked: false },
      global: { stubs },
    })
    expect(wrapper.find('.np-cell__control').exists()).toBe(true)
  })

  test('renders footer below content', () => {
    const wrapper = mount(NpCell, {
      props: { label: '选项' },
      slots: { footer: '底部内容' },
      global: { stubs },
    })
    const cell = wrapper.find('.np-cell')
    const content = wrapper.find('.np-cell__content')
    const footer = wrapper.find('.np-cell__footer')

    expect(footer.exists()).toBe(true)
    expect(footer.text()).toBe('底部内容')
    expect(cell.element.children[0]).toBe(content.element)
    expect(cell.element.children[1]).toBe(footer.element)
  })

  test('enables hover by default when type is set', () => {
    const wrapper = mount(NpCell, {
      props: { label: '选项', type: 'checkbox' },
      global: { stubs },
    })
    expect(wrapper.classes()).toContain('np-cell__hover')
  })

  test('disables hover by default when type is not set', () => {
    const wrapper = mount(NpCell, {
      props: { label: '选项' },
      global: { stubs },
    })
    expect(wrapper.classes()).not.toContain('np-cell__hover')
  })

  test('prefers explicit hover prop over type-derived hover', () => {
    const disabledWrapper = mount(NpCell, {
      props: { label: '选项', type: 'checkbox', hover: false },
      global: { stubs },
    })
    const enabledWrapper = mount(NpCell, {
      props: { label: '选项', hover: true },
      global: { stubs },
    })

    expect(disabledWrapper.classes()).not.toContain('np-cell__hover')
    expect(enabledWrapper.classes()).toContain('np-cell__hover')
  })

  test('falls back to type-derived hover when hover is undefined', () => {
    const wrapper = mount(NpCell, {
      props: { label: '选项', type: 'checkbox', hover: undefined },
      global: { stubs },
    })

    expect(wrapper.classes()).toContain('np-cell__hover')
  })

  test('emits update:checked on click when type is set', async () => {
    const wrapper = mount(NpCell, {
      props: { label: '选项', type: 'checkbox', checked: false },
      global: { stubs },
    })
    await wrapper.find('.np-cell').trigger('click')
    expect(wrapper.emitted('update:checked')?.[0]).toEqual([true])
  })

  test('does not emit update:checked when no type', async () => {
    const wrapper = mount(NpCell, {
      props: { label: '选项' },
      global: { stubs },
    })
    await wrapper.find('.np-cell').trigger('click')
    expect(wrapper.emitted('update:checked')).toBeUndefined()
  })

  test('shows arrow when arrow prop is true', () => {
    const wrapper = mount(NpCell, {
      props: { label: '选项', arrow: true },
      global: { stubs },
    })
    expect(wrapper.find('.np-cell__arrow').exists()).toBe(true)
  })

  test('hides arrow by default', () => {
    const wrapper = mount(NpCell, {
      props: { label: '选项' },
      global: { stubs },
    })
    expect(wrapper.find('.np-cell__arrow').exists()).toBe(false)
  })
})
