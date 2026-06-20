import { describe, expect, test } from 'vitest'
import { buildFormColumns } from '../src/use-crud'
import type { TableColumn } from '../src/interface'

describe('buildFormColumns', () => {
  test('does not crash when a column has no formProps (regression)', () => {
    const columns: TableColumn[] = [{ key: 'name', label: '姓名' }]

    expect(() => buildFormColumns(columns, 'add')).not.toThrow()
    expect(() => buildFormColumns(columns, 'edit')).not.toThrow()
  })
})
