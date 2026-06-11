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

  test('resolves np-cell-group to its own directory', () => {
    expect(resolve('NpCellGroup')).toEqual({
      name: 'NpCellGroup',
      from: 'naive-plus/es/np-cell-group',
      sideEffects: 'naive-plus/es/np-cell-group/style/index.css',
    })
  })

  test('honors scss importStyle', () => {
    const resolver = NaivePlusResolver({ importStyle: 'scss' })
    const result = resolver.resolve!('NpButton') as { sideEffects?: string }
    expect(result.sideEffects).toBe('naive-plus/es/np-button/style/index.scss')
  })

  test('skips sideEffects when importStyle is false', () => {
    const resolver = NaivePlusResolver({ importStyle: false })
    const result = resolver.resolve!('NpButton') as { sideEffects?: string }
    expect(result.sideEffects).toBeUndefined()
  })

  test('ignores non-naive-plus component names', () => {
    expect(resolve('ElButton')).toBeUndefined()
  })
})
