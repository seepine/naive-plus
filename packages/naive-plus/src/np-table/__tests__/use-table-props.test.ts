import { afterEach, describe, expect, test, vi } from 'vitest'
import { sanitizeTableProps } from '../src/use-table-props'

type WheelHandler = (event: WheelEvent) => void

const getWheelHandler = (props: ReturnType<typeof sanitizeTableProps>) => {
  return (props.scrollbarProps as { onWheel?: WheelHandler } | undefined)
    ?.onWheel
}

afterEach(() => {
  vi.restoreAllMocks()
  Reflect.deleteProperty(globalThis, 'window')
})

describe('sanitizeTableProps', () => {
  test('keeps regular data-table props', () => {
    const props = sanitizeTableProps({
      striped: true,
      scrollX: 1200,
      singleLine: false,
    })

    expect(props).toMatchObject({
      striped: true,
      scrollX: 1200,
      singleLine: false,
    })
  })

  test('removes props that force internal vertical scrolling', () => {
    const props = sanitizeTableProps({
      maxHeight: 480,
      flexHeight: true,
      virtualScroll: true,
      virtualScrollX: true,
      virtualScrollHeader: true,
      heightForRow: () => 48,
      bordered: true,
    })

    expect(props).toMatchObject({ bordered: true })
    expect(props).not.toHaveProperty('maxHeight')
    expect(props).not.toHaveProperty('flexHeight')
    expect(props).not.toHaveProperty('virtualScroll')
    expect(props).not.toHaveProperty('virtualScrollX')
    expect(props).not.toHaveProperty('virtualScrollHeader')
    expect(props).not.toHaveProperty('heightForRow')
  })

  test('forwards wheel scrolling to window through scrollbarProps', () => {
    const scrollBy = vi.fn()
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: { scrollBy },
    })

    const userOnWheel = vi.fn()
    const preventDefault = vi.fn()
    const props = sanitizeTableProps({
      scrollbarProps: {
        onWheel: userOnWheel,
      } as any,
    })

    getWheelHandler(props)?.({
      deltaY: 120,
      defaultPrevented: false,
      preventDefault,
    } as unknown as WheelEvent)

    expect(userOnWheel).toHaveBeenCalledTimes(1)
    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(scrollBy).toHaveBeenCalledWith(0, 120)
  })

  test('skips window scrolling when wheel has already been prevented', () => {
    const scrollBy = vi.fn()
    Object.defineProperty(globalThis, 'window', {
      configurable: true,
      value: { scrollBy },
    })

    const preventDefault = vi.fn()
    const props = sanitizeTableProps()

    getWheelHandler(props)?.({
      deltaY: 120,
      defaultPrevented: true,
      preventDefault,
    } as unknown as WheelEvent)

    expect(preventDefault).not.toHaveBeenCalled()
    expect(scrollBy).not.toHaveBeenCalled()
  })
})
