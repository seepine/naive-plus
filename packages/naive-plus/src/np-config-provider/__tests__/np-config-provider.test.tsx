import { nextTick, reactive } from 'vue'
import { mount, flushPromises } from '@vue/test-utils'
import { describe, expect, test, vi } from 'vitest'
import {
  NButton,
  NCheckboxGroup,
  NConfigProvider,
  NDataTable,
  NForm,
  NFormItemGi,
  NInput,
  NModal,
  NPopover,
  NRadioButton,
  NRadioGroup,
  NUpload,
} from 'naive-ui'
import NpConfigProvider from '../src/np-config-provider.vue'
import NpCell from '../../np-cell/src/np-cell.vue'
import NpCellGroup from '../../np-cell-group/src/np-cell-group.vue'
import NpButton from '../../np-button/src/np-button'
import NpCheckbox from '../../np-checkbox/src/np-checkbox'
import NpFilter from '../../np-filter/src/np-filter.vue'
import NpForm from '../../np-form/src/np-form'
import NpRadio from '../../np-radio/src/np-radio'
import NpTable from '../../np-table/src/np-table'
import NpTableAction from '../../np-table/src/np-table-action'
import NpTableCrudDialog from '../../np-table/src/components/np-table-crud-dialog.vue'
import NpTableDelDialog from '../../np-table/src/components/np-table-del-dialog.vue'
import NpUpload from '../../np-upload/src/np-upload'
import type {
  NpComponentOptions,
  NpLocaleMessagesInput,
  NpLocaleOption,
  NpTableColumnFormConfigProps,
} from '../index'
import { enUS } from '../../locale'

const stubs = {
  'n-checkbox': true,
  'n-radio': true,
  'n-switch': true,
  'n-icon': true,
  'arrow-right-icon': true,
}

/**
 * 挂载一个包裹了 np-config-provider 的容器，默认插槽内容由调用方提供
 */
const mountWithProvider = (
  componentOptions: NpComponentOptions,
  slot: () => any
) =>
  mount(NpConfigProvider, {
    props: { componentOptions },
    slots: { default: slot },
    global: { stubs },
  })

/**
 * 挂载一个指定语言的 np-config-provider 容器
 */
const mountWithLocale = (
  locale: NpLocaleOption,
  slot: () => any,
  componentOptions: NpComponentOptions = {}
) =>
  mount(NpConfigProvider, {
    props: { componentOptions, locale },
    slots: { default: slot },
    global: { stubs },
  })

/** 读取表单底部按钮的文案 */
const footerButtonText = (wrapper: ReturnType<typeof mountWithProvider>) =>
  wrapper
    .find('.np-form__footer')
    .findAll('button')
    .map(button => button.text())

