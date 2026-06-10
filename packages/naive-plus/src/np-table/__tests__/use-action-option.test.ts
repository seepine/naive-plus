import { NText } from 'naive-ui'
import { describe, expect, test } from 'vitest'
import { buildOperationOptions } from '../src/use-action-option'

describe('buildOperationOptions', () => {
  test('returns default edit and delete options when no config is provided', () => {
    const options = buildOperationOptions()

    expect(options).toHaveLength(2)
    expect(options[0]).toMatchObject({ key: 'edit', label: '编辑' })
    expect(options[1]?.key).toBe('delete')
    expect(typeof options[1]?.label).toBe('function')
  })

  test('builds default options from EDIT and DEL types', () => {
    const options = buildOperationOptions([{ type: 'edit' }, { type: 'del' }])
    const deleteLabel = options[1]?.label as () => ReturnType<typeof NText>
    const vnode = deleteLabel()

    expect(options[0]).toMatchObject({ key: 'edit', label: '编辑' })
    expect(options[1]?.key).toBe('delete')
    expect(vnode.type).toBe(NText)
    expect(vnode.props?.type).toBe('error')
  })

  test('allows custom fields to extend the default EDIT and DEL options', () => {
    const options = buildOperationOptions([
      { type: 'edit', disabled: true },
      { type: 'del', props: { style: { width: '120px' } } },
    ])

    expect(options[0]).toMatchObject({
      key: 'edit',
      label: '编辑',
      disabled: true,
    })
    expect(options[1]).toMatchObject({
      key: 'delete',
      props: { style: { width: '120px' } },
    })
  })

  test('preserves custom options without special types', () => {
    const options = buildOperationOptions([{ key: 'view', label: '查看' }])

    expect(options).toEqual([{ key: 'view', label: '查看' }])
  })
})
