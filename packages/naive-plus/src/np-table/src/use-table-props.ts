import type { DataTableProps } from 'naive-ui'

const VERTICAL_SCROLL_PROP_KEYS = [
  'maxHeight',
  'flexHeight',
  'virtualScroll',
  'virtualScrollX',
  'virtualScrollHeader',
  'heightForRow',
] as const

type AllowedProps = Omit<
  DataTableProps,
  (typeof VERTICAL_SCROLL_PROP_KEYS)[number]
>

type TableScrollbarProps = NonNullable<AllowedProps['scrollbarProps']> & {
  onWheel?: (event: WheelEvent) => void
}

const createScrollbarProps = (
  scrollbarProps?: TableScrollbarProps
): TableScrollbarProps => {
  const userOnWheel = scrollbarProps?.onWheel
  if (!userOnWheel) return scrollbarProps as TableScrollbarProps

  return {
    ...scrollbarProps,
    onWheel: (event: WheelEvent) => {
      userOnWheel(event)
      if (event.defaultPrevented || typeof window === 'undefined') return
      event.preventDefault()
      window.scrollBy(0, event.deltaY)
    },
  }
}

const STRIP_KEYS = new Set<string>(VERTICAL_SCROLL_PROP_KEYS)

export const sanitizeTableProps = (props?: DataTableProps): AllowedProps => {
  if (!props) return {} as AllowedProps
  const result = { ...props } as Record<string, unknown>
  for (const key of STRIP_KEYS) delete result[key]
  return {
    ...(result as AllowedProps),
    scrollbarProps: createScrollbarProps(
      props.scrollbarProps as TableScrollbarProps | undefined
    ),
  }
}