describe('NpConfigProvider', () => {
  test('渲染插槽内容', () => {
    const wrapper = mountWithProvider({}, () => <NpCell label="单元格" />)
    expect(wrapper.text()).toContain('单元格')
  })

  test('Cell: 应用 provider 中的默认值', () => {
    const wrapper = mountWithProvider(
      { Cell: { size: 'large', arrow: true, bordered: true } },
      () => <NpCell label="单元格" />
    )

    expect(wrapper.find('.np-cell__large').exists()).toBe(true)
    expect(wrapper.find('.np-cell__content-border').exists()).toBe(true)
    expect(wrapper.find('.np-cell__arrow').exists()).toBe(true)
  })

  test('Cell: 组件自身 prop 优先级高于 provider', () => {
    const wrapper = mountWithProvider({ Cell: { size: 'large' } }, () => (
      <NpCell label="单元格" size="small" />
    ))

    expect(wrapper.find('.np-cell__small').exists()).toBe(true)
    expect(wrapper.find('.np-cell__large').exists()).toBe(false)
  })

  test('Cell: 显式传入 false 可覆盖 provider 的 true', () => {
    const wrapper = mountWithProvider(
      { Cell: { hover: true, arrow: true } },
      () => <NpCell label="单元格" hover={false} arrow={false} />
    )

    expect(wrapper.classes()).not.toContain('np-cell__hover')
    expect(wrapper.find('.np-cell__arrow').exists()).toBe(false)
  })

  test('Cell: 未使用 provider 时保持内置默认值', () => {
    const wrapper = mount(NpCell, {
      props: { label: '单元格' },
      global: { stubs },
    })

    expect(wrapper.find('.np-cell__medium').exists()).toBe(true)
    expect(wrapper.find('.np-cell__arrow').exists()).toBe(false)
  })

  test('Button: 应用 provider 中的默认值', () => {
    const wrapper = mountWithProvider({ Button: { type: 'primary' } }, () => (
      <NpButton>按钮</NpButton>
    ))

    expect(wrapper.findComponent(NButton).props('type')).toBe('primary')
  })

  test('Button: 组件自身 prop 优先级高于 provider', () => {
    const wrapper = mountWithProvider({ Button: { type: 'primary' } }, () => (
      <NpButton type="error">按钮</NpButton>
    ))

    expect(wrapper.findComponent(NButton).props('type')).toBe('error')
  })

  test('Button: 透传 naive-ui 的 props 与 provider 逐层合并', () => {
    const wrapper = mountWithProvider(
      { Button: { props: { size: 'small', ghost: true } } },
      () => <NpButton props={{ size: 'medium' }}>按钮</NpButton>
    )

    const nButton = wrapper.findComponent(NButton)
    expect(nButton.props('size')).toBe('medium')
    expect(nButton.props('ghost')).toBe(true)
  })

  test('Button: provider 与组件自身的 style 逐层合并', () => {
    const wrapper = mountWithProvider(
      { Button: { style: { color: 'red' } } },
      () => <NpButton style={{ fontSize: '12px' }}>按钮</NpButton>
    )

    const style = wrapper.find('button').attributes('style') ?? ''
    expect(style).toContain('color: red')
    expect(style).toContain('font-size: 12px')
  })

  test('Button: click / onClick 不允许通过 provider 设置', async () => {
    const providerClick = vi.fn()
    const userClick = vi.fn()
    const componentOptions = {
      Button: { onClick: providerClick, click: providerClick },
    } as unknown as NpComponentOptions

    const wrapper = mountWithProvider(componentOptions, () => (
      <NpButton onClick={userClick}>按钮</NpButton>
    ))
    await wrapper.find('button').trigger('click')

    expect(userClick).toHaveBeenCalled()
    expect(providerClick).not.toHaveBeenCalled()
  })

  test('Button: 未使用 provider 时保持内置默认值', () => {
    const wrapper = mount(NpButton, { slots: { default: () => '按钮' } })
    expect(wrapper.findComponent(NButton).props('type')).toBe('default')
  })

  test('Button: provider 的 throttleDelay 变化时重建节流', async () => {
    vi.useFakeTimers()
    try {
      const onClick = vi.fn()
      const wrapper = mountWithProvider(
        { Button: { throttleDelay: 350 } },
        () => <NpButton onClick={onClick}>按钮</NpButton>
      )

      const clickThenWait = async (wait: number) => {
        await wrapper.find('button').trigger('click')
        vi.advanceTimersByTime(wait)
      }

      await clickThenWait(400)
      await clickThenWait(400)
      expect(onClick).toHaveBeenCalledTimes(2)

      await wrapper.setProps({
        componentOptions: { Button: { throttleDelay: 1000 } },
      })
      onClick.mockClear()

      await clickThenWait(400)
      await clickThenWait(400)
      // 间隔 400ms 小于新的 1000ms，第二次点击应被节流
      expect(onClick).toHaveBeenCalledTimes(1)
    } finally {
      vi.useRealTimers()
    }
  })

  test('CellGroup: 应用 provider 中的默认值并透传给单元格', () => {
    const wrapper = mountWithProvider(
      { CellGroup: { size: 'large', bordered: true } },
      () => <NpCellGroup options={[{ label: 'A' }, { label: 'B' }]} />
    )

    expect(wrapper.find('.np-cell-group__large').exists()).toBe(true)

    const cells = wrapper.findAllComponents(NpCell)
    expect(cells[0].classes()).toContain('np-cell__large')
    expect(cells[0].find('.np-cell__content-border').exists()).toBe(true)
    expect(cells[1].find('.np-cell__content-border').exists()).toBe(false)
  })

  test('CellGroup: 内部单元格的尺寸/边框由 CellGroup 决定', () => {
    const wrapper = mountWithProvider(
      {
        Cell: { size: 'large', bordered: true },
        CellGroup: { size: 'small', bordered: false },
      },
      () => <NpCellGroup options={[{ label: 'A' }, { label: 'B' }]} />
    )

    const cells = wrapper.findAllComponents(NpCell)
    expect(cells[0].classes()).toContain('np-cell__small')
    expect(cells[0].classes()).not.toContain('np-cell__large')
    expect(cells[0].find('.np-cell__content-border').exists()).toBe(false)
  })

  test('CellGroup: 单元格未指定的 hover / arrow 仍继承 Cell 配置', () => {
    const wrapper = mountWithProvider(
      { Cell: { hover: true, arrow: true } },
      () => <NpCellGroup options={[{ label: 'A' }]} />
    )

    const cell = wrapper.findComponent(NpCell)
    expect(cell.classes()).toContain('np-cell__hover')
    expect(cell.find('.np-cell__arrow').exists()).toBe(true)
  })

  test('Checkbox: 透传 naive-ui 的 props 支持 provider 配置', () => {
    const wrapper = mountWithProvider(
      { Checkbox: { props: { size: 'small' } } },
      () => <NpCheckbox />
    )

    expect(wrapper.findComponent(NCheckboxGroup).props('size')).toBe('small')
  })

  test('Radio: 应用 provider 中的 type 与透传 props', async () => {
    const wrapper = mountWithProvider(
      { Radio: { type: 'button', props: { size: 'small' } } },
      () => <NpRadio options={[{ label: 'A', value: 1 }]} />
    )
    await flushPromises()

    expect(wrapper.findComponent(NRadioGroup).props('size')).toBe('small')
    expect(wrapper.findComponent(NRadioButton).exists()).toBe(true)
  })

  test('Radio: provider 的 type 变化时响应式切换控件类型', async () => {
    const wrapper = mountWithProvider({ Radio: { type: 'default' } }, () => (
      <NpRadio options={[{ label: 'A', value: 1 }]} />
    ))
    await flushPromises()
    expect(wrapper.findComponent(NRadioButton).exists()).toBe(false)

    await wrapper.setProps({ componentOptions: { Radio: { type: 'button' } } })
    await flushPromises()

    expect(wrapper.findComponent(NRadioButton).exists()).toBe(true)
  })

  test('Upload: 透传 naive-ui 的 props 支持 provider 配置', () => {
    const wrapper = mountWithProvider(
      { Upload: { props: { listType: 'image-card' } } },
      () => <NpUpload />
    )

    expect(wrapper.findComponent(NUpload).props('listType')).toBe('image-card')
  })

  test('Filter: 应用 provider 中的 trigger 与 placement', () => {
    const wrapper = mountWithProvider(
      { Filter: { trigger: 'hover', placement: 'right' } },
      () => (
        <NpFilter params={{}} items={[]}>
          {{ default: () => <button>筛选</button> }}
        </NpFilter>
      )
    )

    const popover = wrapper.findComponent(NPopover)
    expect(popover.props('trigger')).toBe('hover')
    expect(popover.props('placement')).toBe('bottom-start')
  })

  test('Form: 应用 provider 中的 grid / props / column 默认值', async () => {
    const wrapper = mountWithProvider(
      {
        Form: {
          grid: { cols: 12 },
          props: { labelPlacement: 'left' },
          column: {
            props: { size: 'small' },
            formItemProps: { labelWidth: 120 },
          },
        },
      },
      () => <NpForm option={{ columns: [{ label: '姓名', key: 'name' }] }} />
    )
    await nextTick()

    expect(wrapper.findComponent(NForm).props('labelPlacement')).toBe('left')
    expect(wrapper.findComponent(NInput).props('size')).toBe('small')

    const formItem = wrapper.findComponent(NFormItemGi)
    expect(formItem.props('labelWidth')).toBe(120)
    expect(formItem.props('span')).toBe(12)
  })

  test('Form: provider 的 column.props.defaultValue 不会写入所有表单项', async () => {
    const wrapper = mountWithProvider(
      { Form: { column: { props: { defaultValue: 'global' } } } },
      () => (
        <NpForm
          option={{
            columns: [
              { label: 'A', key: 'a' },
              { label: 'B', key: 'b' },
            ],
          }}
        />
      )
    )
    await nextTick()

    expect(wrapper.findComponent(NForm).props('model')).toEqual({})
  })

  test('Form: 应用 provider 中的 enterSubmitMode', async () => {
    const onSubmit = vi.fn()
    const wrapper = mountWithProvider(
      { Form: { enterSubmitMode: 'all' } },
      () => (
        <NpForm
          option={{ columns: [{ label: '姓名', key: 'name' }], onSubmit }}
        />
      )
    )
    await nextTick()

    await wrapper.find('input').trigger('keyup', { key: 'Enter' })
    await flushPromises()

    expect(onSubmit).toHaveBeenCalled()
  })

  test('Form: 应用 provider 中的 footer 默认值', async () => {
    const wrapper = mountWithProvider(
      {
        Form: {
          footer: {
            align: 'right',
            style: { gap: '8px' },
            formItemProps: { labelWidth: 100 },
            submitBtn: { text: '保存', props: { size: 'small' } },
            resetBtn: false,
          },
        },
      },
      () => <NpForm option={{ columns: [{ label: '姓名', key: 'name' }] }} />
    )
    await nextTick()

    const footer = wrapper.find('.np-form__footer')
    expect(footer.exists()).toBe(true)
    expect(footer.attributes('style')).toContain('row-reverse')
    expect(footer.attributes('style')).toContain('gap: 8px')

    const buttons = footer.findAll('button')
    expect(buttons.map(button => button.text())).toEqual(['保存'])
    expect(wrapper.findComponent(NButton).props('size')).toBe('small')

    const footerFormItem = wrapper.findAllComponents(NFormItemGi).at(-1)
    expect(footerFormItem?.props('labelWidth')).toBe(100)
  })

  test('Form: footer 自身配置优先于 provider，且 footer: false 仍可隐藏', async () => {
    const wrapper = mountWithProvider(
      {
        Form: {
          footer: {
            align: 'right',
            submitBtn: { text: '保存' },
            resetBtn: false,
          },
        },
      },
      () => (
        <NpForm
          option={{
            columns: [{ label: '姓名', key: 'name' }],
            footer: { align: 'left', submitBtn: false, resetBtn: {} },
          }}
        />
      )
    )
    await nextTick()

    const footer = wrapper.find('.np-form__footer')
    expect(footer.attributes('style')).not.toContain('row-reverse')
    expect(footer.findAll('button').map(button => button.text())).toEqual([
      '重置',
    ])

    const hiddenWrapper = mountWithProvider(
      { Form: { footer: { align: 'right' } } },
      () => (
        <NpForm
          option={{
            columns: [{ label: '姓名', key: 'name' }],
            footer: false,
          }}
        />
      )
    )
    await nextTick()

    expect(hiddenWrapper.find('.np-form__footer').exists()).toBe(false)
  })

  test('Form: provider 中的 footer.submitErrorFeedback 生效', async () => {
    const wrapper = mountWithProvider(
      { Form: { footer: { submitErrorFeedback: false } } },
      () => (
        <NpForm
          option={{
            columns: [{ label: '姓名', key: 'name' }],
            onSubmit: () => {
              throw new Error('提交失败啦')
            },
          }}
        />
      )
    )
    await nextTick()

    const submitButton = wrapper
      .findAll('button')
      .find(button => button.text() === '提交')
    await submitButton?.trigger('click')
    await flushPromises()
    await nextTick()

    expect(wrapper.text()).not.toContain('提交失败啦')
  })

  test('Table: 应用 provider 中的 rowKey / props / column 默认值', async () => {
    const wrapper = mountWithProvider(
      {
        Table: {
          rowKey: 'uid',
          props: { bordered: true },
          column: { props: { width: 120 } },
        },
      },
      () => (
        <NConfigProvider>
          <NpTable
            option={{
              api: {
                fetch: async () => ({ items: [{ uid: 1, name: 'a' }] }),
              },
              columns: [{ key: 'name', label: '姓名' }],
            }}
          />
        </NConfigProvider>
      )
    )
    await flushPromises()

    const dataTable = wrapper.findComponent(NDataTable)
    expect(dataTable.props('bordered')).toBe(true)
    expect(dataTable.props('columns')[0].width).toBe(120)
    expect(dataTable.props('rowKey')({ uid: 7 })).toBe(7)
  })

  test('Table: provider 的列配置变化时响应式更新', async () => {
    const wrapper = mountWithProvider(
      { Table: { column: { props: { width: 120 } } } },
      () => (
        <NConfigProvider>
          <NpTable
            option={{
              api: {
                fetch: async () => ({ items: [{ id: 1, name: 'a' }] }),
              },
              columns: [{ key: 'name', label: '姓名' }],
            }}
          />
        </NConfigProvider>
      )
    )
    await flushPromises()

    const columnWidth = () =>
      wrapper.findComponent(NDataTable).props('columns')[0].width
    expect(columnWidth()).toBe(120)

    await wrapper.setProps({
      componentOptions: { Table: { column: { props: { width: 200 } } } },
    })
    await nextTick()

    expect(columnWidth()).toBe(200)
  })

  test('Table: 全局列配置类型不接受列自身专属字段', () => {
    // 展示类字段允许全局配置
    const allowed: NpTableColumnFormConfigProps = {
      props: { size: 'small' },
      formItemProps: { labelWidth: 100 },
      addProps: { props: { size: 'medium' } },
    }

    // 以下赋值均由类型层拒绝（编译期校验）
    // @ts-expect-error 内容字段不支持全局配置
    const withLabel: NpTableColumnFormConfigProps = { label: '统一标题' }
    // @ts-expect-error 数据源不支持全局配置
    const withOptions: NpTableColumnFormConfigProps = { options: [] }
    // @ts-expect-error 状态不支持全局配置
    const withDefaultValue: NpTableColumnFormConfigProps = { defaultValue: 'x' }
    // @ts-expect-error 数据契约不支持全局配置
    const withRule: NpTableColumnFormConfigProps = { rule: [] }
    // @ts-expect-error 事件不支持全局配置
    const withOnChange: NpTableColumnFormConfigProps = { onChange: () => {} }
    const withRender: NpTableColumnFormConfigProps = {
      // @ts-expect-error 内容字段不支持全局配置
      addProps: { render: () => null },
    }

    expect([
      allowed,
      withLabel,
      withOptions,
      withDefaultValue,
      withRule,
      withOnChange,
      withRender,
    ]).toHaveLength(7)
  })

  test('provider 配置变化时子组件响应式更新', async () => {
    const wrapper = mountWithProvider({ Cell: { size: 'large' } }, () => (
      <NpCell label="单元格" />
    ))

    expect(wrapper.find('.np-cell__large').exists()).toBe(true)

    await wrapper.setProps({ componentOptions: { Cell: { size: 'small' } } })

    expect(wrapper.find('.np-cell__small').exists()).toBe(true)
    expect(wrapper.find('.np-cell__large').exists()).toBe(false)
  })

  test('传入 reactive 对象时原地修改也能触发更新', async () => {
    const componentOptions: NpComponentOptions = reactive({
      Cell: { size: 'large' },
    })
    const wrapper = mountWithProvider(componentOptions, () => (
      <NpCell label="单元格" />
    ))

    expect(wrapper.find('.np-cell__large').exists()).toBe(true)

    componentOptions.Cell = { size: 'small' }
    await nextTick()

    expect(wrapper.find('.np-cell__small').exists()).toBe(true)
  })

  test('嵌套 provider 时内层整体替换外层配置', () => {
    const wrapper = mountWithProvider({ Cell: { size: 'large' } }, () => (
      <NpConfigProvider componentOptions={{ Cell: { size: 'small' } }}>
        <NpCell label="单元格" />
      </NpConfigProvider>
    ))

    expect(wrapper.find('.np-cell__small').exists()).toBe(true)
    expect(wrapper.find('.np-cell__large').exists()).toBe(false)
  })

  test('嵌套 provider 时内层未传 componentOptions 继承外层', () => {
    const wrapper = mountWithProvider({ Cell: { size: 'large' } }, () => (
      <NpConfigProvider locale="en">
        <NpCell label="单元格" />
      </NpConfigProvider>
    ))

    expect(wrapper.find('.np-cell__large').exists()).toBe(true)
  })

  test('嵌套 provider 时内层未传 locale 继承外层', async () => {
    const wrapper = mount(NpConfigProvider, {
      props: { locale: 'en' },
      slots: {
        default: () => (
          <NpConfigProvider>
            <NpForm option={{ columns: [{ label: 'Name', key: 'name' }] }} />
          </NpConfigProvider>
        ),
      },
      global: { stubs },
    })
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['Submit', 'Reset'])
  })

  test('嵌套 provider 时内层显式 locale 覆盖外层', async () => {
    const wrapper = mount(NpConfigProvider, {
      props: { locale: 'en' },
      slots: {
        default: () => (
          <NpConfigProvider locale="zh">
            <NpForm option={{ columns: [{ label: '姓名', key: 'name' }] }} />
          </NpConfigProvider>
        ),
      },
      global: { stubs },
    })
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['提交', '重置'])
  })
})

