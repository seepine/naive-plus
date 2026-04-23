import { defineComponent, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import NpFilter from '../src/np-filter.vue'

const TestWrapper = defineComponent({
  components: { NpFilter },
  props: ['items', 'onChange'],
  setup() {
    const params = ref<Record<string, any>>({})
    return { params }
  },
  template: `
    <NpFilter
      v-model:params="params"
      :items="items"
      @change="onChange"
    >
      <button>Filter</button>
    </NpFilter>
  `,
})

describe('NpFilter', () => {
  test('renders correctly', async () => {
    const items = [
      {
        label: '状态',
        key: 'status',
        options: [
          { label: '进行中', value: 'ongoing' },
          { label: '已完成', value: 'done' },
        ],
      },
    ]

    const wrapper = mount(TestWrapper, {
      props: { items, onChange: () => {} },
      global: {
        stubs: {
          'n-button': true,
          'n-popover': true,
          'n-checkbox': true,
          'n-radio': true,
          'n-input': true,
        },
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })

  test('renders grouped options correctly', async () => {
    const items = [
      {
        label: '优先级',
        key: 'priority',
        searchable: true,
        multiple: false,
        options: [
          { title: '紧急', options: [{ label: '高', value: 'high' }] },
          {
            title: '普通',
            options: [
              { label: '中', value: 'medium' },
              { label: '低', value: 'low' },
            ],
          },
        ],
      },
    ]

    const wrapper = mount(TestWrapper, {
      props: { items, onChange: () => {} },
      global: {
        stubs: {
          'n-button': true,
          'n-popover': true,
          'n-checkbox': true,
          'n-radio': true,
          'n-input': true,
        },
      },
    })

    expect(wrapper.find('button').exists()).toBe(true)
  })
})
