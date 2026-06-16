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
  'np-cell': true,
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
    expect(wrapper.findAllComponents({ name: 'NpCell' }).length).toBe(2)
  })

  test('emits click and calls item onClick', async () => {
    const onClick = vi.fn()
    const options = ref([{ label: '选项', onClick }])
    const wrapper = mount(NpCellGroup, {
      props: { options: options.value },
      global: { stubs },
    })
    // 直接触发 cell-group 内部 cell 渲染的 click 事件
    const cells = wrapper.findAllComponents({ name: 'NpCell' })
    await cells[0].vm.$emit('click', { label: '选项' })
    expect(onClick).toHaveBeenCalled()
  })

  test('passes option hover to child cell', () => {
    const options = ref([{ label: '选项', hover: true }])
    const wrapper = mount(NpCellGroup, {
      props: { options: options.value },
      global: { stubs },
    })
    const cells = wrapper.findAllComponents({ name: 'NpCell' })
    expect(cells[0].props('hover')).toBe(true)
  })

  test('renders content render functions', () => {
    const wrapper = mount(NpCellGroup, {
      props: {
        options: [
          {
            key: 'notice',
            label: () => <span>标签</span>,
            value: () => <span>值</span>,
            footer: () => <span>底部</span>,
          },
        ],
      },
      global: {
        stubs: {
          'n-checkbox': true,
          'n-radio': true,
          'n-switch': true,
          'n-icon': true,
          'arrow-right-icon': true,
        },
      },
    })

    expect(wrapper.text()).toContain('标签')
    expect(wrapper.text()).toContain('值')
    expect(wrapper.text()).toContain('底部')
  })

  test('radio: emits update:keys with single key and clears on re-click', async () => {
    const wrapper = mount(NpCellGroup, {
      props: { type: 'radio', options: [{ label: 'A' }, { label: 'B' }] },
      global: { stubs },
    })
    const cells = wrapper.findAllComponents({ name: 'NpCell' })
    await cells[1].vm.$emit('click', { label: 'B' })
    expect(wrapper.emitted('update:keys')?.[0]).toEqual([[1]])
    expect(wrapper.emitted('change')?.[0]?.[0]).toEqual([1])
    await cells[1].vm.$emit('click', { label: 'B' })
    expect(wrapper.emitted('update:keys')?.at(-1)).toEqual([[]])
  })

  test('checkbox: emits update:keys with toggled keys', async () => {
    const wrapper = mount(NpCellGroup, {
      props: {
        type: 'checkbox',
        options: [
          { label: 'A', key: 'a' },
          { label: 'B', key: 'b' },
        ],
      },
      global: { stubs },
    })
    const cells = wrapper.findAllComponents({ name: 'NpCell' })
    await cells[0].vm.$emit('click', { label: 'A', key: 'a' })
    await cells[1].vm.$emit('click', { label: 'B', key: 'b' })
    await cells[0].vm.$emit('click', { label: 'A', key: 'a' })
    expect(wrapper.emitted('update:keys')?.at(-1)).toEqual([['b']])
  })

  test('syncs selectedKeys when keys prop changes', async () => {
    const wrapper = mount(NpCellGroup, {
      props: {
        type: 'checkbox',
        options: [{ label: 'A', key: 'a' }],
        keys: [],
      },
      global: { stubs },
    })
    await wrapper.setProps({ keys: ['a'] })
    const cells = wrapper.findAllComponents({ name: 'NpCell' })
    expect(cells[0].props('checked')).toBe(true)
  })
})
