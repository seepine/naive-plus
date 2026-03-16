import type { AnyObject } from '../types'

/**
 * 简单的发布订阅事件总线。
 *
 * 支持通过泛型约束事件名与事件数据类型，在 TypeScript 中获得完整提示。
 *
 * @example
 * // 不指定事件类型（与 JS 用法兼容）
 * const bus = new EventBus()
 * bus.on('open', data => {
 *   console.log(data)
 * })
 * bus.emit('open', { id: 1 })
 *
 * @example
 * // 指定事件映射，获得完整的类型推断
 * type Events = {
 *   open: { id: number }
 *   close: void
 * }
 *
 * const bus = new EventBus<Events>()
 *
 * bus.on('open', payload => {
 *   // payload: { id: number }
 *   console.log(payload.id)
 * })
 *
 * bus.on('close', () => {
 *   console.log('closed')
 * })
 *
 * bus.emit('open', { id: 1 })
 * bus.emit('close')
 */
export default class EventBus<EventMap extends AnyObject = AnyObject> {
  private events: {
    [K in keyof EventMap]?: Array<(payload: EventMap[K]) => void>
  }

  constructor() {
    this.events = {}
  }

  /**
   * 触发事件
   * @param eventName 事件名
   * @param data 事件数据
   */
  emit<K extends keyof EventMap>(eventName: K, data?: EventMap[K]): void {
    const handlers = this.events[eventName]
    if (!handlers) {
      return
    }
    handlers.forEach(fn => {
      fn(data as EventMap[K])
    })
  }

  /**
   * 监听事件
   * @param eventName 事件名
   * @param fn 回调函数
   */
  on<K extends keyof EventMap>(
    eventName: K,
    fn: (data: EventMap[K]) => void
  ): void {
    const handlers = this.events[eventName] || []
    handlers.push(fn)
    this.events[eventName] = handlers
  }

  /**
   * 取消监听事件
   * @param eventName 事件名
   * @param fn 需要移除的回调函数
   */
  off<K extends keyof EventMap>(
    eventName: K,
    fn: (data: EventMap[K]) => void
  ): void {
    const handlers = this.events[eventName]
    if (!handlers) {
      return
    }
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === fn) {
        handlers.splice(i, 1)
        break
      }
    }
  }
}
