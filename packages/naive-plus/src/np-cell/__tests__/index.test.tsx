import { defineComponent, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect, vi } from 'vitest'
import NpCell from '../src/np-cell.vue'
import NpCellGroup from '../src/np-cell-group.vue'

const stubs = {
  'n-checkbox': true,
  'n-radio': true,
  'n-switch': true,
  'n-icon': true,
  'arrow-right-icon': true,
}

const CellWrapper = defineComponent({
  components: { NpCell },
  props: ['label', 'type', 'checked', 'arrow'],
  emits: ['update:checked'],
  template: `<NpCell :label="label" :type="type" :checked="checked" :arrow="arrow" @update:checked="$emit('update:checked', $event)" />`,
})

describe('NpCell', () => {
  test('renders label correctly', () => {
    const wrapper = mount(CellWrapper, {
      props: { label: '测试标签' },
      global: { stubs },
    })
    expect(wrapper.text()).toContain('测试标签')
  })

  test('renders control when type is set', () => {
    const wrapper = mount(CellWrapper, {
      props: { label: '选项', type: 'checkbox', checked: false },
      global: { stubs },
    })
    expect(wrapper.find('.np-cell__control').exists()).toBe(true)
  })

  test('emits update:checked on click when type is set', async () => {
    const wrapper = mount(CellWrapper, {
      props: { label: '选项', type: 'checkbox', checked: false },
      global: { stubs },
    })
    await wrapper.find('.np-cell').trigger('click')
    expect(wrapper.emitted('update:checked')?.[0]).toEqual([true])
  })

  test('does not emit update:checked when no type', async () => {
    const wrapper = mount(CellWrapper, {
      props: { label: '选项' },
      global: { stubs },
    })
    await wrapper.find('.np-cell').trigger('click')
    expect(wrapper.emitted('update:checked')).toBeUndefined()
  })

  test('shows arrow when arrow prop is true', () => {
    const wrapper = mount(CellWrapper, {
      props: { label: '选项', arrow: true },
      global: { stubs },
    })
    expect(wrapper.find('.np-cell__arrow').exists()).toBe(true)
  })

  test('hides arrow by default', () => {
    const wrapper = mount(CellWrapper, {
      props: { label: '选项' },
      global: { stubs },
    })
    expect(wrapper.find('.np-cell__arrow').exists()).toBe(false)
  })
})

describe('NpCellGroup', () => {
  test('renders title', () => {
    const GroupWrapper = defineComponent({
      components: { NpCellGroup },
      template: `<NpCellGroup title="分组标题" :options="[]" />`,
    })
    const wrapper = mount(GroupWrapper, { global: { stubs } })
    expect(wrapper.text()).toContain('分组标题')
  })

  test('renders options as NpCell', () => {
    const GroupWrapper = defineComponent({
      components: { NpCellGroup },
      setup() {
        const options = [{ label: '选项一' }, { label: '选项二' }]
        return { options }
      },
      template: `<NpCellGroup :options="options" />`,
    })
    const wrapper = mount(GroupWrapper, { global: { stubs } })
    expect(wrapper.findAll('.np-cell').length).toBe(2)
  })

  test('emits click and calls item onClick', async () => {
    const onClick = vi.fn()
    const GroupWrapper = defineComponent({
      components: { NpCellGroup },
      setup() {
        const options = ref([{ label: '选项', onClick }])
        return { options }
      },
      template: `<NpCellGroup :options="options" @click="() => {}" />`,
    })
    const wrapper = mount(GroupWrapper, { global: { stubs } })
    await wrapper.find('.np-cell').trigger('click')
    expect(onClick).toHaveBeenCalled()
  })
})
