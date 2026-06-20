import { describe, expect, test } from 'vitest'
import { buildFormColumns } from '../src/use-crud'
import type { TableColumn } from '../src/interface'

describe('buildFormColumns', () => {
  test('does not crash when a column has no formProps (regression)', () => {
    const columns: TableColumn[] = [
      { key: 'name', label: '姓名' },
      { key: 'status', label: '状态' },
    ]

    expect(() => buildFormColumns(columns, 'add')).not.toThrow()
    expect(() => buildFormColumns(columns, 'edit')).not.toThrow()

    expect(buildFormColumns(columns, 'add')).toEqual([
      { key: 'name', label: '姓名', display: true },
      { key: 'status', label: '状态', display: true },
    ])
  })

  test('keeps base formProps when no addProps/editProps are provided', () => {
    const columns: TableColumn[] = [
      {
        key: 'name',
        label: '姓名',
        formProps: { type: 'input', defaultValue: 'guest' },
      },
    ]

    expect(buildFormColumns(columns, 'add')).toEqual([
      {
        key: 'name',
        label: '姓名',
        type: 'input',
        defaultValue: 'guest',
        display: true,
      },
    ])
    expect(buildFormColumns(columns, 'edit')).toEqual([
      {
        key: 'name',
        label: '姓名',
        type: 'input',
        defaultValue: 'guest',
        display: true,
      },
    ])
  })

  test('picks addProps / editProps based on mode and lets mode overrides win', () => {
    const columns: TableColumn[] = [
      {
        key: 'name',
        label: '姓名',
        formProps: {
          type: 'input',
          defaultValue: 'shared',
          addProps: { defaultValue: 'for-add' },
          editProps: { defaultValue: 'for-edit' },
        },
      },
    ]

    expect(buildFormColumns(columns, 'add')).toEqual([
      {
        key: 'name',
        label: '姓名',
        type: 'input',
        defaultValue: 'for-add',
        display: true,
      },
    ])
    expect(buildFormColumns(columns, 'edit')).toEqual([
      {
        key: 'name',
        label: '姓名',
        type: 'input',
        defaultValue: 'for-edit',
        display: true,
      },
    ])
  })
})
