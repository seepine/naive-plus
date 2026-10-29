import { describe, expect, test } from 'vitest'
import { defineComponent } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { NConfigProvider, NDataTable } from 'naive-ui'
import NpConfigProvider from '../../np-config-provider'
import NpTable from '../src/np-table'
import type { TableOption } from '../src/interface'

const createOption = (operation?: TableOption['operation']): TableOption => ({
  columns: [{ key: 'name', label: '姓名' }],
  operation,
  api: { fetch: async () => ({ items: [], itemCount: 0 }) },
})

const mountTable = (option: TableOption, locale?: 'zh' | 'en') =>
  mount(
    defineComponent({
      setup() {
        return () => (
          <NpConfigProvider locale={locale}>
            <NConfigProvider>
              <NpTable option={option} />
            </NConfigProvider>
          </NpConfigProvider>
        )
      },
    })
  )

const operationTitle = (wrapper: ReturnType<typeof mountTable>) =>
  (
    wrapper.findComponent(NDataTable).props('columns') as Array<{
      key: string
      title: string
    }>
  ).find(column => column.key === '__np_table_operation')?.title

describe('np-table operation title', () => {
  test('默认取语言包中的「操作」', async () => {
    const wrapper = mountTable(createOption())
    await flushPromises()

    expect(operationTitle(wrapper)).toBe('操作')

    wrapper.unmount()
  })

  test('英文语言包下为 Operation', async () => {
    const wrapper = mountTable(createOption(), 'en')
    await flushPromises()

    expect(operationTitle(wrapper)).toBe('Operation')

    wrapper.unmount()
  })

  test('operation.label 优先于语言包', async () => {
    const wrapper = mountTable(createOption({ label: '操作项' }))
    await flushPromises()

    expect(operationTitle(wrapper)).toBe('操作项')

    wrapper.unmount()
  })

  test('operation.label 为空字符串时不显示标题', async () => {
    const wrapper = mountTable(createOption({ label: '' }))
    await flushPromises()

    expect(operationTitle(wrapper)).toBe('')

    wrapper.unmount()
  })
})
