import { describe, expect, test, vi } from 'vitest'

import { NaivePlusResolver } from '../resolver'

vi.hoisted(() => {
  // vitest sets SSR=1 in process.env by default, which would flip the resolver
  // into SSR mode (lib output, no side effects). Strip those vars before the
  // resolver module is loaded so it sees a normal client-side env.
  delete process.env.SSR
  delete process.env.SSG
  delete process.env.VITE_SSR
  delete process.env.VITE_SSG
})

const resolve = (name: string) => {
  const resolver = NaivePlusResolver()
  const result = resolver.resolve!(name)
  return result as
    | { name: string; from: string; sideEffects?: string | string[] }
    | undefined
}

describe('NaivePlusResolver', () => {
  test('resolves top-level components to their own directory', () => {
    expect(resolve('NpButton')).toEqual({
      name: 'NpButton',
      from: 'naive-plus/es/np-button',
      sideEffects: 'naive-plus/es/np-button/style/index.css',
    })
  })

  test('maps np-cell-group to the owning np-cell directory', () => {
    expect(resolve('NpCellGroup')).toEqual({
      name: 'NpCellGroup',
      from: 'naive-plus/es/np-cell',
      sideEffects: 'naive-plus/es/np-cell/style/index.css',
    })
  })

  test('does not emit a non-existent np-cell-group style path', () => {
    const result = resolve('NpCellGroup')
    expect(typeof result?.sideEffects).toBe('string')
    expect(result?.sideEffects as string).not.toContain('np-cell-group/style')
  })

  test('honors scss importStyle for sub-components', () => {
    const resolver = NaivePlusResolver({ importStyle: 'scss' })
    const result = resolver.resolve!('NpCellGroup') as {
      sideEffects?: string
    }
    expect(result.sideEffects).toBe('naive-plus/es/np-cell/style/index.scss')
  })

  test('skips sideEffects when importStyle is false', () => {
    const resolver = NaivePlusResolver({ importStyle: false })
    const result = resolver.resolve!('NpCellGroup') as {
      sideEffects?: string
    }
    expect(result.sideEffects).toBeUndefined()
  })

  test('ignores non-naive-plus component names', () => {
    expect(resolve('ElButton')).toBeUndefined()
  })
})