describe('NpConfigProvider locale', () => {
  test('默认使用中文文案', async () => {
    const wrapper = mountWithLocale('zh', () => (
      <NpForm option={{ columns: [{ label: '姓名', key: 'name' }] }} />
    ))
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['提交', '重置'])
  })

  test('Form: locale="en" 时底部按钮使用英文文案', async () => {
    const wrapper = mountWithLocale('en', () => (
      <NpForm option={{ columns: [{ label: 'Name', key: 'name' }] }} />
    ))
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['Submit', 'Reset'])
  })

  test('Form: 切换 locale 时文案响应式更新', async () => {
    const wrapper = mountWithLocale('zh', () => (
      <NpForm option={{ columns: [{ label: '姓名', key: 'name' }] }} />
    ))
    await nextTick()
    expect(footerButtonText(wrapper)).toEqual(['提交', '重置'])

    await wrapper.setProps({ locale: 'en' })
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['Submit', 'Reset'])
  })

  test('Form: locale 传自定义语言包时使用自定义文案', async () => {
    const jaJP: NpLocaleMessagesInput = {
      Form: { footer: { submitBtnText: '送信', resetBtnText: 'リセット' } },
    }
    const wrapper = mountWithLocale(jaJP, () => (
      <NpForm option={{ columns: [{ label: '名前', key: 'name' }] }} />
    ))
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['送信', 'リセット'])
  })

  test('Form: 自定义语言包未覆盖的字段回落到内置语言包', async () => {
    const partial: NpLocaleMessagesInput = {
      Form: { footer: { submitBtnText: '送信' } },
    }
    const wrapper = mountWithLocale(partial, () => (
      <NpForm option={{ columns: [{ label: '名前', key: 'name' }] }} />
    ))
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['送信', '重置'])
  })

  test('Form: 自定义语言包中值为 undefined 的字段视为未覆盖', async () => {
    const partial: NpLocaleMessagesInput = {
      Form: { footer: { submitBtnText: '送信', resetBtnText: undefined } },
    }
    const wrapper = mountWithLocale(partial, () => (
      <NpForm option={{ columns: [{ label: '名前', key: 'name' }] }} />
    ))
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['送信', '重置'])
  })

  test('Form: 传入完整的内置语言包时使用其文案', async () => {
    const wrapper = mountWithLocale(enUS, () => (
      <NpForm option={{ columns: [{ label: 'Name', key: 'name' }] }} />
    ))
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['Submit', 'Reset'])
  })

  test('Form: 切换自定义语言包时文案响应式更新', async () => {
    const custom: NpLocaleMessagesInput = {
      Form: { footer: { submitBtnText: 'Save', resetBtnText: 'Reset' } },
    }
    const wrapper = mountWithLocale('zh', () => (
      <NpForm option={{ columns: [{ label: '姓名', key: 'name' }] }} />
    ))
    await nextTick()
    expect(footerButtonText(wrapper)).toEqual(['提交', '重置'])

    await wrapper.setProps({ locale: custom })
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['Save', 'Reset'])
  })

  test('嵌套 provider 时内层自定义语言包覆盖外层', async () => {
    const custom: NpLocaleMessagesInput = {
      Form: { footer: { submitBtnText: '送出', resetBtnText: '重設' } },
    }
    const wrapper = mountWithLocale('en', () => (
      <NpConfigProvider locale={custom}>
        <NpForm option={{ columns: [{ label: '姓名', key: 'name' }] }} />
      </NpConfigProvider>
    ))
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['送出', '重設'])
  })

  test('Form: componentOptions 的按钮文案优先于语言包', async () => {
    const wrapper = mountWithLocale(
      'en',
      () => <NpForm option={{ columns: [{ label: 'Name', key: 'name' }] }} />,
      { Form: { footer: { submitBtn: { text: 'Save' } } } }
    )
    await nextTick()

    expect(footerButtonText(wrapper)).toEqual(['Save', 'Reset'])
  })

  test('Upload: locale="en" 时默认上传按钮使用英文文案', async () => {
    const wrapper = mountWithLocale('en', () => <NpUpload />)
    await nextTick()

    expect(wrapper.text()).toContain('Upload file')
  })

  test('Table: locale="en" 时操作列 / 显隐设置 / 搜索框使用英文文案', async () => {
    const wrapper = mountWithLocale('en', () => (
      <NConfigProvider>
        <NpTable
          option={{
            api: {
              fetch: async () => ({ items: [{ id: 1, name: 'a' }] }),
            },
            columns: [{ key: 'name', label: 'Name' }],
            search: {},
          }}
        />
      </NConfigProvider>
    ))
    await flushPromises()
    await nextTick()

    expect(
      wrapper.find('.np-table__search input').attributes('placeholder')
    ).toBe('Enter keyword to search')

    const action = wrapper.findComponent(NpTableAction)
    expect(action.props('defaultOptions')).toMatchObject({
      edit: { label: 'Edit' },
      del: { key: 'delete' },
    })

    // 打开显隐设置弹窗后断言标题
    await wrapper.findAll('.np-table__header-right button')[0].trigger('click')
    await flushPromises()
    expect(wrapper.findComponent(NpCellGroup).props('title')).toBe(
      'Display Settings'
    )
  })

  test('Table: 应用 provider 中的 operation 配置', async () => {
    const wrapper = mountWithProvider(
      {
        Table: {
          operation: {
            label: '操作',
            defaultOptions: { edit: { label: '修改', key: 'edit' } },
          },
        },
      },
      () => (
        <NConfigProvider>
          <NpTable
            option={{
              api: {
                fetch: async () => ({ items: [{ id: 1, name: 'a' }] }),
              },
              columns: [{ key: 'name', label: '姓名' }],
            }}
          />
        </NConfigProvider>
      )
    )
    await flushPromises()

    const operationColumn = (
      wrapper.findComponent(NDataTable).props('columns') as Array<{
        key: string
        title: string
      }>
    ).find(column => column.key === '__np_table_operation')
    expect(operationColumn?.title).toBe('操作')

    const action = wrapper.findComponent(NpTableAction)
    expect(action.props('defaultOptions')).toMatchObject({
      edit: { label: '修改', key: 'edit' },
      del: { key: 'delete' },
    })
  })

  test('Table: provider 中的 operation 列属性作为操作列默认值', async () => {
    const wrapper = mountWithProvider(
      {
        Table: {
          operation: { width: 120, align: 'center', fixed: 'right' },
        },
      },
      () => (
        <NConfigProvider>
          <NpTable
            option={{
              api: {
                fetch: async () => ({ items: [{ id: 1, name: 'a' }] }),
              },
              columns: [{ key: 'name', label: '姓名' }],
              operation: { width: 160 },
            }}
          />
        </NConfigProvider>
      )
    )
    await flushPromises()

    const operationColumn = (
      wrapper.findComponent(NDataTable).props('columns') as Array<
        Record<string, any>
      >
    ).find(column => column.key === '__np_table_operation')
    // provider 提供默认值，option.operation 中的同名属性优先
    expect(operationColumn).toMatchObject({
      width: 160,
      align: 'center',
      fixed: 'right',
    })
  })

  test('Table: option.operation.defaultOptions 优先于 provider', async () => {
    const wrapper = mountWithProvider(
      { Table: { operation: { defaultOptions: { edit: { label: '修改' } } } } },
      () => (
        <NConfigProvider>
          <NpTable
            option={{
              api: {
                fetch: async () => ({ items: [{ id: 1, name: 'a' }] }),
              },
              columns: [{ key: 'name', label: '姓名' }],
              operation: { defaultOptions: { edit: { label: '编辑一下' } } },
            }}
          />
        </NConfigProvider>
      )
    )
    await flushPromises()

    const action = wrapper.findComponent(NpTableAction)
    expect(action.props('defaultOptions')).toMatchObject({
      edit: { label: '编辑一下', key: 'edit' },
      del: { key: 'delete' },
    })
  })

  test('Form: locale="en" 时文件上传未完成的校验提示使用英文', async () => {
    const wrapper = mountWithLocale('en', () => (
      <NpForm
        modelValue={{ file: ['blob:http://localhost/not-finished'] }}
        option={{ columns: [{ key: 'file', type: 'upload' }] }}
      />
    ))
    await nextTick()

    await wrapper.find('.np-form__footer button').trigger('click')
    await flushPromises()

    expect(wrapper.text()).toContain('Upload not finished')
  })

  test('Upload: locale="en" 时上传失败提示使用英文', async () => {
    const handlers: Record<string, () => void> = {}
    vi.stubGlobal(
      'XMLHttpRequest',
      vi.fn(() => ({
        open: vi.fn(),
        send: vi.fn(),
        setRequestHeader: vi.fn(),
        addEventListener: (event: string, handler: () => void) => {
          handlers[event] = handler
        },
        upload: { addEventListener: vi.fn() },
        withCredentials: false,
        status: 0,
        response: '',
      }))
    )

    try {
      const wrapper = mountWithLocale('en', () => (
        <NpForm
          option={{
            columns: [
              {
                key: 'file',
                type: 'upload',
                props: { action: 'https://example.com/upload' },
              },
            ],
          }}
        />
      ))
      await nextTick()

      const customRequest = wrapper
        .findComponent(NUpload)
        .props('customRequest') as (options: any) => void
      customRequest({
        file: { file: new File(['x'], 'a.txt') },
        headers: {},
        withCredentials: false,
        action: 'https://example.com/upload',
        onFinish: vi.fn(),
        onError: vi.fn(),
        onProgress: vi.fn(),
      })
      await flushPromises()

      handlers.error?.()
      await flushPromises()
      await nextTick()

      expect(wrapper.text()).toContain('Upload failed: Network error')
      wrapper.unmount()
    } finally {
      vi.unstubAllGlobals()
    }
  })

  test('Table: locale="en" 时新增按钮与新增弹窗文案使用英文', async () => {
    const wrapper = mountWithLocale('en', () => (
      <NConfigProvider>
        <NpTable
          option={{
            api: {
              fetch: async () => ({ items: [{ id: 1, name: 'a' }] }),
              add: async () => true,
            },
            columns: [{ key: 'name', label: 'Name' }],
          }}
        />
      </NConfigProvider>
    ))
    await flushPromises()

    const addButton = wrapper
      .findAll('button')
      .find(button => button.text() === 'Add')
    expect(addButton).toBeTruthy()

    const crudDialog = wrapper.findComponent(NpTableCrudDialog)
    expect(crudDialog.findComponent(NModal).props('title')).toBe('Create')

    await addButton!.trigger('click')
    await flushPromises()

    const buttonTexts = crudDialog
      .findAllComponents(NButton)
      .map(button => button.text())
    expect(buttonTexts).toContain('Cancel')
    expect(buttonTexts).toContain('Confirm')

    wrapper.unmount()
  })

  test('Table: locale="en" 时删除弹窗文案使用英文', async () => {
    const wrapper = mountWithLocale('en', () => (
      <NConfigProvider>
        <NpTable
          option={{
            api: {
              fetch: async () => ({ items: [{ id: 1, name: 'a' }] }),
            },
            columns: [{ key: 'name', label: 'Name' }],
          }}
        />
      </NConfigProvider>
    ))
    await flushPromises()

    const delModal = wrapper
      .findComponent(NpTableDelDialog)
      .findComponent(NModal)
    expect(delModal.props('title')).toBe('Confirm Deletion')
    expect(delModal.props('content')).toBe(
      'Are you sure to delete this record? This action cannot be undone.'
    )
    expect(delModal.props('positiveText')).toBe('Delete')
    expect(delModal.props('negativeText')).toBe('Cancel')

    wrapper.unmount()
  })

  test('Filter: locale="en" 时清除筛选文案使用英文', async () => {
    const wrapper = mountWithLocale('en', () => (
      <NpFilter
        params={{ status: [1] }}
        items={[
          {
            key: 'status',
            label: 'Status',
            options: [{ label: 'A', value: 1 }],
          },
        ]}
      >
        {{ default: () => <button>筛选</button> }}
      </NpFilter>
    ))
    await wrapper.find('button').trigger('click')
    await flushPromises()

    const labels = wrapper
      .findAllComponents(NpCell)
      .map(cell => cell.props('label'))
    expect(labels).toContain('Clear all filters')

    wrapper.unmount()
  })
})
