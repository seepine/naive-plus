import type { CSSProperties, VNode } from 'vue'

export type AnyObject = { [key: string]: any }

export type AsyncValue<T> = T | Promise<T> | (() => T) | (() => Promise<T>)

export interface ResponsiveValue {
  /**
   * <768px
   */
  xs?: number
  /**
   * ≥768px
   */
  sm?: number
  /**
   * ≥992px
   */
  md?: number
  /**
   * ≥1200px
   */
  lg?: number
  /**
   * ≥1400px
   */
  xl?: number
  /**
   * ≥1880px
   */
  xxl?: number
}

export type Run<T, R> =
  | R
  | Promise<R>
  | ((form: T) => R)
  | ((form: T) => Promise<R>)

export type Btn<T = AnyObject> = {
  /**
   * 按钮是否显示
   */
  display?: Run<T, boolean>
  /**
   * 按钮显示文字
   */
  text?: Run<T, string>
  /**
   * 自定义渲染
   * @param data
   * @param click
   * @returns
   */
  render?: (data: T, click: () => void) => VNode
  /**
   * 传递style
   */
  style?: CSSProperties
  /**
   * 点击按钮后处理数据，再显示弹窗
   */
  onBefore?: Run<T, T>
  /**
   * 数据填写完处理或校验数据，再请求到后端
   */
  onAfter?: Run<T, T>
  /**
   * 请求后端，例如 onRequest: (data)=> axios.post('/xxx', data)
   */
  onSubmit?: Run<T, void>
}
