import type { ButtonProps } from 'naive-ui'
import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'

export const npButtonProps = {
  /**
   * 增强点击事件
   */
  click: {
    type: [Function, Promise] as PropType<
      ((e: MouseEvent) => void) | ((e: MouseEvent) => Promise<void>)
    >,
  },
  /**
   * 点击加载延迟 ms，当使用 `:click` 代替 `@click` 时有效
   * @defaultValue 250
   */
  loadingDelay: {
    type: Number,
    default: 250,
  },
  /**
   * 节流延迟 ms
   * @defaultValue 350
   */
  throttleDelay: {
    type: Number,
    default: 350,
  },
  /**
   * 主题
   * @defaultValue tertiary
   */
  type: {
    type: String as PropType<
      'default' | 'primary' | 'warning' | 'success' | 'info' | 'error'
    >,
    default: 'default',
  },
  /**
   * 原 t-button 属性
   */
  props: {
    type: Object as PropType<Omit<ButtonProps, 'type' | 'onClick'>>,
  },
  style: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * 默认点击事件
   */
  onClick: Function as PropType<(e: MouseEvent) => void>,
}

export type NpButtonProps = ExtractPropTypes<typeof npButtonProps>
